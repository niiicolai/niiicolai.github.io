import * as THREE from "three";

export function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

export function resizeFovToDisplaySize(camera) {
  return () => {
    camera.fov = Math.max(80, Math.min(130, 75 * (1200 / window.innerWidth)));
    camera.updateProjectionMatrix();
  };
}
