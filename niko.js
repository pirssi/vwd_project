var xPos;
var yPos;

var walls = [];
var wallCollisions = [];
var wallCollisionsSet = false;

var pools = [];
var poolCollisions = [];
var poolCollisionsSet = false;

var sandPits = [];
var sandPitCollisions = [];
var sandPitCollisionsSet = false;

var stages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var stagesIndex = 0;

const GRIDWIDTH = 6;
const GRIDHEIGHT = 6;

function niko() {
  canvas.width = SIZE;
  canvas.height = SIZE;

  setStage();
}

function drawScene() {
  //background
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,150,0,1)";
  ctx.rect(0, 0, SIZE, SIZE);
  ctx.fill();
  ctx.stroke();

  //setStage();
  checkStageChange();
  DrawSandPits();
  DrawPools();
  DrawWalls();

  //borders of the map
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.lineWidth = 5;
  ctx.rect(0, 0, SIZE, SIZE);
  ctx.stroke();

  DrawForceMeter();
  HitForceUI();
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
function DrawForceMeter(velFactorPercent) {
  ctx.beginPath();
  ctx.lineWidth = 0.2;
  ctx.fillStyle = "black";
  ctx.moveTo(10, 10);
  ctx.lineTo(10, 130);
  ctx.lineTo(30, 130);
  ctx.lineTo(30, 10);
  ctx.lineTo(10, 10);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.moveTo(11, 11);
  ctx.lineTo(11, 129);
  ctx.lineTo(29, 129);
  ctx.lineTo(29, 11);
  ctx.lineTo(9, 11);
  ctx.fill();
}

