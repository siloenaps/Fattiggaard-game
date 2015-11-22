var PagePoorhouseIntro = function(container){
	'use strict';
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.slideLib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '1.0.1'; // Default start pointer
	// this.pagesTotal = 12;
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};

PagePoorhouseIntro.prototype.start = function(){
	this.id = PlayerStats.poorhouse;
	var gameFile;

	console.log('PagePoorhouseIntro:start');

	LoadJS.load(
		['../assets/logic/games/poorhouse_intro.js', '../assets/logic/slides/slide_1_0_1_svendborg.js'], 
		Delegate.create(this.setup, this)
	);
};
PagePoorhouseIntro.prototype.setup = function(){
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
	this.flow.addAction('1.0.1', Delegate.create(this.intro, this), '1.0.2');
	this.flow.addAction('1.0.2', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);

	this.id = 'svendborg';
	console.log('PagePoorhouseIntro:setup', this.id);

	this.lib = gamelib;
	this.slideLib = slidelib;
	Clss = this.lib.poorhouse_intro;
	switch(this.id){
		case 'horsens':			
			// Clss = this.lib.horsens;
			manifest = this.lib.properties.manifest;
		break;
		case 'sundby':
			// this.lib = sundbyGameLib;
			// Clss = this.lib.sundby;
			manifest = this.lib.properties.manifest;
		break;
		case 'svendborg':				
			// Clss = this.lib.svendborg;		
			manifest = this.lib.properties.manifest;
		break;
	}
	
	// Load files
	var onFileLoad = function(event){
		if (event.item.type === 'image') { 
			// console.log(event.item.id, event.result);
			images[event.item.id] = event.result; 
		}
		console.log('PagePoorhouseIntro:onFileLoad');
	};
	var onLoadComplete = function(event){
		// Instantiate view
		self.view = new Clss();

		//Add
		self.container.addChild(self.view);

		// Set start page
		self.next();

		console.log('PagePoorhouseIntro:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};
	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
};
PagePoorhouseIntro.prototype.next = function(){
	'use strict';
	this.flow.next(this.trigger);	
};
PagePoorhouseIntro.prototype.onComplete = function(event) {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}

	// Set next button active
	this.continueBtn.activate('next');	
};
PagePoorhouseIntro.prototype.onContinue = function(event) {
	'use strict';
	
	console.log('PagePoorhouseIntro::onContinue');
	
	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	this.next();

	// console.log('this.playerComponent:', this.playerComponent)
};
PagePoorhouseIntro.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
PagePoorhouseIntro.prototype.destroy = function() {
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
PagePoorhouseIntro.prototype.intro = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set page view
	this.currentPage = this.view.intro;
	this.currentPage.x = 0;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_0);
	
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
createjs.EventDispatcher.initialize(PagePoorhouseIntro.prototype);


