import * as THREE from 'three'

export function setupLight(scene) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(2, 4, 2);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.bottom = -20;
  directionalLight.shadow.camera.left = -20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 1000;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 1.2);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 5);
  pointLight.position.set(0, 1.5, 3);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xffffff, 5);
  pointLight2.position.set(-1.15, 1, -0.2);
  pointLight2.castShadow = true;
  scene.add(pointLight2);

  const accentLight = new THREE.PointLight(0xa6e22e, 1.2, 8);
  accentLight.position.set(1.5, 2.5, -1);
  scene.add(accentLight);

  const rimLight = new THREE.DirectionalLight(0x4466ff, 0.4);
  rimLight.position.set(-3, 2, -3);
  scene.add(rimLight);

  const setPointLightColor = (color) => {
    pointLight.color = color;
    pointLight2.color = color;
  };

  return { setPointLightColor };
}
