const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

const TICK = 30;
const CELL_SIZE = 32;
const PLAYER_SIZE = 5;
const FOV = 60;

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const player = {
  x: CELL_SIZE * 1.5,
  y: CELL_SIZE * 2,
  angle: 0,
  speed: 0,
};

function clearScreen() {
  context.fillStyle = "white";
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

function movePlayer() {
  player.x += Math.cos(player.angle) * player.speed
  player.y += Math.sin(player.angle) * player.speed
}

function getVCollision(angle){

}

function getHCollision(){

}

function castRay(angle){
  const vCollision = getVCollision(angle)
  const hCollision = getHCollision(angle)
}

function getRays() {
  const initialAngle = player.angle - FOV / 2;
  const numberOfRays = WIDTH;
  const angleStep = FOV / numberOfRays;
  return Array.from({length: numberOfRays}, (_, i) => {
    const angle = initialAngle + i * angleStep;
    const ray = castRay(angle)
    return ray
  });
}

function renderScene(rays) {}

function renderMinimap(posX = 0, posY = 0, scale = 1, rays) {
  const cellSize = scale * CELL_SIZE;
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = "black";
        context.fillRect(
          posX + x * cellSize,
          posY + y * cellSize,
          cellSize,
          cellSize
        );
      }
    });
  });

  context.fillStyle = "red";
  context.fillRect(
    posX + player.x * scale - PLAYER_SIZE / 2,
    posY + player.y * scale - PLAYER_SIZE / 2,
    PLAYER_SIZE,
    PLAYER_SIZE
  );

  const rayLength = PLAYER_SIZE * 2;
  context.strokeStyle = "red";
  context.beginPath();
  context.moveTo(player.x * scale + posX, player.y * scale + posY);
  context.lineTo(
    (player.x + Math.cos(player.angle) * rayLength) * scale,
    (player.y + Math.sin(player.angle) * rayLength) * scale
  );
  context.closePath();
  context.stroke();
}

function gameLoop() {
  clearScreen();
  movePlayer();
  const rays = getRays();
  renderScene(rays);
  renderMinimap(0, 0, 0.75, rays);
}

setInterval(gameLoop, TICK);

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") {
    player.speed = 2;
  }
  if (e.key === "s" || e.key === "ArrowDown") {
    player.speed = -2;
  }
  if (e.key === "a" || e.key === "ArrowLeft") {
    player.angle -= toRadians(5);
  }
  if (e.key === "d" || e.key === "ArrowRight") {
    player.angle += toRadians(5);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") {
    player.speed = 0;
  }
  if (e.key === "s" || e.key === "ArrowDown") {
    player.speed = 0;
  }
});

document.addEventListener("mousemove", (e) => {
  player.angle += toRadians(e.movementX)
})