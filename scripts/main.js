/**
 * main.js
**/

require.config({
	paths : {
		'IIG' : '../lib/IIG',
		'buzz' : '../lib/buzz'
	},
	shim : {
		'IIG' : {
			'exports' : 'IIG',
			'deps' : []
		},
		'buzz' : {
			'exports' : 'buzz',
			'deps' : []
		}
	}
});

require(['game', 'IM', 'config', 'gameover'], function(game, IM, config, gameover) {

	IM.add('assets/images/ship.png');
	IM.add('assets/images/shot.png');
	IM.add('assets/images/enemy.png');
	IM.add('assets/images/explosion.png');
	IM.add('assets/images/collision.png');

	config.currentGameObject = game;

	IM.loadAll(function() {
		// Initialisation du jeu
		config.currentGameObject.init();

		// Premier appel pour entrer dans la boucle de jeu infinie
		requestAnimFrame(GameLoop);
	});

	// Boucle de jeu
	var frame = 0;
	function GameLoop( t ) {
		config.TIMING = t;
		config.FRAME = ++frame;

		config.currentGameObject.update();
		config.currentGameObject.render();

		requestAnimFrame(GameLoop);
	}

});

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

navigator.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;

function rand(min, max) {
	return Math.random() * (max - min) + min;
}
function randi(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
function collide(a, b) {

	var ax = a.x || a.position.x;
	var ay = a.y || a.position.y;
	var bx = b.x || b.position.x;
	var by = b.y || b.position.y;

	return !(bx >= ax + a.width // Trop à droite
				|| bx + b.width <= ax // Trop à gauche
				|| by >= ay + a.height // Trop en bas
				|| by + b.height <= ay) // Trop en haut
}
function getDistance(a, b) {
	var vectorX, vectorY;

	if (a.x < b.x) {
		vectorX = Math.pow(b.x - a.x, 2);
	} else if (b.x < a.x) {
		vectorX = Math.pow(a.x - b.x, 2);
	} else {
		vectorX = 0;
	}

	if (a.y < b.y) {
		vectorY = Math.pow(b.y - a.y, 2);
	} else if (b.y < a.y) {
		vectorY = Math.pow(a.y - b.y, 2);
	} else {
		vectorY = 0;
	}

	return Math.sqrt(vectorX+vectorY);
}