function drawScene() {
  //background
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,150,0,1)";
  ctx.rect(0, 0, SIZE, SIZE);
  ctx.fill();
  ctx.stroke();

  drawSandPits();
  drawPools();
  drawWalls();
  drawBlocks();

  //borders of the map
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.rect(0, 0, SIZE, SIZE);
  ctx.stroke();

  drawForceMeter();
  drawHitForceUI();
  drawScore();
  drawStrokes();
  drawStageNumber();
  drawPar();

  reika.draw(ctx);
  reika2.draw(ctx);
  pallo.draw(ctx); //joona
}

function drawStrokes() {
  ctx.font = "30px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText(
    "Stroke: " + strokes,
    canvas.width * 0.42,
    canvas.height * 0.043
  );
}

function drawPar() {
  ctx.font = "30px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText("Par: " + stagePar, canvas.width * 0.6, canvas.height * 0.043);
}

function drawStageNumber() {
  ctx.font = "30px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText(
    "Stage: " + stageNumber,
    canvas.width * 0.1,
    canvas.height * 0.043
  );
}

function drawScore() {
  ctx.font = "54px Georgia";
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0.5", "red");
  gradient.addColorStop("0.55", "orange");
  gradient.addColorStop("0.62", "yellow");
  gradient.addColorStop("0.68", "lightgreen");
  gradient.addColorStop("0.72", "blue");
  gradient.addColorStop("0.8", "magenta");
  ctx.fillStyle = gradient;

  if (scoreTime < Date.now()) {
  } else if (score == 1) {
    ctx.fillText("Hole in one!", canvas.width * 0.38, canvas.height * 0.5);
  } else if (score == prevPar) {
    ctx.fillText(
      "Par!" + " (" + score + " strokes)",
      canvas.width * 0.34,
      canvas.height * 0.5
    );
  } else if (score < prevPar) {
    var score1 = (score - prevPar) * -1;
    ctx.fillText(
      score1 + " under par!" + " (" + score + " strokes)",
      canvas.width * 0.24,
      canvas.height * 0.5
    );
  } else if (score > prevPar) {
    var score1 = score - prevPar;
    ctx.fillText(
      score1 + " over par" + " (" + score + " strokes)",
      canvas.width * 0.25,
      canvas.height * 0.5
    );
  }
}

//draw forceMeter
function drawForceMeter(velFactorPercent) {
  ctx.beginPath();
  ctx.lineWidth = 2;

  ctx.strokeStyle = "black";
  ctx.moveTo(10, 10);
  ctx.lineTo(10, 130);
  ctx.lineTo(30, 130);
  ctx.lineTo(30, 10);
  ctx.lineTo(10, 10);
  ctx.stroke();

  // ctx.beginPath();
  // ctx.fillStyle = "rgba(0,0,0,0)";
  // ctx.moveTo(11, 11);
  // ctx.lineTo(11, 129);
  // ctx.lineTo(29, 129);
  // ctx.lineTo(29, 11);
  // ctx.lineTo(9, 11);
  // ctx.fill();
}

// creates UI for current hit force in the left upper corner
function drawHitForceUI() {
  // fill forceMeter
  if (velPercent <= 10) {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "White";
    ctx.fillText(
      Math.round(velPercent) + "%",
      canvas.width * 0.008,
      canvas.height * 0.155
    );

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(11, 129);
    ctx.lineTo(29, 129);
    ctx.lineTo(29, 109);
    ctx.lineTo(11, 109);
    ctx.lineTo(11, 129);
    ctx.fill();
  } else if (velPercent > 10) {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "White";
    ctx.fillText(
      Math.round(velPercent) + "%",
      canvas.width * 0.008,
      canvas.height * 0.155
    );

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(11, 129);
    ctx.lineTo(29, 129);
    ctx.lineTo(29, 109);
    ctx.lineTo(11, 109);
    ctx.lineTo(11, 129);
    ctx.fill();

    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.12);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("0.7", "yellow");
    gradient.addColorStop("1", "green");
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.moveTo(11, 109);
    ctx.lineTo(29, 109);
    ctx.lineTo(29, 111 - velPercent);
    ctx.lineTo(11, 111 - velPercent);
    ctx.lineTo(11, 109);
    ctx.fill();
  }
}

function drawPools() {
  for (let i = 0; i < pools.length; i++) {
    pools[i].draw();
  }
}

function drawSandPits() {
  for (let i = 0; i < sandPits.length; i++) {
    sandPits[i].draw();
  }
}

