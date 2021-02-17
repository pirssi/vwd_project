

function init(){

    let canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    // mouse event handling
    canvas.addEventListener('mousedown',pointerDown,false);
    canvas.addEventListener('mousemove',pointerMove,false);
    canvas.addEventListener('mouseup',pointerUp,false);

    canvas.width = SIZE;
    canvas.height = SIZE;

    drawBackground(ctx);
    golfBall.draw();    
}



// on pointer down
function pointerDown(e){
    console.log("***")
    console.log("mousedown")
    
    //get the starting coordinates on MouseDown
    dragStartPosX = e.layerX;
    dragStartPosY = e.layerY;

    console.log("Start X : " + dragStartPosX, " Start Y : " + dragStartPosY);

    // golfball coordinates need to be adjusted beacuse of 80vmin in css file
    gbX = golfBall.xPos * 0.83;
    gbY = golfBall.yPos * 0.83;

    dragging = true
}



// while moving pointer 
function pointerMove(e){
    if (dragging == true){
        var mouseX = e.layerX;
        var mouseY = e.layerY;
        
        console.log(mouseX + " --- " + mouseY);
    }
}



// after pointer release
function pointerUp (e){
    console.log("pointerUp");

    // get the end coordinates on mouseUp
    dragEndPosX = e.layerX;
    dragEndPosY = e.layerY;
    console.log("End X : " + dragEndPosX, " End Y : " + dragEndPosY);

    // check if dragLenght was too short
    if (DistanceSqr(dragStartPosX, dragStartPosY, dragEndPosX, dragEndPosY) < 2500){
        dragging = false;
        return;
    }

    // set directions for ball movement
    dirX = dragEndPosX - dragStartPosX;
    dirY = dragEndPosY - dragStartPosY;
    var mag = Math.sqrt(dirX*dirX + dirY*dirY); // I dont know


    if (dragging == true){
        dragging = false;

        // use directions and additional multiplier to set dir and vel
        horizontalVel = (-dirX / mag) * 10;
        verticalVel = (-dirY / mag) * 10;

        //animation
        setInterval(animateBalls, 10);
    }
}



// calculates distance between mouseDown and mouseUp points
function DistanceSqr(sX, sY, eX, eY){

    console.log((sX-eX)*(sX-eX));
    console.log((sY-eY)*(sY-eY));
    console.log("dragLine lenght : " + ((sX-eX)*(sX-eX) + (sY-eY)*(sY-eY)) );

    return ((sX-eX)*(sX-eX) + (sY-eY)*(sY-eY));
}



//function for creating ball variable
function Ball(xPos, yPos, rad, fStyle){
    this.xPos = xPos;
    this.yPos = yPos;
    this.rad = rad;
    this.draw = drawball;
    this.moveBall = moveBall;
    this.fillStyle = fStyle;
}



var golfBall = new Ball(ballYPos,ballXPos,ballRad,"darkred");

// function for drawing ball
function drawball(){

    ctx.fillStyle = "DarkRed";
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.rad, 0, Math.PI*2, true);
    ctx.fill();
    ctx.restore();
    console.log("ball was drawn");
}



 // moving ball
function moveBall(dirX, dirY){
    this.xPos += dirX;
    this.yPos += dirY;
}



// background
function drawBackground(ctx){
    ctx.beginPath();
    ctx.fillStyle = "LightGrey";
    ctx.rect(0,0,SIZE,SIZE);
    ctx.fill();
    ctx.closePath();
}



// ball animation on pointer release
function animateBalls(){

    ctx.clearRect(0,0,SIZE,SIZE);

    // set new positions for ball
    var animBallX = horizontalVel;
    var animBallY = verticalVel;

    
    golfBall.moveBall(animBallX, animBallY);
    drawBackground(ctx);
    golfBall.draw();
}


