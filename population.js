class Population {
	constructor(n_size, m_rate) {
		this.n_size = n_size;
		this.mutationRate = m_rate;
		this.population = [];
		for (let i = 0; i < this.n_size; i++) {
			this.population[i] = new Bird();
		}
		this.allOut = false;
	}
	
	update(pipes) {
		let pOut = true;
		for (let i = 0; i < this.n_size; i++) {
			if (this.population[i].out == false) {
				pOut = false;
				this.population[i].update(pipes);	
			}
		}		
		if (pOut == true) {
			this.allOut = true;
		}
	}
	
	show() {
		for (let i = 0; i < this.n_size; i++) {
			if (this.population[i].out == false) {
				this.population[i].show();
			}
		}
	}
	
	calcFitness() {
		for (let i = 0; i < this.n_size; i++) {
			this.population[i].calcFitness();
		}
	}
	
	naturalSelection() {
		let newPopulation = [];
		let parent1;
		let parent2;
		let child;
		for (let i = 0; i < this.n_size; i++) {
			parent1 = this.selectBird();
			parent2 = this.selectBird();
			child = parent1.crossOver(parent2);
			newPopulation[i] = child;
		}
		this.population = newPopulation;
	}
	
	mutateTheBabies() {
		for (let i = 0; i < this.n_size; i++) {
			this.population[i].mutate(this.mutationRate);
		}
	}
	
	selectBird() {
		let fitnessSum = 0;
		for (let i = 0; i < this.n_size; i++) {
			fitnessSum += this.population[i].fitness;
		}
		let rand = floor(random(0, fitnessSum));
		let runningSum = 0;
		for (let i = 0; i < this.n_size; i++) {
			runningSum += this.population[i].fitness;
			if (runningSum > rand) {
				return this.population[i];
			}
		}
		return this.population[i];
	}
}