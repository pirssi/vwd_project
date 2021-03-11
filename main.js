const SIZE = 1000;

// ref to last position where ball was hit
// set it every time ball stops
var hitPosX;
var hitPosY;
var hitAudio = new Audio('http://sfxcontent.s3.amazonaws.com/soundfx/GolfSwing.mp3');
hitAudio.volume = 0.3;
var holeAudio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-31172/zapsplat_sport_golf_crazy_ball_drop_into_hole_006_31530.mp3?_=1');
var waterAudio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/water_splash_hand_slap.mp3?_=1'); 
waterAudio.volume = 0.3; //doesnt change the volume for some reason
var bounceAudio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-35448/zapsplat_sport_basketball_single_light_bounce_001_35731.mp3?_=1');
var cheerAudio = new Audio('https://freesound.org/data/previews/245/245639_591423-lq.mp3');

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
