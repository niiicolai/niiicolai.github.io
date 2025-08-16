import * as THREE from "three";
import { addClickEvent } from "../scene/clickEvent";
import { createButton } from "../button";
import { Text } from "troika-three-text";

export function createSnake(mobile) {
  const snake = {
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const parent = snake.window.mesh;
      const btn = await createButton(text, iconSrc, pos, textOffset, parent, {
        iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
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

  snake.window = mobile.createWindow({
    geometry: new THREE.PlaneGeometry(0.16, 0.26),
    material: new THREE.MeshPhysicalMaterial({
      color: 0x333333,
      emissive: 0x333333,
      emissiveIntensity: 1,
    }),
    position: new THREE.Vector3(0, 0, 0.02),
    rotation: new THREE.Quaternion(-0.123, 0, 0, 0),
  });

  snake.__createButton(
    "",
    "/icons/arrow-left-icon.png",
    new THREE.Vector3(-0.058, 0.11, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => mobile.home.window.setVisible(true)
  );

  const titleText = new Text();
  snake.window.mesh.add(titleText);
  titleText.text = "Snake Game";
  titleText.fontSize = 0.01;
  titleText.position.x = -0.038;
  titleText.position.y = 0.118;
  titleText.position.z = 0.001;
  titleText.color = 0xFFFFFF;
  titleText.sync();

  return snake;
}
