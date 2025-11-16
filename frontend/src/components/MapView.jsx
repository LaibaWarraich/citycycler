import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";

export default function MapView({ routeCoords }) {
  const viennaCenter = [48.2082, 16.3738];
  const hasRoute = Array.isArray(routeCoords) && routeCoords.length > 0;
  
  let startLatLng = null;
  let endLatLng = null;

  if (hasRoute) {
    const first = routeCoords[0];                          // [lon, lat]
    const last = routeCoords[routeCoords.length - 1];      // [lon, lat]

    startLatLng = [first[1], first[0]];  // [lat, lon]
    endLatLng = [last[1], last[0]];      // [lat, lon]
  }

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

        {hasRoute && (
          <>
            <Polyline
              positions={routeCoords.map(c => [c[1], c[0]])}
              pathOptions={{ color: "blue", weight: 4 }}
            />

            <Marker position={startLatLng}>
              <Popup>Start</Popup>
            </Marker>

            <Marker position={endLatLng}>
              <Popup>Ziel</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}
