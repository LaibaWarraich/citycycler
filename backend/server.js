import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/route", async (req, res) => {
  const mood = req.query.mood || "neutral";

  const distances = {
    relaxed: 0.01,
    neutral: 0.02,
    active: 0.04
  };

  const delta = distances[mood];

  const startPoint = [16.3738, 48.2082]; // Stephansdom
  const endPoint = [
    startPoint[0] + delta,
    startPoint[1] + delta
  ];

  const body = {
    coordinates: [startPoint, endPoint],
  };

  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/cycling-regular/geojson",
      body,
      {
        headers: {
          "Authorization": process.env.ORS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("ORS SUCCESS");
    res.json(response.data);

  } catch (error) {
    console.error("ORS ERROR:", error?.response?.data);
    res.status(500).json({ error: error?.response?.data });
  }
});



 app.listen(3000, () => {
  console.log("Backend läuft auf Port 3000");
 });