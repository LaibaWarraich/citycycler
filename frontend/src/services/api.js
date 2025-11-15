export async function getTestRoute() {
  const response = await fetch("http://localhost:3000/route");
  return response.json();
}
