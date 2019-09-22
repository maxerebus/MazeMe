const newBtn = document.getElementById("newMaze"),
    visualizeCheckBox = document.getElementById("visualize"),
    solveBtn = document.getElementById("solve");

var visualize = false;

visualizeCheckBox.addEventListener("change", function() {
    visualize = !visualize;
});

newBtn.addEventListener("click", function() {
    if (visualize) generateNewVisual();
    else generateNew();
});

solveBtn.addEventListener("click", function() {
    myMethod.setDefaultValues();
    if (visualize) solved = myMethod.solveByStep();
    else myMethod.solveFull();
});
