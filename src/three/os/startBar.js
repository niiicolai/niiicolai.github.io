import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { loopDispatcher } from "../scene/loopEvent";
import { createButton } from "../button";

export function createStartBar(os, camera) {
  const startBarMesh = os.__mesh.children[0].children.find(
    (c) => c.name == "Monitor_StartBar"
  );
  const startBar = {
    __mesh: startBarMesh,
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        os.__mesh,
        {
          iconGeometry: new THREE.PlaneGeometry(0.07, 0.07),
          iconRotation: new THREE.Vector3(0, -Math.PI / 2, 0),
          fontSize: 0.02,
        }
      );
      addClickEvent(btn, camera, () => {
        if (os.__mesh.visible) callback();
      });
    },
  };

  startBar.__createButton(
    "",
    "/icons/startIcon.png",
    new THREE.Vector3(0.36, 1.757, -0),
    new THREE.Vector2(0, 0),
    () => os.startMenu.toggle()
  );

  startBar.__createButton(
    "",
    "/icons/globeIcon.png",
    new THREE.Vector3(0.36, 1.757, 0.06),
    new THREE.Vector2(0, 0),
    () => os.browser.toggle()
  );

  const timeText = new Text();
  timeText.fontSize = .018;
  startBar.__mesh.add(timeText);
  timeText.color = new THREE.Color().setHex(0xFFFFFF);
  timeText.rotation.y = -Math.PI / 2;
  timeText.position.x = -0.005;
  timeText.position.y = 0.025;
  timeText.position.z = 0.666;

  const dateText = new Text();
  dateText.fontSize = .018;
  startBar.__mesh.add(dateText);
  dateText.color = new THREE.Color().setHex(0xFFFFFF);
  dateText.rotation.y = -Math.PI / 2;
  dateText.position.x = -0.005;
  dateText.position.y = 0.005;
  dateText.position.z = 0.668;

  const updateTimeText = () => {
    const now = new Date();
    timeText.text = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dateText.text = new Date().toLocaleDateString();
    timeText.sync();
    dateText.sync();
  }
  loopDispatcher.addEventListener('loopEvent', () => updateTimeText());
  updateTimeText();

  return startBar;
}
