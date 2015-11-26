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
	this.flow.addAction('4.3', Delegate.create(this.traveling, this), '4.4');
	this.flow.addAction('1113.0', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);


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
FlowGermany2.prototype.onContinue = function(event) {
	'use strict';
	console.log('FlowGermany2::onContinue');	

	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Must be set after stopping player
	this.flow.next(this.trigger);
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
		Tick.framerate(5);
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
		Tick.disable();
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
					self.playerComponent = new PlayerSliderComponent(self.currentPage.player, 13); // Added delay of sound start (frame 14)
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



createjs.EventDispatcher.initialize(FlowGermany2.prototype);