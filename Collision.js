
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
    if (pallo.yPos + ballRad >= canvas.height) {
      horizontalVel *= bounce;
      verticalVel *= -bounce;
      pallo.yPos = canvas.height - ballRad;
    }
    // top bound / ceiling
    if (pallo.yPos - ballRad <= 0) {
      horizontalVel *= bounce;
      verticalVel *= -bounce;
      pallo.yPos = ballRad;
    }

    // left bound
    if (pallo.xPos - ballRad <= 0) {
      verticalVel *= bounce;
      horizontalVel *= -bounce;
      pallo.xPos = ballRad;
    }
    // right bound
    if (pallo.xPos + ballRad >= canvas.width) {
      verticalVel *= bounce;
      horizontalVel *= -bounce;
      pallo.xPos = canvas.width - ballRad;
    }


    //if pallo goes in the hole
    var dx = pallo.xPos - reika2.xPos;
    var dy = pallo.yPos - reika2.yPos;
    var dist = Math.sqrt (dx * dx + dy * dy);
    if (dist < ballRad + reika2.reikaRad)  {

      ctx.font = "54px Georgia";
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0.5", "red");
      gradient.addColorStop("0.55", "orange");
      gradient.addColorStop("0.62", "yellow");
      gradient.addColorStop("0.68", "lightgreen");
      gradient.addColorStop("0.72", "blue");
      gradient.addColorStop("0.8", "magenta");
      ctx.fillStyle = gradient;

      ctx.fillText("Hole in "+strokes, canvas.width * 0.4, canvas.height * 0.5);
      inHole = true;
    }
    else{
      inHole=false;
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
  


