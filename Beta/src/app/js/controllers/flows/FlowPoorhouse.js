var FlowPoorhouse = function(container){
	'use strict';
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '1.0.2'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};
FlowPoorhouse.prototype.soundEffectPlay = function(sound){
	// Sound effect
	if(this.soundEffect != null){
		this.soundEffect.destroy();
		this.soundEffect = null;
	}

	try{
		// var sound = SoundService.matrix.effects.typewriter;
		this.soundEffect = new SoundEffect(sound.src, true);	
		this.soundEffect.volume(sound.volume);
		this.soundEffect.play();
	}catch(err){
		console.log(err);
	}
	
};
FlowPoorhouse.prototype.soundEffectStop = function(sound){
	// Sound effect
	if(this.soundEffect != null){
		this.soundEffect.stop();
		this.soundEffect.destroy();
		this.soundEffect = null;
	}
};
FlowPoorhouse.prototype.start = function(){
	this.id = PlayerStats.poorhouse;
	var gameFile;

	// console.log('FlowPoorhouse:start');

	LoadJS.load(
		['../assets/logic/games/'+this.id+'.js'], 
		Delegate.create(this.setup, this)
	);
};
FlowPoorhouse.prototype.setup = function(){
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
	this.flow.addAction('1.0.2', Delegate.create(this.points1, this), '1.1.1');
	this.flow.addAction('1.1.1', Delegate.create(this.caretaker, this), '1.1.2');
	this.flow.addAction('1.1.2', Delegate.create(this.chooseJob, this), '1.2.1');
	this.flow.addAction('1.2.1', Delegate.create(this.work, this), '1.2.2');
	this.flow.addAction('1.2.2', Delegate.create(this.points2, this), '1.3.1');
	this.flow.addAction('1.3.1', Delegate.create(this.points3, this), '1.3.2');
	this.flow.addAction('1.3.2', Delegate.create(this.getout, this), '1.3.3');
	this.flow.addAction('1.3.3', Delegate.create(this.playAdvice, this), '1.3.4');
	this.flow.addAction('1.3.4', Delegate.create(this.playAdvice, this), '1.3.5');
	this.flow.addAction('1.3.5', Delegate.create(this.chooseWayOut, this), {'A':'1.5.1', 'B':'2.1'}); 
	this.flow.addAction('1.5.1', Delegate.create(this.drunk, this), '1.5.2');
	this.flow.addAction('1.5.2', Delegate.create(this.points7, this), '1.6.1');
	this.flow.addAction('1.6.1', Delegate.create(this.constable, this), '1.6.2');
	this.flow.addAction('1.6.2', Delegate.create(this.report, this), '1.6.3');
	this.flow.addAction('1.6.3', Delegate.create(this.points6, this), '1.8');	
	this.flow.addAction('1.8', Delegate.create(this.backToPoorhouse, this), '2.1');
	this.flow.addAction('2.1', Delegate.create(this.recruimentOffice, this), '2.2.1');
	this.flow.addAction('2.2.1', Delegate.create(this.jobInterviewPart1, this), '2.2.2');
	this.flow.addAction('2.2.2', Delegate.create(this.chooseJobGermany, this), '2.2.3');
	this.flow.addAction('2.2.3', Delegate.create(this.jobInterviewPart2, this), '2.2.4');
	this.flow.addAction('2.2.4', Delegate.create(this.points8, this), '2.3');
	this.flow.addAction('2.3', Delegate.create(this.recruitementLetter, this), '2.4');
	this.flow.addAction('2.4', Delegate.create(this.points9, this), '2.5');
	this.flow.addAction('2.5', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);

	// this.id = 'svendborg';
	// console.log('FlowPoorhouse:setup', this.id);

	this.lib = gamelib;
	switch(this.id){
		case 'horsens':			
			// this.lib = horsensGameLib;
			Clss = this.lib.horsens;
			manifest = this.lib.properties.manifest;
		break;
		case 'sundholm':
			// this.lib = sundbyGameLib;
			Clss = this.lib.sundholm;
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

		// console.log('FlowPoorhouse:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};
	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
};
FlowPoorhouse.prototype.next = function(){
	'use strict';

	// // Allow tick
	// Tick.enable();
	// Tick.framerate(15);

	this.flow.next(this.trigger);	
};
FlowPoorhouse.prototype.onComplete = function(event) {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}

	// Set next button active
	this.continueBtn.activate('next');	
};
FlowPoorhouse.prototype.onContinue = function(event) {
	'use strict';
	
	// console.log('FlowPoorhouse::onContinue');
	
	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Sound effect - stop
	this.soundEffectStop();

	this.next();

	// console.log('this.playerComponent:', this.playerComponent)
};
FlowPoorhouse.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowPoorhouse.prototype.destroy = function() {
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
FlowPoorhouse.prototype.points1 = function(trigger) {
	'use strict';

	// Next move
	this.trigger = trigger;

	// 	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_0);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	this.currentPage.x = 0;
	PlayerStats.append('mood', -1);
	PlayerStats.append('health', 1);
	Topbar.pointsUpdate();
	
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.caretaker = function(trigger) {
	'use strict';

	var self = this;

	// Next move
	this.trigger = trigger;
	
	// Get sound
	var sound = SoundService.matrix['1.1.1'][this.id]; // E.g. this.id == 'svendborg'

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.caretaker;
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
	this.playerComponent = new PlayerSoundComponent(self.currentPage.player);

	// Desactivate continue button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.chooseJob = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

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
FlowPoorhouse.prototype.work = function(trigger) {
	'use strict';

	var self = this;

	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	this.continueBtn.activate('skip');

	// Get sound
	var sound = SoundService.matrix[currentTrigger][this.id][PlayerStats.job]; // "svendborg/A"	
	// this.soundEffectPlay(SoundService.matrix.effects.woodchopper);
	
	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view['bg_1_2'+PlayerStats.job]);

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
FlowPoorhouse.prototype.points2 = function(trigger) {
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
FlowPoorhouse.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_3);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', -2);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.getout = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Get sound
	var sound = SoundService.matrix[currentTrigger];
	console.log(sound);

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
FlowPoorhouse.prototype.playAdvice = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;
	
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;

	// Set new page out
	switch(currentTrigger){
		case '1.3.3': // Inmate
			this.currentPage = this.view.adviceinmate;	
		break;
		case '1.3.4': // Employee
			this.currentPage = this.view.adviceemployee;
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
FlowPoorhouse.prototype.chooseWayOut = function(triggers) {
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
FlowPoorhouse.prototype.drunk = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_5);

	// Get sound
	var sound = SoundService.matrix.drunk;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.drunk;
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


	// Portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.points7 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points7;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('mood', 1);
		Topbar.pointsUpdate();
		Tick.disable();
		console.log('QUE');
	}, this));

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.constable = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_6);

	// Get sound
	var sound = SoundService.matrix.constable;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.constable;
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

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.report = function(trigger) {
	'use strict';
	var self = this;

	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.report;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.disable();
	}, this));

	// Sound effect
	this.soundEffectPlay(SoundService.matrix.effects.typewriter);

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points6 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points6;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	// Next button
	this.continueBtn.activate('next');
};

