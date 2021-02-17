const SIZE=1000;
let canvas, ctx, ball, gravity, friction,hole2;
function main(){
	drawScene();
}

function drawScene(){
	canvas = document.getElementById("myCanvas")
	ctx=canvas.getContext("2d");
	
	canvas.width=SIZE;
	canvas.height=SIZE;
	
	gravity = 0;
  friction = 0.98;
  
  
  ball = {
    bounce: 1, // energy lost on bounce, 0.8 = 20% energy lost
    radius: 40,
    x: canvas.width * 0.5,
    y: canvas.height * 0.5,
    velX: (Math.random() * 5 + 5) * (Math.floor(Math.random() * 2) || -1),
    velY: (Math.random() * 5 + 5) * (Math.floor(Math.random() * 2) || -1),
    color: 'red'
    }
  hole = {
    radius: 100,
    x: canvas.width * 0.5,
    y: canvas.height * 0.5,
    color: 'black'
  }
  hole2 = {
    radius: 1,
    x: canvas.width * 0.5,
    y: canvas.height * 0.5,
    color: 'black'
  }
  
  //dx = ball.x - hole2.x;
  //dy = ball.y - hole2.y;
  //distance = ball.radius + hole2.radius;
  window.requestAnimationFrame(update);
}



  // draws stuff to the screen
  // allows us to separate calculations and drawing
  function draw () {
    // clear the canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
	  ctx.fillStyle="lightblue";
	  ctx.rect(0,0,SIZE,SIZE*1);
	  ctx.fill();
    //draw the hole
    ctx.beginPath();
    ctx.fillStyle= hole.color;
    ctx.arc(
      hole.x, hole.y,
      hole.radius,
      0, Math.PI * 2
    )
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle= hole2.color;
    ctx.arc(
      hole2.x, hole2.y,
      hole2.radius,
      0, Math.PI * 2
    )
    ctx.fill();
    // draw the ball (only object in this scene)
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(
      ball.x, ball.y,
      ball.radius,
      0, Math.PI * 2
    )
    ctx.fill();
  }
  function score() {
    ctx.font = "20px Georgia";
    ctx.fillText("Score!", canvas.width * 0.5, canvas.height * 0.5);
  }

  // the main piece of the loop
  // runs everything
  function update () {
    // queue the next update
    window.requestAnimationFrame(update)

    // logic goes here

    // bottom bound / floor
    if (ball.y + ball.radius >= canvas.height) {
      ball.velY *= -ball.bounce
      ball.y = canvas.height - ball.radius
      ball.velX *= friction
    }
    // top bound / ceiling
    if (ball.y - ball.radius <= 0) {
      ball.velY *= -ball.bounce
      ball.y = ball.radius
      ball.velX *= friction
    }

    // left bound
    if (ball.x - ball.radius <= 0) {
      ball.velX *= -ball.bounce
      ball.x = ball.radius
    }
    // right bound
    if (ball.x + ball.radius >= canvas.width) {
      ball.velX *= -ball.bounce
      ball.x = canvas.width - ball.radius
    }
    //if ball goes in the hole
    var dx = ball.x - hole2.x;
    var dy = ball.y - hole2.y;
    var dist = Math.sqrt (dx * dx + dy * dy);
    if (dist < ball.radius + hole2.radius)  {
      //canvas.removeObject(ball);
      //score();
      //ball.color = 'blue';
      //ball.visible = false;
      ball.radius = 30;
      ctx.font = "32px Georgia";
      ctx.fillText("Score!", canvas.width * 0.2, canvas.height * 0.5);
      var x = document.getElementById('ball');
      x.style.opacity = "0.0";
    }

    // reset insignificant amounts to 0
    if (ball.velX < 0.01 && ball.velX > -0.01) {
      ball.velX = 0
    }
    if (ball.velY < 0.01 && ball.velY > -0.01) {
      ball.velY = 0
    }

    // add gravity
    ball.velY += gravity

    // update ball position
    ball.x += ball.velX
    ball.y += ball.velY

    // draw after logic/calculations
    draw()
  }

  // start our code once the page has loaded
  document.addEventListener('DOMContentLoaded', drawScene)
  


