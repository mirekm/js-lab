function $(id) { return document.getElementById(id); }
var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;
var canvas2d = $("output").getContext("2d");
$("output").width  = window.innerWidth; // in pixels
$("output").height = window.innerHeight; // in pixels
	var MAX_FRACTAL_DEPTH = 8;
	var DARK_VIOLET = "#54516E"; // 84, 81, 110
	var PINKY_VIOLET = "#E87877";

var MountainsGenerator = function() {
	return {
		heights: [],
		generate: function(width, height, depth) {
			/*
			for (var i = 0; i<width; i++)
			{
				// Let's start generation in the middle of the screen
				this.heights.push(height/2);
			}*/

			canvas2d.beginPath();
			this.mr(0, height/2, width-1, height/2, depth);
			//canvas2d.lineTo(width, height);
			//canvas2d.lineTo(0, height);
			//canvas2d.lineTo(0, height/2);
			canvas2d.stroke();
			//canvas2d.closePath();
			//canvas2d.fill();
			
		},
		mr: function(x1, y1, x2, y2, depth) {
			if (x1 == x2 || depth <= 0)
			{
				canvas2d.moveTo(x1, y1);
				canvas2d.lineTo(x2, y2);
				return;
			}

			var midx = (x1+x2)/2;
			var midy = (y1+y2)/2;

			var len = Math.floor(Math.sqrt ((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));

			if (this.rnd(2) == 0)
				midy -= this.rnd(x2-x1)/3;
			else
				midy += this.rnd(x2-x1)/3;

			if (this.heights != null)
				this.heights[midx] = midy;

			this.mr(x1, y1, midx, midy, depth-1);
			this.mr(midx, midy, x2, y2, depth-1);
		}, 
		rnd: function(limit) {
			return Math.floor(Math.random()*limit);
		}
	}
};

var sky = canvas2d.createLinearGradient(0, 0, 0, MAX_HEIGHT);
sky.addColorStop(0, DARK_VIOLET);
sky.addColorStop(.7, PINKY_VIOLET);
sky.addColorStop(1, "#ECC800");
canvas2d.fillStyle = sky;
canvas2d.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

var dup = MountainsGenerator();

for (var i = 0; i < 3; i++)
{
	canvas2d.lineWidth = 1;
	canvas2d.strokeStyle = "rgb(" + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + ")";
	dup.generate(MAX_WIDTH, MAX_HEIGHT, 5+Math.random()*4);
}
