define(['canvas', 'IM', 'IIG'], function(canvas, IM, IIG) {
	function Explosion( params ) {
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.img = IM.getInstance(params.instanceName);
		this.width = this.img.width;
		this.height = this.img.height;

		this.img.animation = new IIG.Animation({
			sWidth : params.sWidth,
			sHeight : params.sHeight,
			sy : 0,
			iterations : params.iterations,
			animByFrame : params.animByFrame
		});
	};

	function ExplosionManager() {

		this.explosionsList = [];

		this.add = function(x, y, type) {
			// Instantiation du nouvel ennemi
			var params = {};
			switch (type) {
				case 'enemy':
					params.instanceName = 'assets/images/explosion';
					params.sWidth = 128;
					params.sHeight = 128;
					params.animByFrame = 1;
					params.iterations = 2;
					break;
				case 'playerCollision':
					params.instanceName = 'assets/images/collision';
					params.sWidth = 60;
					params.sHeight = 60;
					params.animByFrame = 2;
					params.iterations = 1;
					break;
				default:
					throw new Error('Explosion type isn\'t valid !');
					return false;
					break;
			}

			var explosion = new Explosion(params);

			explosion.x = x - explosion.img.animation.sWidth*.5;
			explosion.y = y - explosion.img.animation.sHeight*.5;

			this.explosionsList.push(explosion);
			// console.log('pushed new el');
		};

		this.update = function() {
			// Parcours du tableau d'explosions
			var e;
			for (var i = 0, c = this.explosionsList.length; i < c; i++) {
				e = this.explosionsList[i];

				// i === 0 && console.log(e.img);

				if (e.img.animationDestroyed) {
					this.explosionsList.splice(i, 1);
					c--;
				}
			}

			// console.log(this.explosionsList.length);
		};

		this.render = function() {
			// Parcours du tableau d'explosions
			var e;
			for (var i = 0, c = this.explosionsList.length; i < c; i++) {
				e = this.explosionsList[i];

				IM.drawImage(canvas.ctx, e.img, e.x, e.y);
			}
		};

	};

	return new ExplosionManager();
});