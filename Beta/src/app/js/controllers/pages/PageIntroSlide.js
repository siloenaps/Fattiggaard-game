var PageIntroSlide = function(container){
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
	// this.portrait = null;

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};
PageIntroSlide.prototype.setPortrait = function(image){
	this.portrait = image;
}
PageIntroSlide.prototype.start = function(flowId, slideName){
	this.id = PlayerStats.poorhouse;
	this.flowId = flowId;
	this.slideName = slideName;

	var gameFile;

	// console.log('PageIntroSlide:start', slideName+'.js');
	// console.log('PageIntroSlide', this.runonce, slideName+'.js');

	LoadJS.load(
		['../assets/logic/games/poorhouse_intro.js', '../assets/logic/slides/'+slideName+'.js'], 
		Delegate.create(this.setup, this)
	);
};
PageIntroSlide.prototype.setup = function(){
	'use strict';
	console.log('PageIntroSlide::setup:runonce', this.container);

	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	// Tick
	Tick.framerate(Tick.high);

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

	this.addContent();
	// Set background image
	// this.addBgImage();
	// this.dispatchEvent(new createjs.Event('ready'));
	
};
// PageIntroSlide.prototype.addContent = function(){
// 	// console.log('PageIntroSlide::setup:flowId', this.flowId);
// 	this.lib = gamelib;
// 	this.slideLib = slidelib;
// 	Clss = this.lib.poorhouse_intro;
// 	manifest = this.lib.properties.manifest;

// 	// Instantiate view
// 	this.view = new Clss();

// 	//Add
// 	this.container.addChild(self.view);
// }
PageIntroSlide.prototype.addContent = function(){
	// console.log('PageIntroSlide::setup:flowId', this.flowId);
	var self = this;
	this.lib = gamelib;
	this.slideLib = slidelib;
	Clss = this.lib.poorhouse_intro;
	manifest = this.lib.properties.manifest;

	try{
		// Background image
		if(this.flowId === '0.1'){
			this.bgImage = ImageService.matrix[this.flowId];
		}else{
			this.bgImage = ImageService.matrix[this.flowId][PlayerStats.poorhouse];// './assets/images/pool/_1_0BGsvendborg.jpg';			
		}

		var tmpList = this.bgImage.src.split('/');	// SPlit url into an array
		var filename = tmpList[tmpList.length-1];	// Get filename
		var fileId = filename.split('.')[0];		// Filename without postfix 

		// manifest.push({src: this.bgImage.src, id: fileId});	
		// manifest.push({src: this.bgImage.src, id: this.bgImage.id});	

		// for(var i in manifest){
		// 	console.log('manifest: ', manifest[i].id, manifest[i].src)
		// }
		// for(var i in images){
		// 	console.log('images: ', images[i])
		// }

	}catch(err){
		// console.log(PlayerStats.poorhouse, this.bgImage);
		// console.log(err);
	}	
	
	// Load files
	var onFileLoad = function(event){
		if (event.item.type === 'image') { 
			// console.log(event.item.id, event.result);
			images[event.item.id] = event.result; 
		}
	};
	var onLoadComplete = function(event){
		console.log('onLoadComplete');
		// Instantiate view
		self.view = new Clss();

		//Add
		self.container.addChild(self.view);

		// Set start page
		self.next();

		// console.log('PageIntroSlide:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};

	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
}
PageIntroSlide.prototype.next = function(){
	'use strict';
	this.flow.next(this.trigger);	
};
PageIntroSlide.prototype.onComplete = function(event) {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}

	// Set next button active
	this.continueBtn.activate('next');	
};
PageIntroSlide.prototype.onContinue = function(event) {
	'use strict';
	
	// console.log('PageIntroSlide::onContinue');
	
	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	this.next();

	// // console.log('this.playerComponent:', this.playerComponent)
};
PageIntroSlide.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
PageIntroSlide.prototype.destroy = function() {
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
PageIntroSlide.prototype.intro = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set page view
	this.currentPage = this.view.intro;
	this.currentPage.x = 0;

	// Set background
	this.view.bg_container.x = 0;

	// Background
	console.log('this.bgImage.src:', this.bgImage.src);
	var bitmap = new createjs.Bitmap(this.bgImage.src);	
	this.view.bg_container.addChild(bitmap);

	// Slide. Loading is self contained
	this.playerComponent = new PlayerSliderComponent(this.currentPage.player);
	this.listeners.complete = self.playerComponent.on('complete', function(event){
		// console.log('PageIntroSlide::complete');
		self.continueBtn.activate('next');
		Tick.framerate(Tick.low);
	}, self);
	this.playerComponent.on('ready', function(event){
		event.remove();		
		self.continueBtn.activate("skip");
		// self.dispatchEvent(new createjs.Event('ready'));
		// console.log('PageIntroSlide::ready');
		// No tick
		// Tick.framerate(Tick.low);
		// console.log('NB. Disabled tick-disablign as test in PageIntroSlide');
	});
	// // console.log(this.slideLib)
	this.playerComponent.preload(this.slideName, this.slideLib);
	
};
createjs.EventDispatcher.initialize(PageIntroSlide.prototype);


