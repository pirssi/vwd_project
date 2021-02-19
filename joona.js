
var pallo;
var interval;
var ballsAreTouching = false;
var holeGravityX = 0;
var holeGravityY = 0;

var suctionX = 0;
var suctionY = 0;

var velFactor = 0;

function init(){
    // mouse event handling
    canvas.addEventListener('mousedown',pointerDown,false);
    canvas.addEventListener('mousemove',pointerMove,false);
    canvas.addEventListener('mouseup',pointerUp,false);

    pallo = new Ball(canvas.width*0.1, canvas.height*0.1, 10, "white");

    drawBackground(ctx);//niko
    animate();
}

class Ball {
    constructor(xPos, yPos, ballRad, ballColor) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.ballRad = ballRad;
      this.ballColor = ballColor;
      this.moveBall = moveBall;
    }
    
    draw() {
      ctx.beginPath();
      ctx.save();
      ctx.lineWidth = 0.4;
  
      ctx.fillStyle = this.ballColor;
      ctx.arc(this.xPos, this.yPos, pallo.ballRad, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
}


function animate() {
    ballHoleGravity();
    checkBounds(); // collision
    drawScene(); // niko
    HitForceUI();
    window.requestAnimationFrame(animate);
  }
  

// on pointer down
function pointerDown(e){

    console.log(pallo.xPos, pallo.yPos);
    console.log(reika.xPos, reika.yPos);

    if (ballMoving || inHole){
        return;
    }
    console.log("***")
    console.log("mousedown")
    
    //get the starting coordinates on MouseDown
    dragStartPosX = e.offsetX;
    dragStartPosY = e.offsetY;

    dragging = true
}



// while moving pointer 
function pointerMove(e){
    if (ballMoving || inHole){
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

        // check dragDistance and use it to set velFactor
        dragDistance = Math.hypot(pallo.xPos-mouseX, pallo.yPos-mouseY);
        velFactor = Math.abs(dragDistance/10000);
        if (velFactor > 0.05){
            velFactor = 0.05;
        }
        else if (velFactor < 0.015){
            velFactor = 0.015;
        }
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
    if (ballMoving || inHole){
        return;
    }
    console.log("pointerUp");

    // get the end coordinates on mouseUp
    dragEndPosX = e.offsetX;
    dragEndPosY = e.offsetY;

    // check if dragLenght was too short
    if (DistanceSqr(dragStartPosX, dragStartPosY, dragEndPosX, dragEndPosY) < 1){
        dragging = false;
        return;
    }

    // ball direction is according to dragEndPosition and pallo centerposition
    dirX = dragEndPosX - pallo.xPos;
    dirY = dragEndPosY - pallo.yPos;



    if (dragging == true){
        dragging = false;

        

        // use directions and additional multiplier to set dir and vel
        horizontalVel = dirX*velFactor;
        verticalVel = dirY*velFactor;

        //animation
        interval = setInterval(animateBalls, 10);
    }
}



// calculates distance between mouseDown and mouseUp points
function DistanceSqr(sX, sY, eX, eY){
    return ((sX-eX)*(sX-eX) + (sY-eY)*(sY-eY));
}



 // moving ball
function moveBall(dirX, dirY){
    this.xPos += dirX;
    this.yPos += dirY;

    /*
    if (ballsAreTouching){
        this.xPos += dirX * holeGravityX;
        this.yPos += dirY * holeGravityY; 
    }
    */
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


    // check is moving
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


    // if balls are touching change ball color to red
    if (ballsAreTouching){
        pallo.ballColor = "red";
    }
    else{
        pallo.ballColor = "white";
    }

    pallo.moveBall(animBallX, animBallY);
    drawBackground(ctx);
    pallo.draw(ctx);

}


// check if balls are touching 
function ballHoleGravity(){

    // distance between balls Xpos
    var sqrDistance = (pallo.xPos-reika.xPos)*(pallo.xPos-reika.xPos) + (pallo.yPos-reika.yPos)*(pallo.yPos-reika.yPos);

    // balls radius combined
    var ballHoleRadDist = (pallo.ballRad + reika.reikaRad) * (pallo.ballRad + reika.reikaRad);

    //console.log(ballHoleRadDist); 
    if (sqrDistance < ballHoleRadDist){

        ballsAreTouching = true;

        if (ballXPos != reika.xPos && ballYPos != reika.yPos){
            suctionX = (reika.xPos - pallo.xPos);
            suctionY = (reika.yPos - pallo.yPos);
        }

        horizontalVel += suctionX*velFactor;
        verticalVel += suctionY*velFactor;
    }
    else{
        ballsAreTouching = false;
    }
}


// creates UI for current hit force in the left upper corner
function HitForceUI(){

    var velFactorPercent = Math.round(((velFactor-0.015)/0.035)*100);

    // fill forceMeter
    if(velFactor <= 0.015){
        ctx.font = "20px Georgia";
        ctx.fillStyle = "White";
        ctx.fillText("Putt", canvas.width * 0.035, canvas.height * 0.126);

        ctx.beginPath();
        ctx.fillStyle = "lightYellow";
        ctx.moveTo(11,129);
        ctx.lineTo(29,129);
        ctx.lineTo(29,109);
        ctx.lineTo(11,109);
        ctx.lineTo(11,129);
        ctx.fill();
    }
    else if (velFactor > 0.015){
        ctx.beginPath();
        ctx.fillStyle = "lightYellow";
        ctx.moveTo(11,129);
        ctx.lineTo(29,129);
        ctx.lineTo(29,109);
        ctx.lineTo(11,109);
        ctx.lineTo(11,129);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.moveTo(11,109);
        ctx.lineTo(29,109);
        ctx.lineTo(29,111-velFactorPercent);
        ctx.lineTo(11,111-velFactorPercent);
        ctx.lineTo(11,109);
        ctx.fill();
    }
}


