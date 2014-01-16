/**
 * projectiles.js
**/

define(['canvas', 'IM'], function(canvas, IM) {

	function Projectile( params ) {
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.direction = params.direction || 0;
		this.speed = 25;
		this.img = IM.getInstance('assets/images/shot');
		this.width = this.img.width;
		this.height = this.img.height;
	}
	
	function ProjectilesManager() {
		this.projectilesList = [];

		this.add = function(x, y, direction) {
			this.projectilesList.push(new Projectile({
				x : x,
				y : y,
				direction : direction
			}));
		};

		this.update = function() {
			// Parcours du tableau de projectiles
			var p;
			for (var i = 0, c = this.projectilesList.length; i < c; i++) {
				p = this.projectilesList[i];

				p.x += Math.cos(p.direction) * p.speed;
				p.y += Math.sin(p.direction) * p.speed;

				// Si les projectiles sortent de l'écran, on les kill
				if (p.x > canvas.canvas.width ||
					p.x + p.width < 0 ||
					p.y > canvas.canvas.height ||
					p.y + p.height < 0) {
					this.projectilesList.splice(i, 1)
					c--;
				}
			}
		};

		this.checkCollisionWith = function(obj) {
			// En prenant en compte le fait que obj est un objet contenant au moins les propriétés
			// x, y, width, height

			var p;
			for (var i = 0, c = this.projectilesList.length; i < c; i++) {
				p = this.projectilesList[i];

				// Si on détecte une collision avec un projectile, on
				// renvoie ce projectile ...
				if (collide(obj, p))
					return p;
			}
			// ... sinon, on renvoie false
			return false;
		};

		this.render = function() {
			// Parcours du tableau de projectiles
			var p;
			for (var i = 0, c = this.projectilesList.length; i < c; i++) {
				p = this.projectilesList[i];

				// console.log(p);
				// break;

				// canvas.ctx.fillRect(p.x, p.y, p.width, p.height);
				canvas.ctx.save();
				canvas.ctx.translate(p.x, p.y);
				canvas.ctx.rotate(p.direction);
				canvas.ctx.drawImage(p.img.data, 0, 0);
				canvas.ctx.restore();
			}
		};

		this.remove = function(obj) {
			var p;
			for (var i = 0, c = this.projectilesList.length; i < c; i++) {
				p = this.projectilesList[i];

				if (p === obj) {
					this.projectilesList.splice(i, 1);
					break;
				}
			}
		};
	}

	return new ProjectilesManager();

});
