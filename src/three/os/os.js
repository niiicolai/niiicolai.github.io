import * as THREE from "three";
import { addResizeEvent } from "../scene/resizeEvent";
import { createBrowser } from "./browser";
import { createDesktop } from "./desktop";
import { createStartBar } from "./startBar";
import { createStartMenu } from "./startMenu";
import { createTrashbin } from "./trashbin";
import { createLightApp } from "./lightApp";
import { createPaintApp } from "./paint";
import { createSnakeApp } from "./snake";
import { createStartScreen } from "./startScreen";

export async function createOS(osMesh, camera, lightOptions, controlsOptions, mobile) {
  const os = {
    __mesh: osMesh,
    __camera: camera,
  };

  os.eventDispatcher = new THREE.EventDispatcher();
  os.isActive = false;
  os.outOfFocus = false;
  controlsOptions.controls.target.set(0.0, 1.12, -0.5)

  os.focus = (state) => {
    if (state) {
      os.outOfFocus = false;
      camera.position.set(0, 1.12, 0.4)
      camera.rotation.set(0, 0, 0);
    } else {
      mobile.focus();
      os.outOfFocus = true;
    }
  }
  
  os.shouldDisplayMobile = () => window.innerWidth < 800;
  os.resizeToDisplay = () => {
    if (os.isActive) {
      const displayMobile = os.shouldDisplayMobile();

      if (os.outOfFocus && !displayMobile) {
        os.focus(true);
      } else if (!os.outOfFocus && displayMobile) {
        os.focus(false);
      }
    }
  }

  addResizeEvent(() => os.resizeToDisplay())
  
  os.turnOn = () => {
    controlsOptions.setUseControls(false);
    os.startScreen.toggle();
    os.startScreen.load();
    osMesh.visible = true;
    os.isActive = true;
    os.eventDispatcher.dispatchEvent({ type: 'stateChanged' });
    mobile.home.window.setVisible(true);
  };

  os.turnOff = () => {
    os.outOfFocus = false;
    controlsOptions.setUseControls(true);
    osMesh.visible = false;
    camera.position.set(0, 1, 2);
    os.isActive = false;
    os.eventDispatcher.dispatchEvent({ type: 'stateChanged' });
    mobile.home.window.setVisible(false);
  };

  os.browser = await createBrowser(os, camera);
  os.trash = await createTrashbin(os, camera);
  os.lightApp = await createLightApp(os, camera, lightOptions);
  os.paint = await createPaintApp(os, camera);
  os.snake = await createSnakeApp(os, camera);
  os.startScreen = await createStartScreen(os, camera);
  os.desktop = createDesktop(os, camera);
  os.startMenu = createStartMenu(os, camera);
  os.startBar = createStartBar(os, camera);
  
  return os;
}
