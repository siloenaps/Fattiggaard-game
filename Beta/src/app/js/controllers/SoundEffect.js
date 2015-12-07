var SoundEffect = function(src, loop, volume){
	'use strict';
	if(SoundEffect.counter == null)
		SoundEffect.counter = 0;

	(volume === undefined) ? volume = 1 : volume = volume;

	SoundEffect.counter++;
	this.id = SoundEffect.counter;
	this.paused = false;
	this.src = src;
	this.loop = loop;
	this.preloaded = false;
	this.listeners = {tick:null, play:null, pause:null, stop:null};
	this.soundController = new SoundController(src, loop);
};
SoundEffect.prototype.preload = function(src, loop, callback){
	'use strict';
	
	var self = this;

	//self.soundController = new SoundController(src, this.loop);
	this.soundController.on('ready', function(event){
		event.remove();
		self.preloaded = true;
		if(callback != null)
			callback();

	}, self);
	this.soundController.load();
};
SoundEffect.prototype.volume = function(value){
	try{
		this.soundController.volume(value);	
	}catch(err){
		console.log(err);
	}	
}
SoundEffect.prototype.play = function(){
	'use strict';

	var self = this;

	var doPlay = function(){
		self.previousFrame = 0;

		// Sound
		self.soundController.play();

		// Dispacth event 
		self.dispatchEvent(new createjs.Event('start'));

		// Set this last
		self.paused = false;
	}

	if(!this.preloaded){		
		this.preload(this.src, this.loop, function(){
			doPlay();
		});
	}else{
		doPlay();
	}
};
SoundEffect.prototype.pause = function(){
	'use strict';

	// If invoked from external the state could be stopped
	// Adn we do not want to set in paused unintentional
	if(this.paused)
		return;

	this.paused = true;

	// Sound
	this.soundController.pause();
};
SoundEffect.prototype.stop = function(){
	'use strict';

	// Sound
	this.soundController.stop();

	this.paused = false;
};
SoundEffect.prototype.reset = function(){
	'use strict';
	this.paused = false;
	this.listeners = null;
};
SoundEffect.prototype.destroy = function(){
	'use strict';
	this.view = null;
	this.listeners = null;
};
createjs.EventDispatcher.initialize(SoundEffect.prototype);