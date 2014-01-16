define([/*'buzz'*/], function(/*buzz*/) {
	
	var sounds;

	// Eurk !
	var stop = function() {
		this.pause();
		this.currentTime = 0;
		return this;
	};

	// if (navigator.isCocoonJS) {
		// Shot
		var SHOT = new Audio();
		SHOT.src = 'assets/sounds/shot.ogg';
		SHOT.preload = true;
		SHOT.autoplay = false;
		SHOT.loop = false;
		SHOT.stop = stop; // *gerb*

		// Main theme
		var THEMESPACE = new Audio();
		THEMESPACE.src = 'assets/sounds/theme-space.ogg';
		THEMESPACE.preload = true;
		THEMESPACE.autoplay = false;
		THEMESPACE.loop = true;
		THEMESPACE.stop = stop; // *gerb*

		// Gameover theme
		var THEMEGAMEOVER = new Audio();
		THEMEGAMEOVER.src = 'assets/sounds/theme-gameover.ogg';
		THEMEGAMEOVER.preload = true;
		THEMEGAMEOVER.autoplay = false;
		THEMEGAMEOVER.loop = true;
		THEMEGAMEOVER.stop = stop; // *gerb*

		// Explosion
		var EXPLOSION = new Audio();
		EXPLOSION.src = 'assets/sounds/explosion.ogg';
		EXPLOSION.preload = true;
		EXPLOSION.autoplay = false;
		EXPLOSION.loop = false;
		EXPLOSION.stop = stop; // *gerb*

		// Hurt
		var HURT = new Audio();
		HURT.src = 'assets/sounds/hurt.ogg';
		HURT.preload = true;
		HURT.autoplay = false;
		HURT.loop = false;
		HURT.stop = stop; // *gerb*

		sounds = {
			playerShot : SHOT,
			theme : THEMESPACE,
			explosion : EXPLOSION,
			hurt : HURT,
			themeGameover : THEMEGAMEOVER
		};
	// }
	/*else {
		sounds = {
			playerShot : new buzz.sound("assets/sounds/shot", {
						formats: [ "ogg", "mp3", "wav" ],
						preload: true,
						autoplay: false,
						loop: false
					}),
			theme : new buzz.sound("assets/sounds/theme-space", {
						formats: [ "ogg", "mp3", "wav" ],
						preload: true,
						autoplay: false,
						loop: true
					}),
			explosion : new buzz.sound("assets/sounds/explosion", {
						formats: [ "ogg", "mp3", "wav" ],
						preload: true,
						autoplay: false,
						loop: false
					})
		};
	}*/

	return sounds;

});