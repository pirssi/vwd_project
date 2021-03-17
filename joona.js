var interval;
var ballsAreTouching = false;
var holeGravityX = 0;
var holeGravityY = 0;

var suctionX = 0;
var suctionY = 0;

var velFactor = 0;
var velPercent = 0;

function init() {
  // mouse event handling
  canvas.addEventListener("mousedown", pointerDown, false);
  canvas.addEventListener("mousemove", pointerMove, false);
  canvas.addEventListener("mouseup", pointerUp, false);

  drawScene(); // niko
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
  if (horizontalVel == 0 && verticalVel == 0 && !inHole && ballHit == true) {
    ballHit = false;
    if (!stageChanged) {
      strokes += 1;
      drawScene(); // niko
    } else {
      stageChanged = false;
    }
  }
  wallCollision();
  poolsCollision();
  sandPitCollision();
  ballHoleGravity();
  boundsCollision();
  holeCollision();
  window.requestAnimationFrame(animate);
}

// on pointer down
function pointerDown(e) {
  if (ballMoving || inHole) {
    allowClick = false;
    return;
  } else {
    allowClick = true;
  }

  //get the starting coordinates on MouseDown
  dragStartPosX = e.offsetX;
  dragStartPosY = e.offsetY;

  dragging = true;

  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  // set linedirection for aiming line
  lineDirX = mouseX;
  lineDirY = mouseY;

  // draw line to aim ball direction
  drawAimLine(lineDirX, lineDirY);
}

// while moving pointer
function pointerMove(e) {
  if (ballMoving || inHole) {
    return;
  }
  if (dragging == true) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    // set linedirection for aiming line
    lineDirX = mouseX;
    lineDirY = mouseY;

    // draw line to aim ball direction
    drawAimLine(lineDirX, lineDirY);

    // check dragDistance and use it to set velFactor
    dragDistance = Math.hypot(pallo.xPos - mouseX, pallo.yPos - mouseY);
    if (dragDistance > 725) {
      dragDistance = 725;
    }

    velPercent = (dragDistance / 725) * 100;
    velFactor = Math.abs(dragDistance / 10000);

    if (velFactor > 0.05) {
      velFactor = 0.05;
    } else if (velFactor < 0.015) {
      velFactor = 0.015;
    }
  }
}

function drawAimLine(mX, mY) {
  redraw();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pallo.xPos, pallo.yPos);
  ctx.lineTo(mX, mY); //mX-(pallo.xPos-mX), mY-(pallo.yPos-mY)
  ctx.stroke();
  ctx.restore();
}
function redraw() {
  ctx.clearRect(0, 0, SIZE, SIZE);
  drawScene(); // niko
}

// after pointer release
function pointerUp(e) {
  redraw();

  if (ballMoving || inHole) {
    return;
  }

  // get the end coordinates on mouseUp
  dragEndPosX = e.offsetX;
  dragEndPosY = e.offsetY;

  // check if dragLenght was too short
  if (
    checkDragLength(dragStartPosX, dragStartPosY, dragEndPosX, dragEndPosY) < 1
  ) {
    dragging = false;
    return;
  }
  // if dragLength was long enough and ball isnt moving or in hole (allowClick is true) ball gets shot
  else if (allowClick) {
    if (velPercent <= 10) {
      puttAudio.cloneNode(true).play();
    } else {
      hitAudio.cloneNode(true).play();
    }
    ballHit = true;
  }

  // ball direction is according to dragEndPosition and pallo centerposition
  dirX = dragEndPosX - pallo.xPos;
  dirY = dragEndPosY - pallo.yPos;

  if (dragging == true) {
    dragging = false;

    // use directions and additional multiplier to set dir and vel
    horizontalVel = dirX * velFactor;
    verticalVel = dirY * velFactor;

    if (horizontalVel > 35) {
      var decreaseFactor = 35 / horizontalVel;
      horizontalVel = 35;
      verticalVel *= decreaseFactor;
      console.log(decreaseFactor);
    } else if (verticalVel > 35) {
      var decreaseFactor = 35 / verticalVel;
      verticalVel = 35;
      horizontalVel *= decreaseFactor;
      console.log(decreaseFactor);
    }

    console.log(velPercent);
    console.log(Math.max(verticalVel, horizontalVel));

    //animation
    interval = setInterval(animateBalls, 10);
  }
}

