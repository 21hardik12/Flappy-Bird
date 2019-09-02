class NeuralNetwork {
	constructor (n_input, n_hidden, n_output) {
		this.sizes = [n_input, n_hidden, n_output];
		this.weight_matrices = [];
		this.bias_matrices = [];
		
		// filling up the weight matrices
		for (let i = 0; i < this.sizes.length - 1; i++) {
			this.weight_matrices[i] = new Matrix(this.sizes[i+1], this.sizes[i]);
			this.weight_matrices[i].randomize();			
		}
		
		// filling up the biase matrices
		for (let i = 0; i < this.sizes.length - 1; i++) {
			this.bias_matrices[i] = new Matrix(this.sizes[i+1], 1);
			this.bias_matrices[i].randomize();			
		}
	}
	
	feedForward(input) {
		input = Matrix.fromArray(input);
		for (let i = 0; i < this.sizes.length - 1; i++) {
			input = Matrix.dot(this.weight_matrices[i], input);			
			input.add(this.bias_matrices[i]);			
			input.activate();
		}		
		
		input = input.toArray();
		return input;
	}
	
	copy() {
		let clone = new NeuralNetwork(this.sizes[0], this.sizes[1], this.sizes[2]);
		for (let i = 0; i < this.sizes.length - 1; i++) {
			clone.weight_matrices[i] = this.weight_matrices[i].copy();
			clone.bias_matrices[i] = this.bias_matrices[i].copy();
		}
	}
	
	crossOver(partner) {
		let child = new NeuralNetwork(this.sizes[0], this.sizes[1], this.sizes[2]);
		for (let i = 0; i < this.sizes.length - 1; i++) {
			child.weight_matrices[i] = this.weight_matrices[i].crossOver(partner.weight_matrices[i]);
			child.bias_matrices[i] = this.bias_matrices[i].crossOver(partner.bias_matrices[i]);
		}
		return child;
	}
	
	mutate(mutationRate) {
		for (let i = 0; i < this.sizes.lenght - 1; i++) {
			this.weight_matrices[i].mutate(mutationRate);
			this.bias_matrices[i].mutate(mutationRate);
		}
	}
}