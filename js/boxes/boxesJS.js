var canvas = document.getElementById('game');;
var context = canvas.getContext('2d');;
var width = canvas.width;;
var height = canvas.height;;
var box_size = 80;

var nBoxes = 0;
var lastBox = 0;
var interval = Math.floor(Math.random()*20);

var cross_image;
var bg_image;
var box_image;
var nuke_image;
var blast_image;

var shoot_sound;
var wood_sound;
var blast_sound;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

canvas.addEventListener('mousemove', crossHandler);
canvas.addEventListener('mousedown', clickHandler);
canvas.style.cursor = "none";

var cross = {
	w: 70,	//should be an even value
	h: 70,	//should be an even value
	x: Math.floor(width/2),
	y: Math.floor(height/2)
};

var boxes = [];
var nukes = [];

var score = {
	shots: 0,
	hits: 0,
	misses: 0,
	accuracy: 0,
	points: 0
};

var game = {
	state: "start"
};

var spPress = false;
var entPress = false;
var won = false;
var lost = false;
var limit = 50;
var atOnce = 5;
var color = "white";

var textOverlay = {
	counter: 0,
	title: "Shoot the BOXES",
	score: "",
	subtitle: "Press SPACE to start the game"
};

function updateGameStatus(){
	if((game.state == 'start') && spPress){
		game.state = 'playing';
		textOverlay.counter = -1;
	}
	
	if((game.state == 'end') && entPress){
		game.state = 'start';
		restart();
	}
	
	if((game.state == 'end') && (lost)){
		textOverlay.title = "You hit a NUKE!";
		textOverlay.score = "Your Score: "+score.points;
		textOverlay.subtitle = "Press ENTER to play again";
		textOverlay.counter = 0;	
		color = "red";
		lost = false;	
	}
	
	if((game.state == 'playing') && (nBoxes >= limit) && (boxes.length == 0)){
		game.state = "end";
		calcFinalScore();
		won = true;
	}
	
	if((game.state == 'end') && (won)){
		textOverlay.title = "Game Finished!";
		textOverlay.score = "Your Score: "+score.points;
		textOverlay.subtitle = "Press ENTER to play again";
		textOverlay.counter = 0;
		color = "orange";
		won = false;	
	}
	
	if(textOverlay.counter >= 0 ) {
		textOverlay.counter++;
	}
}

function restart(){
	textOverlay.counter = 0;
	textOverlay.title = "Shoot the BOXES";
	textOverlay.score = "";
	textOverlay.subtitle =  "Press SPACE to start the game";
	nBoxes = 0;
	boxes = [];
	nukes = [];
	score.accuracy = 0;
	score.shots = 0;
	score.hits = 0;
	score.misses = 0;
	lastBox = 0;
	incrementScores();
	drawBackground();
	
}

function addKeyboardEvents() {
	addEvent(document, "keydown", function(e) {
		if(e.keyCode == 32){
			spPress = true;
		}
		else if(e.keyCode == 13){
			entPress = true;
		}		
	});

	addEvent(document, "keyup", function(e) {
		if(e.keyCode == 32){
			spPress = false;
		}
		else if(e.keyCode == 13){
			entPress = false;
		}
	});
}

function addEvent(node, name, func) {
	if(node.addEventListener) {
		node.addEventListener(name, func, false);
	} else if(node.attachEvent) {
		node.attachEvent(name, func);
	}
}

function incrementScores() {
	
	if(score.shots != 0){
		score.accuracy = Math.floor((score.hits / score.shots) * 100);
	}	
	
	document.getElementById('shots').innerHTML = score.shots;
	document.getElementById('hits').innerHTML = score.hits;
	document.getElementById('misses').innerHTML = score.misses;
	document.getElementById('acc').innerHTML = score.accuracy + "%";
}

function loadResources(){	
	bg_image = new Image();
	bg_image.src = '../images/boxes/background.jpg'
	
	cross_image = new Image();
	cross_image.src = '../images/boxes/cross.png';
	
	box_image = new Image();
	box_image.src = '../images/boxes/box.png';
	
	nuke_image = new Image();
	nuke_image.src = '../images/boxes/nuke.png';
	
	blast_image = new Image();
	blast_image.src = '../images/boxes/blast.png';
	
	shoot_sound = document.createElement("audio");
	document.body.appendChild(shoot_sound);
	shoot_sound.setAttribute("src", "../sounds/boxes/shoot1_sound.wav");
	
	wood_sound = document.createElement("audio");
	document.body.appendChild(wood_sound);
	wood_sound.setAttribute("src", "../sounds/boxes/wood_sound.wav");
	
	blast_sound = document.createElement("audio");
	document.body.appendChild(blast_sound);
	blast_sound.setAttribute("src", "../sounds/boxes/blast_sound.wav");
}

function drawBackground(){
	context.drawImage(bg_image,0,0,width,height);
}

function drawCross(){
	var x = cross.x - (cross.w/2);
	var y = cross.y - (cross.h/2);
	
	if(x<0){
		x = 0;
	}else if(x>(width-cross.w)){
		x = width-cross.w;
	}
	
	if(y<0){
		y = 0;
	}else if(y>(height-cross.h)){
		y = height-cross.h;
	}
	
	context.drawImage(cross_image,x,y,cross.w,cross.h);
}

function crossHandler(event){
	if(game.state == "playing"){
		cross.x = event.clientX- canvas.offsetLeft;
		cross.y = event.clientY- canvas.offsetTop;
	}	
}

