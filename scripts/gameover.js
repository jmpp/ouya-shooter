/**
 * gameover.js
**/

define(['config', 'IM', 'canvas', 'input', 'stage', 'sound', 'messages', 'player'], function(config, IM,  canvas, input, stage, sound, messages, player) {
	function GameOver() {

		this.efficient = 0;

		this.init = function() {
			sound.theme.stop();
			sound.themeGameover.play();
			messages.removeAll();

			this.efficient = 100 * player.totalEfficientShots / player.totalShots;

			messages.add('GAME OVER', -1, 0, canvas.canvas.height*.5 - 62, '#f00', '62px bpdotssquaresregular', false, false);
			messages.add('Score : ' + player.score, -1, 0, 0, '#f80', '48px bpdotssquaresregular', false, canvas.canvas.height*.5 + 62);
			messages.add('Enemies killed : ' + player.enemiesKilledTotal, -1, 0, canvas.canvas.height*.5 + 48, '#ff0', '48px bpdotssquaresregular', false, false);
			messages.add('Efficient : '+this.efficient.toFixed(0)+'%', -1, 0, canvas.canvas.height*.5 + 48 + 48, '#0f0', '48px bpdotssquaresregular', false, false);
		};

		this.update = function() {
			// IM.update();

			input.updateGamepadsButtons();
			stage.update();
			messages.update();
		};

		this.render = function() {
			// canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
			canvas.ctx.fillStyle = '#000';
			canvas.ctx.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			stage.render();
			messages.render();
		};

	}
	return new GameOver();
});