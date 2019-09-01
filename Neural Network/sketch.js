let nn;

function setup() {
	nn = new NeuralNetwork(3, 4, 3); 
	input = [0, 0, 0];
	nn.feedForward(input);
}

function draw() {

}