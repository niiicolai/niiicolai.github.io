import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const lastPointer = new THREE.Vector2();
const velocity = new THREE.Vector2();
const events = [];
const onDragDown = (event) => events.forEach((e) => e.onDragDown(event));
const onDragUp = (event) => events.forEach((e) => e.onDragUp(event));
const onDrag = (event) => events.forEach((e) => e.onDrag(event));

export const addDragEvent = (obj, camera, callbackDown, callbackUp, callbackDrag) => {
  const e = {
    isActive: false,
    onDragDown: (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      velocity.copy(lastPointer.sub(pointer));
      lastPointer.copy(pointer);

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(obj.parent.children, false);

      if (intersects.length > 0 && intersects[0].object.uuid == obj.uuid && obj.visible) {
        callbackDown(pointer, camera, intersects[0]);
        e.isActive = true;
      }
    },
    onDragUp: (event) => {
      if (e.isActive) {
        callbackUp(pointer, camera);
        e.isActive = false;
      }
    },
    onDrag: (event) => {
      if (e.isActive) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        velocity.copy(lastPointer.sub(pointer));
        callbackDrag(pointer, camera, velocity);
        lastPointer.copy(pointer);
      }
    },
  };
  events.push(e);
};

export const addDragEventListener = () => {
  window.addEventListener("pointerdown", onDragDown);
  window.addEventListener("pointerup", onDragUp);
  window.addEventListener("pointermove", onDrag);
};
export const removeDragEventListener = () => {
  window.removeEventListener("pointerdown", onDragDown);
  window.removeEventListener("pointerup", onDragUp);
  window.removeEventListener("pointermove", onDrag);
};
