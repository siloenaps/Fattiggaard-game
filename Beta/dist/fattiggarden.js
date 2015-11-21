var RadioButton = function(view, args){
	'use strict';

	if(view === null){
		console.log('RadioButton view is null:', this);
		return;
	}

	// view.gotoAndStop('inactive');
	view.stop();

	this.view = view;	
	this.active = false;
	this.enabled = true;
	this.args = args;
	this.listeners = {};

	// Events
	if(this.listeners.click === undefined || this.listeners.click === null){		
		this.listeners.click = this.view.on('click', this.onClick, this);
	}

	if(this.listeners.mouseover === undefined || this.listeners.mouseover === null){
		this.listeners.mouseover = this.view.on('mouseover', this.onOver, this);
	}

	if(this.listeners.mouseout === undefined || this.listeners.mouseout === null){
		this.listeners.mouseout = this.view.on('mouseout', this.onOut, this);
	}

	// Set id by the help of a static variable (counter)
	if(RadioButton.counter === undefined){
		RadioButton.counter = 0;
	}else{
		RadioButton.counter++;
	}

	// ID
	this.id = RadioButton.counter;
};
RadioButton.prototype.getValue = function(){
	'use strict';
	return this.args.value;
};
RadioButton.prototype.disable = function(){
	'use strict';
	this.enabled = false;
	// this.mouseEnabled = false;
};
RadioButton.prototype.setActive = function(state){
	'use strict';
	// Set state
	if(state){
		this.view.gotoAndStop('active');
		this.active = true;
		this.mouseEnabled = false;
	}else{
		this.view.gotoAndStop('inactive');
		this.active = false;
		this.mouseEnabled = true;
	}
};
RadioButton.prototype.onClick = function(event){
	'use strict';
	if(this.active || !this.enabled){
		return false;
	}

	// Dispatch event
	var e = new createjs.Event('click');
 	this.dispatchEvent(e);
};
RadioButton.prototype.onOver = function(event){
	'use strict';
	if(!this.enabled){
		return;
	}

	// Rollover cursor
	Cursor.over();
};
RadioButton.prototype.onOut = function(event){
	'use strict';
	if(!this.enabled){
		return;
	}

	// Back to default cursor
	Cursor.out();
};
RadioButton.prototype.reset = function(){
	'use strict';
	this.active = false;
	this.enabled = true;
	this.view.gotoAndStop('inactive');
};
RadioButton.prototype.destroy = function(){
	'use strict';
	this.view = null;	
	this.active = false;
	this.enabled = true;
	this.args = null;
	this.listeners = null;
};
createjs.EventDispatcher.initialize(RadioButton.prototype);
var Dropdown = function(view, args){
	'use strict';

	if(view === null){
		console.log('Dropdown view is null:', this);
		return;
	}

	// view.gotoAndStop('inactive');
	view.stop();

	this.view = view;	
	this.active = true;
	// this.enabled = true;
	this.args = args;
	this.listeners = {};

	// Events
	if(this.listeners.click === undefined || this.listeners.click === null){		
		this.listeners.click = this.view.hitarea.on('click', this.onClick, this);
	}


	// if(this.listeners.mouseover === undefined || this.listeners.mouseover === null){
	// 	this.listeners.mouseover = this.view.on('mouseover', this.onOver, this);
	// }

	// if(this.listeners.mouseout === undefined || this.listeners.mouseout === null){
	// 	this.listeners.mouseout = this.view.on('mouseout', this.onOut, this);
	// }

	// Set id by the help of a static variable (counter)
	if(Dropdown.counter === undefined){
		Dropdown.counter = 0;
	}else{
		Dropdown.counter++;
	}

	// ID
	this.id = Dropdown.counter;

	// Reset label
	this.view.label.text = '';

	// Template for dropdown items
	this.item = function(id, view, callback){
		this.id = id;
		this.listener = view.on('click', function(event){
			callback(view);
		}, this);
	}

	// Items
	var self = this;
	var cb = function(view){
		createjs.Tween.get(view)
			.to({alpha:0}, 40, createjs.Ease.linear)
			.to({alpha:1}, 40, createjs.Ease.linear)
			.to({alpha:0}, 40, createjs.Ease.linear)
			.to({alpha:1}, 40, createjs.Ease.linear)
			.call(function(){
				self.view.label.text = view.label.text;
				self.view.gotoAndStop('closed');
			});
	}
	var item1 =  new this.item('A', this.view.item_A, cb);
	var item2 =  new this.item('B', this.view.item_B, cb);
	var item3 =  new this.item('C', this.view.item_C, cb);
	

	// this.items = [];
	// this.items.push();
};
// Dropdown.prototype.getValue = function(){
// 	'use strict';
// 	return this.args.value;
// };
// Dropdown.prototype.disable = function(){
// 	'use strict';
// 	this.enabled = false;
// 	// this.mouseEnabled = false;
// };
Dropdown.prototype.setActive = function(state){
	'use strict';
	// Set state
	if(state){
		this.view.gotoAndStop('open');
	}else{
		this.view.gotoAndStop('closed');
	}
};
Dropdown.prototype.onClick = function(event){
	'use strict';
	this.view.gotoAndStop('open');

	// Dispatch event
	var e = new createjs.Event('click');
 	this.dispatchEvent(e);
};
// Dropdown.prototype.onOver = function(event){
// 	'use strict';
// 	if(!this.enabled){
// 		return;
// 	}

// 	// Rollover cursor
// 	Cursor.over();
// };
// Dropdown.prototype.onOut = function(event){
// 	'use strict';
// 	this.view.gotoAndStop('closed');

// 	// Back to default cursor
// 	Cursor.out();
// };
Dropdown.prototype.reset = function(){
	'use strict';
	// this.active = false;
	this.enabled = true;
	this.view.gotoAndStop('inactive');
};
Dropdown.prototype.destroy = function(){
	'use strict';
	this.view = null;	
	this.active = false;
	this.enabled = true;
	this.args = null;
	this.listeners = null;
};
createjs.EventDispatcher.initialize(Dropdown.prototype);
var Cursor = {
	root: null,
	init: function(root){
		'use strict';
		this.root = root;
	},
	over: function(){
		'use strict';
		this.root.cursor = 'pointer';
	},
	out: function(){
		'use strict';
		this.root.cursor = 'auto';
	}
};
var ContinueButton = {
	init: function(view){
		this.type = null;

		// Safety belt
		this.destroy();		

		this.view = view;
		this.nextBtnInstance = null;
		this.skipBtnInstance = null;
		this.listners = {};


		if(this.nextBtnInstance === null){
			this.nextBtnInstance = new ButtonCustom(this.view.nextBtn);
		}
		if(this.skipBtnInstance === null){
			this.skipBtnInstance = new ButtonCustom(this.view.skipBtn);
		}

		// Default is none are visible
		this.skipBtnInstance.visible(false);
		this.nextBtnInstance.visible(false);
		
		// Events
		this.listners.skip = this.skipBtnInstance.on('click', this.onClick, this);
		this.listners.next = this.nextBtnInstance.on('click', this.onClick, this);
	},
	activate: function(type){
		this.type = type;
		switch(type){
			case 'next':
				this.skipBtnInstance.visible(false);
				// this.nextBtnInstance.visible(true);
				this.nextBtnInstance.setActive(true);
			break;
			case 'skip':
				this.skipBtnInstance.setActive(true);
				this.nextBtnInstance.visible(false);
			break;
		}
	},
	ghost: function(type){
		this.type = type;
		switch(type){
			case 'next':
				this.skipBtnInstance.visible(false);
				this.nextBtnInstance.setActive(false);
			break;
			case 'skip':
				this.skipBtnInstance.setActive(false);
				this.nextBtnInstance.visible(false);
			break;
		}
	},
	hide: function(){
		switch(this.type){
			case 'next':
				this.nextBtnInstance.visible(false);
			break;
			case 'skip':
				this.skipBtnInstance.visible(false);
			break;
		}
	},
	show: function(){
		switch(this.type){
			case 'next':
				this.nextBtnInstance.visible(true);
			break;
			case 'skip':
				this.skipBtnInstance.visible(true);
			break;
		}
	},
	onClick: function(event){
		var e = new createjs.Event('click');
 		this.dispatchEvent(e);
	},
	destroy: function(){
		if(this.listners !== undefined){
			if(this.listners.skip != null){
				this.skipBtnInstance.off('click', this.listners.skip);
			}
			if(this.listners.next != null){
				this.nextBtnInstance.off('click', this.listners.next);
			}
		}
		this.view = null;
	}
}
createjs.EventDispatcher.initialize(ContinueButton);

var CheckboxGroup = {
	clickedCounter: 0,
	setup: function(viewList, valueList, delegate){
		'use strict';
		var self = this;

		// this.clear();
		
		this.clickedCounter = 0;
		
		this.delegate = delegate;

		// Group
		this.group = new ButtonGroup();

		for (var i = 0; i < viewList.length; i++) {
			// Checkbox
			var cb = new RadioButton(viewList[i], {value:valueList[i]});
			this.group.add(cb);
		};

		// Checkbox events
		this.listener = this.group.on('click', function(event){
			self.clickedCounter++;
			if(self.delegate != null)
				self.delegate({clicked: self.clickedCounter, value: event.data.value});
		});
	},
	clear: function(){
		'use strict';
		// Clean eventual previous events and delegates
		if(this.group != null){
			this.group.reset();
			if(this.listener != null){
				this.group.off('click', this.listener);
			}
			this.group = null;
		}
		this.delegate = null;
	}
}
function ButtonGroup(){
	'use strict';
	this.selected = null;
	this.buttonList = [];
}

ButtonGroup.prototype.add = function(button){
	'use strict';
	button.on('click', this.onClick, this);
	this.buttonList.push(button);	
};
ButtonGroup.prototype.setSelected = function(index){
	'use strict';
	var self = this;
	setTimeout(function(){
		self.buttonList[index].setActive(true);
	}, 100);	
};
ButtonGroup.prototype.onClick = function(event){
	'use strict';
	// console.log(event.target);
	var target = event.target;

	// Toggle state on previous button
	if(this.selected !== null){
		if(this.selected.active){
			this.selected.setActive(false);
		}else{
			this.selected.setActive(true);
		}
	}

	// Toggle state on new button
	if(target.active){
		target.setActive(false);
	}else{
		target.setActive(true);
	}

	// Set active button
	this.selected = target;

	// Dispatch event
	var e = new createjs.Event('click');
	e.data = { value: target.getValue() };
 	this.dispatchEvent(e);
};
ButtonGroup.prototype.disable = function(){
	'use strict';
	for(var i=0; i<this.buttonList.length; i++){
		var btn = this.buttonList[i];
		btn.disable();
	}
};
ButtonGroup.prototype.getButtonByValue = function(value){
	'use strict';
	for(var i=0; i<this.buttonList.length; i++){
		var btn = this.buttonList[i];
		if(btn.getValue() === value){
			return btn;
		}
	}
};
ButtonGroup.prototype.reset = function(){
	'use strict';
	this.selected = null;
	
	// Reset all buttons in group
	for(var i=0; i<this.buttonList.length; i++){
		var btn = this.buttonList[i];
		btn.reset();
	}
};
ButtonGroup.prototype.destroy = function(){
	'use strict';
	// Reset all buttons in group
	for(var i=0; i<this.buttonList.length; i++){
		var btn = this.buttonList[i];
		btn.destroy();
	}
	this.buttonList = null;
	this.selected = null;
};
createjs.EventDispatcher.initialize(ButtonGroup.prototype);
var ButtonCustom = function(view){
	'use strict';
	this.view = view;	
	this.active = true;

	// Events
	this.view.on('click', this.onClick, this);
	this.view.on('mouseover', this.onOver, this);
	this.view.on('mouseout', this.onOut, this);

	// Set id by the help of a static variable (counter)
	if(ButtonCustom.counter === null){
		ButtonCustom.counter = 0;
	}else{
		ButtonCustom.counter++;
	}

	// ID
	this.id = ButtonCustom.counter;
};
ButtonCustom.prototype.visible = function(state){
	'use strict';
	this.view.visible = state;
};
ButtonCustom.prototype.setActive = function(state){
	'use strict';
	this.view.visible = true;
	this.active = state;
	if(this.active){
		this.view.alpha = 1;
	}else{
		this.view.alpha = 0.2;
	}
	this.view.mouseEnabled = state;
};

ButtonCustom.prototype.onClick = function(event){
	'use strict';
	// console.log('ButtonCustom.onClick', this.active);
	if(!this.active){
		return false;
	}

	// Dispatch event
	var e = new createjs.Event('click');
 	this.dispatchEvent(e);
};

ButtonCustom.prototype.onOver = function(event){
	'use strict';
	if(!this.active){
		return false;
	}

	// Rollover cursor
	// exportRoot.cursor = 'pointer';
	Cursor.over();
};
ButtonCustom.prototype.onOut = function(event){
	'use strict';
	if(!this.active){
		return false;
	}

	// Back to default cursor
	// exportRoot.cursor = 'auto';
	Cursor.out();
};
ButtonCustom.prototype.destroy = function(){
	this.view = null;
}

createjs.EventDispatcher.initialize(ButtonCustom.prototype);
var PageStart = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.continueBtn = ContinueButton;
	this.continueBtn.activate("next");
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
};
PageStart.prototype.start = function() {
	Tick.disable();
};
PageStart.prototype.onContinue = function(event) {
	this.continueBtn.off('click', this.listeners.continue);	
	this.dispatchEvent(new createjs.Event('continue'));
};
PageStart.prototype.destroy = function() {
	this.view = null;	
};
createjs.EventDispatcher.initialize(PageStart.prototype);
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



