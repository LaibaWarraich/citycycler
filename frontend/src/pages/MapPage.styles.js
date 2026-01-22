// frontend/src/pages/MapPage.styles.js
const styles = {
  pageBackground: {
    width: "100vw",
    minHeight: "100vh",
    background: "var(--cc-bg)",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: "1600px",
    margin: "0 auto",
    background: "var(--cc-card)",
    borderRadius: "18px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
    padding: "20px 24px 24px",
    boxSizing: "border-box",
  },

  // Header
  headerRow: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    columnGap: "16px",
    marginBottom: "12px",
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
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "var(--cc-text)",
    textAlign: "center",
  },

  // NEU: Top-Layout (links Buttons, rechts Suchleisten)
  topPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 520px",
    gap: "18px",
    alignItems: "start",
    marginTop: "8px",
    marginBottom: "25px",
  },
  leftTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
  },
  rightTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "10px",
  },

  // Mood: links ausrichten
  moodRow: {
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    justifyContent: "flex-start",
    gap: 12,
  },

  // Rundtour-Toggle
  roundTripButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    background: "#f3f4f6",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#374151",
    fontWeight: 500,
  },
  roundTripButtonActive: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    borderRadius: 999,
    border: "1px solid #2563eb",
    background: "#dbeafe",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#1d4ed8",
    fontWeight: 600,
  },
  roundTripDot: {
    width: 10,
    height: 10,
    borderRadius: "999px",
    background: "#9ca3af",
  },
  roundTripDotActive: {
    width: 10,
    height: 10,
    borderRadius: "999px",
    background: "#2563eb",
  },

  // Steuerung (links unter Mood)
  controlsRow: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },

  // Adressen rechts untereinander
  addressStack: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  addressColumn: {
    width: "100%",
  },
  addressInputRow: {
    display: "flex",
    gap: "6px",
    marginTop: "4px",
    flexWrap: "nowrap",
  },
  label: {
    fontSize: "0.9rem",
    color: "#4b5563",
  },
  input: {
    flex: 1,
    padding: "6px 9px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: "0.9rem",
    outline: "none",
  },

  primaryButton: {
    padding: "10px 22px",
    background: "#2563eb",
    color: "white",
    borderRadius: 999,
    border: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  secondaryButton: {
    padding: "8px 16px",
    borderRadius: 999,
    border: "1px solid #2563eb",
    background: "#e3f2ff",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#123262",
    fontWeight: 500,
  },
  secondaryButtonActive: {
    background: "#2563eb",
    color: "#ffffff",
  },
  smallButton: {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #2563eb",
    background: "#2563eb",
    cursor: "pointer",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
    color: "#ffffff",
    fontWeight: 500,
  },

  // Rundtour + Route generieren (links)
  routeButtonsRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  // Layout: Karte + Sidebar
  mainContent: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 3fr) minmax(260px, 1.3fr)",
    gap: "18px",
    marginTop: "24px",
  },
  mapColumn: {
    minWidth: 0,
  },
  mapWrapper: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  // Stats & Button
  statsCard: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: "0.9rem",
    color: "#374151",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  completeButton: {
    padding: "8px 16px",
    borderRadius: 999,
    border: "1px solid #10b981",
    background: "#ecfdf5",
    color: "#065f46",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    alignSelf: "flex-start",
  },

  // Badges
  badgeSection: {
    marginTop: "4px",
    padding: "10px 12px",
    borderRadius: 14,
    background: "#fffbeb",
    border: "1px solid #facc15",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  badgeTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    margin: "0 0 8px 0",
    color: "#92400e",
  },
  badgeList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  badgeChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 999,
    background: "#fef3c7",
  },
  badgeEmoji: {
    fontSize: "1.1rem",
  },
  badgeName: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#92400e",
  },
  badgeDesc: {
    fontSize: "0.8rem",
    color: "#92400e",
  },

  badgeHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  badgeLink: {
    fontSize: "0.8rem",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
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

export default styles;

