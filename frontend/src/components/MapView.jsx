// frontend/src/components/MapView.jsx
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const startIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Grüner Marker (Ende)
const endIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick([e.latlng.lat, e.latlng.lng]); // [lat, lng]
      }
    },
  });
  return null;
}

function FitRoute({ routeCoords }) {
  const map = useMap();

  useEffect(() => {
    if (!Array.isArray(routeCoords) || routeCoords.length < 2) return;

    const latlngs = routeCoords.map((c) => [c[1], c[0]]);
    map.fitBounds(latlngs, { padding: [30, 30] });
  }, [map, routeCoords]);

  return null;
}

export default function MapView({ routeCoords, startPoint, endPoint, onMapClick, mood }) {
  const viennaCenter = [48.2082, 16.3738];
  const routeColor =
      mood === "active" ? "#ef4444" :   // rot
      mood === "neutral" ? "#f59e0b" :  // orange
      "#22c55e";                        // grün (relaxed/default)


  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
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

        {/* Klick-Handler für Start/Ziel */}
        <ClickHandler onMapClick={onMapClick} />

        {/* Marker für Startpunkt */}
        {startPoint && (
          <Marker position={startPoint} icon={startIcon}>
            <Popup>Start</Popup>
          </Marker>
        )}

        {/* Marker für Endpunkt */}
        {endPoint && (
          <Marker position={endPoint} icon={endIcon}>
            <Popup>Ziel</Popup>
          </Marker>
        )}

        {/* Route */}
        {Array.isArray(routeCoords) && routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords.map((c) => [c[1], c[0]])}
            pathOptions={{ color: routeColor, weight: 4 }}
          />
        )}
        {/* Zoom auf gespeicherte Route */}
        {Array.isArray(routeCoords) && routeCoords.length > 1 && (
        <FitRoute routeCoords={routeCoords} />
      )}
      </MapContainer>
    </div>
  );
}