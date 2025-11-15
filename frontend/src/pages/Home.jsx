import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          CityCycler <span style={styles.bike}>🚴‍♀️</span>
        </h1>

        <p style={styles.subtitle}>Entdecke Wien auf zwei Rädern.</p>

        <Link to="/map" style={styles.button}>
          Zur Karte
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #cce0ff, #e6f0ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    background: "white",
    padding: "50px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "420px",
    width: "100%",
  },

  title: {
    fontSize: "2.5rem",
    margin: 0,
    color: "#222"
  },

  bike: {
    fontSize: "2.4rem",
    display: "inline-block",
    animation: "bikeEnter 1.2s ease-out forwards",
  },

  subtitle: {
    marginTop: "10px",
    fontSize: "1.2rem",
    color: "#666",
  },

  button: {
    display: "inline-block",
    marginTop: "25px",
    padding: "12px 28px",
    background: "#0077ff",
    color: "white",
    borderRadius: "10px",
    fontSize: "1.1rem",
    textDecoration: "none",
    transition: "0.2s ease",
  },
};

// Animation Keyframes einfügen
const globalStyles = `
@keyframes bikeEnter {
  0% {
    transform: translateX(150px) scale(0.9);
    opacity: 0;
  }
  60% {
    transform: translateX(-10px) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}
`;

const styleElement = document.createElement("style");
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);