FlowPoorhouse.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points4;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('mood', 1);
			Topbar.pointsUpdate();
		});

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points5 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points5;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
	});

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.backToPoorhouse = function(trigger) {
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_8);

	// Get sound
	var sound = SoundService.matrix['1.8'];

	// Pages in/out
	var previousPage = this.currentPage;
	// this.currentPage = this.view.prerecruitment;
	this.currentPage = this.view.backtopoorhouse;
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

	// Next bnutton
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.preRecruitment = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_9);

	// Get sound
	var sound = SoundService.matrix.prerecruitment[this.id]; // "svendborg"

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.prerecruitment;
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

	// Next bnutton
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.recruimentOffice = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.recruitementoffice;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.disable();
	}, this));

	// Next in flow
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.jobInterviewPart1 = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_2);

	// Get sound
	var sound = SoundService.matrix['2.2.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.jobinterviewpart1;
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

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.chooseJobGermany = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosejob;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(5);
	}, this));

	// Next in flow
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
		Delegate.create(function(vo){

		// Save chosen 'first job in Germany'
		PlayerStats.job_germany[0] = vo.value;

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
FlowPoorhouse.prototype.jobInterviewPart2 = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Get sound
	var sound = SoundService.matrix['2.2.3'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.jobinterviewpart2;
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

	// Next Button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.points8 = function(trigger){
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points8;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 2);
		PlayerStats.append('mood', 1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.recruitementLetter = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_3);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.recruitementletter;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(5);
	}, this));

	// Dropdowns
	var dropdown1 = new Dropdown(this.currentPage.dropdown);
	
	// Close dropdowns when entering the fullscreen button ... whih will happen every time you leave a dropdown
	var fullscreenButton = this.currentPage.fullscreenButton;
	var screenListener = fullscreenButton.on('mouseover', function(){
		dropdown1.setActive(false);
	});

	// Set name
	var frm = PlayerStats.challenge + PlayerStats.family;
	console.log('frm:', frm);
   	this.currentPage.realname.gotoAndStop(frm);

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points9 = function(trigger){
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points9;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.disable();
	}, this));

	// Next button
	this.continueBtn.activate('next');
};
createjs.EventDispatcher.initialize(FlowPoorhouse.prototype);


