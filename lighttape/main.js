function $(id) { return document.getElementById(id); }

var TapeGenerator = function() {
	var canvas2d = $("output").getContext("2d");
	$("output").width  = window.innerWidth; // in pixels
	$("output").height = window.innerHeight; // in pixels

	canvas2d.lineWidth = 1;
	
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	var Particle = function (startX, startY) {
		var sx, sy, vx, vy;
		sx = startX;
		sy = startY;
		vx = vy = 0;
		return {sx:sx, sy:sy, vx: vx, vy:vy};
	};

	var Tape = function (pCount, color, startX, startY)
	{
		var obj = {};
		var particlesCount = pCount;
		var colorValue = color;
		var particles = [];

		var randomMod = 0;
		var thicknessPhase = Math.random() * Math.PI;

		obj.create = function()
		{
			var particle;
			for( var i = 0 ; i < particlesCount ; i++ )
			{
				particle = Particle( startX, startY );
				particles.push( particle );
			}
		}

		obj.render = function()
		{
			var ts = Math.sin( thicknessPhase += .002 );
		
			canvas2d.lineWidth = ts * 2;
			canvas2d.strokeStyle = colorValue;
			canvas2d.globalAlpha = .005 + ts / 24;
		
			var pa;
			var pb = particles[0];
		
			var x0;
			var y0;
			var i = particlesCount;

			//canvas2d.clearRect(0, 0, WIDTH, HEIGHT);
			canvas2d.beginPath();
			while( --i > -1 )
			{
				pa = particles[i];
				
				//pa.vx *= .9992;
				//pa.vy *= .9992;
			
				pa.vx += ( startX - pa.sx ) / 84000;
				pa.vy += ( startY - pa.sy ) / 84000;
			
				pa.sx += pa.vx;
				pa.sy += pa.vy;

				if( ( randomMod % particlesCount ) == i )
				{
					pa.vx += Math.random()/8 - .0625;
					pa.vy += Math.random()/8 - .0625;
				}
				
				if( i == particlesCount - 1 )
				{
					x0 = ( pa.sx + pb.sx ) / 2;
					y0 = ( pa.sy + pb.sy ) / 2;
					canvas2d.moveTo( x0, y0);
				}
				else
				{
					canvas2d.quadraticCurveTo( pb.sx, pb.sy, ( pa.sx + pb.sx ) / 2, ( pa.sy + pb.sy ) / 2 );
				}
			
				pb = pa;
			}
		
			canvas2d.quadraticCurveTo( pa.sx, pa.sy, x0, y0 );
			canvas2d.stroke();
			canvas2d.closePath();
			randomMod++;
		}
	
		obj.create();

		return obj;
	};
	var W3 = WIDTH / 3;
	var t1 = Tape(12, "#69AD44", W3/2, HEIGHT/2);
	var t2 = Tape(8, "#4CA0D9", W3 + W3/2, HEIGHT/2);
	var t3 = Tape(8, "#C31984", W3*2 + W3/2, HEIGHT/2);

	setInterval(function() {
		t1.render();
		t2.render();
		t3.render();
	}, 10);
	
};

var dup = TapeGenerator();
