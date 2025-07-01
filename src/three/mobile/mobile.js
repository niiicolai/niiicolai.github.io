import * as THREE from "three";
import { createHome } from "./home";
import { createBrowser } from "./browser";
import { createLightApp } from "./lightApp";
import { createPaint } from "./paint";
import { createSnake } from "./snake";

export async function createMobile(
  options = { scene: null, camera: null, controlsOptions: null, lightOptions: null }
) {
  const mobile = {
    __group: new THREE.Group(),
    __windows: [],
    options
  };

  mobile.setOs = (os) => mobile.options.os = os;

  mobile.focus = () => {
    options.camera.position.set(-0.6241027968461059, 0.4872255796506548, -0.15059866370400465);
    options.camera.rotation.set(-.13,.2,.025);
  };

  options.scene.add(mobile.__group);
  mobile.__group.position.set(-0.649, 0.48, -0.27);
  mobile.__group.rotation.y += 0.2;

  mobile.hideAllWindows = () => {
    for (var w of mobile.__windows) {
        w.setVisible(false);
    }
  }

  mobile.createWindow = (
    options = {
      geometry: new THREE.PlaneGeometry(0.16, 0.26),
      material: new THREE.MeshBasicMaterial(),
      position: new THREE.Vector3(0, 0, 0.02),
      rotation: new THREE.Quaternion(-0.123, 0, 0, 0),
    }
  ) => {
    const mesh = new THREE.Mesh(options.geometry, options.material);
    const position = options.position;
    mobile.__group.add(mesh);
    mesh.position.copy(options.position);
    mesh.rotation.x = options.rotation.x;
    mesh.rotation.y = options.rotation.y;
    mesh.rotation.z = options.rotation.z;
    mesh.visible = false;
    
    const setVisible = (state) => {
        if (state) {
            mobile.hideAllWindows();
            mesh.position.copy(position);
        } else {
            mesh.position.set(99, 0, 0);
        }
        mesh.visible = state;
    }

    const toggle = () => {
        setVisible(!mesh.visible);
    }

    const w =  { mesh, setVisible, toggle };

    mobile.__windows.push(w);

    return w;
  };

  mobile.home = createHome(mobile);
  mobile.browser = createBrowser(mobile);
  mobile.paint = createPaint(mobile);
  mobile.snake = createSnake(mobile);
  mobile.lightApp = createLightApp(mobile);

  return mobile;
}
