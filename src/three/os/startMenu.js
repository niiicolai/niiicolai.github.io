import * as THREE from "three";
import { addClickEvent } from "../scene/clickEvent";
import { createButton } from "./button";

export function createStartMenu(os, camera) {
  const startMenuWindow = os.__mesh.children[0].children.find(
    (c) => c.name == "Monitor_StartMenu"
  );
  const startMenu = {
    __mesh: startMenuWindow,
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        startMenu.__mesh,
        {
          iconGeometry: new THREE.PlaneGeometry(0.4, 0.4),
          iconRotation: new THREE.Vector3(-Math.PI / 2, 0, -Math.PI / 2),
          fontSize: 0.08,
          textColor: new THREE.Color().setHex(0x000000)
        }
      );
      addClickEvent(btn, camera, () => {
        if (startMenu.__mesh.visible) callback();
      });
    },
  };

  startMenu.toggle = () => {
    startMenu.__mesh.visible = !startMenu.__mesh.visible;
  };

  startMenu.__createButton(
    "Browser",
    "/icons/globeIcon.png",
    new THREE.Vector3(1.2, 0.02, -0.6),
    new THREE.Vector2(0.16, 0.137),
    () => {
      os.browser.toggle();
      os.startMenu.toggle();
    }
  );

  startMenu.__createButton(
    "Light App",
    "/icons/trashIcon.png",
    new THREE.Vector3(1.2, 0.02, 0.0),
    new THREE.Vector2(0.18, 0.137),
    () => {
      os.lightApp.toggle();
      os.startMenu.toggle();
    }
  );

  startMenu.__createButton(
    "Paint App",
    "/icons/trashIcon.png",
    new THREE.Vector3(1.2, 0.02, 0.6),
    new THREE.Vector2(0.18, 0.137),
    () => {
      os.paint.toggle();
      os.startMenu.toggle();
    }
  );

  startMenu.__createButton(
    "Snake Game",
    "/icons/trashIcon.png",
    new THREE.Vector3(0.6, 0.02, -0.6),
    new THREE.Vector2(0.22, 0.137),
    () => {
      os.snake.toggle();
      os.startMenu.toggle();
    }
  );

  startMenu.__createButton(
    "Shutdown",
    "/icons/globeIcon.png",
    new THREE.Vector3(-0.56, 0.02, -0.62),
    new THREE.Vector2(0.175, 0.137),
    () => {
      os.turnOff();
      os.startMenu.toggle();
    }
  );

  startMenu.__mesh.visible = false;

  return startMenu;
}
