function solve(grid) {
    grid.forEach(row => row.forEach(col => (col.visited = false)));
    var currentBlock = grid[0][0];
    currentBlock.visited = true;
    var endBlock = grid[rows - 1][cols - 1];
    var path = new Stack();
    var foundPath = false;
    endBlock.changeColor(255, 255, 255, 255);
    while (!foundPath) {
        if (
            currentBlock.row === endBlock.row &&
            currentBlock.col === endBlock.col
        ) {
            path.push(currentBlock);
            foundPath = true;
        } else {
            var neighbors = getNeighbors(currentBlock);
            var nextBlock = getNextBlock(neighbors);
            if (nextBlock) {
                path.push(currentBlock);
                currentBlock = nextBlock;
                currentBlock.visited = true;
            } else {
                currentBlock = path.pop();
            }
        }
    }
    colorPath(path);
    return path;
}

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
