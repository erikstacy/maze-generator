
// Global variables
var cols;
var rows;
var w = 40;		// Width and height of each square
var grid = [];

// Current cell
var current;

// Create the stack
var stack = [];

function setup() {
	createCanvas(600, 600);

	// Creating the size of the column and rows
	cols = floor(width / w);
	rows = floor(height / w);

	// Set the framerate
	frameRate(20);

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

		// Push the current cell to the stack
		stack.push(current);

		// Remove the walls between current and next
		removeWalls(current, next);

		// Next cell is now the current cell
		current = next;
	} else {
		// This would mean we got stuck somewhere

		// Pop a cell from the stack and make that the new current cell
		current = stack.pop();
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