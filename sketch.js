
// Global variables
var cols;
var rows;
var w = 40;		// Width and height of each square
var grid = [];

function setup() {
	createCanvas(600, 600);

	// Creating the size of the column and rows
	cols = floor(width / w);
	rows = floor(height / w);

	// Initialize the grid with cell objects
	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
}

function draw() {
	background(51);

	// Print out the grid
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}
}

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];	// Top, Right, Bottom, Left

	this.show = function() {
		var x = this.i * w;
		var y = this.j * w;

		stroke(255);
		
		if (this.walls[0]) {
			line(x, y, x+w, y);
		}
		if (this.walls[1]) {
			line(x+w, y, x+w, y+w);
		}
		if (this.walls[2]) {
			line(x+w, y+w, x, y+w);
		}
		if (this.walls[3]) {
			line(x, y+w, x, y);
		}
	}
}