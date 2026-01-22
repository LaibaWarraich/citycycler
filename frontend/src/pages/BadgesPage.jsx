// frontend/src/pages/BadgesPage.jsx
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { loadProgress, listAllBadges } from "../services/progress";
import ThemeToggle from "../components/ThemeToggle";

export default function BadgesPage() {
  const progress = useMemo(() => loadProgress(), []);
  const badges = useMemo(() => listAllBadges(progress), [progress]);

  const totalKm = progress.totalDistance / 1000;
  const totalHm = progress.totalAscent;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <Link to="/map" style={styles.backButton}>
            <span style={styles.backIcon}>←</span>
            Zur Karte
          </Link>

          <h1 style={styles.title}>Deine Badges</h1>
          
          <ThemeToggle style={styles.headerActionButton} /> 
          <div /> {/* Platzhalter für Grid */}
        </div>

        {/* Zusammenfassung */}
        <div style={styles.summaryRow}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryLabel}>Abgeschlossene Fahrten</div>
            <div style={styles.summaryValue}>{progress.totalRides}</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryLabel}>Gesamtdistanz</div>
            <div style={styles.summaryValue}>{totalKm.toFixed(1)} km</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryLabel}>Gesamte Höhenmeter</div>
            <div style={styles.summaryValue}>{Math.round(totalHm)} m</div>
          </div>
        </div>

        {/* Badge-Liste */}
        <div style={styles.badgeGrid}>
          {badges.map((badge) => (
            <div
              key={badge.id}
              style={{
                ...styles.badgeCard,
                ...(badge.achieved
                  ? styles.badgeCardAchieved
                  : styles.badgeCardLocked),
              }}
            >
              <div style={styles.badgeIcon}>🏅</div>
              <div>
                <div style={styles.badgeTitle}>{badge.title}</div>
                <div style={styles.badgeDesc}>{badge.description}</div>
                <div style={styles.badgeStatus}>
                  {badge.achieved
                    ? "Freigeschaltet ✅"
                    : "Noch nicht freigeschaltet"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    width: "100vw",
    minHeight: "100vh",
    background: "var(--cc-bg)",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: "960px",
    margin: "0 auto",
    background: "var(--cc-card)",
    borderRadius: "16px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
    padding: "20px 24px 24px",
    boxSizing: "border-box",
  },
  headerRow: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    columnGap: "16px",
    marginBottom: "16px",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid #dbeafe",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: "0.9rem",
    textDecoration: "none",
    fontWeight: 500,
  },
  backIcon: {
    fontSize: "1.1rem",
    lineHeight: 1,
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--cc-text)",
    textAlign: "center",
  },

  summaryRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginBottom: "18px",
  },
  summaryCard: {
    padding: "10px 12px",
    borderRadius: 12,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
  },
  summaryLabel: {
    fontSize: "0.8rem",
    color: "#6b7280",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#111827",
  },

  badgeGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  badgeCard: {
    display: "flex",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 14,
    alignItems: "center",
  },
  badgeCardAchieved: {
    background: "#fef3c7",
    border: "1px solid #facc15",
  },
  badgeCardLocked: {
    background: "#f3f4f6",
    border: "1px dashed #d1d5db",
    opacity: 0.8,
  },
  badgeIcon: {
    fontSize: "1.4rem",
  },
  badgeTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#111827",
  },
  badgeDesc: {
    fontSize: "0.85rem",
    color: "#4b5563",
  },
  badgeStatus: {
    fontSize: "0.8rem",
    marginTop: 4,
    color: "#6b7280",
  },
  headerActionButton: {
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid #dbeafe",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    justifySelf: "end",
  },

};

