const SIZE=1000;
let ballsize=0.004;
let holesize=0.0045;
let startx = 0.3;
let starty = 0.1;
let endx = 0.7;
let endy = 0.85;

function main(){
	let canvas = document.getElementById("myCanvas")
	let ctx=canvas.getContext("2d");
	
	canvas.width=SIZE;
	canvas.height=SIZE;
	
	ctx.scale(SIZE,SIZE);

	pallo = new Ball([startx, starty], ballsize);
	reika = new Hole([endx, endy], holesize);
	
	drawObstacles();
	drawScene();
	animate();	
}

function animate(){

	drawScene();
	window.requestAnimationFrame(animate);
}

function drawScene(){
	
	let canvas = document.getElementById("myCanvas")
	let ctx=canvas.getContext("2d");
	
	drawBackground(ctx);

	pallo.draw(ctx);
	reika.draw(ctx); 
}

function drawBackground(ctx){
	
	ctx.beginPath();
	ctx.fillStyle="rgba(0,200,0,1)";
	ctx.rect(0,0,1,1);
	ctx.fill();
}

class Ball{
	constructor(loc, scale){
		this.location=loc;
		this.scale=scale;
	}
	draw(ctx){
		ctx.beginPath();
    
		ctx.save();
		ctx.translate(this.location[0],this.location[1]);
		ctx.scale(this.scale,this.scale);
		ctx.lineWidth=0.4;
		
		ctx.fillStyle="lightgray";
		ctx.arc(0, 0, 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}

class Hole{
	constructor(loc, scale){
		this.location=loc;
		this.scale=scale;
	}
	draw(ctx){
		ctx.beginPath();
	
		ctx.save();
		ctx.translate(this.location[0],this.location[1]);
		ctx.scale(this.scale,this.scale);
		ctx.lineWidth=0.4;
		
		ctx.fillStyle="black";
		ctx.arc(0, 0, 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}
