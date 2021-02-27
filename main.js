const SIZE = 1000;

var horizontalVel;
var verticalVel;
var ballYPos = 500;
var ballXPos = 500;
let wallColor = "rgba(20,20,20,1)";
var ballFriction = 1.013;
var ballMoving = false;

var reikaRad;
var inHole = false;

var dragStartPosX;
var dragStartPosY;
var dragEndPosX;
var dragEndPosY;
var strokes = 1;
var score = 0;
lastStage = 0;
ballHit =false;
mapChanged=false;

// ref to last position where ball was hit
// set it every time ball stops
var hitPosX;
var hitPosY;

var ctx;
var canvas;
var dragging = false;

function main() {

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  niko();
  init();
  checkBounds();
}
