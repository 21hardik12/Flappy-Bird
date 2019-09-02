class Bird {
	constructor() {
		this.x = int(random(width/3 - 30, width/3));
		this.radius = 10;
		this.y = int(random(this.radius, height-this.radius));
		this.yspeed = 0;
		this.gravity = 0.5;
		this.lift = -6;
		this.out = false;
		
		this.brain = new NeuralNetwork(5, 5, 1);
		this.score = 0;
		this.fitness = 0;
	}
	
	up() {
		this.yspeed = this.lift;
	}
	
	update(pipes) {
		this.yspeed += this.gravity;
		this.y += this.yspeed;
				
		let max = Infinity;
		let d;
		let index;
		let closest_pipe;
		
		for (let i = 0; i < pipes.length; i++) {
			d = dist(this.x, this.y, pipes[i].x, pipes[i].upper);
			if (d > 0 && d < max) {				
				max = d;
				index = i;
			}
		}
		closest_pipe = pipes[index];
		
		if (((this.x + this.radius > closest_pipe.x) && (this.x - this.radius < closest_pipe.x + closest_pipe.width)) &&
		   ((this.y - this.radius < closest_pipe.upper) || (this.y + this.radius > closest_pipe.lower))) {
			this.out = true;			   
		}
		
		if ((this.y - this.radius < 0) || (this.y + this.radius > height)) {
			this.out = true;
		}
		
		let input = [this.y, this.yspeed, closest_pipe.x, closest_pipe.upper, closest_pipe.lower];
		let decision = this.brain.feedForward(input);
		if (decision[0] > 0.5) {
			this.up();
		}
		this.score++;
	}
	
	crossOver(partner) {
		let child = new Bird();
		child.brain = this.brain.crossOver(partner.brain);
		return child;
	}
	
	mutate(mutationRate) {
		this.brain.mutate(mutationRate);
	}
	
	calcFitness() {
		this.fitness = this.score;
	}
	
	show() {
		ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
	}
}