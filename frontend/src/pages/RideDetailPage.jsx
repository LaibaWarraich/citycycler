// frontend/src/pages/RideDetailPage.jsx
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { loadProgress } from "../services/progress";
import MapView from "../components/MapView";
import styles from "./RidesPage.styles";
import ThemeToggle from "../components/ThemeToggle";

export default function RideDetailPage() {
  const { id } = useParams();
  const progress = useMemo(() => loadProgress(), []);
  const ride = (progress.rides || []).find((r) => r.id === id);

  if (!ride) {
    return (
      <div style={styles.pageBackground}>
        <div style={styles.card}>
          <div style={styles.headerRow}>
            <Link to="/rides" style={styles.backButton}>
              <span style={styles.backIcon}>←</span>
              <span>Zurück</span>
            </Link>
            <h2 style={styles.title}>Fahrt ansehen</h2>
            <ThemeToggle style={styles.headerActionButton} />
            <div />
          </div>
          <p style={styles.smallNote}>Fahrt nicht gefunden.</p>
        </div>
      </div>
    );
  }

  const path = ride.path || [];
  const startPoint = path.length > 0 ? [path[0][1], path[0][0]] : null; // [lat,lng]
  const endPoint =
    path.length > 1 ? [path[path.length - 1][1], path[path.length - 1][0]] : null;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <Link to="/rides" style={styles.backButton}>
            <span style={styles.backIcon}>←</span>
            <span>Fahrten</span>
          </Link>

          <h2 style={styles.title}>Fahrt ansehen</h2>
          <div />
        </div>

        <div style={styles.infoLine}>
          <b>{new Date(ride.at).toLocaleString()}</b> •{" "}
          {(ride.distance / 1000).toFixed(2)} km • {Math.round(ride.ascent)} hm • Mood:{" "}
          <b>{ride.mood}</b> • {ride.roundTrip ? "Rundtour" : "A → B"}
        </div>

        {path.length === 0 ? (
          <p style={styles.smallNote}>Für diese Fahrt wurde keine Route gespeichert.</p>
        ) : (
          <div style={styles.mapWrapper}>
            <MapView
                routeCoords={path}
                startPoint={startPoint}
                endPoint={endPoint}
                mood={ride.mood}
            />
          </div>
        )}
      </div>
    </div>
  );
}
