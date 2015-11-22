var PagePoorhouseIntro = function(container){
	'use strict';
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.slideLib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = 'start'; 
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};

PagePoorhouseIntro.prototype.start = function(flowId, slideName){
	this.id = PlayerStats.poorhouse;
	this.flowId = flowId;
	this.slideName = slideName;

	var gameFile;

	// console.log('PagePoorhouseIntro:start', slideName+'.js');

	LoadJS.load(
		['../assets/logic/games/poorhouse_intro.js', '../assets/logic/slides/'+slideName+'.js'], 
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
	this.flow.addAction('start', Delegate.create(this.intro, this), 'end');
	this.flow.addAction('end', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);

	this.lib = gamelib;
	this.slideLib = slidelib;
	Clss = this.lib.poorhouse_intro;
	switch(this.id){
		case 'horsens':			
			// Clss = this.lib.horsens;
			manifest = this.lib.properties.manifest;

		break;
		case 'sundholm':
			// this.lib = sundbyGameLib;
			// Clss = this.lib.sundby;
			manifest = this.lib.properties.manifest;
		break;
		case 'svendborg':				
			// Clss = this.lib.svendborg;		
			manifest = this.lib.properties.manifest;
		break;
	}

	try{
		this.bgImage = ImageService.matrix[this.flowId][PlayerStats.poorhouse];// './assets/images/pool/_1_0BGsvendborg.jpg';
		manifest.push({src: this.bgImage.src, id: this.bgImage.id});
	}catch(err){
		console.log(PlayerStats.poorhouse ,this.bgImage);
		console.log(err);
	}	
	
	// Load files
	var onFileLoad = function(event){
		if (event.item.type === 'image') { 
			console.log(event.item.id, event.result);
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

		// console.log('PagePoorhouseIntro:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};
	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
	console.log('manifest:', manifest);
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
	this.view.bg_container.x = 0;

	// var bitmap = images['_bg_1_0_1svendborg'];
	var bitmap = new createjs.Bitmap(this.bgImage.src);	
	this.view.bg_container.addChild(bitmap);
	
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
	console.log(this.slideLib)
	this.playerComponent.preload(this.slideName, this.slideLib);
	
};
createjs.EventDispatcher.initialize(PagePoorhouseIntro.prototype);


