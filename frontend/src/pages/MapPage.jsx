import { Link } from "react-router-dom";
import { useState } from "react";
import MapView from "../components/MapView";
import MoodSelector from "../components/MoodSelector";

export default function MapPage() {
  const [mood, setMood] = useState("neutral"); // Standardwert

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={styles.back}>&larr; Zurück</Link>
        <h2 style={{ margin: 0 }}>CityCycler Karte</h2>
      </div>

      {/* Mood Auswahl */}
      <MoodSelector selectedMood={mood} onChange={(m) => setMood(m)} />

      {/* Interaktive Karte */}
      <MapView />

      {/* Debug (optional sichtbar) */}
      <p style={{ marginTop: "20px" }}>Gewählte Stimmung: <b>{mood}</b></p>
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
};

