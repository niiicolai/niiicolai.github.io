import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { createButton } from "../button";

export function createBrowser(mobile) {
  const browser = {
    __createButton: async (
      text,
      iconSrc,
      pos,
      textOffset,
      callback,
      options = {
        iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.007,
      }
    ) => {
      const parent = browser.window.mesh;
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        parent,
        options
      );
      addClickEvent(btn, mobile.options.camera, (e) => {
        if (parent.visible) callback(e);
      });
      return btn;
    },
    websites: [],
  };

  browser.window = mobile.createWindow({
    geometry: new THREE.PlaneGeometry(0.16, 0.26),
    material: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1,
    }),
    position: new THREE.Vector3(0, 0, 0.02),
    rotation: new THREE.Quaternion(-0.123, 0, 0, 0),
  });

  browser.titleText = new Text();
  browser.window.mesh.add(browser.titleText);
  browser.titleText.text = "Browser";
  browser.titleText.fontSize = 0.01;
  browser.titleText.position.x = -0.038;
  browser.titleText.position.y = 0.118;
  browser.titleText.position.z = 0.001;
  browser.titleText.color = 0x000000;
  browser.titleText.sync();

  browser.urlText = new Text();
  browser.window.mesh.add(browser.urlText);
  browser.urlText.text = "http://localhost:5173";
  browser.urlText.fontSize = 0.008;
  browser.urlText.position.x = -0.052;
  browser.urlText.position.y = -0.114;
  browser.urlText.position.z = 0.0012;
  browser.urlText.color = 0x000000;
  browser.urlText.sync();

  browser.createWebsite = (url, urlXPosition) => {
    const position = new THREE.Vector3(0, 0, 0.0001);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.16, 0.2),
      new THREE.MeshPhysicalMaterial({
        color: 0x00ffff,
        emissive: 0xffffff,
        emissiveIntensity: 1,
      })
    );

    const hide = () => {
      mesh.visible = false;
      mesh.position.copy(99, 0, 0);
    };
    const show = () => {
      browser.urlText.position.x = urlXPosition;
      browser.urlText.text = url;
      browser.urlText.sync();
      for (const w of browser.websites) w.hide();
      mesh.position.copy(position);
      mesh.visible = true;
    };
    const w = { mesh, hide, show };

    browser.window.mesh.add(mesh);
    browser.websites.push(w);
    return w;
  };

  browser.footer = new THREE.Mesh(
    new THREE.PlaneGeometry(0.159, 0.03),
    new THREE.MeshPhysicalMaterial({
      color: 0x9b9b9b,
      emissive: 0x9b9b9b,
      emissiveIntensity: 0.8,
    })
  );
  browser.window.mesh.add(browser.footer);
  browser.footer.position.set(0, -0.12, 0.001);

  browser.addressLine = new THREE.Mesh(
    new THREE.PlaneGeometry(0.138, 0.015),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1,
    })
  );
  browser.window.mesh.add(browser.addressLine);
  browser.addressLine.position.set(0, -0.12, 0.0011);

  browser.__createButton(
    "",
    "/icons/left-long-solid-fontawesome.png",
    new THREE.Vector3(-0.058, 0.11, 0.001),
    new THREE.Vector2(0.007, 0.01),
    () => mobile.home.window.setVisible(true)
  );

  const about = browser.createWebsite("http://localhost:5271/about", -0.052);
  const projects = browser.createWebsite(
    "http://localhost:5271/projects",
    -0.0545
  );

  createButton(
    "Projects",
    "/icons/box-archive-solid-fontawesome.png",
    new THREE.Vector3(0.062, 0.11, 0.001),
    new THREE.Vector2(0.0125, 0.01),
    about.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.007,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (about.mesh.visible) projects.show();
    });
  });
  about.show();

  const websiteMainTitleText = new Text();
  about.mesh.add(websiteMainTitleText);
  websiteMainTitleText.text = "Hi, I'm Nicolai 👋";
  websiteMainTitleText.fontSize = 0.006;
  websiteMainTitleText.position.x = -0.073;
  websiteMainTitleText.position.y = 0.096;
  websiteMainTitleText.position.z = 0.001;
  websiteMainTitleText.color = 0x000000;
  websiteMainTitleText.sync();

  const websiteMainDescText = new Text();
  about.mesh.add(websiteMainDescText);
  websiteMainDescText.text =
    "Welcome to my website! I'm a full-stack developer\nfrom Denmark who enjoys building things —\n" +
    "sometimes practical, sometimes experimental,\nalways driven by curiosity.\n\n" +
    "I have a background in computer science and years\nof hands-on experience building everything from\n" +
    "web platforms to multiplayer game systems. My\nstack includes tools like JavaScript/TypeScript,\n" +
    "Node.js, React, MySQL, MongoDB, and WebSocket,\nand I often work with technologies like Docker,\n" +
    "Unity, and Blender.\n\n" +
    "Whether it's crafting backend systems, designing\nfrontend interfaces, or exploring new tech,\n" +
    "I'm always up for a challenge. Take a look around!";
  websiteMainDescText.fontSize = 0.006;
  websiteMainDescText.position.x = -0.073;
  websiteMainDescText.position.y = 0.083;
  websiteMainDescText.position.z = 0.001;
  websiteMainDescText.color = 0x000000;
  websiteMainDescText.sync();

  const websiteMainConnectText = new Text();
  about.mesh.add(websiteMainConnectText);
  websiteMainConnectText.text = "Connect with me:";
  websiteMainConnectText.fontSize = 0.006;
  websiteMainConnectText.position.x = -0.073;
  websiteMainConnectText.position.y = -0.055;
  websiteMainConnectText.position.z = 0.001;
  websiteMainConnectText.color = 0x000000;
  websiteMainConnectText.sync();

  createButton(
    "GitHub",
    "/icons/github-brands-fontawesome.png",
    new THREE.Vector3(-0.06, -0.077, 0.001),
    new THREE.Vector2(0.0125, 0.01),
    about.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.007,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (about.mesh.visible)
        window.open("https://github.com/niiicolai", "_blank");
    });
  });

  createButton(
    "LinkedIn",
    "/icons/linkedin-brands-fontawesome.png",
    new THREE.Vector3(-0.03, -0.077, 0.001),
    new THREE.Vector2(0.0125, 0.01),
    about.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.007,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (about.mesh.visible)
        window.open(
          "https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/",
          "_blank"
        );
    });
  });

  createButton(
    "About",
    "/icons/box-archive-solid-fontawesome.png",
    new THREE.Vector3(0.062, 0.11, 0.001),
    new THREE.Vector2(0.0105, 0.01),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.02, 0.02),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.007,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible) about.show();
    });
  });

  const project1TitleText = new Text();
  projects.mesh.add(project1TitleText);
  project1TitleText.text = "🧠 SAR CPU Data Analyzer:";
  project1TitleText.fontSize = 0.006;
  project1TitleText.position.x = -0.073;
  project1TitleText.position.y = 0.086;
  project1TitleText.position.z = 0.001;
  project1TitleText.color = 0x000000;
  project1TitleText.sync();

  const project1DescText = new Text();
  projects.mesh.add(project1DescText);
  project1DescText.text =
    "A small Python tool I made to test and\nvisualizeCPU usage data.";
  project1DescText.fontSize = 0.006;
  project1DescText.position.x = -0.073;
  project1DescText.position.y = 0.076;
  project1DescText.position.z = 0.001;
  project1DescText.color = 0x000000;
  project1DescText.sync();

  createButton(
    "GitHub",
    "/icons/github-brands-fontawesome.png",
    new THREE.Vector3(0.062, 0.077, 0.001),
    new THREE.Vector2(0.0077, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open(
          "https://github.com/niiicolai/sar-cpu-data-analyzer",
          "_blank"
        );
    });
  });

  const project2TitleText = new Text();
  projects.mesh.add(project2TitleText);
  project2TitleText.text = "🌌 Europa: The Celestial Quest";
  project2TitleText.fontSize = 0.006;
  project2TitleText.position.x = -0.073;
  project2TitleText.position.y = 0.056;
  project2TitleText.position.z = 0.001;
  project2TitleText.color = 0x000000;
  project2TitleText.sync();

  const project2DescText = new Text();
  projects.mesh.add(project2DescText);
  project2DescText.text =
    "The Celestial Quest: A browser-\nbased real-time strategy game.";
  project2DescText.fontSize = 0.006;
  project2DescText.position.x = -0.073;
  project2DescText.position.y = 0.046;
  project2DescText.position.z = 0.001;
  project2DescText.color = 0x000000;
  project2DescText.sync();

  createButton(
    "Video",
    "/icons/youtube-brands-fontawesome.png",
    new THREE.Vector3(0.042, 0.047, 0.001),
    new THREE.Vector2(0.0071, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open("https://www.youtube.com/watch?v=gc0yM8eqkV0", "_blank");
    });
  });

  createButton(
    "GitHub",
    "/icons/github-brands-fontawesome.png",
    new THREE.Vector3(0.062, 0.047, 0.001),
    new THREE.Vector2(0.0077, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open(
          "https://github.com/niiicolai-apps/europa-celestial-quest",
          "_blank"
        );
    });
  });

  const project3TitleText = new Text();
  projects.mesh.add(project3TitleText);
  project3TitleText.text = "🛍️ VR Webshop";
  project3TitleText.fontSize = 0.006;
  project3TitleText.position.x = -0.073;
  project3TitleText.position.y = 0.026;
  project3TitleText.position.z = 0.001;
  project3TitleText.color = 0x000000;
  project3TitleText.sync();

  const project3DescText = new Text();
  projects.mesh.add(project3DescText);
  project3DescText.text =
    "An experiment to combine VR,\n3D tools, and ecommerce.";
  project3DescText.fontSize = 0.006;
  project3DescText.position.x = -0.073;
  project3DescText.position.y = 0.016;
  project3DescText.position.z = 0.001;
  project3DescText.color = 0x000000;
  project3DescText.sync();

  createButton(
    "Video",
    "/icons/youtube-brands-fontawesome.png",
    new THREE.Vector3(0.042, 0.017, 0.001),
    new THREE.Vector2(0.0071, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open("https://www.youtube.com/watch?v=gZ16FViAOOE", "_blank");
    });
  });

  createButton(
    "GitHub",
    "/icons/github-brands-fontawesome.png",
    new THREE.Vector3(0.062, 0.017, 0.001),
    new THREE.Vector2(0.0077, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open("https://github.com/VR-web-shop", "_blank");
    });
  });

  const project4TitleText = new Text();
  projects.mesh.add(project4TitleText);
  project4TitleText.text = "🤖 AI Code Editor";
  project4TitleText.fontSize = 0.006;
  project4TitleText.position.x = -0.073;
  project4TitleText.position.y = -0.005;
  project4TitleText.position.z = 0.001;
  project4TitleText.color = 0x000000;
  project4TitleText.sync();

  const project4DescText = new Text();
  projects.mesh.add(project4DescText);
  project4DescText.text =
    "An early attempt at building a code\neditor powered by AI with tool-calling\nsupport.";
  project4DescText.fontSize = 0.006;
  project4DescText.position.x = -0.073;
  project4DescText.position.y = -0.016;
  project4DescText.position.z = 0.001;
  project4DescText.color = 0x000000;
  project4DescText.sync();

  createButton(
    "GitHub",
    "/icons/github-brands-fontawesome.png",
    new THREE.Vector3(0.062, -0.017, 0.001),
    new THREE.Vector2(0.0077, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open("https://github.com/niiicolai/ai-editor", "_blank");
    });
  });

  const project5TitleText = new Text();
  projects.mesh.add(project5TitleText);
  project5TitleText.text = "💬 Chat App";
  project5TitleText.fontSize = 0.006;
  project5TitleText.position.x = -0.073;
  project5TitleText.position.y = -0.045;
  project5TitleText.position.z = 0.001;
  project5TitleText.color = 0x000000;
  project5TitleText.sync();

  const project5DescText = new Text();
  projects.mesh.add(project5DescText);
  project5DescText.text =
    "A full-featured real-time chat application\nwith frontends in both Vue and React.";
  project5DescText.fontSize = 0.006;
  project5DescText.position.x = -0.073;
  project5DescText.position.y = -0.056;
  project5DescText.position.z = 0.001;
  project5DescText.color = 0x000000;
  project5DescText.sync();

  createButton(
    "GitHub",
    "/icons/github-brands-fontawesome.png",
    new THREE.Vector3(0.062, -0.057, 0.001),
    new THREE.Vector2(0.0077, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open("https://github.com/niiicolai/chat-app", "_blank");
    });
  });

  const project6TitleText = new Text();
  projects.mesh.add(project6TitleText);
  project6TitleText.text = "🎥 Custom Video Player";
  project6TitleText.fontSize = 0.006;
  project6TitleText.position.x = -0.073;
  project6TitleText.position.y = -0.075;
  project6TitleText.position.z = 0.001;
  project6TitleText.color = 0x000000;
  project6TitleText.sync();

  const project6DescText = new Text();
  projects.mesh.add(project6DescText);
  project6DescText.text =
    "A lightweight video player written\nin plain HTML, CSS, and JS.";
  project6DescText.fontSize = 0.006;
  project6DescText.position.x = -0.073;
  project6DescText.position.y = -0.086;
  project6DescText.position.z = 0.001;
  project6DescText.color = 0x000000;
  project6DescText.sync();

  createButton(
    "Tutorial",
    "/icons/medium-brands-fontawesome.png",
    new THREE.Vector3(0.042, -0.087, 0.001),
    new THREE.Vector2(0.0085, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open(
          "https://medium.com/better-programming/a-tutorial-to-the-html-video-element-b8b9a4bf2f76",
          "_blank"
        );
    });
  });

  createButton(
    "GitHub",
    "/icons/github-brands-fontawesome.png",
    new THREE.Vector3(0.062, -0.087, 0.001),
    new THREE.Vector2(0.0077, 0.008),
    projects.mesh,
    {
      iconGeometry: new THREE.PlaneGeometry(0.015, 0.015),
      iconRotation: new THREE.Vector3(0, 0, 0),
      textColor: new THREE.Color().setHex(0x000000),
      fontSize: 0.005,
    }
  ).then((btn) => {
    addClickEvent(btn, mobile.options.camera, (e) => {
      if (projects.mesh.visible)
        window.open("https://github.com/niiicolai/video-player", "_blank");
    });
  });

  return browser;
}
