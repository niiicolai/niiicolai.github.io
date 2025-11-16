import * as Two from "two-easy-engine";

export function useAnimatedHeader() {
  function init(canvas) {
    if (!canvas) return;

    const clock = new Two.Clock();
    const camera = new Two.Camera2D();
    const scene = new Two.Scene();
    const renderer = new Two.Renderer2D(canvas, scene, camera, {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      backgroundColor: "transparent",
    });

    const numParticles = 30;
    const particles = [];

    // Create orbiting circles
    for (let i = 0; i < numParticles; i++) {
      const hue = (i / numParticles) * 360;
      const fillStyle = new Two.HslaColor(hue, 100, 60, 1);
      const material = new Two.BasicMaterial({ fillStyle });
      const circle = new Two.CircleGeometry(5);
      const mesh = new Two.Mesh(circle, material);
      scene.add(mesh);
      particles.push(mesh);
    }

    const handleResize = () => {
      renderer.options.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const speed = 0.5;
    const baseRadius = 290;

    renderer.requestAnimationFrame({
      beforeRender: () => {
        clock.update();

        const time = clock.elapsedTime;
        const radius = baseRadius + Math.sin(time * speed);
        const centerX = renderer.centerX;
        const centerY = renderer.centerY;

        particles.forEach((p, i) => {
          const angle = (i / numParticles) * Math.PI * 2;
          const x = centerX + Math.cos(angle + time * speed) * radius;
          const y = centerY + Math.sin(angle + time * speed) * radius;

          p.transform.position.set(x, y);
        });
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.cancelAnimationFrame();
    };
  }

  return { init };
}
