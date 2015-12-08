var PlayerSoundComponent = function(view){
	'use strict';
	if(PlayerSoundComponent.counter == null)
		PlayerSoundComponent.counter = 0;

	PlayerSoundComponent.counter++;
	this.id = PlayerSoundComponent.counter;

	this.view = view;
	this.paused = false;
	this.duration = 0;
	this.listeners = {tick:null, play:null, pause:null, stop:null};
	this.playBtn = new ButtonCustom(view.playBtn);
	this.pauseBtn = new ButtonCustom(view.pauseBtn);
	this.stopBtn = new ButtonCustom(view.stopBtn);

	// Initial visibility of play/pause/stop
	this.playBtn.setActive(false);
	this.stopBtn.setActive(false);
	this.pauseBtn.setActive(true);	
	this.pauseBtn.visible(false);

	// Controller button events
	this.listeners.play = this.playBtn.on('click', this.play, this);
	this.listeners.pause = this.pauseBtn.on('click', this.pause, this);
	this.listeners.stop = this.stopBtn.on('click', this.stop, this);

	// Progression
	this.progressionBar = view.progressionBar;
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController = null;
};
PlayerSoundComponent.prototype.preload = function(src, duration){
	'use strict';
	var self = this;

	// console.log('PlayerSoundComponent.preload');

	// Safety net
	this.removeLoopEvent();

	// Sound ready state
	if(self.soundController !== null){
		self.soundController.destroy();
		self.soundController = null;
	}
	self.soundController = new SoundController(src);
	self.soundController.on('ready', function(event){
		event.remove();
		// Enable buttons
		self.playBtn.setActive(true);
		self.stopBtn.setActive(true);

		// Dispatch event 
		self.dispatchEvent(new createjs.Event('ready'));
	}, self);
	self.soundController.on('complete', function(event){
		// Swap Play/Pause visibility
		this.pauseBtn.visible(false);
		this.playBtn.visible(true);

		self.removeLoopEvent();

		// Dispatch event 
		self.dispatchEvent(new createjs.Event('complete'));
	}, self);
	self.soundController.load();
};
PlayerSoundComponent.prototype.addLoopEvent = function(){
	'use strict';
	if(this.listeners.tick === null){
		this.listeners.tick = this.progressionBar.on('tick', this.loop, this);
	}
};
PlayerSoundComponent.prototype.removeLoopEvent = function(){
	'use strict';
	this.progressionBar.off('tick', this.listeners.tick);
	this.listeners.tick = null;
};
PlayerSoundComponent.prototype.loop = function(){
	'use strict';	
	var sndProgression = this.soundController.progress();
	
	// Progression bar
	this.progressionBar.scaleX = sndProgression;
};
PlayerSoundComponent.prototype.play = function(){
	'use strict';
	this.previousFrame = 0;

	// Swap Play/Pause visibility
	this.pauseBtn.visible(true);
	this.playBtn.visible(false);

	// Timeline
	this.addLoopEvent('tick');

	// Sound
	this.soundController.play();

	// Dispacth event 
	this.dispatchEvent(new createjs.Event('start'));

	// Set this last
	this.paused = false;

	// Tick
	Tick.enable();
	Tick.framerate(Tick.perfect);
};
PlayerSoundComponent.prototype.pause = function(){
	'use strict';

	// If invoked from external the state could be stopped
	// Adn we do not want to set in paused unintentional
	if(this.paused)
		return;

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Dispacth event 
	// this.dispatchEvent(new createjs.Event('pause'));

	this.paused = true;

	// Sound
	this.soundController.pause();

	// Tick
	Tick.disable(100);
};
PlayerSoundComponent.prototype.stop = function(){
	'use strict';

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Progression bar
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController.stop();

	// Dispacth event 
	// this.dispatchEvent(new createjs.Event('stop'));

	this.paused = false;

	// Tick
	Tick.disable(100);
};
PlayerSoundComponent.prototype.progress = function(){
	'use strict';
	var num = this.slide.currentFrame / this.duration;
	return Math.round(num * 1000) / 1000;
};
PlayerSoundComponent.prototype.reset = function(){
	'use strict';
	this.removeLoopEvent();
	this.paused = false;
	this.listeners = null;
};
PlayerSoundComponent.prototype.destroy = function(){
	'use strict';
	this.removeLoopEvent();
	this.view = null;
	this.listeners = null;
	this.playBtn.destroy();
	this.pauseBtn.destroy();
	this.stopBtn.destroy();
	this.playBtn = null;
	this.pauseBtn = null;
	this.stopBtn = null;
};
createjs.EventDispatcher.initialize(PlayerSoundComponent.prototype);