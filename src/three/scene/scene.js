import * as THREE from "three";

export function setupScene() {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xffffff);

  return scene;
}
