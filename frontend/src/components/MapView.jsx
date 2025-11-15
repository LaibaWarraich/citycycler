import { MapContainer, TileLayer } from "react-leaflet";

export default function MapView() {
  const viennaCenter = [48.2082, 16.3738]; 

  return (
    <div style={{ width: "100%", height: "calc(100vh - 80px)", maxHeight: "900px", borderRadius: "12px", overflow: "hidden" }}>
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
      </MapContainer>
    </div>
  );
}
