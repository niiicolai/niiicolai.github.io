
const events = [];
const onKeyDown = (event) => events.forEach((e) => e.onKeyDown(event));
const onKeyUp = (event) => events.forEach((e) => e.onKeyUp(event));

export const addKeyEvent = (callbackDown, callbackUp) => {
  events.push({
    onKeyDown: (event) => callbackDown(event),
    onKeyUp: (event) => callbackUp(event),
  });
};

export const addKeyEventListener = () => {
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
};
export const removeKeyEventListener = () => {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("keyup", onKeyUp);
};
