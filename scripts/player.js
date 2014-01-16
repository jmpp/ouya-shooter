/**
 * player.js
**/

define(['canvas', 'input', 'IM', 'projectiles', 'sound', 'config'], function(canvas, input, IM, projectiles, sound, config) {
	function Player() {
		this.position = {};

		this.init = function() {
			this.image = IM.getInstance('assets/images/ship');
			this.position.x = 100;
			this.position.y = 200;
			this.width = this.image.width;
			this.height = this.image.height;
			this.speed = 8;
			this.direction = 0;
			this.lastShotTime = 0;
			this.life = config.player_life;
			this.score = 0;
			this.alpha = 1;
			this.blink = false;
			this.blinkTime = 0;
			this.enemiesKilledTotal = 0; // Never reseted
			this.enemiesKilled = 0; // Reseted each level
			this.totalShots = 0;
			this.totalEfficientShots = 0;
		}; 

		this.update = function() {
			if (input.gamepad.connected) {
				this.characterGamepadController();
				
				// Gestion du tir joueur
				if (input.gamepad.O) {
					this.fire();
				}
			}
			else {
				this.characterKeyboardController();

				if (input.keyboard.space)
					this.fire();
			}


			// Vérification et ajustement des coordonnées si le vaisseau est sorti de l'écran.
			if (this.position.x < 0) 								  this.position.x = 0;
			if (this.position.y < 0) 								  this.position.y = 0;
			if (this.position.x + this.width > canvas.canvas.width)   this.position.x = canvas.canvas.width - this.width;
			if (this.position.y + this.height > canvas.canvas.height) this.position.y = canvas.canvas.height - this.height;

			// Clignotement si touché
			this.updateBlink();
		};

		this.fire = function() {
			if (config.TIMING - this.lastShotTime > 150) {
				projectiles.add(
					this.position.x + this.width*.5 + (19*Math.sin(this.direction)),
					this.position.y + this.height*.5 - (16*Math.cos(this.direction)),
					this.direction
				);

				projectiles.add(
					this.position.x + this.width*.5 - (19*Math.sin(this.direction)),
					this.position.y + this.height*.5 + (16*Math.cos(this.direction)),
					this.direction
				);

				// Sound
				sound.playerShot.stop();
				sound.playerShot.play();

				this.lastShotTime = config.TIMING;

				this.totalShots += 2;
			}
		};

		this.updateBlink = function() {
			// console.log(Math.round(config.TIMING)%5);
			if (this.blink && Math.round(config.FRAME)%3 === 0) {
				this.alpha = this.alpha === .2 ? 1 : .2;
			}

			if (config.TIMING - this.blinkTime > config.player_blink_time) {
				this.blink = false;
				this.blinkTime = 0;
				this.alpha = 1;
			}
		};

		// Gère les contrôles utilisateur au clavier
		this.characterKeyboardController = function() {
			if (input.keyboard.left)
				this.position.x -= this.speed;

			if (input.keyboard.up)
				this.position.y -= this.speed;

			if (input.keyboard.right)
				this.position.x += this.speed;

			if (input.keyboard.down)
				this.position.y += this.speed;
		}

		// Gère les contrôles utilisateur au gamepad
		this.characterGamepadController = function() {
			this.position.x += input.gamepad.joystickLeft.axeX * this.speed;
			this.position.y += input.gamepad.joystickLeft.axeY * this.speed;

			this.direction = Math.atan2( input.gamepad.joystickLeft.axeY, input.gamepad.joystickLeft.axeX ) || this.direction;
		}

		this.render = function() {
			canvas.ctx.globalAlpha = this.alpha;
			canvas.ctx.save();
			canvas.ctx.translate(this.position.x + this.width*.5, this.position.y + this.height*.5);
			canvas.ctx.rotate(this.direction);
			//canvas.ctx.fillRect(- this.width*.5, - this.height*.5, this.width, this.height);
			canvas.ctx.drawImage(this.image.data, - this.width*.5, - this.height*.5);
			canvas.ctx.restore();
			canvas.ctx.globalAlpha = 1;
		}
	}
	return new Player();
});