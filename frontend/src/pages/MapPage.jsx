import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MapView from "../components/MapView";
import MoodSelector from "../components/MoodSelector";
import { getRoute } from "../services/api";

export default function MapPage() {
  const [mood, setMood] = useState("neutral");
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered, mood=", mood);
    loadRoute();
  }, [mood]);

  async function loadRoute() {
    const data = await getRoute(mood);
    console.log("Backend-Response:", data);

    const feature = data?.features?.[0];
    if (!feature) {
      console.error("Keine gültige Route erhalten:", data);
      return;
    }

    const coords = feature.geometry?.coordinates;
    if (!Array.isArray(coords)) {
      console.error("Koordinaten ungültig:", coords);
      return;
    }

    const dist = feature.properties?.summary?.distance ?? null;

    setRouteCoords(coords);
    setDistance(dist);
    console.log("loadRoute wird ausgeführt, coords=", coords.length);
  }



  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={styles.back}>&larr; Zurück</Link>
        <h2 style={{ margin: 0 }}>CityCycler Karte</h2>
      </div>

      <MoodSelector selectedMood={mood} onChange={(m) => setMood(m)} />

      <button onClick={loadRoute} style={styles.button}>
        Neue Route generieren
      </button>

      <MapView routeCoords={routeCoords} />

      <p style={{ color: "#000", fontWeight: 500 }}>
        Distanz: {distance ? (distance / 1000).toFixed(2) : "…"} km</p>

      <p style={{ marginTop: "20px", color: "#000", fontWeight: 500 }}>Gewählte Stimmung: <b>{mood}</b></p>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    padding: "20px",
    background: "#f5f5f5",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
    color: "#222",
  },
  back: {
    textDecoration: "none",
    color: "#0077ff",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    background: "#0077ff",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },
};


