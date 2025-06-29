import * as THREE from "three";
import { createBrowser } from "./browser";
import { createDesktop } from "./desktop";
import { createStartBar } from "./startBar";
import { createStartMenu } from "./startMenu";
import { createTrashbin } from "./trashbin";
import { createLightApp } from "./lightApp";
import { createPaintApp } from "./paint";
import { createSnakeApp } from "./snake";
import { createStartScreen } from "./startScreen";

export async function createOS(osMesh, camera, lightOptions) {
  const os = {
    __mesh: osMesh,
    __camera: camera,
  };

  os.eventDispatcher = new THREE.EventDispatcher();
  os.isActive = false;

  os.turnOn = () => {
    os.startScreen.toggle();
    os.startScreen.load();
    osMesh.visible = true;
    os.isActive = true;
    os.eventDispatcher.dispatchEvent({ type: 'stateChanged' });
  };

  os.turnOff = () => {
    osMesh.visible = false;
    camera.position.set(0, 1, 2);
    os.isActive = false;
    os.eventDispatcher.dispatchEvent({ type: 'stateChanged' });
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
