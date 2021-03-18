// function generateWallPos() {
//   const WALL_MAXCOUNT = 5;
//   const WALL_WIDTH = 0.033;

//   var wallPos = [];

//   var wallCount = Math.floor(Math.random() * WALL_MAXCOUNT) + 1;
//   //console.log("wallcount: " + wallCount);

//   var i;
//   for (i = 0; i < wallCount; i++) {
//     var wallType = Math.round(Math.random());
//     if (wallType == 0) {
//       //console.log("hor");
//       //horizontal wall
//       wallPos.push(
//         new Wall(
//           (canvas.width / GRIDWIDTH) * 0,
//           (canvas.height / GRIDHEIGHT) * 0,
//           (canvas.width / GRIDWIDTH) * 6,
//           canvas.height * WALL_WIDTH,
//           false,
//           false
//         )
//       );
//     } else {
//       //console.log("ver");
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
  const BLOCKSIZE = (canvas.width / OBSTACLE_GRIDWIDTH) * 0.5;

  var blockPos = [];

  var blockCount = Math.floor(Math.random() * MAXCOUNT);

  var pos = [];

  var i;
  for (i = 0; i < blockCount; i++) {
    if (obstacleCount < OBSTACLEMAXCOUNT) {
      let isValid = false;

      while (!isValid) {
        pos = [
          Math.floor(Math.random() * OBSTACLE_GRIDWIDTH) + 1,
          Math.floor(Math.random() * OBSTACLE_GRIDHEIGHT) + 1,
        ];

        if (valid(pos)) {
          pushGridAndSurrounding(pos);
          isValid = true;
        } else {
          pos = [
            Math.floor(Math.random() * OBSTACLE_GRIDWIDTH) + 1,
            Math.floor(Math.random() * OBSTACLE_GRIDHEIGHT) + 1,
          ];
        }
      }

      ////console.log(i + ": " + pos);

      blockPos.push(
        new Block(
          (canvas.width / OBSTACLE_GRIDWIDTH) * pos[0],
          (canvas.height / OBSTACLE_GRIDHEIGHT) * pos[1],
          BLOCKSIZE,
          BLOCKSIZE,
          false,
          false
        )
      );
      obstacleCount++;
    }
  }

  //console.log(gridPosInUse);

  return blockPos;
}
function generateSandpitPos() {
  const MAXCOUNT = 10;
  const MINRADX = canvas.width / OBSTACLE_GRIDWIDTH / 1.75;
  const MAXRADX = canvas.width / OBSTACLE_GRIDWIDTH;
  const MINRADY = canvas.height / OBSTACLE_GRIDHEIGHT / 1.75;
  const MAXRADY = canvas.height / OBSTACLE_GRIDHEIGHT;
  const MAXANGLE = 0;

  var sandPos = [];

  var sandCount = Math.floor(Math.random() * MAXCOUNT);

  var pos = [];

  ////console.log("sandpit:");

  var i;
  for (i = 0; i < sandCount; i++) {
    if (obstacleCount < OBSTACLEMAXCOUNT) {
      let isValid = false;

      while (!isValid) {
        pos = [
          Math.floor(Math.random() * (OBSTACLE_GRIDWIDTH + 1)),
          Math.floor(Math.random() * (OBSTACLE_GRIDHEIGHT + 1)),
        ];

        if (valid(pos)) {
          pushGridAndSurrounding(pos);
          isValid = true;
        } else {
          pos = [
            Math.floor(Math.random() * (OBSTACLE_GRIDWIDTH + 1)),
            Math.floor(Math.random() * (OBSTACLE_GRIDHEIGHT + 1)),
          ];
        }
      }

      ////console.log(i + ": " + pos);

      var radx = MINRADX + Math.random() * (MAXRADX - MINRADX);
      var rady = MINRADY + Math.random() * (MAXRADY - MINRADY);

      sandPos.push(
        new SandPit(
          (canvas.width / OBSTACLE_GRIDWIDTH) * pos[0],
          (canvas.height / OBSTACLE_GRIDHEIGHT) * pos[1],
          radx,
          rady,
          Math.random() * MAXANGLE,
          "khaki"
        )
      );
      obstacleCount++;
    }
  }

  //console.log(gridPosInUse);

  return sandPos;
}
function generatePoolPos() {
  const MAXCOUNT = 10;
  const MINRADX = canvas.width / OBSTACLE_GRIDWIDTH / 3;
  const MAXRADX = canvas.width / OBSTACLE_GRIDWIDTH / 2;
  const MINRADY = canvas.height / OBSTACLE_GRIDHEIGHT / 2;
  const MAXRADY = canvas.height / OBSTACLE_GRIDHEIGHT;
  const MAXANGLE = 0;

  var poolPos = [];

  var poolCount = Math.floor(Math.random() * MAXCOUNT);

  var pos = [];

  ////console.log("pool:");
  var i;
  for (i = 0; i < poolCount; i++) {
    if (obstacleCount < OBSTACLEMAXCOUNT) {
      let isValid = false;
      while (!isValid) {
        pos = [
          Math.floor(Math.random() * (OBSTACLE_GRIDWIDTH + 1)),
          Math.floor(Math.random() * (OBSTACLE_GRIDHEIGHT + 1)),
        ];

        if (valid(pos)) {
          pushGridAndSurrounding(pos);
          isValid = true;
        } else {
          pos = [
            Math.floor(Math.random() * (OBSTACLE_GRIDWIDTH + 1)),
            Math.floor(Math.random() * (OBSTACLE_GRIDHEIGHT + 1)),
          ];
        }
      }

      var radx = MINRADX + Math.random() * (MAXRADX - MINRADX);
      var rady = radx * (0.75 + Math.random() * 0.5);

      poolPos.push(
        new Pool(
          (canvas.width / OBSTACLE_GRIDWIDTH) * pos[0],
          (canvas.height / OBSTACLE_GRIDHEIGHT) * pos[1],
          radx,
          rady,
          Math.random() * MAXANGLE,
          "#4D7CD6"
        )
      );
      obstacleCount++;
    }
  }
  //console.log(gridPosInUse);
  return poolPos;
}

//checks for the generated position (pos) in the gridInUse array
function valid(pos) {
  let i;
  //console.log("length: " + gridPosInUse.length);
  for (i = 0; i < gridPosInUse.length; i++) {
    if (JSON.stringify(gridPosInUse[i]) === JSON.stringify(pos)) {
      //console.log("haha blocked same values 😎 EZ");
      return false;
    }
  }
  //console.log("eipä ollu 😳");
  return true;
}
function pushGridAndSurrounding(pos) {
  gridPosInUse.push(pos);

  gridPosInUse.push([pos[0] + 1, pos[1] + 1]);
  gridPosInUse.push([pos[0] + 1, pos[1]]);
  gridPosInUse.push([pos[0] + 1, pos[1] - 1]);
  gridPosInUse.push([pos[0], pos[1] + 1]);
  gridPosInUse.push([pos[0], pos[1] - 1]);
  gridPosInUse.push([pos[0] - 1, pos[1] + 1]);
  gridPosInUse.push([pos[0] - 1, pos[1]]);
  gridPosInUse.push([pos[0] - 1, pos[1] - 1]);
}

//!ball hit mouse drag -> mouse down
//!remove reika2
