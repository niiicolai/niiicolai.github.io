import * as Two from "two-easy-engine";

const PALETTE = [
  { h: 80,  s: 90, l: 58 },  // accent green  (#a6e22e range)
  { h: 88,  s: 80, l: 50 },  // deeper green
  { h: 200, s: 80, l: 55 },  // cyan-blue
  { h: 220, s: 70, l: 50 },  // blue
  { h: 72,  s: 95, l: 65 },  // bright yellow-green
];

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
      backgroundColor: "#060608",
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const lights = [];
    const num = 55;

    for (let i = 0; i < num; i++) {
      const palette = PALETTE[i % PALETTE.length];

      const color     = new Two.HslaColor(palette.h, palette.s, palette.l, 1);
      const colorStop = new Two.HslaColor(palette.h, palette.s, palette.l, 0);

      const radius    = 2.5 + Math.random() * 7;
      const intensity = 0.6 + Math.random() * 1.4;
      const light     = new Two.PointLight2D(intensity, radius, color, colorStop);

      light.transform.position.set(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );

      scene.add(light);

      lights.push({
        light,
        baseIntensity: intensity,
        phaseOffset:   Math.random() * Math.PI * 2,
        pulseSpeed:    0.4 + Math.random() * 0.6,
        driftAngle:    Math.random() * Math.PI * 2,
        speed:         0.12 + Math.random() * 0.28,
        parallaxDepth: 0.3 + Math.random() * 0.7,
      });
    }

    const handleResize = () => {
      renderer.options.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    renderer.requestAnimationFrame({
      beforeRender: () => {
        clock.update();
        const time = clock.elapsedTime;

        const parallaxOffsetX = (mouseX / window.innerWidth  - 0.5) * 30;
        const parallaxOffsetY = (mouseY / window.innerHeight - 0.5) * 30;

        for (let i = 0; i < lights.length; i++) {
          const { light, baseIntensity, phaseOffset, pulseSpeed, driftAngle, speed, parallaxDepth } = lights[i];

          light.intensity = baseIntensity * (0.55 + 0.45 * Math.sin(time * pulseSpeed + phaseOffset));

          const pos = light.transform.position;
          pos.x += Math.cos(driftAngle) * speed + parallaxOffsetX * parallaxDepth * 0.008;
          pos.y += Math.sin(driftAngle) * speed + parallaxOffsetY * parallaxDepth * 0.008 + 0.18;

          const w = window.innerWidth;
          const h = window.innerHeight;
          if (pos.x < -80)     pos.x = w + 80;
          if (pos.x > w + 80)  pos.x = -80;
          if (pos.y < -80)     pos.y = h + 80;
          if (pos.y > h + 80)  pos.y = -80;
        }
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.cancelAnimationFrame();
    };
  }

  return { init };
}
