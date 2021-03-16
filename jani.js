const GRIDSIZEX = 6;
const GRIDSIZEY = 6;
const OBSTACLECOUNT = 5;
var gridPosInUse = [];

function jani() {
  drawObstacles();
}
// function generateWallPos() {
//   const WALL_MAXCOUNT = 5;
//   const WALL_WIDTH = 0.033;

//   var wallPos = [];

//   var wallCount = Math.floor(Math.random() * WALL_MAXCOUNT) + 1;
//   console.log("wallcount: " + wallCount);

//   var i;
//   for (i = 0; i < wallCount; i++) {
//     var wallType = Math.round(Math.random());
//     if (wallType == 0) {
//       console.log("hor");
//       //horizontal wall
//       wallPos.push(
//         new Wall(
//           (canvas.width / GRIDSIZEX) * 0,
//           (canvas.height / GRIDSIZEY) * 0,
//           (canvas.width / GRIDSIZEX) * 6,
//           canvas.height * WALL_WIDTH,
//           false,
//           false
//         )
//       );
//     } else {
//       console.log("ver");
//       //vertical wall
//       wallPos.push(
//         new Wall(
//           canvas.width * (Math.random() * (1 - WALL_WIDTH)) + WALL_WIDTH,
//           canvas.height * Math.random() * 0.8,
//           canvas.width * WALL_WIDTH,
//           canvas.height * (Math.random() * 0.8 + 0.2),
//           false,
//           false
//         )
//       );
//     }
//   }
//   return wallPos;
// }
function generateBlockPos() {
  const MAXCOUNT = 5;
  const BLOCKSIZE = 0.05;

  var blockPos = [];

  var blockCount = Math.floor(Math.random() * MAXCOUNT) + 1;

  var pos = [];

  var i;
  for (i = 0; i < blockCount; i++) {
    let isValid = false;

    while (!isValid) {
      pos = [
        Math.floor(Math.random() * (GRIDSIZEX + 1)),
        Math.floor(Math.random() * (GRIDSIZEY + 1)),
      ];

      if (valid(pos)) {
        gridPosInUse.push(pos);
        isValid = true;
      } else {
        pos = [
          Math.floor(Math.random() * (GRIDSIZEX + 1)),
          Math.floor(Math.random() * (GRIDSIZEY + 1)),
        ];
      }
    }

    //console.log(i + ": " + pos);

    blockPos.push(
      new Wall(
        (canvas.width / GRIDSIZEX) * pos[0],
        (canvas.height / GRIDSIZEY) * pos[1],
        BLOCKSIZE,
        BLOCKSIZE,
        false,
        false
      )
    );
  }

  console.log(gridPosInUse);

  return blockPos;
}
function generateSandpitPos() {
  const MAXCOUNT = 5;
  const MINRADX = 80;
  const MAXRADX = 120;
  const MINRADY = 80;
  const MAXRADY = 120;
  const MAXANGLE = 0;

  var sandPos = [];

  var sandCount = Math.floor(Math.random() * MAXCOUNT) + 1;

  var pos = [];

  //console.log("sandpit:");

  var i;
  for (i = 0; i < sandCount; i++) {
    let isValid = false;

    while (!isValid) {
      pos = [
        Math.floor(Math.random() * (GRIDSIZEX + 1)),
        Math.floor(Math.random() * (GRIDSIZEY + 1)),
      ];

      if (valid(pos)) {
        gridPosInUse.push(pos);
        isValid = true;
      } else {
        pos = [
          Math.floor(Math.random() * (GRIDSIZEX + 1)),
          Math.floor(Math.random() * (GRIDSIZEY + 1)),
        ];
      }
    }

    //console.log(i + ": " + pos);

    var radx = MINRADX + Math.random() * (MAXRADX - MINRADX);
    var rady = radx * (0.75 + Math.random() * 0.5);

    sandPos.push(
      new SandPit(
        (canvas.width / GRIDSIZEX) * pos[0],
        (canvas.height / GRIDSIZEY) * pos[1],
        radx,
        rady,
        Math.random() * MAXANGLE,
        "khaki"
      )
    );
  }

  console.log(gridPosInUse);

  return sandPos;
}
function generatePoolPos() {
  const MAXCOUNT = 5;
  const MINRADX = 20;
  const MAXRADX = 120;
  const MINRADY = 20;
  const MAXRADY = 120;
  const MAXANGLE = 0;

  var poolPos = [];

  var poolCount = Math.floor(Math.random() * MAXCOUNT) + 1;

  var pos = [];

  //console.log("pool:");
  var i;
  for (i = 0; i < poolCount; i++) {
    let isValid = false;
    while (!isValid) {
      pos = [
        Math.floor(Math.random() * (GRIDSIZEX + 1)),
        Math.floor(Math.random() * (GRIDSIZEY + 1)),
      ];

      if (valid(pos)) {
        gridPosInUse.push(pos);
        isValid = true;
      } else {
        pos = [
          Math.floor(Math.random() * (GRIDSIZEX + 1)),
          Math.floor(Math.random() * (GRIDSIZEY + 1)),
        ];
      }
    }

    var radx = MINRADX + Math.random() * (MAXRADX - MINRADX);
    var rady = radx * (0.75 + Math.random() * 0.5);

    poolPos.push(
      new Pool(
        (canvas.width / GRIDSIZEX) * pos[0],
        (canvas.height / GRIDSIZEY) * pos[1],
        radx,
        rady,
        Math.random() * MAXANGLE,
        "aqua"
      )
    );
  }
  console.log(gridPosInUse);
  return poolPos;
}

//checks for the generated position (pos) in the gridInUse array
function valid(pos) {
  let i;
  console.log("length: " + gridPosInUse.length);
  for (i = 0; i < gridPosInUse.length; i++) {
    if (JSON.stringify(gridPosInUse[i]) === JSON.stringify(pos)) {
      console.log("haha blocked same values 😎 EZ");
      return false;
    }
  }
  console.log("eipä ollu 😳");
  return true;
}

// function drawObstacles() {
//   var obstaclePositions = randomizePos();
//   console.log(obstaclePositions);

//   //var i;

//   // for (i = 0; i < obstaclePositions.length; i++) {
//   //   // console.log(
//   //   //   "x: " + obstaclePositions[i][0] + ", y: " + obstaclePositions[i][1]
//   //   // );
//   //   //TODO: actual drawing
//   //   /*
//   //   varsinainen sijainti canvaksella: canvaswidth / gridsizeX * x-koordinaatti
//   //   */
//   // }

//   function randomizePos() {
//     var posArray = new Array(); //array that has OBSTACLECOUNT amount of x and y coordinates

//     //while (posArray.length < OBSTACLECOUNT)
//     var i;
//     for (i = 0; i < OBSTACLECOUNT; i++) {
//       //generate the position as an array
//       var pos = [
//         Math.floor(Math.random() * GRIDSIZEX), //generate random x coordinate
//         Math.floor(Math.random() * GRIDSIZEY), //generate random y coordinate
//       ];
//       posArray.push(pos); //push the array of a single position to the array with all the coordinates (nested arrays)
//     }
//     return posArray;
//   }
// }

//!ball hit mouse drag -> mouse down
//!remove reika2
