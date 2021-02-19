var xPos;
var yPos;


function niko() {
  canvas.width = SIZE;
  canvas.height = SIZE;

  reika = new Hole(canvas.width*0.8, canvas.height*0.8, 15, "black");
  reika2 = new Hole(canvas.width*0.8, canvas.height*0.8, 5, "lightblue")
  
}

function drawScene() {
  reika.draw(ctx);
  reika2.draw(ctx);
  pallo.draw(ctx); //joona
  DrawForceMeter();
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
  ctx.font = "54px Georgia";
  ctx.fillStyle = "black"
  if(!inHole){
    ctx.fillText("Stroke "+strokes, canvas.width * 0.4, canvas.height * 0.1);
  }
  else{
    ctx.fillText("",canvas.width * 0.4, canvas.height * 0.1);
  }
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
  ctx.fillText("Hole in "+strokes, canvas.width * 0.4, canvas.height * 0.5);
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