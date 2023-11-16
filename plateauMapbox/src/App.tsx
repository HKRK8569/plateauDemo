import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";
import { Tile3DLayer } from "@deck.gl/geo-layers/typed";
import { Tiles3DLoader } from "@loaders.gl/3d-tiles";
import { MapboxLayer } from "@deck.gl/mapbox/typed";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function App() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>(139.760296);
  const [lat, setLat] = useState<number>(35.686067);
  const [zoom, setZoom] = useState<number>(15);

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

    const buildingsLayer = new MapboxLayer({
      id: "buildings",
      type: Tile3DLayer,
      data: import.meta.env.VITE_PLATEAU_URL,
      loader: Tiles3DLoader,
      loadOptions: {
        tileset: {
          maximumMemoryUsage: 16,
          viewDistanceScale: 5,
        },
      },
      getPointColor: [255, 255, 255],
      _subLayerProps: {
        scenegraph: { getColor: [255, 255, 255, 255] },
        mesh: { getColor: [255, 255, 255, 255] },
      },
    } as any);

    map.current.once("styledata", () => {
      map.current?.addLayer(buildingsLayer);
      map.current?.setLayerZoomRange("buildings", 15, 22.1);
    });
  }, []);

  return <div ref={mapContainer} className="h-screen"></div>;
}
