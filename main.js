const SIZE = 1000;

var horizontalVel;
var verticalVel;
var ballYPos = 500;
var ballXPos = 500;
var ballRad = 30;
let wallColor = "rgba(20,20,20,1)";


var dragStartPosX;
var dragStartPosY;
var dragEndPosX;
var dragEndPosY;
let holesize = 3;
let endx = 800;
let endy = 800;

var ctx;
var dragging = false;

function main() {

  init();
  //drawScene();
}
