const newBtn = document.getElementById("newMaze"),
visualizeCheckBox = document.getElementById("visualize");

var visualizeMaze = false;


visualizeCheckBox.addEventListener("change", function(){
    visualizeMaze = !visualizeMaze;
});

newBtn.addEventListener("click", function(){
    if(visualizeMaze)
        generateNewVisual()
    else
        generateNew();
});