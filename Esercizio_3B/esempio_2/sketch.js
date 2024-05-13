let sfere = []

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  for (let i = 0; i < 10; i++) {
    sfere[i] = new Sfera()
  }
}

//function windowResized() {
 // resizeCanvas(windowWidth, windowHeight)
//}

function keyPressed() {
  if (key == 's') {
    save('pattern.png')
  }
}

function draw() {
 
  setGradient(10000, 10000, windowWidth, windowHeight, color(255), color(255));
  for (let sfera of sfere) {
    sfera.update()
    sfera.display()
  }
}

class Sfera {
  constructor() {
    this.posizione = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2))
    this.velocita = createVector(random(-5, 5), random(-5, 5))
    this.raggio = random(1, 50)
    this.rotazione = createVector(random(-1, 1), random(-1, 1), random(-1, 1));
  }

  update() {
    this.posizione.add(this.velocita)
    if (this.posizione.x > width / 2 - this.raggio || this.posizione.x < -width / 2 + this.raggio) {
      this.velocita.x *= -1
    }
    if (this.posizione.y > height / 2 - this.raggio || this.posizione.y < -height / 2 + this.raggio) {
      this.velocita.y *= -1
    }
    for (let altraSfera of sfere) {
      if (altraSfera != this) {
        let d = dist(this.posizione.x, this.posizione.y, altraSfera.posizione.x, altraSfera.posizione.y)
        if (d < this.raggio + altraSfera.raggio) {
          let collisione = p5.Vector.sub(this.posizione, altraSfera.posizione)
          collisione.normalize()
          this.velocita = collisione
          altraSfera.velocita = p5.Vector.mult(collisione, -30)
        }
      }
    }
    // Aggiunge un colore casuale ad ogni aggiornamento
    this.colore = color(abs(this.posizione.x) % 50, abs(this.posizione.y) % 50, (abs(this.posizione.x) + abs(this.posizione.y)) % 255)
    this.raggio = 50 + 50 * sin(frameCount * 0.01);
  }

   display() {
   push()
     translate(this.posizione.x, this.posizione.y)
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    let dirY = (mouseY / height - 0.5) * 50
    let dirX = (mouseX / width - 0.5) * 50
    directionalLight(204, 204, 204, -dirX, -dirY, -1)
   ambientMaterial(this.colore) // Usa il colore casuale
    sphere(this.raggio)
   pop()
  }
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y+h; i++) {
    let inter = map(i, y, y+h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x+w, i);
  }
}
