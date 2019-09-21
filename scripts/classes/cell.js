class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.walls = [true, true, true, true];
        this.visited = false;
        this.x = this.col*wh;
        this.y = this.row*wh;
        this.borderLines = [
            new Line(this.x      , this.y    , this.x + wh , this.y),
            new Line(this.x + wh , this.y    , this.x + wh , this.y + wh),
            new Line(this.x + wh , this.y+wh , this.x      , this.y + wh),
            new Line(this.x      , this.y+wh , this.x      , this.y)
        ];
    }

    checkNeighbors(){
        var neighbors = [];
            var top    = this.row-1 >= 0 ? grid[this.row - 1][this.col    ] : false;
            var right  = this.col+1 < cols ? grid[this.row    ][this.col + 1] : false;
            var bottom = this.row + 1 < rows ? grid[this.row + 1][this.col    ] : false;
            var left   = this.col - 1 >= 0 ? grid[this.row    ][this.col - 1] : false;

        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if( left && !left.visited){
            neighbors.push(left);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }

        if(neighbors.length > 0){
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        }
        else{
            return undefined;
        }

    }

    show(){
        stroke(255);
        if(this.walls[0]){
            this.borderLines[0].display();
        }
        if(this.walls[1]){
            this.borderLines[1].display();
        }
        if(this.walls[2]){
            this.borderLines[2].display();
        }
        if(this.walls[3]){
            this.borderLines[3].display();
        }
        if (this.visited){
            noStroke();
        fill(55, 55, 55, 0); 
        rect(this.x, this.y, wh, wh);
        }
    }

    highlight(){
        noStroke();
        fill(255, 0, 255, 100);
        rect(this.x, this.y, wh, wh);
    }

    changeColor(r=0, g=0, b=0, a=0){
        noStroke();
        fill(r, g, b, a);
        rect(this.x, this.y, wh, wh);
    }
}

class Line{
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    display(){
        line(this.x1, this.y1, this.x2, this.y2);
    }
}