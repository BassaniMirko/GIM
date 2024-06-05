var pongText = 'Pong'
var pongPoints = []
var vehicles = []
var ball = { x: 0, y: 0 } // Posizione iniziale della palla
var maxChangeForce = 5; // Forza massima desiderata
var font;

// Caricamento del font
function preload() {
    font = loadFont('assets/Helvetica.otf') // Assicurati di avere il font nel percorso corretto
}

// Definizione della classe Vehicle
function Vehicle(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector()
    this.acc = createVector()
    this.target = createVector(x, y)
}

Vehicle.prototype.applyForce = function (force) {
    this.acc.add(force)
}

Vehicle.prototype.behaviors = function () {
    var seek = this.seek(this.target)
    this.applyForce(seek)
}

Vehicle.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.pos)
    desired.setMag(0.3)
    var steer = p5.Vector.sub(desired, this.vel)
    steer.limit(0.1)
    return steer
}

Vehicle.prototype.update = function () {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0); // Reset dell'accelerazione
}

Vehicle.prototype.show = function () {
    stroke(255);
    strokeWeight(8);
    point(this.pos.x, this.pos.y)
}

function setup() {
    createCanvas(windowWidth, windowHeight); // Correzione di windowWidth e windowHeight

    // Creare i punti per la parola 'Pong'
    var bounds = font.textBounds(pongText, 0, 0, 192)
    var posx = width / 2 - bounds.w / 2
    var posy = height / 2 + bounds.h / 2

    pongPoints = font.textToPoints(pongText, posx, posy, 192, {
        sampleFactor: 0.1
    })

    for (var i = 0; i < pongPoints.length; i++) {
        var pt = pongPoints[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}

function draw() {
    background(51);

    // Aggiorna la posizione della palla
    ball.x = mouseX;
    ball.y = mouseY;

    // Muovi i cerchi quando la palla passa sulla parola 'Pong'
    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        if (isBallNear(v.pos.x, v.pos.y)) {
            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            v.applyForce(force);
        }
        v.behaviors();
        v.update();
        v.show();
    }
}

// Funzione per controllare se la palla è vicina a una certa posizione
function isBallNear(x, y) {
    var ballPos = createVector(ball.x, ball.y);
    var pos = createVector(x, y);
    var dist = p5.Vector.dist(ballPos, pos);
    return dist < 50;
}
