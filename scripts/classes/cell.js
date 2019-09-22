class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.walls = [true, true, true, true];
        this.visited = false;
        this.x = this.col * wh;
        this.y = this.row * wh;
        this.color = {
            r: 55,
            g: 55,
            b: 55,
            a: 0
        };
        this.borderLines = [
            new Line(this.x, this.y, this.x + wh, this.y),
            new Line(this.x + wh, this.y, this.x + wh, this.y + wh),
            new Line(this.x + wh, this.y + wh, this.x, this.y + wh),
            new Line(this.x, this.y + wh, this.x, this.y)
        ];
    }

    checkNeighbors() {
        var neighbors = [];
        if (this.row - 1 >= 0 && !grid[this.row - 1][this.col].visited)
            neighbors.push(grid[this.row - 1][this.col]);
        if (this.col + 1 < cols && !grid[this.row][this.col + 1].visited)
            neighbors.push(grid[this.row][this.col + 1]);
        if (this.row + 1 < rows && !grid[this.row + 1][this.col].visited)
            neighbors.push(grid[this.row + 1][this.col]);
        if (this.col - 1 >= 0 && !grid[this.row][this.col - 1].visited)
            neighbors.push(grid[this.row][this.col - 1]);

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    show() {
        stroke(255);
        this.walls.forEach((wall, index) => {
            if (wall) this.borderLines[index].display();
        });
        if (this.visited) {
            noStroke();
            fill(this.color.r, this.color.g, this.color.b, this.color.a);
            rect(this.x, this.y, wh, wh);
        }
    }

    highlight() {
        noStroke();
        fill(255, 0, 255, 100);
        rect(this.x, this.y, wh, wh);
    }

    changeColor(r = 55, g = 55, b = 55, a = 0) {
        noStroke();
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
        this.color.a = a;
    }
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    display() {
        line(this.x1, this.y1, this.x2, this.y2);
    }
}
