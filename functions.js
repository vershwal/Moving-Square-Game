
var canvas = document.getElementById("myCanvas");
var area = canvas.getContext("2d");
var score = 0;
var finalScore;
var mysquare;
var mywalls = [];
area.fillStyle = "#ffffff";
area.fillRect(0,0,600,400);
area.fillStyle = "#000000";
area.font = "20px Arial";
area.fillText("Score : " + score,450,40); 
start();
var flag = 1;
var frameNo = 0;
setInterval(updateArea, 20);
setInterval(updateScore, 200);

function updateScore() {
	score += 10;
}

function start() {

	mysquare = new component(30, 30, "red", 10, 175);
	//mywalls = new component(10, 200, "green", 100, 75);
}

function clear() {

	area.clearRect(0, 0, 600, 400);
	area.fillStyle = "#ffffff";
	area.fillRect(0,0,600,400);
	area.fillStyle = "#000000";
	area.font = "20px Arial";
	area.fillText("Score : " + score,450,40);
}

function stop() {

	area.clearRect(0, 0, 600, 400);
	area.fillStyle = "red";
	area.fillRect(0,0,600,400);
	area.fillStyle = "#000000";
	area.font = "50px Arial";
	area.fillText("GAMEOVER!!",145,160);
	area.fillText("Score : " + finalScore,180,230);
}

function component(width, height, color, x, y) {
	this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.posX = 0;
    this.posY = 0;
    this.update = function() {
	    var comp = canvas.getContext("2d");
	    comp.fillStyle = color;
	    comp.fillRect(this.x, this.y, this.width, this.height);
	}
	this.position = function() {
        this.x += this.posX;
        this.y += this.posY;
    } 
    this.hit = function(obj2) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = obj2.x;
        var otherright = obj2.x + (obj2.width);
        var othertop = obj2.y;
        var otherbottom = obj2.y + (obj2.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}

function moveup() {
    mysquare.posY -= 1;
}

function movedown() {
    mysquare.posY += 1;
}

function moveleft() {
    mysquare.posX -= 1;
}

function moveright() {
    mysquare.posX += 1;
}

document.onkeydown = function (e) {
    var keyCode = e.keyCode;
    if(keyCode == 38) {
        moveup();
    }
    if(keyCode == 40) {
        movedown();
    }
};

function updateArea() {

	var x, y;
    for (i = 0; i < mywalls.length; i += 1) {
        if (mysquare.hit(mywalls[i])) {
            if(flag) {
				flag = 0;
				finalScore = score;
			}
			stop();
			return;
	    }
    }
    clear();
    frameNo += 1;
    if (frameNo == 1 || ((frameNo/150)% 1) == 0) {
    	x = 600;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        mywalls.push(new component(10, height, "green", x, 0));
        mywalls.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < mywalls.length; i += 1) {
        mywalls[i].x += -1;
        mywalls[i].update();
    }
    mysquare.position();
    mysquare.update();
}