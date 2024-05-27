function setup() {
	createCanvas(windowWidth, windowHeight)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
	background(200)
	
	translate(width/2, height/2)
		stroke(0, 50)

		line(-200, 0, 200, 0)
		line(0, -200, 0, 200)

        noStroke()
		fill(0)

		push()
		
		rotate(TAU / 12 * (hour() % 12) + TAU /1 / 60 * minute())
		rect(-13, 25, 26, -180)
		pop()

		push()
		rotate(TAU / 60 * minute())
		rect(-10, 25, 20, -200)
		pop()
		
        fill(255, 0, 0)
		push()
		rotate(TAU / 60 * second())
		rect(-2, 25, 4, -300)
		circle(0, -275, 10)
		pop()

		fill(255)
		circle(0,0,15,15)



}

