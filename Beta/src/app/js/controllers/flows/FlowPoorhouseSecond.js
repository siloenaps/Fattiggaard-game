var FlowPoorhouseSecond = function(container, id){
	'use strict';
	this.container = container;
	this.id = id; 
	this.view = null;	
	this.lib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '3.0'; // Default start pointer
	// this.pagesTotal = 12;
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// TEST
	// this.id = 'svendborg';

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};
FlowPoorhouseSecond.prototype.soundEffectPlay = function(sound){
	// Sound effect
	if(this.soundEffect != null){
		this.soundEffect.destroy();
		this.soundEffect = null;
	}

	try{
		// var sound = SoundService.matrix.effects.typewriter;
		this.soundEffect = new SoundEffect(sound.src, sound.duration, true);	
		this.soundEffect.volume(.6);
		this.soundEffect.play();
	}catch(err){
		console.log(err);
	}
	
};
FlowPoorhouseSecond.prototype.soundEffectStop = function(sound){
	// Sound effect
	if(this.soundEffect != null){
		this.soundEffect.stop();
		this.soundEffect.destroy();
		this.soundEffect = null;
	}
};
FlowPoorhouseSecond.prototype.start = function(){
	this.id = PlayerStats.poorhouse;
	var gameFile;

	console.log('FlowPoorhouseSecond:start');

	LoadJS.load(
		['../assets/logic/games/svendborg.js'], 
		Delegate.create(this.setup, this)
	);
};
FlowPoorhouseSecond.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	// Tick
	Tick.framerate(15);

	var self = this;
	var manifest, Clss;	

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('3.0', Delegate.create(this.intro, this), '3.1');
	this.flow.addAction('2.5', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);

	//this.id = 'svendborg';
	console.log('FlowPoorhouseSecond:setup', this.id);

	this.lib = gamelib;
	switch(this.id){
		case 'horsens':			
			// this.lib = horsensGameLib;
			Clss = this.lib.horsens;
			manifest = this.lib.properties.manifest;
		break;
		case 'sundby':
			// this.lib = sundbyGameLib;
			Clss = this.lib.sundby;
			manifest = this.lib.properties.manifest;
		break;
		case 'svendborg':	
			
			Clss = this.lib.svendborg;
			manifest = this.lib.properties.manifest;

		break;
	}
	
	// Load files
	var onFileLoad = function(event){
		if (event.item.type === 'image') { 
			images[event.item.id] = event.result; 
		}
	};
	var onLoadComplete = function(event){
		// Instantiate view
		self.view = new Clss();

		//Add
		self.container.addChild(self.view);

		// Set start page
		self.next();

		console.log('FlowPoorhouseSecond:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};
	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
};
FlowPoorhouseSecond.prototype.next = function(){
	'use strict';

	this.flow.next(this.trigger);	
};
FlowPoorhouseSecond.prototype.onComplete = function(event) {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}

	// Set next button active
	this.continueBtn.activate('next');	
};
FlowPoorhouseSecond.prototype.onContinue = function(event) {
	'use strict';
	
	// console.log('FlowPoorhouseSecond::onContinue');
	
	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Sound effect - stop
	this.soundEffectStop();

	this.next();

	// console.log('this.playerComponent:', this.playerComponent)
};
FlowPoorhouseSecond.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowPoorhouseSecond.prototype.destroy = function() {
	'use strict';
	
	// Remove events
	this.removeEvents();

	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
		this.playerComponent.destroy();	
		this.playerComponent = null;
	}			
	this.view = null;
	this.lib = null;
	this.currentPage = null;
	this.listeners = null;
	this.flow = null;
};


// Pages ------------------------------------------------------------------------------------------------

FlowPoorhouseSecond.prototype.intro = function(trigger){
	'use strict';


	// Next move
	this.trigger = trigger;

	var self = this;

	// Set page view
	this.currentPage = this.view.intro;
	this.currentPage.x = 0;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_0);
	
	// Slide. Loading is self contained
	this.playerComponent = new PlayerSliderComponent(this.currentPage.player);
	this.listeners.complete = self.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
		Tick.disable();
	}, self);
	this.playerComponent.on('ready', function(event){
		event.remove();
		// No tick
		Tick.disable();
		self.continueBtn.activate("skip");
		// self.dispatchEvent(new createjs.Event('ready'));
	});
	this.playerComponent.preload('slide_1_0_1_'+this.id, this.slideLib);
	// this.playerComponent.preload('slide_intro', this.slideLib);
	
};
createjs.EventDispatcher.initialize(FlowPoorhouseSecond.prototype);


