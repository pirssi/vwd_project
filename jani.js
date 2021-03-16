const GRIDSIZEX = 6;
const GRIDSIZEY = 6;
const OBSTACLECOUNT = 5;
let gridPosInUse = [];

function jani() {
  drawObstacles();
}
function drawObstacles() {
  let obstaclePositions = randomizePos();
  console.log(obstaclePositions);

  //let i;

  // for (i = 0; i < obstaclePositions.length; i++) {
  //   // console.log(
  //   //   "x: " + obstaclePositions[i][0] + ", y: " + obstaclePositions[i][1]
  //   // );
  //   //TODO: actual drawing
  //   /*
  //   varsinainen sijainti canvaksella: canvaswidth / gridsizeX * x-koordinaatti
  //   */
  // }

  function randomizePos() {
    let posArray = new Array(); //array that has OBSTACLECOUNT amount of x and y coordinates

    //while (posArray.length < OBSTACLECOUNT)
    let i;
    for (i = 0; i < OBSTACLECOUNT; i++) {
      //generate the position as an array
      let pos = [
        Math.floor(Math.random() * GRIDSIZEX), //generate random x coordinate
        Math.floor(Math.random() * GRIDSIZEY), //generate random y coordinate
      ];
      posArray.push(pos); //push the array of a single position to the array with all the coordinates (nested arrays)
    }
    return posArray;
  }
}
function generateWallPos() {
  const WALL_MAXCOUNT = 5;
  const WALL_WIDTH = 0.033;

  let wallPos = [];

  let wallCount = Math.floor(Math.random() * WALL_MAXCOUNT) + 1;
  console.log("wallcount: " + wallCount);

  let i;
  for (i = 0; i < wallCount; i++) {
    let wallType = Math.round(Math.random());
    if (wallType == 0) {
      console.log("hor");
      //horizontal wall
      wallPos.push(
        new Wall(
          canvas.width * Math.random() * 0.8,
          canvas.height * (Math.random() * (1 - WALL_WIDTH)) + WALL_WIDTH,
          canvas.width * (Math.random() * 0.8 + 0.2),
          canvas.height * WALL_WIDTH,
          false,
          false
        )
      );
    } else {
      console.log("ver");
      //vertical wall
      wallPos.push(
        new Wall(
          canvas.width * (Math.random() * (1 - WALL_WIDTH)) + WALL_WIDTH,
          canvas.height * Math.random() * 0.8,
          canvas.width * WALL_WIDTH,
          canvas.height * (Math.random() * 0.8 + 0.2),
          false,
          false
        )
      );
    }
  }
  return wallPos;
}
function generateSandpitPos() {
  const MAXCOUNT = 5;
  const MINRADX = 80;
  const MAXRADX = 120;
  const MINRADY = 80;
  const MAXRADY = 120;
  const MAXANGLE = 45;

  let sandPos = [];

  let sandCount = Math.floor(Math.random() * MAXCOUNT) + 1;

  let pos = [];

  let x;
  let y;

  console.log("sandpit:");

  let i;
  for (i = 0; i < sandCount; i++) {
    pos = [
      Math.floor(Math.random() * (GRIDSIZEX + 1)),
      Math.floor(Math.random() * (GRIDSIZEY + 1)),
    ];

    while (gridPosInUse.includes(pos)) {
      pos = [
        Math.floor(Math.random() * (GRIDSIZEX + 1)),
        Math.floor(Math.random() * (GRIDSIZEY + 1)),
      ];
    }
    gridPosInUse.push(pos);

    console.log(i + ": " + pos);
    sandPos.push(
      new SandPit(
        (canvas.width / GRIDSIZEX) * pos[0],
        (canvas.height / GRIDSIZEY) * pos[1],
        MINRADX + Math.random() * (MAXRADX - MINRADX),
        MINRADY + Math.random() * (MAXRADY - MINRADY),
        Math.random() * MAXANGLE,
        "khaki"
      )
    );
  }
  return sandPos;
}
function generatePoolPos() {
  const MAXCOUNT = 5;
  const MINRADX = 80;
  const MAXRADX = 120;
  const MINRADY = 80;
  const MAXRADY = 120;
  const MAXANGLE = 45;

  let poolPos = [];

  let poolCount = Math.floor(Math.random() * MAXCOUNT) + 1;

  let pos = [];

  let x;
  let y;

  console.log("pool:");
  let i;
  for (i = 0; i < poolCount; i++) {
    pos = [
      Math.floor(Math.random() * (GRIDSIZEX + 1)),
      Math.floor(Math.random() * (GRIDSIZEY + 1)),
    ];

    while (gridPosInUse.includes(pos)) {
      pos = [
        Math.floor(Math.random() * (GRIDSIZEX + 1)),
        Math.floor(Math.random() * (GRIDSIZEY + 1)),
      ];
    }
    gridPosInUse.push(pos);

    console.log(i + ": " + pos);
    poolPos.push(
      new Pool(
        (canvas.width / GRIDSIZEX) * pos[0],
        (canvas.height / GRIDSIZEY) * pos[1],
        MINRADX + Math.random() * (MAXRADX - MINRADX),
        MINRADY + Math.random() * (MAXRADY - MINRADY),
        Math.random() * MAXANGLE,
        "aqua"
      )
    );
  }
  return poolPos;
}

//!level generation
//!ball hit mouse drag -> mouse down
