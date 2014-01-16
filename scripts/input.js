/**
 * input.js
**/

define([], function() {
	
	var keyboard = {
		up : false,
		right : false,
		down : false,
		left : false,
		space : false
	};

	var gamepad = {
		connected : false,

		up : false,
		right : false,
		down : false,
		left : false,
		
		O : false,
		U : false,
		Y : false,
		A : false,

		l1 : false,
		l2 : false,
		l3 : false,

		r1 : false,
		r2 : false,
		r3 : false,

		// Joysticks
		joystickLeft : {
			axeX : 0,
			axeY : 0
		},
		joystickRight : {
			axeX : 0,
			axeY : 0
		},
	};

	document.addEventListener('keydown', function(evt) {
		keyboard.left 	= evt.keyCode === 37 ? true : keyboard.left;
		keyboard.up 	= evt.keyCode === 38 ? true : keyboard.up;
		keyboard.right 	= evt.keyCode === 39 ? true : keyboard.right;
		keyboard.down 	= evt.keyCode === 40 ? true : keyboard.down;
		keyboard.space 	= evt.keyCode === 32 ? true : keyboard.space;
	});

	document.addEventListener('keyup', function(evt) {
		keyboard.left 	= evt.keyCode === 37 ? false : keyboard.left;
		keyboard.up 	= evt.keyCode === 38 ? false : keyboard.up;
		keyboard.right 	= evt.keyCode === 39 ? false : keyboard.right;
		keyboard.down 	= evt.keyCode === 40 ? false : keyboard.down;
		keyboard.space 	= evt.keyCode === 32 ? false : keyboard.space;
	});

	var updateGamepadsButtons = function() {
		if (!navigator.getGamepads)
			return false;

		var gamepads = navigator.getGamepads();

		gamepad.connected = !! gamepads[0];

		// Si un gamepad est connecté, cet objet sera rempli
		if (!gamepads[0])
			return false;

		// On ne récupère que le 1er gamepad connecté
		var mainGamepad = gamepads[0];

		gamepad.up = mainGamepad.buttons[12] === 1;
		gamepad.right = mainGamepad.buttons[15] === 1;
		gamepad.down = mainGamepad.buttons[13] === 1;
		gamepad.left = mainGamepad.buttons[14] === 1;

		gamepad.O = mainGamepad.buttons[0] === 1;
		gamepad.U = mainGamepad.buttons[2] === 1;
		gamepad.Y = mainGamepad.buttons[3] === 1;
		gamepad.A = mainGamepad.buttons[1] === 1;

		gamepad.joystickLeft.axeX = mainGamepad.axes[0];
		gamepad.joystickLeft.axeY = mainGamepad.axes[1];
		gamepad.joystickRight.axeX = mainGamepad.axes[2];
		gamepad.joystickRight.axeY = mainGamepad.axes[3];

		// Vérification et correction de la marge d'erreur renvoyée sur les Axes par l'API Gamepad
		gamepad.joystickLeft.axeX = ( Math.abs(0 - gamepad.joystickLeft.axeX) > 0.15) ? gamepad.joystickLeft.axeX : 0;
		gamepad.joystickLeft.axeY = ( Math.abs(0 - gamepad.joystickLeft.axeY) > 0.15) ? gamepad.joystickLeft.axeY : 0;

		gamepad.joystickRight.axeX = ( Math.abs(0 - gamepad.joystickRight.axeX) > 0.15) ? gamepad.joystickRight.axeX : 0;
		gamepad.joystickRight.axeY = ( Math.abs(0 - gamepad.joystickRight.axeY) > 0.15) ? gamepad.joystickRight.axeY : 0;
	};

	return {
		keyboard : keyboard,
		gamepad : gamepad,
		updateGamepadsButtons : updateGamepadsButtons
	};

});