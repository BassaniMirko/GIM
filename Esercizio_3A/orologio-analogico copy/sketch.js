function setup() {
	createCanvas(400, 300);
	frameRate(30);
}
  
function draw() {
	background(240);
  
	// Ottenere data e ora
	const data = new Date();
	const ore = data.getHours().toString().padStart(2, '0');
	const minuti = data.getMinutes().toString().padStart(2, '0');
	const secondi = data.getSeconds().toString().padStart(2, '0');
  
	// Testo dell'ora
	textSize(32);
	textAlign(CENTER, CENTER);
	text(`${ore}:${minuti}:${secondi}`, width / 2, height / 3);
  
	// Barra di caricamento per il giorno
	const secondiGiorno = (data.getHours() * 3600) + (data.getMinutes() * 60) + data.getSeconds();
	const secondiTotaliGiorno = 86400; // 24 ore * 60 minuti * 60 secondi
	const percentualeGiorno = (secondiGiorno / secondiTotaliGiorno) * 100;
	const larghezzaBarraGiorno = map(percentualeGiorno, 0, 100, 0, width - 20);
	fill(0, 150, 255);
	rect(width / 4 - larghezzaBarraGiorno / 2, height / 2 + 50, larghezzaBarraGiorno, 20);
  
	// Testo per la barra del giorno
	textSize(16);
	textAlign(LEFT, CENTER);
	text(`Tempo rimanente alla fine del giorno: ${100 - percentualeGiorno}%`, 20, height / 2 + 70);
  
	// Barra di caricamento per il mese
	const giorno = data.getDate();
	const giorniNelMese = Date.daysInMonth(data.getFullYear(), data.getMonth());
	const secondiMese = giorno * 86400;
	const percentualeMese = (secondiMese / (giorniNelMese * 86400)) * 100;
	const larghezzaBarraMese = map(percentualeMese, 0, 100, 0, width - 20);
	fill(0, 100, 200);
	rect(width / 2 - larghezzaBarraMese / 2, height / 2 + 100, larghezzaBarraMese, 20);
  
	// Testo per la barra del mese
	text(`Tempo rimanente alla fine del mese: ${100 - percentualeMese}%`, 20, height / 2 + 120);
  
	// Barra di caricamento per l'anno
	const mese = data.getMonth() + 1; // Gennaio = 0
	const giorniAnno = data.getFullYear() % 4 === 0 ? 366 : 365;
	let secondiAnno = 0;
	for (let i = 0; i < mese - 1; i++) {
	  secondiAnno += Date.daysInMonth(data.getFullYear(), i) * 86400;
	}
	secondiAnno += giorno * 86400;
	const percentualeAnno = (secondiAnno / (giorniAnno * 86400)) * 100;
	const larghezzaBarraAnno = map(percentualeAnno, 0, 100, 0, width - 20);
	fill(0, 50, 150);
	rect(width / 2 - larghezzaBarraAnno / 2, height / 2 + 150, larghezzaBarraAnno, 20);
  
	// Testo per la barra del mese
	text(`Tempo rimanente alla fine dell'anno: ${100 - percentualeAnno}%`, 20, height / 2 + 170);
}
