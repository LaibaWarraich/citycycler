import { Smile, Meh, Flame } from "lucide-react";

export default function MoodSelector({ selectedMood, onChange }) {
  const moods = [
    { id: "relaxed", label: "Entspannt", icon: <Smile size={20} /> },
    { id: "neutral", label: "Neutral",  icon: <Meh size={20} /> },
    { id: "active", label: "Aktiv", icon: <Flame size={20} /> },
  ];


  return (
    <div style={styles.container}>
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onChange(mood.id)}
          style={{
            ...styles.button,
            ...(selectedMood === mood.id ? styles.selected : {}),
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {mood.icon}
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "white",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "0.2s",
    color: "#000",
  },
  selected: {
    background: "#0077ff",
    color: "white",
    borderColor: "#0077ff",
  },
};
