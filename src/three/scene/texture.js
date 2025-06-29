import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const texture = {};

export const loadTexture = async (src) => {
    if (texture[src]) return texture[src];
    
    texture[src] = await textureLoader.loadAsync(src);

    return texture[src];
}

export function createGradientTexture(colorStops) {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, size, 0);
    colorStops.forEach(([stop, color]) => {
      gradient.addColorStop(stop, color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, 1);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }