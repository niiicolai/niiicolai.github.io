import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const ACCENT = 0xa6e22e;

function roundedBox(width, height, depth, radius) {
  const eps = 0.00001;
  const r = radius - eps;
  const w = width - radius * 2;
  const h = height - radius * 2;

  const shape = new THREE.Shape();
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, h, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(w, h, eps, Math.PI / 2, 0, true);
  shape.absarc(w, eps, eps, 0, -Math.PI / 2, true);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: r,
    bevelThickness: r,
    curveSegments: 6,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function makeGridTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#111417";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "#a6e22e";
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.lineTo(size, 2);
  ctx.moveTo(2, 0);
  ctx.lineTo(2, size);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(18, 18);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeStreakTexture() {
  const width = 256;
  const height = 32;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const tail = ctx.createLinearGradient(0, 0, width, 0);
  tail.addColorStop(0, "rgba(255,255,255,0)");
  tail.addColorStop(0.55, "rgba(255,255,255,0.18)");
  tail.addColorStop(0.9, "rgba(255,255,255,0.75)");
  tail.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = tail;
  ctx.fillRect(0, height / 2 - 2, width, 4);

  const head = ctx.createRadialGradient(width - 18, height / 2, 0, width - 18, height / 2, 16);
  head.addColorStop(0, "rgba(255,255,255,1)");
  head.addColorStop(0.4, "rgba(255,255,255,0.5)");
  head.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = head;
  ctx.fillRect(width - 40, 0, 40, height);

  return new THREE.CanvasTexture(canvas);
}

function makeGlowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const centre = size / 2;
  const gradient = ctx.createRadialGradient(centre, centre, 0, centre, centre, centre);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.62)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.2)");
  gradient.addColorStop(0.72, "rgba(255,255,255,0.04)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centre, centre, centre, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeFadeTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.16, "#ffffff");
  gradient.addColorStop(0.34, "#8a8a8a");
  gradient.addColorStop(0.48, "#1f1f1f");
  gradient.addColorStop(1, "#000000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

export function useChatCharacter() {
  let state = "sleeping";
  let controller = null;
  let handlers = {};

  const setState = (next) => {
    state = next;
  };

  const setGameHandlers = (next) => {
    handlers = next ?? {};
  };

  const startGame = () => controller?.startGame();
  const stopGame = () => controller?.stopGame();
  const setMove = (direction) => controller?.setMove(direction);

  function init(canvas) {
    if (!canvas) return () => {};

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0d0d0d, 8, 16);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 6.6);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose?.();

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2.5, 3.5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(ACCENT, 2.4);
    rimLight.position.set(-3, 1.2, -2);
    scene.add(rimLight);

    const ledGlow = new THREE.PointLight(ACCENT, 2.5, 5);
    ledGlow.position.set(0, 1.1, 1);
    scene.add(ledGlow);

    const disposables = [];
    const track = (obj) => {
      disposables.push(obj);
      return obj;
    };

    const shellMat = track(
      new THREE.MeshStandardMaterial({ color: 0xb9c1c8, metalness: 0.92, roughness: 0.34 })
    );
    const darkMat = track(
      new THREE.MeshStandardMaterial({ color: 0x272c31, metalness: 0.75, roughness: 0.45 })
    );
    const glassMat = track(
      new THREE.MeshStandardMaterial({ color: 0x0a0d10, metalness: 0.5, roughness: 0.08 })
    );
    const ledMat = track(
      new THREE.MeshStandardMaterial({
        color: ACCENT,
        emissive: ACCENT,
        emissiveIntensity: 1.4,
        metalness: 0,
        roughness: 0.4,
      })
    );
    const ringMat = track(new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3 }));

    const FLOOR_Y = -1.9;

    const gridTexture = track(makeGridTexture());
    const fadeTexture = track(makeFadeTexture());
    const glowTexture = track(makeGlowTexture());

    const floorGeo = track(new THREE.PlaneGeometry(36, 36));
    const floorMat = track(
      new THREE.MeshStandardMaterial({
        map: gridTexture,
        emissive: ACCENT,
        emissiveMap: gridTexture,
        emissiveIntensity: 0.45,
        alphaMap: fadeTexture,
        transparent: true,
        fog: false,
        metalness: 0.3,
        roughness: 0.6,
      })
    );
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = FLOOR_Y;
    floor.receiveShadow = true;
    scene.add(floor);

    const DUST_COUNT = 70;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 7;
      dustPositions[i * 3 + 1] = FLOOR_Y + Math.random() * 3.6;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.5;
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = track(
      new THREE.PointsMaterial({
        color: ACCENT,
        size: 0.035,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const sky = new THREE.Group();
    sky.position.z = -12;
    scene.add(sky);

    const STAR_COUNT = 190;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 26;
      starPositions[i * 3 + 1] = -1 + Math.random() * 9;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const starGeo = track(new THREE.BufferGeometry());
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = track(
      new THREE.PointsMaterial({
        color: 0xdfe8f2,
        size: 0.07,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        fog: false,
      })
    );
    sky.add(new THREE.Points(starGeo, starMat));

    const streakTexture = track(makeStreakTexture());
    const streakGeo = track(new THREE.PlaneGeometry(1, 1));

    const meteors = [];
    for (let i = 0; i < 5; i++) {
      const heavy = i < 2;
      const material = track(
        new THREE.MeshBasicMaterial({
          map: streakTexture,
          color: heavy ? 0xc9f78a : 0xffffff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      );
      const mesh = new THREE.Mesh(streakGeo, material);
      mesh.visible = false;
      sky.add(mesh);
      meteors.push({ mesh, material, heavy, active: false, delay: Math.random() * 8, life: 0, duration: 1 });
    }

    const launchMeteor = (meteor) => {
      const speed = meteor.heavy ? 5 + Math.random() * 3 : 9 + Math.random() * 6;
      const angle = -0.32 - Math.random() * 0.25;

      meteor.vx = -Math.cos(angle) * speed;
      meteor.vy = Math.sin(angle) * speed;
      meteor.x = 8 + Math.random() * 7;
      meteor.y = 3 + Math.random() * 5;
      meteor.life = 0;
      meteor.duration = (22 + Math.random() * 6) / speed;
      meteor.active = true;

      const length = meteor.heavy ? 2.6 + Math.random() * 1.4 : 1.6 + Math.random() * 1.2;
      meteor.mesh.scale.set(length, meteor.heavy ? 0.28 : 0.18, 1);
      meteor.mesh.rotation.z = Math.atan2(meteor.vy, meteor.vx);
      meteor.mesh.visible = true;
    };

    const ufo = new THREE.Group();
    ufo.visible = false;
    ufo.position.z = -8;
    sky.add(ufo);

    const ufoSpin = new THREE.Group();
    ufo.add(ufoSpin);

    const saucerGeo = track(new THREE.SphereGeometry(0.45, 24, 14));
    const saucerMat = track(
      new THREE.MeshStandardMaterial({ color: 0x9aa4ad, metalness: 0.9, roughness: 0.28, fog: false })
    );
    const saucer = new THREE.Mesh(saucerGeo, saucerMat);
    saucer.scale.set(1, 0.3, 1);
    ufoSpin.add(saucer);

    const domeGeo = track(new THREE.SphereGeometry(0.2, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2));
    const domeMat = track(
      new THREE.MeshStandardMaterial({
        color: 0xdcf7a8,
        emissive: ACCENT,
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
        fog: false,
      })
    );
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.09;
    ufoSpin.add(dome);

    const podGeo = track(new THREE.SphereGeometry(0.045, 10, 8));
    const podMat = track(new THREE.MeshBasicMaterial({ color: ACCENT, fog: false }));
    const pods = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const pod = new THREE.Mesh(podGeo, podMat);
      pod.position.set(Math.cos(angle) * 0.36, -0.05, Math.sin(angle) * 0.36);
      ufoSpin.add(pod);
      pods.push(pod);
    }

    const ufoGlowGeo = track(new THREE.PlaneGeometry(1.3, 1.3));
    const ufoGlowMat = track(
      new THREE.MeshBasicMaterial({
        map: glowTexture,
        color: ACCENT,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    const ufoGlow = new THREE.Mesh(ufoGlowGeo, ufoGlowMat);
    ufoGlow.position.y = -0.16;
    ufo.add(ufoGlow);

    let ufoActive = false;
    let ufoDelay = 10 + Math.random() * 18;
    let ufoX = 0;
    let ufoVx = 0;
    let ufoY = 0;
    let ufoPhase = 0;

    const launchUfo = () => {
      const leftToRight = Math.random() < 0.5;
      ufoX = leftToRight ? -22 : 22;
      ufoVx = (leftToRight ? 1 : -1) * (2.2 + Math.random() * 1.8);
      ufoY = 3.5 + Math.random() * 4;
      ufoPhase = Math.random() * Math.PI * 2;
      ufoActive = true;
      ufo.visible = true;
    };

    const bot = new THREE.Group();
    bot.scale.setScalar(0.75);
    bot.position.y = -1.18;
    scene.add(bot);

    const baseGeo = track(roundedBox(1.0, 0.28, 0.8, 0.09));
    const base = new THREE.Mesh(baseGeo, darkMat);
    base.position.y = -0.75;
    bot.add(base);

    const torsoGeo = track(roundedBox(1.15, 1.05, 0.8, 0.13));
    const torso = new THREE.Mesh(torsoGeo, shellMat);
    torso.position.y = -0.05;
    bot.add(torso);

    const chestGeo = track(roundedBox(0.66, 0.46, 0.08, 0.05));
    const chest = new THREE.Mesh(chestGeo, darkMat);
    chest.position.set(0, 0.06, 0.4);
    bot.add(chest);

    const statusGeo = track(roundedBox(0.26, 0.05, 0.05, 0.02));
    const status = new THREE.Mesh(statusGeo, ledMat);
    status.position.set(0, -0.32, 0.41);
    bot.add(status);

    const shoulderGeo = track(new THREE.CylinderGeometry(0.13, 0.13, 0.14, 20));
    const upperArmGeo = track(roundedBox(0.17, 0.42, 0.17, 0.06));
    const foreArmGeo = track(roundedBox(0.15, 0.38, 0.15, 0.05));

    const makeArm = (side) => {
      const arm = new THREE.Group();
      arm.position.set(side * 0.7, 0.28, 0);

      const shoulder = new THREE.Mesh(shoulderGeo, darkMat);
      shoulder.rotation.z = Math.PI / 2;
      arm.add(shoulder);

      const upper = new THREE.Mesh(upperArmGeo, shellMat);
      upper.position.y = -0.28;
      arm.add(upper);

      const fore = new THREE.Mesh(foreArmGeo, darkMat);
      fore.position.y = -0.68;
      arm.add(fore);

      bot.add(arm);
      return arm;
    };

    const leftArm = makeArm(-1);
    const rightArm = makeArm(1);

    const neckGeo = track(new THREE.CylinderGeometry(0.13, 0.15, 0.2, 20));
    const neck = new THREE.Mesh(neckGeo, darkMat);
    neck.position.y = 0.57;
    bot.add(neck);

    const head = new THREE.Group();
    head.position.y = 1.08;
    bot.add(head);

    const headGeo = track(roundedBox(1.0, 0.82, 0.82, 0.12));
    const headMesh = new THREE.Mesh(headGeo, shellMat);
    head.add(headMesh);

    const visorGeo = track(roundedBox(0.78, 0.4, 0.08, 0.06));
    const visor = new THREE.Mesh(visorGeo, glassMat);
    visor.position.set(0, 0.06, 0.39);
    head.add(visor);

    const eyeGeo = track(roundedBox(0.17, 0.11, 0.05, 0.035));
    const leftEye = new THREE.Mesh(eyeGeo, ledMat);
    leftEye.position.set(-0.18, 0.06, 0.43);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, ledMat);
    rightEye.position.set(0.18, 0.06, 0.43);
    head.add(rightEye);

    const barGeo = track(roundedBox(0.045, 0.07, 0.04, 0.015));
    const bars = [];
    for (let i = 0; i < 5; i++) {
      const bar = new THREE.Mesh(barGeo, ledMat);
      bar.position.set((i - 2) * 0.075, -0.24, 0.4);
      head.add(bar);
      bars.push(bar);
    }

    const stalkGeo = track(new THREE.CylinderGeometry(0.022, 0.028, 0.26, 10));
    const stalk = new THREE.Mesh(stalkGeo, darkMat);
    stalk.position.y = 0.54;
    head.add(stalk);

    const tipGeo = track(new THREE.SphereGeometry(0.075, 18, 14));
    const tip = new THREE.Mesh(tipGeo, ledMat);
    tip.position.y = 0.7;
    head.add(tip);

    const ringGeo = track(new THREE.TorusGeometry(0.46, 0.018, 8, 40));
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.5;
    ring.position.y = -0.95;
    bot.add(ring);

    bot.traverse((object) => {
      if (object.isMesh) object.castShadow = true;
    });

    const LANE_LIMIT = 1.9;
    const PLAYER_SPEED = 3.6;
    const CHAT_CAM_POS = new THREE.Vector3(0, 0, 6.6);
    const CHAT_CAM_LOOK = new THREE.Vector3(0, 0, 0);
    const GAME_CAM_POS = new THREE.Vector3(0, 1.75, 6.4);
    const GAME_CAM_LOOK = new THREE.Vector3(0, -1.05, -11);
    const lookTarget = new THREE.Vector3();

    const DANGER = 0xff7a3c;

    const rockGeo = track(new THREE.IcosahedronGeometry(0.36, 0));
    const rockMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x707a85,
        emissive: DANGER,
        emissiveIntensity: 0.35,
        metalness: 0.3,
        roughness: 0.8,
        flatShading: true,
      })
    );
    const crateGeo = track(roundedBox(0.55, 0.55, 0.55, 0.07));
    const crateMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x8a5a2b,
        emissive: DANGER,
        emissiveIntensity: 0.35,
        metalness: 0.2,
        roughness: 0.75,
      })
    );

    const obstacleGlowGeo = track(new THREE.PlaneGeometry(1.7, 1.7));
    const obstacleGlowMat = track(
      new THREE.MeshBasicMaterial({
        map: glowTexture,
        color: DANGER,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );

    const obstacles = [];
    for (let i = 0; i < 12; i++) {
      const isRock = i % 2 === 0;
      const group = new THREE.Group();
      group.visible = false;

      const mesh = new THREE.Mesh(isRock ? rockGeo : crateGeo, isRock ? rockMat : crateMat);
      mesh.castShadow = true;
      group.add(mesh);

      const glow = new THREE.Mesh(obstacleGlowGeo, obstacleGlowMat);
      glow.position.z = 0.15;
      group.add(glow);

      scene.add(group);
      obstacles.push({ group, mesh, glow, active: false, hit: false, scored: false, x: 0, z: 0 });
    }

    const dangerLights = [];
    for (let i = 0; i < 2; i++) {
      const light = new THREE.PointLight(DANGER, 0, 10);
      scene.add(light);
      dangerLights.push(light);
    }

    const GOLD = 0xffd24a;
    const HEART = 0xff4d6d;
    const SHIELD = 0x4dd2ff;

    const coinGeo = track(new THREE.CylinderGeometry(0.23, 0.23, 0.05, 24));
    const coinMat = track(
      new THREE.MeshStandardMaterial({
        color: GOLD,
        emissive: 0xffb300,
        emissiveIntensity: 0.55,
        metalness: 0.9,
        roughness: 0.25,
      })
    );

    const lobeGeo = track(new THREE.SphereGeometry(0.14, 16, 12));
    const tipGeo2 = track(new THREE.ConeGeometry(0.2, 0.3, 16));
    const heartMat = track(
      new THREE.MeshStandardMaterial({ color: HEART, emissive: 0xff2d55, emissiveIntensity: 0.65, roughness: 0.4 })
    );

    const shieldGeo = track(new THREE.IcosahedronGeometry(0.23, 0));
    const shieldMat = track(
      new THREE.MeshStandardMaterial({
        color: SHIELD,
        emissive: 0x00b8ff,
        emissiveIntensity: 0.8,
        metalness: 0.4,
        roughness: 0.25,
        flatShading: true,
      })
    );

    const pickupGlowGeo = track(new THREE.PlaneGeometry(1.5, 1.5));
    const pickupGlowMats = {
      coin: track(
        new THREE.MeshBasicMaterial({
          map: glowTexture,
          color: GOLD,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      ),
      heart: track(
        new THREE.MeshBasicMaterial({
          map: glowTexture,
          color: HEART,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      ),
      shield: track(
        new THREE.MeshBasicMaterial({
          map: glowTexture,
          color: SHIELD,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      ),
    };

    const pickups = [];
    for (let i = 0; i < 6; i++) {
      const group = new THREE.Group();
      group.visible = false;

      const spin = new THREE.Group();
      group.add(spin);

      const coin = new THREE.Mesh(coinGeo, coinMat);
      coin.rotation.x = Math.PI / 2;
      spin.add(coin);

      const heart = new THREE.Group();
      const leftLobe = new THREE.Mesh(lobeGeo, heartMat);
      leftLobe.position.set(-0.1, 0.09, 0);
      const rightLobe = new THREE.Mesh(lobeGeo, heartMat);
      rightLobe.position.set(0.1, 0.09, 0);
      const tip = new THREE.Mesh(tipGeo2, heartMat);
      tip.position.set(0, -0.11, 0);
      tip.rotation.z = Math.PI;
      heart.add(leftLobe, rightLobe, tip);
      spin.add(heart);

      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      spin.add(shield);

      const glow = new THREE.Mesh(pickupGlowGeo, pickupGlowMats.coin);
      group.add(glow);

      scene.add(group);
      pickups.push({ group, spin, glow, coin, heart, shield, active: false, type: "coin", x: 0, z: 0 });
    }

    const STRIPE_COUNT = 70;
    const stripePositions = new Float32Array(STRIPE_COUNT * 6);
    const stripeSeeds = [];
    for (let i = 0; i < STRIPE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.8 + Math.random() * 4.6;
      stripeSeeds.push({
        x: Math.cos(angle) * radius,
        y: FLOOR_Y + 0.4 + Math.abs(Math.sin(angle)) * radius * 0.7,
        z: -32 + Math.random() * 36,
        length: 1.4 + Math.random() * 2.4,
      });
    }
    const stripeGeo = track(new THREE.BufferGeometry());
    stripeGeo.setAttribute("position", new THREE.BufferAttribute(stripePositions, 3));
    const stripeMat = track(
      new THREE.LineBasicMaterial({
        color: 0xd8f7a0,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    const stripes = new THREE.LineSegments(stripeGeo, stripeMat);
    stripes.visible = false;
    scene.add(stripes);

    const bubbleGeo = track(new THREE.SphereGeometry(1.5, 24, 16));
    const bubbleMat = track(
      new THREE.MeshBasicMaterial({
        color: SHIELD,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false,
        fog: false,
      })
    );
    const shieldBubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    shieldBubble.position.y = 0.4;
    shieldBubble.visible = false;
    bot.add(shieldBubble);

    const SCORE_PER_SECOND = 12;
    const DODGE_BONUS = 50;

    let gameActive = false;
    let camBlend = 0;
    let playerX = 0;
    let moveDir = 0;
    let score = 0;
    let dodges = 0;
    let lives = 3;
    let invulnerable = 0;
    let spawnTimer = 0;
    let hitFlash = 0;
    let scoreTimer = 0;
    let groundSpeed = 0;
    let shieldTime = 0;
    let pickupTimer = 0;

    const COIN_POINTS = 150;
    const SHIELD_SECONDS = 10;
    const MAX_LIVES = 5;

    const clearObstacles = () => {
      for (const obstacle of obstacles) {
        obstacle.active = false;
        obstacle.group.visible = false;
      }
      for (const light of dangerLights) light.intensity = 0;
    };

    const stats = () => ({
      score: Math.floor(score),
      dodges,
      lives,
      shield: Math.max(0, Math.ceil(shieldTime)),
    });

    const clearPickups = () => {
      for (const pickup of pickups) {
        pickup.active = false;
        pickup.group.visible = false;
      }
    };

    const spawnPickup = () => {
      const free = pickups.find((pickup) => !pickup.active);
      if (!free) return;

      const roll = Math.random();
      const type = roll < 0.68 ? "coin" : roll < 0.9 ? "shield" : "heart";

      free.type = type;
      free.active = true;
      free.x = (Math.random() * 2 - 1) * LANE_LIMIT;
      free.z = -26;
      free.coin.visible = type === "coin";
      free.heart.visible = type === "heart";
      free.shield.visible = type === "shield";
      free.glow.material = pickupGlowMats[type];
      free.group.visible = true;
    };

    const endGame = () => {
      gameActive = false;
      moveDir = 0;
      clearObstacles();
      clearPickups();
      handlers.onGameOver?.(stats());
    };

    const updateGame = (dt) => {
      playerX = Math.min(LANE_LIMIT, Math.max(-LANE_LIMIT, playerX + moveDir * PLAYER_SPEED * dt));

      score += dt * SCORE_PER_SECOND;
      scoreTimer -= dt;
      if (scoreTimer <= 0) {
        scoreTimer = 0.1;
        handlers.onScore?.(Math.floor(score), stats());
      }

      const speed = 8 + Math.min(dodges * 0.3, 8);
      groundSpeed = speed;
      if (invulnerable > 0) invulnerable -= dt;
      if (shieldTime > 0) shieldTime -= dt;

      pickupTimer -= dt;
      if (pickupTimer <= 0) {
        pickupTimer = 2.6 + Math.random() * 2.4;
        spawnPickup();
      }

      for (const pickup of pickups) {
        if (!pickup.active) continue;

        pickup.z += speed * dt;
        pickup.group.position.set(pickup.x, FLOOR_Y + 0.6, pickup.z);
        pickup.spin.rotation.y += dt * 2.6;
        pickup.group.position.y += Math.sin(pickup.z * 0.9) * 0.08;
        pickup.glow.quaternion.copy(camera.quaternion);
        pickup.glow.scale.setScalar(0.7 + Math.max(0, 1 - Math.abs(pickup.z) / 16) * 0.6);

        if (Math.abs(pickup.z) < 0.5 && Math.abs(pickup.x - playerX) < 0.72) {
          pickup.active = false;
          pickup.group.visible = false;

          if (pickup.type === "coin") score += COIN_POINTS;
          else if (pickup.type === "heart") lives = Math.min(MAX_LIVES, lives + 1);
          else shieldTime = SHIELD_SECONDS;

          handlers.onPickup?.(pickup.type, stats());
          continue;
        }

        if (pickup.z > 4) {
          pickup.active = false;
          pickup.group.visible = false;
        }
      }

      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        spawnTimer = Math.max(0.5, 1.4 - dodges * 0.025);
        const free = obstacles.find((obstacle) => !obstacle.active);
        if (free) {
          free.active = true;
          free.hit = false;
          free.scored = false;
          free.x = (Math.random() * 2 - 1) * LANE_LIMIT;
          free.z = -26;
          free.group.visible = true;
          free.mesh.scale.setScalar(0.85 + Math.random() * 0.5);
        }
      }

      for (const obstacle of obstacles) {
        if (!obstacle.active) continue;

        obstacle.z += speed * dt;
        obstacle.group.position.set(obstacle.x, FLOOR_Y + 0.42, obstacle.z);
        obstacle.mesh.rotation.x += dt * 2.4;
        obstacle.mesh.rotation.y += dt * 1.6;

        const nearness = Math.max(0, Math.min(1, 1 - Math.abs(obstacle.z) / 16));
        obstacle.glow.scale.setScalar(0.55 + nearness * 1.1);
        obstacle.glow.quaternion.copy(camera.quaternion);

        const reachedPlayer = Math.abs(obstacle.z) < 0.45;
        const overlapping = Math.abs(obstacle.x - playerX) < 0.62;

        if (!obstacle.hit && invulnerable <= 0 && shieldTime <= 0 && reachedPlayer && overlapping) {
          obstacle.hit = true;
          lives -= 1;
          invulnerable = 1.2;
          hitFlash = 0.6;
          handlers.onHit?.(stats());
          if (lives <= 0) {
            endGame();
            return;
          }
        }

        if (!obstacle.scored && obstacle.z > 0.6) {
          obstacle.scored = true;
          if (!obstacle.hit) {
            dodges += 1;
            score += DODGE_BONUS;
            handlers.onDodge?.(stats());
          }
        }

        if (obstacle.z > 4) {
          obstacle.active = false;
          obstacle.group.visible = false;
        }
      }

      const closest = obstacles
        .filter((obstacle) => obstacle.active)
        .sort((a, b) => b.z - a.z)
        .slice(0, dangerLights.length);

      for (let i = 0; i < dangerLights.length; i++) {
        const light = dangerLights[i];
        const obstacle = closest[i];

        if (!obstacle) {
          light.intensity = 0;
          continue;
        }

        const nearness = Math.max(0, Math.min(1, 1 - Math.abs(obstacle.z) / 16));
        light.position.set(obstacle.x, FLOOR_Y + 0.75, obstacle.z);
        light.intensity = 2 + nearness * 10;
      }
    };

    controller = {
      startGame: () => {
        score = 0;
        dodges = 0;
        lives = 3;
        playerX = 0;
        moveDir = 0;
        invulnerable = 0;
        hitFlash = 0;
        spawnTimer = 0.9;
        scoreTimer = 0;
        shieldTime = 0;
        pickupTimer = 3.5;
        clearObstacles();
        clearPickups();
        gameActive = true;
      },
      stopGame: () => {
        gameActive = false;
        moveDir = 0;
        shieldTime = 0;
        clearObstacles();
        clearPickups();
      },
      setMove: (direction) => {
        moveDir = direction;
      },
    };

    const clock = new THREE.Clock();
    let lastTime = 0;
    let nextBlink = 2;
    let blinkStart = -1;
    let frameId = null;
    let running = false;

    const resize = () => {
      const width = canvas.clientWidth || 1;
      const height = canvas.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const t = clock.getElapsedTime();
      const dt = Math.min(t - lastTime, 0.1);
      lastTime = t;
      const sleeping = state === "sleeping";
      const busy = state === "thinking" || state === "talking" || state === "waking";
      const bobSpeed = sleeping ? 0.85 : state === "talking" ? 3.6 : state === "thinking" ? 2.6 : 1.4;
      const bob = Math.sin(t * bobSpeed);

      if (gameActive) updateGame(dt);

      camBlend += ((gameActive ? 1 : 0) - camBlend) * Math.min(1, dt * 3.2);
      const gameMix = camBlend * camBlend * (3 - 2 * camBlend);

      camera.position.lerpVectors(CHAT_CAM_POS, GAME_CAM_POS, gameMix);
      lookTarget.lerpVectors(CHAT_CAM_LOOK, GAME_CAM_LOOK, gameMix);
      camera.lookAt(lookTarget);

      if (gameMix > 0.001) {
        gridTexture.offset.y = (gridTexture.offset.y + (groundSpeed / 2) * dt * gameMix) % 1;

        const rush = Math.max(0, Math.min(1, (groundSpeed - 9.5) / 6));
        stripeMat.opacity = rush * 0.55 * gameMix;
        stripes.visible = stripeMat.opacity > 0.01;

        if (stripes.visible) {
          const travel = groundSpeed * 1.7 * dt;
          for (let i = 0; i < stripeSeeds.length; i++) {
            const seed = stripeSeeds[i];
            seed.z += travel;
            if (seed.z > 5) seed.z -= 38;

            const offset = i * 6;
            stripePositions[offset] = seed.x;
            stripePositions[offset + 1] = seed.y;
            stripePositions[offset + 2] = seed.z;
            stripePositions[offset + 3] = seed.x;
            stripePositions[offset + 4] = seed.y;
            stripePositions[offset + 5] = seed.z - seed.length * (0.6 + rush);
          }
          stripeGeo.attributes.position.needsUpdate = true;
        }
      } else if (stripes.visible) {
        stripes.visible = false;
      }

      shieldBubble.visible = shieldTime > 0;
      if (shieldBubble.visible) {
        const flicker = shieldTime < 3 ? 0.5 + 0.5 * Math.sin(t * 14) : 1;
        bubbleMat.opacity = (0.1 + 0.06 * Math.sin(t * 3)) * flicker;
        shieldBubble.scale.setScalar(1 + Math.sin(t * 2.4) * 0.03);
      }

      if (hitFlash > 0) {
        hitFlash = Math.max(0, hitFlash - dt);
        shellMat.emissive.setHex(0xff3b30);
        shellMat.emissiveIntensity = hitFlash * 1.6;
      } else if (shellMat.emissiveIntensity !== 0) {
        shellMat.emissiveIntensity = 0;
        shellMat.emissive.setHex(0x000000);
      }

      const idleYaw = sleeping
        ? 0
        : Math.sin(t * 0.45) * 0.2 + (state === "thinking" ? Math.sin(t * 2) * 0.24 : 0);
      const idleRoll = Math.sin(t * bobSpeed * 0.5) * (sleeping ? 0.008 : 0.02);
      const blink = gameActive && invulnerable > 0 && Math.floor(t * 12) % 2 === 0;

      bot.position.y = -1.18 + bob * (sleeping ? 0.03 : 0.05);
      bot.position.x = playerX * gameMix;
      bot.rotation.y = idleYaw * (1 - gameMix) + Math.PI * gameMix;
      bot.rotation.z = idleRoll * (1 - gameMix) + -moveDir * 0.24 * gameMix;
      bot.visible = !blink;

      if (sleeping) {
        head.rotation.x = 0.26;
        head.rotation.y = 0.1;
        head.rotation.z = 0;
      } else {
        head.rotation.x = state === "thinking" ? -0.12 + Math.sin(t * 1.8) * 0.07 : Math.sin(t * 0.8) * 0.04;
        head.rotation.y = Math.sin(t * 0.65) * 0.16;
        head.rotation.z = state === "thinking" ? Math.sin(t * 1.2) * 0.1 : 0;
      }

      const armSwing = sleeping ? 0.01 : busy ? 0.16 : 0.06;
      leftArm.rotation.x = Math.sin(t * bobSpeed * 0.9) * armSwing;
      rightArm.rotation.x = Math.sin(t * bobSpeed * 0.9 + 0.6) * armSwing;
      leftArm.rotation.z = 0.06;
      rightArm.rotation.z = -0.06;

      const pulse = 0.5 + 0.5 * Math.sin(t * (sleeping ? 0.9 : busy ? 7.5 : 2));
      ledMat.emissiveIntensity = sleeping ? 0.08 + pulse * 0.08 : 1.2 + pulse * (busy ? 1.5 : 0.5);
      ledGlow.intensity = sleeping ? 0.15 + pulse * 0.2 : 1.8 + pulse * (busy ? 4 : 1.5);
      tip.scale.setScalar(sleeping ? 0.85 : 1 + pulse * 0.18);
      ringMat.opacity = sleeping ? 0.04 + pulse * 0.03 : 0.16 + pulse * 0.2;
      ring.scale.setScalar(1 + pulse * (sleeping ? 0.02 : 0.06));

      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        if (state === "talking") {
          bar.scale.y = 0.6 + Math.abs(Math.sin(t * 9 + i * 1.3)) * 2.6;
        } else if (state === "thinking") {
          bar.scale.y = 0.5 + Math.abs(Math.sin(t * 3 + i * 0.9)) * 0.6;
        } else {
          bar.scale.y = sleeping ? 0.25 : 0.6;
        }
      }

      if (!sleeping && t > nextBlink) {
        blinkStart = t;
        nextBlink = t + 2.6 + Math.random() * 3.6;
      }
      const blinkAge = t - blinkStart;
      const blinking = !sleeping && blinkAge >= 0 && blinkAge < 0.12;
      leftEye.scale.y = sleeping ? 0.18 : blinking ? 1 - Math.sin((blinkAge / 0.12) * Math.PI) * 0.88 : 1;
      rightEye.scale.y = leftEye.scale.y;

      if (!ufoActive) {
        ufoDelay -= dt;
        if (ufoDelay <= 0) launchUfo();
      } else {
        ufoX += ufoVx * dt;
        ufo.position.x = ufoX;
        ufo.position.y = ufoY + Math.sin(t * 1.3 + ufoPhase) * 0.24;
        ufo.rotation.z = Math.sin(t * 1.1 + ufoPhase) * 0.13;
        ufoSpin.rotation.y = t * 0.7;
        domeMat.emissiveIntensity = 0.4 + Math.abs(Math.sin(t * 2.2)) * 0.5;
        ufoGlowMat.opacity = 0.3 + Math.abs(Math.sin(t * 2.2)) * 0.22;

        for (let i = 0; i < pods.length; i++) {
          pods[i].scale.setScalar(0.65 + Math.abs(Math.sin(t * 4 + i * 0.95)) * 0.85);
        }

        if (Math.abs(ufoX) > 22.5) {
          ufoActive = false;
          ufo.visible = false;
          ufoDelay = 28 + Math.random() * 42;
        }
      }

      const drift = dt * (sleeping ? 0.06 : 0.13);
      const rush = gameMix > 0.001 ? groundSpeed * dt * gameMix * 0.6 : 0;

      for (let i = 1; i < dustPositions.length; i += 3) {
        dustPositions[i] += drift;
        if (dustPositions[i] > FLOOR_Y + 3.6) dustPositions[i] = FLOOR_Y;

        if (rush > 0) {
          dustPositions[i + 1] += rush;
          if (dustPositions[i + 1] > 2) dustPositions[i + 1] -= 5;
        }
      }
      dustGeo.attributes.position.needsUpdate = true;
      dustMat.opacity = sleeping ? 0.22 : 0.45;

      starMat.opacity = 0.55 + Math.sin(t * 0.7) * 0.12;

      for (let i = 0; i < meteors.length; i++) {
        const meteor = meteors[i];

        if (!meteor.active) {
          meteor.delay -= dt;
          if (meteor.delay <= 0) launchMeteor(meteor);
          continue;
        }

        meteor.x += meteor.vx * dt;
        meteor.y += meteor.vy * dt;
        meteor.life += dt;
        meteor.mesh.position.set(meteor.x, meteor.y, 0);

        const progress = meteor.life / meteor.duration;
        meteor.material.opacity =
          progress < 0.12 ? progress / 0.12 : progress > 0.72 ? Math.max(0, (1 - progress) / 0.28) : 1;

        if (progress >= 1) {
          meteor.active = false;
          meteor.mesh.visible = false;
          meteor.material.opacity = 0;
          meteor.delay = 2.5 + Math.random() * (meteor.heavy ? 12 : 7);
        }
      }
      floorMat.emissiveIntensity = sleeping ? 0.16 : 0.38 + pulse * 0.16;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      disposables.forEach((item) => item.dispose());
      envTarget.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }

  return { init, setState, setGameHandlers, startGame, stopGame, setMove };
}
