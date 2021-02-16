const GRIDSIZEX = 10;
const GRIDSIZEY = 10;
const OBSTACLECOUNT = 5;

function jani() {
  drawObstacles();
}
function drawObstacles() {
  let obstaclePositions = randomizePos();

  let i;

  for (i = 0; i < obstaclePositions.length; i++) {
    // console.log(
    //   "x: " + obstaclePositions[i][0] + ", y: " + obstaclePositions[i][1]
    // );
    //TODO: actual drawing
    /*
    varsinainen sijainti canvaksella: canvaswidth / gridsizeX * x-koordinaatti
    */
  }

  function randomizePos() {
    let obstaclePositions = new Array(); //array that has OBSTACLECOUNT number of x and y coordinates

    let i;
    for (i = 0; i < OBSTACLECOUNT; i++) {
      //generate the position as an array
      let pos = [
        Math.floor(Math.random() * GRIDSIZEX), //generate random x coordinate
        Math.floor(Math.random() * GRIDSIZEY), //generate random y coordinate
      ];
      obstaclePositions.push(pos); //push the array of a single position to the array with all the coordinates (nested arrays)
    }
    return obstaclePositions;
  }
}
