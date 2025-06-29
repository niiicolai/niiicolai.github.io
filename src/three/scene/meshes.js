import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { loadTexture } from './texture';

async function loadModel(src, castShadow, receiveShadow, submeshes = [], scene) {
  const loader = new GLTFLoader();
  const model = await loader.loadAsync(src);
  const mesh = model.scene;
  scene.add(mesh);
  mesh.position.y = -1;
  mesh.rotation.y = Math.PI / 2;
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = castShadow;
      child.receiveShadow = receiveShadow;
    }

    submeshes.forEach((submesh) => {
      if (submesh.pattern) {
        const regex = new RegExp(submesh.pattern);
        if (regex.test(child.name)) {
          child.material = submesh.material;
        }
      } else if (child.name === submesh.name) {
        child.material = submesh.material;
      }
    });
  });

  return mesh;
}

export async function setupMeshes(scene) {
    const metallicGray = new THREE.MeshPhysicalMaterial({ color: 0xDDDDDD, metalness: 0.6, roughness: 0 })
    const smoothBlack = new THREE.MeshPhysicalMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.4 })
    const mattBlack = new THREE.MeshPhysicalMaterial({ color: 0x333333, metalness: 1, roughness: 1 })
    const mattWhite = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, metalness: 1, roughness: 1 })
    const mattBlue = new THREE.MeshPhysicalMaterial({ color: 0x2D41D4, metalness: 1, roughness: 1 })
    const smoothRed = new THREE.MeshPhysicalMaterial({ color: 0xFF0000, metalness: 0.3, roughness: 0.4 })
    const lightGreen = new THREE.MeshStandardMaterial({ color: 0x00FF00, emissive: 0x00FF00, emissiveIntensity: 0.5 })
    const lightWhite = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.5 })
    const lightFadeEmission = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.1 })
    lightFadeEmission.transparent = true
    lightFadeEmission.opacity = 0.05
    const lightFadeEmissionBlue = new THREE.MeshStandardMaterial({ color: 0x2D41D4, emissive: 0x2D41D4, emissiveIntensity: 0.1 })
    lightFadeEmissionBlue.transparent = true
    lightFadeEmissionBlue.opacity = 0.1

    const blackFabricTexture = await loadTexture('/textures/black_fabric_basecolor.png');
    const blackFabricMaterial = new THREE.MeshPhysicalMaterial({ map: blackFabricTexture })

    loadModel('/table.glb', true, true, [
        { name: 'Table_Legs', material: metallicGray },
        { name: 'Table_Top', material: smoothBlack }
    ], scene)
    loadModel('/keyboard.glb', true, true, [
        { name: 'Keyboard', material: metallicGray },
        { name: 'Light_1', material: lightGreen },
        { name: 'Light_2', material: lightGreen },
        { name: 'Light_3', material: lightGreen },
        { pattern: /Key_\d+_Top/, material: smoothRed },
        { pattern: /Key_\d+_Bottom/, material: smoothBlack },
    ], scene)
    loadModel('/mouse.glb', true, true, [
        { name: 'Mouse_Back', material: smoothRed },
        { name: 'Mouse_Front', material: metallicGray },
        { name: 'Scroll', material: smoothBlack },
    ], scene)
    loadModel('/mousepad.glb', true, true, [
        { name: 'Mousepad', material: mattBlack },
    ], scene)        
    loadModel('/chair.glb', true, true, [
        { name: 'Chair_Metal', material: metallicGray },
        { name: 'Chair_Pillow', material: blackFabricMaterial },
        { name: 'Chair_Back', material: blackFabricMaterial },
        { pattern: /Chair_Wheel/, material: smoothBlack },
    ], scene)
    loadModel('/lamp.glb', true, true, [
        { name: 'Lamp', material: blackFabricMaterial },
        { name: 'Lamp_Stand', material: metallicGray },
        { name: 'Lamp_Light_Top', material: lightWhite },
        { name: 'Lamp_Light_Bottom', material: metallicGray },
    ], scene)
    loadModel('/lamp_emission.glb', false, false, [
        { name: 'Lamp_Light_Emission_1', material: lightFadeEmission },
    ], scene)
    loadModel('/notebook.glb', true, true, [
        { name: 'Notebook', material: mattWhite },
        { name: 'Notebook_Lines', material: mattBlue },
        { name: 'Notebook_R_1', material: mattWhite },
        { name: 'Notebook_R_2', material: mattWhite },
        { name: 'Notebook_Top', material: mattBlue },
    ], scene)
    loadModel('/pen.glb', true, true, [
        { name: 'Pen', material: mattBlack },
        { name: 'Pen_Handle', material: smoothBlack },
    ], scene)
    loadModel('/coffee.glb', true, true, [
        { name: 'Cup', material: mattWhite },
        { name: 'Coffee', material: smoothBlack },
    ], scene)
    loadModel('/sky.glb', false, true, [
        { name: 'Sky', material: lightWhite },
        { name: 'Sky_Floor', material: mattWhite },
    ], scene)
    loadModel('/monitor.glb', true, true, [
        { name: 'Monitor_Stand', material: metallicGray },
        { name: 'Monitor_Frame', material: metallicGray },
        { name: 'Monitor_Glass', material: smoothBlack },
    ], scene)

    const screenMaterial = new THREE.MeshPhysicalMaterial({ color: 0x2D41D4, emissive: 0x2D41D4, emissiveIntensity: 1 })
    const screenStarBarMaterial = new THREE.MeshPhysicalMaterial({ color: 0x333333, emissive: 0x333333, emissiveIntensity: 1 })
    const screenBtnMaterial = new THREE.MeshPhysicalMaterial({ color: 0xAAAAAA, emissive: 0xAAAAAA, emissiveIntensity: 1 })
    const screenIconMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000B97, emissive: 0x000B97, emissiveIntensity: 1 })
    const screenTextMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000000, emissive: 0x000000, emissiveIntensity: 1 })
    const screenWindowBggMaterial = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 1 })
    const osMesh = await loadModel('/os.glb', false, false, [
        { name: 'Monitor_Screen', material: screenMaterial },
        { name: 'Monitor_StartBar', material: screenStarBarMaterial },
        { name: 'Monitor_StartBar_BrowserButton', material: screenBtnMaterial },
        { name: 'Monitor_StartBar_StartButton', material: screenBtnMaterial },
        //{ name: 'Monitor_StartBar_BrowserButton_Icon', material: screenIconMaterial },
        { pattern: /Monitor_StartBar_StartButton_Icon/, material: screenIconMaterial },
        //{ name: 'Monitor_BrowserButton_Icon', material: screenIconMaterial },
        { name: 'Monitor_BrowserButton_Text', material: screenTextMaterial },
        { name: 'Monitor_WindowBar', material: screenStarBarMaterial },
        { name: 'Monitor_Window_Icon', material: screenIconMaterial },
        { name: 'Monitor_WindowAddressBar', material: screenWindowBggMaterial },
        { name: 'Monitor_WindowBgg', material: screenWindowBggMaterial },
        { name: 'Monitor_WindowBgg', material: screenWindowBggMaterial },
        { name: 'Monitor_WindowCloseButton', material: screenBtnMaterial },
        { name: 'Monitor_WindowMinimizeButton', material: screenBtnMaterial },
        { pattern: /Monitor_WindowCloseButton_Icon/, material: screenTextMaterial },
        { pattern: /Monitor_WindowMinimizeButton_Icon/, material: screenTextMaterial },
    ], scene);
    osMesh.visible = false;

    return osMesh;
}
