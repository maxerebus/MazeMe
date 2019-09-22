var canvasWidth = 600,
    canvasHeight = 600;
var cols, rows;
var wh;
var grid = [];
var stack = new Stack();
var current;
var actionY = 0;
var actionX = 0;
var stroke = 3;
var player;
var visualize = false;
var visualized = true;
var isDone = true;

function preload() {
    canvasWidth = floor((Math.floor(windowWidth / 10) / 10) * 90);
    canvasHeight = floor((Math.floor(windowHeight / 10) / 10) * 90);
    var different = true;
    while (
        gcd(canvasWidth, canvasHeight) < 30 ||
        gcd(canvasWidth, canvasHeight) > 50
    ) {
        different ? canvasHeight-- : canvasWidth--;
        different = !different;
        if (canvasWidth < 100 || canvasHeight < 100) {
            var onePw = Math.floor(windowWidth / 100);
            var onePh = Math.floor(windowHeight / 100);
            canvasWidth = floor(onePw * 90);
            canvasHeight = floor(onePh * 90);
            wh = gcd(onePw * 15, onePh * 15);
            break;
        }
    }
}

function setup() {
    wh = wh ? wh : gcd(canvasWidth, canvasHeight);
    cnv = createCanvas(canvasWidth, canvasHeight);
    console.log(canvasWidth, canvasHeight);
    console.log(wh);
    strokeWeight(4);
    cols = floor(width / wh);
    rows = floor(height / wh);
    init();
    generateNew();
}

function generateNew() {
    visualize = false;
    visualized = true;
    init();
    for (var i = 0; i < rows; i++) {
        while (!grid[i].every(cell => cell.visited)) {
            mazeGeneration();
        }
    }
    redraw();
    playerInit();
    current = grid[0][0];
}

function generateNewVisual() {
    init();
    visualize = true;
    visualized = false;
    isDone = false;
}

function draw() {
    background(55);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
    if (visualize && !visualized) {
        if (isDone && current.row === 0 && current.col === 0) {
            visualized = true;
            playerInit();
        } else isDone = mazeGeneration();
    } else if (visualized) {
        actionY = 0;
        actionX = 0;

        if (keyIsDown(UP_ARROW)) {
            player.moveY("up");
        }
        if (keyIsDown(RIGHT_ARROW)) {
            player.moveX("right");
        }
        if (keyIsDown(DOWN_ARROW)) {
            player.moveY("down");
        }
        if (keyIsDown(LEFT_ARROW)) {
            player.moveX("left");
        }

        player.checkPlayerPos();
        player.update();

        noStroke();
        fill(250, 0, 150, 200);
        rect(player.position.x1, player.position.y1, player.size, player.size);
    }
}

function removeWalls(current, next) {
    var x = current.col - next.col;
    if (x === 1) {
        current.walls[3] = false;
        next.walls[1] = false;
    } else if (x === -1) {
        current.walls[1] = false;
        next.walls[3] = false;
    }

    var y = current.row - next.row;
    if (y === 1) {
        current.walls[0] = false;
        next.walls[2] = false;
    } else if (y === -1) {
        current.walls[2] = false;
        next.walls[0] = false;
    }
}

function init() {
    stack.clear();
    grid = [];

    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            var cell = new Cell(i, j);
            row.push(cell);
        }
        grid.push(row);
    }

    current = grid[0][0];
    grid[0][0].walls[3] = false;
    grid[rows - 1][cols - 1].walls[1] = false;
}

function mazeGeneration() {
    current.visited = true;
    current.highlight();
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
    } else if (stack.length() > 0) {
        current = stack.pop();
    }

    isDone = true;
    for (var i = 0; i < rows; i++)
        if (!grid[i].every(cell => cell.visited)) isDone = false;
    return isDone;
}

function playerInit() {
    var color = { r: 150, g: 0, b: 150, a: 200 };
    player = new Player(wh, color);
}

function gcd(x, y) {
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}
