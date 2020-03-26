
// Global variables
var cols;
var rows;
var w = 40;		// Width and height of each square
var grid = [];

// Current cell
var current;

function setup() {
	createCanvas(600, 600);

	// Creating the size of the column and rows
	cols = floor(width / w);
	rows = floor(height / w);

	// Set the framerate
	frameRate(5);

	// Initialize the grid with cell objects
	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	// Starting the maze at the top left
	current = grid[0];
}

function draw() {
	background(51);

	// Print out the grid
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	// Start by visiting the current cell
	current.visited = true;
	current.highlight();

	// Check the current node's neighbors
	// 		If any of the neighbors haven't been visited, grab
	//		one neighbor at random
	var next = current.checkNeighbors();

	// Visit this next cell
	if (next) {
		// Mark next as visited
		next.visited = true;

		// Remove the walls between current and next
		removeWalls(current, next);

		// Next cell is now the current cell
		current = next;
	}
}

// Magic formula to get 1D array position with i and j
function index(i, j) {
	// If the index is an edge case, return -1
	if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}

	return i + j * cols;
}

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];	// Top, Right, Bottom, Left
	this.visited = false;

	this.checkNeighbors = function() {
		var neighbors = [];

		// Get the cell's neighbors
		var top = grid[index(i, j-1)];
		var right = grid[index(i+1, j)];
		var bottom = grid[index(i, j+1)];
		var left = grid[index(i-1, j)];

		// If the neighbor hasn't been visited, push it to the neighbors array
		if (top && !top.visited) {
			neighbors.push(top);
		}
		if (right && !right.visited) {
			neighbors.push(right);
		}
		if (bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		if (left && !left.visited) {
			neighbors.push(left);
		}

		// If we have unvisited neighbors, grab a random neighbor
		if (neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	}

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

		if (this.visited) {
			noStroke();
			fill(255, 0, 255, 100);
			rect(x, y, w, w);
		}
	}

	this.highlight = function() {
		var x = this.i * w;
		var y = this.j * w;
		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, w, w);
	}
}

function removeWalls(a, b) {
	// Check where the cells are in relation to each other
	// and remove the walls between the cells
	var x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}

	var y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}