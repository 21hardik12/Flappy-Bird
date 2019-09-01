class Pipe {
	constructor(x) {
		this.x = x;
		this.gap = int(random(60, 100))
		this.upper = int(random(10, height - this.gap - 20));   
		this.lower = this.upper + this.gap;
		this.xspeed = -1;    
		this.width = int(random(10,30));
	}

	update() {
		this.x += this.xspeed;
	}

	show() {
		fill(100)    
		rect(this.x, 0, this.width, this.upper);
		rect(this.x, this.lower, this.width, height);
	}
}

class Pipes {
	constructor(n) {
		this.pipes = [];	
		this.pipes.push(new Pipe(width));
		for (let i = 1; i < n; i++) {
			this.pipes.push(new Pipe(this.pipes[i-1].x + int(random(110, 140))));
		}
	}

	show() {
		for (let i = 0; i < this.pipes.length; i++) {
			this.pipes[i].show();	
		}  
	}

	update() {	
		if (this.pipes[0].x + this.pipes[0].width < 0) {
			this.pipes.push(new Pipe(this.pipes[this.pipes.length - 1].x + int(random(110, 140))));
			this.pipes.splice(0, 1);
		}


		for (let i = 0; i < this.pipes.length; i++) {
			this.pipes[i].update();	
		}
	}
}