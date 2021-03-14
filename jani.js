const GRIDSIZEX = 10;
const GRIDSIZEY = 10;
const OBSTACLECOUNT = 5;

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

//!level generation
//!ball hit mouse drag -> mouse down
