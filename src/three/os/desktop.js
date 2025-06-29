import * as THREE from "three";
import { createButton } from "./button";
import { addClickEvent } from "../scene/clickEvent";

export function createDesktop(os, camera) {
  const desktop = {
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const btn = await createButton(text, iconSrc, pos, textOffset, os.__mesh);
      addClickEvent(btn, camera, () => {
        if (os.__mesh.visible) callback();
      });
    },
  };

  desktop.__createButton(
    "Browser",
    "/icons/globeIcon.png",
    new THREE.Vector3(0.36, 2.45, -0.65),
    new THREE.Vector2(0.04, 0.027),
    () => os.browser.toggle()
  );

  desktop.__createButton(
    "Light App",
    "/icons/trashIcon.png",
    new THREE.Vector3(0.36, 2.33, -0.65),
    new THREE.Vector2(0.045, 0.033),
    () => os.lightApp.toggle()
  );

  desktop.__createButton(
    "Paint App",
    "/icons/trashIcon.png",
    new THREE.Vector3(0.36, 2.205, -0.65),
    new THREE.Vector2(0.045, 0.033),
    () => os.paint.toggle()
  );

  desktop.__createButton(
    "Snake Game",
    "/icons/trashIcon.png",
    new THREE.Vector3(0.36, 2.08, -0.65),
    new THREE.Vector2(0.055, 0.033),
    () => os.snake.toggle()
  );

  desktop.__createButton(
    "Trashbin",
    "/icons/trashIcon.png",
    new THREE.Vector3(0.36, 1.93, 0.60),
    new THREE.Vector2(0.04, 0.033),
    () => os.trash.toggle()
  );

  return desktop;
}
