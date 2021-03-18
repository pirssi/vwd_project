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
    //ctx.stroke();
    ctx.restore();

    if (this.holeColor != "rgba(0,0,0,0)") {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(this.xPos, this.yPos - this.reikaRad);
      ctx.lineTo(this.xPos, this.yPos - this.reikaRad - 50);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(this.xPos, this.yPos - this.reikaRad - 50);
      ctx.lineTo(this.xPos + 20, this.yPos - this.reikaRad - 40);
      ctx.lineTo(this.xPos, this.yPos - this.reikaRad - 30);
      ctx.fillStyle = "white";
      ctx.stroke();
      ctx.fill();
    }
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

    //ctx.save();

    ctx.fillStyle = "#3257B4";
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

    // ctx.beginPath();
    // ctx.fillStyle = "#4A6ABF";
    // ctx.ellipse(
    //   this.xPos,
    //   this.yPos,
    //   this.poolRadX - 5,
    //   this.poolRadY - 5,
    //   this.poolRotation,
    //   0,
    //   2 * Math.PI
    // );
    // ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#657ECC";
    ctx.ellipse(
      this.xPos,
      this.yPos,
      this.poolRadX - 1,
      this.poolRadY - 1,
      this.poolRotation,
      0,
      2 * Math.PI
    );
    ctx.fill();
    //ctx.restore();

    //ctx.save();

    //ctx.restore();
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

    //ctx.save();

    ctx.fillStyle = "#E1BF92";
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
    ctx.beginPath();
    ctx.fillStyle = "#ECCCA2";
    ctx.ellipse(
      this.xPos,
      this.yPos,
      this.sandPitRadX - 5,
      this.sandPitRadY - 5,
      this.sandPitRotation,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#F6D7B0";
    ctx.ellipse(
      this.xPos,
      this.yPos,
      this.sandPitRadX - 10,
      this.sandPitRadY - 10,
      this.sandPitRotation,
      0,
      2 * Math.PI
    );
    ctx.fill();
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
    this.color = "rgb(95, 45, 11)";
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.xPos, this.yPos, this.wallWidth, this.wallHeight);
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.xPos, this.yPos, this.wallWidth, this.wallHeight);
  }
}
// blocks
class Block {
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
    ctx.fillStyle = "rgb(185,122,87)";
    ctx.rect(this.xPos, this.yPos, this.wallWidth, this.wallHeight);
    ctx.fill();

    //vertical lines
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(128,64,64)";
    ctx.moveTo(this.xPos + (this.wallWidth / 4) * 1, this.yPos);
    ctx.lineTo(
      this.xPos + (this.wallWidth / 4) * 1,
      this.yPos + this.wallHeight
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(128,64,64)";
    ctx.moveTo(this.xPos + (this.wallWidth / 4) * 2, this.yPos);
    ctx.lineTo(
      this.xPos + (this.wallWidth / 4) * 2,
      this.yPos + this.wallHeight
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(128,64,64)";
    ctx.moveTo(this.xPos + (this.wallWidth / 4) * 3, this.yPos);
    ctx.lineTo(
      this.xPos + (this.wallWidth / 4) * 3,
      this.yPos + this.wallHeight
    );
    ctx.stroke();

    //diagonal line
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(128,64,64)";
    ctx.moveTo(this.xPos + this.wallWidth - 2, this.yPos + 2);
    ctx.lineTo(this.xPos + 2, this.yPos + this.wallHeight - 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(128,64,64)";
    ctx.strokeRect(
      this.xPos + 2,
      this.yPos + 2,
      this.wallWidth - 4,
      this.wallHeight - 4
    );
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.xPos, this.yPos, this.wallWidth, this.wallHeight);
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
