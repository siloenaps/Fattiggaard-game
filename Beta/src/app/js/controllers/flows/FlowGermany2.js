var FlowGermany2 = function(container){
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.slideLib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '4.0'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.activate('next');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
}

FlowGermany2.prototype.start = function(){
	LoadJS.load(
		['../assets/logic/games/germany2.js'], 
		Delegate.create(this.setup, this)
	);
}
FlowGermany2.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	var self = this;
	this.id = 'germany2';

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('4.0', Delegate.create(this.chooseJobGermany, this), '4.1');
	this.flow.addAction('4.1', Delegate.create(this.recruitementLetter, this), '4.2');
	this.flow.addAction('4.2', Delegate.create(this.points1, this), '4.3');
	this.flow.addAction('4.3', Delegate.create(this.traveling, this), '4.5.1');
	this.flow.addAction('4.5.1', Delegate.create(this.work, this), '4.5.2');
	this.flow.addAction('4.5.2', Delegate.create(this.points2, this), '4.5.3');
	this.flow.addAction('4.5.3', Delegate.create(this.points3, this), '4.6.1');
	this.flow.addAction('4.6.1', Delegate.create(this.danskFront, this), '4.6.2');
	this.flow.addAction('4.6.2', Delegate.create(this.chooseParticipation, this), '4.6.3');
	this.flow.addAction('4.6.3', Delegate.create(this.points4, this), '4.7_split');
	this.flow.addAction('4.7', Delegate.create(this.warProgresses, this), '4.10.1');
	this.flow.addAction('4.7_split', Delegate.create(this.statsSplit, this), {type: 'health', threshold:4, triggers:['4.10.4', '4.10.1']});
	this.flow.addAction('4.10.1', Delegate.create(this.theBomb, this), '4.10.2');
	this.flow.addAction('4.10.2', Delegate.create(this.choose1, this), '4.10.3');
	this.flow.addAction('4.10.3', Delegate.create(this.points5, this), '4.10.7');
	this.flow.addAction('4.10.4', Delegate.create(this.illness, this), '4.10.5');
	this.flow.addAction('4.10.5', Delegate.create(this.choose2, this), '4.10.6');
	this.flow.addAction('4.10.6', Delegate.create(this.points6, this), '4.10.7');
	this.flow.addAction('4.10.7', Delegate.create(this.goingHome, this), '4.10.8');
	this.flow.addAction('4.10.8', Delegate.create(this.intermezzo, this), 'end');
	this.flow.addAction('end', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);


	// this.flow.addAction('4.11', 
	// 			Delegate.create(
	// 				Flow.statsSplit, this), {
	// 											type: 'health',
	// 											threshold:4, 
	// 											value: PlayerStats.health,
	// 											triggers:['4.10.4', '4.10.1'], 
	// 											callback: Delegate.create(this.next, this)
	// 										}
	// 							);

	try{
		// Load files for flow	
		this.lib = gamelib; //germany1GameLib;
		var Clss = this.lib.germany_2;
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

			self.dispatchEvent(new createjs.Event('ready'));
		};
		Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
	}catch(err) {
   		console.log(err);
   	}
};
FlowGermany2.prototype.next = function(){
	this.flow.next(this.trigger);
	
},
FlowGermany2.prototype.onContinue = function(event) {
	'use strict';
	// console.log('FlowGermany2::onContinue');	

	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Must be set after stopping player
	this.next();
};
FlowGermany2.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowGermany2.prototype.destroy = function() {
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


// Util
FlowGermany2.prototype.statsSplit = function(vo) {
	var value = PlayerStats[vo.type];
	if(value <= vo.threshold){
		this.trigger = vo.triggers[0];
	}else{
		this.trigger = vo.triggers[1];
	}
	this.next();
}

// Pages ------------------------------------------------------------------------


FlowGermany2.prototype.chooseJobGermany = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_0);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosejob;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Next in flow
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkboxA, this.currentPage.checkboxB, this.currentPage.checkboxC],
		['A', 'B', 'C'],
		Delegate.create(function(vo){

		// Save chosen 'second job in Germany'
		PlayerStats.job_germany[1] = vo.value;

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

	// Disable checkbox
	CheckboxGroup.disableCheckbox(PlayerStats.job_germany[0]);
	this.currentPage['cbText'+PlayerStats.job_germany[0]].alpha = .2;
};
FlowGermany2.prototype.recruitementLetter = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.recruitementletter;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
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
FlowGermany2.prototype.points1 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('money', 1);
		PlayerStats.append('mood', 1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.traveling = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_3);
	
	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.traveling;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		try{
			// Load slide
			LoadJS.load(
				['../assets/logic/slides/slide_4_3.js'], 
				Delegate.create(function(){
					// Slide. Loading is self contained
					self.slideLib = slidelib;	
					self.playerComponent = new PlayerSliderComponent(self.currentPage.player); // Added delay of sound start (frame 14)
					self.listeners.complete = self.playerComponent.on('complete', function(event){
						self.continueBtn.activate('next');
					}, self);
					self.playerComponent.preload('slide_4_3', self.slideLib);
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
FlowGermany2.prototype.work = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Get work related assets
	var slidePath, slideName;
	try{
		// Get path to slide script
		var combi = PlayerStats.job_germany[0]+PlayerStats.job_germany[1];
		slideName = 'slide_4_5_1_' + combi; // E.g. slide_4_5_1_AC
		slidePath = '../assets/logic/slides/'+slideName+'.js';
	}catch(err){
		console.log(err);
	}	

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_5_1);

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
					self.slideLib = slidelib;	
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
FlowGermany2.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_5_2);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 2);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.danskFront = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_6);

	// Get sound
	var sound = SoundService.matrix['4.6.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.danskfront;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.chooseParticipation = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.chooseparticipation;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

		// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Save chosen 'advice'
			PlayerStats.nazi = vo.value;

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

	this.continueBtn.ghost('next');
};
FlowGermany2.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points4;
	this.currentPage.gotoAndStop(PlayerStats.nazi);
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		switch(PlayerStats.nazi){
			case 'A':
				PlayerStats.append('mood', -1);
			break;
			case 'B':
				PlayerStats.append('mood', 1);
			break;
		}
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.warProgresses = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Get path to slide script
	var slideName = 'slide_4_7';
	var slidePath = '../assets/logic/slides/'+slideName+'.js';

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.warprogresses;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		try{
			// Load slide
			LoadJS.load(
				[slidePath], 
				Delegate.create(function(){
					// Slide. Loading is self contained
					self.slideLib = slidelib;	
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
FlowGermany2.prototype.theBomb = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Got the bomb
	PlayerStats.bomb = true;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_1);

	// Get sound
	var sound = SoundService.matrix['4.10.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.thebomb;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.illness = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_4);

	// Get sound
	var sound = SoundService.matrix['4.10.4'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.illness;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.choose1 = function(trigger) {
	'use strict';
	var self = this;

	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choose1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

		// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Choice
			PlayerStats['4.10.2'] = vo.value;

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

	this.continueBtn.ghost('next');
};
FlowGermany2.prototype.points5 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	var previousChoice = PlayerStats['4.10.2'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points5;
	this.currentPage.gotoAndStop(previousChoice);
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		switch(previousChoice){
			case 'A':
				PlayerStats.append('money', -2);
			break;
			case 'B':
				PlayerStats.append('money', 2);
			break;
		}
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.choose2 = function(trigger) {
	'use strict';
	var self = this;

	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choose1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

		// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Choice
			PlayerStats['4.10.5'] = vo.value;

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

	this.continueBtn.ghost('next');
};
FlowGermany2.prototype.points6 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	var previousChoice = PlayerStats['4.10.5'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points5;
	this.currentPage.gotoAndStop(previousChoice);
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		switch(previousChoice){
			case 'A':
				PlayerStats.append('money', -1);
			break;
			case 'B':
				PlayerStats.append('money', 1);
			break;
		}
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.goingHome = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_7);

	// Get sound
	var sound = SoundService.matrix['4.10.7'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.goinghome;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.intermezzo = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_8);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = null;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Next
	this.continueBtn.activate('next');
};
createjs.EventDispatcher.initialize(FlowGermany2.prototype);