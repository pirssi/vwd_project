

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
    dragStartPosX = e.layerX+500;
    dragStartPosY = e.layerY+500;

    console.log("Start X : " + dragStartPosX, " Start Y : " + dragStartPosY);


    dragging = true
}



// while moving pointer 
function pointerMove(e){
    if (dragging == true){
        var mouseX = e.layerX+500;
        var mouseY = e.layerY+500;
        
        // set linedirection for aiming line
        lineDirX = mouseX;
        lineDirY = mouseY;
        // draw line to aim ball direction
        DrawLineEraser(lineDirX, lineDirY);

        console.log(mouseX + " --- " + mouseY);
    }
}

function DrawLine(mX, mY){
    ctx.beginPath();
    ctx.moveTo(golfBall.xPos, golfBall.yPos);
    ctx.lineTo(mX, mY);
    ctx.stroke();
}

function DrawLineEraser(mX, mY){
    ctx.clearRect(0,0,SIZE, SIZE);
    drawBackground(ctx);
    golfBall.draw();
    DrawLine(mX, mY);
}


// after pointer release
function pointerUp (e){
    console.log("pointerUp");

    // get the end coordinates on mouseUp
    dragEndPosX = e.layerX+500;
    dragEndPosY = e.layerY+500;
    console.log("End X : " + dragEndPosX, " End Y : " + dragEndPosY);

    // check if dragLenght was too short
    if (DistanceSqr(dragStartPosX, dragStartPosY, dragEndPosX, dragEndPosY) < 25){
        dragging = false;
        return;
    }

    // ball direction is according to dragendPosition and golfBall centerposition
    dirX = dragEndPosX - golfBall.xPos;
    dirY = dragEndPosY - golfBall.yPos;
    var mag = Math.sqrt(dirX*dirX + dirY*dirY); // I dont know 
                                                // :D

    if (dragging == true){
        dragging = false;

        // use directions and additional multiplier to set dir and vel
        horizontalVel = dirX /25;
        verticalVel = dirY /25;

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

    ctx.fillStyle = "White";
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
    ctx.fillStyle = "darkGreen";
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

    //ball friction and stopping
    if(horizontalVel>0 ||horizontalVel<0)   
    {
        horizontalVel=horizontalVel/ballFriction;
        if(horizontalVel<0.01 && horizontalVel>0)
        horizontalVel=0;
        
        else if(horizontalVel>-0.01 && horizontalVel<0)
        horizontalVel=0;
    }

    if(verticalVel>0 || verticalVel<0)
    {
        verticalVel=verticalVel/ballFriction;
        if(verticalVel<0.01 && verticalVel>0)
        verticalVel=0;

        else if(verticalVel>-0.01 && verticalVel<0)
        verticalVel=0;
    }

    golfBall.moveBall(animBallX, animBallY);
    drawBackground(ctx);
    golfBall.draw();
}


