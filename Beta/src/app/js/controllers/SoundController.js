/**
	Controller uses the browser's AUDIO element as play back for sound
*/
function SoundController(audioPath, loopCount) {
	'use strict';

	var self = this;

	this.loopCount = loopCount;
	if(loopCount === undefined || loopCount === null)
		this.loopCount = false;	

	this.audioPath = audioPath;
}
// SoundController.prototype.dispatcher = function(event){
// 	this.dispatchEvent(event);
// }
SoundController.prototype = {
	sndObj: null,
	currentSndPosition: 0,
	paused: false,
	self: this,
	complete: false,
	dispatcher: function(event){
		this.dispatchEvent(event);
	},
	getState: function(){
		return this.sndObj.state;
	},
	load: function(){
		'use strict';
		var self = this;
		// Howler
		this.sndObj = new Howl({
		  urls: [this.audioPath],
		  autoplay: false,
		  loop: this.loopCount,
		  volume: 1,
		  buffer: false,
		  onend: function() {
		    self.complete = true;
		    self.dispatcher(new createjs.Event('complete'));
		  },
		  onload: function() {		    
		    self.dispatcher(new createjs.Event('ready'));
		    // console.log('SoundController.onload');
		    PreloadGFX.hide();
		  }
		}); 

		PreloadGFX.show(false);
	},
	volume: function(value) {
		'use strict';
		if(this.sndObj != null){
			this.sndObj.volume = value;
		}
	},
	play: function() {
		'use strict';
		this.sndObj.play();
		this.paused = false;
		this.sndObj.state = 'play';
		this.complete = false;
	},
	stop: function() {
		'use strict';
		this.sndObj.stop();
		// this.sndObj.currentTime = 0;
		this.paused = false;
		this.sndObj.state = 'stop';
	},
	pause: function() {
		'use strict';
		// this.currentSndPosition = this.sndObj.currentTime;
		this.sndObj.pause();
		this.paused = true;
		this.sndObj.state = 'pause';
	},
	resume: function() {
		'use strict';
		this.sndObj.play();
	},
	progress: function(){
		'use strict';
		var num = this.sndObj.pos() / this.sndObj._duration;
		// console.log(this.sndObj._duration)
		// $('.debug').text('position:'+ this.sndObj.pos() +', '+ this.sndObj._duration);
		return Math.round(num * 1000) / 1000; // Cap to 3 decimals
	},
	isComplete: function(){
		'use strict';
		this.state = 'stop';
		return this.complete;
	},
	destroy: function(){
		'use strict';
		this.state = 'stop';
		this.sndObj = null;
		this.duration = null;
	}
};
createjs.EventDispatcher.initialize(SoundController.prototype);