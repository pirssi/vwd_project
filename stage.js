function initializeStage() {
  //if setting the first stage, initialize ball, hole and hole "hitbox"
  if (stageSet == false) {
    console.log("test");
    pallo = new Ball(
      (canvas.width / GRIDWIDTH) * 1,
      (canvas.height / GRIDHEIGHT) * 1,
      10,
      "white"
    );

    reika = new Hole(
      (canvas.width / GRIDWIDTH) * 5,
      (canvas.height / GRIDHEIGHT) * 5,
      15,
      "black"
    );

    reika2 = new Hole(
      (canvas.width / GRIDWIDTH) * 5,
      (canvas.height / GRIDHEIGHT) * 5,
      5,
      "black"
    );
    stageSet = true;
  }

  //remove previous walls, pools and sandpits
  // while (walls.length) {
  //   walls.pop();
  // }
  // while (pools.length) {
  //   pools.pop();
  // }
  // while (sandPits.length) {
  //   sandPits.pop();
  // }
  walls.splice(0, walls.length);
  pools.splice(0, pools.length);
  sandPits.splice(0, sandPits.length);
  gridPosInUse.splice(0, gridPosInUse.length);

  console.log(gridPosInUse);

  //generate new pseudorandom sandpits and pools
  sandPits = generateSandpitPos();
  pools = generatePoolPos();

  // default position for the ball
  pallo.xPos = canvas.width * 0.1;
  pallo.yPos = canvas.height * 0.1;

  //reset hitpositions to ball spawn location
  hitPosX = pallo.xPos;
  hitPosY = pallo.yPos;
}

