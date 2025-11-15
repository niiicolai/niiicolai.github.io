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

    const centerX = renderer.centerX;
    const centerY = renderer.centerY;

    const fadeSpeed = 0.8;
    const minSpeed = 250;
    const maxSpeed = 1550;
    const maxLife = 1;

    const numParticles = 80;
    const particles = [];

    // Create explosion particles
    for (let i = 0; i < numParticles; i++) {
      const hue = (i / numParticles) * 360;
      const fillStyle = new Two.HslaColor(hue, 100, 60, 1);
      const material = new Two.BasicMaterial({ fillStyle });
      const geom = new Two.CircleGeometry(3 + Math.random() * 10);
      const mesh = new Two.Mesh(geom, material);
      mesh.transform.position.set(centerX, centerY);

      const angle = Math.random() * Math.PI * 2;
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      mesh.userData = {
        velocity: new Two.Vector2(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        ),
        life: maxLife,
      };

      scene.add(mesh);
      particles.push(mesh);
    }

    const handleResize = () => {
      renderer.options.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    renderer.requestAnimationFrame({
      beforeRender: () => {
        clock.update();

        const centerX = Math.random() * renderer.options.width;
        const centerY = Math.random() * renderer.options.height;
        const delta = clock.deltaTime;

        particles.forEach((p) => {
          // Move outward
          p.transform.position.translate(
            p.userData.velocity.x * delta,
            p.userData.velocity.y * delta
          );

          // Apply slight slowdown (friction)
          p.userData.velocity.multiplyScalar(0.97);

          // Fade out gradually
          p.userData.life -= delta * fadeSpeed;
          const alpha = Math.max(0, p.userData.life);
          p.material.fillStyle.a = alpha;

          // Scale down a bit as it fades
          p.transform.scale.set(alpha, alpha);

          // Reset explosion when all faded out
          if (p.userData.life <= 0) {
            p.transform.position.set(centerX, centerY);
            const angle = Math.random() * Math.PI * 2;
            const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
            p.userData.velocity.set(
              Math.cos(angle) * speed,
              Math.sin(angle) * speed
            );
            p.userData.life = maxLife;
          }
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
