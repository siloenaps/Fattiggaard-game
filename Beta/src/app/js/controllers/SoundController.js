/**
	Controller uses the browser's AUDIO element as play back for sound
*/
function SoundController(audioPath, duration) {
	'use strict';

	var self = this;
	
	this.sndObj = document.createElement('AUDIO');		
	this.sndObj.src = audioPath;
	this.duration = duration;

	// Firefox does not invoke the audio load method?! But setting load automated seems to work
	if(Environment.browser.firefox){
		this.sndObj.preload = 'auto';
	}else{
		this.sndObj.preload = 'none';
	}

	// LIsten for sound being ready 
	this.sndObj.addEventListener('canplaythrough', function(event){
		var e = new createjs.Event('ready');
 		self.dispatchEvent(e);
	}, false);
	this.sndObj.addEventListener('ended', function(event){
 		this.complete = true;
	}, false);
}

SoundController.prototype = {
	sndObj: null,
	currentSndPosition: 0,
	duration: 0,
	paused: false,
	self: this,
	complete: false,

	load: function(){
		'use strict';
		// Firefox does not invoke the audio load function?! 
		// So load has been set 'auto' so we don't need to invoke the load method
		if(!Environment.browser.firefox){			
			this.sndObj.load();
		}
	},

	play: function() {
		'use strict';
		this.sndObj.play();
		this.paused = false;
		this.complete = false;
	},
	stop: function() {
		'use strict';
		this.sndObj.pause();
		this.sndObj.currentTime = 0;
		this.paused = false;
	},
	pause: function() {
		'use strict';
		this.currentSndPosition = this.sndObj.currentTime;
		this.sndObj.pause();
		this.paused = true;
	},
	resume: function() {
		'use strict';
		this.sndObj.play();
	},
	progress: function(){
		'use strict';
		var num = this.sndObj.currentTime / this.duration;
		return Math.round(num * 1000) / 1000; // Cap to 3 decimals
	},
	isComplete: function(){
		'use strict';
		return this.complete;
	},
	destroy: function(){
		'use strict';
		this.sndObj = null;
		this.duration = null;
	}
};
createjs.EventDispatcher.initialize(SoundController.prototype);