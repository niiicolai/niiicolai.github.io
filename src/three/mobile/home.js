import * as THREE from "three";
import { Text } from "troika-three-text";
import { loadTexture } from "../scene/texture";
import { addClickEvent } from "../scene/clickEvent";
import { createButton } from "../button";
import { loopDispatcher } from "../scene/loopEvent";

export function createHome(mobile) {
  const home = {
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const parent = home.window.mesh;
      const btn = await createButton(text, iconSrc, pos, textOffset, parent, {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color(),
        fontSize: 0.007,
      });
      addClickEvent(btn, mobile.options.camera, (e) => {
        if (parent.visible) callback(e);
      });
      return btn;
    },
  };

  home.window = mobile.createWindow({
    geometry: new THREE.PlaneGeometry(0.16, 0.26),
    material: new THREE.MeshPhysicalMaterial({
      color: 0x2d41d4,
      emissive: 0x2d41d4,
      emissiveIntensity: 1,
    }),
    position: new THREE.Vector3(0, 0, 0.02),
    rotation: new THREE.Quaternion(-0.123, 0, 0, 0),
  });

  loadTexture("/icons/barsIcon.png").then((map) => {
    const signal = new THREE.Mesh(
      new THREE.PlaneGeometry(0.01, 0.01),
      new THREE.MeshPhysicalMaterial({ map, transparent: true, alphaTest: 0.5 })
    );
    home.window.mesh.add(signal);
    signal.position.set(-0.074, 0.122, 0.001);
  });

  const timeText = new Text();
  timeText.fontSize = 0.0068;
  home.window.mesh.add(timeText);
  timeText.color = new THREE.Color().setHex(0xffffff);
  timeText.position.x = -0.068;
  timeText.position.y = 0.127;
  timeText.position.z = 0.001;

  const dateText = new Text();
  dateText.fontSize = 0.0068;
  home.window.mesh.add(dateText);
  dateText.color = new THREE.Color().setHex(0xffffff);
  dateText.position.x = 0.048;
  dateText.position.y = 0.127;
  dateText.position.z = 0.001;

  const updateTimeText = () => {
    const now = new Date();
    timeText.text = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    dateText.text = new Date().toLocaleDateString();
    timeText.sync();
    dateText.sync();
  };
  loopDispatcher.addEventListener("loopEvent", () => updateTimeText());
  updateTimeText();

  home.__createButton(
    "Browser",
    "/icons/globeIcon.png",
    new THREE.Vector3(-0.05, 0.09, 0.0012),
    new THREE.Vector2(0.013, 0.014),
    () => mobile.browser.window.setVisible(true)
  );

  home.__createButton(
    "Light App",
    "/icons/lightbulbIcon.png",
    new THREE.Vector3(-0.003, 0.09, 0.0012),
    new THREE.Vector2(0.016, 0.014),
    () => mobile.lightApp.window.setVisible(true)
  );

  home.__createButton(
    "Paint App",
    "/icons/paintingIcon.png",
    new THREE.Vector3(0.048, 0.09, 0.0012),
    new THREE.Vector2(0.016, 0.014),
    () => mobile.paint.window.setVisible(true)
  );

  home.__createButton(
    "Shutdown",
    "/icons/turnoffIcon.png",
    new THREE.Vector3(-0.05, 0.04, 0.0012),
    new THREE.Vector2(0.016, 0.014),
    () => mobile.options.os.turnOff(),
  );

  /*
  home.__createButton(
    "Snake Game",
    "/icons/snakegameIcon.png",
    new THREE.Vector3(-0.05, 0.07, 0.0012),
    new THREE.Vector2(0.02, 0.014),
    () => mobile.snake.window.setVisible(true),
  );*/

  return home;
}
