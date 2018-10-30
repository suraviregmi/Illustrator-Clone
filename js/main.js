let svgCanvas = document.getElementById("SVG");
let leftCol = document.getElementById("leftCol");
let svgContainer = document.getElementById("svgContainer");
let //to get current X and Y position
    cursor = {
        x: 0,
        y: 0
    },
    //to get previous x and y position
    prev = {
        x: 0,
        y: 0
    },
    // to get the chanage in position
    del = {
        x: 0,
        y: 0
    },
    stop,
    transform,
    moveCp = false,
    click = true,
    defaultFill = "transparent";

//monitor cursor position throughout the page
document.onmousemove = e => {
    del.x = e.pageX - cursor.x - svgCanvas.getBoundingClientRect().left;
    del.y = e.pageY - cursor.y - svgCanvas.getBoundingClientRect().top;
    cursor.x += del.x;
    cursor.y += del.y;
};

window.onload = () => {
    //console.log(window.innerHeight);
    let canvasHeight = window.innerHeight;
    let drawingBoard = document.getElementById("drawingBoard");
    // console.log(drawingBoard);
    //let widthofContainer = drawingBoard.style.width;
    drawingBoard.style.height = canvasHeight * 0.84 + "px";
    // console.log(widthofContainer);

    let painter = new MainPainter();
};