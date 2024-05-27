let drops = [];
let lightning = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 500; i++) {
    drops.push(new Drop());
  }
}

function draw() {
  if (lightning) {
    background(255); // Imposta uno sfondo bianco
    // Disegna un fulmine
    stroke(0);
    drawLightning(mouseX, mouseY, mouseX + random(100, 100), height);
  } else {
    background(10); 
    for (let drop of drops) {
      drop.fall();
      drop.show();
    }
  }
}

function mousePressed() {
  lightning = true;
}

function mouseReleased() {
  lightning = false;
}

function drawLightning(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let n = floor(sqrt(dx * dx + dy * dy) / 4);
  let x = x1;
  let y = y1;
  let prevx = x;
  let prevy = y;
  for (let i = 0; i < n; i++) {
    x += dx / n + random(-10, 10);
    y += dy / n;
    line(prevx, prevy, x, y);
    prevx = x;
    prevy = y;
  }
  line(prevx, prevy, x2, y2);
}

class Drop {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -1);
    this.z = random(0, 100);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 1, 200);
  }

  fall() {
    this.y = this.y + this.yspeed;
    let gravity = map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + gravity;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);
    }
  }

  show() {
    let thick = map(this.z, 0, 200, 1, 3);
    strokeWeight(thick);
    stroke(255);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