var PageOpinion = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.activePlayer = null;

	this.playersCount = 0;
	this.completed = 0;

	var key = PlayerStats.challenge + PlayerStats.family;

	// Get sound
	this.soundChallengeObject = SoundService.matrix.oppinion[key];

	// Set Text
	this.view.charactertext.gotoAndStop(key);
	this.view.playerlabel.gotoAndStop(key);


	// Player - Challenge
	// view.player.visible = false;
	if(this.soundChallengeObject != null){
		// view.player.visible = true;
		this.challengePlayerComponent = new PlayerSoundComponent(view.player);
		this.challengePlayerComponent.preload(this.soundChallengeObject.src, this.soundChallengeObject.duration);
		this.playersCount++;

		this.listeners.challengeStart = this.challengePlayerComponent.on("start", this.onSoundStart, this);

		this.listeners.challenge = this.challengePlayerComponent.on('complete', this.onComplete, this);
	}

	// Continue/Skip button
	this.continueBtn = ContinueButton;
	this.continueBtn.activate("skip");
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
};
PageOpinion.prototype.onSoundStart = function(event) {
	// If there is a player active, pause it
	if(this.activePlayer != null){
		if(event.target.id != this.activePlayer.id){
			this.activePlayer.pause();
		}
	}

	// Save activated player
	this.activePlayer = event.target;
};
PageOpinion.prototype.onComplete = function(event){
	this.completed++;
	if(this.completed >= this.playersCount){
		if(this.challengePlayerComponent !== undefined){
			this.challengePlayerComponent.off('complete', this.listeners.challenge);
		}
		if(this.familyPlayerComponent !== undefined){
			this.familyPlayerComponent.off('complete', this.listeners.family);
		}

		this.continueBtn.activate("next");
	}
};
PageOpinion.prototype.start = function() {
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.view.portrait.gotoAndStop(frm);
};
PageOpinion.prototype.onContinue = function(event) {
	this.continueBtn.off('click', this.listeners.continue);

	// Stop sound if it still on
	if(this.challengePlayerComponent !== undefined){
		this.challengePlayerComponent.stop();
	}

	if(this.familyPlayerComponent !== undefined){
		this.familyPlayerComponent.stop();
	}

	this.dispatchEvent(new createjs.Event('continue'));
};
PageOpinion.prototype.destroy = function() {
	this.view = null;	

	if(this.challengePlayer != null){
		this.challengePlayer.destroy();
		this.challengePlayer = null;
	}
	if(this.familyPlayerComponent != null){
		this.familyPlayerComponent.destroy();
		this.familyPlayerComponent = null;
	}

	this.activePlayer = null;
};
createjs.EventDispatcher.initialize(PageOpinion.prototype);
var PageMap = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.continueBtn = ContinueButton;
	this.continueBtn.ghost("next");	
};
PageMap.prototype.start = function() {
	var self = this;

	// Allow tick
	Tick.enable();
	Tick.framerate(5);

	// Checkboxes
	var btn1 = new RadioButton(this.view.checkbox1, {value:'horsens'});
	var btn2 = new RadioButton(this.view.checkbox2, {value:'sundby'});
	var btn3 = new RadioButton(this.view.checkbox3, {value:'svendborg'});

	// Group
	this.group = new ButtonGroup();
	this.group.add(btn1);
	this.group.add(btn2);
	this.group.add(btn3);

	// Events
	this.listeners.group = this.group.on("click", function(event){
		// Save chosen "fattiggård"
		PlayerStats.poorhouse = event.data.value;

		// User may continue
		self.continueBtn.activate('next');
		self.continueBtn.on('click', function(e){
			e.remove();
			event.remove();

			self.view.info1.off('click', self.listeners['info1']);
			self.view.info2.off('click', self.listeners['info2']);
			self.view.info3.off('click', self.listeners['info3']);

			self.dispatchEvent(new createjs.Event('continue'));
		});
	}, self);


	// Info popup
	this.view.infopopup.visible = false;
	this.infoButtons = [];
	this.infoButtons.push(this.view.info1);
	this.infoButtons.push(this.view.info2);
	this.infoButtons.push(this.view.info3);
	this.view.info1.id = 1;
	this.view.info2.id = 2;
	this.view.info3.id = 3;
	// Info buttons events
	this.listeners['info1'] = this.view.info1.on('click', function(event){
		this.openInfo(event.target.id);
	}, this);
	this.listeners['info2'] = this.view.info2.on('click', function(event){
		this.openInfo(event.target.id);
	}, this);
	this.listeners['info3'] = this.view.info3.on('click', function(event){
		this.openInfo(event.target.id);
	}, this);
	// Close button	
	this.listeners['closebutton'] = this.view.infopopup.closebutton.on('click', function(event){
		this.closeInfo();
	}, this);
};
PageMap.prototype.openInfo = function(id) {
	this.view.infopopup.gotoAndStop(id-1);
	this.view.infopopup.x = 0;
	this.view.infopopup.visible = true;
	this.continueBtn.hide();
};
PageMap.prototype.closeInfo = function(id) {
	this.view.infopopup.x = 1024;
	this.view.infopopup.visible = false;
	this.continueBtn.show();
};
PageMap.prototype.destroy = function() {
	this.view = null;	
};
createjs.EventDispatcher.initialize(PageMap.prototype);
var PageIntro = function(view, id){
	'use strict';
	//console.log("view.player:", view.player);
	this.view = view;
	this.id = id;
	this.lib = null;
	this.listeners = {};
	this.playerComponent = new PlayerSliderComponent(view.player);
	
	this.continueBtn = ContinueButton;
	this.continueBtn.ghost("skip");

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
	this.listeners.complete = this.playerComponent.on('complete', this.onComplete, this);
};
PageIntro.prototype.start = function() {
	LoadJS.load(
		'../assets/logic/slides/'+"slide_"+this.id+".js", 
		Delegate.create(this.setup, this)
	);
	// Allow tick
	Tick.enable();
};
PageIntro.prototype.setup = function() {
	if(this.runonce != null)
		return;

	var self = this;

	// Setup may run ONLY once
	this.runonce = true;

	try{
		this.lib = slidelib;
		this.playerComponent.on('ready', function(event){
			event.remove();
			// No tick
			Tick.disable();
			self.continueBtn.activate("skip");
			// self.dispatchEvent(new createjs.Event('ready'));
		});
		this.playerComponent.preload("slide_"+this.id, this.lib);
		this.lib = null;
	}catch(err) {
   		console.log(err);
   	}
};
PageIntro.prototype.onContinue = function(event) {
	this.continueBtn.off('click', this.listeners.continue);	
	this.listeners.continue = null;

	// Stop Player
	if(this.playerComponent !== undefined){
		this.playerComponent.stop();
	}

	this.dispatchEvent(new createjs.Event('continue'));

	this.destroy();
};
PageIntro.prototype.onComplete = function(event) {
	this.playerComponent.off('complete', this.listeners.complete);	
	this.listeners.complete = null;

	// Set next button active
	this.continueBtn.activate("next");
};
PageIntro.prototype.destroy = function() {
	if(this.playerComponent != null){
		this.playerComponent.destroy();	
	}
	this.playerComponent = null;
	this.view = null;
	this.lib = null;
};
createjs.EventDispatcher.initialize(PageIntro.prototype);
var PageCard = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.continueBtn = ContinueButton;
	this.continueBtn.activate("next");	
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
};
PageCard.prototype.start = function() {
	var frm;

	// Set portrait an real name
	frm = PlayerStats.challenge + PlayerStats.family;
	this.view.portrait.gotoAndStop(frm);
	this.view.realname.gotoAndStop(frm);

	// Set nickname
	frm = PlayerStats.nickname - 1; // Timeline frame number starts at 0 and nickname refs starts at 1
	this.view.nickname.gotoAndStop(frm);

	// Set challenge
	frm = PlayerStats.challenge;
	this.view.challenge.gotoAndStop(frm);	

	// Set family, kids
	frm = PlayerStats.family;
	this.view.family.gotoAndStop(frm);
	this.view.kids.gotoAndStop(frm);
};
PageCard.prototype.onContinue = function(event) {
	this.continueBtn.off('click', this.listeners.continue);	
	this.dispatchEvent(new createjs.Event('continue'));
};
PageCard.prototype.destroy = function() {
	this.view = null;	
};
createjs.EventDispatcher.initialize(PageCard.prototype);
var SubFlowController = function(){
	'use strict';

	var action = function(delegate, triggers){
		return{
			delegate: delegate,
			triggers: triggers
		};
	}

	return {
		actions: {},
		addAction: function (trigger, delegate, triggers){
			'use strict';
			this.actions[trigger] = new action(delegate, triggers);
		},
		next: function(trigger){
			'use strict';
		
			// Allow tick
			Tick.enable();
			Tick.framerate(15);


			var action = this.actions[trigger];

			console.log('next:', trigger, action);
			
			try{
				action.delegate(action.triggers);
			}catch(err) {
				console.log(err);
			}
		},	
		onComplete: function(event) {
			'use strict';
			// // Set next button active
			// this.continueBtn.activate('next');

			// // Remove events
			// if(this.playerComponent != null){
			// 	this.playerComponent.off('complete', this.listeners.complete);	
			// }	
		},
		onContinue: function(event) {
			'use strict';
			this.next();
		}
	};
};
var FlowProloque = function(container){
	return{
		currentPage:null,
		container: container,
		// init: function(view){
		// 	'use strict';
		// 	this.view = view;
		// },
		start: function(){
			'use strict';
			this.id = 'proloque';//PlayerStats.poorhouse;

			// console.log('FlowProloque:start', this.view);

			LoadJS.load(
				['../assets/logic/games/proloque.js'], 
				Delegate.create(this.setup, this)
			);
		},
		setup: function(){
			'use strict';
			if(this.runonce != null)
				return;

			var self = this;

			// Setup may run ONLY once
			this.runonce = true;

			// Tick
			Tick.framerate(15);


			// Load files
			this.lib = gamelib;
			var Clss = this.lib.proloque;		
			var manifest = this.lib.properties.manifest;

			var onFileLoad = function(event){
				if (event.item.type === 'image') { 
					// console.log(event.item.id, event.result);
					images[event.item.id] = event.result; 
				}
			};
			var onLoadComplete = function(event){
				// Instantiate view
				self.view = new Clss();

				//Add
				self.container.addChild(self.view);

				// Set start page
				self.next('0.0');

				// Ready
				FlowProloque.dispatchEvent(new createjs.Event('ready'));
			};
			Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');

			// this.next('0.0');
		},
		next: function(page){
			'use strict';
			if(this.currentPage !== null){
				this.currentPage.destroy();
				this.currentPage = null;
			}
			var self = this;
			// this.view.gotoAndStop('character_build'); // TEST
			switch(page){
				case '0.0':
					// Tick.disable();

					// Go to start frame
					this.view.gotoAndStop('start');
					this.currentPage = new PageStart(this.view.pageStart);
					this.currentPage.start(); 

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.1');					
					}, this);				
					// Tick.disable();	
					
				break;
				case '0.1':
					// Tick.enable();
					this.view.gotoAndStop('character_build');				
					this.view.page_intro.x = 0;				
					this.currentPage = new PageIntro(this.view.page_intro, 'intro'); 
					// this.currentPage.on('ready', function(event){
					// 	event.remove();
					// 	// Tick.disable();
					// })
					this.currentPage.start(); 

					// Topbar
					Topbar.show();
					Topbar.go('intro');
					console.log('FlowProloque:next', page, Topbar);

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.2');
					}, this);				
				break;
				case '0.2':				
					// Tick.enable();
					// this.view.gotoAndStop('character');
					this.view.page_intro.x = 1024;
					this.view.page_character.x = 0;
					this.currentPage = new FlowCharacter(this.view.page_character); // Id references to flow id '0.1'
					this.currentPage.start(); 

					
					// createjs.Tween.get(this.view.page_character)
					// 	.to({x:0}, 300, createjs.Ease.linear);

					// Topbar
					Topbar.go('character');

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.3');
					}, this);
					// Tick.disable();
				break;
				case '0.3':
					Tick.framerate(15);
					TweenUtil.to(this.view.page_character, {x:-1024}, 300, Delegate.create(function(){
						Tick.framerate(8);
					}, this));

					this.currentPage = new PageCard(this.view.page_card); // Id references to flow id '0.1'
					this.currentPage.start(); 

					this.view.page_card.x = 0;
					// createjs.Tween.get(this.view.page_card)
					// 		.to({x:0}, 300, createjs.Ease.linear);

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.4');
					}, this);
					// Tick.disable();
				break;
				case '0.4':
					Tick.framerate(15);
					TweenUtil.to(this.view.page_card, {x:-1024}, 300, Delegate.create(function(){
						Tick.framerate(8);
					}, this));		

					this.currentPage = new PageOpinion(this.view.page_opinion); // Id references to flow id '0.1'
					this.currentPage.start(); 

					this.view.page_opinion.x = 0;

					// createjs.Tween.get(this.view.page_opinion)
					// 		.to({x:0}, 300, createjs.Ease.linear);

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.5');
					}, this);
					// Tick.disable();
				break;
				case '0.5':
					TweenUtil.to(this.view.page_opinion, {x:-1024}, 300, Delegate.create(function(){
						//Tick.framerate(8);
					}, this));				

					this.currentPage = new PageMap(this.view.page_map); // Id references to flow id '0.1'
					this.currentPage.start(); 

					this.view.page_map.x = 0;

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();

						// Clean
						self.lib = null;
						self.container.removeAllChildren();

						// From here it a sepereate flow related to chosen poorhouse New page LOADS new content						
						FlowProloque.dispatchEvent(new createjs.Event('continue'));
					}, this);
					// Tick.disable();
				break;
				// case '1.0':				
				// 	this.view.page_map.x = -1024;

				// 	// view frame
				// 	this.view.gotoAndStop('poorhouse');

				// 	// Topbar
				// 	Topbar.go('game');

				// 	this.currentPage = new FlowPoorhouse(this.view.poorhouse_container); // Id references to flow id '0.1'
				// 	this.currentPage.start(); 				

				// 	// Button to next page/flow
				// 	this.currentPage.on('continue', function(event){
				// 		event.remove();
				// 		self.next('2.5');
				// 	}, this);
				// 	// Tick.disable();
				// break;
				// case '2.5':
				// 	// view frame
				// 	this.view.gotoAndStop('germany');

				// 	// Topbar
				// 	Topbar.go('game');

				// 	this.currentPage = new FlowGermany1(this.view.germany_container); 
				// 	this.currentPage.start(); 				
				// 	// Tick.disable();
				// break;
			}
		},
		restart: function(){
			'use strict';
			this.currentPage = null;
		},
		destroy: function(){
			'use strict';
			this.currentPage = null;
		}
	};	
}
createjs.EventDispatcher.initialize(FlowProloque);
var FlowPoorhouse = function(container){
	'use strict';
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '1.0.2'; // Default start pointer
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
FlowPoorhouse.prototype.soundEffectPlay = function(sound){
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

	console.log('FlowPoorhouse:start');

	LoadJS.load(
		['../assets/logic/games/svendborg.js'], 
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
	// this.flow.addAction('1.0.1', Delegate.create(this.intro, this), '1.0.2');
	// this.flow.addAction('1.0.1', Delegate.create(this.intro, this), '2.4'); // TEST
	this.flow.addAction('1.0.2', Delegate.create(this.points1, this), '1.1.1');
	// this.flow.addAction('1.0.2', Delegate.create(this.points1, this), '1.3.5'); // TEST
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
	this.flow.addAction('1.8', Delegate.create(this.backToPoorhouse, this), '1.3.5');
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

	this.id = 'svendborg';
	console.log('FlowPoorhouse:setup', this.id);

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

		console.log('FlowPoorhouse:onLoadComplete');
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
	
	console.log('FlowPoorhouse::onContinue');
	
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
// FlowPoorhouse.prototype.intro = function(trigger){
// 	'use strict';


// 	// Next move
// 	this.trigger = trigger;

// 	var self = this;

// 	// Set page view
// 	this.currentPage = this.view.intro;
// 	this.currentPage.x = 0;

// 	// Set background
// 	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_0);
	
// 	// Slide. Loading is self contained
// 	this.playerComponent = new PlayerSliderComponent(this.currentPage.player);
// 	this.listeners.complete = self.playerComponent.on('complete', function(event){
// 		self.continueBtn.activate('next');
// 		Tick.disable();
// 	}, self);
// 	this.playerComponent.on('ready', function(event){
// 		event.remove();
// 		// No tick
// 		Tick.disable();
// 		self.continueBtn.activate("skip");
// 		// self.dispatchEvent(new createjs.Event('ready'));
// 	});
// 	this.playerComponent.preload('slide_1_0_1_'+this.id, this.slideLib);
// 	// this.playerComponent.preload('slide_intro', this.slideLib);
	
// };
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
	// Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
	// 	PlayerStats.append('mood', -1);
	// 	PlayerStats.append('health', 1);
	// 	Topbar.pointsUpdate();
	// 	Tick.disable();
	// }, this));
	
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

	console.log('chooseJob');

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

	// Next move
	this.trigger = trigger;

	this.continueBtn.activate('skip');

	// Get sound
	var sound = SoundService.matrix.work[this.id][PlayerStats.job]; // "svendborg/A"	
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
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.getout;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.disable();
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.playAdvice = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;
	var sound;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;

	// Set new page out
	switch(currentTrigger){
		case '1.3.3': // Inmate
			this.currentPage = this.view.adviceinmate;	

			// Get sound
			sound = SoundService.matrix.advice[this.id]['inmate'];
		break;
		case '1.3.4': // Employee
			this.currentPage = this.view.adviceemployee;

			// Get sound
			sound = SoundService.matrix.advice[this.id]['employee'];
		break;
	}	
	
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
	this.currentPage.portrait.gotoAndStop(this.id);

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
	// soundEffect(SoundService.matrix.effects.typewriter);

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

FlowPoorhouse.prototype.letterWrite = function(trigger) {
	'use strict';
	var self = this;

	self.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_7);

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
FlowPoorhouse.prototype.letterAnswer = function(trigger) {
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

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_8);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.backtopoorhouse;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.disable();
	}, this));

	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Next button
	this.continueBtn.activate('next');
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
	var sound = SoundService.matrix.jobinterview[this.id]['part1']; // "svendborg"

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
	var sound = SoundService.matrix.jobinterview[this.id]['part2']; // "svendborg"

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
		this.lib = gamelib; //germany1GameLib;
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
var FlowCharacter = function(view){
	'use strict';
	//console.log("view.player:", view.player);
	this.view = view;
	this.currentPage = null;

	// this.id = id;
	this.listeners = {};
	
	this.continueBtn = ContinueButton;
	this.continueBtn.activate("next");

	this.pagePointer = 0;

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
};
FlowCharacter.prototype.start = function() {
	this.view.character_intro.x = 
	this.view.character_challenge.x = 
	this.view.character_family.x = 
	this.view.character_nickname.x = 1024;


	// Set INTRO
	this.next();

	// Tick
	Tick.enable();
	Tick.framerate(8);
};
FlowCharacter.prototype.onContinue = function(event) {
	if(this.pagePointer > 3){
		event.remove();
		this.dispatchEvent(new createjs.Event('continue'));
	}else{
		this.next();
	}	
};

