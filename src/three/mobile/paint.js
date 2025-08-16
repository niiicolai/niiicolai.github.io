import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { addDragEvent } from "../scene/dragEvent";
import { createButton } from "../button";
import { loadTexture } from "../scene/texture";

export function createPaint(mobile) {
  const paint = {
    __createButton: async (
      text,
      iconSrc,
      pos,
      textOffset,
      callback,
      options = {
        iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.007,
      }
    ) => {
      const parent = paint.window.mesh;
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        parent,
        options
      );
      addClickEvent(btn, mobile.options.camera, (e) => {
        if (parent.visible) callback(e);
      });
      return btn;
    },
  };

  paint.window = mobile.createWindow({
    geometry: new THREE.PlaneGeometry(0.16, 0.26),
    material: new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 1,
    }),
    position: new THREE.Vector3(0, 0, 0.02),
    rotation: new THREE.Quaternion(-0.123, 0, 0, 0),
  });

  const titleText = new Text();
  paint.window.mesh.add(titleText);
  titleText.text = "Paint";
  titleText.fontSize = 0.01;
  titleText.position.x = -0.038;
  titleText.position.y = 0.118;
  titleText.position.z = 0.001;
  titleText.color = 0x000000;
  titleText.sync();

  paint.__createButton(
    "",
    "/icons/arrow-left-icon.png",
    new THREE.Vector3(-0.058, 0.11, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => mobile.home.window.setVisible(true)
  );

  paint.paintingMaterial = new THREE.MeshBasicMaterial();
  paint.selectedMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.015, 0.015),
    new THREE.MeshBasicMaterial()
  );
  paint.selectedMesh.position.set(0.058, 0.11, 0.001);
  paint.window.mesh.add(paint.selectedMesh);
  paint.isPainting = false;

  paint.drawGroup = new THREE.Group();
  paint.window.mesh.add(paint.drawGroup);
  paint.clearDrawGroup = () => {
    while (paint.drawGroup.children.length > 0) {
      const child = paint.drawGroup.children[0];
      paint.drawGroup.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    }
  };

  paint.drawBoundaries = {
    xMin: -0.07489629987540737,
    xMax: 0.07757654328792842,
    yMin: -0.10901066011912261,
    yMax: 0.09654653477599298,
  };

  paint.selectColor = (hex, textureSrc) => {
    paint.paintingMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHex(hex),
    });
    loadTexture(textureSrc).then((t) => (paint.selectedMesh.material.map = t));
  };

  paint.selectColor(0x000000, "/icons/blackColor.png");

  paint.__createButton(
    "",
    "/icons/blackColor.png",
    new THREE.Vector3(-0.073, -0.1218, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => {
      selectColor(0x000000, "/icons/blackColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/brownColor.png",
    new THREE.Vector3(-0.058, -0.1218, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => {
      paint.selectColor(0x8b4513, "/icons/brownColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/greyColor.png",
    new THREE.Vector3(-0.0429, -0.1218, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => {
      paint.selectColor(0x808080, "/icons/greyColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/whiteColor.png",
    new THREE.Vector3(-0.028, -0.1218, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => {
      paint.selectColor(0xffffff, "/icons/whiteColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/redColor.png",
    new THREE.Vector3(-0.013, -0.1218, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => {
      paint.selectColor(0xff0000, "/icons/redColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/greenColor.png",
    new THREE.Vector3(0.002, -0.1218, 0.001),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      paint.selectColor(0x00ff00, "/icons/greenColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/blueColor.png",
    new THREE.Vector3(0.017, -0.1218, 0.001),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      paint.selectColor(0x0000ff, "/icons/blueColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/orangeColor.png",
    new THREE.Vector3(0.032, -0.1218, 0.001),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      paint.selectColor(0xffa500, "/icons/orangeColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/yellowColor.png",
    new THREE.Vector3(0.047, -0.1218, 0.001),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      paint.selectColor(0xffff00, "/icons/yellowColor.png");
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  paint.__createButton(
    "",
    "/icons/trash-icon.png",
    new THREE.Vector3(0.072, -0.121, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => {
      paint.clearDrawGroup();
    },
    {
      iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color(),
      fontSize: 0.007,
    }
  );

  addDragEvent(
      paint.window.mesh,
      mobile.options.camera,
      () => {
        if (paint.window.mesh.visible) paint.isPainting = true;
      },
      () => {
        paint.isPainting = false;
      },
      (pointer, camera, velocity) => {
        if (paint.isPainting) {
          const paintingMaterial = paint.paintingMaterial;
  
          // Project pointer to local plane of the paint window
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(pointer, camera);
  
          // The window is a plane at z=0 in its local space
          const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
          // Transform plane to world space
          plane.applyMatrix4(paint.window.mesh.matrixWorld);
  
          const intersectPoint = new THREE.Vector3();
          if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
            // Convert world point to local space of the window mesh
            const localPoint = paint.window.mesh.worldToLocal(intersectPoint.clone());
            
            if (localPoint.x < paint.drawBoundaries.xMin) localPoint.x = paint.drawBoundaries.xMin;
            else if (localPoint.x > paint.drawBoundaries.xMax) localPoint.x = paint.drawBoundaries.xMax;
  
            if (localPoint.y < paint.drawBoundaries.yMin) localPoint.y = paint.drawBoundaries.yMin;
            else if (localPoint.y > paint.drawBoundaries.yMax) localPoint.y = paint.drawBoundaries.yMax;
  
            // Draw a small cube at this position
            const cubeSize = 0.01;
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, 0.001);
            const material = paintingMaterial.clone();
            const cube = new THREE.Mesh(geometry, material);
            cube.position.copy(localPoint);
            cube.rotation.y += 0.2;
            paint.drawGroup.add(cube);
          }
        }
      }
    );

  return paint;
}
