import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { createButton } from "../button";

export function createLightApp(mobile) {
  const lightApp = {
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const parent = lightApp.window.mesh;
      const btn = await createButton(text, iconSrc, pos, textOffset, parent, {
        iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.007,
      });
      addClickEvent(btn, mobile.options.camera, (e) => {
        if (parent.visible) callback(e);
      });
      return btn;
    },
  };

  lightApp.window = mobile.createWindow({
    geometry: new THREE.PlaneGeometry(0.16, 0.26),
    material: new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 1,
    }),
    position: new THREE.Vector3(0, 0, 0.02),
    rotation: new THREE.Quaternion(-0.123, 0, 0, 0),
  });

  lightApp.__createButton(
    "",
    "/icons/left-long-solid-fontawesome.png",
    new THREE.Vector3(-0.058, 0.11, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => mobile.home.window.setVisible(true)
  );

  const titleText = new Text();
  lightApp.window.mesh.add(titleText);
  titleText.text = "Control Light";
  titleText.fontSize = 0.01;
  titleText.position.x = -0.038;
  titleText.position.y = 0.118;
  titleText.position.z = 0.001;
  titleText.color = 0x000000;
  titleText.sync();

  lightApp.__createButton(
    "White Light",
    "/icons/whiteColor.png",
    new THREE.Vector3(-0.028, 0.05, 0.001),
    new THREE.Vector2(0.017, 0.013),
    () => {
      mobile.options.lightOptions.setPointLightColor(new THREE.Color().setHex(0xFFFFFF))
    }
  );

  lightApp.__createButton(
    "Red Light",
    "/icons/redColor.png",
    new THREE.Vector3(0.028, 0.05, 0.001),
    new THREE.Vector2(0.014, 0.013),
    () => {
        mobile.options.lightOptions.setPointLightColor(new THREE.Color().setHex(0xFF0000))
    }
  );

  lightApp.__createButton(
    "Green Light",
    "/icons/greenColor.png",
    new THREE.Vector3(-0.028, 0.0, 0.001),
    new THREE.Vector2(0.019, 0.013),
    () => {
      mobile.options.lightOptions.setPointLightColor(new THREE.Color().setHex(0x00FF00))
    }   
  );

  lightApp.__createButton(
    "Blue Light",
    "/icons/blueColor.png",
    new THREE.Vector3(0.028, 0.0, 0.001),
    new THREE.Vector2(0.016, 0.013),
    () => {
        mobile.options.lightOptions.setPointLightColor(new THREE.Color().setHex(0x00FFFF))
    }
  );

  lightApp.__createButton(
    "Yellow Light",
    "/icons/yellowColor.png",
    new THREE.Vector3(-0.028, -0.05, 0.001),
    new THREE.Vector2(0.018, 0.013),
    () => {
      mobile.options.lightOptions.setPointLightColor(new THREE.Color().setHex(0xFFFF00))
    }
  );

  lightApp.__createButton(
    "Orange Light",
    "/icons/orangeColor.png",
    new THREE.Vector3(0.028, -0.05, 0.001),
    new THREE.Vector2(0.019, 0.013),
    () => {
        mobile.options.lightOptions.setPointLightColor(new THREE.Color().setHex(0xFFA500))
    }
  );

  return lightApp;
}
