import * as THREE from "three";

export function setupScene() {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xDDDDDD);

  return scene;
}
