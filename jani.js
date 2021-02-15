const GRIDSIZEX = 100;
const GRIDSIZEY = 100;
const OBSTACLECOUNT = 50;

function randomizePos() {
  let obstaclePositions = new Array();

  let i;
  for (i = 0; i < OBSTACLECOUNT; i++) {
    let pos = [
      Math.floor(Math.random() * GRIDSIZEX),
      Math.floor(Math.random() * GRIDSIZEY),
    ];
    obstaclePositions.push(pos);
  }
  console.log(obstaclePositions);
  return obstaclePositions;
}
