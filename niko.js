var xPos;
var yPos;


function niko() {
  canvas.width = SIZE;
  canvas.height = SIZE;

  reika = new Hole(canvas.width*0.8, canvas.height*0.8, 30);
  reika2 = new Hole(canvas.width*0.8, canvas.height*0.8, 15)
  
}

function drawScene() {
  reika.draw(ctx);
  pallo.draw(ctx); //joona
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
