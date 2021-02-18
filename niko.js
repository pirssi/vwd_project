var xPos;
var yPos;


function niko() {
  canvas.width = SIZE;
  canvas.height = SIZE;

  reika = new Hole(canvas.width*0.8, canvas.height*0.8, 30);
  reika2 = new Hole(canvas.width*0.8, canvas.height*0.8, 15)
  
}

function drawBackground() {
  //background
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,200,0,1)";
  ctx.rect(0, 0, 1, 1);
  ctx.fill();
  ctx.stroke();

  //starting area
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,140,0,1)";
  ctx.rect(ballXPos - 500.01, ballYPos -500.01, 0.21, 0.21);
  ctx.fill();

  //borders of the map
  ctx.beginPath();
  ctx.lineWidth = 0.02;
  ctx.rect(0, 0, 1, 1);
  ctx.stroke();

  //wall test
  ctx.beginPath();
  ctx.lineWidth = 0.01;
  ctx.strokeStyle = wallColor;
  ctx.moveTo(0.2, 0);
  ctx.lineTo(0.2, 0.8);
  ctx.stroke();

  //triangle test
  ctx.beginPath();
  ctx.fillStyle = wallColor;
  ctx.moveTo(0, 1);
  ctx.lineTo(0.1, 1);
  ctx.lineTo(0, 0.9);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}



class Hole {
  constructor(xPos,yPos, reikaRad) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.reikaRad = reikaRad;
  }
  draw() {
    ctx.beginPath();

    ctx.save();
    ctx.lineWidth = 0.4;

    ctx.fillStyle = "black";
    ctx.arc(this.xPos, this.yPos, this.reikaRad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
