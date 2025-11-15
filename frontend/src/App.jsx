import { useEffect } from "react";
import { getTestRoute } from "./services/api";

function App() {
  useEffect(() => {
    getTestRoute().then((data) => {
      console.log("Backend Antwort:", data);
    });
  }, []);

  return <h1>CityCycler läuft 🚴‍♀️</h1>;
}

export default App;
