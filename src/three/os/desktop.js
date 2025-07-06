import * as THREE from "three";
import { createButton } from "../button";
import { addClickEvent } from "../scene/clickEvent";
import { loopDispatcher } from "../scene/loopEvent";

export function createDesktop(os, camera) {
  const desktop = {
    __createButton: async (
      text,
      iconSrc,
      pos,
      textOffset,
      callback,
      options = {
        iconGeometry: new THREE.PlaneGeometry(0.1, 0.1),
        iconRotation: new THREE.Vector3(0, -Math.PI / 2, 0),
        textColor: new THREE.Color(),
        fontSize: 0.02,
      }
    ) => {
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        os.__mesh,
        options
      );
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
    "/icons/lightbulbIcon.png",
    new THREE.Vector3(0.36, 2.33, -0.65),
    new THREE.Vector2(0.045, 0.033),
    () => os.lightApp.toggle(),
  );

  desktop.__createButton(
    "Paint App",
    "/icons/paintingIcon.png",
    new THREE.Vector3(0.36, 2.205, -0.65),
    new THREE.Vector2(0.045, 0.033),
    () => os.paint.toggle()
  );

  desktop.__createButton(
    "Snake Game",
    "/icons/snakegameIcon.png",
    new THREE.Vector3(0.36, 2.08, -0.65),
    new THREE.Vector2(0.055, 0.033),
    () => os.snake.toggle()
  );

  desktop.__createButton(
    "Trashbin",
    "/icons/trashIcon.png",
    new THREE.Vector3(0.36, 1.93, 0.6),
    new THREE.Vector2(0.04, 0.033),
    () => os.trash.toggle()
  );

  // Simple low-performance particle effect
  const particleCount = 20;
  const particles = [];
  const geometry = new THREE.SphereGeometry(0.005, 6, 6);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const boundaries = {
    yMin: 1.8,
    yMax: 2.535,
    zMin: -0.755,
    zMax: 0.755,
  };

  for (let i = 0; i < particleCount; i++) {
    const mesh = new THREE.Mesh(geometry, material.clone());
    mesh.position.set(
      0.365,
      boundaries.yMin + Math.random() * (boundaries.yMax - boundaries.yMin),
      boundaries.zMin + Math.random() * (boundaries.zMax - boundaries.zMin)
    );
    // Set random shades of blue
    const hue = 0.58 + Math.random() * 0.08; // 0.58 ~ 0.66 is blue range in HSL
    const saturation = 0.5 + Math.random() * 0.5; // 0.5 to 1.0 saturation
    const lightness = 0.4 + Math.random() * 0.3; // 0.4 to 0.7 lightness
    mesh.material.color.setHSL(hue, saturation, lightness);
    os.__mesh.add(mesh);
    particles.push({
      mesh,
      velocity: new THREE.Vector3(
        0,
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001
      ),
    });
  }

  loopDispatcher.addEventListener("loopEvent", () => {
    if (os.outOfFocus) return;
    
    for (const p of particles) {
      p.mesh.position.add(p.velocity);
      // Simple bounds for the effect area

      if (
        p.mesh.position.y > boundaries.yMax ||
        p.mesh.position.y < boundaries.yMin
      ) {
        p.velocity.y *= -1;
      }
      if (
        p.mesh.position.z > boundaries.zMax ||
        p.mesh.position.z < boundaries.zMin
      ) {
        p.velocity.z *= -1;
      }
    }
  });

  return desktop;
}
