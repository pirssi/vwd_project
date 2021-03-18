// the main piece of the loop
// runs everything
function boundsCollision() {
  // logic goes here

  // bottom bound / floor
  if (pallo.yPos + pallo.ballRad >= canvas.height) {
    if (cooldownTime < Date.now()) {
      bounceAudio.cloneNode(true).play();
      cooldownTime = Date.now() + 20;
      horizontalVel *= bounce;
      verticalVel *= -bounce;
      pallo.yPos = canvas.height - pallo.ballRad;
    }
  }

  // top bound / ceiling
  if (pallo.yPos - pallo.ballRad <= 0) {
    if (cooldownTime < Date.now()) {
      bounceAudio.cloneNode(true).play();
      cooldownTime = Date.now() + 20;
      horizontalVel *= bounce;
      verticalVel *= -bounce;
      pallo.yPos = pallo.ballRad;
    }
  }

  // left bound
  if (pallo.xPos - pallo.ballRad <= 0) {
    if (cooldownTime < Date.now()) {
      bounceAudio.cloneNode(true).play();
      cooldownTime = Date.now() + 20;
      verticalVel *= bounce;
      horizontalVel *= -bounce;
      pallo.xPos = pallo.ballRad;
    }
  }

  // right bound
  if (pallo.xPos + pallo.ballRad >= canvas.width) {
    if (cooldownTime < Date.now()) {
      bounceAudio.cloneNode(true).play();
      cooldownTime = Date.now() + 20;
      verticalVel *= bounce;
      horizontalVel *= -bounce;
      pallo.xPos = canvas.width - pallo.ballRad;
    }
  }
}
function holeCollision() {
  //if pallo goes in the hole
  var dx = pallo.xPos - reika2.xPos;
  var dy = pallo.yPos - reika2.yPos;
  var dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < pallo.ballRad + reika2.reikaRad) {
    if (cooldownTime < Date.now()) {
      inHole = true;
      scoreFunction();
      cooldownTime = Date.now() + 20;
    }
  } else {
    inHole = false;
  }
}

// set pools
function poolsCollision() {
  for (let i = 0; i < pools.length; i++) {
    // if ball center is inside pool, move ball back to last hitPosition
    if (
      (pallo.xPos - pools[i].xPos) ** 2 / pools[i].poolRadX ** 2 +
        (pallo.yPos - pools[i].yPos) ** 2 / pools[i].poolRadY ** 2 <=
      1
    ) {
      waterAudio.cloneNode(true).play();
      horizontalVel = 0;
      verticalVel = 0;
      pallo.xPos = hitPosX;
      pallo.yPos = hitPosY;
      //
    }
  }
}

// set sandPits
function sandPitCollision() {
  for (let i = 0; i < sandPits.length; i++) {
    // if ball center is inside sandPit, decrease velocity
    if (
      (pallo.xPos - sandPits[i].xPos) ** 2 / sandPits[i].sandPitRadX ** 2 +
        (pallo.yPos - sandPits[i].yPos) ** 2 / sandPits[i].sandPitRadY ** 2 <=
      1
    ) {
      horizontalVel *= 0.9;
      verticalVel *= 0.9;
    }
  }
}
// using timer to prevent ball from changing direction multiple times when hitting wall
function wallCollision() {
  for (let i = 0; i < walls.length; i++) {
    var distX = Math.abs(pallo.xPos - walls[i].xPos - walls[i].wallWidth / 2);
    var distY = Math.abs(pallo.yPos - walls[i].yPos - walls[i].wallHeight / 2);

    if (distX > walls[i].wallWidth / 2 + pallo.ballRad) {
      walls[i].topBotBool = false;
      continue;
    }
    if (distY > walls[i].wallHeight / 2 + pallo.ballRad) {
      walls[i].topBotBool = true;
      continue;
    }

    if (
      distX <= walls[i].wallWidth &&
      walls[i].topBotBool == false &&
      walls[i].flipped == false
    ) {
      bounceAudio.cloneNode(true).play();
      flippedTimer(walls[i]);
      walls[i].flipped = true;
      horizontalVel *= -bounce;
    }
    if (
      distY <= walls[i].wallHeight &&
      walls[i].topBotBool == true &&
      walls[i].flipped == false
    ) {
      bounceAudio.cloneNode(true).play();
      flippedTimer(walls[i]);
      walls[i].flipped = true;
      verticalVel *= -bounce;
    }
  }
}
function blockCollision() {
  for (let i = 0; i < blocks.length; i++) {
    var distX = Math.abs(pallo.xPos - blocks[i].xPos - blocks[i].wallWidth / 2);
    var distY = Math.abs(
      pallo.yPos - blocks[i].yPos - blocks[i].wallHeight / 2
    );

    if (distX > blocks[i].wallWidth / 2 + pallo.ballRad) {
      blocks[i].topBotBool = false;
      continue;
    }
    if (distY > blocks[i].wallHeight / 2 + pallo.ballRad) {
      blocks[i].topBotBool = true;
      continue;
    }

    if (
      distX <= blocks[i].wallWidth &&
      blocks[i].topBotBool == false &&
      blocks[i].flipped == false
    ) {
      bounceAudio.cloneNode(true).play();
      flippedTimer(blocks[i]);
      blocks[i].flipped = true;
      horizontalVel = -horizontalVel;
    }
    if (
      distY <= blocks[i].wallHeight &&
      blocks[i].topBotBool == true &&
      blocks[i].flipped == false
    ) {
      bounceAudio.cloneNode(true).play();
      flippedTimer(blocks[i]);
      blocks[i].flipped = true;
      verticalVel = -verticalVel;
    }
  }
}

// timer function for flipped bools
function flippedTimer(f) {
  setTimeout(function () {
    f.flipped = false;
  }, 30);
}
