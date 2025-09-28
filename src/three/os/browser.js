import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { createWindow } from "./window";
import { createButton } from "../button";

export async function createBrowser(os, camera) {
  const { windowMesh, toggleWindow } = await createWindow(
    "/icons/globeIcon.png",
    new THREE.Vector3(0.355, 2.15, 0),
    os.__mesh,
    camera,
    {
      windowGeometry: new THREE.PlaneGeometry(1, 0.6),
      windowMaterial: new THREE.MeshBasicMaterial(),
      fontMaterial: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0x112233),
      }),
      fontSize: 0.03,
      dragBoundaries: {
        zMin: -0.25535714285714217,
        zMax: 0.2553571428571435,
        yMin: 2.0891841779975326,
        yMax: 2.2389987639060496,
      },
      disableDrag: false,
      useHeaderForDrag: true,
    }
  );

  const browser = {
    __draggingOffset: new THREE.Vector3(),
    __mesh: windowMesh,
    __createButton: async (
      text,
      iconSrc,
      pos,
      textOffset,
      callback,
      parent,
      options
    ) => {
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        parent,
        options
      );
      addClickEvent(btn, camera, () => {
        if (parent.visible) callback();
      });
      return btn;
    },
    toggle: () => toggleWindow(),
    websites: {},
    website: null,
  };

  /**
   * Create the address line mesh for the URL.
   */
  const addressLineMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 0.04),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0).setHex(0xffffff) })
  );
  browser.__mesh.add(addressLineMesh);
  addressLineMesh.position.set(0, 0.27, 0);

  /**
   * Create the address line text for the URL.
   */
  const urlText = new Text();
  browser.__mesh.add(urlText);
  urlText.fontSize = 0.02;
  urlText.position.x = -0.384;
  urlText.position.y = 0.285;
  urlText.color = 0x000000;

  /**
   * Create the not found text
   */
  const notFoundText = new Text();
  browser.__mesh.add(notFoundText);
  notFoundText.text = "Page not found (404)";
  notFoundText.fontSize = 0.02;
  notFoundText.position.x = -0.1;
  notFoundText.position.y = -0.015;
  notFoundText.color = 0x000000;
  notFoundText.sync();
  notFoundText.visible = false;

  browser.setWebsite = (address) => {
    urlText.text = address;
    urlText.sync();

    if (browser.website) {
      browser.website.wrapper.visible = false;
      browser.website = null;
    }

    if (browser.websites[address]) {
      browser.website = browser.websites[address];
      browser.website.wrapper.visible = true;
      notFoundText.visible = false;
    } else {
      notFoundText.visible = true;
    }
  };

  browser.createWebsite = (address, onCreateWrapper) => {
    const wrapper = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 0.54),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0xdddddd),
      })
    );
    browser.__mesh.add(wrapper);
    wrapper.visible = false;
    wrapper.position.set(0, -0.03, 0);
    onCreateWrapper(wrapper);

    browser.websites[address] = {
      wrapper,
      address,
    };
  };

  browser.createWebsite("http://localhost:5173/about", async (wrapper) => {
    /**
     * Create website header
     */
    const websiteHeaderMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.06),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0xffffff),
      })
    );
    wrapper.add(websiteHeaderMesh);
    websiteHeaderMesh.position.set(0, 0.21, 0);
    const websiteTitleText = new Text();
    wrapper.add(websiteTitleText);
    websiteTitleText.text = "About";
    websiteTitleText.fontSize = 0.025;
    websiteTitleText.position.x = -0.384;
    websiteTitleText.position.y = 0.227;
    websiteTitleText.color = 0x000000;
    websiteTitleText.sync();

    await browser.__createButton(
      "projects",
      "/icons/projects-icon.png",
      new THREE.Vector3(0.355, 0.217, 0.01),
      new THREE.Vector2(0.029, 0.014),
      () => browser.setWebsite("http://localhost:5173/projects"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    /**
     * Create main
     */
    const websiteMainMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.37),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0xffffff),
      })
    );
    wrapper.add(websiteMainMesh);
    websiteMainMesh.position.set(0, -0.03, 0);

    /**
     * Create main header text
     */
    const websiteMainTitleText = new Text();
    wrapper.add(websiteMainTitleText);
    websiteMainTitleText.text = "Hi, I'm Nicolai 👋";
    websiteMainTitleText.fontSize = 0.02;
    websiteMainTitleText.position.x = -0.384;
    websiteMainTitleText.position.y = 0.13;
    websiteMainTitleText.color = 0x000000;
    websiteMainTitleText.sync();

    /**
     * Create main desc. text
     */
    const websiteMainDescText = new Text();
    wrapper.add(websiteMainDescText);
    websiteMainDescText.text =
      "Welcome to my website!";
    websiteMainDescText.fontSize = 0.015;
    websiteMainDescText.position.x = -0.384;
    websiteMainDescText.position.y = 0.1;
    websiteMainDescText.color = 0x000000;
    websiteMainDescText.sync();

    const websiteMainConnectText = new Text();
    wrapper.add(websiteMainConnectText);
    websiteMainConnectText.text = "Connect with me:";
    websiteMainConnectText.fontSize = 0.02;
    websiteMainConnectText.position.x = -0.384;
    websiteMainConnectText.position.y = -0.16;
    websiteMainConnectText.color = 0x000000;
    websiteMainConnectText.sync();

    await browser.__createButton(
      "GitHub",
      "/icons/github-brands-fontawesome.png",
      new THREE.Vector3(0.35, -0.163, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () => window.open("https://github.com/niiicolai", "_blank"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    await browser.__createButton(
      "LinkedIn",
      "/icons/linkedin-brands-fontawesome.png",
      new THREE.Vector3(0.275, -0.163, 0.008),
      new THREE.Vector2(0.028, 0.014),
      () =>
        window.open(
          "https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/",
          "_blank"
        ),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );
  });

  browser.createWebsite("http://localhost:5173/projects", async (wrapper) => {
    await browser.__createButton(
      "back",
      "/icons/arrow-left-icon.png",
      new THREE.Vector3(-0.365, 0.217, 0.008),
      new THREE.Vector2(0.017, 0.014),
      () => browser.setWebsite("http://localhost:5173/about"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    /**
     * Create main
     */
    const websiteMainMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.47),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0xffffff),
      })
    );
    wrapper.add(websiteMainMesh);
    websiteMainMesh.position.set(0, 0.01, 0);

    /**
     * Create main header text
     */
    const websiteMainTitleText = new Text();
    wrapper.add(websiteMainTitleText);
    websiteMainTitleText.text = "Find some of my personal projects below:";
    websiteMainTitleText.fontSize = 0.02;
    websiteMainTitleText.position.x = -0.334;
    websiteMainTitleText.position.y = 0.23;
    websiteMainTitleText.color = 0x000000;
    websiteMainTitleText.sync();

    const project1TitleText = new Text();
    wrapper.add(project1TitleText);
    project1TitleText.text = "🧠 SAR CPU Data Analyzer:";
    project1TitleText.fontSize = 0.018;
    project1TitleText.position.x = -0.384;
    project1TitleText.position.y = 0.16;
    project1TitleText.color = 0x000000;
    project1TitleText.sync();

    const project1DescText = new Text();
    wrapper.add(project1DescText);
    project1DescText.text =
      "A small Python tool I made to test and visualize CPU usage data.";
    project1DescText.fontSize = 0.015;
    project1DescText.position.x = -0.384;
    project1DescText.position.y = 0.13;
    project1DescText.color = 0x000000;
    project1DescText.sync();

    await browser.__createButton(
      "GitHub",
      "/icons/github-brands-fontawesome.png",
      new THREE.Vector3(0.355, 0.143, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () =>
        window.open(
          "https://github.com/niiicolai/sar-cpu-data-analyzer",
          "_blank"
        ),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    const project2TitleText = new Text();
    wrapper.add(project2TitleText);
    project2TitleText.text = "🌌 Europa: The Celestial Quest";
    project2TitleText.fontSize = 0.018;
    project2TitleText.position.x = -0.384;
    project2TitleText.position.y = 0.1;
    project2TitleText.color = 0x000000;
    project2TitleText.sync();

    const project2DescText = new Text();
    wrapper.add(project2DescText);
    project2DescText.text =
      "The Celestial Quest: A browser-based real-time strategy game set in space.";
    project2DescText.fontSize = 0.015;
    project2DescText.position.x = -0.384;
    project2DescText.position.y = 0.07;
    project2DescText.color = 0x000000;
    project2DescText.sync();

    await browser.__createButton(
      "Video",
      "/icons/youtube-brands-fontawesome.png",
      new THREE.Vector3(0.295, 0.083, 0.008),
      new THREE.Vector2(0.02, 0.014),
      () =>
        window.open("https://www.youtube.com/watch?v=gc0yM8eqkV0", "_blank"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    await browser.__createButton(
      "GitHub",
      "/icons/github-brands-fontawesome.png",
      new THREE.Vector3(0.355, 0.083, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () =>
        window.open(
          "https://github.com/niiicolai-apps/europa-celestial-quest",
          "_blank"
        ),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    const project3TitleText = new Text();
    wrapper.add(project3TitleText);
    project3TitleText.text = "🛍️ VR Webshop";
    project3TitleText.fontSize = 0.018;
    project3TitleText.position.x = -0.384;
    project3TitleText.position.y = 0.04;
    project3TitleText.color = 0x000000;
    project3TitleText.sync();

    const project3DescText = new Text();
    wrapper.add(project3DescText);
    project3DescText.text =
      "An experiment to combine VR, 3D tools, and ecommerce.";
    project3DescText.fontSize = 0.015;
    project3DescText.position.x = -0.384;
    project3DescText.position.y = 0.01;
    project3DescText.color = 0x000000;
    project3DescText.sync();

    await browser.__createButton(
      "Video",
      "/icons/youtube-brands-fontawesome.png",
      new THREE.Vector3(0.295, 0.023, 0.008),
      new THREE.Vector2(0.02, 0.014),
      () =>
        window.open("https://www.youtube.com/watch?v=gZ16FViAOOE", "_blank"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    await browser.__createButton(
      "GitHub",
      "/icons/github-brands-fontawesome.png",
      new THREE.Vector3(0.355, 0.023, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () => window.open("https://github.com/VR-web-shop", "_blank"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    const project4TitleText = new Text();
    wrapper.add(project4TitleText);
    project4TitleText.text = "🤖 AI Code Editor";
    project4TitleText.fontSize = 0.018;
    project4TitleText.position.x = -0.384;
    project4TitleText.position.y = -0.02;
    project4TitleText.color = 0x000000;
    project4TitleText.sync();

    const project4DescText = new Text();
    wrapper.add(project4DescText);
    project4DescText.text =
      "An early attempt at building a code editor powered by AI with tool-calling support.";
    project4DescText.fontSize = 0.015;
    project4DescText.position.x = -0.384;
    project4DescText.position.y = -0.05;
    project4DescText.color = 0x000000;
    project4DescText.sync();

    await browser.__createButton(
      "GitHub",
      "/icons/github-brands-fontawesome.png",
      new THREE.Vector3(0.355, -0.04, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () => window.open("https://github.com/niiicolai/ai-editor", "_blank"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    const project5TitleText = new Text();
    wrapper.add(project5TitleText);
    project5TitleText.text = "💬 Chat App";
    project5TitleText.fontSize = 0.018;
    project5TitleText.position.x = -0.384;
    project5TitleText.position.y = -0.08;
    project5TitleText.color = 0x000000;
    project5TitleText.sync();

    const project5DescText = new Text();
    wrapper.add(project5DescText);
    project5DescText.text =
      "A full-featured real-time chat application with frontends in both Vue and React.";
    project5DescText.fontSize = 0.015;
    project5DescText.position.x = -0.384;
    project5DescText.position.y = -0.11;
    project5DescText.color = 0x000000;
    project5DescText.sync();

    await browser.__createButton(
      "GitHub",
      "/icons/github-brands-fontawesome.png",
      new THREE.Vector3(0.355, -0.1, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () => window.open("https://github.com/niiicolai/chat-app", "_blank"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    const project6TitleText = new Text();
    wrapper.add(project6TitleText);
    project6TitleText.text = "🎥 Custom Video Player";
    project6TitleText.fontSize = 0.018;
    project6TitleText.position.x = -0.384;
    project6TitleText.position.y = -0.14;
    project6TitleText.color = 0x000000;
    project6TitleText.sync();

    const project6DescText = new Text();
    wrapper.add(project6DescText);
    project6DescText.text =
      "A lightweight video player written in plain HTML, CSS, and JS.";
    project6DescText.fontSize = 0.015;
    project6DescText.position.x = -0.384;
    project6DescText.position.y = -0.17;
    project6DescText.color = 0x000000;
    project6DescText.sync();

    await browser.__createButton(
      "Tutorial",
      "/icons/medium-brands-fontawesome.png",
      new THREE.Vector3(0.295, -0.16, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () =>
        window.open(
          "https://medium.com/better-programming/a-tutorial-to-the-html-video-element-b8b9a4bf2f76",
          "_blank"
        ),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );

    await browser.__createButton(
      "GitHub",
      "/icons/github-brands-fontawesome.png",
      new THREE.Vector3(0.355, -0.16, 0.008),
      new THREE.Vector2(0.025, 0.014),
      () => window.open("https://github.com/niiicolai/video-player", "_blank"),
      wrapper,
      {
        iconGeometry: new THREE.PlaneGeometry(0.03, 0.03),
        iconRotation: new THREE.Vector3(0, 0, 0),
        textColor: new THREE.Color().setHex(0x000000),
        fontSize: 0.015,
      }
    );
  });

  browser.setWebsite("http://localhost:5173/about");

  return browser;
}
