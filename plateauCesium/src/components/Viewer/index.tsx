import { Viewer as CesiumViewer, Color, Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useLayoutEffect, useRef, useState } from "react";

export const Viewer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [Viewer, setViewer] = useState<CesiumViewer>();

  useLayoutEffect(() => {
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

    // // Viewerのピクセル密度をデバイスのピクセル密度に合わせます。
    // // 注意：レンダリング品質は向上しますが、GPUへの負荷は大きくなります。
    viewer.resolutionScale = window.devicePixelRatio;

    // // 今回は使用しないため、組み込みのImagery Layerを削除します。
    // viewer.scene.imageryLayers.removeAll();

    // // 視覚的なパラメータ調整です。
    const scene = viewer.scene;
    scene.skyBox = undefined as any;

    // // デフォルトでは地形に対してデプステストが行われません（地面にめり込んでいる建物
    // // やその部分が表示される）。PLATEAUの3D都市モデルを用いる場合には基本的にtrueに
    // // することになるでしょう。
    scene.globe.depthTestAgainstTerrain = true;

    setViewer(viewer);

    return () => {
      viewer.destroy();
    };
  }, []);
  return <div ref={ref} className="h-screen w-screen"></div>;
};
