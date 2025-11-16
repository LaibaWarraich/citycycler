export async function getRoute(mood = "neutral") {
  console.log("Frontend ruft Backend auf:", mood);

  const res = await fetch(`http://localhost:3000/route?mood=${mood}`);

  if (!res.ok) {
    console.error("Fehler vom Backend:", res.status);
    return null;
  }

  return res.json();
}

