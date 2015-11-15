var FlowGermany1 = function(container){
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.slideLib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '2.5'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.activate('next');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
}

FlowGermany1.prototype.start = function(){
	LoadJS.load(
		['../assets/logic/games/germany1.js', '../assets/logic/slides/slide_2_5.js'], 
		Delegate.create(this.setup, this)
	);
}
FlowGermany1.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	var self = this;
	this.id = 'germany1';

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('2.5', Delegate.create(this.traveling, this), '2.6.1');
	this.flow.addAction('2.6.1', Delegate.create(this.dormitry, this), '2.6.2');
	// this.flow.addAction('2.6.1', Delegate.create(this.dormitry, this), '2.11.1'); // TEST
	this.flow.addAction('2.6.2', Delegate.create(this.points1, this), '2.7.1');
	this.flow.addAction('2.7.1', Delegate.create(this.work, this), '2.7.2');
	this.flow.addAction('2.7.2', Delegate.create(this.points2, this), '2.7.3');
	this.flow.addAction('2.7.3', Delegate.create(this.points3, this), '2.8');
	this.flow.addAction('2.8', Delegate.create(this.chooseSpending, this), '2.9.1');
	this.flow.addAction('2.9.1', Delegate.create(this.spending, this), '2.9.2');
	this.flow.addAction('2.9.2', Delegate.create(this.points4, this), '2.10.1');
	this.flow.addAction('2.10.1', Delegate.create(this.whatNow, this), '2.11.1');
	// this.flow.addAction('2.10.2', Delegate.create(this.chooseWhatNow, this), '2.11.1');
	this.flow.addAction('2.11.1', Delegate.create(this.homeComming, this), '2.11.2');
	this.flow.addAction('2.11.2', Delegate.create(this.points5, this), '3.0');

	try{
		// Load files for flow	
		this.lib = germany1GameLib;
		var Clss = this.lib.germany_1;
		var manifest = this.lib.properties.manifest;
		var onFileLoad = function(event){
			if (event.item.type === 'image') { 
				// console.log('result:', event.item.id, event.result);
				images[event.item.id] = event.result; 
			}
		};
		var onLoadComplete = function(event){
			// console.log('onLoadComplete');

			// Instantiate view
			self.view = new Clss();

			//Add
			self.container.addChild(self.view);

			// Set start page
			self.flow.next(self.trigger);
		};
		Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
	}catch(err) {
   		console.log(err);
   	}
	

	// console.log('manifest:', manifest);
};
// FlowGermany1.prototype.next = function(){
// 	'use strict';
// 	this.flow.next(this.trigger);	
// };
FlowGermany1.prototype.onContinue = function(event) {
	'use strict';
	console.log('FlowGermany1::onContinue');	

	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Must be set after stopping player
	this.flow.next(this.trigger);
};
FlowGermany1.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowGermany1.prototype.destroy = function() {
	'use strict';
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


// Pages ------------------------------------------------------------------------

FlowGermany1.prototype.traveling = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set page view
	this.currentPage = this.view.traveling;
	this.currentPage.x = 0;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_5);
	
	// Slide. Loading is self contained
	try{
		this.slideLib = lib;	
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
		});
		this.playerComponent.preload('slide_2_5', this.slideLib);
	}catch(err){
		console.log(err);
	}
	this.continueBtn.activate('skip');
};
FlowGermany1.prototype.dormitry = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_6);


	// Get sound
	var sound = SoundService.matrix.dormitry;


	// Set portrait (NB. In background!)
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentBackground.portrait.gotoAndStop(frm);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.dormitry;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){

		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.disable();
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.disable();
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));


	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany1.prototype.points1 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('mood', 1);
		PlayerStats.append('health', -1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.work = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Get work related assets
	var bg, slidePath, slideName;
	try{
		bg = this.view['bg_2_7'+PlayerStats.job_germany[0]]; // Index 0 is job choice for the first time in Germany [A,B,C]

		// Get path to slide script
		switch(PlayerStats.job_germany[0]){
			case 'A':
				slideName = 'slide_2_7_1_amory';
			break;
			case 'B':
				slideName = 'slide_2_7_1_mine';
			break;
			case 'C':
				slideName = 'slide_2_7_1_butcher';
			break;
		}
		slidePath = '../assets/logic/slides/'+slideName+'.js';
	}catch(err){
		console.log(err);
	}	

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, bg);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.work;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		try{
			// Load slide
			LoadJS.load(
				[slidePath], 
				Delegate.create(function(){
					// Slide. Loading is self contained
					self.slideLib = lib;	
					self.playerComponent = new PlayerSliderComponent(self.currentPage.player);
					self.listeners.complete = self.playerComponent.on('complete', function(event){
						self.continueBtn.activate('next');
					}, self);
					self.playerComponent.preload(slideName, self.slideLib);
					self.continueBtn.activate('skip');
				}, self)
			);
		}catch(err){
			console.log(err);
		}
	}, this));

	// Ghost continue button
	self.continueBtn.ghost('skip');
};
FlowGermany1.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 2);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.chooseSpending = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_8);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosespending;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(5);
	}, this));

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
		Delegate.create(function(vo){

			// Save chosen 'advice'
			PlayerStats.spending = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	// Desactivate continue button
	this.continueBtn.ghost('next');
};
FlowGermany1.prototype.spending = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Get spending related assets
	var bg, page;
	try{
		bg = this.view['bg_2_9'+PlayerStats.spending];
		page = this.view['spending'+PlayerStats.spending];
	}catch(err){
		console.log(err);
	}	

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, bg);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = page;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		Tick.disable();
	}, this));


	// Desactivate continue button
	this.continueBtn.activate('next');
};
FlowGermany1.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Get spending related assets
	var page;
	try{
		page = this.view['points4'+PlayerStats.spending];
	}catch(err){
		console.log(err);
	}	

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = page;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		console.log(PlayerStats.spending, page);
		switch(PlayerStats.spending){
			case 'A':
				PlayerStats.append('health', 1);
			break;
			case 'B':
				PlayerStats.append('mood', 1);
			break;
			case 'C':
				PlayerStats.append('mood', 1);
				PlayerStats.append('health', -1);
			break;
		}			
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.whatNow = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_10);

	// Get sound
	var sound = SoundService.matrix['2.10.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.whatnow;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.disable();
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.disable();
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));


	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany1.prototype.chooseWhatNow = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosewhatnow;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		Tick.framerate(5);
	}, this));

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Save chosen 'advice'
			PlayerStats.whatnow = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	// Desactivate continue button
	this.continueBtn.ghost('next');
};
FlowGermany1.prototype.homeComming = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_11);

	// Get sound
	var sound = SoundService.matrix['2.11.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.homecomming;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.disable();
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.disable();
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Ghost continue button
	self.continueBtn.ghost('skip');
};
FlowGermany1.prototype.points5 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Get spending related assets
	var page;
	try{
		page = this.view['points5'+PlayerStats.whatnow];
	}catch(err){
		console.log(err);
	}	

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = page;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		switch(PlayerStats.whatnow){
			case 'A':
				PlayerStats.append('money', 1);
			break;
			case 'B':
				PlayerStats.append('money', -1);
			break;
		}			
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	// Next
	this.continueBtn.activate('next');
};
createjs.EventDispatcher.initialize(FlowGermany1.prototype);