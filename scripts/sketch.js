var canvasWidth = 600;
var canvasHeigh = 600;
var cols, rows;
var wh = 20;
var grid = [];
var stack = new Stack();
var current;
var actionY = 0;
var actionX = 0;
var stroke = 3;
var player;

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
    for (var i = 0; i < rows; i++){
        var row = [];
        for(var j = 0; j < cols; j++){
            var cell = new Cell(i, j);
            row.push(cell);
        }
        grid.push(row);
    }
    current = grid[0][0];
    grid[0][0].walls[3] = false;
    grid[rows-1][cols-1].walls[1] = false;
    for(var i = 0; i < rows; i++){
        while(!(grid[i].every( (cell) => cell.visited))){
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
    }

    150, 0, 150, 200
    var color = {r:150, g: 0, b: 150, a:200 };
    player = new Player(wh, color);

    redraw()
}
  
function draw() {
    background(55);
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            grid[i][j].show();
        }
    }

    actionY = 0;
    actionX = 0;

    if(keyIsDown(UP_ARROW)){
        player.moveY("up");
    }
    if(keyIsDown(RIGHT_ARROW)){
        player.moveX("right");
    }
    if(keyIsDown(DOWN_ARROW)){
        player.moveY("down");
    }
    if(keyIsDown(LEFT_ARROW)){
        player.moveX("left");
    }

    player.checkPlayerPos();
    player.update();

    fill(150, 0, 150, 200);
    rect(player.position.x1, player.position.y1, player.size, player.size);
}

function removeWalls(current, next){
    var x = current.col - next.col;
    if(x === 1){
        current.walls[3] = false;
        next.walls[1] = false;
    }
    else if(x === -1){
        current.walls[1] = false;
        next.walls[3] = false;
    }
    
    var y = current.row - next.row;
    if(y === 1){
        current.walls[0] = false;
        next.walls[2] = false;
    }
    else if(y === -1){
        current.walls[2] = false;
        next.walls[0] = false;
    }
}

// function roundToTwoDig(num) {    
//     return +(Math.round(num + "e+1")  + "e-1");
// }