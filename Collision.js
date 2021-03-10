
let reika;
var topBottom = false;

var bounce = 0.95;

  // the main piece of the loop
  // runs everything
function checkBounds() {
  // logic goes here

  // bottom bound / floor
  if (pallo.yPos + pallo.ballRad >= canvas.height) {
    horizontalVel *= bounce;
    verticalVel *= -bounce;
    pallo.yPos = canvas.height - pallo.ballRad;
  }
  // top bound / ceiling
  if (pallo.yPos - pallo.ballRad <= 0) {
    horizontalVel *= bounce;
    verticalVel *= -bounce;
    pallo.yPos = pallo.ballRad;
  }

  // left bound
  if (pallo.xPos - pallo.ballRad <= 0) {
    verticalVel *= bounce;
    horizontalVel *= -bounce;
    pallo.xPos = pallo.ballRad;
  }
  // right bound
  if (pallo.xPos + pallo.ballRad >= canvas.width) {
    verticalVel *= bounce;
    horizontalVel *= -bounce;
    pallo.xPos = canvas.width - pallo.ballRad;
  }


  //if pallo goes in the hole
  var dx = pallo.xPos - reika2.xPos;
  var dy = pallo.yPos - reika2.yPos;
  var dist = Math.sqrt (dx * dx + dy * dy);
  if (dist < pallo.ballRad + reika2.reikaRad)  {
    verticalVel = 0;
    horizontalVel = 0;
    score = strokes;
    inHole = true;
    drawScore();
    LoadNextStage();
  }
  else{
    inHole=false;
  }
}


// set PoolCollisions
function SetPoolsCollision(){
  
  for (let i = 0; i < poolCollisions.length; i++){

    // if ball center is inside pool, move ball back to last hitPosition
    if (((pallo.xPos-poolCollisions[i].xPos)**2 / poolCollisions[i].poolRadX**2) + ((pallo.yPos-poolCollisions[i].yPos)**2 / poolCollisions[i].poolRadY**2) <= 1){
      horizontalVel = 0;
      verticalVel = 0;
      pallo.xPos = hitPosX;
      pallo.yPos = hitPosY;
      console.log(hitPosX, hitPosY);
      
    }
  }
}

function RemovePoolsCollision(){
  for (let i = 0; i <= poolCollisions.length; i++){
    poolCollisions.pop();
  }
}

// set sandPitCollisions
function SetSandPitCollision(){
  
  for (let i = 0; i < sandPitCollisions.length; i++){

    // if ball center is inside sandPit, decrease velocity
    if (((pallo.xPos-sandPitCollisions[i].xPos)**2 / sandPitCollisions[i].sandPitRadX**2) + ((pallo.yPos-sandPitCollisions[i].yPos)**2 / sandPitCollisions[i].sandPitRadY**2) <= 1){
      horizontalVel *= 0.85;
      verticalVel *= 0.85;
    }
  }
}

// a bit buggy :D
// UPDATE: maybe fixed now :DD
// using timer to prevent ball from changing direction multiple times when hitting wall
function SetInnerRectCollision(){
  for (let i = 0; i < wallCollisions.length; i++){

    var distX = Math.abs(pallo.xPos - wallCollisions[i].xPos-wallCollisions[i].wallWidth/2);
    var distY = Math.abs(pallo.yPos - wallCollisions[i].yPos-wallCollisions[i].wallHeight/2);

    if (distX > (wallCollisions[i].wallWidth/2 + pallo.ballRad)) {
      wallCollisions[i].topBotBool = false;
      continue; 
    }
    if (distY > (wallCollisions[i].wallHeight/2 + pallo.ballRad)) {
      wallCollisions[i].topBotBool = true;
      continue; 
    }
  
    
    if (distX <= (wallCollisions[i].wallWidth)  
    && wallCollisions[i].topBotBool == false 
    && wallCollisions[i].flipped == false) {
      FlippedTimer(wallCollisions[i]);
      wallCollisions[i].flipped = true;
      console.log("topBot false");
      horizontalVel = -horizontalVel;
    } 
    if (distY <= (wallCollisions[i].wallHeight) 
    && wallCollisions[i].topBotBool == true 
    && wallCollisions[i].flipped == false) {
      FlippedTimer(wallCollisions[i]);
      wallCollisions[i].flipped = true;
      console.log("topBottom true");
      verticalVel = -verticalVel
    }
      
  }
}


// timer function for flipped bools
function FlippedTimer(f){
  setTimeout(function() {f.flipped = false;}, 120);
}


//function that loads next stage
function LoadNextStage(){

  // remove collisions from inside the canvas and ballCollisionsSet to false, so new collisions will be set
  while(wallCollisions.length){
    wallCollisions.pop();
  }
  wallCollisionsSet = false;
  poolCollisionsSet = false;

  // set ball position to start 
  pallo.xPos = canvas.width*0.1;
  pallo.yPos = canvas.height*0.1;

  // set stagesIndex to next
  stagesIndex++;
}