function clickHandler(event){
	
	if(game.state == "playing"){
		var x = event.clientX- canvas.offsetLeft;
		var y = event.clientY- canvas.offsetTop;

		score.shots++;
		var hitB = checkBoxHit(x,y);
		var hitN = checkNukeHit(x,y);

		if(hitB != -1) {
			wood_sound.play();
			boxes[hitB].counter = 0;
			score.hits++;
		} else if(hitN != -1) {
			//context.drawImage(blast_image,nukes[hitN].x,nukes[hitN].y,100,100);
			blast_sound.play();
			nukes[hitN].counter = 0;
			game.state = "nuke";
		} else {
			shoot_sound.play();
			score.misses++;
		}
	}	
}

function checkBoxHit(x,y){
	for(var iter in boxes){
		var box = boxes[iter];
		
		if((x >= box.x) && (x <= (box.x+box_size))){
			if((y >= box.y) && (y <= (box.y+box_size))){
				//alert(iter);
				return iter;
			}
		}
	}
	
	return -1;
}

function checkNukeHit(x,y){
	for(var iter in nukes){
		var nuke = nukes[iter];
		
		if((x >= nuke.x) && (x <= (nuke.x+box_size))){
			if((y >= nuke.y) && (y <= (nuke.y+box_size))){
				//alert(iter);
				return iter;
			}
		}
	}
	
	return -1;
}

function drawBox(){
	
	for(var iter in boxes){
		var box = boxes[iter];
		context.drawImage(box_image,box.x,box.y,box_size,box_size);
	}
	
	for(var iter in nukes){
		var nuke = nukes[iter];
		context.drawImage(nuke_image,nuke.x,nuke.y,box_size,box_size);
	}
}

function addBox(){
	if(boxes.length >= atOnce){
		return;
	}
	
	if(nBoxes >= limit){
		return;
	}
	
	var boxX = Math.floor(Math.random() * (width - box_size));
	var boxY = Math.floor(Math.random() * (height - box_size));
	var c = Math.floor(Math.random() * 200);
	
	if(checkOverlap(boxX,boxY)){
		return;
	}
	
	var box = {
		x: boxX,
		y: boxY,
		counter: 200 + c		
	};
	
	boxes.push(box);
	nBoxes++;
}

function updateBox(){
	for(var iter in boxes){
		boxes[iter].counter--;		
	}
	
	boxes = boxes.filter(function(event) {
			if(event && event.counter > 0) {
				return true;
			}
			return false;
		});
		
	for(var iter in nukes){
		nukes[iter].counter--;		
	}
	
	nukes = nukes.filter(function(event) {
			if(event && event.counter > 0) {
				return true;
			}
			return false;
		});
}

function checkOverlap(x,y){
	for(var iter in boxes){
		var box = boxes[iter];
		
		if(((x >= box.x) && (x <= (box.x+box_size))) || (((x+box_size) >= box.x) && ((x+box_size) <= (box.x+box_size)))){
			if(((y >= box.y) && (y <= (box.y+box_size))) || (((y+box_size) >= box.y) && ((y+box_size) <= (box.y+box_size)))){
				return true;
			}
		}
	}
	
	for(var iter in nukes){
		var nuke = nukes[iter];
		
		if(((x >= nuke.x) && (x <= (nuke.x+box_size))) || (((x+box_size) >= nuke.x) && ((x+box_size) <= (nuke.x+box_size)))){
			if(((y >= nuke.y) && (y <= (nuke.y+box_size))) || (((y+box_size) >= nuke.y) && ((y+box_size) <= (nuke.y+box_size)))){
				return true;
			}
		}
	}
	
	return false;
}

function addNuke(){
	if(nukes.length >= Math.floor(atOnce/2)){
		return;
	}
		
	if((nBoxes-lastBox) >= interval){
		var nukeX = Math.floor(Math.random() * (width - box_size));
		var nukeY = Math.floor(Math.random() * (height - box_size));
		var c = Math.floor(Math.random() * 200);

		if(checkOverlap(nukeX,nukeY)) {
			return;
		}

		var nuke = {
			x: nukeX,
			y: nukeY,
			counter: 200 + c
		};

		nukes.push(nuke);
		lastBox = nBoxes;
		interval = Math.floor(Math.random()*10);
	}		
}

function drawTextOverlay() {
	if(textOverlay.counter == -1) {
		return;
	}

	var alpha = textOverlay.counter / 50.0;

	if(alpha > 1 ) {
		alpha = 1;
	}

	context.globalAlpha = alpha;
	context.save();
	
	if(game.state == "start") {		
		context.fillStyle = "white";
		context.font = "Bold 60pt Arial";
		context.fillText(textOverlay.title, 70, 200);
		context.font = "20pt Helvectica";
		context.fillText(textOverlay.subtitle, 240, 350);
	}

	if(game.state == "end") {		
		context.fillStyle = color;
		context.font = "Bold 60pt Arial";
		context.fillText(textOverlay.title, 90, 200);
		context.fillStyle = "yellow";
		context.font = "Bold 28pt Arial";
		context.fillText(textOverlay.score, 250, 260);
		context.fillStyle = "white";
		context.font = "20pt Helvectica";
		context.fillText(textOverlay.subtitle, 245, 350);
	}

	context.restore();
}

function calcFinalScore(){
	score.points = Math.ceil(score.hits * 20 * score.accuracy / 100);
}

function gameLoop(){
	updateGameStatus();	
	drawBackground();
	drawTextOverlay();
	if(game.state == 'playing'){
		incrementScores();
			
		updateBox();
		addBox();
		addNuke();
		drawBox();
		drawCross();
	}	
	
	if(game.state == "nuke"){
		context.drawImage(blast_image,cross.x-100,cross.y-100,200,200);
		for(var i=0;i<5000;i++){						
		}
		game.state = 'end';
		calcFinalScore();
		lost = true;
	}
    	
	requestAnimationFrame(gameLoop);
}
addKeyboardEvents();
loadResources();
requestAnimationFrame(gameLoop);