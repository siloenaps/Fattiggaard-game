var PlayerSliderComponent = function(view){
	'use strict';
	this.view = view;
	this.container = view.container;
	this.slideId = null;
	this.slide = null;
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
PlayerSliderComponent.prototype.preload = function(slideId, lib){
	'use strict';
	var self = this;
	this.slideId = slideId;

	// console.log("preload: ", slideId);

	// Flash sliders lib referecne due to id
	// var lib = eval('libslide'+slideId);
	// var lib = new Function('libslide_'+slideId);
	
	// Load assets	
	Preloader.load(lib.properties.manifest, 
		function(event){
			if (event.item.type === 'image'){ 
				images[event.item.id] = event.result; 
			}
			// // console.log(event.result);
		}, 
		function(event){
			// Clean slider container if a slider already has been played
			if(self.slide !== null){
				self.container.remove(slide);
				self.slide = null;
			}
			// Create slider object and attach to container
			self.slide = eval('new lib.'+slideId+'()');
			
			self.container.addChild(self.slide);

			// Get the duration of the timeline in the slide
			self.duration = self.slide.timeline.duration - 1;

			// Sound
			if(self.soundController !== null){
				self.soundController.destroy();
				self.soundController = null;
			}
			try{
				var snd = SoundService.getSlideSoundById(self.slideId);
				self.soundController = new SoundController(snd.src, snd.duration);
				//self.soundController = new SoundController(SoundService.getSlideSoundpathById(self.slideId), SoundService.getSlideDurationById(self.slideId));
				self.soundController.on('ready', function(event){
					event.remove(); // Only run once. Otherwise it will run every time player has ended and starts slide after it played to the end
					// Enable buttons
					self.playBtn.setActive(true);
					self.stopBtn.setActive(true);
				}, self);
				self.soundController.load();
			}catch(err){
				console.log(err);
			}			
		}
	);	
};
PlayerSliderComponent.prototype.addLoopEvent = function(){
	'use strict';
	if(this.listeners.tick === null){
		this.listeners.tick = this.slide.on('tick', this.loop, this);
	}
};
PlayerSliderComponent.prototype.removeLoopEvent = function(){
	'use strict';
	this.slide.off('tick', this.listeners.tick);
	this.listeners.tick = null;
};
PlayerSliderComponent.prototype.loop = function(){
	'use strict';	
	// var progression = this.progress();
	var sndProgression = this.soundController.progress();

	// Reached end of slide
	if(sndProgression >= 1){
		// Remove tick
		this.removeLoopEvent();

		// Set slide timeline back to start
		this.slide.stop();

		// Swap Play/Pause visibility
		this.pauseBtn.visible(false);
		this.playBtn.visible(true);

		this.paused = false;

		// Dispacth event 
		this.dispatchEvent(new createjs.Event('complete'));
	}else{
		var sndIsComplete = this.soundController.isComplete();				
		if(!sndIsComplete){
			//// console.log(sndProgression, ':', progression);

			// Calculate in which frame the timeline shold be related to soudn progression
			var desiredFrame = Math.round(this.duration * sndProgression);			

			// Just a fail safe making sure that we do NOT play a frame already shown
			if(desiredFrame > this.previousFrame){
				this.slide.gotoAndPlay(desiredFrame);
				this.previousFrame = desiredFrame;
			}
		}
	}

	// Progression bar
	this.progressionBar.scaleX = sndProgression;
};
PlayerSliderComponent.prototype.play = function(){
	'use strict';
	// console.log('play');

	this.previousFrame = 0;

	// Swap Play/Pause visibility
	this.pauseBtn.visible(true);
	this.playBtn.visible(false);

	// Timeline
	this.slide.play();
	this.addLoopEvent('tick');

	// Sound
	this.soundController.play();

	// Set this last
	this.paused = false;
};
PlayerSliderComponent.prototype.pause = function(){
	'use strict';

	// console.log('pause');

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	this.paused = true;

	// Pause timeline
	this.slide.stop();

	// Sound
	this.soundController.pause();
};
PlayerSliderComponent.prototype.stop = function(){
	'use strict';

	// console.log('stop');

	// Remove tick
	this.removeLoopEvent();

	// Set slide timeline back to start
	this.slide.gotoAndStop(0);

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Progression bar
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController.stop();
};
PlayerSliderComponent.prototype.progress = function(){
	'use strict';
	var num = this.slide.currentFrame / this.duration;
	return Math.round(num * 1000) / 1000;
};
PlayerSliderComponent.prototype.reset = function(){
	'use strict';
	this.slideId = null;
	this.paused = false;
};
PlayerSliderComponent.prototype.destroy = function(){
	'use strict';
	this.view = null;
	this.slideId = null;
};
createjs.EventDispatcher.initialize(PlayerSliderComponent.prototype);