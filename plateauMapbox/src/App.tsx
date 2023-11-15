import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function App() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>(139.880394);
  const [lat, setLat] = useState<number>(35.632896);
  const [zoom, setZoom] = useState<number>(12);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const language = new MapboxLanguage();
    map.current.addControl(language);
  }, []);

  return <div ref={mapContainer} className="h-screen"></div>;
}
