import * as THREE from "three";
import { loadTexture } from "../scene/texture";
import { addClickEvent } from "../scene/clickEvent";
import { addDragEvent } from "../scene/dragEvent";
import { createButton } from "../button";

let noWindow = 0;
let windows = [];

export function hideAllWindows() {
  for (var w of windows) w();
}

export async function createWindow(
  iconSrc,
  pos,
  parent,
  camera,
  options = {
    windowGeometry: new THREE.PlaneGeometry(0.1, 0.1),
    windowMaterial: new THREE.MeshBasicMaterial(),
    fontMaterial: new THREE.MeshBasicMaterial(),
    fontSize: 1,
    dragBoundaries: {
      zMin: 0,
      zMax: 10,
      yMin: 0,
      yMax: 10,
    },
    logoIconOffset: null,
    closeBtnOffset: null,
    disableDrag: false,
    useHeaderForDrag: false,
  }
) {
  noWindow++;
  pos.x += noWindow * 0.001;
  const mesh = new THREE.Mesh(options.windowGeometry, options.windowMaterial);
  parent.add(mesh);
  mesh.rotation.y = -Math.PI / 2;
  mesh.position.copy(pos);

  const iconMap = await loadTexture(iconSrc);
  const iconMaterial = new THREE.MeshBasicMaterial({
    map: iconMap,
    transparent: true,
    alphaTest: 0.5,
  });
  const iconMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.06, 0.06),
    iconMaterial
  );
  mesh.add(iconMesh);
  iconMesh.position.set(-0.47, 0.27, 0);
  if (options.logoIconOffset) iconMesh.position.add(options.logoIconOffset);

  const closeBtnPosition = new THREE.Vector3(0.47, 0.27, 0);
  if (options.closeBtnOffset) closeBtnPosition.add(options.closeBtnOffset);
  const closeBtn = await createButton(
    "",
    "/icons/square-xmark-solid-fontawesome.png",
    closeBtnPosition,
    new THREE.Vector3(),
    mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
      iconRotation: new THREE.Vector3(0, 0, 0),
      fontSize: 0.02,
    }
  );

  const lineMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(options.windowGeometry.parameters.width, 0.06),
    new THREE.MeshPhysicalMaterial({ color: 0x333333, emissive: 0x333333 })
  );
  mesh.add(lineMesh);
  lineMesh.position.set(0, 0.27, 0);
  

  mesh.visible = false;

  /**
   * Move the mesh outside the monitor when it is off
   * to avoid collision detections.
   */
  const vectorBeforeHide = new THREE.Vector3().copy(mesh.position);
  vectorBeforeHide.copy(mesh.position);
  mesh.position.set(99, 0, 0);

  const showWindow = () => {
    if (!mesh.visible) {
      hideAllWindows();
      mesh.position.copy(vectorBeforeHide);
      mesh.visible = true;
    }
  };

  const hideWindow = () => {
    if (mesh.visible) {
      mesh.visible = false;
      vectorBeforeHide.copy(mesh.position);
      mesh.position.set(99, 0, 0);
    }
  };

  const toggleWindow = () => {
    if (mesh.visible) hideWindow();
    else showWindow();
  };

  addClickEvent(closeBtn, camera, () => {
    hideWindow();
  });

  if (options.disableDrag !== true) {
    const dragElement = options.useHeaderForDrag === true ? lineMesh : mesh ;
    addDragEvent(
      dragElement,
      camera,
      (pointer, camera, intersect) => {},
      () => {},
      (pointer, camera, velocity) => {
        const ySpeed = 0.6;
        const zSpeed = 1;

        mesh.position.set(
          mesh.position.x,
          mesh.position.y - velocity.y * ySpeed,
          mesh.position.z - velocity.x * zSpeed
        );

        if (mesh.position.z < options.dragBoundaries.zMin)
          mesh.position.z = options.dragBoundaries.zMin;
        else if (mesh.position.z > options.dragBoundaries.zMax)
          mesh.position.z = options.dragBoundaries.zMax;

        if (mesh.position.y < options.dragBoundaries.yMin)
          mesh.position.y = options.dragBoundaries.yMin;
        else if (mesh.position.y > options.dragBoundaries.yMax)
          mesh.position.y = options.dragBoundaries.yMax;
      }
    );
  }

  windows.push(hideWindow);

  return { windowMesh: mesh, showWindow, hideWindow, toggleWindow };
}
