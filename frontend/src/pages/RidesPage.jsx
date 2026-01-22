// frontend/src/pages/RidesPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { loadProgress, getWeeklySummary } from "../services/progress";
import styles from "./RidesPage.styles";
import ThemeToggle from "../components/ThemeToggle";

export default function RidesPage() {
  const progress = useMemo(() => loadProgress(), []);
  const rides = progress.rides || [];
  const navigate = useNavigate();
  const summary = useMemo(() => getWeeklySummary(progress), [progress]);


  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <Link to="/map" style={styles.backButton}>
            <span style={styles.backIcon}>←</span>
            <span>Zur Karte</span>
          </Link>

          <h2 style={styles.title}>Gespeicherte Routen</h2>
          <ThemeToggle style={styles.headerActionButton} />
          <div />
        </div>

        <div style={styles.summaryRow}>
            <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Letzte 7 Tage</div>
                <div style={styles.summaryValue}>{summary.count} Fahrten</div>
            </div>

            <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Distanz</div>
                <div style={styles.summaryValue}>{summary.distanceKm.toFixed(1)} km</div>
            </div>

            <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Höhenmeter</div>
                <div style={styles.summaryValue}>{Math.round(summary.ascentM)} m</div>
            </div>
        </div>


        {rides.length === 0 ? (
          <p style={styles.smallNote}>Noch keine Fahrten gespeichert.</p>
        ) : (
          <div style={styles.list}>
            {rides.map((r) => (
              <div key={r.id} style={styles.rideCard}>
                <div>
                  <div style={styles.rideMetaTop}>
                    {new Date(r.at).toLocaleString()}
                  </div>

                  <div style={styles.rideMetaBottom}>
                    {(r.distance / 1000).toFixed(2)} km • {Math.round(r.ascent)} hm • Mood:{" "}
                    <b>{r.mood}</b> • {r.roundTrip ? "Rundtour" : "A → B"}
                    {r.feedback && (
                      <>
                        {" "}
                        • Feedback:{" "}
                        <b>
                          {r.feedback === "tooEasy"
                            ? "Zu leicht"
                            : r.feedback === "tooHard"
                            ? "Zu schwer"
                            : "Genau richtig"}
                        </b>
                      </>
                    )}
                    {!r.path?.length && " • (keine Linie gespeichert)"}
                  </div>
                </div>

                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => navigate(`/rides/${r.id}`)}
                >
                  Ansehen →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