FlowCharacter.prototype.next = function(pointer){
	// Allow tick
	Tick.enable();
	Tick.framerate(15);


	if(this.currentPage !== null){
		// Old page out - to left
		createjs.Tween.get(this.currentPage)
			.to({x:-1024}, 300);
	}

	switch(this.pagePointer){
		case 0:
			this.intro();
			this.pagePointer++;
			break;
		case 1:
			this.challenge();
			this.pagePointer++;
			break;
		case 2:
			this.family();
			this.pagePointer++;
			break;
		case 3:
			this.nickname();
			this.pagePointer++;
			break;
	}	
};
FlowCharacter.prototype.intro = function(){		
	this.currentPage = this.view.character_intro;

	TweenUtil.to(this.currentPage, {x:0}, 300, Delegate.create(function(){
		Tick.disable();
	}, this));
};
FlowCharacter.prototype.challenge = function(){
	this.continueBtn.ghost("next");

	this.currentPage = this.view.character_challenge;


	TweenUtil.to(this.currentPage, {x:0}, 300, Delegate.create(function(){
		Tick.framerate(8);
	}, this));
	// createjs.Tween.get(this.currentPage)
	// 	.to({x:0}, 300, createjs.Ease.linear);

	var self = this;	

	// Checkboxes
	var btn1 = new RadioButton(this.currentPage.checkbox1, {value:'A'});
	var btn2 = new RadioButton(this.currentPage.checkbox2, {value:'B'});
	var btn3 = new RadioButton(this.currentPage.checkbox3, {value:'C'});

	// Group
	this.group = new ButtonGroup();
	this.group.add(btn1);
	this.group.add(btn2);
	this.group.add(btn3);

	// Events
	this.eventGroupListener = this.group.on("click", function(event){
		// Save chosen "challenge"
		PlayerStats.challenge = event.data.value

		// User may continue
		self.continueBtn.activate('next');
		self.continueBtn.on('click', function(e){
			e.remove();
			event.remove();
		});
	}, self);
};
FlowCharacter.prototype.family = function(){
	this.continueBtn.ghost("next");

	this.currentPage = this.view.character_family;

	TweenUtil.to(this.currentPage, {x:0}, 300, Delegate.create(function(){
		Tick.framerate(8);
	}, this));

	var self = this;

	// Checkboxes
	var btn1 = new RadioButton(this.currentPage.checkbox1, {value:'D'});
	var btn2 = new RadioButton(this.currentPage.checkbox2, {value:'E'});
	var btn3 = new RadioButton(this.currentPage.checkbox3, {value:'F'});

	// Group
	this.group = new ButtonGroup();
	this.group.add(btn1);
	this.group.add(btn2);
	this.group.add(btn3);

	// Events
	this.eventGroupListener = this.group.on("click", function(event){
		// Save chosen "family" state
		PlayerStats.family = event.data.value

		// User may continue
		self.continueBtn.activate('next');
		self.continueBtn.on('click', function(e){
			e.remove();
			event.remove();
		});
	}, self);
};

FlowCharacter.prototype.nickname = function(){
	this.continueBtn.ghost("next");

	this.currentPage = this.view.character_nickname;

	TweenUtil.to(this.currentPage, {x:0}, 300, Delegate.create(function(){
		Tick.framerate(8);
	}, this));

	var self = this;

	// Checkboxes
	var btn1 = new RadioButton(this.currentPage.checkbox1, {value:1});
	var btn2 = new RadioButton(this.currentPage.checkbox2, {value:2});
	var btn3 = new RadioButton(this.currentPage.checkbox3, {value:3});
	var btn4 = new RadioButton(this.currentPage.checkbox4, {value:4});
	var btn5 = new RadioButton(this.currentPage.checkbox5, {value:5});
	var btn6 = new RadioButton(this.currentPage.checkbox6, {value:6});

	// Group
	this.group = new ButtonGroup();
	this.group.add(btn1);
	this.group.add(btn2);
	this.group.add(btn3);
	this.group.add(btn4);
	this.group.add(btn5);
	this.group.add(btn6);

	// Events
	this.eventGroupListener = this.group.on("click", function(event){		
		// Save chosen "nickname"
		PlayerStats.nickname = event.data.value
		
		// User may continue
		self.continueBtn.activate('next');
		self.continueBtn.on('click', function(e){
			e.remove();
			event.remove();
		});
	}, self);
}