// calculates distance between mouseDown and mouseUp points
function checkDragLength(sX, sY, eX, eY) {
  return (sX - eX) * (sX - eX) + (sY - eY) * (sY - eY);
}

// moving ball
function moveBall(dirX, dirY) {
  this.xPos += dirX;
  this.yPos += dirY;
}

// ball animation on pointer release
function animateBalls() {
  // set new positions for ball
  var animBallX = horizontalVel;
  var animBallY = verticalVel;

  //ball friction
  horizontalVel = horizontalVel / ballFriction;
  verticalVel = verticalVel / ballFriction;

  //ball stopping AND hitPosition set
  if (
    ((horizontalVel > -0.1 && horizontalVel < 0) ||
      horizontalVel == 0 ||
      (horizontalVel < 0.1 && horizontalVel > 0)) &&
    ((verticalVel < 0.1 && verticalVel > 0) ||
      (verticalVel > -0.1 && verticalVel < 0) ||
      verticalVel == 0)
  ) {
    horizontalVel = 0;
    verticalVel = 0;

    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;
    console.log("Hitpositions set. X : ", hitPosX, "|| Y : ", hitPosY);
  }

  // check is moving
  if (
    horizontalVel < 0.1 &&
    horizontalVel > -0.1 &&
    verticalVel < 0.1 &&
    verticalVel > -0.1
  ) {
    clearInterval(interval);
    ballMoving = false;

    console.log("interval cleared");
  } else {
    ballMoving = true;
  }

  // if balls are touching change ball color to red
  //   if (ballsAreTouching) {
  //     pallo.ballColor = "red";
  //   } else {
  //     pallo.ballColor = "white";
  //   }

  pallo.moveBall(animBallX, animBallY);
  drawScene(); // niko
  pallo.draw(ctx);
}

// check if balls are touching
function ballHoleGravity() {
  // distance between balls Xpos
  var sqrDistance =
    (pallo.xPos - reika.xPos) * (pallo.xPos - reika.xPos) +
    (pallo.yPos - reika.yPos) * (pallo.yPos - reika.yPos);

  // balls radius combined
  var ballHoleRadDist =
    (pallo.ballRad + reika.reikaRad) * (pallo.ballRad + reika.reikaRad);

  //console.log(ballHoleRadDist);
  if (sqrDistance < ballHoleRadDist) {
    ballsAreTouching = true;

    if (ballXPos != reika.xPos && ballYPos != reika.yPos) {
      suctionX = reika.xPos - pallo.xPos;
      suctionY = reika.yPos - pallo.yPos;
    }

    horizontalVel += suctionX * velFactor;
    verticalVel += suctionY * velFactor;
  } else {
    ballsAreTouching = false;
  }
}

// creates UI for current hit force in the left upper corner
function HitForceUI() {
  // fill forceMeter
  if (velPercent <= 10) {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "White";
    ctx.fillText("Putt", canvas.width * 0.035, canvas.height * 0.126);

    ctx.beginPath();
    ctx.fillStyle = "lightYellow";
    ctx.moveTo(11, 129);
    ctx.lineTo(29, 129);
    ctx.lineTo(29, 109);
    ctx.lineTo(11, 109);
    ctx.lineTo(11, 129);
    ctx.fill();
  } else if (velPercent > 10) {
    ctx.beginPath();
    ctx.fillStyle = "lightYellow";
    ctx.moveTo(11, 129);
    ctx.lineTo(29, 129);
    ctx.lineTo(29, 109);
    ctx.lineTo(11, 109);
    ctx.lineTo(11, 129);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(11, 109);
    ctx.lineTo(29, 109);
    ctx.lineTo(29, 111 - velPercent);
    ctx.lineTo(11, 111 - velPercent);
    ctx.lineTo(11, 109);
    ctx.fill();
  }
}
