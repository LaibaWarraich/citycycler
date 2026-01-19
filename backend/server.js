// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// kleine Hilfsfunktion, um einen "Bogen" (Umweg) in die Route einzubauen
function buildBentCoordinates(start, end, strength) {
  if (!strength || strength <= 0) {
    return [start, end];
  }

  const dx = end[0] - start[0]; // lon
  const dy = end[1] - start[1]; // lat
  const len = Math.sqrt(dx * dx + dy * dy) || 1;

  const nx = -dy / len;
  const ny = dx / len;

  const midLon = (start[0] + end[0]) / 2;
  const midLat = (start[1] + end[1]) / 2;

  const via = [midLon + nx * strength, midLat + ny * strength];

  return [start, via, end];
}

app.get("/route", async (req, res) => {
  const {
    mood = "neutral",
    startLat,
    startLng,
    endLat,
    endLng,
    roundTrip = "false",
  } = req.query;

  const isRoundTrip = roundTrip === "true";

  console.log(">>> Anfrage vom Frontend:", req.query);

  if (!startLat || !startLng) {
    return res.status(400).json({ error: "Missing start coordinates" });
  }
  if (!isRoundTrip && (!endLat || !endLng)) {
    return res.status(400).json({ error: "Missing end coordinates" });
  }

  const start = [parseFloat(startLng), parseFloat(startLat)];
  const end = endLat && endLng ? [parseFloat(endLng), parseFloat(endLat)] : null;

  const preferenceByMood = {
    relaxed: "shortest",
    neutral: "recommended",
    active: "fastest",
  };
  const preference = preferenceByMood[mood] || "recommended";

  const bendByMood = {
    relaxed: 0.0,
    neutral: 0.006,
    active: 0.015,
  };
  const bendStrength = bendByMood[mood] ?? 0.006;

  // Voreinstellung für ORS-Body
  let body;

  if (isRoundTrip) {
    // --- Rundtour ---
    // Länge je nach Stimmung (in Metern)
    const lengthByMood = {
      relaxed: 5000,   // ~5 km
      neutral: 9000,   // ~9 km
      active: 14000,   // ~14 km
    };
    const targetLength = lengthByMood[mood] ?? 9000;

    body = {
      coordinates: [start],     // nur EIN Punkt bei round_trip erlaubt!
      instructions: false,
      elevation: true,
      extra_info: ["steepness"],
      preference,
      options: {
        round_trip: {
          length: targetLength,
          points: 3,
        },
      },
    };

    console.log(
      ">>> Backend Rundtour, Start:",
      start,
      "Ziel-Länge:",
      targetLength,
      "m, Preference:",
      preference
    );
  } else {
    // --- normale A-nach-B Route ---
    const coordinates = buildBentCoordinates(start, end, bendStrength);

    body = {
      coordinates,
      instructions: false,
      elevation: true,
      extra_info: ["steepness"],
      preference,
    };

    console.log(
      ">>> Backend normale Route, Start:",
      start,
      "Via-Stärke:",
      bendStrength,
      "Ende:",
      end,
      "Preference:",
      preference
    );
  }

  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/cycling-regular/geojson",
      body,
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "ORS SUCCESS, Distanz:",
      response.data?.features?.[0]?.properties?.summary?.distance,
      "m, Dauer:",
      response.data?.features?.[0]?.properties?.summary?.duration,
      "s"
    );

    res.json(response.data);
  } catch (error) {
    console.error("ORS ERROR:", error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data || "ORS error" });
  }
});

app.listen(3000, () => {
  console.log("Backend läuft auf Port 3000");
});
