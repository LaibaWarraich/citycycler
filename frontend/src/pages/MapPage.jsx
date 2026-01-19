// frontend/src/pages/MapPage.jsx
import { Link } from "react-router-dom";
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


export default function MapPage() {
  const [mood, setMood] = useState("neutral");
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

  // Fortschritt & Badges (aus progress-service)
  const [progress, setProgress] = useState(() => loadProgress());
  const unlockedBadges = listUnlockedBadges(progress);

  function handleMapClick(latlng) {
    if (!editMode) return;

    if (!startPoint) {
      setStartPoint(latlng);
    } else if (!endPoint && !roundTrip) {
      setEndPoint(latlng);
    } else {
      // dritter Klick: von vorne anfangen
      setStartPoint(latlng);
      setEndPoint(null);
      setRouteCoords([]);
      setDistance(null);
      setDuration(null);
      setAscent(null);
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
      console.log("Backend-Response:", data);

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
  }

  function handleMarkCompleted() {
    if (!distance) {
      alert("Bitte zuerst eine Route generieren.");
      return;
    }

    const updated = registerCompletedRide({
      distance,
      ascent: ascent || 0,
    });

    setProgress(updated);
    alert("Route als abgeschlossen gespeichert 🎉");
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
            onClick={() => {
              setRoundTrip((prev) => !prev);
              if (!roundTrip) setEndPoint(null);
            }}
            style={roundTrip ? styles.roundTripButtonActive : styles.roundTripButton}
          >
            <span
              style={roundTrip ? styles.roundTripDotActive : styles.roundTripDot}
            />
            Rundtour
          </button>
        </div>

        {/* Mood Auswahl */}
        <div style={styles.moodRow}>
          <MoodSelector selectedMood={mood} onChange={(m) => setMood(m)} />
        </div>

        {/* Edit / Reset */}
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
            Start/Ziel &amp; Route zurücksetzen
          </button>
        </div>

        {/* Adressen */}
        <div style={styles.addressRow}>
          <div style={styles.addressColumn}>
            <label style={styles.label}>Startadresse</label>
            <div style={styles.addressInputRow}>
              <input
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                placeholder="z.B. Opernring 2, Wien"
                style={styles.input}
              />
              <button
                onClick={() => handleGeocode("start")}
                style={styles.smallButton}
              >
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

        <p style={{ marginBottom: 10, color: "#555", fontSize: "0.9rem" }}>
          Du kannst Start/Ziel entweder über die <b>Adressfelder</b> setzen
          oder (im Modus „Start/Ziel auf Karte wählen“) durch Klick in die Karte.
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
              />
            </div>
          </div>

          <aside style={styles.sidebar}>
            <div style={styles.statsCard}>
              <div style={styles.statsRow}>
                <span>Distanz:</span>
                <strong>
                  {distance ? `${(distance / 1000).toFixed(2)} km` : "–"}
                </strong>
              </div>
              <div style={styles.statsRow}>
                <span>Dauer (ca.):</span>
                <strong>
                  {duration ? `${Math.round(duration / 60)} min` : "–"}
                </strong>
              </div>
              <div style={styles.statsRow}>
                <span>Höhenmeter (gesamt):</span>
                <strong>
                  {ascent != null ? `${Math.round(ascent)} m` : "–"}
                </strong>
              </div>
            </div>

            <button
              onClick={handleMarkCompleted}
              style={styles.completeButton}
              disabled={!distance}
            >
              Route als abgeschlossen markieren
            </button>

            {unlockedBadges.length > 0 && (
              <div style={styles.badgeSection}>
                <h3 style={styles.badgeTitle}>Deine Badges</h3>
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