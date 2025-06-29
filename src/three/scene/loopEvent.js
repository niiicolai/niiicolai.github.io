import * as THREE from "three";

let intervalId;

export const loopDispatcher = new THREE.EventDispatcher();

export const addLoopListener = () => {
    intervalId = setInterval(() => {
        loopDispatcher.dispatchEvent({ type: 'loopEvent' });
    }, 60);
}

export const removeLoopListener = () => {
    clearInterval(intervalId);
}
