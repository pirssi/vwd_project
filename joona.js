const SIZE = 1000;

var horizontalVel;
var verticalVel;
var ballYPos = 500;
var ballXPos = 500;
var ballRad = 30;
var ctx;
var dragging = false;





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
    
    //set mouseCoordinates by using eventlistener
    var mouseX = e.layerX;
    var mouseY = e.layerY;

    console.log(mouseX, mouseY);
    console.log(golfBall.xPos * 0.83, golfBall.yPos * 0.83);

    // golfball coordinates need to be adjusted beacuse of 80vmin in css file
    gbX = golfBall.xPos * 0.83;
    gbY = golfBall.yPos * 0.83;

    // if distance from ball center is closer than radius distance, allow ball hit
    if (DistanceSqr(mouseX, mouseY, gbX, gbY) < golfBall.rad * golfBall.rad){
        dragging = true;
    }
}

// calculates math
function DistanceSqr(mX, mY, bX, bY){

    console.log((mX-bX)*(mX-bX));
    console.log((mY-bY)*(mY-bY));

    return ((mX-bX)*(mX-bX) + (mY-bY)*(mY-bY));
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

    // set directions for ball movement
    var dirX = e.layerX - (golfBall.xPos * 0.83);
    var dirY = e.layerY - (golfBall.yPos * 0.83);
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


