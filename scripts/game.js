/**
 * game.js
**/

define(['gameover', 'config', 'IM', 'player', 'canvas', 'input', 'projectiles', 'stage', 'sound', 'enemy', 'explosion', 'messages'], function(gameover, config, IM, player, canvas, input, projectiles, stage, sound, enemy, explosion, messages) {
	function Game() {

		this.lifebar = {
			width : canvas.canvas.width,
			height : 20,
			hue : 120 // green
		};
		this.upgradingLevel = false;
		this.upgradingTimer = 0;

		this.init = function() {
			sound.theme.play();
			player.init();
			enemy.init();
			stage.init();

			messages.add('<LET\'S GO>', 4000, 0, 0, '', '62px bpdotssquaresregular', false, false);
		};

		this.update = function() {
			IM.update();

			input.updateGamepadsButtons();
			stage.updateBehavior(player.direction + Math.PI, player.speed * .2);
			stage.update();
			player.update();
			enemy.updateTarget( player.position.x, player.position.y );
			enemy.update();
			projectiles.update();
			this.checkIfEnemyIsTouched();
			this.checkIfPlayerIsTouched();
			explosion.update();
			messages.update();
			this.updateLifeBar();
			this.updateLevel();

			// Game over ?
			if (player.life <= 0) {
				gameover.init();
				config.currentGameObject = gameover;
			}
		};

		this.render = function() {
			// canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
			canvas.ctx.fillStyle = '#000';
			canvas.ctx.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			stage.render();
			player.render();
			enemy.render();
			projectiles.render();
			explosion.render();
			messages.render();

			this.renderScore();
			this.renderLifeBar();
			this.renderRemaining();
		};

		// ===

		// Vérifie les collisions entre les ennemis et les projectiles du joueur
		this.checkIfEnemyIsTouched = function() {
			var e;
			for (var i = 0, c = enemy.enemiesList.length; i < c; i++) {
				e = enemy.enemiesList[i];

				// Si l'ennemi 'e' entre en collision avec un projectile...
				var p = projectiles.checkCollisionWith( e );
				if (p !== false) {
					sound.explosion.stop();
					sound.explosion.play();

					explosion.add(e.x + e.width*.5, e.y + e.height*.5, 'enemy');

					projectiles.remove(p);

					player.enemiesKilledTotal++; // For stats at the end

					if (config.levels[config.LEVEL].enemies_total - (++player.enemiesKilled) < config.levels[config.LEVEL].enemies_onscreen) {
						enemy.remove(e);
						c--;
					} else {
						enemy.initPosition(e);
					}

					player.score += config.levels[config.LEVEL].score_gain;
					player.totalEfficientShots++;
				}
			}
		};

		// Vérifie les collisions entre le joueur et les ennemis
		this.checkIfPlayerIsTouched = function() {
			if (player.blink)
				return false;

			var e = enemy.checkCollisionWith( player );
			if (e !== false) {
				sound.hurt.stop();
				sound.hurt.play();
				// On player
				explosion.add(player.position.x + player.width*.5, player.position.y + player.height*.5, 'playerCollision');
				// On enemy
				explosion.add(e.x + e.width*.5, e.y + e.height*.5, 'enemy');

				player.life -= config.levels[config.LEVEL].enemies_damage;

				player.enemiesKilledTotal++; // For stats at the end

				if (config.levels[config.LEVEL].enemies_total - (++player.enemiesKilled) < config.levels[config.LEVEL].enemies_onscreen) {
					enemy.remove(e);
				} else {
					enemy.initPosition(e);
				}

				player.blink = true;
				player.blinkTime = config.TIMING;
			}
		};

		this.updateLifeBar = function() {
			var lifebarWidth = ( (player.life * canvas.canvas.width) / 100);

			if (this.lifebar.width < lifebarWidth)
			{
				this.lifebar.width += 5;
				if (this.lifebar.width > lifebarWidth)
					this.lifebar.width = lifebarWidth;
			}
			else if (this.lifebar.width > lifebarWidth)
			{
				this.lifebar.width -= 5;
				if (this.lifebar.width < lifebarWidth)
					this.lifebar.width = lifebarWidth;
			}
			
			// Computing player's lifebar hue..
			this.lifebar.hue = Math.round(( (player.life * 120) / 100));
		};

		this.updateLevel = function() {
			if (player.enemiesKilled >= config.levels[config.LEVEL].enemies_total) {
				player.enemiesKilled = 0;
				
				if (config.LEVEL < config.levels.length - 1)
					config.LEVEL++;

				messages.add('LEVEL UP', 4000, 0,0, 'hsla('+ this.lifebar.hue +', 100%, 50%, .75)', '72px bpdotssquaresregular', false, false);
				messages.add('(+'+config.levels[config.LEVEL].player_additional_life+' life gain)', 4000, 0,canvas.canvas.height*.5 + 72, 'hsla('+ this.lifebar.hue +', 100%, 50%, .75)', '48px bpdotssquaresregular', false, false);

				// Life++
				player.life += config.levels[config.LEVEL].player_additional_life;
				if (player.life > 100) player.life = 100;

				this.upgradingLevel = true;
				this.upgradingTimer = config.TIMING;
			}

			if (this.upgradingLevel && config.TIMING - this.upgradingTimer > config.time_between_waves) {
				this.upgradingLevel = false;
				this.upgradingTimer = 0;

				enemy.init();
			}
		};

		this.renderScore = function() {
			canvas.ctx.fillStyle = 'hsla('+ this.lifebar.hue +', 100%, 50%, .75)';
			canvas.ctx.textAlign = 'right';
			canvas.ctx.textBaseline = 'top';
			canvas.ctx.font = '42px bpdotssquaresbold';
			canvas.ctx.fillText(player.score, canvas.canvas.width - 15, 15);
		};

		this.renderLifeBar = function() {
			canvas.ctx.fillStyle = 'hsla('+ this.lifebar.hue +', 100%, 50%, .75)';
			canvas.ctx.strokeStyle = 'hsla('+ this.lifebar.hue +', 100%, 30%, 1)';
			// Up
			canvas.ctx.fillRect(0, 0, this.lifebar.width, this.lifebar.height);
			canvas.ctx.strokeRect(0, 0, this.lifebar.width, this.lifebar.height);
		};

		this.renderRemaining = function() {
			canvas.ctx.fillStyle = 'hsla('+ this.lifebar.hue +', 100%, 50%, .75)';
			canvas.ctx.textAlign = 'left';
			canvas.ctx.textBaseline = 'top';
			canvas.ctx.font = '42px bpdotssquaresbold';
			canvas.ctx.fillText(player.enemiesKilled + '/' + config.levels[config.LEVEL].enemies_total, 15, 15);
		};
	}
	return new Game();
});