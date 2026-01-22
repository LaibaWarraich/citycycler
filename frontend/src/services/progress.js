// frontend/src/services/progress.js

const STORAGE_KEY = "citycycler-progress-v1";

// Grundstruktur der gespeicherten Daten
const defaultProgress = {
  totalRides: 0,          // wie viele Fahrten abgeschlossen
  totalDistance: 0,       // in Metern
  totalAscent: 0,         // in Metern
  moods: {
    relaxed: 0,
    neutral: 0,
    active: 0,
  },
  roundTrips: 0,          // wie viele Rundtouren
  lastRideAt: null,  
  
  // Gespeicherte Fahrten
  rides: [],

  // Feedback-Zähler
  feedbackStats: {
    tooEasy: 0,
    ok: 0,
    tooHard: 0,
  },// ISO-String
};

// Hilfsfunktion: Progress laden
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);

    // defensive merge, falls sich das Schema ändert
    return {
      ...defaultProgress,
      ...parsed,
      moods: {
        ...defaultProgress.moods,
        ...(parsed.moods || {}),
      },
    };
  } catch {
    return { ...defaultProgress };
  }
}

// Hilfsfunktion: Progress speichern
function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Wird aufgerufen, wenn der User eine Route als abgeschlossen markiert
// distance/ascent in Metern, mood = "relaxed" | "neutral" | "active", roundTrip = bool
export function registerCompletedRide({ distance = 0, ascent = 0, mood, roundTrip, path = null, difficulty = null }) {
  const prev = loadProgress();

  const ride = {
    id: crypto?.randomUUID?.() || String(Date.now()),
    at: new Date().toISOString(),
    distance,
    ascent,
    mood,
    roundTrip,
    feedback: null, // wird später gesetzt
    path,
    difficulty: difficulty || null,
  };

  const next = {
    ...prev,
    totalRides: prev.totalRides + 1,
    totalDistance: prev.totalDistance + (distance || 0),
    totalAscent: prev.totalAscent + (ascent || 0),
    roundTrips: prev.roundTrips + (roundTrip ? 1 : 0),
    lastRideAt: ride.at,

    rides: [ride, ...(prev.rides || [])].slice(0, 200),

    moods: {
      ...prev.moods,
      ...(mood ? { [mood]: (prev.moods?.[mood] || 0) + 1 } : {}),
    },

    feedbackStats: {
      ...(prev.feedbackStats || { tooEasy: 0, ok: 0, tooHard: 0 }),
    },
  };

  saveProgress(next);
  return next;
}

export function getWeeklySummary(progress) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const rides = (progress.rides || []).filter((r) => new Date(r.at) >= weekAgo);

  const totalDistance = rides.reduce((s, r) => s + (r.distance || 0), 0);
  const totalAscent = rides.reduce((s, r) => s + (r.ascent || 0), 0);

  return {
    count: rides.length,
    distanceKm: totalDistance / 1000,
    ascentM: totalAscent,
  };
}



// Definition aller Badges + Bedingungen
const BADGES = [
  {
    id: "first_ride",
    title: "Erste Fahrt",
    description: "Du hast deine erste CityCycler-Route abgeschlossen.",
    check: (p) => p.totalRides >= 1,
  },
  {
    id: "five_rides",
    title: "5 Fahrten",
    description: "Du hast insgesamt 5 Routen abgeschlossen.",
    check: (p) => p.totalRides >= 5,
  },
  {
    id: "distance_10km",
    title: "10 km geschafft",
    description: "Du bist insgesamt mindestens 10 km gefahren.",
    check: (p) => p.totalDistance >= 10_000,
  },
  {
    id: "climber_100hm",
    title: "100 Höhenmeter",
    description: "Du hast insgesamt mindestens 100 Höhenmeter gesammelt.",
    check: (p) => p.totalAscent >= 100,
  },
  {
    id: "mood_explorer",
    title: "Mood-Explorer",
    description: "Du bist in allen drei Stimmungen mindestens einmal gefahren.",
    check: (p) =>
      ["relaxed", "neutral", "active"].every(
        (mood) => (p.moods?.[mood] || 0) >= 1
      ),
  },
  {
    id: "roundtrip_fan",
    title: "Rundtour-Fan",
    description: "Du hast mindestens 3 Rundtouren abgeschlossen.",
    check: (p) => p.roundTrips >= 3,
  },
];

// Gibt nur die erfüllten Badges zurück
export function listUnlockedBadges(progress) {
  return BADGES.filter((badge) => badge.check(progress));
}

// Optional: falls du später mal ALLE Badges anzeigen willst (auch gesperrte)
export function listAllBadges(progress) {
  return BADGES.map((badge) => ({
    ...badge,
    achieved: badge.check(progress),
  }));
}

export function setRideFeedback(rideId, feedback) {
  const prev = loadProgress();

  const rides = (prev.rides || []).map((r) =>
    r.id === rideId ? { ...r, feedback } : r
  );

  const feedbackStats = { tooEasy: 0, ok: 0, tooHard: 0 };
  for (const r of rides) {
    if (r.feedback) feedbackStats[r.feedback]++;
  }

  const next = {
    ...prev,
    rides,
    feedbackStats,
  };

  saveProgress(next);
  return next;
}
