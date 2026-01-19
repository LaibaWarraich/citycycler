const styles = {
  pageBackground: {
    width: "100vw",
    minHeight: "100vh",
    background: "#edf1f7",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "16px",
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
    color: "#111827",
    textAlign: "center",
  },

  moodRow: {
    marginTop: 4,
    marginBottom: 10,
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

  // Steuerung & Adressen
  controlsRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px",
    flexWrap: "wrap",
  },
  addressRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap",
  },
  addressColumn: {
    flex: 1,
    minWidth: "260px",
  },
  addressInputRow: {
    display: "flex",
    gap: "6px",
    marginTop: "4px",
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
    marginBottom: "10px",
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

  // Layout: Karte + Sidebar
  mainContent: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 3fr) minmax(260px, 1.3fr)",
    gap: "18px",
    marginTop: "10px",
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
};

export default styles;
