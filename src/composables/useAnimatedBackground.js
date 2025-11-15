import * as Two from "two-easy-engine";

export function useAnimatedBackground() {
  function init(canvas) {
    if (!canvas) return;

    const clock = new Two.Clock();
    const camera = new Two.Camera2D();
    const scene = new Two.Scene();
    const renderer = new Two.Renderer2D(canvas, scene, camera, {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      backgroundColor: "black",
    });

    const lights = [];
    const num = 80;

    for (let i = 0; i < num; i++) {
      const color = new Two.HslaColor(
        (i * Math.random() * 15) % 300,
        100,
        60,
        1
      );
      const colorStop = new Two.HslaColor(color.h, 100, 60, 0);
      const light = new Two.PointLight2D(
        Math.random() * 3,
        Math.random() * 10,
        color,
        colorStop
      );
      light.transform.position.set(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      scene.add(light);
      lights.push(light);
    }

    const handleResize = () => {
      renderer.options.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const moveSpeed = 0.3;
    const hueSpeed = 0.1;

    renderer.requestAnimationFrame({
      beforeRender: () => {
        clock.update();

        const time = clock.elapsedTime;
        const hue = (time * 60 * hueSpeed) % 360;

        for (let i = 0; i < num; i++) {
          const light = lights[i];
          light.intensity = Math.random() * 2;
          light.color.h = hue;
          light.transform.position.y += moveSpeed;

          if (light.transform.position.y > window.innerHeight + 20) {
            light.transform.position.set(
              Math.random() * window.innerWidth,
              -20
            );
          }
        }
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.cancelAnimationFrame();
    };
  }

  return { init };
}
