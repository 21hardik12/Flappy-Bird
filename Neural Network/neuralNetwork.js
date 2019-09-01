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
		input.visualize();
		for (let i = 0; i < this.sizes.length - 1; i++) {
			input = Matrix.dot(this.weight_matrices[i], input);			
			input.add(this.bias_matrices[i]);			
			input.activate();
		}		
		
		return input;
	}
}