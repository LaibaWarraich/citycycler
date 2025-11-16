import { MapContainer, TileLayer, Polyline } from "react-leaflet";

export default function MapView({ routeCoords }) {
  const viennaCenter = [48.2082, 16.3738];

  return (
    <div style={{ width: "100%", height: "70vh", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer
        center={viennaCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* POLYLINE MUSS HIER REIN */}
        {Array.isArray(routeCoords) && routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords.map(c => [c[1], c[0]])}
            pathOptions={{ color: "blue", weight: 4 }}
          />
        )}
      </MapContainer>
    </div>
  );
}
