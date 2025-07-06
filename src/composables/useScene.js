import { ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  addClickEventListener,
  removeClickEventListener,
} from "../three/scene/clickEvent";
import {
  addDragEventListener,
  removeDragEventListener,
} from "../three/scene/dragEvent";
import {
  addKeyEventListener,
  removeKeyEventListener,
} from "../three/scene/keyEvent";
import {
  addResizeEventListener,
  removeResizeEventListener,
  addResizeEvent,
} from "../three/scene/resizeEvent";
import { addLoopListener, removeLoopListener } from "../three/scene/loopEvent";
import { resizeRendererToDisplaySize, resizeFovToDisplaySize } from "../three/scene/camera";
import { setupScene } from "../three/scene/scene";
import { setupRenderer } from "../three/scene/renderer";
import { setupMeshes } from "../three/scene/meshes";
import { setupLight } from "../three/scene/light";
import { createOS } from "../three/os/os";
import { createMobile } from "../three/mobile/mobile";

const adapter = ref({ isReady: false });

export function useScene() {
  const onMounted = async (
    canvas,
    options = {
      camera: {
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
      },
    }
  ) => {

    const scene = setupScene();
    const renderer = setupRenderer(canvas);
    const camera = new THREE.PerspectiveCamera(
      options.camera.fov,
      options.camera.aspect,
      options.camera.near,
      options.camera.far
    );

    let useControls = true;
    const controls = new OrbitControls(camera, renderer.domElement);
    const setUseControls = (state) => {
      useControls = state;
      controls.enabled = state;
    };
    const controlsOptions = { controls, setUseControls };
    controls.enableDamping = true;
    controls.autoRotate = true

    const lightOptions = setupLight(scene);
    const osMesh = await setupMeshes(scene);
    const mb = await createMobile({ scene, camera, controlsOptions, lightOptions });
    const os = await createOS(osMesh, camera, lightOptions, controlsOptions, mb);
    mb.setOs(os);

    camera.position.x = 0;
    camera.position.z = 2;
    camera.position.y = 1;
    camera.lookAt(0, 1, 0);

    addResizeEvent(resizeFovToDisplaySize(camera));
    resizeFovToDisplaySize(camera)();

    addResizeEventListener();
    addKeyEventListener();
    addClickEventListener();
    addDragEventListener();
    addLoopListener();

    const animate = () => {
      requestAnimationFrame(animate);

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      if (useControls) controls.update();
      renderer.render(scene, camera);
    };

    animate();

    adapter.value = { scene, camera, renderer, os, isReady: true, };
  };

  const onUnmounted = () => {
    removeResizeEventListener();
    removeKeyEventListener();
    removeClickEventListener();
    removeDragEventListener();
    removeLoopListener();
    adapter.value = {};
  };

  return {
    onMounted,
    onUnmounted,
    adapter,
  };
}
