import { Cartesian3, Cesium3DTileset, Viewer as CesiumViewer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useLayoutEffect, useRef, useState } from "react";

export const Viewer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [Viewer, setViewer] = useState<CesiumViewer>();

  useLayoutEffect(() => {
    (async () => {
      if (ref.current == null) {
        setViewer(undefined);
        return;
      }

      const viewer = new CesiumViewer(ref.current, {
        // 今回は使用しないため、すべての組み込みUIを非表示にします。
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
      });

      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(138, 29, 4000000),
        orientation: {
          heading: 0, // 水平方向の回転度（ラジアン）
          pitch: -1.4, // 垂直方向の回転度（ラジアン） 上を見上げたり下を見下ろしたり
          roll: 0,
        },
      });
      viewer.resolutionScale = window.devicePixelRatio;
      const scene = viewer.scene;
      scene.skyBox = undefined as any;
      scene.globe.depthTestAgainstTerrain = true;

      const tileset = await Cesium3DTileset.fromUrl(
        import.meta.env.VITE_PLATEAU_URL
      );

      scene.primitives.add(tileset);

      viewer.flyTo(tileset);
      setViewer(viewer);
      return () => {
        viewer.destroy();
      };
    })();
  }, []);
  return <div ref={ref} className="h-screen w-screen"></div>;
};
