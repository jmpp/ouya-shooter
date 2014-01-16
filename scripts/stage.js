/**
 * stage.js
**/

define(['canvas'], function(canvas) {
	
	function Stage() {
		// Etoiles
		this.stars = [];
		this.overallSpeed = 0;
		this.overallDirection = 0;

		this.init = function() {
			var i = 50,	direction = rand(0, Math.PI*2), radius, speed;
			while(i--) {
				radius = rand(2,5);
				speed = .5 * radius;

				this.stars.push({
					x : rand(0, canvas.canvas.width),
					y : rand(0, canvas.canvas.height),
					radius : radius,
					speed : speed,
					direction : direction
				});
			}
		};

		this.update = function() {
			var s;
			for (var i = 0, c = this.stars.length; i < c; i++) {
				s = this.stars[i];

				s.x += Math.cos(this.overallDirection) * (s.speed*this.overallSpeed);
				s.y += Math.sin(this.overallDirection) * (s.speed*this.overallSpeed);

				if (s.x - s.radius > canvas.canvas.width)	s.x = - s.radius;
				if (s.y - s.radius > canvas.canvas.height)	s.y = - s.radius;
				if (s.x + s.radius < 0)						s.x = canvas.canvas.width + s.radius;
				if (s.y + s.radius < 0)						s.y = canvas.canvas.height + s.radius;
			}
		};

		this.updateBehavior = function( direction, speed ) {
			this.overallDirection = direction;
			this.overallSpeed = speed;
		};

		this.render = function() {
			canvas.ctx.fillStyle = '#fff';

			var s;
			for (var i = 0, c = this.stars.length; i < c; i++) {
				s = this.stars[i];

				canvas.ctx.beginPath();
				canvas.ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2, true);
				canvas.ctx.fill();
				canvas.ctx.closePath();
			}

			canvas.ctx.shadowBlur = 0;
		};
	}

	return new Stage();

});