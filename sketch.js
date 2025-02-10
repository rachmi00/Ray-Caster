let walls = [];
let particle;
let fov;
let sliderFOV;
let textureImg;

const sceneW = 400;
const sceneH = 300;

function preload() {
  textureImg = loadImage('texture.jpg'); // Load a texture for the walls
}

function setup() {
  createCanvas(800, 300);

  // Randomly generate walls
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }

  // Add boundaries along the edges
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));

  particle = new Particle();
  sliderFOV = createSlider(0, 360, 45);
  sliderFOV.input(changeFOV);
}

function changeFOV() {
  fov = sliderFOV.value();
  particle.updateFOV(fov);
}

function draw() {
  // Handle player movement
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.1);
  } else if (keyIsDown(UP_ARROW)) {
    particle.move(1);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-1);
  }

  background(0);

  // Draw walls in 2D view
  for (let wall of walls) {
    wall.show();
  }

  // Draw the particle (player)
  particle.show();

  // Render the first-person view
  const scene = particle.look(walls);
  const w = sceneW / scene.length;
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    const sq = scene[i] * scene[i];
    const wsq = sceneW * sceneW;
    const b = map(sq, 0, wsq, 255, 0); // Dynamic lighting based on distance
    const h = map(scene[i], 0, sceneW, sceneH, 0);

    // Texture mapping
    const texX = i % textureImg.width;
    const texY = map(h, 0, sceneH, 0, textureImg.height);
    const texColor = textureImg.get(texX, texY);
    fill(texColor);

    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();
}