FlowCharacter.prototype.destroy = function() {
	this.view = null;
	this.continueBtn = null;
	// createjs.Tween.removeTweens(event.target);
};
createjs.EventDispatcher.initialize(FlowCharacter.prototype);
var Topbar = {
	view: null,
	soundController: null,
	init: function(view){
		this.view = view;		
	},
	go: function(frm){
		// console.log(this.view);
		// this.view.label_intro.x = 564 + 300;
		// createjs.Tween.get(this.view.label_intro)
		// 	.to({x:564}, 300, createjs.Ease.backIn);


		this.view.gotoAndStop(frm);

		// Setup for game related to user's choices
		if(frm === 'game'){
			this.view.photo.gotoAndStop(PlayerStats.challenge + PlayerStats.family);
			this.view.realname.gotoAndStop(PlayerStats.challenge + PlayerStats.family);
			this.view.nickname.gotoAndStop(PlayerStats.nickname - 1);

			// Points
			HUDController.init(this.view.hud);
		}
	},
	pointsUpdate: function(){
		HUDController.update();
	},
	show: function(){
		this.view.visible = true;
	},
	hide: function(){
		this.view.visible = false;	
	}
}
'use strict';
var TweenUtil = {
	to: function(element, options, delay, delegate){
		createjs.Tween.get(element)
			.to(options, delay, createjs.Ease.linear)
			.call(function(){
				if(delegate !== undefined){
					delegate();
				}
			})
	}
}
var Transitions = {
	inOut: function(inObj, outObj, delegate){
		// For checking done of in/out tween
		var left = 2;
		var checkDone = function(left){
			if(left == 0){
				if(delegate !== undefined){
					delegate();
				}
			}
		}
		// Previous page out
		switch(outObj.prop){
			case 'pos': 
				this.transOutPosition(outObj.element, function(){
					checkDone(--left);
				});
			break;
			case 'alpha': 
				this.transOutAlpha(outObj.element, function(){
					checkDone(--left);
				});
			break;
		}
		// New page in
		switch(inObj.prop){
			case 'pos': 
				this.transInPosition(inObj.element, function(){
					checkDone(--left);
				});
			break;
			case 'alpha': 
				this.transInAlpha(inObj.element, function(){
					checkDone(--left);
				});
			break;
		}
		
	},
	transInPosition: function(pageView, callback){
		if(pageView === undefined)
			return;

		// New page in
		pageView.alpha = 1;
		pageView.x = 1024;
		createjs.Tween.get(pageView)
			.to({x:0}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transOutPosition: function(pageView, callback){
		if(pageView === undefined)
			return;

		// New page in
		createjs.Tween.get(pageView)
			.to({x:-1024}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transInAlpha: function(pageView, callback){
		if(pageView === undefined)
			return;

		// New page in
		pageView.alpha = 0;
		pageView.x = 0;
		createjs.Tween.get(pageView)
			.to({alpha:1}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transOutAlpha: function(pageView, callback){
		if(pageView === undefined)
			return;
		
		// New page in
		createjs.Tween.get(pageView)
			.to({alpha:0}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	changeBackground: function(oldView, newView){
		try{
			if(oldView !== null){
				oldView.x = 1024;
				oldView.visible = false;
			}
		}catch(err) {
			console.log(err);
		}
		try{
			newView.x = 0;
			newView.visible = true;
		}catch(err) {
			console.log(err);
		}
		return newView;
	}
}
var Tick = {
	defaultDelay: 100,
	stage: null,
	enabled: false,
	debug: false,
	init: function(stage, framerate){
		this.stage = stage;
		// createjs.Ticker.setFPS(framerate);
		this.framerate(framerate);
		enabled = false;
	},
	framerate: function(framerate){
		createjs.Ticker.framerate = framerate;
	},
	enable: function(){		
		if(enabled)
			return false;

		createjs.Ticker.removeEventListener('tick', self.stage); // Handbreak. Remove handler before setting again
		createjs.Ticker.addEventListener('tick', this.stage);
		if(this.debug){
			createjs.Ticker.addEventListener('tick', this.foo);
		}
		enabled = true;
	},
	disable: function(delay){		
		if(delay === undefined){
			delay = this.defaultDelay;
		}

		var self = this;
		setTimeout(function(){
			// Hand break. Hdnles enable/disable conflicts due tp timer
			if(enabled)
				return false;

			createjs.Ticker.removeEventListener('tick', self.stage);

			if(self.debug){
				createjs.Ticker.removeEventListener('tick', self.foo);
			}
		}, delay);

		enabled = false;
	},
	resume: function(){
		createjs.Ticker.paused = false;
	},
	pause: function(){
		createjs.Ticker.paused = true;
	},
	foo: function(event){
		console.log(createjs.Ticker.framerate);
		// console.log(event.paused,
	 //         createjs.Ticker.getTime(false),
	 //         createjs.Ticker.getTime(true));
	}
}
var TextField = function(){

} 
TextField.create = function(type, text, fontsize, color, fontface, fontWeight){

	if(!fontWeight)
	 var fontWeight = '';

	var tf = new createjs.Text();
	// tf.lineWidth = 490;

	tf.font = fontWeight+fontsize+'px '+fontface;
	tf.color = color;
	tf.text = text;
	return tf;
}
TextField.createBmp = function(id, text, fontsize, color){
	var bmptxt = Font.create(id, fontsize, text);
	if(color)
		bmptxt.setColor(color);
	return bmptxt;
}
var LoadJS = {
	cache: [],
	load: function(urls, delegate, location){
		'use strict';
		var urlList;
		
		//url is URL of external file, code is the code
	    //to be called from the file, location is the location to 
	    //insert the <script> element

	    var counter = 0;
	    var tracker = {};

	    if(typeof urls === 'string'){
	    	urlList = urls.split(',');
	    }else{
	    	urlList = urls;
	    }


	    if(location == null)
	    	location = document.body;

	    for(var i=0; i<urlList.length; i++){
	    	for(var b = 0; b<this.cache.length; b++){
    			if(this.cache[b] === urlList[i]){
    				return false;
    			}
    		}
    		this.cache.push(urlList[i]);

    		console.log(this.cache);

		    var scriptTag = document.createElement('script');		    
		    // console.log(urlList[i]);

		    scriptTag.onload = scriptTag.onreadystatechange = function(event){
		    	counter++;

		    	// Split the path of the laoded file. Get the 2 last entries
		    	var arr = event.target.src.split('/');
		    	var identifier1 = arr[arr.length-2] +'/'+arr[arr.length-1];

		    	// Track which file is loaded
		    	tracker[identifier1] = true;

		    	// Through list of files requested to be loaded
		    	for(var a=0; a<urlList.length; a++){		    		

		    		// Split the path of the file requsted to be loaded. Get the 2 last entries
		    		var arr2 = urlList[a].split('/');
		    		var identifier2 = arr2[arr2.length-2] +'/'+arr2[arr2.length-1];

		    		// Check if the file requested to be loaded match the one of those loaded
		    		// If one is still not loaded then leave
					if(tracker[identifier2] !== true){
						return false;
					}
		    	}

		    	// Reached this? All files are loaded
		    	delegate();
		    };

		    scriptTag.src = urlList[i];
		    location.appendChild(scriptTag);
		    // location.removeChild(scriptTag);  
	    }	    
	}	
};
var Font = {
	BIGNOODLE: 'BigNoodleTitling',
	
	// AMERICANTYPEWRITER: 'americantypewriter',
	// xml: {},
	// images: {},
	// bitmapfonts: {},
	// init: function(){
	// 	'use strict';
	// 	this.xml = {};
	// 	this.images = {};
	// 	this.bitmapfonts = {};	
	// },
	// register: function(id, size){
	// 	'use strict';
	// 	var key = id;//+'_'+size;
	// 	this.bitmapfonts[key] = new BitmapFont(this.images[id], this.xml[id], size);
	// 	BitmapTextField.registerBitmapFont(this.bitmapfonts[id], id);
	// },
	// create: function(id, size, text){
	// 	'use strict';
	// 	var key = id;//+'_'+size;
	// 	var bitmapText = new BitmapTextField(800,100,text,key,size,0,0,'left','top',true);
	// 	// var bitmapText = new BitmapTextField(200,100,'Bitmap text','cooper',-1,0,0,'left','top',true);
	// 	return bitmapText;
	// }
};
/**
	A facade to browser detection method
	Wrapped in order to enable change of lib if nessesary
*/
var Environment = {	
	data: null,
	browser: {},
	os: null,
	init: function(){
		'use strict';
		var data = browserDetection();
		this.browser.name = data.browser.toLowerCase();
		this.browser.version = data.version;
		this.browser.firefox = (this.browser.name === 'firefox');
		this.os = data.os;

	}
};
'use strict';
var Delegate = {	
	create: function (func, target) {
		'use strict';
	    return function() { 
	    	try{
	    		return func.apply(target, arguments);	
	    	}catch(err){
			   console.log(err);
			}
	    }
	}
};
var SoundService = function(){
	'use strict';
}

// SoundService.getPathByKey = function(key){
// 	'use strict';
// 	return SoundService.properties.basePath + this.matrix[key].file;
// };
// SoundService.getDurationByKey = function(key){
// 	'use strict';
// 	return this.matrix[key].duration;
// };

SoundService.getSlideDurationById = function(id){
	'use strict';
	return this.matrix.slides[id].duration;
};
SoundService.getSlideSoundpathById = function(id){
	'use strict';
	return SoundService.properties.slidePath + id+'.mp3';
};
SoundService.getSlideSoundById = function(id){
	'use strict';
	return SoundService.matrix.slides[id]
};
SoundService.getSoundByCharacter = function(character){
	'use strict';
	return;
};

SoundService.properties = {
	basePath: 'assets/sounds/',
	slidePath: 'assets/sounds/'
};
SoundService.matrix = {
	effects: {
		typewriter: { src:SoundService.properties.basePath+'typewriter.mp3', duration: null },
		woodchopper: { src:SoundService.properties.basePath+'1.2.1_hugbraende_lydeffekt.mp3', duration: null }
	},
	'1.1.1' :{
		horsens: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3', duration: 57.862 },
		sundholm: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3', duration: 57.862 },
		svendborg: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3', duration: 57.862 }
	},
	points: {
		plus: { src:SoundService.properties.basePath+'Point_plus.mp3', duration: 2.208 },
		minus: { src:SoundService.properties.basePath+'Point_minus.mp3', duration: 1.128 }
	},
	dormitry: { src:SoundService.properties.basePath+'2.6.1_sovesal.mp3', duration: 83.458 },
	drunk: { src:SoundService.properties.basePath+'1.5.1_druk.mp3', duration: 70 },
	constable: { src:SoundService.properties.basePath+'1.6.1_betjent.mp3', duration: 5.737 },
	'2.10.1': { description:'what now', src:SoundService.properties.basePath+'2.10.1_kontraktudlob.mp3', duration: 53.501 },
	'2.11.1': { description:'home comming', src:SoundService.properties.basePath+'2.11.1_hjemkomst.mp3', duration: 46.536 },
	jobinterview: {
		'svendborg': { 
			'part1': { src:SoundService.properties.basePath+'2.2.1_hvervekontor.mp3', duration: 36.161 },
			'part2': { src:SoundService.properties.basePath+'2.2.3_hvervekontor.mp3', duration: 28.299 }
		}
	},
	prerecruitment: {
		'svendborg': { src:SoundService.properties.basePath+'prerecruitment_svendborg.mp3', duration: 1.078 }
	},
	advice: {
		'svendborg': {
			'employee': { src:SoundService.properties.basePath+'1.3.4_RaadIndlagt.mp3', duration: 41.987 }, 	// Employee
			'inmate': { src:SoundService.properties.basePath+'1.3.4_RaadAnsat.mp3', duration: 40.857 }		// Fellow inmate
		},
	},
	work: {
		'svendborg': {
			'A': { src:SoundService.properties.basePath+'1.1.2a_slaa_skaerver.mp3', duration: 12.408 },
			'B': { src:SoundService.properties.basePath+'work_svendborg_B.mp3', duration: 1.078 },
			'C': { src:SoundService.properties.basePath+'work_svendborg_C.mp3', duration: 1.815 }
		},
	},
	slides: {
				'slide_intro': { src:SoundService.properties.basePath+'slide_intro.mp3', duration: 89.014 },
				'slide_1_0_1_svendborg': { src:SoundService.properties.basePath+'1_0_1_ankomst.mp3', duration: 67.341 },
				'slide_2_5': { src:SoundService.properties.basePath+'slide_2_5.mp3', duration: 35.083 },
				'slide_2_7_1_amory': { src:SoundService.properties.basePath+'slide_2_7_1_amory.mp3', duration: 29.541 },
				'slide_2_7_1_butcher': { src:SoundService.properties.basePath+'slide_2_7_1_butcher.mp3', duration: 61.208 },
				'slide_2_7_1_mine': { src:SoundService.properties.basePath+'slide_2_7_1_mine.mp3', duration: 48.573 },
				'slide_home1A': { src:SoundService.properties.basePath+'slide_home1_A.mp3', duration: 48.573 },
				'slide_home1B': { src:SoundService.properties.basePath+'slide_home1_B.mp3', duration: 48.573 }
				// 'slide_svendborg': { src:SoundService.properties.basePath+'daughter.mp3', duration: 2.368 }
			},
	oppinion: { // 0.4
			'AD': { label: 'alkoholiker', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'AE': { label: 'alkoholiker, børn', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
			'AF': { label: 'alkoholiker', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'BD': { label: 'dovenskab', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'BE': { label: 'dovenskab, børn', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
			'BF': { label: 'dovenskab', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'CD': { label: 'svækkelse', src:SoundService.properties.basePath+'0.4_forvalter.mp3', duration: 57.862 },
			'CE': { label: 'svækkelse, børn', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
			'CF': { label: 'svækkelse', src:SoundService.properties.basePath+'0.4_forvalter.mp3', duration: 57.862 }
		}
	// challenge: {
	// 			// 'A': { label: 'manager', src:SoundService.properties.basePath+'alcoholic.mp3', duration: 8.314 },
	// 			// 'B': { label: 'manager', src:SoundService.properties.basePath+'lazy.mp3', duration: 1.078 },
	// 			// 'C': { label: 'manager', src:SoundService.properties.basePath+'weakness.mp3', duration: 1.815 }
	// 			'A': { label: 'manager', src:SoundService.properties.basePath+'0.4_forvalter.mp3', duration: 57.862 },
	// 			'B': { label: 'manager', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
	// 			'C': { label: 'manager', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 }
	// 		},
	// family: {
	// 			'D': null,
	// 			'E': { label: 'daughter', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
	// 			'F': null
	// 		}
	// characters: {
	// 			'AD': [ { label: 'manager', src:'alcoholic.mp3', duration: 89.014 } ],
	// 			'AE': [ { label: 'manager', src:'alcoholic.mp3', duration: 89.014 }, { label: 'daughter', duration: 89.014 }],
	// 			'AF': [ { label: 'manager', src:'alcoholic.mp3', duration: 89.014 } ],
	// 			'BD': [ { label: 'manager', src:'lazy.mp3', duration: 89.014 } ],
	// 			'BE': [ { label: 'manager', src:'lazy.mp3', duration: 89.014 }, { label: 'daughter', duration: 89.014 }],
	// 			'BF': [ { label: 'manager', src:'lazy.mp3', duration: 89.014 } ],
	// 			'CD': [ { label: 'manager', src:'weakness.mp3', duration: 89.014 } ],
	// 			'CE': [ { label: 'manager', src:'weakness.mp3', duration: 89.014 }, { label: 'daughter', duration: 89.014 }],
	// 			'CF': [ { label: 'manager', src:'weakness.mp3', duration: 89.014 } ]
	// 		}
};
var PlayerStats = {
	challenge: 'B',			// Default test value
	family: 'D',			// Default test value
	nickname: null,
	poorhouse: null,
	mood: 2,
	health: 4,
	money: 3,
	job: null,
	advice: null,
	wayout: null,
	job_germany: ['A', 'A'], // Default test values
	spending: null,
	whatnow: null,
	pointsDiff: {mood: 0, health: 0, money: 0},

	resetDiff: function(){
		this.pointsDiff = {mood: 0, health: 0, money: 0};
	},

	isAPlusPoint: function(){
		for(var key in this.pointsDiff){
			if(this.pointsDiff[key] > 0){
				return true;
			}
		}
	},

	isAMinusPoint: function(){
		for(var key in this.pointsDiff){
			if(this.pointsDiff[key] < 0){
				return true;
			}
		}
	},

	set: function(type, val){	
		// Reset diff
		this.pointsDiff[type] = 0;

		// Remember the previous value
		var prev = this[type];	

		// Set new value
		this[type] = val;

		// Find diff
		this.pointsDiff[type] = this[type] - prev;		

		// Cap values for points
		if(type == 'mood' || type == 'health' || type == 'money'){
			if(this[type] > 10){
				this[type] = 10;
			}
			if(this[type] < 1){
				this[type] = 1;
			}
		}
	},
	append: function(type, val){		
		// Reset diff
		this.pointsDiff[type] = 0;
		
		// Remember the previous value
		var prev = this[type];	

		// Set new value
		this[type] += val;

		// Find diff
		this.pointsDiff[type] = this[type] - prev;			

		// Cap values for points
		if(type == 'mood' || type == 'health' || type == 'money'){
			if(this[type] > 10){
				this[type] = 10;
			}
			if(this[type] < 1){
				this[type] = 1;
			}
		}
	}
}
var Library = {
	clearSlide: function(){
		console.log('clearSlide');
		slidelib = null;
	},
	clearGame: function(){
		console.log('clearGame');
		gamelib = null;
	},
	clearMain: function(){
		console.log('clearMain');
		mainlib = null;
	},
}
var FlowData ={
	
}
// var Assets = {
// 	fattiggard: {
// 		svendborg: {
// 			images: [
// 				{src: '../assets/images/1_0BGsvendborg.png', id:'1_0BGsvendborg'},
// 				{src: '../assets/images/1_1BGsvendborg.png', id:'1_1BGsvendborg'},
// 				{src: '../assets/images/1_2BGsvendborgA.png', id:'1_2BGsvendborgA'},
// 				{src: '../assets/images/1_2BGsvendborgB.png', id:'1_2BGsvendborgB'},
// 				{src: '../assets/images/1_2BGsvendborgC.png', id:'1_2BGsvendborgC'},
// 				{src: '../assets/images/1_3BGsvendborg.png', id:'1_3BGsvendborg'}
// 			]
// 		}
// 	}
// }
var GameManager = {
	root: null,
	init: function(root){
		'use strict';
		this.root = root;
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};
var FlowManager = {
	currentPage:null,
	root: null,
	init: function(root){
		'use strict';
		this.root = root;
	},
	clearLib: function(){
		lib = null;
	},
	gotoPage: function(page){
		'use strict';
		if(this.currentPage !== null){
			this.currentPage.destroy();
			this.currentPage = null;
		}
		var self = this;
		this.root.gotoAndStop('character_build'); // TEST
		switch(page){
			case '0.0':
				// Proluque

				// Tick.disable();

				var self = this;

				// Go to start frame
				this.root.gotoAndStop('start');
				this.currentPage = new FlowProloque(this.root.startpagecontainer);
				this.currentPage.start(); 

				Topbar.hide();

				// Blocker
				FlowProloque.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page
				FlowProloque.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('1.0.1');
				}, this);				
				// Tick.disable();	
				
			break;
			case '1.0.1':	
				// Poor House Intro	
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');

				this.currentPage = null;
				this.currentPage = new PagePoorhouseIntro(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);


				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('1.0.2');
				}, this);
				// Tick.disable();
			break;
			case '1.0.2':	
				// Poor House		
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');
				

				this.currentPage = null;
				this.currentPage = new FlowPoorhouse(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);


				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('2.5');
				}, this);
				Tick.disable();
			break;
			case '2.5':
				// Germany 1.

				// Root frame
				this.root.gotoAndStop('germany');

				// Topbar
				Topbar.go('game');

				this.currentPage = new FlowGermany1(this.root.pagecontainer); 
				this.currentPage.start(); 				
				// Tick.disable();
			break;
		}
	},
	restart: function(){
		'use strict';
		this.currentPage = null;
	},
	destroy: function(){
		'use strict';
		this.currentPage = null;
	}
};
var ApplicationManager = {
	root: null,
	start: function(root){
		'use strict';
		this.root = root;

		// Cursor init
		Cursor.root = root;

		// GUI
		ContinueButton.init(root.continueBtn);
		
		// Init Environment info
		Environment.init();

		// Game
		GameManager.init(root);

		// Init page manager
		FlowManager.init(root);

		// Topbar
		Topbar.init(root.topbar);

		// Fade black blocker out
		// createjs.Tween.get(root.blocker_black)
  //        .to({alpha: 0}, 600, createjs.Ease.linear)
  //        .call(function(){
  //        	root.blocker_black.visible = false;
  //        });         


		// Go to start
		// FlowManager.gotoPage('0.0');
		FlowManager.gotoPage('1.0.1');
		// FlowManager.gotoPage('2.5');

		//console.log('Ticker.framerate:', Ticker.framerate);
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};
var SoundEffect = function(src, duration, loop){
	'use strict';
	if(SoundEffect.counter == null)
		SoundEffect.counter = 0;

	SoundEffect.counter++;
	this.id = SoundEffect.counter;
	this.paused = false;
	this.duration = duration;
	this.src = src;
	this.loop = loop;
	this.preloaded = false;
	this.listeners = {tick:null, play:null, pause:null, stop:null};


	this.soundController = new SoundController(src, duration, loop);
};
SoundEffect.prototype.preload = function(src, duration, loop, callback){
	'use strict';
	
	var self = this;

	//self.soundController = new SoundController(src, duration, this.loop);
	this.soundController.on('ready', function(event){
		event.remove();
		self.preloaded = true;
		if(callback != null)
			callback();

	}, self);
	this.soundController.load();
};
SoundEffect.prototype.volume = function(value){
	try{
		this.soundController.volume(value);	
	}catch(err){
		console.log(err);
	}	
}
SoundEffect.prototype.play = function(){
	'use strict';

	var self = this;

	var doPlay = function(){
		self.previousFrame = 0;

		// Sound
		self.soundController.play();

		// Dispacth event 
		self.dispatchEvent(new createjs.Event('start'));

		// Set this last
		self.paused = false;
	}

	if(!this.preloaded){		
		this.preload(this.src, this.duration, this.loop, function(){
			doPlay();
		});
	}else{
		doPlay();
	}
};
SoundEffect.prototype.pause = function(){
	'use strict';

	// If invoked from external the state could be stopped
	// Adn we do not want to set in paused unintentional
	if(this.paused)
		return;

	this.paused = true;

	// Sound
	this.soundController.pause();
};
SoundEffect.prototype.stop = function(){
	'use strict';

	// Sound
	this.soundController.stop();

	this.paused = false;
};
SoundEffect.prototype.reset = function(){
	'use strict';
	this.paused = false;
	this.listeners = null;
};
SoundEffect.prototype.destroy = function(){
	'use strict';
	this.view = null;
	this.listeners = null;
};
createjs.EventDispatcher.initialize(SoundEffect.prototype);
/**
	Controller uses the browser's AUDIO element as play back for sound
*/
function SoundController(audioPath, duration, loop) {
	'use strict';

	var self = this;

	if(loop === undefined || loop === null)
		loop = false;
	
	this.sndObj = document.createElement('AUDIO');		
	this.sndObj.src = audioPath;
	this.sndObj.loop = loop;
	this.duration = duration;


	// Firefox does not invoke the audio load method?! But setting load automated seems to work
	if(Environment.browser.firefox){
		this.sndObj.preload = 'auto';
	}else{
		this.sndObj.preload = 'none';
	}

	// LIsten for sound being ready 
	this.sndObj.addEventListener('canplaythrough', function(event){
		var e = new createjs.Event('ready');
 		self.dispatchEvent(e);
	}, false);
	this.sndObj.addEventListener('ended', function(event){
 		this.complete = true;
	}, false);
}

SoundController.prototype = {
	sndObj: null,
	currentSndPosition: 0,
	duration: 0,
	paused: false,
	self: this,
	complete: false,

	load: function(){
		'use strict';
		// Firefox does not invoke the audio load function?! 
		// So load has been set 'auto' so we don't need to invoke the load method
		if(!Environment.browser.firefox){			
			this.sndObj.load();
		}
	},
	volume: function(value) {
		'use strict';
		if(this.sndObj != null){
			this.sndObj.volume = value;
		}
	},
	play: function() {
		'use strict';
		this.sndObj.play();
		this.paused = false;
		this.complete = false;
	},
	stop: function() {
		'use strict';
		this.sndObj.pause();
		this.sndObj.currentTime = 0;
		this.paused = false;
	},
	pause: function() {
		'use strict';
		this.currentSndPosition = this.sndObj.currentTime;
		this.sndObj.pause();
		this.paused = true;
	},
	resume: function() {
		'use strict';
		this.sndObj.play();
	},
	progress: function(){
		'use strict';
		var num = this.sndObj.currentTime / this.duration;
		return Math.round(num * 1000) / 1000; // Cap to 3 decimals
	},
	isComplete: function(){
		'use strict';
		return this.complete;
	},
	destroy: function(){
		'use strict';
		this.sndObj = null;
		this.duration = null;
	}
};
createjs.EventDispatcher.initialize(SoundController.prototype);
var HUDController = {
	init: function(view){
		this.view = view;		
		this.update();
		this.soundControllerPlus = new SoundController(SoundService.matrix.points.plus.src, SoundService.matrix.points.plus.duration);
		this.soundControllerMinus = new SoundController(SoundService.matrix.points.minus.src, SoundService.matrix.points.minus.duration);
	},
	update: function(){
		var self = this;
		this.view.mood.points.gotoAndStop(PlayerStats.mood-1);
		this.view.health.points.gotoAndStop(PlayerStats.health-1);
		this.view.money.points.gotoAndStop(PlayerStats.money-1);

		var delay = 0;
		for(var key in PlayerStats.pointsDiff){
			if(PlayerStats.pointsDiff[key] > 0){
				setTimeout(function(){ 
					self.soundControllerPlus.play();
				}, delay);
				delay += 1000;
			}else if(PlayerStats.pointsDiff[key] < 0){
				setTimeout(function(){ 
					self.soundControllerMinus.play();
				}, delay);
				delay += 1000;
			}
		}

		// Need to reset 
		PlayerStats.resetDiff();
	}
}
var PlayerSoundComponent = function(view){
	'use strict';
	if(PlayerSoundComponent.counter == null)
		PlayerSoundComponent.counter = 0;

	PlayerSoundComponent.counter++;
	this.id = PlayerSoundComponent.counter;

	this.view = view;
	this.paused = false;
	this.duration = 0;
	this.listeners = {tick:null, play:null, pause:null, stop:null};
	this.playBtn = new ButtonCustom(view.playBtn);
	this.pauseBtn = new ButtonCustom(view.pauseBtn);
	this.stopBtn = new ButtonCustom(view.stopBtn);

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
PlayerSoundComponent.prototype.preload = function(src, duration){
	'use strict';
	var self = this;

	// Safety net
	this.removeLoopEvent();

	// Sound ready state
	if(self.soundController !== null){
		self.soundController.destroy();
		self.soundController = null;
	}
	self.soundController = new SoundController(src, duration);
	self.soundController.on('ready', function(event){
		event.remove();
		// Enable buttons
		self.playBtn.setActive(true);
		self.stopBtn.setActive(true);

		// Dispatch event 
		self.dispatchEvent(new createjs.Event('ready'));
	}, self);
	self.soundController.load();
};
PlayerSoundComponent.prototype.addLoopEvent = function(){
	'use strict';
	if(this.listeners.tick === null){
		this.listeners.tick = this.progressionBar.on('tick', this.loop, this);
	}
};
PlayerSoundComponent.prototype.removeLoopEvent = function(){
	'use strict';
	this.progressionBar.off('tick', this.listeners.tick);
	this.listeners.tick = null;
};
PlayerSoundComponent.prototype.loop = function(){
	'use strict';	
	// var progression = this.progress();
	var sndProgression = this.soundController.progress();

	// Reached end of slide
	if(sndProgression >= 1){
		// Remove tick
		this.removeLoopEvent();

		// Swap Play/Pause visibility
		this.pauseBtn.visible(false);
		this.playBtn.visible(true);

		// Dispacth event 
		this.dispatchEvent(new createjs.Event('complete'));
	}

	// Progression bar
	this.progressionBar.scaleX = sndProgression;
};
PlayerSoundComponent.prototype.play = function(){
	'use strict';
	this.previousFrame = 0;

	// Swap Play/Pause visibility
	this.pauseBtn.visible(true);
	this.playBtn.visible(false);

	// Timeline
	this.addLoopEvent('tick');

	// Sound
	this.soundController.play();

	// Dispacth event 
	this.dispatchEvent(new createjs.Event('start'));

	// Set this last
	this.paused = false;

	// Tick
	Tick.enable();
};
PlayerSoundComponent.prototype.pause = function(){
	'use strict';

	// If invoked from external the state could be stopped
	// Adn we do not want to set in paused unintentional
	if(this.paused)
		return;

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Dispacth event 
	// this.dispatchEvent(new createjs.Event('pause'));

	this.paused = true;

	// Sound
	this.soundController.pause();

	// Tick
	Tick.disable(100);
};
PlayerSoundComponent.prototype.stop = function(){
	'use strict';

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Progression bar
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController.stop();

	// Dispacth event 
	// this.dispatchEvent(new createjs.Event('stop'));

	this.paused = false;

	// Tick
	Tick.disable(100);
};
PlayerSoundComponent.prototype.progress = function(){
	'use strict';
	var num = this.slide.currentFrame / this.duration;
	return Math.round(num * 1000) / 1000;
};
PlayerSoundComponent.prototype.reset = function(){
	'use strict';
	this.removeLoopEvent();
	this.paused = false;
	this.listeners = null;
};
PlayerSoundComponent.prototype.destroy = function(){
	'use strict';
	this.removeLoopEvent();
	this.view = null;
	this.listeners = null;
	this.playBtn.destroy();
	this.pauseBtn.destroy();
	this.stopBtn.destroy();
	this.playBtn = null;
	this.pauseBtn = null;
	this.stopBtn = null;
};
createjs.EventDispatcher.initialize(PlayerSoundComponent.prototype);
var PlayerSliderComponent = function(view){
	'use strict';
	this.view = view;
	this.container = view.container;
	this.slideId = null;
	this.slide = null;
	this.paused = false;
	this.duration = 0;
	this.listeners = {tick:null, play:null, pause:null, stop:null};
	this.playBtn = new ButtonCustom(view.playBtn);
	this.pauseBtn = new ButtonCustom(view.pauseBtn);
	this.stopBtn = new ButtonCustom(view.stopBtn);

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
			//// console.log(sndProgression, ':', progression);

			// Calculate in which frame the timeline shold be related to soudn progression
			var desiredFrame = Math.round(this.duration * sndProgression);			

			// Just a fail safe making sure that we do NOT play a frame already shown
			if(desiredFrame > this.previousFrame){
				this.slide.gotoAndPlay(desiredFrame);
				this.previousFrame = desiredFrame;
			}
		}
	}

	// Progression bar
	this.progressionBar.scaleX = sndProgression;
};
PlayerSliderComponent.prototype.play = function(){
	'use strict';
	// console.log('play');

	this.previousFrame = 0;

	// Swap Play/Pause visibility
	this.pauseBtn.visible(true);
	this.playBtn.visible(false);

	// Timeline
	this.slide.play();
	this.addLoopEvent('tick');

	// Sound
	this.soundController.play();

	// Set this last
	this.paused = false;

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

	// Pause timeline
	this.slide.stop();

	// Sound
	this.soundController.pause();

	// Tick
	Tick.disable(100);
};
PlayerSliderComponent.prototype.stop = function(){
	'use strict';

	// console.log('stop');

	// Remove tick
	this.removeLoopEvent();

	// Set slide timeline back to start
	this.slide.gotoAndStop(0);

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Progression bar
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController.stop();

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
var Preloader = {
	id: 'preloader',
	imagePath: 'assets/images/preloader.gif',


	load: function(manifest, handleFileLoad, handleComplete, clss){
		var self = this;

		if(clss == null)
			clss = 'center';

		var loader = new createjs.LoadQueue(false);
		if(handleFileLoad != null)
			loader.addEventListener('fileload', function(event){
				if(handleFileLoad != null){
					handleFileLoad(event);
				}
			});		
			loader.addEventListener('complete', function(event){
				if(handleComplete != null){
					handleComplete(event);
				}
				self.remove();
			});

		// self.add('preloader small');
		self.add('preloader '+clss);
		// self.add('preloader full');
		loader.loadManifest(manifest);
	},
	add: function(clss){
		// console.log('preloader:', clss);
		$('body').append(
			'<div id="preloader" class="'+clss+'"><div><div></div>'
		);
	},
	// add: function(clss){
	// 	$('body').append(
	// 		'<div id="preloader" class="'+clss+'">'+
	// 			'<div><img src="'+this.imagePath+'"></div>'+
	// 		'</div>'
	// 	);
	// },
	// add: function(clss){
	// 	$('body').append(
	// 		'<div id="preloader" class="'+clss+'">'+
	// 			'<div class="loader">'+
	// 			  '<div class="box"></div>'+
	// 			  '<div class="box"></div>'+
	// 			  '<div class="box"></div>'+
	// 			  '<div class="box"></div>'+
	// 			'</div>'+
	// 		'</div>'
	// 	);
	// },



	remove: function(){
		$('#'+this.id).remove();
	}
};
(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 648,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../assets/images/main/CharacterCardNickame0001.png", id:"CharacterCardNickame0001"},
		{src:"../assets/images/main/CharacterCardNickame0002.png", id:"CharacterCardNickame0002"},
		{src:"../assets/images/main/CharacterCardNickame0003.png", id:"CharacterCardNickame0003"},
		{src:"../assets/images/main/CharacterCardNickame0004.png", id:"CharacterCardNickame0004"},
		{src:"../assets/images/main/CharacterCardNickame0005.png", id:"CharacterCardNickame0005"},
		{src:"../assets/images/main/CharacterCardNickame0006.png", id:"CharacterCardNickame0006"},
		{src:"../assets/images/main/FotoAD.jpg", id:"FotoAD"},
		{src:"../assets/images/main/FotoAE.jpg", id:"FotoAE"},
		{src:"../assets/images/main/FotoAF.jpg", id:"FotoAF"},
		{src:"../assets/images/main/FotoBD.jpg", id:"FotoBD"},
		{src:"../assets/images/main/FotoBE.jpg", id:"FotoBE"},
		{src:"../assets/images/main/FotoBF.jpg", id:"FotoBF"},
		{src:"../assets/images/main/FotoCD.jpg", id:"FotoCD"},
		{src:"../assets/images/main/FotoCE.jpg", id:"FotoCE"},
		{src:"../assets/images/main/FotoCF.jpg", id:"FotoCF"},
		{src:"../assets/images/main/IntroTextFrame.png", id:"IntroTextFrame"},
		{src:"../assets/images/main/Logo.png", id:"Logo"},
		{src:"../assets/images/main/p1.png", id:"p1"},
		{src:"../assets/images/main/p10.png", id:"p10"},
		{src:"../assets/images/main/p2.png", id:"p2"},
		{src:"../assets/images/main/p3.png", id:"p3"},
		{src:"../assets/images/main/p4.png", id:"p4"},
		{src:"../assets/images/main/p5.png", id:"p5"},
		{src:"../assets/images/main/p6.png", id:"p6"},
		{src:"../assets/images/main/p7.png", id:"p7"},
		{src:"../assets/images/main/p8.png", id:"p8"},
		{src:"../assets/images/main/p9.png", id:"p9"},
		{src:"../assets/images/main/PointBG.png", id:"PointBG"},
		{src:"../assets/images/main/TopBG.jpg", id:"TopBG"},
		{src:"../assets/images/main/TopCard.png", id:"TopCard"}
	]
};



// symbols:



(lib.CharacterCardNickame0001 = function() {
	this.initialize(img.CharacterCardNickame0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0002 = function() {
	this.initialize(img.CharacterCardNickame0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0003 = function() {
	this.initialize(img.CharacterCardNickame0003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0004 = function() {
	this.initialize(img.CharacterCardNickame0004);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0005 = function() {
	this.initialize(img.CharacterCardNickame0005);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0006 = function() {
	this.initialize(img.CharacterCardNickame0006);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.FotoAD = function() {
	this.initialize(img.FotoAD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoAE = function() {
	this.initialize(img.FotoAE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoAF = function() {
	this.initialize(img.FotoAF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoBD = function() {
	this.initialize(img.FotoBD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoBE = function() {
	this.initialize(img.FotoBE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoBF = function() {
	this.initialize(img.FotoBF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoCD = function() {
	this.initialize(img.FotoCD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoCE = function() {
	this.initialize(img.FotoCE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoCF = function() {
	this.initialize(img.FotoCF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.IntroTextFrame = function() {
	this.initialize(img.IntroTextFrame);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,153);


(lib.Logo = function() {
	this.initialize(img.Logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,118);


(lib.p1 = function() {
	this.initialize(img.p1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p10 = function() {
	this.initialize(img.p10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p2 = function() {
	this.initialize(img.p2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p3 = function() {
	this.initialize(img.p3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p4 = function() {
	this.initialize(img.p4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p5 = function() {
	this.initialize(img.p5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p6 = function() {
	this.initialize(img.p6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p7 = function() {
	this.initialize(img.p7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p8 = function() {
	this.initialize(img.p8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p9 = function() {
	this.initialize(img.p9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.PointBG = function() {
	this.initialize(img.PointBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.TopBG = function() {
	this.initialize(img.TopBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,108);


(lib.TopCard = function() {
	this.initialize(img.TopCard);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,389,108);


(lib.IntroTextTopgfx = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.IntroTextFrame();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,318,153);


(lib.BackgroundGFX = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.TopBG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,108);


(lib.TopbarRealName = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{AD:0,AE:1,AF:2,BD:3,BE:4,BF:5,CD:6,CE:7,CF:8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// Layer 1
	this.text = new cjs.Text("Arnold Knudsen", "18px 'Special Elite'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 176;

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({text:"Albert Rasmussen"},0).wait(1).to({text:"Vilhelm Laursen"},0).wait(1).to({text:"Charles Kræfting"},0).wait(1).to({text:"Viktor Stegemeier"},0).wait(1).to({text:"Georg Wagner"},0).wait(1).to({text:"Marinus Sander"},0).wait(1).to({text:"Ernst Jensenius"},0).wait(1).to({text:"Paul Götzche"},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,180,22);


(lib.TopbarPhoto = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// Content
	this.instance = new lib.FotoAD();

	this.instance_1 = new lib.FotoAE();

	this.instance_2 = new lib.FotoAF();

	this.instance_3 = new lib.FotoBD();

	this.instance_4 = new lib.FotoBE();

	this.instance_5 = new lib.FotoBF();

	this.instance_6 = new lib.FotoCD();

	this.instance_7 = new lib.FotoCE();

	this.instance_8 = new lib.FotoCF();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.PointIndicator = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(10));

	// Bar
	this.instance = new lib.p1();
	this.instance.setTransform(12,9);

	this.instance_1 = new lib.p2();
	this.instance_1.setTransform(21,9);

	this.instance_2 = new lib.p3();
	this.instance_2.setTransform(30,9);

	this.instance_3 = new lib.p4();
	this.instance_3.setTransform(39,9);

	this.instance_4 = new lib.p5();
	this.instance_4.setTransform(48,9);

	this.instance_5 = new lib.p6();
	this.instance_5.setTransform(57,9);

	this.instance_6 = new lib.p7();
	this.instance_6.setTransform(66,9);

	this.instance_7 = new lib.p8();
	this.instance_7.setTransform(75,9);

	this.instance_8 = new lib.p9();
	this.instance_8.setTransform(84,9);

	this.instance_9 = new lib.p10();
	this.instance_9.setTransform(93,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6},{t:this.instance_7}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6},{t:this.instance_7},{t:this.instance_8}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6},{t:this.instance_7},{t:this.instance_8},{t:this.instance_9}]},1).wait(1));

	// Layer 1
	this.instance_10 = new lib.PointBG();

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(10));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.PageContainerEmpty = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


(lib.SkipButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA/BHIAAiNIAjAAQAXAAAAAYIAAArQAAAKgFAGQgHAGgLAAIgQAAIAAA0gABSACIAMAAQAIAAAAgHIAAgoQAAgEgCgCQgCgCgFAAIgLAAgAAaBHIAAiNIATAAIAACNgAgCBHIgYhGIAAgBIAUhGIAQAAIgSBGIAYBHgAguBHIAAiNIATAAIAACNgAhhBHQgXAAAAgaIAAgHIATAAIAAAHQAAAJAJAAIADAAQAIAAAAgJIAAgYQAAgEgCgBIgFgEIgbgOQgDgCgBgDIgBgJIAAgeQAAgYAXAAIAMAAQAMAAAFAGQAGAGAAAMIAAAOIgTAAIAAgMQAAgFgDgCQgCgCgDAAIgEAAQgEAAgCACQgCACAAAFIAAAXQAAAFACABIAFADIAaAOQADABACADQABADAAAHIAAAfQAAAYgXAAg");
	this.shape.setTransform(48,46.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA/BHIAAiNIAjAAQAXAAAAAYIAAArQAAAKgFAGQgHAGgLAAIgQAAIAAA0gABSACIAMAAQAIAAAAgHIAAgoQAAgEgCgCQgDgCgEAAIgLAAgAAaBHIAAiNIATAAIAACNgAgCBHIgYhGIAAgBIAUhGIAQAAIgSBGIAYBHgAguBHIAAiNIATAAIAACNgAhhBHQgXAAAAgaIAAgHIATAAIAAAHQAAAJAJAAIADAAQAIAAAAgJIAAgYQAAgEgCgBIgFgEIgbgOQgDgCgBgDIgBgJIAAgeQAAgYAXAAIAMAAQAMAAAFAGQAGAGAAAMIAAAOIgTAAIAAgMQAAgFgDgCQgCgCgDAAIgEAAQgEAAgCACQgCACAAAFIAAAXQAAAFACABIAFADIAaAOQADABACADQABADAAAHIAAAfQAAAYgXAAg");
	this.shape_1.setTransform(49,47.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[]},1).wait(1));

	// Layer 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D18B00").s().p("Ai6C7QhOhOAAhtQAAhsBOhOQBOhOBsAAQBtAABOBOQBOBOAABsQAABthOBOQhOBOhtAAQhsAAhOhOg");
	this.shape_2.setTransform(47,47);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2).to({x:48,y:48},0).to({_off:true},1).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1DAB5").s().p("AjiDhQhchdAAiEQAAiDBchfQBfhcCDAAQCFAABcBcQBfBfAACDQAACEhfBdQhcBfiFAAQiDAAhfhfg");
	this.shape_3.setTransform(47,47);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1DAB5").s().p("AjiDhQhdhdABiEQgBiDBdhfQBfhdCDABQCEgBBdBdQBfBfAACDQAACEhfBdQhdBfiEAAQiDAAhfhfg");
	this.shape_4.setTransform(48,48);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15,15,64,64);


(lib.GoOnButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AinC1ICwi1IiziyIBUhTIEBEHIkCEEg");
	this.shape.setTransform(51.4,45.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({x:53.4,y:47.9},0).to({_off:true},1).wait(1));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D18B00").s().p("AkSETQhyhyAAihQAAifByhzQBzhyCfAAQChAAByByQBzBzAACfQAAChhzByQhyBzihAAQifAAhzhzg");
	this.shape_1.setTransform(47,47);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D18B00").s().p("AkSETQhyhzgBigQABifByhzQBzhyCfgBQCgABBzByQByBzABCfQgBCghyBzQhzByigABQifgBhzhyg");
	this.shape_2.setTransform(49,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},2).to({state:[]},1).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1DAB5").s().p("AlMFLQiIiJgBjCQABjBCIiLQCLiIDBgBQDCABCJCIQCKCLAADBQAADCiKCJQiJCKjCAAQjBAAiLiKg");
	this.shape_3.setTransform(47,47);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1DAB5").s().p("AlMFLQiIiJgBjCQABjBCIiLQCLiIDBgBQDDABCICIQCLCLAADBQAADCiLCJQiICLjDAAQjBAAiLiLg");
	this.shape_4.setTransform(49,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,94,94);


(lib.CharacterCardNickame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(14));

	// Nickname png
	this.instance = new lib.CharacterCardNickame0001();
	this.instance.setTransform(3.8,0.7);

	this.instance_1 = new lib.CharacterCardNickame0002();
	this.instance_1.setTransform(3.8,0.7);

	this.instance_2 = new lib.CharacterCardNickame0003();
	this.instance_2.setTransform(3.8,0.7);

	this.instance_3 = new lib.CharacterCardNickame0004();
	this.instance_3.setTransform(3.8,0.7);

	this.instance_4 = new lib.CharacterCardNickame0005();
	this.instance_4.setTransform(3.8,0.7);

	this.instance_5 = new lib.CharacterCardNickame0006();
	this.instance_5.setTransform(3.8,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[]},1).wait(8));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.5,0.6,212.3,28.1);


(lib.BlockerBLACK = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ApXJXIAAyuISuAAIAASug");
	this.shape.setTransform(60,60);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


(lib.PointsMood = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("humør", "18px 'BigNoodleTitling'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 55;
	this.text.setTransform(110,10);

	this.points = new lib.PointIndicator();
	this.points.setTransform(88.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.points,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.PointsMoney = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("penge", "18px 'BigNoodleTitling'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 55;
	this.text.setTransform(110,10);

	this.points = new lib.PointIndicator();
	this.points.setTransform(88.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.points,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.PointsHealth = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("helbred", "18px 'BigNoodleTitling'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 55;
	this.text.setTransform(110,10);

	this.points = new lib.PointIndicator();
	this.points.setTransform(88.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.points,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.ContinueButton = function() {
	this.initialize();

	// Skip
	this.skipBtn = new lib.SkipButton();
	this.skipBtn.setTransform(47,47,1,1,0,0,0,47,47);
	new cjs.ButtonHelper(this.skipBtn, 0, 1, 2, false, new lib.SkipButton(), 3);

	// Continue
	this.nextBtn = new lib.GoOnButton();
	this.nextBtn.setTransform(47,47,1,1,0,0,0,47,47);
	new cjs.ButtonHelper(this.nextBtn, 0, 1, 2, false, new lib.GoOnButton(), 3);

	this.addChild(this.nextBtn,this.skipBtn);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,96,96);


(lib.HUD = function() {
	this.initialize();

	// Text
	this.mood = new lib.PointsMood();

	// Points
	this.money = new lib.PointsMoney();
	this.money.setTransform(209.7,72.4,1,1,0,0,0,88.5,25);

	this.health = new lib.PointsHealth();
	this.health.setTransform(268.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.health,this.money,this.mood);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,357,97.4);


(lib.TopBarMain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{intro:4,character:11,game:19});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(30));

	// Logo
	this.instance = new lib.Logo();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30));

	// Points
	this.hud = new lib.HUD();
	this.hud.setTransform(652,9);
	this.hud._off = true;

	this.timeline.addTween(cjs.Tween.get(this.hud).wait(19).to({_off:false},0).wait(11));

	// Real Name / Nickname
	this.nickname = new lib.CharacterCardNickame();
	this.nickname.setTransform(483,72,0.7,0.7,3.5,0,0,108.6,12.2);

	this.realname = new lib.TopbarRealName();
	this.realname.setTransform(487,44,1,1,0,0,0,90,11);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.realname},{t:this.nickname}]},19).wait(11));

	// Photo
	this.photo = new lib.TopbarPhoto();
	this.photo.setTransform(301.5,54,1,1,0,0,0,82.5,54);

	this.instance_1 = new lib.TopCard();
	this.instance_1.setTransform(200,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.photo}]},19).wait(11));

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("A2uFQIAAqfMAtdAAAIAAKfg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:569.4,y:48.9}).wait(19).to({graphics:null,x:0,y:0}).wait(11));

	// Layer 6
	this.label_intro = new cjs.Text("Intro", "48px 'BigNoodleTitling'", "#FFFFFF");
	this.label_intro.name = "label_intro";
	this.label_intro.textAlign = "center";
	this.label_intro.lineHeight = 50;
	this.label_intro.lineWidth = 287;
	this.label_intro.setTransform(566.5,21.9);
	this.label_intro._off = true;

	this.label_intro.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.label_intro).wait(4).to({_off:false},0).wait(7).to({text:"hvem er du?"},0).to({_off:true},8).wait(11));

	// Speecbubble
	this.instance_2 = new lib.IntroTextTopgfx("synched",0);
	this.instance_2.setTransform(569,82.5,1,1,0,0,0,159,76.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({_off:false},0).to({_off:true},15).wait(11));

	// BG
	this.instance_3 = new lib.BackgroundGFX("synched",0);
	this.instance_3.setTransform(512,54,1,1,0,0,0,512,54);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1024,118);


// stage content:
(lib.Main = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{preload:4,start:10,character_build:19,poohouse:34,germany:44});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(70));

	// Blocker
	this.blocker_black = new lib.BlockerBLACK();
	this.blocker_black.setTransform(-10,0,8.7,6.4);

	this.timeline.addTween(cjs.Tween.get(this.blocker_black).wait(70));

	// Top Bar
	this.topbar = new lib.TopBarMain();
	this.topbar.setTransform(512,54,1,1,0,0,0,512,54);
	this.topbar._off = true;

	this.timeline.addTween(cjs.Tween.get(this.topbar).wait(10).to({_off:false},0).wait(60));

	// Continue
	this.continueBtn = new lib.ContinueButton();
	this.continueBtn.setTransform(951,579.4,1,1,0,0,0,48,48);
	this.continueBtn._off = true;

	this.timeline.addTween(cjs.Tween.get(this.continueBtn).wait(10).to({_off:false},0).wait(60));

	// Container
	this.startpagecontainer = new lib.PageContainerEmpty();

	this.pagecontainer = new lib.PageContainerEmpty();
	this.pagecontainer.setTransform(0,108);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.pagecontainer},{t:this.startpagecontainer}]}).wait(70));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(502,324,1044,768);

})(mainlib = mainlib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var mainlib, images, createjs, ss;
(function () {
	'use strict';
	var app = angular.module('fattiggarden', ['ngRoute']);	

	app.controller('MainController', function($scope, Device) {

		$scope.lib = mainlib;
		$scope.images = images;
		// $scope.exportRoot;
		// $scope.canvas;

		function init(){
			// Load files
			var onFileLoad = function(evt){		
				if (evt.item.type === 'image') { 
					$scope.images[evt.item.id] = evt.result; 
				}
			};
			var onLoadComplete = function(evt){
				// Instantiate root object. Equivalent to root timeline
				$scope.exportRoot = new $scope.lib.Main();

				var stage = new createjs.Stage($scope.canvas);
				stage.addChild($scope.exportRoot);

				// Do cursor
				stage.enableMouseOver(10);

				// Scale canvas according to ratio
				stage.scaleX = stage.scaleY = Device.ratio;
				stage.update();

				// Tik tak - ticker
				Tick.init(stage, 15);
				Tick.enable();		

				console.log('stage.autoClear:', stage.autoClear);
				
				//console.log('createjs.Ticker.framerate:', createjs.Ticker.framerate)

				// --------------------- Go start ->
				ApplicationManager.start($scope.exportRoot);
			};
			Preloader.load($scope.lib.properties.manifest, onFileLoad, onLoadComplete, 'full');
		}

		// function setup(){
		// 	// Instantiate root object. Equivalent to root timeline
		// 	$scope.exportRoot = new $scope.lib.FlashApp();

		// 	var stage = new createjs.Stage($scope.canvas);
		// 	stage.addChild($scope.exportRoot);

		// 	// Do cursor
		// 	stage.enableMouseOver(10);

		// 	// Scale canvas according to ratio
		// 	stage.scaleX = stage.scaleY = Device.ratio;
		// 	stage.update();

		// 	// Tik tak			
		// 	Tick.init(stage, 15);
		// 	Tick.enable();		
			
		// 	//console.log('createjs.Ticker.framerate:', createjs.Ticker.framerate)

		// 	// --------------------- Go start ->
		// 	ApplicationManager.start($scope.exportRoot);
		// }

		init();
	});
	
	app.directive('slCanvas', function(Device, Canvas) {	
		function link(scope){	
			// Create base canvas
			// Device.ratio = 1;
			scope.canvas = Canvas.create(1024, 648, Device.ratio);	
			scope.canvas.style.background = '#000';
			document.body.appendChild(scope.canvas);	
		}
		return {
			restrict: 'AEC',
	    	link: link
		};
	});

	app.factory('Device', function(){
		function ratio(){
			var ctx = document.createElement('canvas').getContext('2d'),
	        dpr = window.devicePixelRatio || 1,
	        bsr = ctx.webkitBackingStorePixelRatio ||
	              ctx.mozBackingStorePixelRatio ||
	              ctx.msBackingStorePixelRatio ||
	              ctx.oBackingStorePixelRatio ||
	              ctx.backingStorePixelRatio || 1;

	    	return dpr / bsr;
		}
		return {
			ratio: ratio()
		};
	});

	app.factory('Canvas', function() {
		return {
			create: function(w, h, ratio) {			    
			    var canvas = document.createElement('canvas');
			    canvas.width = w * ratio;
			    canvas.height = h * ratio;
			    canvas.style.width = w + 'px';
			    canvas.style.height = h + 'px';
			    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);			    
			    return canvas;
			}
		};
	});

})();
(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/js/Main.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Main</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="Main.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(mainlib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new mainlib.Main();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(mainlib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="1024" height="648" style="background-color:#000000"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/fonts/BigNoodle/big_noodle_titling-demo.html',
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript" charset="utf-8"></script><script src="specimen_files/easytabs.js" type="text/javascript" charset="utf-8"></script><link rel="stylesheet" href="specimen_files/specimen_stylesheet.css" type="text/css" charset="utf-8"><link rel="stylesheet" href="stylesheet.css" type="text/css" charset="utf-8"><style type="text/css">body{\n' +
    '				font-family: \'bignoodletitlingregular\';\n' +
    '							}</style><title>BigNoodleTitling Regular Specimen</title><script type="text/javascript">$(document).ready(function() {\n' +
    '			$(\'#container\').easyTabs({defaultContent:1});\n' +
    '		});</script></head><body><div id="container"><div id="header">BigNoodleTitling Regular</div><ul class="tabs"><li><a href="#specimen">Specimen</a></li><li><a href="#layout">Sample Layout</a></li><li><a href="#glyphs">Glyphs &amp; Languages</a></li><li><a href="#installing">Installing Webfonts</a></li></ul><div id="main_content"><div id="specimen"><div class="section"><div class="grid12 firstcol"><div class="huge">AaBb</div></div></div><div class="section"><div class="glyph_range">A&#x200B;B&#x200b;C&#x200b;D&#x200b;E&#x200b;F&#x200b;G&#x200b;H&#x200b;I&#x200b;J&#x200b;K&#x200b;L&#x200b;M&#x200b;N&#x200b;O&#x200b;P&#x200b;Q&#x200b;R&#x200b;S&#x200b;T&#x200b;U&#x200b;V&#x200b;W&#x200b;X&#x200b;Y&#x200b;Z&#x200b;a&#x200b;b&#x200b;c&#x200b;d&#x200b;e&#x200b;f&#x200b;g&#x200b;h&#x200b;i&#x200b;j&#x200b;k&#x200b;l&#x200b;m&#x200b;n&#x200b;o&#x200b;p&#x200b;q&#x200b;r&#x200b;s&#x200b;t&#x200b;u&#x200b;v&#x200b;w&#x200b;x&#x200b;y&#x200b;z&#x200b;1&#x200b;2&#x200b;3&#x200b;4&#x200b;5&#x200b;6&#x200b;7&#x200b;8&#x200b;9&#x200b;0&#x200b;&amp;&#x200b;.&#x200b;,&#x200b;?&#x200b;!&#x200b;&#64;&#x200b;(&#x200b;)&#x200b;#&#x200b;$&#x200b;%&#x200b;*&#x200b;+&#x200b;-&#x200b;=&#x200b;:&#x200b;;</div></div><div class="section"><div class="grid12 firstcol"><table class="sample_table"><tr><td>10</td><td class="size10">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>11</td><td class="size11">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>12</td><td class="size12">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>13</td><td class="size13">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>14</td><td class="size14">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>16</td><td class="size16">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>18</td><td class="size18">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>20</td><td class="size20">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>24</td><td class="size24">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>30</td><td class="size30">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>36</td><td class="size36">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>48</td><td class="size48">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>60</td><td class="size60">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>72</td><td class="size72">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr><tr><td>90</td><td class="size90">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</td></tr></table></div></div><div class="section" id="bodycomparison"><div id="xheight"><div class="fontbody">&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;&#x25FC;body</div><div class="arialbody">body</div><div class="verdanabody">body</div><div class="georgiabody">body</div></div><div class="fontbody" style="z-index:1">body<span>BigNoodleTitling Regular</span></div><div class="arialbody" style="z-index:1">body<span>Arial</span></div><div class="verdanabody" style="z-index:1">body<span>Verdana</span></div><div class="georgiabody" style="z-index:1">body<span>Georgia</span></div></div><div class="section psample psample_row1" id=""><div class="grid2 firstcol"><p class="size10"><span>10.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid3"><p class="size11"><span>11.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid3"><p class="size12"><span>12.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid4"><p class="size13"><span>13.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="white_blend"></div></div><div class="section psample psample_row2" id=""><div class="grid3 firstcol"><p class="size14"><span>14.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid4"><p class="size16"><span>16.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid5"><p class="size18"><span>18.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="white_blend"></div></div><div class="section psample psample_row3" id=""><div class="grid5 firstcol"><p class="size20"><span>20.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid7"><p class="size24"><span>24.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="white_blend"></div></div><div class="section psample psample_row4" id=""><div class="grid12 firstcol"><p class="size30"><span>30.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="white_blend"></div></div><div class="section psample psample_row1 fullreverse"><div class="grid2 firstcol"><p class="size10"><span>10.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid3"><p class="size11"><span>11.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid3"><p class="size12"><span>12.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid4"><p class="size13"><span>13.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="black_blend"></div></div><div class="section psample psample_row2 fullreverse"><div class="grid3 firstcol"><p class="size14"><span>14.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid4"><p class="size16"><span>16.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid5"><p class="size18"><span>18.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="black_blend"></div></div><div class="section psample fullreverse psample_row3" id=""><div class="grid5 firstcol"><p class="size20"><span>20.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="grid7"><p class="size24"><span>24.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="black_blend"></div></div><div class="section psample fullreverse psample_row4" id="" style="border-bottom: 20px #000 solid"><div class="grid12 firstcol"><p class="size30"><span>30.</span>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.</p></div><div class="black_blend"></div></div></div><div id="layout"><div class="section"><div class="grid12 firstcol"><h1>Lorem Ipsum Dolor</h1><h2>Etiam porta sem malesuada magna mollis euismod</h2><p class="byline">By <a href="#link">Aenean Lacinia</a></p></div></div><div class="section"><div class="grid8 firstcol"><p class="large">Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p><h3>Pellentesque ornare sem</h3><p>Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit.</p><p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p><p>Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur.</p><p>Nullam quis risus eget urna mollis ornare vel eu leo. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla.</p><h3>Cras mattis consectetur</h3><p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.</p><p>Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum.</p></div><div class="grid4 sidebar"><div class="box reverse"><p class="last">Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><p class="caption">Maecenas sed diam eget risus varius.</p><p>Vestibulum id ligula porta felis euismod semper. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.</p><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p></div></div></div><div id="glyphs"><div class="section"><div class="grid12 firstcol"><h1>Language Support</h1><p>The subset of BigNoodleTitling Regular in this kit supports the following languages:<br></p><h1>Glyph Chart</h1><p>The subset of BigNoodleTitling Regular in this kit includes all the glyphs listed below. Unicode entities are included above each glyph to help you insert individual characters into your layout.</p><div id="glyph_chart"><div><p>&amp;#32;</p>&#32;</div><div><p>&amp;#33;</p>&#33;</div><div><p>&amp;#34;</p>&#34;</div><div><p>&amp;#35;</p>&#35;</div><div><p>&amp;#36;</p>&#36;</div><div><p>&amp;#37;</p>&#37;</div><div><p>&amp;#38;</p>&#38;</div><div><p>&amp;#39;</p>&#39;</div><div><p>&amp;#40;</p>&#40;</div><div><p>&amp;#41;</p>&#41;</div><div><p>&amp;#42;</p>&#42;</div><div><p>&amp;#43;</p>&#43;</div><div><p>&amp;#44;</p>&#44;</div><div><p>&amp;#45;</p>&#45;</div><div><p>&amp;#46;</p>&#46;</div><div><p>&amp;#47;</p>&#47;</div><div><p>&amp;#48;</p>&#48;</div><div><p>&amp;#49;</p>&#49;</div><div><p>&amp;#50;</p>&#50;</div><div><p>&amp;#51;</p>&#51;</div><div><p>&amp;#52;</p>&#52;</div><div><p>&amp;#53;</p>&#53;</div><div><p>&amp;#54;</p>&#54;</div><div><p>&amp;#55;</p>&#55;</div><div><p>&amp;#56;</p>&#56;</div><div><p>&amp;#57;</p>&#57;</div><div><p>&amp;#58;</p>&#58;</div><div><p>&amp;#59;</p>&#59;</div><div><p>&amp;#60;</p>&#60;</div><div><p>&amp;#61;</p>&#61;</div><div><p>&amp;#62;</p>&#62;</div><div><p>&amp;#63;</p>&#63;</div><div><p>&amp;#64;</p>&#64;</div><div><p>&amp;#65;</p>&#65;</div><div><p>&amp;#66;</p>&#66;</div><div><p>&amp;#67;</p>&#67;</div><div><p>&amp;#68;</p>&#68;</div><div><p>&amp;#69;</p>&#69;</div><div><p>&amp;#70;</p>&#70;</div><div><p>&amp;#71;</p>&#71;</div><div><p>&amp;#72;</p>&#72;</div><div><p>&amp;#73;</p>&#73;</div><div><p>&amp;#74;</p>&#74;</div><div><p>&amp;#75;</p>&#75;</div><div><p>&amp;#76;</p>&#76;</div><div><p>&amp;#77;</p>&#77;</div><div><p>&amp;#78;</p>&#78;</div><div><p>&amp;#79;</p>&#79;</div><div><p>&amp;#80;</p>&#80;</div><div><p>&amp;#81;</p>&#81;</div><div><p>&amp;#82;</p>&#82;</div><div><p>&amp;#83;</p>&#83;</div><div><p>&amp;#84;</p>&#84;</div><div><p>&amp;#85;</p>&#85;</div><div><p>&amp;#86;</p>&#86;</div><div><p>&amp;#87;</p>&#87;</div><div><p>&amp;#88;</p>&#88;</div><div><p>&amp;#89;</p>&#89;</div><div><p>&amp;#90;</p>&#90;</div><div><p>&amp;#91;</p>&#91;</div><div><p>&amp;#92;</p>&#92;</div><div><p>&amp;#93;</p>&#93;</div><div><p>&amp;#95;</p>&#95;</div><div><p>&amp;#96;</p>&#96;</div><div><p>&amp;#123;</p>&#123;</div><div><p>&amp;#124;</p>&#124;</div><div><p>&amp;#125;</p>&#125;</div><div><p>&amp;#32;</p>&#32;</div><div><p>&amp;#161;</p>&#161;</div><div><p>&amp;#162;</p>&#162;</div><div><p>&amp;#163;</p>&#163;</div><div><p>&amp;#165;</p>&#165;</div><div><p>&amp;#166;</p>&#166;</div><div><p>&amp;#167;</p>&#167;</div><div><p>&amp;#168;</p>&#168;</div><div><p>&amp;#169;</p>&#169;</div><div><p>&amp;#170;</p>&#170;</div><div><p>&amp;#171;</p>&#171;</div><div><p>&amp;#172;</p>&#172;</div><div><p>&amp;#45;</p>&#45;</div><div><p>&amp;#174;</p>&#174;</div><div><p>&amp;#175;</p>&#175;</div><div><p>&amp;#176;</p>&#176;</div><div><p>&amp;#178;</p>&#178;</div><div><p>&amp;#179;</p>&#179;</div><div><p>&amp;#180;</p>&#180;</div><div><p>&amp;#181;</p>&#181;</div><div><p>&amp;#182;</p>&#182;</div><div><p>&amp;#184;</p>&#184;</div><div><p>&amp;#185;</p>&#185;</div><div><p>&amp;#186;</p>&#186;</div><div><p>&amp;#187;</p>&#187;</div><div><p>&amp;#188;</p>&#188;</div><div><p>&amp;#189;</p>&#189;</div><div><p>&amp;#190;</p>&#190;</div><div><p>&amp;#191;</p>&#191;</div><div><p>&amp;#198;</p>&#198;</div><div><p>&amp;#215;</p>&#215;</div><div><p>&amp;#216;</p>&#216;</div><div><p>&amp;#222;</p>&#222;</div><div><p>&amp;#223;</p>&#223;</div><div><p>&amp;#247;</p>&#247;</div><div><p>&amp;#321;</p>&#321;</div><div><p>&amp;#338;</p>&#338;</div><div><p>&amp;#402;</p>&#402;</div><div><p>&amp;#710;</p>&#710;</div><div><p>&amp;#711;</p>&#711;</div><div><p>&amp;#175;</p>&#175;</div><div><p>&amp;#728;</p>&#728;</div><div><p>&amp;#729;</p>&#729;</div><div><p>&amp;#730;</p>&#730;</div><div><p>&amp;#731;</p>&#731;</div><div><p>&amp;#732;</p>&#732;</div><div><p>&amp;#733;</p>&#733;</div><div><p>&amp;#59;</p>&#59;</div><div><p>&amp;#181;</p>&#181;</div><div><p>&amp;#8211;</p>&#8211;</div><div><p>&amp;#8212;</p>&#8212;</div><div><p>&amp;#8216;</p>&#8216;</div><div><p>&amp;#8217;</p>&#8217;</div><div><p>&amp;#8220;</p>&#8220;</div><div><p>&amp;#8221;</p>&#8221;</div><div><p>&amp;#8224;</p>&#8224;</div><div><p>&amp;#8225;</p>&#8225;</div><div><p>&amp;#8226;</p>&#8226;</div><div><p>&amp;#8240;</p>&#8240;</div><div><p>&amp;#8249;</p>&#8249;</div><div><p>&amp;#8250;</p>&#8250;</div><div><p>&amp;#8260;</p>&#8260;</div><div><p>&amp;#8364;</p>&#8364;</div><div><p>&amp;#8482;</p>&#8482;</div><div><p>&amp;#8722;</p>&#8722;</div><div><p>&amp;#8260;</p>&#8260;</div><div><p>&amp;#64257;</p>&#64257;</div><div><p>&amp;#64258;</p>&#64258;</div></div></div></div></div><div id="specs"></div><div id="installing"><div class="section"><div class="grid7 firstcol"><h1>Installing Webfonts</h1><p>Webfonts are supported by all major browser platforms but not all in the same way. There are currently four different font formats that must be included in order to target all browsers. This includes TTF, WOFF, EOT and SVG.</p><h2>1. Upload your webfonts</h2><p>You must upload your webfont kit to your website. They should be in or near the same directory as your CSS files.</p><h2>2. Include the webfont stylesheet</h2><p>A special CSS @font-face declaration helps the various browsers select the appropriate font it needs without causing you a bunch of headaches. Learn more about this syntax by reading the <a href="http://www.fontspring.com/blog/further-hardening-of-the-bulletproof-syntax">Fontspring blog post</a> about it. The code for it is as follows:</p><code>@font-face{ font-family: \'MyWebFont\'; src: url(\'WebFont.eot\'); src: url(\'WebFont.eot?#iefix\') format(\'embedded-opentype\'), url(\'WebFont.woff\') format(\'woff\'), url(\'WebFont.ttf\') format(\'truetype\'), url(\'WebFont.svg#webfont\') format(\'svg\'); }</code><p>We\'ve already gone ahead and generated the code for you. All you have to do is link to the stylesheet in your HTML, like this:</p><code>&lt;link rel=&quot;stylesheet&quot; href=&quot;stylesheet.css&quot; type=&quot;text/css&quot; charset=&quot;utf-8&quot; /&gt;</code><h2>3. Modify your own stylesheet</h2><p>To take advantage of your new fonts, you must tell your stylesheet to use them. Look at the original @font-face declaration above and find the property called "font-family." The name linked there will be what you use to reference the font. Prepend that webfont name to the font stack in the "font-family" property, inside the selector you want to change. For example:</p><code>p { font-family: \'WebFont\', Arial, sans-serif; }</code><h2>4. Test</h2><p>Getting webfonts to work cross-browser <em>can</em> be tricky. Use the information in the sidebar to help you if you find that fonts aren\'t loading in a particular browser.</p></div><div class="grid5 sidebar"><div class="box"><h2>Troubleshooting<br>Font-Face Problems</h2><p>Having trouble getting your webfonts to load in your new website? Here are some tips to sort out what might be the problem.</p><h3>Fonts not showing in any browser</h3><p>This sounds like you need to work on the plumbing. You either did not upload the fonts to the correct directory, or you did not link the fonts properly in the CSS. If you\'ve confirmed that all this is correct and you still have a problem, take a look at your .htaccess file and see if requests are getting intercepted.</p><h3>Fonts not loading in iPhone or iPad</h3><p>The most common problem here is that you are serving the fonts from an IIS server. IIS refuses to serve files that have unknown MIME types. If that is the case, you must set the MIME type for SVG to "image/svg+xml" in the server settings. Follow these instructions from Microsoft if you need help.</p><h3>Fonts not loading in Firefox</h3><p>The primary reason for this failure? You are still using a version Firefox older than 3.5. So upgrade already! If that isn\'t it, then you are very likely serving fonts from a different domain. Firefox requires that all font assets be served from the same domain. Lastly it is possible that you need to add WOFF to your list of MIME types (if you are serving via IIS.)</p><h3>Fonts not loading in IE</h3><p>Are you looking at Internet Explorer on an actual Windows machine or are you cheating by using a service like Adobe BrowserLab? Many of these screenshot services do not render @font-face for IE. Best to test it on a real machine.</p><h3>Fonts not loading in IE9</h3><p>IE9, like Firefox, requires that fonts be served from the same domain as the website. Make sure that is the case.</p></div></div></div></div></div><div id="footer"><p>&copy;2010-2011 Font Squirrel. All rights reserved.</p></div></div></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/games/germany1.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>germany1</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="germany1.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(gamelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new gamelib.germany_1();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(gamelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="1024" height="540" style="background-color:#000000"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/games/poorhouse_intro.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>poorhouse_intro</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="poorhouse_intro.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(gamelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new gamelib.poorhouse_intro();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(gamelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="1024" height="540" style="background-color:#000000"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/games/proloque.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>proloque</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="proloque.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(gamelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new gamelib.proloque();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(gamelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="1024" height="648" style="background-color:#000000"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/games/svendborg.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>svendborg</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="svendborg.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(gamelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new gamelib.svendborg();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(gamelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="1024" height="540" style="background-color:#000000"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_1_0_1_svendborg.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_1_0_1_svendborg</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_1_0_1_svendborg.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_1_0_1_svendborg();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_2_5.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_2_5</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_2_5.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_2_5();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_2_7_1_amory.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_2_7_1_amory</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_2_7_1_amory.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_2_7_1_amory();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_2_7_1_butcher.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_2_7_1_butcher</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_2_7_1_butcher.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_2_7_1_butcher();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_2_7_1_mine.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_2_7_1_mine</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_2_7_1_mine.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_2_7_1_mine();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_home1A.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_home1A</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_home1A.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_home1A();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_home1B.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_home1B</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_home1B.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_home1B();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('fattiggarden');
} catch (e) {
  module = angular.module('fattiggarden', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_intro.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_intro</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_intro.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(slidelib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new slidelib.slide_intro();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(slidelib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();
