/*!
 * 9-tile Quilt Generator (inspired by outstanding Jared Tarball work)
 *
 * Copyright (c) 2010 Mirek Mencel (http://mirumee.com)
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3, 29 June 2007
 */

var QuiltGenerator = function() {

function $(id) { return document.getElementById(id); }

var canvas2d = $("output").getContext("2d");
$("output").width  = window.innerWidth; // in pixels
$("output").height = window.innerHeight; // in pixels
var color = "#333333";
var patt1 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y-h2);
	c.lineTo(x+w2, y-h2);
	c.lineTo(x+w2, y+h2);
	c.lineTo(x-w2, y+h2);
	c.closePath();
	c.fill();
}

var patt2 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y-h2);
	c.lineTo(x+w2, y-h2);
	c.lineTo(x-w2, y+h2);
	c.closePath();
	c.fill();
}

var patt3 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x, y-h2);
	c.lineTo(x+w2, y+h2);
	c.lineTo(x-w2, y+h2);
	c.closePath();
	c.fill();
}

var patt4 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y-h2);
	c.lineTo(x, y-h2);
	c.lineTo(x, y+h2);
	c.lineTo(x-w2, y+h2);
	c.closePath();
	c.fill();
}

var patt5 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x, y-h2);
	c.lineTo(x+w2, y);
	c.lineTo(x, y+h2);
	c.lineTo(x-w2, y);
	c.closePath();
	c.fill();
}

var patt6 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y-h2);
	c.lineTo(x+w2, y);
	c.lineTo(x+w2, y+h2);
	c.lineTo(x, y+h2);
	c.closePath();
	c.fill();
}

var patt7 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x, y-h2);
	c.lineTo(x-w2, y+h2);
	c.lineTo(x, y+h2);
	c.lineTo(x-w2/2, y);
	c.lineTo(x+w2/2, y);
	c.closePath();
	c.fill();
	c.beginPath();
	c.moveTo(x+w2/2, y);
	c.lineTo(x, y+h2);
	c.lineTo(x+w2, y+h2);
	c.closePath();
	c.fill();
}

var patt8 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y-h2);
	c.lineTo(x+w2, y);
	c.lineTo(x, y+h2);
	c.closePath();
	c.fill();
}

var patt9 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2/2, y-h2/2);
	c.lineTo(x+w2/2, y-h2/2);
	c.lineTo(x+w2/2, y+h2/2);
	c.lineTo(x-w2/2, y+h2/2);
	c.closePath();
	c.fill();
}

var patt10 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y+h2);
	c.lineTo(x-w2, y);
	c.lineTo(x, y);
	c.lineTo(x, y-h2);
	c.lineTo(x+w2, y-h2);
	c.closePath();
	c.fill();
}

var patt11 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y-h2);
	c.lineTo(x, y-h2);
	c.lineTo(x, y);
	c.lineTo(x-w2, y);
	c.closePath();
	c.fill();
}

var patt12 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y);
	c.lineTo(x+w2, y);
	c.lineTo(x, y+h2);
	c.closePath();
	c.fill();
}

var patt13 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x+w2, y+h2);
	c.lineTo(x-w2, y+h2);
	c.closePath();
	c.fill();
}

var patt14 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x, y-h2);
	c.lineTo(x-w2, y);
	c.closePath();
	c.fill();
}

var patt15 = function(c, x, y, w, h) {
	var w2 = w/2;
	var h2 = h/2;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x-w2, y-w2);
	c.lineTo(x, y-h2);
	c.lineTo(x-w2, y);
	c.closePath();
	c.fill();
}

var patt16 = function() {}

var tileW = 90/3;

var patterns = [patt2, patt3, patt4, patt6, patt7, patt8,
	patt10, patt11, patt12, patt13, patt14, patt15];
var origins = [patt1, patt5, patt9, patt16];

var drawTile = function(x, y, w, h, center, pattern1, pattern2) {
	var w3 = w/3;
	var h3 = h/3;
	/*
	color = "rgb(" + Math.floor(Math.random()*255) + "," + 
				100 + Math.floor(Math.random()*100) + "," + 
				100 + Math.floor(Math.random()*100) + ")";
	*/
	center(canvas2d, x, y, w3, h3);
	
	// Corners
	/*
	color = "rgb(" + Math.floor(Math.random()*150) + "," + 
				200 + "," + 
				200 + ")";
	*/
			
	pattern1(canvas2d, x-w3, y-w3, w3, h3);
	canvas2d.save();
	canvas2d.translate(x+w3, y-h3);
	canvas2d.rotate(Math.PI/2);
	pattern1(canvas2d, 0, 0, w3, h3);
	canvas2d.restore();
	canvas2d.save();
	canvas2d.translate(x+w3, y+h3);
	canvas2d.rotate(Math.PI);
	pattern1(canvas2d, 0, 0, w3, h3);
	canvas2d.restore();
	canvas2d.save();
	canvas2d.translate(x-w3, y+h3);
	canvas2d.rotate(3*Math.PI/2);
	pattern1(canvas2d, 0, 0, w3, h3);
	canvas2d.restore();
	
	// Walls
	pattern2(canvas2d, x, y-w3, w3, h3);
	canvas2d.save();
	canvas2d.translate(x+w3, y);
	canvas2d.rotate(Math.PI/2);
	pattern2(canvas2d, 0, 0, w3, h3);
	canvas2d.restore();
	canvas2d.save();
	canvas2d.translate(x, y+h3);
	canvas2d.rotate(Math.PI);
	pattern2(canvas2d, 0, 0, w3, h3);
	canvas2d.restore();
	canvas2d.save();
	canvas2d.translate(x-w3, y);
	canvas2d.rotate(3*Math.PI/2);
	pattern2(canvas2d, 0, 0, w3, h3);
	canvas2d.restore();
};

var tileW = 15;
var tileH = 15;
var gap = 2;
var c = 80;//Math.floor(canvas2d.width/tileW);
var r = 80;//Math.floor(canvas2d.height/tileH);

var generateRandomQuilt = function() {
	for (var i=0; i<c; i++)
	{
		for (var j=0; j<r; j++)
		{
			var centerIndex = Math.floor(Math.random()*4);
			var patternIndex = Math.floor(Math.random()*12);
			var pattern2Index = Math.floor(Math.random()*12);
			drawTile(tileW/2 + (tileW+gap)*i, tileH/2 + (tileH+gap)*j, tileW, tileH, origins[centerIndex], patterns[patternIndex], patterns[pattern2Index]);
		}
	}

};

var generateRegularQuilt = function() {
	var centerIndex = Math.floor(Math.random()*4);
	var patternIndex = Math.floor(Math.random()*12);
	var pattern2Index = Math.floor(Math.random()*12);
	gap = 0;
	for (var i=0; i<c; i++)
	{
		for (var j=0; j<r; j++)
		{
			drawTile(tileW/2 + (tileW+gap)*i, tileH/2 + (tileH+gap)*j, tileW, tileH, origins[centerIndex], patterns[patternIndex], patterns[pattern2Index]);
		}
	}
};
generateRandomQuilt();

};

var dup = QuiltGenerator();
//dup.generateRandomQuilt();
