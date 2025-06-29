import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { createWindow } from "./window";
import { createButton } from "./button";

export async function createLightApp(os, camera, lightOptions) {
  const { windowMesh, toggleWindow } = await createWindow(
    "/icons/lightbulbIcon.png",
    new THREE.Vector3(0.350, 2.15, 0),
    os.__mesh,
    camera,
    {
      windowGeometry: new THREE.PlaneGeometry(0.5, 0.6),
      windowMaterial: new THREE.MeshBasicMaterial(),
      fontMaterial: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0x112233),
      }),
      fontSize: 0.03,
      dragBoundaries: {
        zMin: -0.5080321285140572,
        zMax: 0.5058232931726915,
        yMin: 2.0891841779975326,
        yMax: 2.2389987639060496,
      },
      logoIconOffset: new THREE.Vector3(0.25, 0, 0),
      closeBtnOffset: new THREE.Vector3(-0.25, 0, 0),
      disableDrag: false,
      useHeaderForDrag: true,
    }
  );
  const lightApp = {
    __draggingOffset: new THREE.Vector3(),
    __mesh: windowMesh,
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        lightApp.__mesh,
        {
          iconGeometry: new THREE.PlaneGeometry(0.05, 0.05),
          iconRotation: new THREE.Vector3(0, 0, 0),
          textColor: new THREE.Color().setHex(0x000000),
          fontSize: 0.02,
        }
      );
      addClickEvent(btn, camera, () => {
        if (lightApp.__mesh.visible) callback();
      });
    },
    toggle: () => toggleWindow(),
    setLightColor: (color) => lightOptions.setPointLightColor(color),
  };

  const titleText = new Text();
  lightApp.__mesh.add(titleText);
  titleText.text = "Control Light:";
  titleText.fontSize = 0.025;
  titleText.position.x = -0.2;
  titleText.position.y = 0.205;
  titleText.color = 0x000000;
  titleText.sync();

  const descText = new Text();
  lightApp.__mesh.add(descText);
  descText.text = "Select your favorite color for the room.";
  descText.fontSize = 0.02;
  descText.position.x = -0.2;
  descText.position.y = 0.165;
  descText.color = 0x000000;
  descText.sync();

  lightApp.__createButton(
    "White Light",
    "/icons/whiteColor.png",
    new THREE.Vector3(-0.17, 0.06, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      lightApp.setLightColor(new THREE.Color().setHex(0xFFFFFF))
    }
  );

  lightApp.__createButton(
    "Red Light",
    "/icons/redColor.png",
    new THREE.Vector3(0.06, 0.06, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
        lightApp.setLightColor(new THREE.Color().setHex(0xFF0000))
    }
  );

  lightApp.__createButton(
    "Green Light",
    "/icons/greenColor.png",
    new THREE.Vector3(-0.17, -0.04, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      lightApp.setLightColor(new THREE.Color().setHex(0x00FF00))
    }
  );

  lightApp.__createButton(
    "Blue Light",
    "/icons/blueColor.png",
    new THREE.Vector3(0.06, -0.04, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
        lightApp.setLightColor(new THREE.Color().setHex(0x00FFFF))
    }
  );

  lightApp.__createButton(
    "Yellow Light",
    "/icons/yellowColor.png",
    new THREE.Vector3(-0.17, -0.14, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      lightApp.setLightColor(new THREE.Color().setHex(0xFFFF00))
    }
  );

  lightApp.__createButton(
    "Orange Light",
    "/icons/orangeColor.png",
    new THREE.Vector3(0.06, -0.14, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
        lightApp.setLightColor(new THREE.Color().setHex(0xFFA500))
    }
  );

  return lightApp;
}
