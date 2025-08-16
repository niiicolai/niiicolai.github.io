import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { createWindow } from "./window";

export async function createTrashbin(os, camera) {
  const { windowMesh, toggleWindow } = await createWindow("/icons/trash-icon.png", new THREE.Vector3(0.355, 2.15, 0), os.__mesh, camera, {
    windowGeometry: new THREE.PlaneGeometry(.5, 0.6),
    windowMaterial: new THREE.MeshBasicMaterial(),
    fontMaterial: new THREE.MeshBasicMaterial({ color: new THREE.Color(0).setHex( 0x112233 )}),
    fontSize: 0.03,
    dragBoundaries: {
      zMin: -0.5080321285140572,
      zMax: 0.5058232931726915,
      yMin: 2.0891841779975326,
      yMax: 2.2389987639060496,
    },
    logoIconOffset: new THREE.Vector3(0.25, 0, 0),
    closeBtnOffset: new THREE.Vector3(-0.25, 0, 0)
  });
  
  const trash = {
    __draggingOffset: new THREE.Vector3(),
    __mesh: windowMesh,
    __createButton: (mesh, callback) => {
      addClickEvent(mesh, camera, () => {
        if (trash.__mesh.visible) callback();
      });
    },
  };

  trash.toggle = () => toggleWindow();

  const emptyText = new Text();
  trash.__mesh.add(emptyText);
  emptyText.text = "The trashbin is empty.";
  emptyText.fontSize = 0.02;
  emptyText.position.x = -0.1;
  emptyText.position.y = -0.015;
  emptyText.color = 0x000000;
  emptyText.sync();

  return trash;
}
