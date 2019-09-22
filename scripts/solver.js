function getNeighbors(cell) {
    var row = cell.row;
    var col = cell.col;
    var neighbors = {};
    row - 1 >= 0 && !cell.walls[0]
        ? (neighbors.top = grid[row - 1][col])
        : null;
    col + 1 < cols && !cell.walls[1]
        ? (neighbors.right = grid[row][col + 1])
        : null;
    row + 1 < rows && !cell.walls[2]
        ? (neighbors.bottom = grid[row + 1][col])
        : null;
    col - 1 >= 0 && !cell.walls[3]
        ? (neighbors.left = grid[row][col - 1])
        : null;

    return neighbors;
}

function getNextBlock(neighbors) {
    if (neighbors.bottom && !neighbors.bottom.visited) {
        return neighbors.bottom;
    } else if (neighbors.right && !neighbors.right.visited) {
        return neighbors.right;
    } else if (neighbors.top && !neighbors.top.visited) {
        return neighbors.top;
    } else if (neighbors.left && !neighbors.left.visited) {
        return neighbors.left;
    } else {
        return false;
    }
}

function colorPath(path) {
    path.forEach(function(element) {
        element.changeColor(255, 0, 255, 20);
    });
}

function myMethodInit() {}

const myMethod = {
    setDefaultValues() {
        this.currentBlock = grid[0][0];
        this.currentBlock.visited = true;
        this.endBlock = grid[rows - 1][cols - 1];
        this.path = new Stack();
        this.foundPath = false;
        grid.forEach(row => row.forEach(col => (col.visited = false)));
    },

    solveFull() {
        this.setDefaultValues();
        while (!this.foundPath) {
            this.foundPath = this.step();
        }
        colorPath(this.path);
        return this.path;
    },

    step() {
        if (
            this.currentBlock.row === this.endBlock.row &&
            this.currentBlock.col === this.endBlock.col
        ) {
            this.path.push(this.currentBlock);
            return true;
        } else {
            var neighbors = getNeighbors(this.currentBlock);
            var nextBlock = getNextBlock(neighbors);
            if (nextBlock) {
                this.path.push(this.currentBlock);
                this.currentBlock = nextBlock;
                this.currentBlock.visited = true;
            } else {
                this.currentBlock = this.path.pop();
            }
        }
        return false;
    }
};
