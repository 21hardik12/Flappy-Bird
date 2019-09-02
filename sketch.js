let pipes;
let population;
function setup() {
	createCanvas(400, 400);
	pipes = new Pipes(5);
	population = new Population(50);
}

function draw() {   
	background(220);		
	pipes.show();
	pipes.update();
	population.show();
	population.update(pipes.pipes);
	if (population.allOut == true) {
		pipes.reset();
		population.calcFitness();
		population.naturalSelection();
		population.mutateTheBabies();		
		population.allOut = false;
	}
}