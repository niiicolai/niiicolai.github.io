import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { addDragEvent } from "../scene/dragEvent";
import { createWindow } from "./window";
import { createButton } from "./button";
import { loadTexture } from "../scene/texture";

export async function createPaintApp(os, camera) {
  const { windowMesh, toggleWindow } = await createWindow(
    "/icons/paintingIcon.png",
    new THREE.Vector3(0.345, 2.15, 0),
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
  const paint = {
    __draggingOffset: new THREE.Vector3(),
    __mesh: windowMesh,
    __createButton: async (
      text,
      iconSrc,
      pos,
      textOffset,
      callback,
      iconGeometry = new THREE.PlaneGeometry(0.03, 0.03)
    ) => {
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        paint.__mesh,
        {
          iconGeometry,
          iconRotation: new THREE.Vector3(0, 0, 0),
          textColor: new THREE.Color().setHex(0x000000),
          fontSize: 0.02,
        }
      );
      addClickEvent(btn, camera, () => {
        if (paint.__mesh.visible) callback();
      });
    },
    __paintingMaterial: new THREE.MeshBasicMaterial(),
    __selectedMesh: new THREE.Mesh(
      new THREE.PlaneGeometry(0.03, 0.03),
      new THREE.MeshBasicMaterial()
    ),
    __isPainting: false,
    toggle: () => toggleWindow(),
  };

  const drawGroup = new THREE.Group();
  paint.__mesh.add(drawGroup);
  const clearDrawGroup = () => {
    while (drawGroup.children.length > 0) {
      const child = drawGroup.children[0];
      drawGroup.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    }
  };

  const drawBoundaries = {
    xMin: -0.2439056741881411,
    xMax: 0.2452954501094407,
    yMin: -0.2923841573676015,
    yMax: 0.20202578998397547,
  }

  addDragEvent(
    paint.__mesh,
    camera,
    () => {
      if (paint.__mesh.visible) paint.__isPainting = true;
    },
    () => {
      paint.__isPainting = false;
    },
    (pointer, camera, velocity) => {
      if (paint.__isPainting) {
        const paintingMaterial = paint.__paintingMaterial;

        // Project pointer to local plane of the paint window
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(pointer, camera);

        // The window is a plane at z=0 in its local space
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        // Transform plane to world space
        plane.applyMatrix4(paint.__mesh.matrixWorld);

        const intersectPoint = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
          // Convert world point to local space of the window mesh
          const localPoint = paint.__mesh.worldToLocal(intersectPoint.clone());
          
          if (localPoint.x < drawBoundaries.xMin) localPoint.x = drawBoundaries.xMin;
          else if (localPoint.x > drawBoundaries.xMax) localPoint.x = drawBoundaries.xMax;

          if (localPoint.y < drawBoundaries.yMin) localPoint.y = drawBoundaries.yMin;
          else if (localPoint.y > drawBoundaries.yMax) localPoint.y = drawBoundaries.yMax;

          // Draw a small cube at this position
          const cubeSize = 0.01;
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const material = paintingMaterial.clone();
          const cube = new THREE.Mesh(geometry, material);
          cube.position.copy(localPoint);
          drawGroup.add(cube);
        }
      }
    }
  );

  const selectColor = (hex, textureSrc) => {
    paint.__paintingMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHex(hex),
    });
    loadTexture(textureSrc).then(
      (t) => (paint.__selectedMesh.material.map = t)
    );
  };

  const selectedText = new Text();
  paint.__mesh.add(selectedText);
  selectedText.text = "Selected:";
  selectedText.fontSize = 0.025;
  selectedText.position.x = 0.104;
  selectedText.position.y = 0.24;
  selectedText.color = 0x000000;
  selectedText.sync();

  paint.__mesh.add(paint.__selectedMesh);
  paint.__selectedMesh.position.set(0.23, 0.22, 0.008);
  selectColor(0x000000, "/icons/blackColor.png");

  paint.__createButton(
    "",
    "/icons/blackColor.png",
    new THREE.Vector3(-0.23, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0x000000, "/icons/blackColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/brownColor.png",
    new THREE.Vector3(-0.198, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0x8b4513, "/icons/brownColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/greyColor.png",
    new THREE.Vector3(-0.165, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0x808080, "/icons/greyColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/whiteColor.png",
    new THREE.Vector3(-0.132, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0xffffff, "/icons/whiteColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/redColor.png",
    new THREE.Vector3(-0.099, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0xff0000, "/icons/redColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/greenColor.png",
    new THREE.Vector3(-0.067, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0x00ff00, "/icons/greenColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/blueColor.png",
    new THREE.Vector3(-0.034, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0x0000ff, "/icons/blueColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/orangeColor.png",
    new THREE.Vector3(-0.001, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0xffa500, "/icons/orangeColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/yellowColor.png",
    new THREE.Vector3(0.032, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      selectColor(0xffff00, "/icons/yellowColor.png");
    }
  );

  paint.__createButton(
    "",
    "/icons/trashIcon.png",
    new THREE.Vector3(0.065, 0.22, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      clearDrawGroup();
    },
    new THREE.PlaneGeometry(0.04, 0.04)
  );

  return paint;
}
