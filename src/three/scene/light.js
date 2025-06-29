import * as THREE from 'three'

export function setupLight(scene) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.position.set(0, 2, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.bottom = -20;
  directionalLight.shadow.camera.left = -20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 1000;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 4.5);
  pointLight.position.set(0, 1.5, 3);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xffffff, 4.5);
  pointLight2.position.set(-1.15, 1, -0.2);
  pointLight2.castShadow = true;
  scene.add(pointLight2);

  const setPointLightColor = (color) => {
    pointLight.color = color;
    pointLight2.color = color;
  }

  return {
    setPointLightColor
  };
}