class Hole {
  constructor(xPos, yPos, reikaRad, holeColor) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.holeColor = holeColor;
    this.reikaRad = reikaRad;
  }
  draw() {
    ctx.beginPath();

    ctx.save();
    ctx.lineWidth = 0.4;

    ctx.fillStyle = this.holeColor;
    ctx.arc(this.xPos, this.yPos, this.reikaRad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

class Pool {
  constructor(xPos, yPos, poolRadX, poolRadY, poolRotation, poolColor) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.poolColor = poolColor;
    this.poolRadX = poolRadX;
    this.poolRadY = poolRadY;
    this.poolRotation = poolRotation;
  }
  draw() {
    ctx.beginPath();

    ctx.save();

    ctx.fillStyle = this.poolColor;
    ctx.ellipse(
      this.xPos,
      this.yPos,
      this.poolRadX,
      this.poolRadY,
      this.poolRotation,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.restore();
  }
}

function DrawPools() {
  for (let i = 0; i < pools.length; i++) {
    pools[i].draw();
  }
}

// sandPits
class SandPit {
  constructor(
    xPos,
    yPos,
    sandPitRadX,
    sandPitRadY,
    sandPitRotation,
    sandPitColor
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.sandPitColor = sandPitColor;
    this.sandPitRadX = sandPitRadX;
    this.sandPitRadY = sandPitRadY;
    this.sandPitRotation = sandPitRotation;
  }
  draw() {
    ctx.beginPath();

    ctx.save();

    ctx.fillStyle = this.sandPitColor;
    ctx.ellipse(
      this.xPos,
      this.yPos,
      this.sandPitRadX,
      this.sandPitRadY,
      this.sandPitRotation,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.restore();
  }
}

function DrawSandPits() {
  for (let i = 0; i < sandPits.length; i++) {
    sandPits[i].draw();
  }
}

// walls
class Wall {
  constructor(xPos, yPos, wallWidth, wallHeight, topBotBool, flipped) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.wallWidth = wallWidth;
    this.wallHeight = wallHeight;
    this.topBotBool = topBotBool;
    this.flipped = flipped;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(95, 11, 11)";
    ctx.rect(this.xPos, this.yPos, this.wallWidth, this.wallHeight);
    ctx.fill();
  }
}

// draw all walls in walls[]
function DrawWalls() {
  for (let i = 0; i < walls.length; i++) {
    walls[i].draw();
  }
}

//stages
class Stage {
  constructor(ball, hole1, hole2, walls) {
    this.ball = ball;
    this.hole1 = hole1;
    this.hole2 = hole2;
    this.walls = walls;
  }
}

// StageChange system that sets stage depending on stageIndex
function setStage() {

  //on first setStage create ball and hole
  if(stageSet==false){
    pallo = new Ball(
      (canvas.width / GRIDWIDTH) * 1,
      (canvas.height / GRIDHEIGHT) * 1,
      10,
      "white"
    );
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;
    
    reika = new Hole(
      (canvas.width / GRIDWIDTH) * 5,
      (canvas.height / GRIDHEIGHT) * 5,
      15,
      "black"
    );
    
    reika2 = new Hole(
      (canvas.width / GRIDWIDTH) * 5,
      (canvas.height / GRIDHEIGHT) * 5,
      5,
      "lightblue"
    );
    stageSet=true;
  }

  if (stages[stagesIndex] == 0) {
    //Level 1
    //Start of level 1
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 1
   
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.3,
        (canvas.height / GRIDHEIGHT) * 2,
        (canvas.width / GRIDWIDTH) * 1.6,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.3,
        (canvas.height / GRIDHEIGHT) * 4,
        (canvas.width / GRIDWIDTH) * 1.6,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 2.3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.6,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2.3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.6,
        false,
        false
      )
    );

    //End of level 1
  } else if (stages[stagesIndex] == 1) {
    //Level 2
    //start of level 2

    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 3;

    reika.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.5;
 
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 2
  } else if (stages[stagesIndex] == 2) {
    //Level 3
    //start of level 3
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 2;

    reika.xPos = (canvas.width / GRIDWIDTH) * 0.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 0.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.5;
  
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 3
  } else if (stages[stagesIndex] == 3) {
    //Level 4
    //start of level 4
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 2;


    reika.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 0.5;
 
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 4
  } else if (stages[stagesIndex] == 4) {
    //Level 5
    //start of level 5
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 6;

    reika.xPos = (canvas.width / GRIDWIDTH) * 2;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 2;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 0.5;
 
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 4,
        canvas.height * 0.033,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 5
  } else if (stages[stagesIndex] == 5) {
    //Level 6
    //start of level 6
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 3;
    pallo.xPos=(canvas.width / GRIDWIDTH) * 0.5;
    pallo.yPos=(canvas.height / GRIDHEIGHT) * 0.5;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;
      
    reika.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 0.5;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3.2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.7,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.9,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.8,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.6,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.3,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.4,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.3,
        (canvas.height / GRIDHEIGHT) * 3.2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.1,
        (canvas.height / GRIDHEIGHT) * 3.4,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.9,
        (canvas.height / GRIDHEIGHT) * 3.6,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.7,
        (canvas.height / GRIDHEIGHT) * 3.8,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 4,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 6
  } else if (stages[stagesIndex] == 6) {
    //Level 7
    //start of level 7
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 2;
    pallo.xPos=(canvas.width / GRIDWIDTH) * 1.5;
    pallo.yPos=(canvas.height / GRIDHEIGHT) * 0.5;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;
 
    reika.xPos = (canvas.width / GRIDWIDTH) * 4.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 4.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.5;
 
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 4.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 3.75,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2.25,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 7
  } else if (stages[stagesIndex] == 7) {
    //Level 8
    //start of level 8
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 3;
    pallo.xPos=(canvas.width / GRIDWIDTH) * 0.5;
    pallo.yPos=(canvas.height / GRIDHEIGHT) * 5.6;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;
 
    reika.xPos = (canvas.width / GRIDWIDTH) * 3.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.6;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 3.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.6;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1.5,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1.5,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.5,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 8
  } else if (stages[stagesIndex] == 8) {
    //Level 9
    //start of level 9
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 2;
    pallo.xPos=(canvas.width / GRIDWIDTH) * 3;
    pallo.yPos=(canvas.height / GRIDHEIGHT) * 5.7;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;

    reika.xPos = (canvas.width / GRIDWIDTH) * 3;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 3;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 3;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 3;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5.5,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 0.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 2,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 4,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.8,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.8,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.8,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2.6,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1.8,
        (canvas.height / GRIDHEIGHT) * 2.6,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 9
  } else if (stages[stagesIndex] == 9) {
    //Level 10
    //start of level 10
    while (walls.length) {
      walls.pop();
    }
    while (pools.length) {
      pools.pop();
    }
    while (sandPits.length) {
      sandPits.pop();
    }

    sandPits = generateSandpitPos();
    pools = generatePoolPos();

    stagePar = 2;
    pallo.xPos=(canvas.width / GRIDWIDTH) * 3;
    pallo.yPos=(canvas.height / GRIDHEIGHT) * 0.5;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;
 
    reika = new Hole(
      (canvas.width / GRIDWIDTH) * 0.5,
      (canvas.height / GRIDHEIGHT) * 1.5,
      15,
      "black"
    );
    reika2 = new Hole(
      (canvas.width / GRIDWIDTH) * 0.5,
      (canvas.height / GRIDWIDTH) * 1.5,
      5,
      "lightblue"
    );

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1.1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 4,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0.2,
        (canvas.height / GRIDHEIGHT) * 3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1.1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    checkCollisionSets();
    //End of level 10
    //The final level!!!
  }
  checkCollisionSets();
}
function checkStageChange() {
  if (lastStage != stagesIndex) {
    stageChanged = true;
    horizontalVel = 0;
    verticalVel = 0;
    strokes = 1;
    stageNumber += 1;
    lastStage = stagesIndex;
    prevPar = stagePar;
    scoreTime = Date.now() + 5000;
    RemovePoolsCollision();
    RemoveSandPitsCollision();
    setStage();
  }
}
function checkCollisionSets() {
  if (!wallCollisionsSet) {
    wallCollisionsSet = true;
    for (let i = 0; i < walls.length; i++) {
      wallCollisions.push(walls[i]);
      console.log(wallCollisions[i]);
    }
  }
  if (!poolCollisionsSet) {
    poolCollisionsSet = true;
    for (let i = 0; i < pools.length; i++) {
      poolCollisions.push(pools[i]);
    }
  }
  if (!sandPitCollisionsSet) {
    sandPitCollisionsSet = true;
    for (let i = 0; i < sandPits.length; i++) {
      sandPitCollisions.push(sandPits[i]);
    }
  }
}
