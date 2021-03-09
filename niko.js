var xPos;
var yPos;

var walls = [];
var wallCollisions = [];
var wallCollisionsSet = false;

var pools = [];
var poolCollisions = [];
var poolCollisionsSet = false;

var sandPits = [];
var sandPitCollisions =[];
var sandPitCollisionsSet = false;

var stages = [0,1,2,3,4];
var stagesIndex = 0;

function niko() {
  canvas.width = SIZE;
  canvas.height = SIZE;

  setStage();
}

function drawScene() {
  setStage();
  DrawSandPits();
  reika.draw(ctx);
  reika2.draw(ctx);
  
  
  pallo.draw(ctx); //joona
  DrawForceMeter();
  DrawWalls();
  DrawPools();
  drawScore();
}

function drawBackground() {
  //background
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,150,0,1)";
  ctx.rect(0,0,SIZE,SIZE);
  ctx.fill();
  ctx.stroke();

  //borders of the map
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.lineWidth = 5;
  ctx.rect(0, 0, SIZE, SIZE);
  ctx.stroke();

  //wall test
  /*ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.lineWidth = 5;
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 800);
  ctx.stroke();

  //triangle test
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(0, SIZE);
  ctx.lineTo(100, SIZE);
  ctx.lineTo(0, 900);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();*/
}

function drawStrokes(){
  ctx.font = "30px Georgia";
  ctx.fillStyle = "black";
  if(!inHole){
    ctx.fillText("Stroke: "+strokes, canvas.width * 0.42, canvas.height * 0.043);
  }
  else{
    ctx.fillText("",canvas.width * 0.4, canvas.height * 0.1);
  }
}

function drawPar(){
  ctx.font = "30px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText("Par: "+stagePar, canvas.width * 0.6, canvas.height * 0.043);
}

function drawStageNumber(){
  ctx.font = "30px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText("Stage: "+ stageNumber, canvas.width * 0.1, canvas.height * 0.043);
}

function drawScore(){

  ctx.font = "54px Georgia";
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0.5", "red");
  gradient.addColorStop("0.55", "orange");
  gradient.addColorStop("0.62", "yellow");
  gradient.addColorStop("0.68", "lightgreen");
  gradient.addColorStop("0.72", "blue");
  gradient.addColorStop("0.8", "magenta");
  ctx.fillStyle = gradient;

  if(scoreTime < Date.now()){
      
  }
  else if(score==1){
    ctx.fillText("Hole in one!", canvas.width * 0.38, canvas.height * 0.5);
  }
  else if(score==prevPar){
    ctx.fillText("Par!"+ " ("+score+" strokes)", canvas.width * 0.34, canvas.height * 0.5);
  }
  else if(score<prevPar){
    var score1=(score-prevPar)*-1;
    ctx.fillText(score1+" under par!"+ " ("+score+" strokes)", canvas.width * 0.24, canvas.height * 0.5);
  }
  else if(score>prevPar){
    var score1=score-prevPar;
    ctx.fillText(score1+" over par"+ " ("+score+" strokes)", canvas.width * 0.25, canvas.height * 0.5);
  }
}


//draw forceMeter
function DrawForceMeter(velFactorPercent){
    
  ctx.beginPath();
  ctx.lineWidth = 0.2;
  ctx.fillStyle = "black";
  ctx.moveTo(10,10);
  ctx.lineTo(10,130);
  ctx.lineTo(30,130);
  ctx.lineTo(30,10);
  ctx.lineTo(10,10);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.moveTo(11,11);
  ctx.lineTo(11,129);
  ctx.lineTo(29,129);
  ctx.lineTo(29,11);
  ctx.lineTo(9,11);
  ctx.fill();
}