// StageChange system that sets stage depending on stageIndex
function setStage() {
  if (stages[stagesIndex] == 0) {
    //Level 1
    //Start of level 1

    initializeStage();

    stagePar = 1;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.3,
        (canvas.height / GRIDHEIGHT) * 2,
        (canvas.width / GRIDWIDTH) * 1.6,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.3,
        (canvas.height / GRIDHEIGHT) * 4,
        (canvas.width / GRIDWIDTH) * 1.6,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 2.3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.6,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2.3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.6,
        false,
        false
      )
    );

    //End of level 1
  } else if (stages[stagesIndex] == 1) {
    //Level 2
    //start of level 2

    initializeStage();

    stagePar = 3;

    reika.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.5;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    ////checkCollisionSets();
    //End of level 2
  } else if (stages[stagesIndex] == 2) {
    //Level 3
    //start of level 3
    initializeStage();

    stagePar = 2;

    reika.xPos = (canvas.width / GRIDWIDTH) * 0.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 0.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.5;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 3
  } else if (stages[stagesIndex] == 3) {
    //Level 4
    //start of level 4
    initializeStage();

    stagePar = 2;

    reika.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 0.5;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 4
  } else if (stages[stagesIndex] == 4) {
    //Level 5
    //start of level 5
    initializeStage();

    stagePar = 6;

    reika.xPos = (canvas.width / GRIDWIDTH) * 2;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 2;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 0.5;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 4,
        canvas.height * 0.033,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 5
  } else if (stages[stagesIndex] == 5) {
    //Level 6
    //start of level 6
    initializeStage();

    stagePar = 3;
    pallo.xPos = (canvas.width / GRIDWIDTH) * 0.5;
    pallo.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;

    reika.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 5.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 0.5;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3.2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.7,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.9,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.8,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.6,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.3,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.4,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.3,
        (canvas.height / GRIDHEIGHT) * 3.2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3.1,
        (canvas.height / GRIDHEIGHT) * 3.4,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.9,
        (canvas.height / GRIDHEIGHT) * 3.6,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.7,
        (canvas.height / GRIDHEIGHT) * 3.8,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 4,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 6
  } else if (stages[stagesIndex] == 6) {
    //Level 7
    //start of level 7
    initializeStage();

    stagePar = 2;
    pallo.xPos = (canvas.width / GRIDWIDTH) * 1.5;
    pallo.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;

    reika.xPos = (canvas.width / GRIDWIDTH) * 4.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.5;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 4.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.5;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 4.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 3.75,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2.25,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 0.5,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 7
  } else if (stages[stagesIndex] == 7) {
    //Level 8
    //start of level 8
    initializeStage();

    stagePar = 3;
    pallo.xPos = (canvas.width / GRIDWIDTH) * 0.5;
    pallo.yPos = (canvas.height / GRIDHEIGHT) * 5.6;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;

    reika.xPos = (canvas.width / GRIDWIDTH) * 3.5;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 5.6;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 3.5;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 5.6;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1.5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1.5,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1.5,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.5,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 1.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 8
  } else if (stages[stagesIndex] == 8) {
    //Level 9
    //start of level 9
    initializeStage();

    stagePar = 2;
    pallo.xPos = (canvas.width / GRIDWIDTH) * 3;
    pallo.yPos = (canvas.height / GRIDHEIGHT) * 5.7;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;

    reika.xPos = (canvas.width / GRIDWIDTH) * 3;
    reika.yPos = (canvas.height / GRIDHEIGHT) * 3;
    reika2.xPos = (canvas.width / GRIDWIDTH) * 3;
    reika2.yPos = (canvas.width / GRIDHEIGHT) * 3;

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5.5,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 3,
        (canvas.width / GRIDWIDTH) * 0.5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 5,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 2,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 2,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2.5,
        (canvas.height / GRIDHEIGHT) * 4,
        (canvas.width / GRIDWIDTH) * 1,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.8,
        (canvas.height / GRIDHEIGHT) * 0,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1.2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.8,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4.8,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2.6,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1.8,
        (canvas.height / GRIDHEIGHT) * 2.6,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 9
  } else if (stages[stagesIndex] == 9) {
    //Level 10
    //start of level 10
    initializeStage();

    stagePar = 2;
    pallo.xPos = (canvas.width / GRIDWIDTH) * 3;
    pallo.yPos = (canvas.height / GRIDHEIGHT) * 0.5;
    hitPosX = pallo.xPos;
    hitPosY = pallo.yPos;

    reika = new Hole(
      (canvas.width / GRIDWIDTH) * 0.5,
      (canvas.height / GRIDHEIGHT) * 1.5,
      15,
      "black"
    );
    reika2 = new Hole(
      (canvas.width / GRIDWIDTH) * 0.5,
      (canvas.height / GRIDWIDTH) * 1.5,
      5,
      "lightblue"
    );

    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0,
        (canvas.height / GRIDHEIGHT) * 1,
        (canvas.width / GRIDWIDTH) * 5,
        canvas.height * 0.033,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 1.1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 1,
        (canvas.height / GRIDHEIGHT) * 4,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 1,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 0.2,
        (canvas.height / GRIDHEIGHT) * 3,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 2,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 1.1,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 3,
        (canvas.height / GRIDHEIGHT) * 5,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 2.5,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 4,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 3,
        false,
        false
      )
    );
    walls.push(
      new Wall(
        (canvas.width / GRIDWIDTH) * 5,
        (canvas.height / GRIDHEIGHT) * 2,
        canvas.width * 0.033,
        (canvas.height / GRIDHEIGHT) * 4,
        false,
        false
      )
    );
    //checkCollisionSets();
    //End of level 10
    //The final level!!!
  }
  //checkCollisionSets();
}
function checkStageChange() {
  if (lastStage != stagesIndex) {
    stageChanged = true;
    horizontalVel = 0;
    verticalVel = 0;
    strokes = 1;
    stageNumber += 1;
    lastStage = stagesIndex;
    prevPar = stagePar;
    scoreTime = Date.now() + 5000;
    //removePoolsCollision();
    //removeSandPitsCollision();
    setStage();
  }
}
// function checkCollisionSets() {
//   if (!wallCollisionsSet) {
//     wallCollisionsSet = true;
//     for (let i = 0; i < walls.length; i++) {
//       wallCollisions.push(walls[i]);
//       //console.log(wallCollisions[i]);
//     }
//   }
//   if (!poolCollisionsSet) {
//     poolCollisionsSet = true;
//     for (let i = 0; i < pools.length; i++) {
//       poolCollisions.push(pools[i]);
//     }
//   }
//   if (!sandPitCollisionsSet) {
//     sandPitCollisionsSet = true;
//     for (let i = 0; i < sandPits.length; i++) {
//       sandPitCollisions.push(sandPits[i]);
//     }
//   }
// }
