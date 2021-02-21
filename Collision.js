
let reika;
var topBottom = false;

var bounce = 0.95;

function score() {
  ctx.font = "20px Georgia";
  ctx.fillText("Score!", canvas.width * 0.5, canvas.height * 0.5);
}

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
    inHole = true;
    drawScore();
    LoadNextStage();
  }
  else{
    if(inHole){
      strokes +=1;
      
    }
    inHole=false;
    drawStrokes();
  }
    
    
    
  // reset insignificant amounts to 0
  if (horizontalVel < 0.01 && horizontalVel > -0.01) {
    horizontalVel = 0
  }
  if (verticalVel < 0.01 && verticalVel > -0.01) {
    verticalVel = 0
  }




}

// a bit buggy :D
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
  
    if (distX <= (wallCollisions[i].wallWidth)  && wallCollisions[i].topBotBool == false) {
      console.log("topBot false");
      horizontalVel = -horizontalVel;
    } 
    if (distY <= (wallCollisions[i].wallHeight) && wallCollisions[i].topBotBool == true) {
      console.log(topBottom = true);
      verticalVel = -verticalVel
    }
    
  }
}


//function that loads next stage
function LoadNextStage(){

  // remove collisions from inside the canvas and ballCollisionsSet to false, so new collisions will be set
  while(wallCollisions.length){
    wallCollisions.pop();
  }
  wallCollisionsSet = false;

  // set ball position to start 
  pallo.xPos = canvas.width*0.1;
  pallo.yPos = canvas.height*0.1;

  // set stagesIndex to next
  stagesIndex++;

  // draw background and new scene according to stagesIndex settings in niko.js
  drawBackground();
  drawScene();
}