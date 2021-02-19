
let reika;

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
 /*
  // start our code once the page has loaded
  document.addEventListener('DOMContentLoaded', drawScene)
  */
  