class Hole {
  constructor(xPos,yPos, reikaRad, holeColor) {
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
  constructor(xPos,yPos, poolRadX, poolRadY, poolRotation, poolColor) {
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
    ctx.ellipse(this.xPos, this.yPos, this.poolRadX, this.poolRadY, this.poolRotation, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

function DrawPools(){
  for (let i = 0; i < pools.length; i++){
    pools[i].draw();
  }
}

// sandPits
class SandPit {
  constructor(xPos,yPos, sandPitRadX, sandPitRadY, sandPitRotation, sandPitColor) {
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
    ctx.ellipse(this.xPos, this.yPos, this.sandPitRadX, this.sandPitRadY, this.sandPitRotation, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

function DrawSandPits(){
  for (let i = 0; i < sandPits.length; i++){
    sandPits[i].draw();
  }
}



// walls
class Wall{
  constructor(xPos, yPos, wallWidth, wallHeight, topBotBool, flipped){
    this.xPos = xPos;
    this.yPos = yPos;
    this.wallWidth = wallWidth;
    this.wallHeight = wallHeight;
    this.topBotBool = topBotBool
    this.flipped = flipped;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = 'rgb(95, 11, 11)';
    ctx.rect(this.xPos, this.yPos, this.wallWidth, this.wallHeight);
    ctx.fill();
  }
}

// draw all walls in walls[]
function DrawWalls(){
  for (let i = 0; i < walls.length; i++){
    walls[i].draw();
  }
}



// StageChange system that sets stage depending on stageIndex
function setStage(){

  if(lastStage!=stagesIndex){
    stageChanged=true;
    horizontalVel = 0;
    verticalVel = 0;
    strokes = 1;
    stageNumber+=1;
    lastStage = stagesIndex;
    drawBackground();
    drawStrokes();
    drawStageNumber()
    drawScore();
    scoreTime = Date.now()+5000;
    prevPar = stagePar;
    drawPar();
    RemovePoolsCollision();
  }
 
  //stage1
  if (stages[stagesIndex] == 0){
    //remove each drawn wall at each frame before drawing new ones to avoid overloading webpage
    while(walls.length){
      walls.pop();
    }
    while(pools.length){
      pools.pop();
    }
    while(sandPits.length){
      sandPits.pop();
    }
    

    stagePar=2;
    // set hole position and wall positions
    reika = new Hole(canvas.width*0.82, canvas.height*0.9, 15, "black");
    reika2 = new Hole(canvas.width*0.82, canvas.height*0.9, 5, "lightblue")
    walls.push(new Wall(canvas.width*0.3, canvas.height*0, canvas.width*0.033, canvas.height*0.66, false, false));
    walls.push(new Wall(canvas.width*0.6, canvas.height*0.338, canvas.width*0.033, canvas.height*0.66, false, false));

    // set pool position
    pools.push(new Pool(canvas.width*0.1, canvas.height*0.9, 50, 25, 0, "aqua"));
    pools.push(new Pool(canvas.width*0.9, canvas.height*0.1, 50, 25, 0, "aqua"));

    sandPits.push(new SandPit(canvas.width*0.5, canvas.height*0.5, 100, 70, 0, "khaki"));
    

    // if wallCollisions = false, save  drawn walls to static array (wallCollisions)
    // which is used to keep wall collisions up in Collision.js
    // this is because walls are removed and redrawn on each frame
    if (!wallCollisionsSet){
      wallCollisionsSet = true;
      for (let i = 0; i < walls.length; i++){
        wallCollisions.push(walls[i]);
      }
    }

    // same for pools
    if (!poolCollisionsSet){
      poolCollisionsSet = true;
      for (let i = 0; i < pools.length; i++){
        poolCollisions.push(pools[i]);
      }
    }

    // same for sandPits
    if (!sandPitCollisionsSet){
      sandPitCollisionsSet = true;
      for (let i = 0; i < sandPits.length; i++){
        sandPitCollisions.push(sandPits[i]);
      }
    }
  }

  
  //stage2
  else if (stages[stagesIndex] == 1){
    while(walls.length){
      walls.pop();
    }
    while(pools.length){
      pools.pop();
    }

    stagePar=3;
    
    reika = new Hole(canvas.width*0.9, canvas.height*0.82, 15, "black");
    reika2 = new Hole(canvas.width*0.9, canvas.height*0.82, 5, "lightblue");
    walls.push(new Wall(canvas.width*0, canvas.height*0.3, canvas.width*0.66, canvas.height*0.033, false, false));
    walls.push(new Wall(canvas.width*0.338, canvas.height*0.63, canvas.width*0.66, canvas.height*0.033, false, false));
    pools.push(new Pool(canvas.width*0.8, canvas.height*0.25, 85, 35, 0, "aqua"));
    pools.push(new Pool(canvas.width*0.25, canvas.height*0.8, 40, 70, 0, "aqua"));
    if (!wallCollisionsSet){
      wallCollisionsSet = true;
      for (let i = 0; i < walls.length; i++){
        wallCollisions.push(walls[i]);
        console.log(wallCollisions[i]);
      }
    }
    if (!poolCollisionsSet){
      poolCollisionsSet = true;
      for (let i = 0; i < pools.length; i++){
        poolCollisions.push(pools[i]);
      }
    }
  }

/*
  // these are just layouts for new levels

  //stage3
  if (stages[stagesIndex] == 2){
    while(walls.length){
      walls.pop();
    }
    reika = new Hole(canvas.width*0.82, canvas.height*0.9, 15, "black");
    reika2 = new Hole(canvas.width*0.82, canvas.height*0.9, 5, "lightblue");
    walls.push(new Wall(canvas.width*0, canvas.height*0.3, canvas.width*0.66, canvas.height*0.033));
    walls.push(new Wall(canvas.width*0.338, canvas.height*0.63, canvas.width*0.66, canvas.height*0.033));
    if (!wallCollisionsSet){
      wallCollisionsSet = true;
      for (let i = 0; i < walls.length; i++){
        wallCollisions.push(walls[i]);
        console.log(wallCollisions[i]);
      }
    }
  }

  //stage4
  if (stages[stagesIndex] == 3){
    while(walls.length){
      walls.pop();
    }
    reika = new Hole(canvas.width*0.82, canvas.height*0.9, 15, "black");
    reika2 = new Hole(canvas.width*0.82, canvas.height*0.9, 5, "lightblue");
    walls.push(new Wall(canvas.width*0, canvas.height*0.3, canvas.width*0.66, canvas.height*0.033));
    walls.push(new Wall(canvas.width*0.338, canvas.height*0.63, canvas.width*0.66, canvas.height*0.033));
    if (!wallCollisionsSet){
      wallCollisionsSet = true;
      for (let i = 0; i < walls.length; i++){
        wallCollisions.push(walls[i]);
        console.log(wallCollisions[i]);
      }
    }
  }

    //stage5
    if (stages[stagesIndex] == 4){
    while(walls.length){
      walls.pop();
    }
    reika = new Hole(canvas.width*0.82, canvas.height*0.9, 15, "black");
    reika2 = new Hole(canvas.width*0.82, canvas.height*0.9, 5, "lightblue");
    walls.push(new Wall(canvas.width*0, canvas.height*0.3, canvas.width*0.66, canvas.height*0.033));
    walls.push(new Wall(canvas.width*0.338, canvas.height*0.63, canvas.width*0.66, canvas.height*0.033));
    if (!wallCollisionsSet){
      wallCollisionsSet = true;
      for (let i = 0; i < walls.length; i++){
        wallCollisions.push(walls[i]);
        console.log(wallCollisions[i]);
      }
    }
  }

    */
}

