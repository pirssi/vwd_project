

function niko() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  canvas.width = SIZE;
  canvas.height = SIZE;

  ctx.scale(SIZE, SIZE);

  pallo = new Ball([ballXPos-499.9, ballYPos-499.9], ballRad-29.995);
  reika = new Hole([endx-799.1, endy-799.1], holesize-2.993);
  laatikko = new Box([0.8, 0.5], 0.2);

  animate();
}
function animate() {
  drawScene();
  window.requestAnimationFrame(animate);
}

function drawScene() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  drawBackground(ctx);

  pallo.draw(ctx);
  reika.draw(ctx);
  laatikko.draw(ctx);
}

function drawBackground(ctx) {
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
}

class Box {
  constructor(loc, scale) {
    this.location = loc;
    this.scale = scale;
  }
  draw(ctx) {
    ctx.beginPath();

    ctx.save();
    ctx.translate(this.location[0], this.location[1]);
    ctx.scale(this.scale, this.scale);
    ctx.lineWidth = 0.4;

    ctx.fillStyle = wallColor;
    ctx.rect(0, 0, 0.1, 0.1);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

class Ball {
  constructor(loc, scale) {
    this.location = loc;
    this.scale = scale;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.location[0], this.location[1]);
    ctx.scale(this.scale, this.scale);
    ctx.lineWidth = 0.4;

    ctx.fillStyle = "lightgray";
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

class Hole {
  constructor(loc, scale) {
    this.location = loc;
    this.scale = scale;
  }
  draw(ctx) {
    ctx.beginPath();

    ctx.save();
    ctx.translate(this.location[0], this.location[1]);
    ctx.scale(this.scale, this.scale);
    ctx.lineWidth = 0.4;

    ctx.fillStyle = "black";
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
