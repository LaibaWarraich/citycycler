// frontend/src/pages/RidesPage.styles.js
const styles = {
  pageBackground: {
    width: "100vw",
    minHeight: "100vh",
    background: "var(--cc-bg)",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: "1100px",
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
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "var(--cc-text)",
    textAlign: "center",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  rideCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: "12px 12px",
    background: "#f9fafb",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },

  rideMetaTop: {
    fontWeight: 700,
    color: "#111827",
    fontSize: "0.95rem",
  },
  rideMetaBottom: {
    fontSize: "0.85rem",
    color: "#374151",
    marginTop: 4,
  },

  smallNote: {
    fontSize: "0.9rem",
    color: "#4b5563",
    marginTop: 4,
  },

  primaryButton: {
    padding: "10px 18px",
    background: "#2563eb",
    color: "white",
    borderRadius: 999,
    border: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  secondaryButton: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid #2563eb",
    background: "#e3f2ff",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#123262",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  infoLine: {
    marginBottom: 12,
    color: "var(--cc-text)",
    fontSize: "0.95rem",
  },

  mapWrapper: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    marginTop: 12,
  },

  summaryRow: {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "12px",
  marginBottom: "16px",
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
    fontWeight: 700,
    color: "#111827",
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
