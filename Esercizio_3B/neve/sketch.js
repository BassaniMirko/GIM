let snowflakes = []; // array per contenere i fiocchi di neve
let snowmen = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(240);
  noStroke();
}

// classe Snowman
class Snowman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10; // velocità di caduta
  }

  update() {
    this.y += this.speed; // fa cadere il pupazzo di neve

    // rimuove il pupazzo di neve se è fuori dallo schermo
    if (this.y > height) {
      let index = snowmen.indexOf(this);
      snowmen.splice(index, 4);
    }
  }

  display() {
    // corpo del pupazzo di neve
    ellipse(this.x, this.y, 90); // cerchio inferiore
    ellipse(this.x, this.y - 65, 75); // cerchio del mezzo
    ellipse(this.x, this.y - 130, 50); // cerchio superiore

    // naso del pupazzo di neve (triangolo arancione)
    fill('orange');
    triangle(this.x, this.y - 130, this.x + 30, this.y - 135, this.x, this.y - 140);
    fill(240); // resetta il colore
  }
}

function mousePressed() {
  snowmen.push(new Snowman(mouseX, mouseY));
}

function draw() {
  background('LightBlue');
  let t = frameCount / 600; // aggiorna il tempo

  // crea un fiocco di neve casuale
  if (random() < 0.5) {
    snowflakes.push(new snowflake()); // aggiungi un fiocco di neve
  }

  // disegna i fiocchi di neve
  for (let flake of snowflakes) {
    flake.update(t); // aggiorna il fiocco di neve
    flake.display(); // disegna il fiocco di neve
  }

  // aggiungi questo nel tuo ciclo draw
  for (let snowman of snowmen) {
    snowman.update();
    snowman.display();
  }
}

// classe fiocco di neve
function snowflake() {
  // inizializza le proprietà
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(5, 8);

  // radiale
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x posizione
    let w = 0.6; // velocità angolare
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // dimensioni differenti cadono a velocità diverse
    this.posY += pow(this.size, 0.5);

    // cancella se oltre la finestra
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    // disegna un fiocco di neve come una stella a 6 punte
    push();
    translate(this.posX, this.posY);
    rotate(frameCount / 200.0);
    stroke(255);
    strokeWeight(4);
    line(0, 0, this.size, this.size);
    line(0, 0, -this.size, -this.size);
    rotate(PI/3);
    line(0, 0, this.size, this.size);
    line(0, 0, -this.size, -this.size);
    rotate(PI/3);
    line(0, 0, this.size, this.size);
    line(0, 0, -this.size, -this.size);
    pop();
  };
}
