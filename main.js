const SIZE = 1000;

// ref to last position where ball was hit
// set it every time ball stops
var hitPosX;
var hitPosY;

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
}
