
var pallo;
var interval;

function init(){
    // mouse event handling
    canvas.addEventListener('mousedown',pointerDown,false);
    canvas.addEventListener('mousemove',pointerMove,false);
    canvas.addEventListener('mouseup',pointerUp,false);

    pallo = new Ball(canvas.width*0.1, canvas.height*0.1);

    drawBackground(ctx);//niko
    animate();
}

class Ball {
    constructor(xPos, yPos) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.moveBall = moveBall;
    }
    
    draw() {
      ctx.beginPath();
      ctx.save();
      ctx.lineWidth = 0.4;
  
      ctx.fillStyle = "lightgray";
      ctx.arc(this.xPos, this.yPos, ballRad, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
}


function animate() {
    checkBounds(); // collision
    drawScene(); // niko
    
    window.requestAnimationFrame(animate);
  }
  

// on pointer down
function pointerDown(e){
    if (ballMoving){
        return;
    }
    console.log("***")
    console.log("mousedown")
    
    //get the starting coordinates on MouseDown
    dragStartPosX = e.offsetX;
    dragStartPosY = e.offsetY;

    console.log("Start X : " + dragStartPosX, " Start Y : " + dragStartPosY);

    dragging = true
}



// while moving pointer 
function pointerMove(e){
    if (ballMoving){
        return;
    }
    if (dragging == true){
        var mouseX = e.offsetX;
        var mouseY = e.offsetY;
        
        // set linedirection for aiming line
        lineDirX = mouseX;
        lineDirY = mouseY;
        // draw line to aim ball direction
        DrawLineEraser(lineDirX, lineDirY);

        console.log(mouseX + " --- " + mouseY);
    }
}

function DrawLine(mX, mY){
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pallo.xPos, pallo.yPos);
    ctx.lineTo(mX, mY);
    ctx.stroke();
    ctx.restore();
}

function DrawLineEraser(mX, mY){
    ctx.clearRect(0,0,SIZE, SIZE);
    drawBackground(ctx);//niko
    checkBounds(); // collision
    DrawLine(mX, mY);
}


// after pointer release
function pointerUp (e){
    if (ballMoving){
        return;
    }
    console.log("pointerUp");

    // get the end coordinates on mouseUp
    dragEndPosX = e.offsetX;
    dragEndPosY = e.offsetY;
    console.log("End X : " + dragEndPosX, " End Y : " + dragEndPosY);

    // check if dragLenght was too short
    if (DistanceSqr(dragStartPosX, dragStartPosY, dragEndPosX, dragEndPosY) < 1){
        dragging = false;
        return;
    }

    // ball direction is according to dragendPosition and pallo centerposition
    dirX = dragEndPosX - pallo.xPos;
    dirY = dragEndPosY - pallo.yPos;
    var mag = Math.sqrt(dirX*dirX + dirY*dirY); // I dont know 
                                                // :D

    if (dragging == true){
        dragging = false;

        // use directions and additional multiplier to set dir and vel
        horizontalVel = dirX /25;
        verticalVel = dirY /25;

        //animation
        interval = setInterval(animateBalls, 10);
    }
}



// calculates distance between mouseDown and mouseUp points
function DistanceSqr(sX, sY, eX, eY){

    console.log((sX-eX)*(sX-eX));
    console.log((sY-eY)*(sY-eY));
    console.log("dragLine lenght : " + ((sX-eX)*(sX-eX) + (sY-eY)*(sY-eY)) );

    return ((sX-eX)*(sX-eX) + (sY-eY)*(sY-eY));
}



 // moving ball
function moveBall(dirX, dirY){
    this.xPos += dirX;
    this.yPos += dirY;
}


// ball animation on pointer release
function animateBalls(){

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

    if (inHole){
        verticalVel = 0;
        horizontalVel = 0;
        ballRad = 9;

    }

    if (horizontalVel < 0.1 && horizontalVel > -0.1  
        && verticalVel < 0.1 && verticalVel > -0.1){
            clearInterval(interval);
            ballMoving = false;

            if(!inHole){
                strokes +=1;
            }
            
            console.log("interval cleared");
        }
    else{
        ballMoving = true;
    }

    pallo.moveBall(animBallX, animBallY);
    drawBackground(ctx);
    pallo.draw(ctx);

}


