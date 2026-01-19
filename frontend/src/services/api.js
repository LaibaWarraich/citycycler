// frontend/src/services/api.js
export async function getRoute(
  mood = "neutral",
  startPoint,
  endPoint,
  roundTrip = false
) {
  const params = new URLSearchParams();
  params.set("mood", mood);
  params.set("roundTrip", roundTrip ? "true" : "false");

  if (startPoint) {
    params.set("startLat", startPoint[0]); // [lat, lng]
    params.set("startLng", startPoint[1]);
  }
  if (endPoint && !roundTrip) {
    // bei Rundtour ignorieren wir das explizite Ziel
    params.set("endLat", endPoint[0]);
    params.set("endLng", endPoint[1]);
  }

  console.log("Frontend ruft Backend auf:", params.toString());

  const res = await fetch(`http://localhost:3000/route?${params.toString()}`);

  if (!res.ok) {
    console.error("Fehler vom Backend:", res.status);
    return null;
  }

  return res.json();
}

// Geocoding bleibt wie gehabt
export async function geocodeAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url, {
    headers: {
      "Accept-Language": "de",
    },
  });
  if (!res.ok) {
    console.error("Geocoding-Fehler:", res.status);
    return null;
  }
  const data = await res.json();
  if (!data || data.length === 0) {
    alert("Adresse wurde nicht gefunden.");
    return null;
  }
  const hit = data[0];
  return {
    lat: parseFloat(hit.lat),
    lng: parseFloat(hit.lon),
    displayName: hit.display_name,
  };
}


