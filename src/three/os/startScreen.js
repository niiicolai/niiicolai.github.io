import * as THREE from "three";
import { Text } from "troika-three-text";
import { createGradientTexture } from "../scene/texture";
import { hideAllWindows } from "./window";

export async function createStartScreen(os, camera) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.515, 0.82),
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex(0x000000) })
  );
  os.__mesh.add(mesh);
  mesh.visible = false;
  mesh.position.set(0.358, 2.135, 0);
  mesh.rotation.y = -Math.PI / 2;
  const startScreen = {
    __mesh: os.__mesh,
    toggle: () => {
        mesh.visible = !mesh.visible;
        if (mesh.visible) {
            hideAllWindows();
            mesh.position.set(0.358, 2.135, 0);
            setBgOpacity(1);
        }
    },
  };

  const gradientTexture = createGradientTexture([
    [0, "#ff5f6d"], // red
    [0.2, "#ffc371"], // orange/yellow
    [0.4, "#47cf73"], // green
    [0.6, "#00c6fb"], // blue
    [0.8, "#845ec2"], // indigo
    [1, "#ff5fcf"], // pink
  ]);
  const textMaterial = new THREE.MeshBasicMaterial({
    map: gradientTexture,
    transparent: true,
    opacity: 0.0,
    alphaTest: 0.01,
  });

  const titleText = new Text();
  startScreen.__mesh.add(titleText);
  titleText.text = "Nico OS";
  titleText.fontSize = 0.145;
  titleText.rotation.y = -Math.PI / 2;
  titleText.position.z = -0.27;
  titleText.position.y = 2.3;
  titleText.position.x = 0.35;
  titleText.material = textMaterial;
  titleText.sync();

  const descText = new Text();
  startScreen.__mesh.add(descText);
  descText.text = "Version 0.0.2";
  descText.fontSize = 0.045;
  descText.rotation.y = -Math.PI / 2;
  descText.position.z = -0.14;
  descText.position.y = 2.1;
  descText.position.x = 0.35;
  descText.material = textMaterial;
  descText.sync();

  const cameraTarget = new THREE.Vector3(0, 1.12, 0.4);
  let fadeInDuration = 1000;
  let visibleDuration = 2000;
  let fadeOutDuration = 1000;
  let startTime = null;
  let intervalId = null;

  function setTextOpacity(opacity) {
    titleText.material.opacity = opacity;
    descText.material.opacity = opacity;
    titleText.material.needsUpdate = true;
    descText.material.needsUpdate = true;
  }

  function setBgOpacity(opacity) {
    mesh.material.opacity = opacity;
    mesh.material.transparent = true;
    mesh.material.needsUpdate = true;
  }

  startScreen.load = () => {
    mesh.visible = true;
    setBgOpacity(1);
    setTextOpacity(0);
    startTime = performance.now();

    // Store initial camera position for interpolation
    const initialCameraPosition = camera.position.clone();

    intervalId = setInterval(() => {
      let now = performance.now();
      let elapsed = now - startTime;

      // Fade in text and move camera
      if (elapsed < fadeInDuration) {
        let t = elapsed / fadeInDuration;
        setTextOpacity(t);
        // Interpolate camera position
        camera.position.lerpVectors(initialCameraPosition, cameraTarget, t);
        // Interpolate camera rotation to 0, 0, 0
        camera.rotation.x += (0 - camera.rotation.x) * t;
        camera.rotation.y += (0 - camera.rotation.y) * t;
        camera.rotation.z += (0 - camera.rotation.z) * t;
      }
      // Hold text visible
      else if (elapsed < fadeInDuration + visibleDuration) {
        setTextOpacity(1);
      }
      // Fade out bg
      else if (elapsed < fadeInDuration + visibleDuration + fadeOutDuration) {
        let t = (elapsed - fadeInDuration - visibleDuration) / fadeOutDuration;
        setBgOpacity(1 - t);
        setTextOpacity(1 - t);
      }
      // Done
      else {
        setBgOpacity(0);
        setTextOpacity(0);
        mesh.visible = false;
        mesh.position.set(99, 0, 0);
        os.browser.toggle();
        clearInterval(intervalId);
        os.resizeToDisplay();
      }
    }, 1000 / 60);
  };

  return startScreen;
}
