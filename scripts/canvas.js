/**
 * canvas.js
**/

define([], function() {
	var canvas = document.createElement( navigator.isCocoonJS ? 'screencanvas' : 'canvas' );
	var ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth || 1280;
	canvas.height = window.innerHeight || 720;
	// Force le canvas à s'adapter à l'écran
	canvas.style.position = 'absolute';
	// canvas.style.top = 0;
	// canvas.style.left = 0;
	// canvas.style.right = 0;
	// canvas.style.bottom = 0;
	canvas.diagonal = getDistance(0, 0, canvas.width, canvas.height);

	// Ajout du canvas à la page
	document.body.appendChild( canvas );

	return {
		canvas : canvas,
		ctx : ctx
	};
});