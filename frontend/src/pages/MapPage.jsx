// frontend/src/pages/MapPage.jsx
import { useState } from "react";
import MapView from "../components/MapView";
import MoodSelector from "../components/MoodSelector";
import { getRoute, geocodeAddress } from "../services/api";
import {
  loadProgress,
  registerCompletedRide,
  listUnlockedBadges,
} from "../services/progress";
import styles from "./MapPage.styles";
import { setRideFeedback } from "../services/progress"; 
import { Link, useNavigate } from "react-router-dom";
import { loadTheme, saveTheme, applyTheme } from "../services/theme";
import { useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";


export default function MapPage() {
  const [mood, setMood] = useState("neutral");
  const [routeMood, setRouteMood] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [ascent, setAscent] = useState(null);

  const [startPoint, setStartPoint] = useState(null); // [lat, lng]
  const [endPoint, setEndPoint] = useState(null); // [lat, lng]

  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [roundTrip, setRoundTrip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [lastRideId, setLastRideId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => loadTheme());
  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  // Fortschritt & Badges
  const [progress, setProgress] = useState(() => loadProgress());
  const unlockedBadges = listUnlockedBadges(progress);


  function handleMapClick(latlng) {
    if (!editMode) return;

    if (!startPoint) {
      setStartPoint(latlng);
    } else if (!endPoint && !roundTrip) {
      setEndPoint(latlng);
    } else {
      setStartPoint(latlng);
      setEndPoint(null);
      setRouteCoords([]);
      setDistance(null);
      setDuration(null);
      setAscent(null);
      setRouteMood(mood);
    }
  }

  async function loadRoute() {
    if (!startPoint) {
      alert("Bitte zuerst einen Startpunkt festlegen (Adresse oder Klick).");
      return;
    }
    if (!roundTrip && !endPoint) {
      alert("Bitte auch ein Ziel festlegen (oder Rundtour aktivieren).");
      return;
    }

    setIsLoading(true);
    try {
      const data = await getRoute(mood, startPoint, endPoint, roundTrip);

      if (!data || !Array.isArray(data.features) || data.features.length === 0) {
        console.error("Keine gültige Route erhalten:", data);
        return;
      }

      const feature = data.features[0];
      const coords = feature.geometry?.coordinates;
      if (!Array.isArray(coords)) {
        console.error("Koordinaten ungültig:", coords);
        return;
      }

      const summary = feature.properties?.summary || {};
      const dist = summary.distance ?? null;
      const dur = summary.duration ?? null;

      // Höhenmeter aus 3D-Koordinaten (lon, lat, ele)
      let totalAscentLocal = 0;
      for (let i = 1; i < coords.length; i++) {
        const prev = coords[i - 1];
        const cur = coords[i];
        if (prev.length >= 3 && cur.length >= 3) {
          const diff = cur[2] - prev[2];
          if (diff > 0) totalAscentLocal += diff;
        }
      }

      setRouteCoords(coords);
      setDistance(dist);
      setDuration(dur);
      setAscent(totalAscentLocal);
      setRouteMood(mood);
    } catch (err) {
      console.error("Fehler in loadRoute:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGeocode(type) {
    const text = type === "start" ? startAddress : endAddress;
    if (!text.trim()) return;

    const result = await geocodeAddress(text);
    if (!result) return;

    const point = [result.lat, result.lng];
    if (type === "start") {
      setStartPoint(point);
    } else {
      setEndPoint(point);
    }
  }

  function resetAll() {
    setStartPoint(null);
    setEndPoint(null);
    setRouteCoords([]);
    setDistance(null);
    setDuration(null);
    setAscent(null);
    setRouteMood(mood);
  }

  function handleMarkCompleted() {
    if (!distance || !Array.isArray(routeCoords) || routeCoords.length === 0) {
      alert("Bitte zuerst eine Route generieren.");
      return;
    }

     // Polyline "vereinfachen" (jeden 10. Punkt) -> spart Speicher
    const simplifiedPath = routeCoords.filter((_, i) => i % 10 === 0);

    const updated = registerCompletedRide({
      distance, // Meter
      ascent: ascent || 0, // Meter
      mood,
      roundTrip,
      path: simplifiedPath,
    });

    setProgress(updated);
    alert("Route als abgeschlossen gespeichert 🎉");
    const newestRide = updated.rides?.[0];
    setLastRideId(newestRide?.id || null);
    setShowFeedback(true);
  }


  return (
  <div style={styles.pageBackground}>
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.headerRow}>
        <Link to="/" style={styles.backButton}>
          <span style={styles.backIcon}>←</span>
          <span>Zurück</span>
        </Link>

        <h2 style={styles.title}>CityCycler Karte</h2>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          style={styles.headerActionButton}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {/* Platzhalter, damit Titel mittig bleibt */}
        <div />
      </div>

      {/* OBEN: Links Buttons | Rechts Suchleisten */}
      <div style={styles.topPanel}>
        {/* LINKS */}
        <div style={styles.leftTop}>
          {/* Mood Auswahl */}
          <div style={styles.moodRow}>
            <MoodSelector selectedMood={mood} onChange={(m) => setMood(m)} />
          </div>

          {/* Rundtour + Route generieren */}
          <div style={styles.routeButtonsRow}>
            <button
              type="button"
              onClick={() => {
                setRoundTrip((prev) => !prev);
                if (!roundTrip) {
                  // wenn Rundtour aktiviert wird, Ziel optional → zurücksetzen
                  setEndPoint(null);
                }
              }}
              style={roundTrip ? styles.roundTripButtonActive : styles.roundTripButton}
            >
              <span style={roundTrip ? styles.roundTripDotActive : styles.roundTripDot} />
              Rundtour
            </button>

            <button
              onClick={loadRoute}
              style={{
                ...styles.primaryButton,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "wait" : "pointer",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Route wird generiert…" : "Neue Route generieren"}
            </button>
          </div>
        </div>

        {/* RECHTS */}
        <div style={styles.rightTop}>
          <div style={styles.addressStack}>
            <div style={styles.addressColumn}>
              <label style={styles.label}>Startadresse</label>
              <div style={styles.addressInputRow}>
                <input
                  value={startAddress}
                  onChange={(e) => setStartAddress(e.target.value)}
                  placeholder="z.B. Opernring 2, Wien"
                  style={styles.input}
                />
                <button onClick={() => handleGeocode("start")} style={styles.smallButton}>
                  Setzen
                </button>
              </div>
            </div>

            <div style={styles.addressColumn}>
              <label style={styles.label}>
                Zieladresse {roundTrip && "(bei Rundtour optional)"}
              </label>
              <div style={styles.addressInputRow}>
                <input
                  value={endAddress}
                  onChange={(e) => setEndAddress(e.target.value)}
                  placeholder="z.B. Prater, Wien"
                  style={styles.input}
                  disabled={roundTrip}
                />
                <button
                  onClick={() => handleGeocode("end")}
                  style={{
                    ...styles.smallButton,
                    opacity: roundTrip ? 0.4 : 1,
                    cursor: roundTrip ? "default" : "pointer",
                  }}
                  disabled={roundTrip}
                >
                  Setzen
                </button>
              </div>
            </div>
          </div>

          {/* ✅ HIER: Buttons unterhalb der Suchleisten */}
          <div style={styles.controlsRow}>
            <button
              onClick={() => setEditMode((prev) => !prev)}
              style={{
                ...styles.secondaryButton,
                ...(editMode ? styles.secondaryButtonActive : {}),
              }}
            >
              {editMode ? "Punktwahl beenden" : "Start/Ziel auf Karte wählen"}
            </button>

            <button onClick={resetAll} style={styles.secondaryButton}>
              Route zurücksetzen
            </button>
          </div>
        </div>
      </div>

      <p style={{ marginBottom: 10, color: "#555", fontSize: "0.9rem" }}>
        Du kannst Start/Ziel entweder über die <b>Adressfelder</b> setzen oder (im
        Modus „Start/Ziel auf Karte wählen“) durch Klick in die Karte.
      </p>

      {/* Hauptbereich: Karte + rechte Seitenleiste */}
      <div style={styles.mainContent}>
        <div style={styles.mapColumn}>
          <div style={styles.mapWrapper}>
            <MapView
              routeCoords={routeCoords}
              startPoint={startPoint}
              endPoint={endPoint}
              onMapClick={handleMapClick}
              mood={routeMood}
            />
          </div>
        </div>

        <aside style={styles.sidebar}>
          <div style={styles.statsCard}>
            <div style={styles.statsRow}>
              <span>Distanz:</span>
              <strong>{distance ? `${(distance / 1000).toFixed(2)} km` : "–"}</strong>
            </div>
            <div style={styles.statsRow}>
              <span>Dauer (ca.):</span>
              <strong>{duration ? `${Math.round(duration / 60)} min` : "–"}</strong>
            </div>
            <div style={styles.statsRow}>
              <span>Höhenmeter (gesamt):</span>
              <strong>{ascent != null ? `${Math.round(ascent)} m` : "–"}</strong>
            </div>
          </div>

          <button onClick={handleMarkCompleted} style={styles.completeButton} disabled={!distance}>
            Route als abgeschlossen markieren
          </button>

          <button
            type="button"
            onClick={() => navigate("/rides")}
            style={{
              ...styles.secondaryButton,
              alignSelf: "flex-start",
              marginTop: 8,
              marginBottom: 4,
            }}
          >
            Gespeicherte Routen ansehen
          </button>

          {showFeedback && lastRideId && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 6, color: "black" }}>
                Wie schwer war die Route?
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={styles.secondaryButton}
                  onClick={() => {
                    const updated = setRideFeedback(lastRideId, "tooEasy");
                    setProgress(updated);
                    setShowFeedback(false);
                  }}
                >
                  😴 Zu leicht
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => {
                    const updated = setRideFeedback(lastRideId, "ok");
                    setProgress(updated);
                    setShowFeedback(false);
                  }}
                >
                  🙂 Genau richtig
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => {
                    const updated = setRideFeedback(lastRideId, "tooHard");
                    setProgress(updated);
                    setShowFeedback(false);
                  }}
                >
                  🥵 Zu schwer
                </button>
              </div>
            </div>
          )}

          {unlockedBadges.length > 0 && (
            <div style={styles.badgeSection}>
              <div style={styles.badgeHeaderRow}>
                <span style={styles.badgeTitle}>Deine Badges</span>
                <Link to="/badges" style={styles.badgeLink}>
                  Alle anzeigen →
                </Link>
              </div>

              <div style={styles.badgeList}>
                {unlockedBadges.map((badge) => (
                  <div key={badge.id} style={styles.badgeChip}>
                    <span style={styles.badgeEmoji}>🏅</span>
                    <div>
                      <div style={styles.badgeName}>{badge.title}</div>
                      <div style={styles.badgeDesc}>{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  </div>
);
}