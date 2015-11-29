var FlowPoorhouseSecond = function(container, id){
	'use strict';
	this.container = container;
	this.id = id; 
	this.view = null;	
	this.lib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '3.1'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

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
		['../assets/logic/games/'+this.id+'_second.js'], 
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
	this.flow.addAction('3.1', Delegate.create(this.chooseJob, this), '3.2.1');
	this.flow.addAction('3.2.1', Delegate.create(this.work, this), '3.2.2');
	this.flow.addAction('3.2.2', Delegate.create(this.points1, this), '3.3');
	this.flow.addAction('3.3', Delegate.create(this.getout, this), '3.4.1');
	this.flow.addAction('3.4.1', Delegate.create(this.playAdvice, this), '3.4.2');
	this.flow.addAction('3.4.2', Delegate.create(this.playAdvice, this), '3.5');
	this.flow.addAction('3.5', Delegate.create(this.chooseWayOut, this), {'A':'3.6.1', 'B':'3.8'});
	this.flow.addAction('3.6.1', Delegate.create(this.farmWork, this), '3.6.2');
	this.flow.addAction('3.6.2', Delegate.create(this.points2, this), '3.7.1');
	this.flow.addAction('3.7.1', Delegate.create(this.farmworkEnded, this), '3.7.2');
	this.flow.addAction('3.7.2', Delegate.create(this.points3, this), '4.0');
	this.flow.addAction('3.8', Delegate.create(this.letterWrite, this), '3.9');
	this.flow.addAction('3.9', Delegate.create(this.letterAnswer, this), '3.10');
	this.flow.addAction('3.10', Delegate.create(this.points4, this), '4.0');
	this.flow.addAction('4.0', Delegate.create(
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
			Clss = this.lib.horsens_second;
			manifest = this.lib.properties.manifest;
		break;
		case 'sundholm':
			// this.lib = sundbyGameLib;
			Clss = this.lib.sundholm_second;
			manifest = this.lib.properties.manifest;
		break;
		case 'svendborg':	
			
			Clss = this.lib.svendborg_second;
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

FlowPoorhouseSecond.prototype.chooseJob = function(trigger) {
	'use strict';
	var self = this;

	console.log('chooseJob');

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosework;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(5);
	}, this));

	// Desactivate continue button
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
		Delegate.create(function(vo){
			// Save chosen 'job'
			PlayerStats.job = vo.value;

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
};
FlowPoorhouseSecond.prototype.work = function(trigger) {
	'use strict';

	var self = this;

	// Next move
	this.trigger = trigger;

	this.continueBtn.activate('skip');

	// Get sound
	var sound = SoundService.matrix['3.2.1'][this.id][PlayerStats.job]; // "svendborg/A"	
	// this.soundEffectPlay(SoundService.matrix.effects.woodchopper);
	
	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view['bg_3_2_1'+PlayerStats.job]);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.work;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Tick.disable();

		// Sound	
		self.listeners.complete = this.playerComponent.on('complete', function(event){
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
	self.playerComponent = new PlayerSoundComponent(self.currentPage.player);

	// Nxt button
	self.continueBtn.ghost('skip');
};
FlowPoorhouseSecond.prototype.points1 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.getout = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_3);

	// Get sound
	var sound = SoundService.matrix[currentTrigger];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.getout;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
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

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.playAdvice = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;
	
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;

	// Set new page out
	switch(currentTrigger){
		case '3.4.1': // Employee
			this.currentPage = this.view.adviceemployee;
		break;
		case '3.4.2': // Inmate
			this.currentPage = this.view.adviceinmate;	
		break;		
	}	

	// Get sound
	var sound = SoundService.matrix[currentTrigger];
	
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
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

	// Portrait
	// this.currentPage.portrait.gotoAndStop(this.id);

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouseSecond.prototype.chooseWayOut = function(triggers) {
	'use strict';
	var self = this;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosewayout;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(5);
	}, this));

	// Desactivate continue button
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

		// Save chosen 'way out'
		PlayerStats.wayout = vo.value;
		self.trigger = triggers[PlayerStats.wayout]; // Set trigger due to choice!!

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
};
FlowPoorhouseSecond.prototype.farmWork = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_6);

	// Get sound
	var sound = SoundService.matrix[currentTrigger];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.farmwork;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.disable();
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.farmworkEnded = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_7);

	// Get sound
	var sound = SoundService.matrix[currentTrigger];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.workended;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
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

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.letterWrite = function(trigger) {
	'use strict';
	var self = this;

	self.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.letterwrite;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(5);
	}, this));

	// Dropdowns
	var dropdown1 = new Dropdown(this.currentPage.dropdown_A);
	var dropdown2 = new Dropdown(this.currentPage.dropdown_B);
	var dropdown3 = new Dropdown(this.currentPage.dropdown_C);

	// Close dropdowns when entering the fullscreen button ... whcih willl happen every toe you leave a dropdown
	var fullscreenButton = this.currentPage.fullscreenButton;
	var screenListener = fullscreenButton.on('mouseover', function(){
		dropdown1.setActive(false);
		dropdown2.setActive(false);
		dropdown3.setActive(false);
	});

	// Name
	var frm = PlayerStats.challenge + PlayerStats.family;
   	this.view.realname.gotoAndStop(frm);

   	// Special conitnue event event listener
   	this.continueBtn.on('click', function(event){
   		event.remove();
   		fullscreenButton.off('click', screenListener);
   	});
};
FlowPoorhouseSecond.prototype.letterAnswer = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.letteranswer;

	// New page in
	Transitions.transInAlpha(this.currentPage);

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points4;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};

createjs.EventDispatcher.initialize(FlowPoorhouseSecond.prototype);


