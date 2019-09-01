let pipes;
let bird;
function setup() {
	createCanvas(400, 400);
	pipes = new Pipes(5);
	bird = new Bird();
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		bird.yspeed = bird.lift;
	}	
}

function draw() {   
	background(220);		
	pipes.show();
	bird.show();
	if (bird.out == false) {
		pipes.update();		
		bird.update(pipes.pipes);
	}		
}