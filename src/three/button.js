import * as THREE from "three";
import { Text } from "troika-three-text";
import { loadTexture } from "./scene/texture";

export async function createButton(text, iconSrc, pos, textOffset, parent, options={
    iconGeometry: new THREE.PlaneGeometry(0.1, 0.1), 
    iconRotation: new THREE.Vector3(0, -Math.PI / 2, 0),
    textColor: new THREE.Color(),
    fontSize: 0.02,
}) {
  const map = await loadTexture(iconSrc);
  const material = new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    alphaTest: 0.5,
  });
  const mesh = new THREE.Mesh(options.iconGeometry, material);
  parent.add(mesh);
  mesh.rotation.x = options.iconRotation.x;
  mesh.rotation.y = options.iconRotation.y;
  mesh.rotation.z = options.iconRotation.z;
  mesh.position.copy(pos);

  const textElement = new Text();
  textElement.fontSize = options.fontSize;
  textElement.color = options.textColor || new THREE.Color;
  mesh.add(textElement);
  textElement.text = text;
  textElement.position.x -= textOffset.x;
  textElement.position.y -= textOffset.y;
  textElement.sync();

  return mesh;
}

