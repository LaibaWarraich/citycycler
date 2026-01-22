import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import BadgesPage from "./pages/BadgesPage";
import RidesPage from "./pages/RidesPage";
import RideDetailPage from "./pages/RideDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/badges" element={<BadgesPage />} />
      <Route path="/rides" element={<RidesPage />} />
      <Route path="/rides/:id" element={<RideDetailPage />} />
    </Routes>
  );
}
