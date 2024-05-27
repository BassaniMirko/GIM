// Definizione delle costanti
const diameter = 400; // Diametro del cerchio nero
const radius = diameter / 2; // Raggio del cerchio nero
const centerX = radius; // Posizione X del centro del cerchio nero
const centerY = radius; // Posizione Y del centro del cerchio nero
const secondsRadius = radius - 20; // Raggio della lancetta dei secondi
const minutesLength = radius - 40; // Lunghezza della lancetta dei minuti
const totalHours = 12; // Numero totale di ore nel ciclo
const secondsSpeed = 6; // Velocità dei secondi (gradi al secondo)

// Creazione del canvas
const canvas = document.createElement('canvas');
canvas.width = diameter;
canvas.height = diameter;
canvas.style.position = 'absolute';
canvas.style.left = '50%';
canvas.style.top = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Funzione per disegnare il quadrante nero
function drawBlackCircle() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

// Funzione per disegnare la lancetta dei minuti
function drawMinutes(minutes) {
    const angle = (minutes / 60) * 2 * Math.PI;
    const x = centerX + minutesLength * Math.cos(angle);
    const y = centerY + minutesLength * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'white'; // Colore della lancetta dei minuti
    ctx.lineWidth = 4; // Spessore della lancetta dei minuti
    ctx.stroke();
    ctx.closePath();
}

// Funzione per disegnare l'indicazione delle ore
function drawHours(hours) {
    const hoursPassed = hours % totalHours;
    const grayPercentage = (hoursPassed / totalHours) * 100;
    const grayAngle = (grayPercentage / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + grayAngle);
    ctx.fillStyle = 'rgba(128, 128, 128, 0.5)'; // Colore della porzione grigia
    ctx.fill();
    ctx.closePath();
}

// Funzione per disegnare il pallino dei secondi
function drawSeconds(seconds) {
    const angle = (seconds / 60) * 2 * Math.PI;
    const x = centerX + secondsRadius * Math.cos(angle);
    const y = centerY + secondsRadius * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'; // Colore del pallino dei secondi
    ctx.fill();
    ctx.closePath();
}

// Funzione di aggiornamento dell'orologio
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    drawBlackCircle();
    drawMinutes(minutes);
    drawHours(hours);
    drawSeconds(seconds);
}

// Aggiornamento iniziale dell'orologio
updateClock();

// Animazione per il pallino dei secondi
function animateSeconds() {
    const now = new Date();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const angle = (seconds + milliseconds / 1000) * secondsSpeed;
    const x = centerX + secondsRadius * Math.cos(angle);
    const y = centerY + secondsRadius * Math.sin(angle);
    ctx.clearRect(0, 0, diameter, diameter);
    drawBlackCircle();
    drawMinutes(now.getMinutes());
    drawHours(now.getHours());
    drawSeconds(seconds);
    requestAnimationFrame(animateSeconds);
}

// Avvio dell'animazione
animateSeconds();
