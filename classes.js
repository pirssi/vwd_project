class Ball {
  constructor(xPos, yPos, ballRad, ballColor) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.ballRad = ballRad;
    this.ballColor = ballColor;
    this.moveBall = moveBall;
  }

  draw() {
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = 0.4;

    ctx.fillStyle = this.ballColor;
    ctx.arc(this.xPos, this.yPos, pallo.ballRad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
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
//stages
class Stage {
  constructor(ball, hole1, hole2, walls) {
    this.ball = ball;
    this.hole1 = hole1;
    this.hole2 = hole2;
    this.walls = walls;
  }
}
