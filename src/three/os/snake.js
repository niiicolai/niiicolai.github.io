import * as THREE from "three";
import { Text } from "troika-three-text";
import { addClickEvent } from "../scene/clickEvent";
import { loopDispatcher } from "../scene/loopEvent";
import { addKeyEvent } from "../scene/keyEvent";
import { createWindow } from "./window";
import { createButton } from "../button";

export async function createSnakeApp(os, camera) {
  const { windowMesh, toggleWindow } = await createWindow(
    "/icons/snakegameIcon.png",
    new THREE.Vector3(0.34, 2.15, 0),
    os.__mesh,
    camera,
    {
      windowGeometry: new THREE.PlaneGeometry(0.5, 0.6),
      windowMaterial: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0x000000),
      }),
      fontMaterial: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0).setHex(0x112233),
      }),
      fontSize: 0.03,
      dragBoundaries: {
        zMin: -0.5080321285140572,
        zMax: 0.5058232931726915,
        yMin: 2.0891841779975326,
        yMax: 2.2389987639060496,
      },
      logoIconOffset: new THREE.Vector3(0.25, 0, 0),
      closeBtnOffset: new THREE.Vector3(-0.25, 0, 0),
      disableDrag: false,
      useHeaderForDrag: true,
    }
  );
  const snake = {
    __draggingOffset: new THREE.Vector3(),
    __mesh: windowMesh,
    __createButton: async (text, iconSrc, pos, textOffset, callback) => {
      const btn = await createButton(
        text,
        iconSrc,
        pos,
        textOffset,
        snake.__mesh,
        {
          iconGeometry: new THREE.PlaneGeometry(0.05, 0.05),
          iconRotation: new THREE.Vector3(0, 0, 0),
          textColor: new THREE.Color().setHex(0xFFFFFF),
          fontSize: 0.02,
        }
      );
      addClickEvent(btn, camera, () => {
        if (snake.__mesh.visible) callback();
      });
      return btn;
    },
    __isGameActive: false,
    __score: 0,
    toggle: () => toggleWindow(),
  };

  const titleText = new Text();
  snake.__mesh.add(titleText);
  titleText.text = "Snake Game";
  titleText.fontSize = 0.035;
  titleText.position.x = -0.1;
  titleText.position.y = -0.005;
  titleText.color = 0xFFFFFF;
  titleText.sync();

  const gameOverText = new Text();
  snake.__mesh.add(gameOverText);
  gameOverText.text = "Game Over";
  gameOverText.fontSize = 0.035;
  gameOverText.position.x = -0.1;
  gameOverText.position.y = -0.005;
  gameOverText.color = 0xFF0000;
  gameOverText.visible = false;
  gameOverText.sync();

  const scoreText = new Text();
  snake.__mesh.add(scoreText);
  scoreText.text = "Score: 0";
  scoreText.fontSize = 0.02;
  scoreText.position.x = -0.2;
  scoreText.position.y = 0.215;
  scoreText.color = 0xFFFFFF;
  scoreText.visible = false;
  scoreText.sync();

  const startBtn = await snake.__createButton(
    "Start Game",
    "/icons/circle-play-solid-fontawesome.png",
    new THREE.Vector3(-0.07, -0.10, 0.008),
    new THREE.Vector2(-0.045, -0.014),
    () => {
      snake.startGame();
    }
  );

  const mapBoundaries = {
    xMin: -0.2439056741881411,
    xMax: 0.2452954501094407,
    yMin: -0.2923841573676015,
    yMax: 0.20202578998397547,
  };

  const scorePoint = new THREE.Mesh(
    new THREE.PlaneGeometry(0.015, 0.015),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHex(0xFF0000),
    })
  );
  snake.__mesh.add(scorePoint);
  scorePoint.visible = false;

  const setScorePointToRandomPosition = () => {
    const x =
      Math.random() * (mapBoundaries.xMax - mapBoundaries.xMin) +
      mapBoundaries.xMin;
    const y =
      Math.random() * (mapBoundaries.yMax - mapBoundaries.yMin) +
      mapBoundaries.yMin;
    scorePoint.position.set(x, y, scorePoint.position.z);
  };
  
  const character = new THREE.Mesh(
    new THREE.PlaneGeometry(0.02, 0.02),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHex(0xFFFFFF),
    })
  );
  snake.__mesh.add(character);
  character.visible = false;

  // Tail management
  const tailGroup = new THREE.Group();
  snake.__mesh.add(tailGroup);

  // Store positions for snake body (head + tail)
  let snakePositions = [
    character.position.clone(), // head
  ];

  // Add a tail segment at the last position
  const addTail = () => {
    const lastPos = snakePositions[snakePositions.length - 1].clone();
    const tailSegment = new THREE.Mesh(
      new THREE.PlaneGeometry(0.02, 0.02),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHex(0xFFFFFF),
      })
    );
    tailSegment.position.copy(lastPos);
    tailGroup.add(tailSegment);
    snakePositions.push(lastPos);
  };
  const clearTail = () => {
    // Remove all tail segments from the group and reset positions array
    tailGroup.clear();
    // Keep only the head position
    snakePositions = [character.position.clone()];
  };

  // Update tail positions each frame
  loopDispatcher.addEventListener("loopEvent", () => {
    // Insert new head position at the front
    snakePositions.unshift(character.position.clone());
    // Remove last position to keep length
    if (snakePositions.length > tailGroup.children.length + 1) {
      snakePositions.pop();
    }
    // Update tail segments' positions
    tailGroup.children.forEach((segment, i) => {
      segment.position.copy(snakePositions[i + 1]);
    });
    // Check if the head collides with the score
    if (character.position.distanceTo(scorePoint.position) < 0.018) {
      setScorePointToRandomPosition();
      addTail();
      snake.__score += 1;
      scoreText.text = `Score: ${snake.__score}`;
      scoreText.sync();
    }
    // if the head hits its own tail i > 3, call gameOver();
    if (snake.__isGameActive) {
      for (let i = 3; i < snakePositions.length; i++) {
        if (character.position.distanceTo(snakePositions[i]) < 0.015) {
          gameOver();
          break;
        }
      }
    }
    
  });

  const speed = 0.01;
  const velocity = new THREE.Vector2(0, speed);

  loopDispatcher.addEventListener("loopEvent", () => {
    character.position.x += velocity.x;
    character.position.y += velocity.y;

    if (character.position.x < mapBoundaries.xMin)
      character.position.x = mapBoundaries.xMax;
    else if (character.position.x > mapBoundaries.xMax)
      character.position.x = mapBoundaries.xMin;

    if (character.position.y < mapBoundaries.yMin)
      character.position.y = mapBoundaries.yMax;
    else if (character.position.y > mapBoundaries.yMax)
      character.position.y = mapBoundaries.yMin;
  });

  addKeyEvent(
    (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          velocity.x = 0;
          velocity.y = speed;
          break;
        case "a":
        case "ArrowLeft":
          velocity.x = -speed;
          velocity.y = 0;
          break;
        case "s":
        case "ArrowDown":
          velocity.x = 0;
          velocity.y = -speed;
          break;
        case "d":
        case "ArrowRight":
          velocity.x = speed;
          velocity.y = 0;
          break;
        default:
          break;
      }
    },
    () => {}
  );

  snake.startGame = () => {
    snake.__isGameActive = true;
    snake.__score = 0;
    titleText.visible = false;
    scoreText.visible = true;
    scoreText.text = "Score: 0";
    scoreText.sync();
    gameOverText.visible = false;
    startBtn.visible = false;
    clearTail();
    scorePoint.visible = true;
    setScorePointToRandomPosition();
    character.position.set(0, 0, 0);
    character.visible = true;
  };

  const gameOver = () => {
    snake.__isGameActive = false;
    character.visible = false;
    scorePoint.visible = false;
    gameOverText.visible = true;
    startBtn.visible = true;
  }

  return snake;
}
