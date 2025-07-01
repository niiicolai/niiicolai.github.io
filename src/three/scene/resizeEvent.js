
const events = [];
const onResize = (event) => events.forEach((e) => e.onResize(event));

export const addResizeEvent = (callback) => {
  events.push({
    onResize: (event) => callback(event),
  });
};

export const addResizeEventListener = () => {
  window.addEventListener("resize", onResize);
};
export const removeResizeEventListener = () => {
  window.removeEventListener("resize", onResize);
};
