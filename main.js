const SIZE = 1000;

var hitPosX;
var hitPosY;
var hitAudio = new Audio("audio/driver.mp3");
hitAudio.volume = 0.3;
var puttAudio = new Audio("audio/putt.mp3");
var holeAudio = new Audio("audio/hole.mp3");
var waterAudio = new Audio("audio/splash.mp3");
waterAudio.volume = 0.3; //doesnt change the volume for some reason
var bounceAudio = new Audio("audio/bounce.mp3");
var cheerAudio = new Audio("audio/cheer.mp3");
var victoryAudio = new Audio("audio/victory_song.wav");
victoryAudio.volume = 0.2;
victoryAudioPlayed = false;
var cooldownTime = 1;
var stageSet = false;

var horizontalVel;
var verticalVel;
var ballYPos = 500;
var ballXPos = 500;
var ballFriction = 0.975;
var ballMoving = false;
var ballHit = false;
var allowClick = true;
var ballToPointerDistance;

var mouseUpPosX;
var mouseUpPosY;

var reikaRad;
var inHole = false;
var stagePar = 0;
var prevPar;
var scoreTime;
var stageNumber = 1;
var lastStage = 0;
var stageChanged = false;
var strokes = 1;
var score = 0;
var totalStrokes = 0;
var totalPar = 0;
var totalScore = 0;

var interval;
var ballsAreTouching = false;
var holeGravityX = 0;
var holeGravityY = 0;

var suctionX = 0;
var suctionY = 0;

var velFactor = 0;
var velPercent = 0;

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

var blocks = [];
var blockCollisions = [];
var blockCollisionsSet = false;

var stages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var stagesIndex = 0;

let reika;
var topBottom = false;

var bounce = 0.95;

const OBSTACLEMAXCOUNT = 12;
var obstacleCount = 0;
var gridPosInUse = [];

const GRIDWIDTH = 6;
const GRIDHEIGHT = 6;

const OBSTACLE_GRIDWIDTH = GRIDWIDTH * 2;
const OBSTACLE_GRIDHEIGHT = GRIDHEIGHT * 2;

var ctx;
var canvas;

function main() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = SIZE;
  canvas.height = SIZE;

  ctx.filter = "blur(20px)";

  // mouse event handling
  canvas.addEventListener("mousedown", pointerDown, false);
  canvas.addEventListener("mousemove", pointerMove, false);
  canvas.addEventListener("mouseup", pointerUp, false);

  setStage();

  drawScene();
  animate();

  document.addEventListener("keyup", (e) => {
    if (e.code === "KeyR") {
      verticalVel = 0;
      horizontalVel = 0;
      setStage();
      redraw();
    }
  });
}

function hideTutorial() {
  ctx.filter = "none";
  redraw();
  let element = document.getElementById("overlay");
  element.style.display = "none";
}
