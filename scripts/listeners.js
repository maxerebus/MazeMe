const newBtn = document.getElementById("newMaze"),
    visualizeCheckBox = document.getElementById("visualize"),
    solveBtn = document.getElementById("solve");

var visualizeMaze = false;

visualizeCheckBox.addEventListener("change", function() {
    visualizeMaze = !visualizeMaze;
});

newBtn.addEventListener("click", function() {
    if (visualizeMaze) generateNewVisual();
    else generateNew();
});

solveBtn.addEventListener("click", function() {
    myMethod.solveFull();
});
