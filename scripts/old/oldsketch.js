// var cols, rows;
// var wh = 20;
// var grid = [];

// var stack = new Stack();

// var current;

// function setup() {
//     createCanvas(400, 400);
//     cols = floor(width/wh);
//     rows = floor(height/wh);

//     for (var row = 0; row < rows; row++){
//         for(var col = 0; col < cols; col++){
//             var cell = new Cell(col, row);
//             grid.push(cell);
//         }
//     }

//     current = grid[0];
//     grid[0].walls[3] = false;
//     grid[wh*wh-1].walls[1] = false;
//     // frameRate(5);

//   }
  
// function draw() {
//     background(51);
//     for(var i = 0; i < grid.length; i++){
//         grid[i].show();
//     }

//     current.visited = true;
//     current.highlight();
//     var next = current.checkNeighbors();
//     if(next){
//         next.visited = true;
//         stack.push(current);
//         removeWalls(current, next);
//         current = next;
//     }
//     else if(stack.length() > 0) {
//         current = stack.pop();
//     }
// }

// function index(row, col){
//     if(row < 0 || col < 0 || row > cols-1 || col > rows-1){
//         return false;
//     }
//     return row + col * cols;
// }

// function removeWalls(current, next){
//     var x = current.row - next.row;
//     if(x === 1){
//         current.walls[3] = false;
//         next.walls[1] = false;
//     }
//     else if(x === -1){
//         current.walls[1] = false;
//         next.walls[3] = false;
//     }
    
//     var y = current.col - next.col;
//     if(y === 1){
//         current.walls[0] = false;
//         next.walls[2] = false;
//     }
//     else if(y === -1){
//         current.walls[2] = false;
//         next.walls[0] = false;
//     }
// }