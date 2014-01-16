/**
 * messages.js
**/

define(['canvas', 'config'], function(canvas, config) {
	function Message( params ) {
		this.timeAdded 		= params.timeAdded;
		this.text 			= params.text;
		this.duration 		= params.duration;
		this.x 				= params.x;
		this.y 				= params.y;
		this.color 			= params.color;
		this.font 			= params.font;
		this.textAlign 		= params.textAlign;
		this.textBaseline 	= params.textBaseline;
	}
	
	function MessagesManager() {
		this.messages = [];

		this.add = function(text, duration, x, y, color, font, textAlign, textBaseline) {
			this.messages.push(new Message({
				timeAdded		: config.TIMING,
				text  			: text,
				duration 		: duration || 3000,
				x 				: x || canvas.canvas.width*.5,
				y 				: y || canvas.canvas.height*.5,
				color 			: color || '#fff',
				font 			: font || '62px bpdotssquaresbold',
				textAlign 		: textAlign || 'center',
				textBaseline 	: textBaseline || 'middle'
			}));
		};

		this.update = function() {
			// Parcours du tableau de messages
			var m;
			for (var i = 0, c = this.messages.length; i < c; i++) {
				m = this.messages[i];

				// Si les messages ont expirés, on les kill$
				// i === 0 && console.log(m.timeAdded);
				if (m.duration !== -1 && config.TIMING - m.timeAdded > m.duration) {
					this.messages.splice(i, 1)
					c--;
				}
			}
		};

		this.render = function() {
			// Parcours du tableau de messages
			var m;
			for (var i = 0, c = this.messages.length; i < c; i++) {
				m = this.messages[i];

				canvas.ctx.fillStyle = m.color;
				canvas.ctx.textAlign = m.textAlign;
				canvas.ctx.textBaseline =  m.textBaseline;
				canvas.ctx.font = m.font;
				canvas.ctx.fillText(m.text, m.x, m.y);
			}
		};

		this.removeAll = function() {
			this.messages.length = 0;
		};
	}

	return new MessagesManager();
});