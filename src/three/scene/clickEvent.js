import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const events = [];
const onClick = (event) => events.forEach((e) => e.onClick(event));

export const addClickEvent = (obj, camera, callback) => {
  events.push({
    onClick: (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(obj.parent.children, false);
      if (intersects.length > 0 && intersects[0].object.uuid == obj.uuid)
        callback(intersects[0]);
    },
  });
};

export const addClickEventListener = () =>
  window.addEventListener("pointerdown", onClick);
export const removeClickEventListener = () =>{
  window.removeEventListener("pointerdown", onClick);
}
