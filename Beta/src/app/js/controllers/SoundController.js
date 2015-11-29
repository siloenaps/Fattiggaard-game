/**
	Controller uses the browser's AUDIO element as play back for sound
*/
function SoundController(audioPath, duration, loop) {
	'use strict';
	this.soundEnabled = createjs.Sound.initializeDefaultPlugins();
	if(!this.soundEnabled)
		return;	

	var self = this;

	if(loop === undefined || loop === null)
		loop = false;

	createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.addEventListener("fileload", handleLoad);
    createjs.Sound.registerSounds(sounds, audioPath);

	// this.sndObj = document.createElement('AUDIO');		
	// this.sndObj.src = audioPath;
	// this.sndObj.loop = loop;
	// this.duration = duration;


	// // Firefox does not invoke the audio load method?! But setting load automated seems to work
	// if(Environment.browser.firefox){
	// 	this.sndObj.preload = 'auto';
	// }else{
	// 	this.sndObj.preload = 'none';
	// }

	// LIsten for sound being ready 
	var ready = function(event){
		var e = new createjs.Event('ready');
 		self.dispatchEvent(e);
	};
	var ended = function(event){
 		this.complete = true;
	}
	// this.sndObj.addEventListener('canplaythrough', ready, false);
	// this.sndObj.addEventListener('ended', ended, false);
}

SoundController.prototype = {
	sndObj: null,
	currentSndPosition: 0,
	duration: 0,
	paused: false,
	self: this,
	complete: false,

	getState: function(){
		if(!this.soundEnabled) return;			
		return this.sndObj.state;
	},
	load: function(){
		'use strict';
		if(!this.soundEnabled) return;
		// Firefox does not invoke the audio load function?! 
		// So load has been set 'auto' so we don't need to invoke the load method
		if(!Environment.browser.firefox){			
			this.sndObj.load();
		}
	},
	volume: function(value) {
		'use strict';
		if(!this.soundEnabled) return;
		if(this.sndObj != null){
			this.sndObj.volume = value;
		}
	},
	play: function() {
		'use strict';
		if(!this.soundEnabled) return;
		this.sndObj.play();
		this.paused = false;
		this.sndObj.state = 'play';
		this.complete = false;
	},
	stop: function() {
		'use strict';
		if(!this.soundEnabled) return;
		this.sndObj.pause();
		this.sndObj.currentTime = 0;
		this.paused = false;
		this.sndObj.state = 'stop';
	},
	pause: function() {
		'use strict';
		if(!this.soundEnabled) return;
		this.currentSndPosition = this.sndObj.currentTime;
		this.sndObj.pause();
		this.paused = true;
		this.sndObj.state = 'pause';
	},
	resume: function() {
		'use strict';
		if(!this.soundEnabled) return;
		this.sndObj.play();
	},
	progress: function(){
		'use strict';
		if(!this.soundEnabled) return;
		var num = this.sndObj.currentTime / this.duration;
		return Math.round(num * 1000) / 1000; // Cap to 3 decimals
	},
	isComplete: function(){
		'use strict';
		if(!this.soundEnabled) return;
		this.state = 'stop';
		return this.complete;
	},
	destroy: function(){
		'use strict';
		if(!this.soundEnabled) return;
		this.state = 'stop';
		this.sndObj = null;
		this.duration = null;
	}
};
createjs.EventDispatcher.initialize(SoundController.prototype);
// /**
// 	Controller uses the browser's AUDIO element as play back for sound
// */
// function SoundController(audioPath, duration, loop) {
// 	'use strict';

// 	var self = this;

// 	if(loop === undefined || loop === null)
// 		loop = false;
	
// 	this.sndObj = document.createElement('AUDIO');		
// 	this.sndObj.src = audioPath;
// 	this.sndObj.loop = loop;
// 	this.duration = duration;


// 	// Firefox does not invoke the audio load method?! But setting load automated seems to work
// 	if(Environment.browser.firefox){
// 		this.sndObj.preload = 'auto';
// 	}else{
// 		this.sndObj.preload = 'none';
// 	}

// 	// LIsten for sound being ready 
// 	this.sndObj.addEventListener('canplaythrough', function(event){
// 		var e = new createjs.Event('ready');
//  		self.dispatchEvent(e);
// 	}, false);
// 	this.sndObj.addEventListener('ended', function(event){
//  		this.complete = true;
// 	}, false);
// }

// SoundController.prototype = {
// 	sndObj: null,
// 	currentSndPosition: 0,
// 	duration: 0,
// 	paused: false,
// 	self: this,
// 	complete: false,

// 	getState: function(){
// 		return this.sndObj.state;
// 	},
// 	load: function(){
// 		'use strict';
// 		// Firefox does not invoke the audio load function?! 
// 		// So load has been set 'auto' so we don't need to invoke the load method
// 		if(!Environment.browser.firefox){			
// 			this.sndObj.load();
// 		}
// 	},
// 	volume: function(value) {
// 		'use strict';
// 		if(this.sndObj != null){
// 			this.sndObj.volume = value;
// 		}
// 	},
// 	play: function() {
// 		'use strict';
// 		this.sndObj.play();
// 		this.paused = false;
// 		this.sndObj.state = 'play';
// 		this.complete = false;
// 	},
// 	stop: function() {
// 		'use strict';
// 		this.sndObj.pause();
// 		this.sndObj.currentTime = 0;
// 		this.paused = false;
// 		this.sndObj.state = 'stop';
// 	},
// 	pause: function() {
// 		'use strict';
// 		this.currentSndPosition = this.sndObj.currentTime;
// 		this.sndObj.pause();
// 		this.paused = true;
// 		this.sndObj.state = 'pause';
// 	},
// 	resume: function() {
// 		'use strict';
// 		this.sndObj.play();
// 	},
// 	progress: function(){
// 		'use strict';
// 		var num = this.sndObj.currentTime / this.duration;
// 		return Math.round(num * 1000) / 1000; // Cap to 3 decimals
// 	},
// 	isComplete: function(){
// 		'use strict';
// 		this.state = 'stop';
// 		return this.complete;
// 	},
// 	destroy: function(){
// 		'use strict';
// 		this.state = 'stop';
// 		this.sndObj = null;
// 		this.duration = null;
// 	}
// };
// createjs.EventDispatcher.initialize(SoundController.prototype);