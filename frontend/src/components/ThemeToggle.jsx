import { useEffect, useState } from "react";
import { applyTheme, loadTheme, saveTheme } from "../services/theme";

export default function ThemeToggle({ style }) {
  const [theme, setTheme] = useState(() => loadTheme());

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      style={style}
      aria-label="Theme umschalten"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