// draw all walls in walls[]
function drawWalls() {
  for (let i = 0; i < walls.length; i++) {
    walls[i].draw();
  }
}
// draw blocks
function drawBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].draw();
  }
}
function drawVictory() {
  //window.cancelAnimationFrame(animate);
  // pallo.xPos=canvas.width*0.45;
  // pallo.yPos=canvas.height*0.45;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(
    (canvas.width / GRIDWIDTH) * 3,
    (canvas.height / GRIDHEIGHT) * 3,
    canvas.height * 0.45,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.fillStyle = "gold";
  ctx.fill();
  ctx.beginPath();
  //top of trophy
  ctx.moveTo((canvas.width / GRIDWIDTH) * 2, (canvas.height / GRIDHEIGHT) * 2);
  ctx.bezierCurveTo(
    (canvas.width / GRIDWIDTH) * 2,
    (canvas.height / GRIDHEIGHT) * 1.8,
    (canvas.width / GRIDWIDTH) * 4,
    (canvas.height / GRIDHEIGHT) * 1.8,
    (canvas.width / GRIDWIDTH) * 4,
    (canvas.height / GRIDHEIGHT) * 2
  );
  ctx.stroke();
  //left side of trophy
  ctx.moveTo((canvas.width / GRIDWIDTH) * 4, (canvas.height / GRIDHEIGHT) * 2);
  ctx.quadraticCurveTo(
    (canvas.width / GRIDWIDTH) * 4,
    (canvas.height / GRIDHEIGHT) * 3.8,
    (canvas.width / GRIDWIDTH) * 3.2,
    (canvas.height / GRIDHEIGHT) * 4
  );
  ctx.stroke();
  //right side of trophy
  ctx.moveTo(
    (canvas.width / GRIDWIDTH) * 2.8,
    (canvas.height / GRIDHEIGHT) * 4
  );
  ctx.quadraticCurveTo(
    (canvas.width / GRIDWIDTH) * 2,
    (canvas.height / GRIDHEIGHT) * 3.8,
    (canvas.width / GRIDWIDTH) * 2,
    (canvas.height / GRIDHEIGHT) * 2
  );
  ctx.stroke();
  //left side of handle
  ctx.moveTo(
    (canvas.width / GRIDWIDTH) * 2.8,
    (canvas.height / GRIDHEIGHT) * 4
  );
  ctx.quadraticCurveTo(
    (canvas.width / GRIDWIDTH) * 2.9,
    (canvas.height / GRIDHEIGHT) * 4.5,
    (canvas.width / GRIDWIDTH) * 2.5,
    (canvas.height / GRIDHEIGHT) * 5
  );
  ctx.stroke();
  //right side of handle
  ctx.moveTo(
    (canvas.width / GRIDWIDTH) * 3.2,
    (canvas.height / GRIDHEIGHT) * 4
  );
  ctx.quadraticCurveTo(
    (canvas.width / GRIDWIDTH) * 3.1,
    (canvas.height / GRIDHEIGHT) * 4.5,
    (canvas.width / GRIDWIDTH) * 3.5,
    (canvas.height / GRIDHEIGHT) * 5
  );
  ctx.stroke();
  //bottom line of gold part
  ctx.lineTo(
    (canvas.width / GRIDWIDTH) * 2.5,
    (canvas.height / GRIDHEIGHT) * 5
  );
  ctx.stroke();
  //left handle outer line
  ctx.moveTo(
    (canvas.width / GRIDWIDTH) * 2.25,
    (canvas.height / GRIDHEIGHT) * 3.5
  );
  ctx.bezierCurveTo(
    (canvas.width / GRIDWIDTH) * 0.2,
    (canvas.height / GRIDHEIGHT) * 1.9,
    (canvas.width / GRIDWIDTH) * 1.5,
    (canvas.height / GRIDHEIGHT) * 1.5,
    (canvas.width / GRIDWIDTH) * 2,
    (canvas.height / GRIDHEIGHT) * 2
  );
  ctx.stroke();
  //left handle inner line
  ctx.moveTo(
    (canvas.width / GRIDWIDTH) * 2.19,
    (canvas.height / GRIDHEIGHT) * 3.35
  );
  ctx.bezierCurveTo(
    (canvas.width / GRIDWIDTH) * 0.8,
    (canvas.height / GRIDHEIGHT) * 2.2,
    (canvas.width / GRIDWIDTH) * 1.2,
    (canvas.height / GRIDHEIGHT) * 1.55,
    (canvas.width / GRIDWIDTH) * 2.01,
    (canvas.height / GRIDHEIGHT) * 2.15
  );
  ctx.stroke();
  //right handle outer line
  ctx.moveTo(
    (canvas.width / GRIDWIDTH) * 3.75,
    (canvas.height / GRIDHEIGHT) * 3.5
  );
  ctx.bezierCurveTo(
    (canvas.width / GRIDWIDTH) * 5.8,
    (canvas.height / GRIDHEIGHT) * 1.9,
    (canvas.width / GRIDWIDTH) * 4.5,
    (canvas.height / GRIDHEIGHT) * 1.5,
    (canvas.width / GRIDWIDTH) * 4,
    (canvas.height / GRIDHEIGHT) * 2
  );
  ctx.stroke();
  //right handle inner line
  ctx.moveTo(
    (canvas.width / GRIDWIDTH) * 3.81,
    (canvas.height / GRIDHEIGHT) * 3.35
  );
  ctx.bezierCurveTo(
    (canvas.width / GRIDWIDTH) * 5.2,
    (canvas.height / GRIDHEIGHT) * 2.2,
    (canvas.width / GRIDWIDTH) * 4.8,
    (canvas.height / GRIDHEIGHT) * 1.55,
    (canvas.width / GRIDWIDTH) * 3.99,
    (canvas.height / GRIDHEIGHT) * 2.15
  );
  ctx.stroke();
  //base
  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(
    (canvas.width / GRIDWIDTH) * 2.2,
    (canvas.height / GRIDHEIGHT) * 5,
    (canvas.width / GRIDWIDTH) * 1.6,
    (canvas.height / GRIDHEIGHT) * 0.5
  );
  ctx.stroke();
  ctx.fillRect(
    (canvas.width / GRIDWIDTH) * 2,
    (canvas.height / GRIDHEIGHT) * 5.5,
    (canvas.width / GRIDWIDTH) * 2,
    (canvas.height / GRIDHEIGHT) * 0.1
  );
  ctx.stroke();
  //score placate
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    (canvas.width / GRIDWIDTH) * 2.3,
    (canvas.height / GRIDHEIGHT) * 5.1,
    (canvas.width / GRIDWIDTH) * 1.4,
    (canvas.height / GRIDHEIGHT) * 0.3
  );
  ctx.stroke();
  ctx.font = "22px Verdana";
  ctx.fillStyle = "black";
  ctx.fillText(
    "Total Score: " + (totalStrokes-totalPar),
    (canvas.width / GRIDWIDTH) * 2.35,
    (canvas.height / GRIDHEIGHT) * 5.3
  );

  ctx.font = "22px Verdana";
  ctx.fillStyle = "black";
  ctx.fillText(
    "Total Par: " + totalPar,
    (canvas.width / GRIDWIDTH) * 0.15,
    (canvas.height / GRIDHEIGHT) * 5.2
  );

  ctx.font = "22px Verdana";
  ctx.fillStyle = "black";
  ctx.fillText(
    "Total Strokes: " + totalStrokes,
    (canvas.width / GRIDWIDTH) * 0.15,
    (canvas.height / GRIDHEIGHT) * 5.4
  );


  ctx.font = "102px Verdana";
  // Create gradient
  var gradient = ctx.createLinearGradient(
    (canvas.width / GRIDWIDTH) * 1,
    (canvas.height / GRIDHEIGHT) * 1,
    (canvas.width / GRIDWIDTH) * 3,
    (canvas.height / GRIDHEIGHT) * 3
  );
  gradient.addColorStop("0", "darkorange");
  gradient.addColorStop("0.5", "yellow");
  gradient.addColorStop("1.0", "darkorange");
  // Fill with gradient
  ctx.fillStyle = gradient;
  ctx.strokeText(
    "YOU'RE WINNER !",
    (canvas.width / GRIDWIDTH) * 0.4,
    (canvas.height / GRIDHEIGHT) * 1
  );
  ctx.fillText(
    "YOU'RE WINNER !",
    (canvas.width / GRIDWIDTH) * 0.4,
    (canvas.height / GRIDHEIGHT) * 1
  );
  ctx.font = "154px Verdana";
  ctx.lineWidth = 5;
  ctx.strokeText(
    "1",
    (canvas.width / GRIDWIDTH) * 2.7,
    (canvas.height / GRIDHEIGHT) * 3
  );
  if (victoryAudioPlayed == false) {
    victoryAudio.play();
    victoryAudioPlayed = true;
  }
}
