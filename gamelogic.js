function animate() {
  if (horizontalVel == 0 && verticalVel == 0 && !inHole && ballHit == true) {
    ballHit = false;
    if (!stageChanged) {
      strokes += 1;
      totalStrokes++;
      drawScene(); // niko
    } else {
      stageChanged = false;
    }
  }
  window.requestAnimationFrame(animate);
  if (stagesIndex < 10) {
    wallCollision();
    blockCollision();
    poolsCollision();
    sandPitCollision();
    ballHoleGravity();
    boundsCollision();
    holeCollision();
  } else {
    drawVictory();
  }
}

// on pointer down
function pointerDown(e) {
  if (ballMoving || inHole) {
    allowClick = false;
    return;
  } else {
    allowClick = true;
  }

  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  // check ballToPointerDistance and use it to set velFactor
  ballToPointerDistance = Math.hypot(pallo.xPos - mouseX, pallo.yPos - mouseY);
  if (ballToPointerDistance > 725) {
    ballToPointerDistance = 725;
  }

  velPercent = (ballToPointerDistance / 725) * 100;
  velFactor = Math.abs(ballToPointerDistance / 10000);

  if (velFactor > 0.05) {
    velFactor = 0.05;
  } else if (velFactor < 0.015) {
    velFactor = 0.015;
  }

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
  } else {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    // set linedirection for aiming line
    lineDirX = mouseX;
    lineDirY = mouseY;

    // draw line to aim ball direction
    drawAimLine(lineDirX, lineDirY);

    // check ballToPointerDistance and use it to set velFactor
    ballToPointerDistance = Math.hypot(
      pallo.xPos - mouseX,
      pallo.yPos - mouseY
    );
    if (ballToPointerDistance > 725) {
      ballToPointerDistance = 725;
    }

    velPercent = (ballToPointerDistance / 725) * 100;
    velFactor = Math.abs(ballToPointerDistance / 10000);

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
  if (stagesIndex < 10) {
    redraw();

    if (!allowClick) {
      return;
    }

    // get the coordinates on mouseUp
    mouseUpPosX = e.offsetX;
    mouseUpPosY = e.offsetY;

    // if ball isnt moving or in hole (allowClick is true) ball gets shot
    if (velPercent <= 10) {
      puttAudio.cloneNode(true).play();
    } else {
      hitAudio.cloneNode(true).play();
    }
    ballHit = true;

    // ball direction is according to mouseUpPositions and pallo centerposition
    dirX = mouseUpPosX - pallo.xPos;
    dirY = mouseUpPosY - pallo.yPos;

    // use directions and additional multiplier to set dir and vel
    horizontalVel = dirX * velFactor;
    verticalVel = dirY * velFactor;

    if (horizontalVel > 35) {
      var decreaseFactor = 35 / horizontalVel;
      horizontalVel = 35;
      verticalVel *= decreaseFactor;
    } else if (verticalVel > 35) {
      var decreaseFactor = 35 / verticalVel;
      verticalVel = 35;
      horizontalVel *= decreaseFactor;
    }

    //animation
    interval = setInterval(animateBalls, 10);
  }
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
  horizontalVel *= ballFriction;
  verticalVel *= ballFriction;

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
  } else {
    ballMoving = true;
  }

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

  ////
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
function scoreFunction() {
  holeAudio.play(); //use .play() instead .cloneNode(true).play() so there won't be multiple instances of the sound playing
  if (stagePar >= strokes) {
    cheerAudio.play(); //use .play() instead .cloneNode(true).play() so there won't be multiple instances of the sound playing
  }
  drawScore();
  score = strokes;

  nextStage();
}
function nextStage() {
  verticalVel = 0;
  horizontalVel = 0;

  //inHole = true;

  stagesIndex++;

  stageChanged = true;
  horizontalVel = 0;
  verticalVel = 0;
  strokes = 1;
  stageNumber += 1;
  lastStage = stagesIndex;
  prevPar = stagePar;
  scoreTime = Date.now() + 5000;

  setStage();
}
