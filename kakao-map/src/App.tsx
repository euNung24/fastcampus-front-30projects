import React, { useEffect } from "react";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
    loadMap: () => void;
  }
}
function App() {
  useEffect(() => {
    window.loadMap();
    return () => {};
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
}

export default App;
