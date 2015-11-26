var PlayerSliderComponent = function(view, soundOffset){
	'use strict';
	this.view = view;
	this.soundOffset = soundOffset;
	this.container = view.container;
	this.slideId = null;
	this.slide = null;
	this.paused = false;
	this.state = null;
	this.duration = 0;
	this.listeners = {tick:null, play:null, pause:null, stop:null, auto:null};
	this.playBtn = new ButtonCustom(view.playBtn);
	this.pauseBtn = new ButtonCustom(view.pauseBtn);
	this.stopBtn = new ButtonCustom(view.stopBtn);

	if(this.soundOffset === null || this.soundOffset === undefined){
		this.soundOffset = 0;
	}

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

					// Dispatch event 
					self.dispatchEvent(new createjs.Event('ready'));
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

			// Calculate in which frame the timeline shold be related to soudn progression
			var desiredFrame = Math.round(this.duration * sndProgression) + this.offset;			

			// Just a fail safe making sure that we do NOT play a frame already shown
			if(desiredFrame > this.previousFrame){
				this.slide.gotoAndPlay(desiredFrame);
				this.previousFrame = desiredFrame;
			}
			
			// Sound
			if(this.soundOffset > 0){
				if(this.soundController.state !== 'play'){
					if(this.slide.currentFrame >= this.soundOffset){						
						this.listeners.auto = this.dispatchEvent(new createjs.Event('autoplay'));
					}
				}				
			}
		}
	}

	// Progression bar
	// this.progressionBar.scaleX = sndProgression;
	this.progressionBar.scaleX = this.progress()
};
PlayerSliderComponent.prototype.play = function(){
	'use strict';
	// console.log('play');
	var self = this;

	this.previousFrame = 0;

	// Swap Play/Pause visibility
	this.pauseBtn.visible(true);
	this.playBtn.visible(false);

	// Sound
	// Sound starts at frame 0
	if(this.soundOffset === 0){
		this.soundController.play();		

	// Sound starts later than frame 0
	}else{
		// Current frame is after sound start frame
		if(this.slide.currentFrame >= this.soundOffset){
			this.soundController.play();

		// Current frame is before sound start frame
		}else{
			// Listen for an event dispatch 
			this.on('autoplay', function(event){
				event.remove();
				this.listeners.auto = null;
				self.soundController.play();
			}, this);
		}		
	}
	
	// Timeline
	this.addLoopEvent('tick');
	this.slide.play();

	// Sound
	// this.soundController.play();

	// Set this last
	this.paused = false;
	this.state = 'play';

	// Tick
	Tick.enable();	
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
	this.state = 'pause';

	// Pause timeline
	this.slide.stop();

	// Sound
	this.soundController.pause();

	// Tick
	Tick.disable(100);
};
PlayerSliderComponent.prototype.stop = function(){
	'use strict';
	Tick.enable();

	// console.log('stop');


	// Progression bar
	this.progressionBar.scaleX = 0;

	// Remove tick
	this.removeLoopEvent();

	// Set slide timeline back to start
	this.slide.gotoAndStop(0);

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Sound
	this.soundController.stop();

	this.state = 'stop';

	// Tick
	Tick.disable(100);
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