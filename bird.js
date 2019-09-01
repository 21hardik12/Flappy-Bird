class Bird {
	constructor() {
		this.x = width/3;
		this.radius = 10;
		this.y = int(random(this.radius, height-this.radius));
		this.yspeed = 0;
		this.gravity = 0.5;
		this.lift = -6;
		this.out = false;
	}
	
	update(pipes) {
		this.yspeed += this.gravity;
		this.y += this.yspeed;
		this.y = constrain(this.y, this.radius, height-this.radius);
		
		let max = Infinity;
		let d = 0;
		let index = 0;
		let closest_pipe;
		
		for (let i = 0; i < pipes.length; i++) {
			d = dist(this.x, this.y, pipes[i].x, pipes[i].y);
			if (d > 0 && d < max) {				
				max = d;
				index = i;
			}
		}
		closest_pipe = pipes[index];
		if ((this.x + this.radius > closest_pipe.x && this.x - this.radius < closest_pipe.x + closest_pipe.width) &&
		   ((this.y - this.radius < closest_pipe.upper) || (this.y + this.radius > closest_pipe.lower))) {
			this.out = true;			   
		}
	}
	
	show() {
		ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
	}
}