/**
 * enemy.js
**/

define(['config', 'IM', 'canvas'], function(config, IM, canvas) {
	
	function Enemy( params ) {
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.direction = params.direction || 0;
		this.speedX = rand(config.levels[config.LEVEL].enemy_min_speed, config.levels[config.LEVEL].enemy_max_speed);
		this.speedY = rand(config.levels[config.LEVEL].enemy_min_speed, config.levels[config.LEVEL].enemy_max_speed);
		this.img = IM.getInstance('assets/images/enemy');
		this.width = this.img.width;
		this.height = this.img.height;
	};

	function EnemyManager() {

		this.enemiesList = [];
		this.mainTarget = { x : 0, y : 0 };

		this.init = function() {
			var i = config.levels[config.LEVEL].enemies_onscreen;
			while (i-- > 0) {
				this.add();
			}
		};

		this.add = function() {
			// Instantiation du nouvel ennemi
			var enemy = new Enemy({});

			this.initPosition(enemy);

			this.enemiesList.push(enemy);
		};

		this.initPosition = function(enemy) {
			// Choisir la position de départ de l'ennemie par rapport à l'écran :
			// 1 : top
			// 2 : right
			// 3 : bottom
			// 4 : left
			var pos = randi(1, 4);

			switch (pos) {
				case 1 :
					enemy.x = rand(0, canvas.canvas.width);
					enemy.y = - enemy.img.height;
					break;
				case 2 :
					enemy.x = canvas.canvas.width;
					enemy.y = rand(0, canvas.canvas.height);
					break;
				case 3 :
					enemy.x = rand(0, canvas.canvas.width);
					enemy.y = canvas.canvas.height;
					break;
				case 4 :
					enemy.x = - enemy.img.width;
					enemy.y = rand(0, canvas.canvas.height);
					break;
			}
		};

		this.checkCollisionWith = function(obj) {
			// En prenant en compte le fait que obj est un objet contenant au moins les propriétés
			// x, y, width, height

			var e;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];

				// Si on détecte une collision avec un ennemi, on
				// renvoie cet ennemi ...
				if (collide(obj, e))
					return e;
			}
			// ... sinon, on renvoie false
			return false;
		};

		this.updateTarget = function(x, y) {
			this.mainTarget.x = x;
			this.mainTarget.y = y;
		};

		this.update = function() {
			// Parcours du tableau d'ennemis
			var e/*, maxSpeed, distance*/;
			// console.log(this.mainTarget.y);
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];

				e.direction = Math.atan2(this.mainTarget.y - e.y, this.mainTarget.x - e.x);

				e.x += Math.cos(e.direction) * e.speedX;
				e.y += Math.sin(e.direction) * e.speedY;

				/*distance = getDistance(e, this.mainTarget);
				maxSpeed = 5 - ((distance * 5) / canvas.diagonal);

				if (e.speedX >= 0) e.speedX = e.speedX > maxSpeed ? maxSpeed : e.speedX;
				if (e.speedX < 0) e.speedX = e.speedX < -maxSpeed ? -maxSpeed : e.speedX;
				if (e.speedY >= 0) e.speedY = e.speedY > maxSpeed ? maxSpeed : e.speedY;
				if (e.speedY < 0) e.speedY = e.speedY < -maxSpeed ? -maxSpeed : e.speedY;*/

			}

			// console.log( this.enemiesList.length );
		};

		this.render = function() {
			// Parcours du tableau d'ennemis
			var e;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];

				canvas.ctx.save();
				canvas.ctx.translate(e.x + e.width*.5, e.y + e.height*.5);
				canvas.ctx.rotate(e.direction);
				canvas.ctx.drawImage(e.img.data, - e.width*.5, - e.height*.5);
				canvas.ctx.restore();

				// canvas.ctx.strokeStyle = 'lime';
				// canvas.ctx.strokeRect(e.x, e.y, e.width, e.height);
			}
		};

		this.remove = function(obj) {
			var e;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];

				if (e === obj) {
					this.enemiesList.splice(i, 1);
					break;
				}
			}
		};

	};

	return new EnemyManager();

});