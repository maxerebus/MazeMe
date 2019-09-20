//// MINEEEEEEEEEE
var canvasWidth = 600;
var canvasHeigh = 600;
var cols, rows;
var wh = 30;
var grid = [];
var stack = new Stack();
var current;
var borders = [];
var pMoveSpeed = Math.ceil(wh / 20);
var pSize = Math.floor(wh/1.3);
var pPosX = Math.floor((wh - wh/1.3) / 2);
var pPosY = Math.floor((wh - wh/1.3) / 2);
var actionY = 0;
var actionX = 0;

function setup() {
    cnv = createCanvas(canvasWidth, canvasHeigh);
    strokeWeight(3);
    cols = floor(width/wh);
    rows = floor(height/wh);
    noCursor();
    generateNew();

}

function generateNew(){
    stack.clear();
    grid = [];
    borders = [];
    for (var row = 0; row < rows; row++){
        for(var col = 0; col < cols; col++){
            var cell = new Cell(col, row);
            grid.push(cell);
        }
    }
    current = grid[0];
    grid[0].walls[3] = false;
    grid[cols*rows-1].walls[1] = false;
    while(!(grid.every( (cell) => cell.visited))){
        current.visited = true;
        current.highlight();
        var next = current.checkNeighbors();
        if(next){
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        }
        else if(stack.length() > 0) {
            current = stack.pop();
        }
    };

    grid.forEach(function(cell){
        cell.walls.forEach( function(wall, index) {
            if(wall){
                borders.push(cell.borderLines[index]);
            }
        });
    });

    pPosX = 0;
    pPosY = 0;

    redraw()
}
  
function draw() {
    background(55);
    for(var i = 0; i < grid.length; i++){
        grid[i].show();
        // grid[i].changeColor(55, 55, 55, 255);
    }

    actionY = 0;
    actionX = 0;

    if(keyIsDown(UP_ARROW)){
        actionY -= pMoveSpeed;
    }
    if(keyIsDown(RIGHT_ARROW)){
        actionX += pMoveSpeed;
    }
    if(keyIsDown(DOWN_ARROW)){
        actionY += pMoveSpeed;
    }
    if(keyIsDown(LEFT_ARROW)){
        actionX -= pMoveSpeed;
    }

    checkPlayerPos();

    if(actionX !== 0){
        pPosX += actionX;
    }
    if(actionY !== 0){
        pPosY += actionY;
    }

    fill(150, 0, 150, 200);
    rect(pPosX, pPosY, pSize, pSize);
}

function index(row, col){
    if(row < 0 || col < 0 || row > cols-1 || col > rows-1){
        return false;
    }
    return row + col * cols;
}

function removeWalls(current, next){
    var x = current.row - next.row;
    if(x === 1){
        current.walls[3] = false;
        next.walls[1] = false;
    }
    else if(x === -1){
        current.walls[1] = false;
        next.walls[3] = false;
    }
    
    var y = current.col - next.col;
    if(y === 1){
        current.walls[0] = false;
        next.walls[2] = false;
    }
    else if(y === -1){
        current.walls[2] = false;
        next.walls[0] = false;
    }
}

function isInBorders(newLine){
    borders.push(newLine);
}

// --------------------MAZE FUNCTIONS------------------

function checkPlayerPos(){
    var newPosX = pPosX + actionX;
    var newPosY = pPosY + actionY;
    if(newPosX < 0 || newPosX +pSize > canvasWidth){
        // console.log(newPosX);
        actionX = 0;
    } 
    if(newPosY < 0 || newPosY + pSize > canvasHeigh){
        actionY = 0;
        // console.log(newPosY);
    }

    var x1 = newPosX;
    var y1 = newPosY;
    var x2 = newPosX+pSize;
    var y2 = newPosY+pSize;
    // console.log(x1, y1, x2, y1);
    // console.log(x2, y1, x2, y2);
    // console.log(x1, y2, x2, y2);
    // console.log(x1, y1, x1, y2);

    borders.forEach(function(line){
        if(intersects(x1, y1, x2, y1, line.x1, line.y1, line.x2, line.y2)
        || intersects(x2, y1, x2, y2, line.x1, line.y1, line.x2, line.y2)
        || intersects(x1, y2, x2, y2, line.x1, line.y1, line.x2, line.y2)
        || intersects(x1, y1, x1, y2, line.x1, line.y1, line.x2, line.y2)){
            // console.log(line.x1, line.y1, line.x2, line.y2);
            actionX = 0;
            actionY = 0;
        }
    })
}

function intersects(x1, y1, x2, y2, xx1, yy1, xx2, yy2){
    return x1 <= xx1
        && x2 >= xx2
        && y1 <= yy1
        && y2 >= yy2;
}