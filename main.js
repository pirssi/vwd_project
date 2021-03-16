const SIZE = 1000;

// ref to last position where ball was hit
// set it every time ball stops
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
var bounceCD = 1;

var horizontalVel;
var verticalVel;
var ballYPos = 500;
var ballXPos = 500;
var ballFriction = 1.013;
var ballMoving = false;
var ballHit = false;
var allowClick = true;

var dragging = false;
var dragStartPosX;
var dragStartPosY;
var dragEndPosX;
var dragEndPosY;

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

var ctx;
var canvas;

function main() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  niko();
  init();
  checkBounds();
  //drawObstacles();
}
