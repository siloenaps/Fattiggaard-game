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
		this.skipBtnInstance.visible(false);
		this.nextBtnInstance.visible(false);
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
	//
};
PageStart.prototype.onContinue = function(event) {
	this.continueBtn.off('click', this.listeners.continue);	
	this.dispatchEvent(new createjs.Event('continue'));
};
PageStart.prototype.destroy = function() {
	this.view = null;	
};
createjs.EventDispatcher.initialize(PageStart.prototype);
var PageOpinion = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.activePlayer = null;

	this.playersCount = 0;
	this.completed = 0;

	var challenge = PlayerStats.challenge;
	var family = PlayerStats.family;
	this.soundChallengeObject = SoundService.matrix.challenge[challenge];
	this.soundFamilyObject = SoundService.matrix.family[family];

	// Player - Challenge
	view.playerChallenge.visible = false;
	if(this.soundChallengeObject != null){
		view.playerChallenge.visible = true;
		this.challengePlayerComponent = new PlayerSoundComponent(view.playerChallenge.player);
		this.challengePlayerComponent.preload(this.soundChallengeObject.src, this.soundChallengeObject.duration);
		this.playersCount++;

		this.listeners.challengeStart = this.challengePlayerComponent.on("start", this.onSoundStart, this);

		this.listeners.challenge = this.challengePlayerComponent.on('complete', this.onComplete, this);
	}

	// Player - Family
	view.playerFamily.visible = false;
	if(this.soundFamilyObject != null){
		view.playerFamily.visible = true;
		this.familyPlayerComponent = new PlayerSoundComponent(view.playerFamily.player);
		this.familyPlayerComponent.preload(this.soundFamilyObject.src, this.soundFamilyObject.duration);
		this.playersCount++;

		this.listeners.familiyStart = this.familyPlayerComponent.on("start", this.onSoundStart, this);

		this.listeners.family = this.familyPlayerComponent.on('complete', this.onComplete, this);
	}

	// Place challenge player if only player
	// NB. Hardcoded positions reltaed to to original poistions in Flash setup
	if(this.playersCount == 1){
		view.playerChallenge.y = 125;
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
			self.dispatchEvent(new createjs.Event('continue'));
		});
	}, self);
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
	this.continueBtn.activate("skip");

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
	this.listeners.complete = this.playerComponent.on('complete', this.onComplete, this);
};
PageIntro.prototype.start = function() {
	LoadJS.load(
		'../assets/logic/slides/'+"slide_"+this.id+".js", 
		Delegate.create(this.setup, this)
	);
};
PageIntro.prototype.setup = function() {
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	try{
		this.lib = libSlideIntro;
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
};
PageIntro.prototype.onComplete = function(event) {
	this.playerComponent.off('complete', this.listeners.complete);	
	this.listeners.complete = null;

	// Set next button active
	this.continueBtn.activate("next");
};
PageIntro.prototype.destroy = function() {
	this.playerComponent.destroy();	
	this.playerComponent = null;
	this.view = null;
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
var FlowPoorhouse = function(container){
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
	this.continueBtn.activate('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};
FlowPoorhouse.prototype.start = function(){
	this.id = PlayerStats.poorhouse;
	var gameFile;

	LoadJS.load(
		['../assets/logic/games/svendborg.js', '../assets/logic/slides/slide_svendborg.js'], 
		Delegate.create(this.setup, this)
	);
};
FlowPoorhouse.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	var self = this;
	var manifest, Clss;	

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('1.0.1', Delegate.create(this.intro, this), '1.0.2');
	this.flow.addAction('1.0.2', Delegate.create(this.points1, this), '1.1.1');
	// this.flow.addAction('1.0.2', Delegate.create(this.points1, this), '1.3.5'); // TEST
	this.flow.addAction('1.1.1', Delegate.create(this.caretaker, this), '1.1.2');
	this.flow.addAction('1.1.2', Delegate.create(this.chooseJob, this), '1.2.1');
	this.flow.addAction('1.2.1', Delegate.create(this.work, this), '1.2.2');
	this.flow.addAction('1.2.2', Delegate.create(this.points2, this), '1.3.1');
	this.flow.addAction('1.3.1', Delegate.create(this.points3, this), '1.3.2');
	this.flow.addAction('1.3.2', Delegate.create(this.getout, this), '1.3.3');
	this.flow.addAction('1.3.3', Delegate.create(this.chooseAdvice, this), '1.3.4');
	this.flow.addAction('1.3.4', Delegate.create(this.playAdvice, this), '1.3.5');
	this.flow.addAction('1.3.5', Delegate.create(this.chooseWayOut, this), {'A':'1.6.1', 'B':'1.7', 'C':'1.9'}); 
	this.flow.addAction('1.6.1', Delegate.create(this.drunk, this), '1.6.2');
	this.flow.addAction('1.6.2', Delegate.create(this.points7, this), '1.6.3');
	this.flow.addAction('1.6.3', Delegate.create(this.constable, this), '1.6.4');
	this.flow.addAction('1.6.4', Delegate.create(this.report, this), '1.6.5');
	this.flow.addAction('1.6.5', Delegate.create(this.points6, this), '1.8');	
	this.flow.addAction('1.7', Delegate.create(this.letterWrite, this), '1.7.1');
	this.flow.addAction('1.7.1', Delegate.create(this.points4, this), '1.7.2');
	this.flow.addAction('1.7.2', Delegate.create(this.letterAnswer, this), '1.7.3');
	this.flow.addAction('1.7.3', Delegate.create(this.points5, this), '1.8');
	this.flow.addAction('1.8', Delegate.create(this.backToPoorhouse, this), '1.3.5');
	this.flow.addAction('1.9', Delegate.create(this.preRecruitment, this), '2.1');	// FIXME
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
console.log("PlayerStats.poorhouse:", PlayerStats.poorhouse);
	switch(this.id){
		case 'horsens':			
			this.lib = horsensGameLib;
			Clss = this.lib.horsens;
			this.slideLib = horsensSlideLib;			
			// introClss = this.slideLib.slide_horsens;
			manifest = this.lib.properties.manifest;
		break;
		case 'sundby':
			this.lib = sundbyGameLib;
			Clss = this.lib.sundby;
			this.slideLib = sundbySlideLib;			
			// introClss = this.slideLib.slide_sundby;
			manifest = this.lib.properties.manifest;
		break;
		case 'svendborg':	
			this.lib = svendborgGameLib;
			Clss = this.lib.svendborg;
			this.slideLib = svendborgSlideLib;			
			manifest = this.lib.properties.manifest;

		break;
	}
	
	// Load files
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
		self.next();
	};
	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
};
FlowPoorhouse.prototype.next = function(){
	'use strict';
	this.flow.next(this.trigger);	
};
FlowPoorhouse.prototype.onComplete = function(event) {
	'use strict';
	// Set next button active
	this.continueBtn.activate('next');

	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}	
};
FlowPoorhouse.prototype.onContinue = function(event) {
	'use strict';
	this.next();
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
FlowPoorhouse.prototype.intro = function(trigger){
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
	}, self);
	this.playerComponent.preload('slide_'+this.id, this.slideLib);
};
FlowPoorhouse.prototype.points1 = function(trigger) {
	'use strict';

	// Next move
	this.trigger = trigger;
	
	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points1;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('mood', -1);
			PlayerStats.append('health', 1);
			Topbar.pointsUpdate();
		});

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.caretaker = function(trigger) {
	'use strict';

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_1);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.caretaker;

	// New page in
	Transitions.transInAlpha(this.currentPage);
};
FlowPoorhouse.prototype.chooseJob = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.choosework;
	
	// New page in
	Transitions.transInPosition(this.currentPage);

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
	
	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view['bg_1_2'+PlayerStats.job]);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.work;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Get sound
	var sound = SoundService.matrix.work[this.id][PlayerStats.job]; // "svendborg/A"

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);
};
FlowPoorhouse.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points2;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('money', 1);
			Topbar.pointsUpdate();
		});

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_3);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points3;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('money', -2);
			Topbar.pointsUpdate();
		});	

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.getout = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.getout;

	// New page in
	Transitions.transInAlpha(this.currentPage);

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.chooseAdvice = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.chooseadvice;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Desactivate continue button
	this.continueBtn.ghost('next');


	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){
			console.log('checkbox:', vo);

			// Save chosen 'advice'
			PlayerStats.advice = vo.value;

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
FlowPoorhouse.prototype.playAdvice = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	this.continueBtn.activate('skip');

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.getadvice;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Frame according to choice of advice
	this.currentPage.gotoAndStop(PlayerStats.advice); // Frame label could be 'A' or 'B'

	// Get sound
	var sound = SoundService.matrix.work[this.id][PlayerStats.advice]; // "svendborg/A", "svendborg/B"

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);
};
FlowPoorhouse.prototype.chooseWayOut = function(triggers) {
	'use strict';
	var self = this;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.choosewayout;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Desactivate continue button
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
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
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_6);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.drunk;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Get sound
	var sound = SoundService.matrix.drunk;

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);


	this.continueBtn.activate('skip');
};
FlowPoorhouse.prototype.points7 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points7;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('mood', 1);
			Topbar.pointsUpdate();
		});

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.constable = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.constable;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Get sound
	var sound = SoundService.matrix.constable;

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);

	this.continueBtn.activate('skip');
};
FlowPoorhouse.prototype.report = function(trigger) {
	'use strict';
	var self = this;

	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.report;

	// New page in
	Transitions.transInAlpha(this.currentPage);
};
FlowPoorhouse.prototype.points6 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points6;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('mood', -1);
			Topbar.pointsUpdate();
		});

	this.continueBtn.activate('next');
};

// FlowPoorhouse.prototype.runOff = function(triggers) {
// 	'use strict';
// 	var self = this;

// 	// Change background
// 	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_4);

// 	// Previous page out
// 	Transitions.transOutPosition(this.currentPage);

// 	// Set new page out
// 	this.currentPage = this.view.runoff;

// 	// New page in
// 	Transitions.transInPosition(this.currentPage);

// 	// Desactivate continue button
// 	this.continueBtn.ghost('next');

// 	// Checkboxes
// 	var btn1 = new RadioButton(this.currentPage.checkbox1, {value:'A'});
// 	var btn2 = new RadioButton(this.currentPage.checkbox2, {value:'B'});

// 	// Group
// 	var group = new ButtonGroup();
// 	group.add(btn1);
// 	group.add(btn2);

// 	// Checkbox events
// 	this.listeners.groupClick = group.on('click', function(event){

// 		self.trigger = triggers[event.data.value];

// 		// Only first time a checkbox is clicked
// 		if(self.listeners.continueClick == null){
// 			// User may continue
// 			self.continueBtn.activate('next');
// 			self.listeners.continueClick = self.continueBtn.on('click', function(e){
// 				e.remove();
// 				event.remove();
// 				group.destroy();
// 				group = null;
// 				self.listeners.continueClick = null;
// 			});
// 		}
// 	});
// };


FlowPoorhouse.prototype.letterWrite = function(trigger) {
	'use strict';
	var self = this;

	self.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_7);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.letterwrite;

	// New page in
	Transitions.transInAlpha(this.currentPage);

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

	// Group
	// var group = new ButtonGroup();
	// group.add(dropdown1);
	// group.add(dropdown2);
	// group.add(dropdown3);

	// Name
	console.log('FIXME');
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

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.backtopoorhouse;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('mood', -1);
			Topbar.pointsUpdate();
		});

	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.preRecruitment = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_9);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.prerecruitment;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Get sound
	var sound = SoundService.matrix.prerecruitment[this.id]; // "svendborg"

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);


	this.continueBtn.activate('skip');
};
FlowPoorhouse.prototype.recruimentOffice = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_1);

// 	Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.recruitementoffice;

	// New page in
	Transitions.transInAlpha(this.currentPage);

	// Next in flow
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.jobInterviewPart1 = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_2);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.jobinterviewpart1;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Get sound
	var sound = SoundService.matrix.jobinterview[this.id]['part1']; // "svendborg"

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);

	// Next in flow
	this.continueBtn.activate('skip');
};
FlowPoorhouse.prototype.chooseJobGermany = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.choosejob;

	// New page in
	Transitions.transInPosition(this.currentPage);

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

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.jobinterviewpart2;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Get sound
	var sound = SoundService.matrix.jobinterview[this.id]['part2']; // "svendborg"

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);

	// Next in flow
	this.continueBtn.activate('skip');
};
FlowPoorhouse.prototype.points8 = function(trigger){
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points8;

		// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('money', 2);
			PlayerStats.append('mood', 1);
			Topbar.pointsUpdate();
		});

	// Next in flow
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.recruitementLetter = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_3);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.recruitementletter;

	// New page in
	Transitions.transInAlpha(this.currentPage);

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

	// Next in flow
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points9 = function(trigger){
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points9;

		// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('money', -1);
			PlayerStats.append('mood', -1);
			Topbar.pointsUpdate();
		});

	// Next in flow
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
		['../assets/logic/games/germany1.js', '../assets/logic/slides/slide_germany1_traveling.js'], 
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
	this.flow.addAction('2.6.2', Delegate.create(this.points1, this), '2.7.1');
	this.flow.addAction('2.7.1', Delegate.create(this.work, this), '2.7.2');
	this.flow.addAction('2.7.2', Delegate.create(this.points2, this), '2.7.3');
	this.flow.addAction('2.7.3', Delegate.create(this.points3, this), '2.8');
	this.flow.addAction('2.8', Delegate.create(this.chooseSpending, this), '2.9.1');
	this.flow.addAction('2.9.1', Delegate.create(this.spending, this), '2.9.2');
	this.flow.addAction('2.9.2', Delegate.create(this.points4, this), '2.10.1');
	this.flow.addAction('2.10.1', Delegate.create(this.whatNow, this), '2.10.2');
	this.flow.addAction('2.10.2', Delegate.create(this.chooseWhatNow, this), '2.11.1');
	this.flow.addAction('2.11.1', Delegate.create(this.homeComming, this), '2.11.2');
	this.flow.addAction('2.11.2', Delegate.create(this.points5, this), '3.0');

	// this.flow.addAction('', function(){
	// 	self.removeEvents();
	// 	this.dispatchEvent(new createjs.Event('continue'));
	// });
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
	this.slideLib = germany1SlideLib;	
	this.playerComponent = new PlayerSliderComponent(this.currentPage.player);
	this.listeners.complete = self.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload('slide_germany1_traveling', this.slideLib);

	this.continueBtn.activate('skip');
};
FlowGermany1.prototype.dormitry = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_6);
	// Set portrait (NB. In background!)
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentBackground.portrait.gotoAndStop(frm);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.dormitry;

	// New page in
	Transitions.transInAlpha(this.currentPage);

	this.continueBtn.activate('skip');

	// Get sound
	var sound = SoundService.matrix.dormitry;

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);
};
FlowGermany1.prototype.points1 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points1;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('mood', 1);
			PlayerStats.append('health', -1);
			Topbar.pointsUpdate();
		});	

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
				slidePath = '../assets/logic/slides/slide_work_amory.js';
				slideName = 'slide_work_amory';
			break;
			case 'B':
				slidePath = '../assets/logic/slides/slide_work_mine.js';
				slideName = 'slide_work_mine';
			break;
			case 'C':
				slidePath = '../assets/logic/slides/slide_work_butcher.js';
				slideName = 'slide_work_butcher';
			break;
		}
	}catch(err){
		console.log(err);
	}	

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, bg);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.work;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Ghost continue button
	self.continueBtn.ghost('skip');

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
};
FlowGermany1.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points2;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('money', 2);
			Topbar.pointsUpdate();
		});	

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points3;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('money', -1);
			Topbar.pointsUpdate();
		});	

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.chooseSpending = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_8);

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.choosespending;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Desactivate continue button
	this.continueBtn.ghost('next');


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

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = page;

	// New page in
	Transitions.transInPosition(this.currentPage);

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

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = page;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
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
		});	

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.whatNow = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_10);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.whatnow;

	// New page in
	Transitions.transInAlpha(this.currentPage);

	this.continueBtn.activate('skip');

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);


	// Get sound
	var sound = SoundService.matrix.whatnow[PlayerStats.spending];

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);
	this.listeners.complete = this.playerComponent.on('complete', function(event){
		self.continueBtn.activate('next');
	}, self);
	this.playerComponent.preload(sound.src, sound.duration);
};
FlowGermany1.prototype.chooseWhatNow = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.choosewhatnow;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Desactivate continue button
	this.continueBtn.ghost('next');


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
};
FlowGermany1.prototype.homeComming = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Get 'whot now' related assets
	var slidePath, slideName;
	try{		
		slidePath = '../assets/logic/slides/slide_home1'+PlayerStats.whatnow+'.js';
		slideName = 'slide_home1'+PlayerStats.whatnow;
	}catch(err){
		console.log(err);
	}	

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_11);

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.work;

	// New page in
	Transitions.transInPosition(this.currentPage);

	// Ghost continue button
	self.continueBtn.ghost('skip');

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

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = page;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			switch(PlayerStats.whatnow){
				case 'A':
					PlayerStats.append('money', 1);
				break;
				case 'B':
					PlayerStats.append('money', -1);
				break;
			}			
			Topbar.pointsUpdate();
		});	

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

	createjs.Tween.get(this.currentPage)
		.to({x:0}, 300, createjs.Ease.linear);
};
FlowCharacter.prototype.challenge = function(){
	this.continueBtn.ghost("next");

	this.currentPage = this.view.character_challenge;

	createjs.Tween.get(this.currentPage)
		.to({x:0}, 300, createjs.Ease.linear);

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

	createjs.Tween.get(this.currentPage)
		.to({x:0}, 300, createjs.Ease.linear);

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

	createjs.Tween.get(this.currentPage)
		.to({x:0}, 300, createjs.Ease.linear);

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
	}
}
var Transitions = {
	transInPosition: function(pageView, callback){
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
	// load: function(url, delegate, location){
	// 	'use strict';

	// 	//url is URL of external file, code is the code
	//     //to be called from the file, location is the location to 
	//     //insert the <script> element

	//     if(location == null)
	//     	location = document.body;

	//     var scriptTag = document.createElement('script');	    

	//     scriptTag.onload = delegate;
	//     scriptTag.onreadystatechange = delegate;

	//     scriptTag.src = url;
	//     location.appendChild(scriptTag);

	// },
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
	dormitry: { src:SoundService.properties.basePath+'dormitry.mp3', duration: 1.078 },
	drunk: { src:SoundService.properties.basePath+'drunk.mp3', duration: 1.078 },
	constable: { src:SoundService.properties.basePath+'constable.mp3', duration: 1.815 },
	whatnow: {
		'A': { src:SoundService.properties.basePath+'whatnow_A.mp3', duration: 8.314 },
		'B': { src:SoundService.properties.basePath+'whatnow_B.mp3', duration: 1.078 },
		'C': { src:SoundService.properties.basePath+'whatnow_C.mp3', duration: 1.815 }
	},
	jobinterview: {
		'svendborg': { 
			'part1': { src:SoundService.properties.basePath+'jobinterview_svendborg_part_1.mp3', duration: 1.078 },
			'part2': { src:SoundService.properties.basePath+'jobinterview_svendborg_part_2.mp3', duration: 1.815 }
		}
	},
	prerecruitment: {
		'svendborg': { src:SoundService.properties.basePath+'prerecruitment_svendborg.mp3', duration: 1.078 }
	},
	advice: {
		'svendborg': {
			'A': { src:SoundService.properties.basePath+'advice_svendborg_A.mp3', duration: 8.314 },
			'B': { src:SoundService.properties.basePath+'advice_svendborg_B.mp3', duration: 1.078 }
		},
	},
	work: {
		'svendborg': {
			'A': { src:SoundService.properties.basePath+'work_svendborg_A.mp3', duration: 8.314 },
			'B': { src:SoundService.properties.basePath+'work_svendborg_B.mp3', duration: 1.078 },
			'C': { src:SoundService.properties.basePath+'work_svendborg_C.mp3', duration: 1.815 }
		},
	},
	slides: {
				'slide_intro': { src:SoundService.properties.basePath+'slide_intro.mp3', duration: 89.014 },
				'slide_svendborg': { src:SoundService.properties.basePath+'Fattiggaarden_Svendborg.mp3', duration: 48.573 },
				'slide_germany1_traveling': { src:SoundService.properties.basePath+'slide_germany1_traveling.mp3', duration: 48.573 },
				'slide_work_amory': { src:SoundService.properties.basePath+'slide_work_amory.mp3', duration: 48.573 },
				'slide_work_butcher': { src:SoundService.properties.basePath+'slide_work_butcher.mp3', duration: 48.573 },
				'slide_work_mine': { src:SoundService.properties.basePath+'slide_work_mine.mp3', duration: 48.573 },
				'slide_home1A': { src:SoundService.properties.basePath+'slide_home1_A.mp3', duration: 48.573 },
				'slide_home1B': { src:SoundService.properties.basePath+'slide_home1_B.mp3', duration: 48.573 }
				// 'slide_svendborg': { src:SoundService.properties.basePath+'daughter.mp3', duration: 2.368 }
			},
	challenge: {
				'A': { label: 'manager', src:SoundService.properties.basePath+'alcoholic.mp3', duration: 8.314 },
				'B': { label: 'manager', src:SoundService.properties.basePath+'lazy.mp3', duration: 1.078 },
				'C': { label: 'manager', src:SoundService.properties.basePath+'weakness.mp3', duration: 1.815 }
			},
	family: {
				'D': null,
				'E': { label: 'daughter', src:SoundService.properties.basePath+'daughter.mp3', duration: 2.368 },
				'F': null
			}
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

	set: function(type, val){		
		this[type] = val;

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
		this[type] += val;

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
	gotoPage: function(page){
		'use strict';
		// console.log("page:", page);
		if(this.currentPage !== null){
			this.currentPage.destroy();
			this.currentPage = null;
		}
		var self = this;
		this.root.gotoAndStop('character_build'); // TEST
		switch(page){
			case '0.0':
				// Go to start frame
				this.root.gotoAndStop('start');
				this.currentPage = new PageStart(this.root.pageStart);
				this.currentPage.start(); 

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.1');
				}, this);
			break;
			case '0.1':
				this.root.gotoAndStop('character_build');				
				this.root.page_intro.x = 0;				
				this.currentPage = new PageIntro(this.root.page_intro, 'intro'); 
				this.currentPage.start(); 

				// Topbar
				Topbar.go('intro');

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.2');
				}, this);
			break;
			case '0.2':				
				// this.root.gotoAndStop('character');
				this.root.page_intro.x = 1024;
				this.root.page_character.x = 0;
				this.currentPage = new FlowCharacter(this.root.page_character); // Id references to flow id '0.1'
				this.currentPage.start(); 

				
				// createjs.Tween.get(this.root.page_character)
				// 	.to({x:0}, 300, createjs.Ease.linear);

				// Topbar
				Topbar.go('character');

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.3');
				}, this);
			break;
			case '0.3':
				createjs.Tween.get(this.root.page_character)
						.to({x:-1024}, 300, createjs.Ease.linear);

				this.currentPage = new PageCard(this.root.page_card); // Id references to flow id '0.1'
				this.currentPage.start(); 

				this.root.page_card.x = 0;
				// createjs.Tween.get(this.root.page_card)
				// 		.to({x:0}, 300, createjs.Ease.linear);

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.4');
				}, this);
			break;
			case '0.4':
				createjs.Tween.get(this.root.page_card)
						.to({x:-1024}, 300, createjs.Ease.linear);

				this.currentPage = new PageOpinion(this.root.page_opinion); // Id references to flow id '0.1'
				this.currentPage.start(); 

				this.root.page_opinion.x = 0;

				// createjs.Tween.get(this.root.page_opinion)
				// 		.to({x:0}, 300, createjs.Ease.linear);

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.5');
				}, this);
			break;
			case '0.5':
				createjs.Tween.get(this.root.page_opinion)
						.to({x:-1024}, 300, createjs.Ease.linear);

				this.currentPage = new PageMap(this.root.page_map); // Id references to flow id '0.1'
				this.currentPage.start(); 

				this.root.page_map.x = 0;

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					// From here it a spereate flow related to chosen poorhouse New page LOADS new content
					self.gotoPage('1.0');
				}, this);
			break;
			case '1.0':
				// createjs.Tween.get(this.root.page_map)
				// 		.to({x:-1024}, 300, createjs.Ease.linear);
				this.root.page_map.x = -1024;

				// Root frame
				this.root.gotoAndStop('poorhouse');

				// Topbar
				Topbar.go('game');

				this.currentPage = new FlowPoorhouse(this.root.poorhouse_container); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('2.5');
				}, this);
			break;
			case '2.5':
				// Root frame
				this.root.gotoAndStop('germany');

				// Topbar
				Topbar.go('game');

				this.currentPage = new FlowGermany1(this.root.germany_container); 
				this.currentPage.start(); 				

				// Button to next page
				// this.currentPage.on('continue', function(event){
				// 	event.remove();
				// 	// self.gotoPage('1.0.2');
				// }, this);
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
		createjs.Tween.get(root.blocker_black)
         .to({alpha: 0}, 600, createjs.Ease.linear)
         .call(function(){
         	root.blocker_black.visible = false;
         });

		// Go to start
		FlowManager.gotoPage('0.0');
		// FlowManager.gotoPage('0.4');
		// FlowManager.gotoPage('2.5');
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};
/**
	Controller uses the browser's AUDIO element as play back for sound
*/
function SoundController(audioPath, duration) {
	'use strict';

	var self = this;
	
	this.sndObj = document.createElement('AUDIO');		
	this.sndObj.src = audioPath;
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
	},
	update: function(){
		this.view.mood.points.gotoAndStop(PlayerStats.mood-1);
		this.view.health.points.gotoAndStop(PlayerStats.health-1);
		this.view.money.points.gotoAndStop(PlayerStats.money-1);
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
		{src:"../assets/images/main/_0_0Frontpage.jpg", id:"_0_0Frontpage"},
		{src:"../assets/images/main/_0_1BG.jpg", id:"_0_1BG"},
		{src:"../assets/images/main/_0_2BG.jpg", id:"_0_2BG"},
		{src:"../assets/images/main/_0_3BG.jpg", id:"_0_3BG"},
		{src:"../assets/images/main/_0_4BG.jpg", id:"_0_4BG"},
		{src:"../assets/images/main/_0_5BG.jpg", id:"_0_5BG"},
		{src:"../assets/images/main/ADCloseUp.png", id:"ADCloseUp"},
		{src:"../assets/images/main/AECloseUp.png", id:"AECloseUp"},
		{src:"../assets/images/main/AFCloseUp.png", id:"AFCloseUp"},
		{src:"../assets/images/main/BDCloseUp.png", id:"BDCloseUp"},
		{src:"../assets/images/main/BECloseUp.png", id:"BECloseUp"},
		{src:"../assets/images/main/BFCloseUp.png", id:"BFCloseUp"},
		{src:"../assets/images/main/CDCloseUp.png", id:"CDCloseUp"},
		{src:"../assets/images/main/CECloseUp.png", id:"CECloseUp"},
		{src:"../assets/images/main/CFCloseUp.png", id:"CFCloseUp"},
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
		{src:"../assets/images/main/PersonCardAD.png", id:"PersonCardAD"},
		{src:"../assets/images/main/PersonCardAE.png", id:"PersonCardAE"},
		{src:"../assets/images/main/PersonCardAF.png", id:"PersonCardAF"},
		{src:"../assets/images/main/PersonCardBD.png", id:"PersonCardBD"},
		{src:"../assets/images/main/PersonCardBE.png", id:"PersonCardBE"},
		{src:"../assets/images/main/PersonCardBF.png", id:"PersonCardBF"},
		{src:"../assets/images/main/PersonCardCD.png", id:"PersonCardCD"},
		{src:"../assets/images/main/PersonCardCE.png", id:"PersonCardCE"},
		{src:"../assets/images/main/PersonCardCF.png", id:"PersonCardCF"},
		{src:"../assets/images/main/PointBG.png", id:"PointBG"},
		{src:"../assets/images/main/TopBG.jpg", id:"TopBG"},
		{src:"../assets/images/main/TopCard.png", id:"TopCard"}
	]
};



// symbols:



(lib._0_0Frontpage = function() {
	this.initialize(img._0_0Frontpage);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


(lib._0_1BG = function() {
	this.initialize(img._0_1BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._0_2BG = function() {
	this.initialize(img._0_2BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._0_3BG = function() {
	this.initialize(img._0_3BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._0_4BG = function() {
	this.initialize(img._0_4BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._0_5BG = function() {
	this.initialize(img._0_5BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.ADCloseUp = function() {
	this.initialize(img.ADCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.AECloseUp = function() {
	this.initialize(img.AECloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.AFCloseUp = function() {
	this.initialize(img.AFCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.BDCloseUp = function() {
	this.initialize(img.BDCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.BECloseUp = function() {
	this.initialize(img.BECloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.BFCloseUp = function() {
	this.initialize(img.BFCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.CDCloseUp = function() {
	this.initialize(img.CDCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.CECloseUp = function() {
	this.initialize(img.CECloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.CFCloseUp = function() {
	this.initialize(img.CFCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


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


(lib.PersonCardAD = function() {
	this.initialize(img.PersonCardAD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardAE = function() {
	this.initialize(img.PersonCardAE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardAF = function() {
	this.initialize(img.PersonCardAF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardBD = function() {
	this.initialize(img.PersonCardBD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardBE = function() {
	this.initialize(img.PersonCardBE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardBF = function() {
	this.initialize(img.PersonCardBF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardCD = function() {
	this.initialize(img.PersonCardCD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardCE = function() {
	this.initialize(img.PersonCardCE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardCF = function() {
	this.initialize(img.PersonCardCF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


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


(lib.ProgressionBar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Egl4AAxIAAhiMBLxAAAIAABig");
	this.shape.setTransform(242.5,5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,485,10);


(lib.OpenionCloseups = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// Content
	this.instance = new lib.ADCloseUp();

	this.instance_1 = new lib.AECloseUp();

	this.instance_2 = new lib.AFCloseUp();

	this.instance_3 = new lib.BDCloseUp();

	this.instance_4 = new lib.BECloseUp();

	this.instance_5 = new lib.BFCloseUp();

	this.instance_6 = new lib.CDCloseUp();

	this.instance_7 = new lib.CECloseUp();

	this.instance_8 = new lib.CFCloseUp();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


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


(lib.CharacterIntro = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("I dette spil, skal du spille en af de mange fattige og udsatte i Danmark under besættelsen.\n\nNår spillet starter er du både arbejdsløs og hjemløs, men måske er der en vej ud\nfor netop dig, hvis du tør tage valget  mellem fattiggård eller fjendeland.\n\nMen først skal du være med til at bestemme hvem du er...", "24px 'Special Elite'", "#D9D1B4");
	this.text.lineHeight = 26;
	this.text.lineWidth = 594;
	this.text.setTransform(212,132);

	this.addChild(this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(212,132,597.6,379.2);


(lib.CharacterCardPortrait = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(15));

	// Layer 1
	this.instance = new lib.PersonCardAD();

	this.instance_1 = new lib.PersonCardAE();

	this.instance_2 = new lib.PersonCardAF();

	this.instance_3 = new lib.PersonCardBD();

	this.instance_4 = new lib.PersonCardBE();

	this.instance_5 = new lib.PersonCardBF();

	this.instance_6 = new lib.PersonCardCD();

	this.instance_7 = new lib.PersonCardCE();

	this.instance_8 = new lib.PersonCardCF();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(7));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.CharacterCardNickame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(14));

	// Nickname
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AubCmIgCgBIgFgEIgFgGIgDgHIgBgHIABgKIgDgOIABgKIgCgHIACgEIgBgHIAAgDIAAgDIABgDIACgCQADAAACAEIAGAHIAEAIIACAHIgBABIgBABIABADIABADIAAAHIACAFIADADIABABIAGAAIAHAIIAIAGIAbACIAJgCIAIgEIAGgEIAGgGIALgHIAEgFIAHgIIABgFIAAgBIgCgSQgBgEgCgCIgEgEIgLgGQgDgDgDgBIgPAAQgEAAgDgCIgBgBIgGACIgWgEIgDABIgJgEQgIgEgIgCIgFgIIgGgEIgGgMIgEgOIAAgGQABgDACgDIABAAIABAAIgBgBIgCgBIAAgBIABAAIADgHIAEgGIAQgRIAIAAIADgBIABgCIABgBIADgBIAEAAIApgCIAKABIAEgBIADgFIADgBIANAEIAAADIABAFIACAFIADAJIgBAHIADAFIgCAFIACANIAAAJIgBAFQgBAAAAABQAAAAAAAAQgBAAAAAAQgBABAAAAIgFgBIgGgIIgDgKIgNgQIgDgDIgCgBIgMgCIgLgDIgGAAIgIACIgJAEIgQAJQgEAGABAJQAAAGACAEIAFAHIAGAEIAHAFIAIADIAIAAIAKgBIAUAEIAKgBIAEAAIAPAHIAEADIADADIADAEIAKAJIABAFIABACIACABIABAEIgBAgIgCgCIgDAAIgDABIgBADQAAAAAAAAQAAABAAAAQAAAAABABQAAAAABAAIADAAIACAAIAAAEIgFAHIgDADIgCADIgBADIgDADIgDABIgCgBIgCAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAIAAADIAAACIgDADIgkAOIgMACIgJAAIgTgFIgJgBIgFABIgFACIgBACIgCACIgCAAgArJCbIgEgCIgEgCIgBgCIgDgKIgCgDQgDAAgCgBIgDgDIgCgGIgCgJIgEgGIgBgEIgBgZIABgEIADgGIAAgCIAAgDIgCgDIABgDIACgDIAAgMIAAgFQgEgDgEAAIgQgBQgEgBgDgCIgEgEQgCgDgDAAIgDgCIgCgEQAAgDACgCIAFgEIALgFIAFgCIAFAAIAGgBIAEgEIABgDIAAgGIgCgSIABgKQABgFAEgEIACgCIACgCIACgCIADgBIABAAIACABIAEAEIABAEIABAGIADARIgCALIACAEIACADIAEAEIAGACIApABIANAEQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAEgBACIgEADIgGACIgWABIgNACQgGABgEAEQgEADgCAGQgCAFABAHIAEAoIAKAbQACAFADADQAEADAGgBIANgDIAGgDQADgDgBgDIgDgKIABgEIAFgFIADgCIAGgFQAEgDAEAAIAGAAIAFACIABAGIgBAJIgGAZQAAAHgEAGQgEAFgFADQgFADgHACIgpAHgAoeCVIgHgCIgOgCIgLgJIgRgIQgEgCgDgEIgLgOIgFgIIgCgIIAAgFIACgMIAAgHIAAgBIgBgCIgBgBIgBAAIAAgEIADgLIABgDIACgCIABgCIgBgFIAAgCIACAAIABgBIABgCIAFgJIADgEIASgOIAggHIAMgBIAIABIAUADIAIAEIAAAAIgBAJIAAABIAJgCQAAAAABABQAAAAAAABQAAAAABAAQAAABABAAIADACIAEACIALATIAEAKIgBAKIgEAGIgBAEIAAACIACABIABAAIABgBIgCgFIAAgBIAAgBIACABIACADIACACIAAAAIAAACIAAAFIgBADIgCACIAAABIACAGIAAACIgCAAIgCAAIABAQIgCACIgBABIgBACIgBAEIgKAIIgEACIgBAAIAAAEIAAADIgDABIgOAMIgFACIgJgCIgEABIgGADIgDABIgCAAQgDAAgDgCgAo7AcQgGAFgGAGQgFAGgCAIQgDAHABAIIACAQIACAJQABADADACIAAAEIACAAIACAAIABABIACAAQACAGADADIAOAIIAHAFIADAAIACgBIASAAQAFAAAEgDIAGgGIADgFIADgDIAIgHIABgBIADgCIACgDIABgCIgCgFIAAgEIACgEIACgDIADgCIAHACIAAgCQAAgBgBAAQAAgBAAAAQAAAAgBAAQAAAAAAAAIgIgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBIAAgBIgCgIIgLggIgCABIgEgBIgFgCIgGgCIggAAQgIAAgIAEgAH2CLIgJgEIgJgBIgDgDIgLgPQgCgEAAgFQgBgIADgHQADgHAEgGIgBgIIgGgRIgCgJIABgFIADgFIAAgDIACgDIAFgEIAEgHIACgFIgCgDIgHgHIgCgDIABgMIABgFIAAgHIAAgBIgBgCIADgFIACgCIAAgCIgCgFIAAgBIAHgIIAOgKIABABIACAAIADAAIAEgDIALgEIAZABIAGADIAGAHIAKgIIACgEIADABIACgBIADgCIAEgCIAFgBIAUABIACAGIAFAMIACAHQAAACgDACIgFAGIgHAFIgGABIgBABIgBgBIABgDIABgDIgCAAIgBgBIgEACIgCADIAAAFIAAAKIABAFIgBAGQAAADgDADIgDAEIgGAMIgHAJIgCACIAAABIgBAAIgHABIgPAGIgIABIgXgBIgHACIgGADIgGAFIgBAHIABAEIACAEIAEADIAEAAIAJgDIAGACIAAgBIACgBIACABIACABIACgCIACgBIAEABIAGACIADABIACgBIABgCIACgCIAEAAIAGAAIAIgDIAJADIAGAAIAWAGIADACIACACIACACIAEADIAFABIADADIACAEIADAOQABAFgDAFIgHAKIgIAIQgEADgCAAIgIACIgQAHIglAHIgTABgAIIBOIgMAFIgGABIgEACIgJAKIgBAFIACAIIAEAGIAGAEIAJABIADAAIADACQAFAEAHAAIAMgBIAHgCIAHgDIAIAAIAHgCIADgDIAFgBIAJAAIAFgBIAEgEIABgEIABgFIAAgBQABAAAAgBQABAAAAAAQABAAAAgBQAAAAAAgBIABgEQgBgFgCgCIgGgDIgfgGQgIgCgIABIgBAAIgDgCIgCABIgCABIgCABIgCACIgDgBIgDgBgAIBgrIgCACIgBACIgCABIgCABIgBAAIgDAFIgFAPIAAAFIABADIANATIABACIAFADIAFABIAJgCIAGABQAFAAAFgEIAJgIIAFgJQADgGAAgEIgCgHIgEgHIgFgHIgGgDIgRgFIgDAAIgBABIgBABIgCAAIgHgBgAI3g0IgBADIACAAIACACIABABIACABIADgBIAAgBQAAgBAAgBQAAAAAAgBQgBAAAAAAQgBgBAAAAIgFgBgAm1CJIgDgCIgBgDIABgDIADgFIADgDIADgBIAJAAIAIgCIAHgEIAFgGQACgEgBgEIgBgIIABgPIgGg3IgDgHQgCgDgDAAIgTACIgGgBIgFgDQgCgCgBgDIABgFIACgDIAEgCIAhgDIANABQACABACACIAGAHQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAIADgBIAEgEIADAAIAGgCIAKgHIARgEIAFgCIAEgDIAJABIALAEIAJAGQADADACAEIABAEIAGAKIABAFIgBAFIgCAEIgDADIgBAFIgDAAIgRACQgEAAgCgCIgFgGIgDgHIgBgIIABgIIgCAAIgDABIgBACIgGgCIgFACIgGAEIgFAFQgCACAAADIgLAFIgDAEIgDALIgHAMQgCADABAEIAEAVIAAAOQAAAEACADIAEADIAGACIAOgBIAGgBIABADIAAACIAAAEIAAACIAEgBIACgDIACAAIABACIgBABIgBACIgBACIAAACIABABIAAABIgCACIgDAAIgDAAIgGgDIgCgBIgCABIgCABIgCABIgBABIABACIABACIgBACIgBAAIgCABIgCAAIgYgBIgKADIgCAAIgCgCIgCgBIgCgBIgVAFgAkBCCIgCgDIgBgGQgBgEADgCIALgMQACgCAAgDIAAgDIAAgCIAAgCIABgDIgFgaIgBgpIgBgHIgDgFIgDgDIgLgGQgCAAgBgCQAAgBAAgBQAAgBABAAQAAgBAAAAQAAgBABAAIAHgDIACgDIABgBIACgBIAHABIAOAFIAGAAQADAAAEgCIAQgKQAFgCAGAAIAGAAIAFADIAJAIIAHgHIAKgFIAKgDIAKgBIAHACIAFAFIAEAHIAJAUIABABIAAACIAAAEIgCAHIgBAEIACAIIgBAJIADAKIAAAFIgEAMIABACIAAABIAHAOIAFAFIANALQACACAAAEIgBAHIgBAEIgDACIgDAAIgDgBIgUADIgFAAIgJgDIgFAAQgDgBgBgCQgCgCgBgDQAAgEACgEIAEgFIAEgIQACgEAAgIIgHhDIgCgFIgEgEQgBgCgEABIgHAFIgFAFIgDANIgDAhIACAWIAAAOIABACIAFACIAHAHIACADQAAAFgCACQgEADgEABIgCgBIgBAAIgMAFIgSgCIgCgBIgDgFIgBgDIABgEIADgDIADgCIAEgDIACgFIABgJIgFgRIABgPIgDgKIACgHIAAgCIgDgMIABgLIgBgDIgDgCIgDgCIgDAAIgEABIgFADIgHAHIgBAFIgCACIgDABIgCACIgBABIACACIABABIACAGIAAAFIgCAJIABATIAAADIACABIABABIABADIACAMIAAAMIABAFIACACIAHACIADABIAAAFQABADgCACIgEADIgTAFIgYACgAg/BzIgGgDIgEgFIgBgGQAAgEABgCQACgDAEgBIAEADIABgBIABgCIABgCIACgBQAEgBADgCIADgFIACgIIABgHIgDgLIACgRIgDgbIAAgTIgBgDIgDgGIAAgDIABgMIgDgMIABgLQgBgFgCgCQgDgDgDgBIgPgCIgGgCQgCgBAAgEQgBgEACgDIAEgFIAOgDIAXAFIAEABIABABIACAIIAEAeIgCAPIAEAVIAEAoIACABIABgBQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAIAEgEIADgFIAEgDQAEgCACgDIAGgLIAGgDQADgCAAgEIgBgEIgDgIIgBgEIABgCIABAAIAAAAIABAAIABgBIgBgCIABgDIACgBIANACIAEgBIAJgEIAEgBIAQACIAQgEIACAAIADABIACACIABACIgBABIgBABIABACIADAEIACACQAAACgEACIgIAEIgPAEIgEgBIgEgBIgFACIgIAFIgPAOIgFAHIgCAFIgBAJIABAEIADACIAFACIAfApIACAGIAAABIAOgDIAUAAIAAACIABAFIAFAGIABADIAAADIgCABIgCACIAAACIAAABIgLADIgMABIgBAAIgDgBIgBgBIgBgCIgMAEIgCAEIgTgDIgHgBIgFgDQAAgBgBAAQAAgBAAgBQgBAAAAgBQAAAAAAgBIAAgCIABgHIACgCIAHABIAAgCIAAgBIgCgBIgEAAIACgFIAAgFIgBgGIgCgGIgEgGIgFgDIgCgEIgEgEIgDgCIgEgBIgFADIgIAHIgJAMIACAGIgEAJQAAAAABABQAAAAAAABQAAAAABAAQAAABABAAIAEACIAKABIACACIAFAGIABADIgBACIgBAAIgCABIgBABIABACIg2AKgAB3BnIgDgCIgCgDIABgDIADgFIAEgDIACgBIARgCIAHgEIAFgGQACgEAAgEIgBgIIAAgQIgFg0IgDgHQgDgEgDABIgTACIgFgBIgGgDQgCgCAAgDIABgGIACgEIAEgCIAggDIANABQADABABACIAGAJQABABAAAAQABAAAAAAQABABAAAAQABAAABAAIADgBIAEgEIADgCIAGgCIAKgHIAGgCIAKgCIAJgFIAKABIAKAEIAJAGQAEADABAFIACAFIAFAKIABAFIAAAFIgDAEIgCADIgCADIgDAAIgQACQgEAAgDgDIgEgDIgDgHIgBgIIABgIIgCAAIgDABIgCACIgFgCIgFACIgHAEIgEAFQgDACAAADIgKAFIgDADIgEAKIgGAMQgCADAAAEIAFAVIgBAOQABAEABADIAEADIAHACIANgBIAHgBIABADIAAACIgBAEIABACIADgBIACgEIACABIABACIAAABIgBACIgBACIAAABIAAACIABABIgCACIgDAAIgEgBIgFgCIgDgBIgBAAIgDACIgCABIgBABIABACIABACIAAACIgCAAIgCABIgCAAIgXgBIgKADIgDAAIgCgCIgBgCIgCAAIgGABIgKADIgGABgAFqBeIgIgCIgNgDIgLgJIgSgIQgDgCgEgEIgLgNIgEgIIgCgIIAAgGIACgLIAAgHIgBgCIgBgBIgBgBIgBgBIABgEIACgIIACgDIACgCIAAgCIgBgFIABgCIABgBIACAAIABgCIAEgJIAEgEIARgPIAggIIAMgBIAJAAIATAGIAIAEIAAAAIgBAJIAAABIAJgCQAAAAABABQAAAAAAABQAAAAABAAQAAAAABABIADABIAEADIAJAPIACAEIAEAKIgBAHIgEAHIgBADIAAACIACACIABgBIABgBIgCgEIAAgBIAAgBIACABIACACIACACIAAABIAAABIAAAFIgBADIgCACIAAABIACAHIAAABIgCAAIgCABIABAQIgCABIgBABIgBADIgBADIgKAIIgEACIgBAAIAAAFIAAADIgDABIgOALIgFACIgJgBIgEABIgFADIgEABQgEAAgDgCgAFNgZQgHAEgFAHQgFAGgDAHQgCAGAAAIIACAQIADAIQABAEADABIAAAEIABABIACAAIACAAIABABQACAFAEADIAOAIIAHAGIAFgBIASAAQAFAAAEgDIAGgHIACgEIALgKIABgCIADgBIACgDIABgCIgCgGIAAgDIACgEIACgDIADgCIAEABIADABIAAgCQAAgBgBAAQAAgBAAAAQAAAAgBgBQAAAAAAAAIgIAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQAAAAAAAAIAAgCIgCgHIgLgeIgCABIgEgBIgKgEIghgBQgIABgHAEgAK7BFIgKAAIgHgFIgDgBQgKgEgGgFIgLgMQgFgHgDgHIgGgRIgCgLQgBgHAEgIIgCgHIABgIIADgLIAFgLQADgEADgCIACgBIAAgDIACgDIADgCIAagMIAWgEIAGABIASAHIAIACIAGAFIAHAEIAFAFQADADAAAEIAAABIAAABIAAgBIABACIACACIAAADIABACIAHAFIgCAEIADAKIAAALQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAIgHAFIgCACQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDABIgZgCIgwACIgUAFIgFADIAAACQABAGAEAHQAFAIAGAFQAHAGAJADQAIAEAJgBIAJAAIAKACIAHgFIARgSIADgCIAKgCIADAAIAHABIABAGIgBAHIgDAFIgNAMIgKAEIgEAEIgIAEIggAGgAK2g7IAAACIgBAAIgLAEIgLAKIgHADIgCACIgDAHQgCAEABADQAAABAAAAQAAAAAAABQABAAAAAAQAAABABAAIAFADIANADIAKAAIAWgEIAcAAIALgDIABgEIgFgYIgBACIgBABIgEgBIgDgCIgTgHIgKgCIgLAAIgBAAIgBAAgAMpA9IgEgDIgDgHIACgFIACgDIAEgCIALgCIAEgCIACgHIAAgPIgCgIIAAgBIAAgDIACgDIABgCIgDgKIABgIIgBgDIgBgDIABgHIgEgOQgBgFgCgCIgGgDIgNgEIgFgEQgCgDAAgFQgBgEADgCIAFgDIAHgCIAGgBIARACIAEABIAGAGIABAEIABADIAEAJIACABIABgCIAAgCIACgCIAIgHIADgCIABgCIABgDIABgBIADgBIAAAAIAEgCIADgDIAGgDIAKgCIAVAAIAKAEIAIAHIAHAJIACAEIABALIAEAIIABAEIAAAUIgCAPIADAHIgBAIIADAIIgBACIgBABIgBACIAAACIABAEIADAEIAEADIAFABIAGgCIAEABIADAEIACAFIABAEIgBADIgCACIgDACIgEAAIgJAAIgGACIgIACIgBAAIgCgBIgKADIgQgCQgHAAgEgEQgEgFAAgGQAEgDAFgCIAVgCIgGgpIADgfIgBgFIgEgHIgBgEIgCgFIgDgEIgFgCIgKgBIgFABIgNAEIgFADIgBACIgFAGIgCABIgDAAIgCACIAAACIgCADIgBACIgCABIgBAAIgBAAIgBAAIAAABIAAAEIgCABIgBAAIgBABIAAADIAAADIgDAFIgBAEIACALIAAADIgBADIgBAAIAAACIAAAEIAEAHIABADIAAALIABAFIADACIAIACIAEACIAEAEIABAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABIABAEIgBAIQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAgBABIgJACIgPACIgXABgAOqATIAAACIgCACIgBACIABACIACABIABgCIABgCIACgCIAAgDIgBgBIgBgBIgCACgAM/gHIAAABIADACIADABIADABIACACIACgEIgCgFIgCgCIgCgBIgGACIAAAAgAOkgJIAAADIAAADQABAAAAAAQAAAAAAABQABAAAAAAQABAAAAAAIACAAIABgEIAAAAIgBgDIgDgCQgBAAAAAAQAAAAAAABQgBAAAAAAQAAABAAAAgAwQAjIgDgFIgCgGIAAgEIgBgCIgBgCIAAgEIABgBIABgBIAAgCIgCgCIgDgBIgBgBIAAgEIgDgKIgCgJIAAgLIACgEIAFgCIALgBIAEABIAEAEIACAJIAAAcIgCAOIAAAKIgCAFIgDADQgCAAgDgCgAvjAhIgEgDIgCgFIgBgIIAAAAIgIgqIABgFIADgFIAFgEIAGgBQAEAAAEABQACACABAFIACALIgBAQIAAABIgBABIgBAAIgBABIgBABIAAABIgBABIgBACIABAAIACABIABAAIABABIADAUIgCAFQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAABIgEACgAPmhYIgDgFIgCgGIAAgEIgBgCIgBgCIAAgEIABgBIABgBIAAgCIgCgCIgDgBIgBAAIAAgHIgFgTIAAgLIACgEIAFgCIALgBIAEABIAEAEIACAJIAAAeIgCAOIAAAKIgCAFIgDADIgFgCgAQThaIgEgDIgCgFIgBgIIAAAAIgIgrIABgGIADgFIAFgEIAGgBQAEAAAEACQACABABAFIACALIgBAQIAAABIgBABIgBAAIgBABIgBACIAAABIgBACIgBACIABAAIACABIABABIABABIADATIgCAFQAAAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAIgEACg");
	this.shape.setTransform(109.3,15.9,1,1,0,0,0,0.6,3.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AnZCKIgCgBIgGgEIgEgGIgDgGIgBgIIAAgKIgDgNIACgKIgCgIIABgEIgBgHIAAgCIAAgEIABgDIACgBQAEAAACADIAGAHIADAJIACAGIAAACIgCABIACACIABAEIgBAGIACAGIAEACIABACIAGAAIAHAHIAIAGIAaACIAKgCIAHgDIAHgFIAFgGIAMgHIAEgEIAHgJIABgEIgBgCIgBgSQgBgEgCgCIgEgEIgLgGQgDgDgEAAIgPgBQgDAAgDgCIgBAAIgGACIgWgEIgEAAIgIgDQgIgFgJgCIgEgIIgHgEIgGgKIgEgNIABgHQABgDACgCIABgBIABgCIgCgBIgBgBIAAAAIAAgBIAEgHIADgFIARgRIAIgBIACgBIABgCIABgBIAEgBIADABIAqgDIAKACIAEgCIADgEIADgCIAMAEIAAAEIABAFIADAEIACAKIAAAGIADAGIgCAEIACAPIAAAKIgCAFQAAAAAAAAQAAAAgBABQAAAAgBAAQAAAAAAAAIgFgBIgGgHIgEgKIgMgSIgDgEIgDgBIgLgBIgLgDIgGAAIgJACIgIADIgQAJQgEAIABAJQAAAHACAEIAFAEIAFAFIAIAEIAHADIAIABIAKgCIAVAEIAJgBIAFABIAPAHIADACIAEAEIADAEIAKAJIABAFIAAACIACABIABADIAAAgIgCgBIgDAAIgDABIgCACQAAABABAAQAAAAAAABQAAAAABAAQAAAAAAABIAEAAIACAAIgBADIgFAIIgCACIgCADIgBADIgEADIgCABIgCAAIgCgBQgBAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAABIgBADIABACIgDACIgkAOIgMADIgJgBIgTgEIgJgBIgFABIgFACIgCACIgBACIgCgBgAkJCDIgFgGIgDgCIgFAAIgHgLIgHgHIgDhOIgBgIIgDgHQAAgBgBAAQAAgBAAAAQgBgBAAAAQgBAAgBAAIgGgBIgHABIgGgBQgEgBgDgDIgDgDIgBgDQAAgDACgDIAIgFIAIgDIAHgBQAJAAAHACQAHACAHAEIAAABIADAPIgBAJIACAKIgBAGIAEASIgBAIIgDAPIAAAHQAAAGADAEQACAFAEADQAEADAFACQAFACAFgBIAHgBIAFgCIADgDIABgBIACAAIACABIAEgCIAHgGIAFgCQADgCAAgEIAAgBIABgBIACABIABAAIABgBIAAgCIACgFQACgCABgDIACgLIgCgEIgCgFIACgLIgEgGIABgDIABgCIgBgCIgDgFIgBgDIABgGIgBgEIgEgDIgDgCIgQgBIgDAAIgEgFIgBgEQgBgEAEgCIAGgEIAJgCIAQAAIAJgDQAEAAADACIADAFIADAHIABAIIAAAQIADAVIAAADIgCAGIgBADIABACIABAJIAAABIAAACIABAJIAAALQAAAHAFADQAEADAHAAIAHgBIAHAGIADAEIACAFIgBAFIgFAGIgFAEIgGACIgWAAIgFgBQgDgBgCgCIgGgIIgEgDIgbAPIgNAEQgHACgJABIgHAAgAhIB0IgEgDIgEgBIgBgCIgEgLIgBgCQgDAAgCgBIgDgEIgCgFIgCgJIgEgHIgBgDIgBgZIABgEIACgGIABgCIgBgDIgBgDIABgDIACgDIAAgNIAAgFIgIgBIgQgBQgEAAgDgCIgEgEQgDgDgDgBIgCgCIgCgDQAAgDACgDIAQgIQACgCACAAIAGAAIAGgCIAEgDIABgFIAAgGIgCgSIABgKQABgFAEgEIACgCIACgDIACgCIACAAIACAAIACABIAEAEIABAEIAAAGIAEARIgCALIACAEIACACIADAHIAHACIApAAIANAFQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQABAEgCACIgEADIgGACIgWABIgOACQgFABgEAEQgEADgCAEQgCAFAAAHIAFAoIAKAaQACAFADAEQAEACAGAAIANgDIAGgEQADgCAAgDIgEgKIABgEIAFgFIAEgCIAFgGQAEgCAEgBIAFABIAEACIABAGIgBAJIgEAZQAAAHgEAGQgEAFgFADIgMAFIgpAGgAAlByIAAgCIgBgDIgFgHIgBgFIABgbIgBgFIgDgIIgBgCIABgCIADgFIACgBIADAAIADADIADABIABAAIAAgBIAKAWIAGAGIACABIAHAEIAHgBQABgBAAAAQAAAAABABQAAAAAAAAQAAAAAAABIgBABIAEAAIAWgEIAGABIAEABIAFgEIADgEIAFgDIAFgDIABgCIAAgEIAAgCIADgDIABgEIgDgHIgGgGIgRgIIgKgCIgHAAIgIABIgGADQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgDgCIgFAAQgCgBgBgDQgCAEgFABIgHACIgHgBIgGgDIgEgGIgEgLIgDgHIgBgDIAAgJIABgGIACgDIAEgEIACgFIABgEIADgBIACAAIABgCIAAgBIACgCIAGgDIAlgEIAJABIAQAEIAJgDIADACIADAAIACAAIAAgCIAFACIADADIADAEIABAEIAAAWIACAIIgIAGIgHgEIgGgDIgCAAIAAAAIABgGIgBgCIgHgFIgCgCIgKgDIgCgBIgIACIgQgCQgFgCgFABQgEAAgCACIgFAKQgBABAAAAQgBAAAAABQgBAAgBAAQAAAAgBAAIgBAAIAHAMIAEAEIAHAEIABABIACACIACABIACAAIAJgDIAHABIADAAIADgBIACAAIACAAIAJABIAIgBIAHABIANAGIAOAPIAFALIABAFIAAAFIgHASIgEAGIgLAMQgBAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIgFAAIgEABIgEADIgMADIgNgCIgKABIgEAAIgIgDIgEAAQgFABgDACIgJAKQgDACgEABgAC4BkIgFgDIgEgGIgBgGQAAgDABgDQACgDAEAAIADACIABgBIACgBIABgCIACgBQAEgBADgCIADgGIACgHIAAgHIgCgLIACgRIgDgZIAAgVIgBgDIgDgGIgBgDIACgMIgDgNIAAgKQAAgFgCgDQgDgDgEAAIgOgCIgHgCQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAgBQgBgEACgDIAEgFIAOgDIAXAEIAEACIAAABIACAIIAFAeIgCAPIAEAVIADAoIADAAIABAAQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAgBIAEgDIADgFIAEgDQADgCACgBIAJgMIAGgFQADgBAAgEIgBgEIgEgJIAAgEIAAgCIACABIAAAAIABAAIABgBIgBgDIABgCIACgBIAMABIAFAAIAJgEIAEgBIAPABIARgDIABAAIADABIADACIAAABIgBACIgBABIACABIAEAHQAAABAAAAQAAAAgBABQAAAAgBABQgBAAAAABIgIAEIgQAEIgEgBIgEgBIgEACIgIAFIgQAQIgEAGIgDAEIAAAJIABAEIADACIAEACIAgAoIACAGIAAABIAOgCIATAAIAAACIABAFIAFAGIACACIgBADIgCACIgCACIAAACIAAABIgWAEIgCAAIgDgBIgBgBIgBgCIgHACIgEACIgDADIgZgEIgFgCQgBgBAAAAQAAgBgBgBQAAAAAAgBQAAAAAAgBIAAgCIABgHIACgCIAGABIABAAIAAgCIAAgBIgCgBIgFAAIACgFIABgFIgBgGIgCgHIgEgFQgDgDgCAAIgCgEIgEgEIgEgDIgEAAQgCAAgEADIgIAHIgJAMIABAGIgBAEIgCAEQAAABAAAAQABABAAAAQAAABABAAQAAABABAAIAEACIAKABIACACIAHAFIABADIgBACIgDABIgCABIgBABIAAACIggAHIgLABIgKACgAG2BZIgHgCIgOgCIgLgJIgSgIQgDgCgEgEIgLgOIgEgIIgCgIIAAgFIACgMIAAgHIgBgBIgBgCIgBgBIgBAAIABgEIACgJIACgDIACgCIABgCIgBgFIAAgCIABAAIACgBIABgCIAFgJIADgEIARgOIAhgJIAMgBIAIABIATAFIAIAEIAAAAIAAAJIAAABIAJgCQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAIAEACIAEACIALATIAEAKIgBAJIgFAFIgBADIABACIABACIABAAIABgBIgCgFIAAgBIABgBIACABIACADIACACIAAAAIAAABIAAAGIgBADIgCACIAAABIACAGIAAACIgCAAIgCAAIABAQIgCABIgCACIgBACIAAAEIgKAIIgEACIgBAAIAAAEIgBADIgCABIgOAMIgFACIgJgCIgFABIgFADIgEABIgBAAQgDAAgDgCgAGZgeQgHAFgFAGQgFAGgDAHQgCAGABAIIABAQIADAIQABAEADACIAAAEIACAAIABAAIACAAIACABQABAGAEADIAOAIIAHAFIADAAIACgBIASAAQAFAAAEgDIAGgGIADgFIAKgKIACgBIADgCIACgDIABgCIgCgFIAAgEIACgEIACgDIADgCIAGACIAAgCQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBAAIgIAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIAAgBIgFgPIgJgXIgCABIgDgBIgGgCIgFgCIghAAQgIAAgHAEgApOAHIgDgEIgDgEIAAgFIgBgBIAAgCIAAgEIAAgCIACgBIgBgCIgCgCIgCgBIgBAAIAAgHIgEgKIgBgJIgBgKIADgFIAEgBIALgBIAFABIAEADIACAJIgBAfIgBANIAAAIIgCAFIgDADQgCAAgDgCgAoiAGIgDgEIgDgDIgBgIIABAAIgJgrIACgGIADgEIAFgEIAFgCQAFAAAEACQACACABAEIABALIAAARIgBABIgBAAIgBAAIgBABIAAACIAAACIgBACIgBABIABABIABAAIACABIABABIADATIgCADQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAIgDACgAIlg8IgEgFIgCgGIAAgFIgBgBIAAgCIAAgEIAAgCIACgBIgBgCIgBgCIgDAAIgBgBIAAgGIgFgUIAAgKIACgEIAFgCIAKgBIAFABIAEAEIACAJIgBAeIgBANIAAAKIgCAGIgDACIgFgBgAJRg+IgEgDIgCgFIgBgJIABABIgJgsIABgGIAEgEIAEgEIAGgBQAFgBADACQACACABAEIACALIgBARIAAABIgBABIgBAAIgBABIAAABIgBACIgBACIgBABIABABIACABIACAAIAAABIADATIgCAGQAAAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIgEADg");
	this.shape_1.setTransform(64.2,15.8,1,1,0,0,0,0.5,0.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Am5CIIgCgBIgFgEIgFgGIgDgGIgBgIIABgKIgDgNIABgKIgCgIIACgEIgBgHIAAgCIAAgEIABgDIACgBQADAAACADIAGAHIAEAJIACAGIgBACIgBABIABACIABAEIAAAGIACAGIADACIABACIAGAAIAHAHIAIAGIAbACIAJgCIAIgDIAGgFIAGgGIALgHIAEgEIAHgJIABgEIAAgCIgCgSQgBgEgCgCIgEgEIgLgGQgDgDgDAAIgPgBQgEAAgDgCIgBAAIgGACIgWgEIgDAAIgJgDQgIgFgIgCIgFgIIgGgEIgGgKIgEgNIAAgHQABgDACgCIABgBIABgCIgBgBIgCgBIAAAAIABgBIADgHIAEgFIAQgRIAIgBIADgBIABgCIABgBIADgBIAEABIApgDIAKACIAEgCIADgEIADgCIANAEIAAAEIABAFIACAEIADAKIgBAGIADAGIgCAEIACAPIAAAKIgBAFQgBAAAAAAQAAAAAAABQgBAAAAAAQgBAAAAAAIgFgBIgGgHIgDgKIgNgSIgDgEIgCgBIgMgBIgLgDIgGAAIgIACIgJADIgQAJQgEAIABAJQAAAHACAEIAFAFIAGAEIAHAEIAIADIAIABIAKgCIAUAEIAKgBIAEABIAPAHIAEACIADAEIADAEIAKAJIABAFIABACIACABIABADIgBAgIgCgBIgDAAIgDABIgBACQAAABAAAAQAAAAAAABQAAAAABAAQAAAAABABIADAAIACAAIAAADIgFAIIgDACIgCADIgBADIgDADIgDABIgCAAIgCgBQgBAAAAAAQAAAAAAAAQgBABAAAAQAAAAAAABIAAADIAAACIgDACIgkAOIgMADIgJgBIgTgEIgJgBIgFABIgFACIgBACIgCACIgCgBgAkYCAIgGgDIgEgFIgBgGQAAgDABgDQACgDAEAAIAEACIABgBIABgCIABgBIACgBQAEgBADgDIADgFIACgHIABgIIgDgLIACgRIgDgaIAAgVIgBgDIgDgFIAAgDIABgLIgDgNIABgLQgBgFgCgCQgDgDgDgBIgPgBIgGgDQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQgBgFACgDIAEgEIAOgEIAXAFIAEACIABABIACAIIAEAdIgCAQIAEASIAEAqIACABIABAAQAAAAABgBQABAAAAAAQABAAAAgBQABAAAAAAIAEgEIADgEIAEgEQAEgBACgEIAIgLIAGgFQADgCAAgDIgBgEIgDgHIgBgEIABgCIABAAIAAAAIABAAIABgBIgBgCIABgDIACAAIAMABIAFgBIAIgDIAFgBIAPABIARgEIACABIACABIADABIAAACIgBABIgBABIACACIAEAHQAAAAAAABQAAAAgBAAQAAABgBAAQAAABgBAAIgIAEIgPADIgFAAIgDgBIgGABIgHAFIgQAPIgFAHIgCAGIAAAJIABADIADACIAEACIAgApIACAGIAAABIAOgDIATABIAAACIABAFIAFAFIACADIgBADIgBABIgCACIAAADIAAABIgXAEIgCgBIgCgBIgCgBIgBgCIgHADIgEACIgDADIgTgDIgGgBIgFgDQgBAAAAgBQAAgBAAAAQgBgBAAAAQAAgBAAAAIAAgDIABgEIAAgDIABgBIAIAAIAAgBIgBgCIgCgBIgEAAIACgFIABgFIgBgGIgDgGIgEgGQgCgCgCgBIgCgDIgEgEIgDgDIgFgBQgCAAgEADIgIAHIgJAMIACAGIgCAFIgCAEQAAAAABABQAAAAAAABQAAAAABABQAAAAABABIAEABIAKABIACACIAHAGIABADIgBACIgDAAIgCABIgBACIABACIghAHIgLAAIgKADgAhABxIgHgBQgDgCAAgDIAAAAQgCACgDABQgCAAgEgEIgNgOIgCgHIACgGIgCgHIABgGIAHgSIAEgFIALgGIAFgEQACACAEAAIAOgDIAMAAIAEAAIAEgEIAGgDIAVgHIAFgEQAAgCAAgEQAAgFgBgDIgIgJIgKgHQgFgCgFAAIgBABIgBAAIgQADQgEABgCADQgDADAAAFIACAJQABAFgDACIgEAFIgIADIgHABIgIAAQgDgCgDgEIgDgFQgDgEAAgEIABgFIAGgOIACgHIAigOIAHgCIASAAIAMADIANAFIAIAIIAGAGIADgDIADgBIABgDIABgDIADgCIAlgPIALgBIAGABIARAHIAJACIANAJIAFAFQADADAAAEIAAABIgBABIABgBIABACIACAEIABACIAGAEIgBAEIADAJIAAAGIAAAGQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAIgGAFIgCACIgBABIgDAAIgZgCIgvAFIgUAFIgFACIgBACQABAHAFAHQAEAHAHAGQAHAGAIADQAJAEAHgBIAKAAIAJABIAIgEIARgTIADgBIAKgCIADAAIAGABIABAGIAAAHIgDAFIgJAJIgHAEIgHADIgMAIIgdAFIgDAAIgGgCIgKAAIgGgFIgEgBQgKgEgHgGQgGgGgFgHIgFAIIgHAIIgDABIgEAFIgIACIgNAGIgNADIgTACgAgQAqIgTAEIgFAAIgWAHIgDABIgBACIAAACIgCACIgGAFIgEAGIgBAGQAAAEACADIAGAGIAIADIAIACIAQABIASgEIAJgDQAEgCACgDIACgFIAGgLIADgHIAAgHIAAgIIgBgDIAAgFIgCgEIgCgCIAAABIAAAAgAA6gUIABACIgNAEIgLAKIgGACIgDACIgDAGQgCADABAEQAAAAAAABQAAAAAAAAQABABAAAAQAAABABAAIAFADIANADIALAAIAVgEIAXAAIAEAAIAGgCIAFgCQABAAAAgBQAAAAAAgBQABAAAAAAQAAgBAAAAIgBgFIgCgDIgCgOIgBAAIAAACIgBABIgEgBIgDgCIgTgHIgKgCIgLAAIgBAAIgBAAgADpBmIgCgCIgBgDIgDgDIAAgEIgBAAIgCgBIgCABIgBgCIgBgDIgBgJIgEgJIgCgEIgDgOIgCgEIgFgGIgEgHIgJgbQgFgLgIgMIgEACIgNAAIgJgDIgDgDIgCgHQAAgDACgDIAEgEIAHgDIAGgBIAUACIAXgDIANAFQAAAAABAAQAAABABAAQAAABAAAAQABABAAABIgBAHIgCAFIgDACIgIACIgCABIgBAGIABAKIABABIABABIABAAIACAFIAHALIABADIgCABIgBACIAAAAIACAAIACABIABAAIAAACIACAKIAIASIADAJIADAAQADAAACgCIAFgJIAFgDIAAgCIgBgHIAAgEIADgFIABgJIADgFIABgCIADgIIABgZQAAgDgDgCIgNgDQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIAAgCIABgCIABgCIAAgBIAAgCIgBgCQAAgBAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAIAFgCIAKgCIAPAEIACgCIADgDIABgCIACAAIAJgCIARABIAIADIAHAGQAAAFgCADQgDADgEACIgIAEIgJABQgFABgCACIgDAHIgEANIgHAJIACAHIgBAEIgCAEIgCAMIgDAIIgEAIIgFAZIgEANIgHALIgCAAIgBAAIgPADgAEggwIABADIAEACIABgBIAAgCIgGgDIAAABgAGcBZIgGgCIgKAAIgHgFIgDgBQgKgEgGgGIgLgLQgFgHgEgHIgGgRIgCgNQAAgIADgHIgCgFIABgIIADgMIAGgKQACgFADgBIADgBIAAgDIACgDIADgCIAagMIALgDIALgBIAGABIASAHIAIACIAGAFIAHAEIAFAFQADADAAAEIAAABIAAABIAAgBIABACIACACIAAACIABACIAHAGIgCAEIADAKIAAAJQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAIgHAFIgCACQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDAAIgZgCIg1AGIgPAEIgFACIAAACQABAHAEAHQAFAHAGAGQAHAGAJADQAIAEAJgBIAJAAIAKABIAHgEIARgTIADgBIAKgCIADAAIAHABIABAGIgBAHIgDAFIgNAMIgKAEIgMAIIgeAFgAGRgpIAAACIgBAAIgLAEIgLAKIgHADIgCACIgDAHQgCADABAEQAAAAAAABQAAAAAAAAQABABAAAAQAAABABAAIAFADIANABIAKAAIAWgCIAcAAIAGgCIAFgCQAAAAAAgBQABAAAAgBQAAAAAAAAQAAgBAAAAIgCgIIgDgQIgBACIgBABIgEgBIgDgCIgTgHIgKgCIgLAAIgBAAIgBAAgAouAFIgDgEIgCgEIAAgFIgBgBIgBgCIAAgEIABgCIABgBIAAgCIgCgCIgDgBIgBAAIAAgHIgDgKIgCgJIAAgKIACgFIAFgBIALgBIAEABIAEADIACAJIAAAfIgCANIAAAJIgCAEIgDADQgCAAgDgCgAoBAEIgEgEIgCgDIgBgIIAAAAIgIgrIABgGIADgEIAFgEIAGgCQAEAAAEACQACACABAEIACALIgBARIAAABIgBAAIgBAAIgBABIgBACIAAACIgBACIgBABIABABIACAAIABABIABABIADATIgCADQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAAAIgEACgAIEg6IgDgFIgCgGIAAgFIgBgBIgBgCIAAgEIABgCIABgBIAAgCIgCgCIgDAAIgBgBIAAgGIgFgUIAAgKIACgEIAFgCIALgBIAEABIAEAEIACAJIAAAeIgCANIAAAKIgCAGIgDACIgFgBgAIxg8IgEgDIgCgFIgBgJIAAABIgIgsIABgGIADgEIAFgEIAGgBQAEgBAEACQACACABAEIACALIgBARIAAABIgBABIgBAAIgBABIgBABIAAACIgBACIgBABIABABIACABIABAAIABABIADATIgCAGQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAIgEADg");
	this.shape_2.setTransform(61,15.9,1,1,0,0,0,0.5,0.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AqCCSIgFgCIgDgEQAAgEACgDQADgFAFAAIAKgBIAFgCIADgDIAAgFIABgUIAAgFIgEgTIAAgMIgKhSIgDgEIgEgCIgFAAIgEgCIgEgDIgEgFIgBgEIAAgDQAAgGABgDIAFgGIAHgCIATAAIAKABIAJACQAEADADAEIADAGIAFALIADAFIAFAMIAFAFIAEAQIADAGIAFAIIABAKIACAGIADAEIAGAGIAGAMQABAEAFADIgCACIAAAEIACAGIAFAJIADADIADACIABACIAAABIABADIABADIABACIACACIACABIABgBIABgCIAAgBIAAgBIABgJIgCgIIABgFIAAgDIgCgFIAAAAIABAAIAAgBIABgCIgHgaIABgGIABgEIgCgHIACgIIgBgCIgDgFIgCgHIgBgRIgFgTIgDgEIgHgBIgHAAIgGgBIgEgBIgCgFIgBgJQAAgDADgBIAGgEIAIgCIAKgBIAQABIAOADQABAAAAABQABAAAAABQAAAAAAABQABAAAAABIACgDIAEgCIAHAEIADAIIgBADQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgBgBIgBgBIgBAAIgBgBIAAAEIAAACIgBABIgBAAIgCAAIgHACIgDABIAAACIACA3IADALIAAABIgBACIgBABIgBACIAEAMIgCAmIADANIABACIAAACIAAADIgBACIABACIABACIACAHIABAHIgBAGIgEAGIgGAEIgGACQgFAAgDgDIgGgGIgQgeIgHgIIgOgmIgIgPIgDgJIgJgNIgHgRIgDgCIgEgCIgCACIgCAGIABAPIgBAJIABABIABACIAAADIAAACIACAOIAAAFIgBAFIgDAEIgEACIACABIABABIACABIABABIAAABIAAABIABADIADAEIABACIgBAHIADANIAAACIgBACIgBABIAAADIABADIAAACIgBACIABACIAGACIACACIABADIADABIAJgDQADAAACADIACAGQAAAEgBABIgGAFQgBAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAIAAAAIgEgBIgGAAIgRADIgMAAIgIABgAp1CDIAAACIABACIABAAIADABIABAAIABAAIAAgBIgBgCIgCgBIgCgBIgCAAgAm/CRIgNgKIgCgEIgBgDQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAIAGgDIAKgCIAPABIAMgCIALAAIAHgCIAGgEIAAgdIgEgcIAAgBIABAAIABAAIAAgBIgDgNIABgOIgBgFIgDgFIgFgDIgFgBIgGABIgNAFIgPABIgSgCIgFgCQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQgBgFACgDIAEgDIAGgCIAdgDIAkABQAFABADADIAGAFQACAEAAAHIgBAHIgEAHIACADIACAAIACACIABADIAAACQAAAAAAABQAAAAABAAQAAABAAAAQABAAAAAAIAEA5QABAFACABQACACAFAAIAZgEQAEAAAEABIANAHIAGACIACABIABACIAAACIABACIgBAFIgCADIgEADIgFACIgBAAIgBgBQgCgCgDgBIgNgBQgDgBgBgEIgDgDIgEgBQgHABgGACIgWALQgFACgHABIgHAAIgHgCIgBABIgCABIgCgBIgCABIgBAAIgCAAIABACIgEADIgNAEIgFABIgIgBgAjwB9IgDgDIgEgBIgCgCIgDgLIgBgCQgDAAgCgCIgDgDIgCgFIgCgJIgEgHIgBgDIgBgZIABgFIACgFIABgDIgBgCIgBgDIABgDIABgDIABgMIgBgFQgDgDgEgBIgRgBQgDAAgDgDIgEgDQgDgBgDgBIgDgCIgBgDQgBgEACgCIAFgDIALgFQACgCADAAIAMgBIADgFIACgEIAAgHIgCgSIABgKQABgEAEgFIABgBIAFgFIACgBIACABIABABIAFAEIABADIAAAHIAEARIgCAKIABAFIAFAFIABAEIAHACIApAAIANAEQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAADgBACIgEAEIgGACIgXABIgNABQgFACgFACQgDADgCAFQgCAGAAAHIAFAoIAJAbQACAEAEADQAEADAGAAIANgDIAGgEQADgCgBgDIgDgLIABgDIAFgFIADgCIAGgGQAEgCAEgBIAGABIAFACIABAFIgBAKIgGAZQAAAHgEAFQgEAFgFAEIgMAFIgpAGgAhXBzIgEgCIgEgCIgBgBIgDgLIgCgCIgFgCIgDgDIgCgGIgCgJIgEgGIgBgEIgBgYIADgIIABgDIAAgCIAAgDIgCgCIABgEIACgCIAAgNIAAgFQgEgBgEAAIgQgBQgDgBgDgCIgEgEQgDgDgDAAIgDgCIgBgDQgBgEACgCIAFgDIALgGIAFgBIAGAAIAFgCIAEgEIABgFIAAgGIgCgSIABgKQABgFAEgEIACgBIACgDIACgCIADgBIABAAIACABIAEAFIABADIABAGIADASIgCAKIACAEIACADIAEAHIAGACIApAAIAOAEQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAABQABADgCACIgEAEIgGABIgWABIgNACQgGABgEAFQgEADgCAEQgCAEABAHIAEApIAKAaQACAFADADQAEADAGAAIANgEIAGgDQADgCAAgEIgEgKIABgDIAFgGIAEgCIAGgFQADgDAEAAIAGAAIAFACIABAGIAAAJIgGAaQgBAGgEAGQgDAFgGADQgFAEgHACIgpAGgABNBtIgGgCIgKgBIgKgGQgJgEgHgFQgGgFgFgHQgFgGgDgJIgGgQIgCgMQgBgIAEgIIgCgHIABgIIADgKIAFgKQADgFADgBIACgBIABgDIABgDIADgCIAbgMIAKgCIALgBIAHAAIAGACIALAFIAIADIAGAEIAHAEIAGAFQACADAAAEIAAABIAAABIABgBIABABIABADIABADIAAACIAHAFIgBABIADAKIAAALQAAABAAABQAAAAgBABQAAAAAAAAQAAABgBAAIgHAEIgBAEQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAABgBAAIgCAAIgagDIg0AGIgPADIgFAEIAAABQAAAHAFAIQAEAGAHAGQAHAGAJADQAIAEAIgBIAKgBIAJACIAHgEIASgSIADgBIAKgDIADAAIAGABIABAGIgBAHIgCAFIgKAJIgGAEIgHADIgNAIIgdAGgABCgWIABABIgBABIgLAEIgMAKIgGACIgDADIgCAFQgCADAAAEQAAABAAAAQAAAAABABQAAAAAAABQABAAAAAAIAFADIANADIA8gEIAGgCIAFgCQABAAAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAIgDgIIgDgOIAAACIgCABIgDgBIgDgCIgUgHIgJgCIgMgBIgBAAIgBABgACvBiIgDgDIgBgCIABgDIADgFIADgCIADgCIAJAAIAIgCIAHgFIAFgFQACgEAAgEIgBgIIAAgPIgFg1IgDgHQgDgEgDABIgGABIgNABIgGgBIgFgDQgCgCgBgDIABgGIACgEIAEgBIAhgEIANABIAEADIAGAKQABAAAAAAQABABAAAAQABAAAAAAQABAAABAAIADgBIAEgEIAJgEIAKgHIAGgCIAKgBIAJgGIAKABIAKAEIAJAGQAEAEABAEIACAGIAFAJIABAFIAAAFIgFAIIgCAEIgDgBIgQACQgEAAgDgCIgEgEIgDgIIgBgIIABgIIgCAAIgDABIgCACIgFgCIgFACIgHAEIgEAFQgDACAAADIgKAFIgDAEIgEAJIgGAMQgCADAAAEIAFAWIgBANQABAEABADIAEAEIANABIAOgBIABACIAAACIgBAFIABABIADgBIACgEIACABIABACIAAACIgBABIgBACIAAABIAAACIABABIgCACIgDABIgEgBIgFgDIgDgBIgBAAIgDACIgCABIgBABIABACIABACIAAACIgCAAIgCABIgCAAIgXgBIgKAEIgDgBIgCgCIgBgCIgCAAIgGABIgKADIgGABgAGdBYIgGgCIgKgBIgKgGQgJgDgHgGQgGgFgFgHQgFgGgDgIIgGgQIgCgNQgBgIAEgHIgCgFIABgJIADgLIAFgKQADgFADgBIACgBIABgDIABgEIADgBIASgJIATgGIALgBIAGAAIASAIIAIACIAGAFIAHADIAFAGQADADAAADIAAABIAAACIAAgBIABABIACACIAAADIABACIAHAFIgCAEIADAKIAAAJQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAIgHAFIgCACIgBACIgDAAIgZgCIg0AFIgPAEIgFADIAAACQAAAHAFAHQAEAHAHAGQAHAFAJAEQAIADAIgBIAJAAIAKACIAHgFIARgSIADgBIAKgDIADAAIAHABIABAGIgBAHIgDAFIgNAMIgDACIgHADIgMAIIgdAFgAGSgqIABABIgBAAIgLAFIgMAKIgGACIgDACIgCAHQgCAEAAAEQAAAAAAAAQABABAAAAQAAABAAAAQABABAAAAIAFACIANACIA8gDIAGgBIAFgCQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAAAIgFgYIgBABIgBABIgEgBIgDgBIgTgIIgKgBIgLgBIgBAAIgBABgAIMBPIgHgCIgEgCIgDgIIACgEIACgDIAEgDIALgCIAEgCIACgGIAAgQIgCgHIAAgCIAAgCIACgEIABgEIgDgJIABgGIgBgDIgBgDIABgHIgEgPQgBgFgCgCIgGgDIgNgDIgFgFQgCgDAAgFQgBgDADgDIAFgDIAHgCIAGAAIAVACIADADIADADIABAEIABADIAEAJIACACIABgCIAAgCIACgDIAIgHIADgCIABgCIABgCIABgCIADgBIAAAAIAEgBIADgDIAGgDIAKgDIALgBIAKABIAKAFQAEABAEAGIAHAJIACAEIACALIAEAHIAAAFIABAUIgCAMIACAHIgBAKIADAIIAAACIgBACIgCACIAAACIABADIAEAFIAEACIAEABIADgBIADgBIAEACIAEAEIACAEIABAEIgBADIgDADIgDABIgDAAIgKAAIgGADIgHABIgCAAIgBAAIgLACIgQgBQgHAAgEgFQgEgEAAgHQAEgDAFgBIAKgCIALAAIgGgsIABgNIABgIIABgIIgBgEIgEgIIgBgEIgCgEIgDgEIgFgDIgKAAIgFAAIgNAFIgFACIgBACIgFAGIgCABIgDABIgCABIAAACIgCADIgBADIgCABIgBgBIgBAAIgBAAIAAABIAAAEIgCABIgBABIgBABIAAACIAAAEIgDAEIgBAEIACAJIAAADIgBADIgBACIAAADIAAADIAEAHIABAEIAAALIABAEIADADIAIACIAEACIAEAEIABgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIABAEIgBAIQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBAAIgJADIgPACgAKHAjIgBACIgBACIgBACIABACIABABIABgCIACgCIABgCIAAgCIAAgBIgCgBIgBABgAIbAIIAAAAIADADIAGABIACACIACgDIgCgGIgCgCIgCgBIgGACIAAAAgAKBAGIgBADIABACQAAABAAAAQABAAAAAAQAAABABAAQAAAAABgBIABAAIACgDIAAgBIgBgDIgEgCQAAABAAAAQgBAAAAAAQAAABAAAAQAAABAAAAgArsAQIgDgFIgCgGIAAgEIgBgBIgBgBIAAgEIABgBIABgBIAAgCIgCgDIgDgBIgBAAIAAgHIgDgKIgCgJIAAgKIACgEIAFgCIALgBIAEABIAEAEIACAJIAAAeIgCAMIAAAKIgCAEIgDAEQgCAAgDgCgAq/AOIgEgDIgCgGIgBgFIAAAAIgIgsIABgGIADgEIAFgEIAGgCQAEABAEABQACACABAFIACAKIgBARIAAABIgBAAIgBAAIgBABIgBACIAAACIgBACIgBABIABABIACAAIABABIABABIADARIgCAGQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAIgEACgAmcgZIgJgCIgHgFQgEgDAAgEIABgOIADgDIAFgIIAHgEIAEAAIAIABIAIAEIAHAFQADADAAAEIgBAJIgDAIIgGAHQgDABgFABgALChHIgDgGIgCgFIAAgEIgBgCIgBgCIAAgEIABgCIABgBIAAgBIgCgDIgDgBIgBAAIAAgGIgDgLIgCgJIAAgKIACgEIAFgCIALgCIAEACIAEADIACAJIgCA2IgCAGIgDADQgCAAgDgCgALvhJIgEgEIgCgEIgBgJIAAABIgIgsIABgGIADgEIAFgEIAGgCQAEABAEABQACACABAEIACALIgBARIAAABIgBAAIgBAAIgBABIgBACIAAACIgBACIgBABIABABIACAAIABABIABABIADAUIgCAEQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAIgEADg");
	this.shape_3.setTransform(80,15,1,1,0,0,0,0.5,0.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Al+CDQgCgDgBgEQAAgEACgDIAEgFIARgJQAAAAABgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIgBgHIABgLIAAgGIgCgCIgBgGIAAgYIgCgNIABgCIgBgDIAAgEIABgDIgGgVIACgKIAAgEIgDgUQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAAAgBIAHgEIAAgDIAAgCIgCAAIgEACIgDABIgCgBIgFgHIgEgBIgHABIgCAAIAAgDIAAgCIAAgBIgBgDIgDgBIgCAAQACgCAEgBIAHgDIATgEIAKAAIAJgDIACACIADAAIAUgCIAKABIAeAHIAEABIAJAHIARATIACAEIACAQIgBAMIgBAEIgKARIgCADIgMAKQgIAFgIADQgJADgKAAIAAAAIgJgBIgKABIgQAHIgCACIAAABIAAABIABgBIACgBIABAAIABACIABACIAAABIgBARIADAdQAAAEADACIAHACIAKACIAAADIABACIAGADIABAEIgEAGIgBACIgCABIgXADIgFgBIgdAFIgCABQgEAAgBgDgAk9g4IgZADIgFACIgEABIgEAJIABADIAFAHIABAEIgCABIgBACIACAFIACAFIgBAEIgCABIgCACIgBACIACAEIAKALIACADIAGAAIAdgEIAGgBIADgBIACgCIABgCIADgBQAFAAADgCIAGgCIABgHIABgIQgBgJgDgHQgDgIgGgFQgGgGgIgCQgGgCgIAAIgDAAgAirB8IgFgGIgCgCIgDAAIgDAAIgHgMIgHgGIgEhWIgCgHQgBgBAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAIgGgBIgHAAIgHAAQgDgBgEgBIgDgDIgBgFQAAgEACgCIAIgFIAJgDIAHgBQAIgBAHACQAIACAGAFIAAABIADAPIgBAJIACAKIAAAGIAEARIgBAIIgDAQIgBAHQAAAGAEAEQACAFADADIAJAFIAKABIAIgBIAFgDIAEgDIADAAIACAAIACgBIAHgGIAGgDQACgBABgEIAAgBIABgBIABAAIABABIABgCIAAgCIADgEIACgFIACgLIgCgEIgBgFIABgMIgDgFIABgEIABgBIgBgDIgEgEIgBgDIABgGIgBgDIgDgCIgEgCIgOgBIgFgCIgDgGIgBgEQgBgDADgCIAIgEIAIgCIAQgBIAJgCQADgBADACIAEAGIACAGIABAIIAAARIAEAVIgBADIgCAGIgBADIABACIACAJIgBABIAAACIABAJIAAALQABAHAFADQAEADAGAAIAIgCIADAEIAEADIACAEIACAFIgBAFIgEAGIgGAEIgFACIgXAAIgEgCIgFgCIgHgJQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAAAAAIgaAOIgOAFQgHACgKABIgGAAgAAUBsIgEgCIgDgBIgCgCIgDgLIgCgCQgDAAgBgCIgCgDIgCgFIgCgJIgDgHIgCgDIgBgZIABgFIADgFIABgDIgBgDIgBgCIABgDIABgDIABgMIgBgEQgEgCgEgBIgQgBQgEAAgDgDIgEgEQgCgDgDAAIgDgCIgBgDQgBgEACgCIAFgDIALgFIAFgCIAMgCIADgEIABgFIAAgGIgCgSIABgKQABgEAFgFIABgBIAEgFIABgBIACABIABABIAEAEIACADIAAAHIAEARIgCAKIABAEIACADIAEAHIAGACIAqAAIANAEQAAABABAAQAAAAAAABQAAAAAAABQABAAAAABQAAADgCACIgEAEIgGABIgWABIgNADQgGABgEAEQgDADgCAFQgCAFAAAGIAEAoIAKAaQACAFAEADQADADAHAAIAMgDIAHgEQADgCgBgDIgDgKIABgEIAEgFIAEgCIAGgGQADgDAEAAIAGABIAGACIABAFIgBAJIgGAaQAAAHgFAFQgDAFgGAEQgEADgIACIgoAGgACtBjIgEgCIgEgBIgBgCIgEgLIgBgDIgFgBIgDgDIgCgGIgCgJIgEgGIgBgEIgBgZIABgEIADgGIAAgCIAAgDIgCgCIABgEIACgDIAAgKIAAgFQgEgDgEAAIgQgBQgEgBgDgCIgEgEQgCgDgDAAIgDgCIgBgEQgBgDACgCIAFgEIALgFIAFgCIAGAAIAGgBIACgEIACgFIAAgGIgCgSIABgKQABgFAEgEIACgCIABgCIADgCIADgBIABAAIACABIAEAFIABADIABAHIADAQIgCALIACAEIACADIAEAHIAGABIApABIANAEQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAAEgBACIgEADIgGACIgWABIgOACQgFACgFADQgDAEgCAFQgCAFAAAHIAFAmIAJAbQADAFADADQAEADAGgBIAFAAIAIgCIAGgEQADgDgBgDIgDgKIABgDIAFgGIAEgBIAFgGQAEgDAEAAIAGAAIAFADIABAFIAAAJIgGAaQgBAHgEAFQgEAFgFADQgFADgHACIgpAHgAFTBcIgGgCIgKAAIgKgHQgJgDgHgGIgLgLQgFgHgEgIIgFgQIgCgNQgBgIAEgHIgCgFIABgIIACgMIAGgKQACgFADgBIADgBIABgDIABgDIADgCIAagMIALgDIALgBIAGABIAHACIALAFIAIACIANAJIAFAFQADADAAAEIAAABIAAABIAAgBIACACIABACIABACIAAACIAHAGIgCAEIAEAJIAAAJQAAABgBABQAAAAAAABQAAAAAAABQgBAAAAAAIgHAFIgBACQAAABgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIgDAAIgZgCIg0AGIgPAEIgGACIAAACQABAHAFAHQAEAHAGAGQAIAGAJADQAHAEAJgBIAKgBIAJACIAHgFIASgSIADgBIAKgCIACAAIAHAAIABAHIgBAHIgCAFIgOAMIgKAEIgMAIIgdAFgAFJgmIgBAAIAAACIgBAAIgKAEIgMAKIgGACIgDADIgDAHQgBADAAAEQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAIAFABIANADIAKAAIAXgEIAbAAIAGAAIAFgCQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIgCgIIgDgQIAAACIgCABIgEgBIgCgCIgUgHIgJgCIgMgBIgBABgAnkAAIgEgDIgCgGIAAgFIgBgBIAAgCIAAgEIAAgCIABgBIAAgCIgCgCIgDgBIgBAAIAAgHIgDgKIgBgJIgBgKIACgFIAFgBIALgBIAEABIAFADIACAJIgBAfIgBANIAAAKIgDAFIgDABQgCAAgCgBgAm4AAIgEgEIgCgFIgBgIIABAAIgJgrIACgGIACgEIAGgEIAFgCQAEAAAEACQADACABAEIABALIAAARIgBABIgBAAIgBAAIgBABIgBACIAAACIgBACIgBABIABABIACAAIACABIABABIACATIgBAFQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIgEACgAmQg2IgBgCIAAAAIABgBIABAAIABAAIACACIgBABIgCABIgBgBgAG7g4IgEgEIgCgGIAAgFIgBgBIAAgCIAAgEIAAgCIACgBIgBgCIgCgCIgCAAIgBgBIAAgGIgFgUIgBgKIADgEIAFgCIALgBIAEABIAEAEIACAJIgBAeIgBANIAAAKIgCAFIgDADQgCAAgDgCgAHog5IgFgDIgCgFIgBgJIABABIgJgsIACgGIADgEIAFgEIAGgCQAEAAAEACQACACABAEIABALIAAARIgBABIgBAAIAAABIgBABIgBABIAAACIgBACIgBABIABABIACABIABAAIABABIADATIgCAGQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAIgEACg");
	this.shape_4.setTransform(53.7,16.4,1,1,0,0,0,0.5,0.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AmUCEQgCgCAAgFQAAgEACgDIAEgFIARgJQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBIgBgGIABgLIAAgGIgCgCIgBgGIAAgZIgCgNIABgBIgCgDIAAgEIABgEIgFgVIACgKIAAgEIgDgTQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAIAGgFIABgCIgBgCIgCgBIgDACIgDABIgDgBIgEgGIgEgBIgHABIgCgBIgBgDIAAgBIAAgCIgBgCIgCgBIgCAAQACgDAEgBIAHgDIASgEIALABIAIgDIADABIADAAIAUgCIAKABIAeAHIAEACIAJAHIARASIACAFIABAPIAAAMIgBAFIgKARIgCADIgNAJQgIAFgIADQgIADgKABIgBAAIgIgCIgLACIgPAHIgDACIAAAAIABABIABgBIACgBIABABIABACIABACIAAABIgBARIACAcQABAEADACIAGADIALACIAAACIABADIAFADIABADIgDAGIgBADIgCABIgXACIgFAAIgeAFIgBAAQgEAAgCgDgAlSg3IgZADIgGACIgDACIgEAIIABAEIAFAHIABAEIgCABIgBACIACAEIABAFIgBAEIgBACIgCABIgBACIACAEIAKALIACADIAGAAIAdgDIAGgCIADgBIABgCIACgBIADgBQAFAAADgDIAFgCIACgHIABgHQgBgKgDgHQgEgIgFgFQgGgFgIgDQgGgCgIAAIgDAAgAjRB5IgGgCQgDgBAAgDIAAgBIgCACIgDABQgDAAgDgDIgNgPIgCgGIABgGIgBgIIAAgFIAIgSIAEgFIALgHIAEgEQADADADAAIAPgDIALAAIAFgBIADgDIAGgDIAWgHIAEgEQACgDAAgEQgBgEgCgGIgHgHIgKgGQgGgDgFABIgBAAIgBAAIgPADQgEABgDAEQgDACABADIACAMQAAAEgCADIgFAFIgHADIgIABIgIgBQgDgBgCgEIgEgGQgCgEAAgDIABgIIAFgLIACgIIAjgOIAHgBIARAAIANADIAMAFIAKAHIAGAIIAEAIIAMBaIABAEIABABQAEAAACgCIAGgKQABAAAAgBQABAAAAAAQABgBAAAAQABAAABAAIACAAIADABIACABIABADIAAAEIgCAFIAAADIgCAFIgMAHQgFADgFAAQgEAAgEgCIgNgIIgFgCIgDACIgFAEIgVAJIgNADIgTABgAigAyIgJACIgLABIgFABIgWAGIgCACIgCACIAAACIgCACIgGAEIgDAGIgCAHQAAAEADADIAFAFIAIADIARADIAHAAIASgDIAJgEQAEgCACgDIAKgPIADgHIAAgIIAAgIIgBgDIAAgEIgCgEIgCgCIAAAAIgBAAgAgGBzIgCgCIgBgCIgDgDIAAgEIgBgBIgCAAIgCAAIgBgBIgBgEIgBgJIgGgMIgDgJIAAgFIgCgFIgFgGIgEgHIgJgbQgFgMgIgKIgEACIgNgBIgJgCIgDgEIgCgGQAAgEACgDIAEgEIAHgCIAGgBIAUABIAXgCIAGABIAHADQACABABADIgBAHIgCAFIgDACIgIACIgCABIgBAFIABAJIABACIABABIABAAIACAHIAHALIABADIgCABIgBABIAAAAIACABIACABIABAAIAAACIACAKIAIASIADAJIADAAQABAAACgCIAFgJIAFgDIAAgCIgBgIIAAgDIADgGIABgIIAEgIIADgIIABgZQAAgDgDgBIgNgDQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAAgCIABgCIABgBIAAgCIAAgCIgBgCQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAIAFgDIAKgCIAPAEIACgBIADgEIABgBIACgBIAJgBIARABIAIACIAHAGQAAAFgCADQgDAEgEACIgIADIgJACQgFAAgCACIgDAIIgEAKIgHAMIACAGIgBAEIgCAFIgCAMIgDAIIgEAHIgFAaIgEAMIgHALIgDAAIgNAEgAAvgjIABADIAEACIABAAIAAgCIgDgCIgDgCIAAABgACrBnIgGgCIgKgBIgKgGQgKgEgGgFQgGgFgFgHQgFgGgDgIIgGgRIgCgMQgBgIAEgHIgCgIIABgHIADgKIAFgLQADgEACgBIADgCIAAgDIACgDIADgCIAlgOIALgBIAGAAIASAIIAIACIANAJIAFAFQADADAAADIAAABIAAACIAAgBIABABIACACIAAADIABACIAHAFIgCAEIADAIIAAALQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABIgHAEIgCADQAAAAAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIgDAAIgZgCIgwAEIgUAFIgFADIAAACQABAGAEAIQAFAHAGAFQAHAGAJAEQAIADAJAAIAJgBIAKACIAHgFIARgSIADgBIAKgCIADgBIAHABIABAGIgBAHIgDAFIgJAJIgHAFIgHADIgMAHIgeAGgAChgcIgBABIAAABIgBABIgLADIgLALIgHACIgCACIgDAHQgCACABADQAAABAAAAQAAABAAAAQAAABABAAQAAAAABABIAFACIANADIAKAAIAWgDIAcgBIAGgBIAFgCQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBIgCgGIgDgQIgBADIgBAAIgEgBIgDgBIgTgIIgKgCIgLAAIgBAAgAETBdIgEgDIgDgIIACgEIACgDIAEgDIALgCIAEgCIACgGIAAgQIgCgHIAAgCIAAgCIACgFIABgDIgDgJIABgIIgBgDIgBgEIABgEIgEgPQgBgFgCgCIgGgDIgNgDIgFgFQgCgCAAgGQgBgDADgDIAFgDIAHgCIAGAAIARACIAEABIADACIADADIABAEIABADIAEAJIACABIABgBIAAgCIACgCIAIgHIADgDIABgCIABgCIABgCIADgBIAAAAIAEgBIADgEIAGgDIAKgCIALgBIAKABIAKAEQAEACAEAFIAHAJIACAFIABALIAEAHIABAEIAAASIgCAPIADAHIgBAKIADAIIgBACIgBACIgBABIAAACIABAFIADADIAEADIAFABIADgBIADgBIAEACIADAEIACAEIABAEIgBADIgCADIgHACIgJgBIgGADIgIABIgBAAIgCAAIgKACIgQgBQgHAAgEgFQgEgEAAgHQAEgDAFgBIAKgCIALAAIgGgsIACgdIgBgEIgDgIIgBgEIgCgEIgDgEIgFgDIgKAAIgMACIgGADIgFACIgBACIgFAGIgCABIgDABIgCABIAAACIgCADIgBADIgCABIgBgBIgBAAIgBAAIAAABIAAAEIgCABIgBABIgBAAIAAABIAAADIgDAFIgBAEIACALIAAADIgBADIgBACIAAADIAAADIAEAHIABAEIAAAKIABAFIADADIAIACIAEABIAEAFIABgBQABAAAAAAQABAAABABQAAAAAAAAQABAAAAABIABAEIgBAIQAAAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAIgJADIgPACIgXAAgAGUAyIAAACIgCACIgBACIABACIACABIABgCIABgCIACgCIAAgCIgBgCIgBgBIgCACgAEpAWIAAABIADACIADACIADAAIACACIACgEIgCgFIgCgCIgCgBIgGACIAAAAgAGOAVIAAACIAAADQAAABABAAQAAAAAAAAQABABAAAAQABAAAAAAIACgBIABgEIAAAAIgBgDIgDgBQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAABgAn6ABIgDgDIgCgGIAAgEIgBgCIgBgCIAAgEIABgBIABgBIAAgCIgCgCIgDgBIgBgBIAAgGIgDgKIgCgJIAAgLIACgEIAFgCIALgBIAEABIAEAEIACAJIAAAeIgCAOIAAAKIgCADIgDADQgCAAgDgCgAnNAAIgEgCIgCgFIgBgIIAAAAIgIgsIABgFIADgFIAFgEIAGgBQAEAAAEABQACACABAFIACALIgBAQIAAABIgBABIgBAAIgBABIgBABIAAACIgBACIgBACIABAAIACABIABAAIABABIADAUIgCAFQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABAAAAIgEAAgAmlg1IgBgBIAAgBIAAAAIABgBIACABIACABIgBACIgCAAIgBgBgAHQg5IgDgEIgCgGIAAgFIgBgBIgBgCIAAgEIABgCIABgBIAAgCIgCgCIgDgBIgBAAIAAgHIgDgKIgCgJIAAgKIACgFIAFgBIALgBIAEABIAEAEIACAIIAAAfIgCANIAAAKIgCAFIgDADQgCAAgDgCgAH9g6IgEgEIgCgEIgBgJIAAABIgIgsIABgGIADgEIAFgEIAGgCQAEAAAEACQACACABAEIACALIgBARIAAABIgBAAIgBAAIgBABIgBACIAAACIgBACIgBABIABABIACABIABAAIABABIADATIgCAFQAAABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAIgEACg");
	this.shape_5.setTransform(55.8,16.3,1,1,0,0,0,0.5,0.6);

	this.text = new cjs.Text("\"Nickname\"", "30px 'Special Elite'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 261;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.text}]},1).wait(8));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.9,-4.3,211.6,33.3);


(lib.CharacterCardName = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(14));

	// Nickname
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AsRBoQAAgBgBAAQAAAAAAAAQAAgBgBAAQAAgBAAAAIABgEIACgCIALgEIADgDIABgDIACgNIABgBIgBgDIABgBIABgCIABAAIAAgBIAAgEIAAgCIABgBIABgBIABgBIgCgDIAAgDIAAgBIABgBIABgBIAAgCIgBgEIAAgBIACAAIABAAIAAgBIgBgBQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABIgBgBIgBgCIAAgCIACgCIABgCIAAgEIgCgHIAAgDIACgBIABgEIABgFIgBgDIABgGIADgFIADgWIACgCIADgDIAKgCIAGAAIACAEIAEAEIACADIAAAEIACAEIABADIAAAIIABAFIAGAPIAOA8IAAACIgBACIAKAKIALABQABABAAAAQABAAAAABQAAAAAAAAQAAABAAAAIAAACIgCACIgCACIgCAAIgBAAIgCAAIAAABIgBABIgBACIgBAAIgCAAIgCAAIgDABIgEABIgFAAIgHgCIgGgDQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBIACgDIAEgEIAEgFQACgDAAgEIgCgDIgFgGIgDgDIgCAAIgKACIgDAAIgCgCIgFADIgFABIgCABIgBABIAAABIgBADIgBACIAAADIgBABIgBACIAAABIAAACIAAAAIABACIACACIAFABIACACIADAGIABADIAAAAIgCAAIgWADIgRABgArjAEIgBABIgBAAIgBABIAAABIgBAEIgBADIAAAHIAAAKIgCAIIACAJIACACIADAAIALgCIAFgDQABAAAAgBQAAAAABgBQAAAAAAgBQAAAAAAgBIgBgCIgEgKIgDgQIgCgFIgCgEIgFAAIgBAAgAqcBjIgDgCIgBgCIABgCIAEgFIACgBIADAAIADAAIAFgBIAFgCIAEgFIABgFIgBgFIAAgKIgCgOIgBgRIgDgLQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIgMABIgFgBIgEgCQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAIAAgEIACgDIAGgBIADAAIAQgCIAIABIADACIAEAGIADABIACAAIADgEIACgBIAEgBIADgCIADgCIALgBIAEgCIACgBIAHABIAGACIAHACQACACAAADIAFAJIABAEIAAADIgFAJIgBgBIgMACQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBIgDgDIgCgFIgBgEIABgGIgBAAIgCAAIgBABIgEgBIgDABIgEADIgDAEQgBAAAAAAQgBABAAAAQAAAAAAABQAAAAAAAAIgHAEIgEAGIgCAIIgDAEIgBAFIADAOIAAAJIABAEIADADIAIABIAJgBIABACIAAABIAAADIAAABIADgBIABgCIABABIABAAIAAABIgBABIgBABIAAACIAAACIgBABIgBABIgDgBIgCgBIgCgBIgBgBIgBABIgCABIgBAAIgBABIABABIABABIgBABIgBABIgBAAIgCAAIgPAAIgHACIgCgBIgBgBIAAAAIgCgBIgEABIgDABIgHACgAolBdIgDgDIgBgDIgBgCIABgDIABgCIADgCIAEgBIADAAIADgBIACgFIAAgKIgBgEIgBgBIAAgCIABgCIABgDIgCgHIABgEIgBgFIAAgEIgCgLIgDgFIgMgDIgEgEIgBgFQAAgBAAAAQAAAAAAAAQAAAAABAAQAAgBAAAAIAEgCIAJgBIALABIACABIAEACIABACIABACIABADIACAEIABgBIABgCIABgBIAFgEIACgCIABgBIABgBIAAgBIACAAIAAAAIACgBIADgCIAEgDIAHgBIAHgBIAHABIAGADQADABADADIACADIADACIABACIAAAFIACAFIABACIABARIgBAKIAAACIABADIAAAHIACAEIgBABIAAABIgBACIgBABIACADIACACIACADIADAAIACAAIACgCIADACIACACIACADIAAADIAAACIgCACIgCABIgCAAIgDgBIgDABIgKACIgBAAIgBAAIgHACIgKgCQgFAAgDgDQgDgCAAgFQADgCADAAIAPgCIgEgcIABgVIAAgDIgCgDIgBgGIgCgCIgCgDIgDgCIgKAAIgJAEIgDACIgBABIgBABIgCACIgBABIgCABIgCABIAAABIgBACIgBABIgBABIAAAAIgBgBIgBACIAAADIgBABIgBAAIgBAAIABACIgBACIgCAEIgBACIACAHIAAACIgBACIgBABIAAACIADAHIABACIgBAHIACAEIABABIAIADIAEACIAAAAQABAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAIAAADIAAAFQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAIgGACIgZACgAnPBAIgBABIgBACIAAABIABABIABAAIABgBIAAgBIABgBIABgBIgBgBIgBgCIgBACgAoXAuIACACIAEABIACABIABgCIgCgEIgBgBIgBgBIgCABIgCAAIgBAAgAnTAsIAAACIAAADIACAAIABAAIABgCIAAgBIgBgCIgCgBIgBABgAl9BVIgIgCIgGgBIgIgGIgLgFIgEgEIgEgEIgHgKIgBgFIABgRIAAAAIgBgBIAAgBIgBAAIABgDIABgHIABgDIABgBIAAgBIAAgDIABgCIAAAAIABAAIABgCIADgGIAOgKIANgEIAQgCIAMABIAMAFIAAAAIgBAGIAAABIADAAIADgBIACABIADABIACABIAIANIABACIABAHIgBADIgDAHIAAABIABABIABAAIAAgBIgBgDIAAAAIABgBIABABIABABIABACIAAAAIAAAFIgBACIAAABIgBAAIACAFIgBABIgBAAIgBAAIABAGIAAAEIgCABIgBABIAAABIgBACIgDAEIgGADIgBAAIABACIAAACIgBACIgLAIIgEACIgCgBIgDgBIgDABIgEACIgCAAIgCAAIgDgBgAmQAFQgFADgDAEIgFAJQgCAGAAAFIADAQIADADIAAADIABABIACAAIABABIAEAEIAOAJIAPAAQADAAADgCIAEgFIACgDIAHgHIABAAIADgDIABgBIgBgCIAAgEIABgDIACgCIABgBIADABIACABIAAgCQAAAAAAgBQAAAAgBAAQAAAAAAgBQAAAAgBAAIgCgBIgDAAIgCgBIAAgBIgCgKIgGgQIgCAAIgDgBIgDgBIgDgBIgWAAQgGAAgEADgAk8BPIgDgBIACgKIAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQAAgBAAAAIAAAAIABAAIABgBIAAgBIAAAAIAYgCIAJgCQAEgBADgCQACgDAAgFIgGg0IABgHIADgGIgBgBIAAAAIgCgBIgBAAIAAgBIgBgEIgBgDIABgLIgBgDIgCgEIgBgBIABgCIgBAAIgCABIgBABIgBABIgBABIgBAAIgEABIgZgBIgFgDIAAgBQAAgFADgDQADgCAFAAIARAAIANgDIAHABIAFADIABAAIAAABIACADIABAEIAAABIACAIIgBAJIACAMIgBAJIABAEIADAFIAAACIAAAFIgBADIACAHIAAADIgBAEIgBABIAEAWIABADIAAACIAAAHIAAACQAAABABAAQAAAAAAABQAAAAABAAQAAAAAAAAIAEgCIACgCIAEAAIAKAAIALgCIADAAQAEgBADADQADABAAAFQAAADgBACIgGAEIgNACIgFAAIgGgCIgDAAIgGABIgCAAIgBgBIgBgBIgBAAIgBAAIgBABIgCACIgCAAIgIAAIgIACIgBgBIgBAAIgEAAIgDACIgCAAIgCgBIgEACIgIABgAkQgaIABAEIABABIABgBIAAgCIAAgCIgCgBIAAAAIgBABgAkXgzIgBABIABABIAAAAIACgBIABgBIgBgBIgBgBIgBACgAinBGIgNgFIgHgFIgHgFQgCgEgBgCIAAgDIgEgFIgCgCQgCgEgBgEIgBgIIAAgIIAFgXIAHgGIABgBIAAgCIABAAIABgBIACAAIAAgBIABgBIAAgBIACgBIACgBIACAAIAKgFIAEgBIAUAEIAGABQABAAAAgBQABAAABAAQAAAAAAAAQABgBAAAAIADgEIAAgDIgCgUIgBAAIgBAAIgCgBIgBgBIgCgBIgBABIgBABIgCABIgHAAIgDgBIgDgCIgDgCIgBgDIAAgDIACgCIADgCIADgBIAFABIAIgDIAIACIAKgBIAEABIAAABIABAFIABADIAAAFIgBAEIAGBYIACAHIAFAGQACACAEAAIACAAIACgBIACABIACABIABADIABADIgBACIgCABIgEAAIgBAAIAAACIgCACIgFABIgJgBIgDABIgGgDIAAgDQAAAAAAAAQAAgBgBAAQAAAAAAAAQAAAAgBAAIgBAAIgBAAIgBgBIgDABIgCAEIgBABIgCABIgHADIgFACIgIAAgAi7AhIACACIAFALIADADIAIAEIAIADIANgEIACABIAFgHQADgEAEgBIgBgCIADgaIgBgJIgDgFIgEgFQgDgDgEAAIgHgDIgCAAIgEAAIgBACIgCAAIgDAAIgDAAQgFABgEADIgGAGIgEAJIgBAJIABAHIAAACIgDADIgBACIABAAgAgNA6IgEgCIgDgDIgBgEQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAIAEgEIACgBIACgBIACgBQAAgBAAAAQAAAAABAAQAAgBAAAAQAAgBAAgBIABgGIgEgnIAAgSIAAgDIgCgDIABgEIgCgMIABgEIgBgGIgCgEIgEAAIgKAAIgFgCIgBgDIABgFIACgDIAEgCIAVgEIAPAAIAEABIACADIABAFQAAAEgCACQgBACgEAAIgEABIgDABIgDAGIAAACIACAHIgBAHIAAABIABACIAAACIABAIIAAAIIACABQAAgBABAAQAAAAAAAAQABAAAAgBQABAAAAgBIAHgNIACgFIADgDIANgPIABgFIgBgCIgEgIIgBgDQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBIAFgCIAKgBQAIgBAHACIAOADQAAAEgCABIgHAEIgEAAIgEACIgEADIgIALIgEADIAAABQAAADgBACIgIANQgBADAAAFIABAFIACAGIACAEIAFACIAAADIACAGIABACIABABIABABIAAAAIAAABIACABIABABIAAAEIABABIACAAIABABIAAAEIAIAQIADAEIAEADIAGAAIAJAFIABABQAAAAAAAAQAAABAAAAQgBAAAAAAQgBAAAAABIgFABIggADIgFgBIgBgCIABgCIABgFIACgDQABAAAAgBQAAAAAAAAQABAAAAAAQABAAAAAAIACgBIAAgDIgBgEIgGgJIgDgHIgEgEIgBgFIgBgCIgDAAIgBgCIgCgDIgCgBIgBAAIgBgDIgBgEIgDgCQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAAAgBAAIgCABIgFAHIgDACIAAABIABAEIgBADIgBAFIgBACIADANIgBAEIABACQAAAEABABIAEADIALADIABADIAAACIgCADIgCACIgDABIgFABIgDgBIgJAEIgGABgABeA1IgDgDIgBgCIgBgCIABgEIABgBIADgCIAEgBIADAAIADgCIACgEIAAgKIgBgFIgBgBIAAgCIABgBIABgDIgCgHIABgDIgBgEIAAgFIgCgLIgDgEIgMgEIgEgDIgBgGQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAIAEgCIAJgCIALABIACABIAEAEIABACIABACIABAEIACADIABgBIABgBIABgBIAFgFIACgCIABgBIAAgBIABgCIABAAIABAAIACgBIACgDIAFgCIAGgBIAIgBIAGABIAHACIAFAFIADAEIACACIABADIAAAFIACAFIACACIAAARIgBAIIACAEIgBAHIACAFIAAABIgBABIgBABIAAACIABADIACACIADACIADABIAEgCIACABIADACIABAEIABACIgBACIgBADIgDABIgCAAIgDgBIgDABIgJACIgBAAIgBAAIgHABIgLgBQgFAAgDgDQgCgCAAgFQACgDAEAAIAOgCIgEgcIACgSIgBgDIgCgEIgBgFIgBgDIgCgCIgEgCIgJAAIgKADIgDACIgBABIgBACIgBACIgCABIgCAAIgBABIgBABIgBADIAAABIgBABIAAAAIgBAAIgBABIAAACIgBABIgBAAIgBAAIABADIgBACIgCADIgBABIACAGIAAACIgBADIgBABIAAACIADAHIABACIgBAHIACADIABABIAIAEIADACIABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAIABACIgBAGQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABAAAAIgGABIgTADgAC0AYIgBABIgBACIgBABIABACIACAAIAAgBIABgBIABgCIAAgBIAAgBIgCgBIAAABgABvAEIgCAAIgBAAIAAADIACABIAEACIACABIABgDIgCgDIgBgBIgBgBgACwAFIgBABIABADIABABIACgBIAAgCIAAgBIAAgBIgCgBIgBABgAD6AvIgCgBIgDgFIgCAAIgCAAIgCAAIgCgFIgHgHIgCgyIgCgKIgDgDIgEABIgJgBIgEgDIgDgCIgBgDQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAgBIAFgCIAGgCIAFgBQAFAAAFABIAJAEIABABIABALIAAAJIABAEIAAACIAAACIACAMIAAAFIgDAOQAAACACAEIAEAFIAHADQADABADAAIAFAAIAFgEIACgBIAFAAIACgDIAGgDQAAAAABgBQAAAAAAAAQAAgBAAAAQAAgBAAgBIAAAAIABAAIABAAIABAAIAAgBIABgBIACgEIABgDIABgDIAAgCIgBgDIgBgDIABgHIgCgFIAAgBIABgBIAAgCIgDgEIAAgCIAAgCIAAgCIgBgDIgEgDIgKAAIgDgCIgDgDIAAgDQAAAAAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAIAFgCIAKgCIAHAAIAGgCQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAIACADIADALIAAAMIACAPIAAACIgBABIgBAEIAAACIACAFIgBABIAAAAIABAFIAAAIQAAAEADACQADACAFAAIAEgBIACADIADABIACADIABAEIgBADIgCAEIgEADIgEABIgPgBIgDAAIgDgBIgDgDIgBgEIgDgCIgSALIgJADIgLACgAF7AlIgNgGIgHgEIgHgGQgCgDgBgDIAAgDIgCgCIgCgCIgCgDQgCgDgBgDIgBgIIAAgHIAFgZIAHgHIABgBIAAgBIABAAIABgBIACAAIAAgCIABgBIAAgBIACgBIACAAIACAAIAKgFIAEgBIAHAAIAGADIANABQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAIADgEIAAgEIgCgTIgBAAIgBAAIgCgBIgBgCIgCAAIgBAAIgBACIgDABIgGAAIgDgBIgDgCIgDgDIgBgCIAAgDIACgDIADgCIADgBIAEABIAIgCIAJABIAKAAIAEABIAAAAIABAGIABACIAAAGIgBAEIAGBYIACAHIAFAFQACACAEABIACAAIACgCIACACIACABIABADIABACIgBADIgCABIgEAAIgBAAIAAACIgCABIgFAAIgJAAIgDABIgGgDIAAgCQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAgBgBAAIgBAAIgBAAIgBgBQAAAAgBABQAAAAgBAAQAAAAAAAAQgBABAAAAIgCADIgDACIgIAEIgEACIgIAAgAFnAAIACACIAFALIADACIAIAFIAIACIAMgDIADABIAEgIQADgDAFgCIgBgCIADgYIgBgIIgDgIIgEgFQgDgDgFABIgGgEIgCAAIgEABIgDACIgDgBIgDAAQgFABgEAEIgGAHIgEAKIgBAJIABAHIAAACIgDACIgBACIABAAgAHVAhIgBgDIgBgCIgCgDIgBgDIABgSIgCgEIgBgCIgBgBIABgCIACgEIACAAIABAAIADACIACABIABAAIAEAIIAGAHIACACIABABIAEABIACgBIACAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABIAAAAIACAAIAPgCIADAAIAEABIAIgIIAEgBIAAgBIAAgCIABgBIABgBIABgCQAAgBAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBIgEgEIgGgEIgMgDIgFAAIgFABIgEABQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAAAAAIgGgCIgCgCIgEAEIgFAAIgFAAIgEgCIgCgEIgCgEIgBgDIgCgDIgBgDIAAgCIAAgHIABgEIABgCIADgDIABgDIABgCIACgBIABgBIABgBIAAgBIABgBIAEgBIAFgBIAagCIAKADIAEAAIADgCIACACIACAAIABAAIAAgCIADABIAEAFIABADIAAAOIABAIIgDABIgCACIgCgBIgCgCIgDgBIgCAAIAAAAIgBgBIAAAAIABgFIgBgBIgFgEIgBgBIgCgBIgEgBIgCgBIgFACIgLgCQgDgBgEAAQAAAAgBABQgBAAAAAAQgBAAAAAAQgBABAAAAIgDAGQgBABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAIgBAAIACAGIAFAHIAFACIABABIABABIACABIAAgBIAEAAIACgBIAFAAIACAAIADAAIABAAIABAAIAGAAIAKAAIAEACIAEACIAKAKIACADIACAJIAAACIgCADIAAACIgCAEIgDAFIgEADIgEAFIgDABIgEAAIgCABIgBABIgHACIgCABIgJgCIgDABIgEAAIgDAAIgFgCIgDAAQgDABgCABIgHAHQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAgAJXAWIgHgFIgLgFIgHgIIgGgHIgEgLIgBgIQgBgGADgEIgCgGIABgFIAGgOIADgFIACgBIABgCIABgBIABgCIATgIIANgCIAFAAIAEACIAHADIAGABIAEAEIAEACIAEAEQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAABIAAABIAAgBIABABIABADIABACIAEADIgBADIACAGIAAAEIAAAEQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAIgCABIgDACIgBACIgBABIgBAAIgRgBIggADIgIABIgFABIgDACIAAACQAAAFADAEIAHAGIALAGQAFADAGgBIAGgBIAGACIAFgEIAMgJIACgBIAGgCIACAAIAFABIAAAHIgCADIgIAIIgHADIgGAEIgDABIgTADgAJag+IgBABIgHADIgGAFIgEACIgCABIgCACIgBAEIgBAFIABACIAIAEIALABIAPgDIASgBIAEgBIADgBIABgCIgDgQIgBABIAAAAIgDAAIgCgBIgNgGIgOgBIgBAAIgBAAgAKmARIgCgDIgCgBIAAgDIAAgDIACgDIADgBIAHgBIADgBIABgDIAAgKIgBgEIgBgCIABgBIABgCIABgDIgCgHIAAgFIgBgEIAAgFIgCgKIgCgEIgNgFIgDgCIgBgGQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAIADgCIAPgCIAFACIADABIACABIACACIABACIAAADIABADIADAEIABgCIAAgBIACgBIAFgFIACgCIABgBIAAgBIABgBIABgBIABAAIAEgEIAFgCIAGgBIAIAAIAGAAIAHACIAFAGIADADIACACIABADIAAAFIACAFIACACIAAARIgBAKIABACIABADIgBAGIACAGIAAAAIgBABIgBABIAAACIABADIACADIADABIADABIACgBIACgBIACABIADABIABADIABADIgBACIgBACIgDABIgCAAIgDAAIgDAAIgJACIgBAAIgBAAIgEAAIgDACIgLgCQgFAAgDgCQgCgEAAgEIAGgDIAOAAIgEgcIACgUIgBgDIgCgDIgBgFIgBgEIgCgCIgEgBIgJAAIgFAAIgIAEIgBABIgBADIgBABIgCABIgCAAIgBABIgBABIgBADIAAACIgBABIgBgBIgBAAIgBABIAAACIgBABIgBAAIAAAAIAAADIAAACIgDADIAAACIACAIIAAACIgBACIgBABIgBACIAEAHIAAACIAAAHIABADIACABIAIACIADACIABAAQAAAAAAAAQABAAAAAAQAAABABAAQAAAAAAAAIABADIgBAFQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAIgGACIgGABIgTABgAL9gKIgBACIgBACIgBABIABABIACAAIAAgBIABgBIABgCIAAgBIAAgBIgCgBIAAABgAK1gbIABABIACACIADAAIABABIABgDIgBgDIgBgBIgCgBIgCABIgCAAIAAAAgAL5gdIgBACIABADIABABIACgCIAAgCIAAgBIAAgBIgCgBIgBABg");
	this.shape.setTransform(80.9,10.2,1,1,0,0,0,-0.4,-1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AtpBjQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAIABgEIACgCIALgFIACgCIACgDIACgNIABgBIgBgDIABgBIABgCIABgBIAAgBIAAgDIAAgDIABgBIABgBIAAgBIgBgCIAAgDIAAgBIAAgBIABgBIAAgCIgBgEIABgBIABgBIABAAIABAAIgCgBQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIgCgBIAAgBIAAgCIABgCIABgCIAAgEIgCgIIABgCIABgBIACgFIAAgEIAAgCIABgIIADgEIADgXIABgCIAEgCIAKgCIAGAAIACADIADAFIACADIABAEIACAEIABACIAAAJIABAEIAGAPIAOA8IAAADIgBACIAKAKIALABQABAAAAABQAAAAABAAQAAABAAAAQAAAAAAABIgBACIgBACIgCACIgCAAIgBAAIgCAAIgBABIAAABIgBABIgCABIgBAAIgCgBIgEACIgDAAIgFAAIgHgBIgGgDQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBAAAAIACgEIAEgDIAEgGQACgCAAgEIgCgDIgFgHIgDgCIgCgBIgLACIgCAAIgCgCIgFADIgFACIgCABIgBABIgBABIgBACIAAACIAAAEIgBABIgBABIgBACIABABIAAABIABACIACACIAFABIABACIAEAGIABACIAAABIgCAAIgWADIgSABgAs7AAIgBABIgCAAIgBABIAAABIAAAEIgBADIgBAHIABAKIgCAIIABAIIACADIAEAAIALgCIAFgDQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBIgBgCIgEgLIgDgPIgCgFIgDgEIgEAAIgBAAgArvBiIgKgBIgDgBIACgKIAAgBQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAIAAgBIABAAIABAAIAAgBIAAgBIAXgBIAJgCIAHgEQACgCAAgFIgGg3IABgGIADgGIgBAAIAAAAIgBAAIgBAAIgBgBIgBgFIgBgCIACgLIgBgDIgDgEIgBgBIABgCIgBAAIgCABIAAABIgBABIgBABIgCAAIgEAAIgZgBQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAgBIAAgBQgBgFADgDQAEgDAEAAIAHABIALgBIAJgCIADgBQAEAAADABIAGADIAAAAIABACIABADIABADIAAACIACAIIgBAJIACAMIgBAHIABADIADAGIABAEIAAAFIgBACIACAIIAAADIgBAEIgCABIAEAWIABADIAAACIAAAHIAAACQABABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIADAAIACgBIABgCIAEgBIAKABIAOgDQAFAAADACQACACAAAEQAAAEgBACQgDACgDABIgNADIgEgBIgHgCIgCAAIgHABIgCAAIgBgBIgBAAIgBgBIgBABIgBABIgBABIgDABIgIgBIgIACIgBAAIgBAAIgEAAIgFACIgCgBIgHACgArNgIIAAAEIABAAIABgBIAAgCIAAgBIgBgBIgBAAIAAABgArVgiIAAABIAAABIAAAAIACAAIABgBIgBgBIgBgBIgBABgAprBVQgEgCgDgDIgBAAIgBABIgCACIgBAAIgBgCIgCABIgBABIgBABIgEABIgBgCIABgDIgBgDIAAgFIABgCIgEgLIABgIIAAgBIgBgBIAAgBIAAgBIAAgDIAAgBIAAgDIgBgDIABgLIgCgNIABgFIABgDIgBgGIgDgKIgBgLQAAgFgCgCQAAgBAAAAQgBgBAAAAQgBgBAAAAQgBAAAAAAIgLgBIgFgCQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAgBQgBgDACgCIADgCIAFgBIAEgBIAUABIACABIAAACIAAAFIAAANIABADIAAALIADAKIADABIACAAIADgFIAMgCIAEgDIABAAIADAAIAFACIALABIADACIADABIABAAIACABIAGADIAFADIAEAMIAEAHIAEAFIABAFIgBADQAAAAAAAAQgBABAAAAQAAAAgBAAQAAABgBAAIACADQAAAAABABQAAAAAAABQABAAAAABQAAAAAAABIgBAFIgBADIgBACIgFANIgIAMIgBACIgIABIgEAEIgFABIgBAAIgCgBIgCgBIgCgBIgDACIgJACIgDAAIgCAAQgDAAgDgCgApfBHIADABIAEAAIAJgBIADgCIACgCIAEgEIAIgFIACgEIABgHQACgEgBgDIgBgFIACABIADABIABgBIgBgCIgFgCIAAgBIABgBIABgBIgGgNIgBgCIgDgCIgBgBIgBAAIgBgCIgCgCIgCgBIgCgBIgLgDIgGAAQgHAAgEACQgFADgDADQgCAFgBAFQgBAFAAAGIgDASIAAACIABABQACACABACIAAAEIABADQABABAAAAQAAAAAAABQABAAAAAAQABABAAAAIADAAIABABIADAEIAIgCIABACgAn3BQIgHgFQgHgCgEgDQgEgEgDgEIgGgJIgEgLIgBgJQgBgFADgFIgCgFIABgFIAFgNQACgDACgBIACgBIAAgCIABgCIACgBIADgBIAPgHIAOgCIAEAAIAFABIAHAEIAFABIAEADIAEADIAFAEQAAAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAAAIAAAAIABAAIAAAAIABADIABACIAEADIgBADIADAGIAAAEIgBAEQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIgDABIgDACIAAACIgBABIgCgBIgRgBIgoAFIgIADIAAABQABAFADAFQADAEAEAEQAFAEAGACQAFACAFAAIAHAAIAFABIAGgEIALgLIACgBIAGgCIACAAIAFAAIABAJIgCAEIgJAHIgHAEIgGAEIgOAEIgIABgAn0gEIgBABIgHACIgGAEIgGADIgCABIgCAFIgBAFIABACIAFACIADABIAMABIAOgCIASgBIAFgBIADgBIAAgCIgDgQIAAABIgBAAIgDAAIgCgBIgMgEIgPgBIAAAAIgBAAgAmsBLIgCgCIgBgCIABgCIADgFIACgBIAEAAIACAAIAGgBIAFgDIAEgEIABgFIgBgFIAAgKIgDgOIAAgRIgDgJQAAAAgBgBQAAAAAAAAQgBgBAAAAQgBAAAAAAIgNACIgEgBIgEgCQAAAAgBgBQAAAAAAAAQAAgBAAAAQgBgBAAAAIAAgEIACgDIAGgCIADABIAQgCIAJABIACABIAFAHIACABIACgBIACgBIACgCIACgBIADgBIAEgDIADgCIALgCIAEgCIACgCIAHABIAGADIAGADQADADAAADIAFAJIABAEIgBACIgEAIIgCgBIgLABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBIgDgEIgCgDIgBgEIABgGIgBAAIgCABIgBABIgCgBIgCgBIgDACIgFACIgDAEQAAABAAAAQgBAAAAABQAAAAAAAAQAAAAAAAAIgEAAIgEADIgDAGIgDAHIgDAFIAAAFIADAOIAAAJIABAEIADADIAIABIAJgCIABACIAAABIAAADIAAABIACAAIABgDIACABIABABIgBABIAAABIgBABIAAACIAAABIgBABIgBABIgDAAIgDgBIgBgCIgCAAIAAAAIgDACIgBABIABABIABABIgBABIgCABIgBAAIgBAAIgPAAIgHACIgCgBIgBgBIgBgBIgBAAIgOADgAkVBEIgBgCIgDgCIgDAAIgBgCIgBgHIgBgBIgEgBIgCgDIgBgDIgBgGIgEgEIAAgCIgBgNIABgHIACgEIAAgBIgCgDIADgFIAAgIIgBgCIgFgCIgKgBQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAIgDgDQAAgBgBAAQAAgBAAAAQgBAAAAAAQgBgBAAAAIgDAAIgBgDQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAIAEgDIAIgDIADgBIAHgCIACgCIACgEIgCgPIABgHIADgGIACgBIADgDIABgBIABAAIABABIADADIADARIAAAEIgBAEIAEAHIABACIANACIATgBIACABIACABIACAAIADABQAAAAAAABQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQAAAAAAAAQgBABAAAAIgDADIgEABIgPAAIgIACQgFABgBACQgDACgCAEIgBAIIAEAZIAGASIAEAFQACACAEgBIAJgCIAEgCQAAgBAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAIgCgHIABgCIABgCIACgCIACgBIAFgEIAFgCIADAAIADACIAAAKIgDAQQgBAFgCADIgGAGIgIADIgKACIgSACgAibA5IgDgCIAAgDIAAgCIAEgEIADAAIABAAIACgBIAAgBIACgBIABgBIABAAIACAAIACAAIACgEIABgEIAAgMIgCgOIgBgyIgBgMIgEgJIgDgDQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAAAAAAAIgBAAIgCAAIgCAAIgBgCIgBgDQAAgEACgBIAEgDIAVgDIAPABIAGgBIAFgCIADgBIAUACIAGACIAEADQACACABACIABAEIAFAEIABACIAAABIgCABIACABIABABIACACIAAACIAAADIgBACIAAABIACgBIAAAEIAAALIgCAHIgCACIgCAAIgCACIgBABIgBAEIgFAGIAAADIACAFIAEAIIACAQIAHAOIACACIADgCIACgGIACgDIAJADIACAEIAAAHIgBACIgBACIAAAEIAAABIgBAAIgBAAIAAABIgBABIAAAAIABABIgBABIgHADIgDAAIgHgBIgHgCQgEgBgCgDQgCgDgCgEIgBgIIgDgJIABgCIAAgBIAAgBIABAAIgBgDIgDgNIgBgCIgHgIIgLAAIgJACIgFgBIgGADIgCACIgBADIAAACIAAARIAAAFQAAAEACACIADAEIAQAFQAAABAAAAQAAAAABABQAAABAAAAQAAABAAAAIAAAEIgDADIgDACIgJADIgOAAIgNACIgHABgAhvgbIAFACIACABIABAAIAJgFIAJgCIACgBIAJgMIABgEIABgEIgDgGIgEgHIgDABIgBgBIAAgBIgCgBIgGgCIgGgBIgFABIgJAAIgKACIgEACIgDADQAAAAAAABQgBAAAAABQAAAAAAABQAAAAAAABIACAMIgCAMIACAGIADACIADABIAIgCgAgIAvQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAgBIAAAAIgBABIgCAAIgDgBIgGgFIgDgFIgCgFIABgCIABgBIgCgFIACgIIADgIIADgDIAEgCIADAAIAEgDQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIALgCIAEABIADgBIACgCIAFgCIANgFIAEgDQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAAAIgCgHIgFgGIgHgEQgDgCgDABIgBAAIgBAAIgLACIgDADQgCABAAAEIABAIIgBAEIgCAEIgEACIgGABIgEgBQgBAAAAgBQgBAAAAAAQgBgBAAAAQgBgBAAAAIgDgFIgBgFIABgEIADgKIABgFIADAAIASgJIAIgBIASACIAIADIAGAFIAEAGIACAGIADAOIAAAQIAFAcIABADIABABQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABgBIADgGQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAIAEABIABABIABABIgBADIgBADIAAADIAAABIgBACIgIAEQgDACgEAAQgCABgEgCIgLgGIgCABIgDADIgGABIgJAEIgIACIgQABgAAmgDIgHADIgFABIgNACIgDABIgNAEIgBABIgBABIAAACIgGAEIgCAEIgBAEQAAABAAAAQAAABAAABQABAAAAABQAAAAAAABIAFADIAEACIAFACIAKAAIALgCIAHgCIAEgEIACgEIACgBIACgFIABgEIABgLIgBgCIgBgDIgBgCgABcAvIgBgEIgBgCIgDgCIgBgDIABgTIgDgHIgBgCIABgBIACgEIACgBIACABIACACIADAAIAEAKIAGAHIACACIACABIABABIACAAIACgBIACAAQAAAAABAAQAAAAAAABQAAAAAAAAQABAAAAAAIAAABIAQgDIADAAIAEABIADgCIAFgFIAEgCIABgBIgBgDIABgBIABgCIABgCQAAgBAAAAQAAgBAAgBQgBAAAAgBQgBAAAAgBIgEgCIgFgDIgHgCIgKgCIgGABIgEACQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgGgCIgCgBIgEADIgEABIgGgBIgDgCIgDgEIgCgEIgBgDIgCgDIgBgCIAAgDIAAgHIABgEIABgCIAEgCIABgDIAAgCIACgCIABAAIABgBIAAgBIABgBIAFgCIAZgDIAFABIAIACIACAAIAEAAIADgBIACABIACAAIABAAIABgCIACACIAEAEIACADIgBAPIACAHIgEABIgCADIgCgBIgCgCIgDgCIgCAAIgBgBIAAAAIABgEIgBgBIgFgFIgBAAIgCgBIgEgCIgCAAIgFABIgEAAIgHgBIgGgBQgBAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBABIgCADIgBADIgDACIgBAAIADAFIAEAHIAFACIABABIABABIACABIAAAAIAGgCIAGABIAEgBIABAAIABAAIAGABIAGgBIAEABIAFABIANANIACACIADAHIgBACIgCAFIAAADIgCAEIgLAMIgCACIgDAAIgCgBIgCABIgBABIgCABIgCABIgFACIgJgCIgHABIgCAAIgGgCIgDAAQgDAAgCACIgGAGQgBABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAgADAAnIgBgCIAAgEIABgEIAIgHQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAIAAgCIgBgBIACgEIgDgLIgBgDIABgXIgCgKIgCgDIgDgCIgHgEIgBgDIABgDIAEgDIACgBIAAgBIABAAIAGAAIANAEQABAAAAAAQABgBAAAAQABAAAAAAQABgBABAAIAEgDIAGgDIAIgCIADABIAHAEIACACIAGgEIANgGIAHgBQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABIAEADIADAFIAGAOIAAABIAAABIAAADIgCAIIACADIAAACIgBADIAAADIABAEIABADIAAADIgBADIgBAFIAAAAIAAAAIAEAJIAEAEIAJAHQAAAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAACIgBAFIgCABIgEAAIgOACIgDAAIgJgCQgBAAAAgBQgBAAAAAAQgBAAAAgBQAAAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIABgFIADgDIACgFQACgEAAgEIgEgmIgCgIIgDgDQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIgEADIgDAEIgBAEIgEAXIADAZIAAACIAGADIACACIABADQAAADgCACQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAIgCAAIgBAAIgBAAIgFACIgNAAIgCgBIgDgEIAAgBIABgDIACgCIAEgEIACgJIgDgJIAAgKIgBgHIABgCIAAgCIAAgCIgBgFIAAgKIgBgCIgBgCIgFgBIgDABIgHAGIgBAEIgCABIgDACIAAABIAAACIABAAIACAEIAAAEIgCAGIABAMIABABIABAAIABABIAAACIABAHIAAAIIABADIABACIAFABIACABIAAADQAAAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAIgCACIgeAGgAFjAeIgBAAIgEgFIgCAAIgCAAIgBgBIgCgEIgIgIIgCgyIgCgKQAAAAgBgBQAAAAAAAAQAAgBgBAAQAAAAgBAAIgNAAIgEgCIgDgDIAAgDQgBgBAAAAQABgBAAgBQAAAAAAAAQABgBAAAAIAGgEIAFgCIAFAAQAGgBAEACQAFABAFADIAAABIABAOIAAAGIABAEIAAACIAAACIACAMIAAAFIgDAQQAAABACACIAFAGQADACADABQADABADAAIAGgBIACgBIACgCIACgBIADAAIACgBIACgDIAGgCQABAAAAgBQAAAAAAAAQABAAAAAAQAAAAgBgBIAAAAIABgBIABABIABAAIABgBIAAgBIACgDIABgEIABgEIAAgDIgBgDIAAgDIAAgIIgCgEIABgCIABgBIgBgCIgBgCIgBgBIgBgCIAAgCIABgCIgCgCIgCgCIgCgCIgKAAIgDgCIgDgDIAAgDQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAgBIAGgCIAJgCIAEAAIAGgBIADgBQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAIACAEIADAJIAAAMIADAPIgBACIgBACIgBAEIAAACIACAFIgBABIAAABIACAGIgBAIQAAACADACQAEACAEAAIAEgBIADADIACABIACADIABADIgBAEIgCADIgEAEIgEABIgPgBIgDgBQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBIgDgDIgBgDQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAIgRAKIgJADQgFABgHAAgAHGAZIgBgEIgBgCIgCgCIAAgEIABgQIgCgGIgCgCIgBgBIABgCIADgDIABgBIABABIADABIADABIAAAAIAEAKIAGAFIACACIABABIAEABIACgBIACAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAABAAAAIAAAAIACAAIAPgCIADAAIAEABIAIgFIAEgCIAAgBIAAgDIABgBIABgCIABgCQAAgBAAAAQAAgBAAgBQgBAAAAgBQAAAAgBgBIgDgEIgHgDIgLgEIgGAAIgEABIgFACQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAAAIgGgCIgCgCIgEAEIgFABIgEgBIgFgCIgCgEIgCgEIAAgDIgDgDIgBgCIAAgDIAAgHIABgEIABgCIAEgDIAAgDIABgCIACgBIABAAIACgBIAAgBIABgBIADgCIAFgBIAbgCIAKADIADAAIADgCIACACIACAAIABAAIABgCIACABIAFAFIABADIgBAPIABAHIgCABIgDADIgCgBIgCgCIgCgCIgDAAIAAAAIgBgBIAAAAIABgFIgBgBIgEgEIgCgBIgCAAIgEgCIgBAAIgGABIgLgBQgDgCgEABQAAAAgBAAQgBAAAAAAQAAAAgBABQAAAAAAAAIgEAHQAAAAgBAAQAAABAAAAQgBAAAAAAQAAAAgBAAIgBAAIACAGIAGAHIAEACIABABIACABIABABIABAAIAFgCIAGABIABAAIADgBIABAAIABAAIAGABIAKgBIAFACIADADIALAJIABADIADAJIgBACIgBAFIgBACIgBAEIgEADIgEAEIgEAEIgCABIgEAAIgDABIgBABIgHADIgCAAIgJgBIgDABIgHAAIgFgCIgDAAQgDAAgCABIgGAHQgBABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAgAIuASIgBgDIgBgCIgDgCIAAgEIABgRIgDgHIgBgBIABgCIACgEIABAAIACAAIADACIACAAIAFAKIAFAIIACABIACABIACABIABAAIACAAIACAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAABIAAAAIABAAIAPgCIAEAAIADABIADgCIAFgGIAEgBIABgCIgBgDIABgBIACgBIAAgDQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgEgEIgFgEIgGgCIgLgBIgGABIgEABQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAAAAAIgFgCIgDgCQAAABgBAAQAAABAAAAQgBAAAAABQgBAAgBAAIgEACIgFgBIgEgCIgDgEIgCgFIAAgDIgCgCIgBgCIAAgDIAAgHIABgEIAAgCIAEgDIABgDIABgCIACgBIABgBIABgBIAAgBIABgBIAEgCIAZgCIAFAAIAJADIABAAIAEgBIADgBIACABIACABIABgBIAAgBIAEABIADAFIABADIAAAOIABAHIgDACIgCADIgCgCIgCgCIgDgBIgCAAIAAgBIgBgBIABgEIAAgBIgGgEIgBgBIgCAAIgEgCIgCgBIgFACIgEAAIgHgCIgGgBQgBAAgBABQAAAAgBAAQAAAAgBABQAAAAAAAAIgCADIgBADIgDACIgCAAIADAFIAFAHIAEADIABABIACABIABABIAAAAIAHgCIAEABIAFgBIABAAIABAAIAGAAIAGAAIAEAAIAEACIAOAMIACADIACAIIAAADIgCAFIAAACIgCAFIgKAJIgEACIgCAAIgCAAIgBAAIgCACIgCABIgCAAIgFACIgJgBIgGABIgLgDQgEAAgCACIgGAHQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAAAAAgAK4AIIgJgBIgHgFQgGgCgFgBQgEgEgDgEIgFgJIgFgLIgBgJQAAgFACgFIgCgFIABgFIAGgPQABgDACgBIACgBIABgCIABgCIACgBIACgBIAQgHIANgCIAGAAIADABIAHAEIAGACIAJAFIADAEQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAABIAAABIAAgBIABABIACADIAAACIAEADIAAADIABAGIAAAEIAAAEQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAIgEADIgCACIgBABIgBgBIgRgBIgSADIgNAAIgJACIgIADIAAABQAAAFADAFQADAEAEAEQAFAEAGACQAGACAFAAIAGAAIAHABIAEgEIAMgLIACgBIAHgCIACAAIAEAAIAAAJIgCAEIgIAHIgHACIgFAEIgPAEIgIABgAKyhNIgBABIgGACIgGAGIgFACIgCABIgBABIgCAFIgBAFIABACIAEACIAEABIALABIAQgCIASgBIADgBIADgBIACgCIgEgRIgBACIAAAAIgDAAIgBgBIgOgGIgOgBIgBAAIgBAAgAL/ACIgCgCIgCgBIgBgCIABgDIACgCIACgCIAIgBIACgCIACgEIAAgKIgBgEIgBgCIAAgBIABgCIABgDIgCgHIABgFIgBgEIAAgFIgCgKIgCgFIgNgEIgDgDIgBgFQgBgBAAAAQAAgBABgBQAAAAAAAAQAAgBABAAIADgCIAJgBIALAAIADABIACACIABACIABACIABACIABAEIADAEIABgCIAAgBIABgBIAGgFIACgCIABgBIAAgCIABgBIABAAIAAAAIACgBIADgCIAEgDIAHgBIAIgBIAGABIAGADQADABADADIACAEIACADIABACIAAAFIADAFIABACIABARIgBAKIAAACIABACIAAAHIABAFIAAABIgBABIAAABIgBACIABADIACACIADACIADABIACgBIACgBIADACIACACIACADIAAADIAAACIgCABIgCACIgDAAIgDgBIgCABIgKACIgBAAIgBAAIgGAAIgLAAQgFAAgDgDQgDgDAAgEQADgCAEgBIAOgBIgEgdIABgXIgCgDIgBgGIgBgDIgCgCIgEgCIgKAAIgJADIgDACIgBABIgBACIgCACIgBABIgCABIgBAAIgBACIgBACIAAABIgCABIAAAAIgBgBIgBABIAAADIgBABIgBAAIAAABIAAACIAAACIgDADIAAACIACAIIAAACIgBACIgBABIgBACIAEAHIAAACIAAAHIABADIABACIAIADIAEACIABAAQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIABADIgBAFQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIgGACIgHABIgTAAgANVgZIgBACIgBABIgBABIABACIACAAIABgBIAAgBIABgBIABgCIgBgBIgBgBIgBABgAMOgqIABABIAEACIACABIABgDIgCgDIgBgBIgBgBIgCABIgCAAIAAAAgANRgsIAAACIAAACIABABIACgBIAAgCIAAAAIAAgCIgCgBIgBABg");
	this.shape_1.setTransform(89.8,9.6,1,1,0,0,0,-0.4,-2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Aq4BjIgIgHIgCgDIgBgCQAAgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIADgCIAHgBIAKAAIAIgBIAEAAIAIgBIAEgDIABgJIgDgdIAAAAIAAAAIABgBIgCgIIABgFIAAgFIAAgDIgDgEIgDgBIgDgBIgFABIgIADIgFAAIgRgBIgDgBIgBgDIABgFIACgDIAEgBIAmgBIAFAAQAEABACAAQADACAAADQACADAAAEIAAAFIgDAFIABACIACAAIABABIABACIAAACIABABIADAmIACAEQAAAAABAAQAAABABAAQAAAAABAAQABAAABAAIARgDIAEABIAFACIAEADIAEABIACAAIAAACIABABIAAACIAAADIgCACIgDACIgDABIgBAAIgBgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAIgIgBQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAgBgBAAIgCgCIgCgBIgIACIgQAHIgIACIgEAAIgFgBIgBAAIgCABIgBAAIgBAAIgCABIABABIgHADIgIACIgFAAgAsJBiIgGgCIgDgBIgBgDIgLgeIgCgDIAAgBIABgFIAAgDIgHgRIgCgEIgCgIQAAgDABgCIgDgEIgDgMIgBgFIgCgGIgEgHIgDgDIgCgBIgHAAIgHgDQgCgCAAgDIAAgEIADgCIARgDIAGgCIARABIADACQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABIABADIgBADIgCADIgHAEIAAABIAAADQAAAAAAABQAAAAAAABQgBAAAAAAQAAABgBAAIACACIABAIIACAEQAAAAABAAQAAAAABAAQAAAAAAAAQAAABABAAIACAPIABAEIgBABIgBABIADAFQABADADACIAAABIAAABIABAGIACAFIAAADIgBACIABADIAEAEIACACIAAAAIADgBIADgDIABgDIABgIIADgLQAAgBAAAAQABgBAAAAQAAAAAAgBQABAAAAAAIgCgDIgBgCIAAgBIAAgDIACgEIABgIIABgHIAFgLIAAAAIAAgBIAAgBIgBgCIACgEIgDgFIgFgEIgDAAIgDgGIgCgBIgBgCIABgCIACgFIAAgBIACAAIAFgCIABAAIACAAIADAAIAHgDIAEgBIAJABIAGAAIAFACIAGABIADACIAAACIAAAFIgDADIgEADIgEABIgEADIgFAEIgCAFIgCALIgEAGIAAACIABACIgCAPIgCALIgCACQACAFAAAFIAAAEIAAABIgBABIgCADIgCAHIgBAIIgBAGIgCADIgCACIABACIACADIAAACIAAACIgDAHIgCACIgEADIgEABIgDgBgApVBYIgCgBIABgKIAAgBQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAgBIAAAAIABgBIABAAIAAgBIAAgBIAYgBIAJgCQADgBAEgDQACgCAAgFIgHg3IABgEIAEgGIgBgBIAAAAIgCgBIgBAAIgBgBIgBgFIgBgBIACgMIgBgDIgCgDIgBgCIABgBIgBAAIgCAAIgBABIgBABIgBABIgCAAIgDABIgZgBIgGgCIAAgBQAAgGAEgDQADgCAFgBIARABIANgEQAEAAADACIAFACIAAABIABABIACADIABAEIAAABIACAJIgBAJIACALIgBAJIABACIACAFIABAEIAAAFIgBACIACAIIAAADIgBAEIgCACIAFAVIABADIAAACIAAAHIAAACQAAABAAAAQAAAAABAAQAAABAAAAQABAAAAAAIACgBIACgBIACgCIADAAIAKABIAIgCIADgBIAEgBQAEAAADACQACACABAFQAAADgBACIgGAEIgNACIgFAAIgHgCIgCgBIgHACIgCgBIgBAAIAAgBIgBgBIgBABIgBABIgCACIgDAAIgIAAIgIACIgBgBIgBAAIgHACIgDAAIgEABIgIABgAoogRIAAAEIABAAIACgBIAAgBIAAgCIgCgBIgBAAIAAABgAowgrIAAABIAAABIABABIACgBIABgBIgBgBIgBAAIgCAAgAncBTIgCgBIgEgBIgCABIgDgCIgCgEIABgDIACgDIACgCIADgBIAFABIADgCIAAgCIACgBIgCgoIAAgMIgBgGIABgEQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIABAAIAAgBIgDgDIAAgCIABgDIAAgKIABgIIgBgCIgCAAIgCAAIAAgDIgDgIIgCgBIgCAAIgDAAIgDAAIgEgDIgCgDIgBgEQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIAIgBIACgBIANgCIADABIACABIACACIAEABIAAAIIABAIIAAABIgBAAIAAABIgBABIABACIAAABIACADIgBAGIAAAEIAEAKIACACIAEgBIAEgDIAFgGIAJgEIAKgCIAFAAIAJAGIACAAIACAAIAJAJIADAEIACACIgBAGIABAEIAAADIAAAEIgCAGIADAFIAAAFIAAANIACAIIAEADIAJADIADACQACABAAAEIgBADIgBADIgMABIgFAAIgLACQgFAAgBgEIgBABIgCACIgDACIgDABIgDgBQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAAgBIABgBIABgBIAAgBIAAAAIgBgBIgBgBIAAgBQgBgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAIAHgCIAFAAIADgBIACgCIACgJIAAgSIgDgJIgBgDIgBgEIAAgDIABgBIABgDIgDgGIAAgDIgCgCIgEgDIgBgCIgGAAIgIABIgHACIgHADIgLAPIgBADIgBAUIADAGIAAACIgCAJIgCACIACACIAFAEIAFAAIAEAAIAFACIABADQABAAAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAIgBAAIgBAAIgBgBIgCgBIgBgBIgBAAIAAAAIAAABIABACIACACIACACIABACIAAAAIgBABIgFgBIgHAFIgEABIgCgBIgDgFIgCgBIgBABIgBABIACABIABADIAAABIgCAAIgJACgAlJBHIgHgFQgFgCgFgDIgIgJIgFgJIgEgLIgCgIQAAgFACgFIgBgFIAAgGIAHgMQABgDACgBIACgBIABgCIABgCIABgCIACAAIARgHIANgDIAFABIAEABIAHAEIAGABIAIAGIAEADQAAABABAAQAAAAAAABQAAABAAAAQAAABAAAAIAAABIAAABIABAAIAAABIACADIABABIADADIAAACIACAGIAAAEIgBADIAAADIgCABIgDACIgBABIgBABIgCAAIgRgBIgfADIgIACIgFABIgEACIAAABQAAAFADAEQAEAFAEADQAFAEAFACQAGADAGAAIAGgBIAGABIAFgDIAMgMIABgBIAHgBIACAAIAEAAIABAJIgCAEIgJAHIgPAJIgUADgAlFgOIgBAAIAAABIAAABIgHACIgGAFIgEADIgCAAIgCACIgBACIgBAGIABACIAIADIALABIAPgDIASAAIAEgBIADgCIABgCIgEgOIAAACIgBAAIgCAAIgCgCIgNgFIgHgBIgHgBgAkCBEIgCgCIACgKIAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIAAAAIABAAIABgBIAAgBIAAAAIAYgBIAJgCIAGgEQACgDABgEIgGg1IABgHIACgGIAAgBIgBAAIgBAAIgBAAIAAgCIgBgEIgBgCIABgMIgBgDIgDgDIAAgCIAAgBIgBAAIgBABIgBABIgBABIgBAAIgBAAIgEABIgagBIgEgCIAAgBQAAgGACgCQAEgDAFAAIARAAIANgDIAGABIAGADIABAAIAAACIACACIABAEIgBABIACAJIAAAJIACALIgBAJIABAEIADAGIAAADIAAAFIgBADIACAGIAAACIgBAEIgBACIADAVIACAEIAAACIgBAGIABADQAAAAAAAAQABABAAAAQAAAAAAAAQABAAAAAAIAEgCIACgBIAEgBIAJABIAOgEQAFAAACADQADABAAAFQAAADgBACQgCADgEABIgNACIgEAAIgGgCIgDgBIgHACIgBgBIgBAAIgBgBIgCAAIgBAAIgBABIgBACIgCABIgIgBIgIACIgBAAIgBgBIgEABIgDABIgCAAIgCAAIgEABIgIABgAjVgmIAAAEIABABIACgCIAAgBIgBgCIgBAAIgBAAIAAAAgAjdhAIAAABIAAABIABABIABgBIABgBIgBgBIgBAAIgBAAgAiLA9IgCAAIgBgCIgBgEIACgEIAHgHQAAgBABAAQAAgBAAgBQABAAAAgBQAAAAAAgBIAAgBIgBgCIABgBIABgCIgEgQIAAgWIgCgJIgCgDIgCgCIgIgEIgBgDIABgDIAFgDIABgBIABgBIABAAIAFAAIANAEIAFgCIAEgDIAHgDQADgCAFAAIADAAIAJAHIAFgEIANgGIAIgBQAAAAABAAQAAAAABABQAAAAABAAQAAAAAAABIAFADIADAFIAGAOIAAABIAAABIAAADIgDAIIACACIABADIgBACIAAACIABADIAAAEIAAADIgBADIAAAFIAAABIAAABIAEAJIADAEIAJAHQAAAAABABQAAAAAAAAQAAABAAABQABAAAAABIAAACIgCAFIgCABIgEAAIgOACIgCAAIgHgCIgCAAQgBAAgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgBAAAAIABgFIAEgDIACgGQACgDgBgEIgDgnIgCgHIgDgDIgEgBIgFADIgDAEIgBAEIgEAVIADAbIABACIAFADIACACIACADQAAADgCACIgFACIgBAAIgBAAIgCAAIgEACIgOAAIgCgBIgCgEIAAgBIAAgDIACgCIAFgEIACgJIgDgLIAAgKIgBgHIAAgCIABgBIAAgBIgCgFIABgKIgBgCIgCgCIgCgBIgCAAIgDABIgDABIgFAFIgBAEIgCABIgCACIgBABIABACIABAAIABAEIAAABIgBAHIAAANIABACIABAAIABAAIABACIABAIIAAAIIABADIABACIAFABIABABIABADQAAAAAAABQAAAAAAAAQgBABAAAAQAAABAAAAIgDACIgZAFgAAvAtQgCgCAAgEIAAgDQACgFACgCIAFgDIADgBIAEgBIADgEIAAgHIgEgUIABgMIgFgjIAAgEIgBgOIgCgDIgCgBIgEgBIgGACIgEgBIgBgBIgBgCIgBgBIgCgBIAEgJIACgEQAAAAABAAQAAgBABAAQAAAAABAAQAAAAAAAAIAEABIADAAIAJgDQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABIADgBIACAAIACAAIALgCIAEAAIAOAEIAAABIAAABIAAABIgBAHIgCAEIgNABIgHACIgBAEIABAHIgBAAIgDABIgBACIABABIABABIACgBIABABIgBAQIABACIAAACIgBACIgBAAIgCAAIAAABIAAABIAAABIABABIABAAIABABIABAAIgBADIAAABIADAKIAAAMIADAGIgBAJIABABIACALQAAADACACQACABAEAAIALgCIAEAAIAMACIALgDQADgBADgCQABgCAAgEIgDgPIAAgFIADgFIAEgBQAFAAACADQABACAAAEIAAACIgBACIACAAIABAAIAAACIAAABIgBACIABAGIAAACIABAAIAAAEIAAACIABAEIgBAEIgBADIAAACIgDAAIgBAFIgGACIgSACIgHADIgZgCIgHABIgEACIgEAAIgGAAIgMACQgFAAgDgCgAC1AkQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAIAAgBIgBABIgDABIgDgCIgFgEIgEgGIgBgEIABgCIAAgCIgBgFIABgHIAEgGIADgEIAHgEIAEgCIADABIAOgCIADAAIAEAAIACgDIAEgCIAJgCIAFgCIADgDQABAAAAgBQAAAAAAgBQABAAAAgBQAAgBgBAAQAAgDgCgEIgEgGIgHgEIgHgCIgBAAIAAAAIgLACIgEADQgBACgBADIABAIIgBAFIgDAEIgKACIgFAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQAAgBAAgBIgEgEIgBgFIABgFIAEgJIABgFIAEgCIADAAIAPgHIAIgBIASACIAIADIAHAFIAEAFIADAHIACAOIABAQIAEAcIABADIABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAIAEgHQABAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAIADABIACACIAAADIgBADIAAADIgBABIgBABIgIAFIgFACIgGgBIgFgCIgEgDIgDgBIgCAAIgEADIgGACIgIAEIgJACIgMABgADlgNIgGAEIgFACIgNACIgEABIgOAEIgCAAIgBAAIAAABIgFAFIgDAEIgBAEQAAABABAAQAAABAAABQAAAAAAAAQABABAAAAIAEAEIALAEIAKAAIAMgCIAGgDQADgBACgCIACgEIABgCIADgEIACgFIAAgIIAAgCIgBgGIgDgBgAE3AiIgBAAIgDgEIgCgBIgDAAIgBgBIgCgEIgFgGIgCgCIgDgyIgBgKIgDgCIgNAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAIgDgDIgBgDQAAgBAAAAQAAgBAAgBQABAAAAAAQAAgBABAAIAFgEIAKgCQAGgBAFACQAEABAFAEIAAAAIACAMIAAAJIABADIAAACIAAACIACAMIAAAFIgDAOQAAADACADIAEAFQADACAEABQADABADAAIAFgBIADgBIACgCIACgBIACAAIACAAIADgEIACgBIADgBQABAAAAgBQAAAAAAAAQABgBAAgBQAAAAgBgBIAAAAIACgBIAAABIABAAIABgBIAAAAIACgCIABgEIABgEIAAgDIgBgDIgBgDIABgIIgBgBIgBgCIABgCIAAgCIAAgCIgBgBIgBgCIgBgCIAAgCIABgCIgBgCIgDgCIgCgCIgHAAIgDAAIgCgCIgDgDIgBgDQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBIAFgCIAJgCIAEAAIAGgBIAEgBQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAIACAEIADAKIAAAMIADAPIgBACIgBABIAAAEIAAACIABAFIgBABIAAABIACAHIgBAFQAAAEADACQADACAFAAIAFgBIACADIACABIACADIABADIgBAEIgCAEIgEADIgEABIgPgBIgDAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBIgCgDIgCgCIgDgCIgRAKIgJADIgLACgAGVAZIgDgBIgBgDIAAgCIAFgFIABgBIAHAAIAFgBIAFgDIADgEIABgFIgBgCIABgLIgDgOIAAgRIgDgKQAAgBgBAAQAAgBAAAAQgBAAAAAAQAAAAgBAAIgMABIgFgBIgEgBQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAgEIABgCIADgCIAEAAIACAAIARgCIAIABQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABIAFAGQAAAAAAABQAAAAABAAQAAAAABAAQAAAAABAAIABgBIACgBIABgBIADgBIADgCIADgCIAEgCIALgDIADgBIADgDIAGABIAOAHQACACAAADIAFAKIABADIAAAEIgFAIIgCAAIgLABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAIgDgEIgCgFIgBgFIABgGIgBAAIgCABIgCABIgBAAIgCgBIgDABIgFADIgCAEQgBAAAAABQgBAAAAAAQAAABAAAAQAAAAAAABIgEABIgDACIgEAGIgDAHIgCAFIgBAFIADAOIAAAIIABADIADADIAIABIAJgBIABABIAAACIgBADIABABIADgBIABgCIABABIABAAIgBACIAAABIgBABIAAABIAAACIgBABIgBAAIgGgBIgBgBIgBgBIgBABIgDAAIgBABIAAABIABABIAAABIAAABIgCACIgBAAIgBAAIgPgBIgIACIgBAAIgBgBIgBgBIgBgBIgPAEgAIOAWIgBgEIgBgCIgCgCIgBgEIABgQIgCgGIgBgCIgBgBIAAgCIADgDIACgBIABABIADABIACABIABAAIADAKIAHAHIABABIACAAIAEABIACgBIACAAQAAAAAAAAQAAAAABAAQAAABAAAAQAAAAAAAAIAAABIABgBIAPgBIAEAAIAEAAIAIgFIADgCIABgBIgBgDIABgBIACgCIAAgCQAAgBAAAAQAAgBAAgBQAAAAgBgBQAAAAgBgBIgDgEIgGgDIgMgEIgFAAIgFABIgFACQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAIgFgCIgDgCIgDAEIgFABIgFgBIgEgCIgDgEIgBgEIgBgDIgCgDIgBgCIgBgDIAAgHIABgEIACgCIADgCIABgEIAAgCIACgBIACAAIABgBIAAgBIABgBIAEgCIAZgDIAGAAIAKADIADAAIADgCIADACIACAAIAAAAIABgCIADABIAEAFIABADIAAAPIABAHIgDABIgDADIgCgBIgCgCIgCgCIgCAAIgBAAIAAgBIgBAAIABgEIAAgBIgFgFIgBgBIgDAAIgEgCIgBAAIgGABIgKgBIgHgBQgBAAAAAAQgBAAgBAAQAAAAAAABQgBAAAAAAIgEAHQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIAAAAIACAGIAFAHIAEACIABABIACABIACABIAAAAIAGgCIAFABIACAAIADgBIABAAIABAAIAFABIAGgBIAFABIAEABIAOAMIACADIACAJIgBACIgBAFIAAACIgCAFIgLAKIgDABIgCABIgCgBIgCABIgCABIgGADIgDAAIgJgBIgCABIgHAAIgFgCIgEAAQgCAAgCABIgHAHIgDACgAKPAKIgHgEQgGgCgEgEQgFgBgDgFIgGgJIgDgLIgCgIQgBgFADgFIgBgFIAAgGIAGgOIAEgFIABAAIABgCIABgCIABgCIATgHIAOgDIAEAAIAFACIAHADIAFACIAEADIAEACIAFAEQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAIAAABIAAABIABAAIAAABIABACIABACIAEAEIAAACIACAHIAAAEIgBADQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAIgDABIgDACIgBABIAAABIgCAAIgRgBIggADIgIABIgIAEIAAABQAAAFADAEIAIAIIAKAGQAGADAFgBIAHAAIAFABIAGgDIALgMIACgBIAGgBIACgBIAFABIABAJIgCADIgJAGIgHADIgGAEIgOAEIgIABgAKShJIAAAAIgIADIgGAFIgDACIgCABIgCACIgCAEIgBAFIABADIAEACIAEABIAMABIAOgDIASAAIAFgBIACgCIABgCIgDgQIAAABIgBABIgDgBIgCgBIgMgFIgPgCIgBABIAAAAgALjAGIgEgBIgDgCIgBgCIAAgBIAAgDIABgCIAEgCIAGgBIAEgBIABgEIAAgKIgBgFIgBgBIABgCIABgBIABgEIgCgGIAAgGIgBgEIAAgEIgCgLIgDgEIgMgFIgEgCIgBgGQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAAAgBIAEgCIAJgBIALABIACABIACABIADACIABADIAAACIABADIACAEIABgBIABgCIACgBIAEgEIACgDIABgBIABgBIABgBIABgBIABAAIACgBIACgCIAFgCIAGgCIAHAAIAHAAIAHADIAFAFIADAEIACACIABACIAAAFIACAFIABADIABARIgBAJIAAACIACADIgBAHIACAFIAAABIgBABIgBABIgBABIACADIACADIACABIADABIADAAIACgBIACABIACACIACADIABADIgBACIgCACIgCAAIgCAAIgDAAIgDAAIgKACIgBgBIAAAAIgEABIgEABIgKgBQgFAAgDgCQgDgCABgFIAGgDIAOgBIgEgcIACgVIgBgDIgCgDIgBgFIgCgDIgCgDIgDgBIgJAAIgGABIgHADIgBACIgBACIgBABIgCABIgCABIgCAAIAAACIgBACIgBACIgBABIAAgBIgBAAIgBABIAAACIgBABIgBAAIgBABIABACIgBACIgCAEIgBACIACAHIAAACIgBACIgBABIAAACIADAHIABADIgBAGIACAEIACABIAIADIADACIAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAAAABIAAACIAAADQAAABAAAAQAAAAgBAAQAAABAAAAQgBAAgBAAIgGACIgTACgAM1gVIAAABIgBACIgBABIABABIABABIABgBIAAgCIABgBIABgCIgBgBIgBgBIgBACgALtgnIACACIACABIADAAIABABIABgCIgBgEIgBgBIgCgBIgCABIgCABIgBAAgAMygoIgBABIABADIABABIACgBIAAgDIAAAAIAAgBIgCgBIgBABgAqggOIgHgCIgEgDQgCgCgBgDIABgJIACgCIADgFIACgCIgBAAIAEgBIADAAIAEABIAGACIAFAEIACAEIAAAGIgDAGIgEAEQgCACgDAAg");
	this.shape_2.setTransform(86.2,9.8,1,1,0,0,0,0,-1.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AtTBwIgFgCQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAgBgBIgBgCIgBgCIgBgBIgFgBIgIgHIgIgKIgBgCIgCgFIgCgBIgBAAIgCgCIgEgUIAAgLIABgLIAAgWIADgLIADgCIAEgLIACgEIAFgDIAUgHIAFgBQAFAAAFABIAMAEIAFAAIACgBIACgCIABgCIABgBIACgBIAEABIACABIACAAIABACIABACIACACIAAACIACAJIgBAKIACAKIgBALIAAACIgBAEIgDABIgBAAIgBAAIgBAAIAAgBIgBgBIgBgBIgCgBIgDAAIAAgBIAAgBIABAAIACAAIABAAIgCgDIgFgHIgFgFIgEgGIgCgBIgKgGQgGgCgFABQgEAAgEABIgLAHIgEADIAAADIgBAEIgBABIAAACIgBAEIAAAPIgBAIIACAXIACAJIAHAOIAGAGIADABIAGgBIADAAIAJgBQACgBACgCIAEgDIAGgCIADgCIABgDIADgKIACgCIABgDIAAgQIABgDIACAAIABAAIACABIACgBIACgBIACABIAFAGIABABQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAABIABAGIgBAEIgCAIQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAIAAAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAIgCAGIAAAFIAAABIgBABIgBACIgGAFIgBADIgBACIgYAMIgFABgAsCBvIgCgBIgEgBIgDAAIgCgBIgCgEIABgDIADgGIADgBIAFABIABgBIACgBIABgBIABgBIgCgoIAAgMIgBgHIABgDQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAgBgBQAAAAABAAQAAgBAAAAQAAAAAAAAQAAAAAAAAIABAAIAAgBIgCgDIgBgCIABgEIAAgJIABgHIgBgBIgBgBIgCABIAAgEIgDgIQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAIgCABIgDAAIgDgBIgDgCIgDgEIgBgDQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAIAIgBIACgBIAMgBIADAAIACACIADACIADAAIAAAJIACAHIgBABIAAAAIgBABIgBABIABACIABABIABADIgBAEIABAEIAEALQAAAAAAABQAAAAABAAQAAABAAAAQABAAAAAAIAEgCIAEgCIAFgHIAEgCIAPgDIAEAAIAKAFIAEAAIAJAJIADAEIACAFIgBAGIABADIAAADIAAAEIgCAGIACAFIABAGIAAANIACAHIAEADIAJADIADACQACACAAADIgBADIgBADIgMACIgFgBIgMADQgDAAgCgFIgCABIgCADIgCABIgDABIgDAAQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIAAgCIABgBIAAAAIABgBIgBgBIAAgBIgBAAIAAgCQgBAAAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAIADgBIAMgCIACgCIABgEIABgKIAAgNIgCgIIgCgEIgBgEIAAgCIACgCIABgDIgEgFIAAgDIgDgFIgDgDIgBgBIgGgBIgIABIgIADIgGAEIgMAPIgBADIAAAVIACAFIAAADIgBAGIgBADIgBABIABACIAGAEIACAAIADAAIAFABIADACIACACIgBABIgBAAIgBAAIgBAAIgBgBIgBgCIgCAAIAAABIAAABIABABIACACIACACIABACIAAABIgBAAIgFAAIgDACIgDACIgGABIgBgBIgDgEIgCgBIgBAAIgBABIABABIABADIABABIgCAAIgKADgAp+BgQgBAAAAgBQAAAAAAAAQgBAAAAgBQAAAAAAAAIAAgBIgCABIgBABIgEgCIgFgFIgGgJIACgEIgCgFIADgIIADgHIADgEIALgHQAAABAAAAQABAAAAAAQABABAAAAQAAAAABAAIANgCIAEAAIADgBIADgCIAEgCIAJgDIAFgCIAEgCQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBgBgBQAAgDgBgDIgGgGIgHgFIgGgBIAAAAIgBAAIgLACIgEADQgCABABAEIABAIIgBAFIgEADIgFACIgFABIgFgBQgBAAAAAAQAAAAgBgBQAAAAgBgBQAAgBgBAAIgDgEIAAgFIAAgFIAEgJIABgFIACgBIADgBIACgBIAPgEIAIgCIASACIAIACIAHAFIAEAFIACAGIADAOIABAQIAEAfIABADIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABgBIADgGIAEgCIAEABIAAABIABACIAAADIgBADIAAACIAAACIgBABIgIAFQgEACgDAAIgFgBIgMgHIgCABIgEADIgGABIgCACIgGADIgJACIgRAAgApOAsIgGAEIgFADIgNACIgDAAIgPAEIgCABIgBACIAAABIgBABIgEADIgDAFIAAAEQAAAAAAABQAAABAAAAQAAABAAAAQABABAAAAIAEADIAFADIAGABIAKABIAMgDIAGgCQADgBABgCIADgEIAEgGIABgFIABgKIgBgCIgBgGIgCgBgAoeBdIgCgCIgBgCIAAgCIAEgFIADgBIAFAAIAGgBIAFgDIADgEIABgGIgBgEIABgKIgDgOIAAgSIgEgKQAAAAAAgBQAAAAAAAAQgBgBAAAAQgBAAAAAAIgMACIgFgBIgEgCQAAAAgBgBQAAAAAAAAQAAgBAAAAQgBgBAAAAIAAgEIADgBIACgBIADgBIAHAAIAMgCIAIABIADACIAEAFQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAIACAAIACgBIABgCIACgBIAEAAIADgCIADgCIAMgCIADgCIACgCIAHABIAHACIAGAEQADACAAABIAEAKIABAEIAAADIgEAJIgCgBIgMABIgDgBIgDgEIgDgFIgBgEIABgGIgBAAIgBAAIgCACIgBgBIgDgBIgDABIgEADIgDAEIgCADIgDABIgEACIgDAHIgDAHIgDAFIgBAFIAEAOIAAAJIABAEIACACIAJABIAJgBIAAACIAAABIAAADIAAABIADAAIABgDIACABIABABIgBABIAAABIgCABIAAACIAAABIgBABIgBABIgFgBIgCgCIgBAAIgBAAIgCABIgBAAIAAABIABACIAAABIAAABIgCABIgBAAIgCAAIgOAAIgIACIgBgBIgBgBIAAgBIgCAAIgOADgAmwBYIgDgCIACgKIAAAAQAAAAgBAAQAAAAAAgBQAAAAgBAAQAAAAAAgBIAAAAIABAAIABgBIAAgBIAAAAIAYgBIAJgCQAEgBADgDQACgDAAgEIgGg3IABgFIADgGIAAAAIgBgBIgBAAIgCAAIAAgCIgBgEIgBgCIABgMIgBgDIgCgDIAAgCIAAgBIgBAAIgBABIgBABIgCABIgBAAIgBAAIgDABIgagBIgFgCIAAgBQAAgGADgCQADgDAGAAIARAAIAMgDIAHABIAFADIABAAIAAACIADACIABAEIgBABIACAJIAAAJIABALIAAAJIAAACIADAGIAAADIAAAFIgBADIADAIIAAACIgCAEIgBACIAEAVIACAEIAAACIgBAGIABADQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIAFgCIACgBIADgBIAKABIALgDIAEAAQADgBAEADQACABAAAFQAAADgBADIgGADIgMACIgGAAIgGgCIgDAAIgGABIgCAAIgBgBIgBgBIgBAAIgBAAIgBABIgBACIgDABIgIgBIgIACIgBAAIgBgBIgDABIgEABIgCAAIgCAAIgDABIgIABgAmEgSIABAEIABABIACgBIAAgCIgBgBIgBgBIgBAAIgBAAgAmLgrIAAABIAAABIABAAIABgBIABgBIgBgBIgBAAIgBABgAkeBNIgHgEQgGgCgFgEQgEgDgDgFIgGgJIgEgLIgBgIQgBgFADgFIgCgFIABgGIAFgMQACgDACgBIACgBIAAgCIABgCIACgCIADAAIAPgHIAOgDIAFABIAEABIAMAFIAIAGIAFADQAAABAAAAQAAAAABABQAAAAAAABQAAABAAAAIAAABIAAABIABAAIAAABIABABIABABIAEAEIAAACIACAHIAAAEIgBADQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAABIgGADIgBABIAAABIgCAAIgQgBIgSADIgOAAIgJABIgHAEIAAABQAAAFADAEQADAFAEADQAFAEAGACQAFADAFAAIAHgBIAGABIAFgDIALgMIACgBIAGgBIACAAIAFAAIAAAJIgBADIgJAIIgHADIgFAEIgOAEIgJABgAkcgGIAAAAIgHADIgGADIgEADIgCAAIgCACIgCAEIgBAFIABADIAFACIADABIAMABIAPgDIARAAIAFgBIACgCIABgCIgDgOIAAABIgBAAIgDAAIgCgBIgMgFIgPgCIAAABIgBAAgAjMBMIgBgEIgBgBIgDgDIgBgDIABgTIgCgFIgBgCIAAgCIAAgBIACgEIACgBIACABIADACIABAAIABAAIAEAKIAGAHIACACIACABIACABIABAAIACgBIACAAQAAAAABAAQAAAAAAAAQAAABAAAAQABAAAAAAIAAABIAQgDIAHABIADgCIAFgFIAEgBIABgCIgBgDIABgBIACgCIAAgCQAAgBAAAAQAAgBgBgBQAAAAAAgBQgBAAAAgBIgEgEIgFgDIgHgCIgGgBIgKAAIgEACQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAIgEADIgEABIgGgBIgDgCIgDgEIgCgEIgBgDIgCgCIAAgDIgBgCIAAgGIACgGIADgCIACgDIAAgCIACgCIABAAIABgBIAAgBIABgBIAFgCIAEgBIAVgCIAFABIAKADIAHgCIACABIACAAIABAAIABgCIADACIADAEIABADIAAAPIACAFIgEACIgCACIgCgBIgCgCIgDgBIgCgBIAAAAIAAAAIgBAAIABgDIAAgBIgDgDIgDgBIgBgBIgCgBIgEgCIgCAAIgFABIgEAAIgHgBQgDgBgDAAQgBAAgBAAQAAAAgBABQgBAAAAAAQAAAAgBABIgCADIgBADQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAIgBAAIADADIAEAHIAFADIABAAIABABIACABIAAAAIAEAAIADgCIAFABIAEgBIABAAIABAAIAGABIAGgBIAEABIAFABIANANIACADIADAIIgBACIgCAFIAAADIgCAEIgKAMQgBAAAAABQgBAAAAAAQAAABgBAAQAAAAAAAAIgDAAIgCgBIgBABIgCABIgCABIgCABIgDABIgCABIgJgCIgGABIgDAAIgGgCIgDAAQgDAAgCACIgHAHQAAAAAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAgAgmA8IgDgCIgDgCIgBgEQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBABAAIADgDIACgCIAFgCQAAAAAAAAQAAAAAAgBQAAAAAAgBQABAAAAgBIABgGIAAgBIgCgNIgCgrIAAgDIgCgDIAAgEIgBgNIAAgDIgBgGIgBgEIgEAAIgKAAIgFgCIgBgEIABgEIACgEIAEgBIAVgEIARgBIADACIACACIACAGQAAADgCADQgBACgEAAIgFABIgDABIgCACIgCAEIAAACIACAGIgBAHIAAACIABABIAAADIABAIIACAHIABABQABAAAAAAQABAAAAAAQABgBAAAAQAAgBABAAIAHgNIACgFIADgDIAKgQIABgEIAAgDIgEgHIgBgEQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAIAFgCIAKgCQAHAAAHABIAPAEIgCAFIgEACIgMADIgEAEIgIALIgEADIAAAAQABAEgCACIgHANQgBADAAAFIAAAFIACAFIADAEIAEADIAAACIACAGIACADIABAAIAAABIABABIAAABIABABIABABIAAAEIABABIACAAIABABIABAEIAHAQIADADIAEADIAGABIAJAEIABACQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAgBAAIgFACIgfADIgEgBIgBgBIgCgBIABgDIABgEIACgDQABgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAIABAAIAAgDIAAgFIgHgIIgCgIIgEgEIgCgEIgBgCIgCgBIgBgBIgBgFIgBAAIgBAAIgCgDIgBgDIgCgCQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAAAgBAAIgDABIgEAHIgEABIAAAAIABAGIAAADIgCAFIAAACIACAMIAAAEIAAACQAAAEACACIAEADIALADIABACIAAACIgCAEIgCACIgDABIgFAAIgDAAIgLADIgGABgABBA3IgCgBIgBgDIABgCIADgEIACgBIAEgBIACABIAGgCIAFgDIAEgEIABgFIgBgEIAAgKIgDgPIAAgPIgDgKQAAgBgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAIgNABIgEAAIgEgCQAAgBgBAAQAAAAAAgBQAAAAAAgBQgBAAAAgBIAAgEIACgCIAGgCIADAAIAQgCIAJABIACACIAFAGIACABIACAAIAEgDIACgBIADgCIAEgCIADgCIALgDIAEgBIACgCIAHABIAGACIAGAEQADACAAADIAFAKIABADIgBAEIgEAIIgCAAIgLABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAIgDgEIgCgFIgBgEIABgGIgBAAIgCAAIgBABIgEgBIgDABIgFADIgDAEQAAAAAAAAQgBABAAAAQAAABAAAAQAAAAAAABIgIADIgDAGIgDAIIgDACIAAAFIADAOIAAAJIABAEIADADIAIABIAJgBIABABIAAACIAAADIAAABIACgBIABgCIACABIABABIgBABIAAABIgBABIAAABIAAACIgBABIgBAAIgDAAIgDgBIgBgBIgCgBIAAABIgDABIgBABIABACIABABIgBABIgCABIgBAAIgBAAIgPgBIgHACIgCAAIgBgBIgBgBIgBAAIgEAAIgEACIgGABgAM2AzIgKgEIgIgBIgBgCIgIgLQgBgCAAgEQgBgFACgEQACgFAEgEIgGgPIgBgGIAAgDIABgCIABgBIABgCIABgCIAGgHIABgEIgBgCIgEgEIgCgDIACgRIAAgBIgBgBIABgBIABgCIABgCIAAgBIgBgDIAAgBIAEgGIAJgGIABABIABAAIACgBIAGgDIAFgBIACAAIAOABIADACIAFAEIACgCIACgBIACgCIABgCIADAAIACAAIACgCIAGgDIANACIAAAEIAEAIIABAEIgBAEIgEADIgEADIgFABIAAAAIgBAAIABgEIgBgBIgDACIgBACIgBADIABAKIAAAEIgCAEIgDAEIgDAJIgFAGIgBABIgBAAIAAAAIgFABIgKAEIgFAAIgPAAIgJADIgDAEIgBAEIABADIABACIACACIADAAIADAAIADgCIABABIACABIAAgBIACgBIABABIACAAIAAgBIACAAIACAAIADABIADABIABgBIACgBIACgBIACgBIABABIACAAIAGgCIACAAIABABIAOACIACABIAGABIACAAIABABIACACIAGADIABABIAEAMQAAADgCAEIgEAHIgGAFIgEACIgPAGIgSAEIgTABgAM9AIIgPAFIgFAHIgCADIACAGIADAEIADACQADACADAAIACAAIACAAQADADAFAAIAIAAIAFgBIAEgDIAFAAIAFgCIADgBIADgBIADAAIADAAIADgBIACgCIABgDIABgDIAAgBIACgCIAAgDQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAgBgBAAIgEgCIgIgCIgBAAIgKgCQgGgBgFAAIgBAAIgDgBIgBAAIgBABIgBABIgBABIgCAAIgDgBgAM2hGIAAABIgCAAIgBABIgBABIgCADIgDAOIABABIAIAOIABACIAEACIADAAIAGgBIACABIACAAQADAAADgDIAGgGIAEgGQABgEAAgDIAAgFIgDgFIgEgFIgEgCIgLgDIgCAAIgBABIgBAAIgBAAIgFgBgANbhNIgBABIACAAIABACIACAAIABABIACgBIAAgBIgCgCIgDgBgADGAtQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAgBIAAAAQAAAAAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAIgGgFIgDgFIgCgFIABgCIABgBIgCgFIACgIIADgIIADgDIAEgBIADgBIAEgDIADABIAOgCIAEABIADgBIADgCIAEgCIAJgDIAFgCIADgCQACgCgBgDQAAgDgCgDIgFgHIgHgEQgDgCgDABIgBAAIgBAAIgLACIgEADQgBABAAAEIABAIIgBAEIgEAEIgKADIgEgBQgBAAAAAAQgBgBAAAAQgBAAAAgBQgBAAAAgBIgDgFIgBgFIABgEIADgJIACgGIACAAIACgBIACgBIAQgGIAIgCIASACIAIAEIAHAFIADAEIACgCIACgBIAAgCIACgCIACgCIACAAIAPgHIAOgDIAFABIARAGIAIAGIAEADQAAABABAAQAAAAAAABQAAAAAAABQAAABAAAAIAAABIAAABIAAAAIABABIACADIABABIADAEIAAADIAAADIACADIgBAEIAAADIAAADIgCABIgDACIgBABIgBABIgCAAIgRgBIgnAEIgFAAIgDACIAAABQAAAFADAEQADAFAEADQAFAEAFACQAGADAFAAIAHgBIAGABIAFgDIAMgMIACgBIAGgBIACAAIAEAAIABAJIgDAEIgGAGIgRAKIgUADIgMgBIgHgFQgGgCgFgEIgHgIIgDAFIgFAFIgCABIgDADIgGABIgJAEIgIACIgMABgAD1gFIgLAFIgNACIgDAAIgPAEIgBABIgBABIgBACIgFAEIgCAEIgBAEQAAABAAAAQAAABAAABQABAAAAABQAAAAAAABIAFADIAEACIAHACIAJAAIAMgCIAGgCQADgBACgDIACgEIACgBIACgEIACgFIAAgLIAAgBIgBgEIgCgBgAEdgqIgBAAIAAABIAAABIgEABIgGADIgCADIgFADIgCAAIgCACIgBAFIgBAFIABACIAIADIALABIAPgDIAPAAIADAAIAEgBIADgCIABgCIgBgDIgBgCIgCgLIAAABIAAABIgDAAIgDgCIgMgFIgPgCIAAABgAFpApIgDgBIgFgCIAAgFQgBgDACgCQAAAAAAgBQABAAAAgBQAAAAABAAQAAAAABgBIAQgCIAGgCIADgDIABgGIAAgDIgCgCIABAAIABgDIgBgDIABgCIgCgPIgBgBIAAgBIABgJIAAgBIgBgBIAAgBIAAgBIAAgCIABgDIgBgCIgCgDIAAgCIgJABIgJgCIgFgBQAAgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBIABgCIACgCIAEgCIADgBIAJAAIAEgCIAAgBIABgDIAAgDIAAgCIgBgJIAAgGIADgFIAJgLIAHgDIAHgDIAMgCIAKABIAMAEIAGADIABAEQABAAAAAAQABAAABAAQAAABABAAQAAAAABABIACAEIACALIAAABIgBAAIgBgBIgCgBIAAABIABABIABABIABACIAAABIAAABIgCAAIgCACIgBADIgDACIgEABQgDAAgDgBQgFgCgCgCIgCgGIgCgLQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQgCgCgEAAIgHACIgHADIgFAFQgCADAAAFIABAHIACADIAEABIAHAAIABABIAHAFIABADQAAABgBAAQAAABAAAAQAAABgBAAQAAAAAAABIgFABIgMADIgBACIgBACIADAdIAAAGIgBAEIABACIAAAIIAAADIADAFIABACIAFgBIAKgBIAHAAIAFACQABAAAAABQAAAAABABQAAAAAAABQAAAAABABIgBAEIgCADIgCADIgNAEIgEAAIgGgCIgEAAIgRABIgOAFIgGABgAHoAgIgCgCIgCgCIgDAAIgCgCIgBgHIgBgBIgEgBIgCgDIgBgDIgBgGIgBgCIgCgCIgBgBIAAgMIAAgHIADgEIAAgBIgCgDIACgFIABgKIgBgCQgCgCgEAAIgKgBIgFgBIgDgDQAAgBAAAAQAAgBgBAAQAAAAgBAAQAAgBAAAAIgDAAIgBgDQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAIAEgDIAHgDIADgBIAIgCIACgCIABgEIgBgQIAAgGIAEgGIABgBIADgDIABgBIACAAIAAABIAEADIACARIAAAEIgBAEIAEAHIACACIAMACIATgBIADABIACABIACAAIACABQAAAAABABQAAAAAAAAQAAAAAAABQAAAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQAAABgBAAIgCACIgFACIgOAAIgJACQgEABgCACQgDACgBAEIgCAIIAEAbIABAFIAGAKQABADACADQADACAEgBIAJgCIADgCQABgBAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAIgDgFIABgCIACgDIABgBIADgBIAEgEIAFgCIAEAAIAEACIAAAKIgFAOQAAAFgCADIgHAGIgIADIgbAEgAIyAfIgIgHIgCgDIAAgCQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAgBIAEgBIAEgCIAMABIAIgCIAIAAIAFgBIADgCIABgJIgDgbIABAAIAAgBIABAAIgCgJIABgJIgBgEIgDgDIgDgCIgDgBIgEABIgJADIgEABIgSgCIgCgBIgCgDIABgFIADgDIADgCIAmgCIAGABQAEABACACQACABABADQACADAAAEIgBAGIgDAEIACACIABAAIABABIABACIAAACIACABIACAkQABABAAAAQAAABAAAAQAAABABAAQAAABAAAAQABAAAAAAQABABAAAAQABAAAAAAQABAAABAAIARgDIAFABIAIAFIAFABIABABIABABIAAABIAAACIAAADIgCADIgDACIgDAAIAAABIgBgBQgBgBAAAAQAAAAgBAAQAAgBgBAAQAAAAgBAAIgHgBIgEgDIgCgCIgCAAQgFAAgEABIgPAIIgIABIgEAAIgFgBIgBABIgDAAIgBAAIgBABIgCAAIABABIgGAEIgIACIgGgBgAKfATIgDgDIgBgCIAAgDIAAgDIABgCIADgBIAEgBIADAAIADgCIACgCIAAgKIgBgFIgBgBIAAgCIACgBIABgEIgDgGIABgFIgBgFIAAgEIgCgLIgCgEIgFgCIgIgCIgEgDIgBgFQAAgBAAAAQAAgBAAgBQABAAAAgBQAAAAAAgBIAEgCIAJgBIALABIADABIADAEIACACIAAACIABAEIACADIABgBIABgBIABgCIAGgEIABgCIABgBIABgCIAAgBIACAAIABAAIAEgEIAFgCIANgCIAHABIAHACIAFAFIACAEIADACIABADIAAAFIACAFIABACIABARIgBAKIAAACIABACIAAAHIACAFIgBABIAAABIgBABIgBACIACADIAFADIACAAIACAAIADAAIACAAIACACIACADIAAADIAAACIgCABIgCABIgIAAIgKADIAAgBIgBABIgEAAIgEABIgKgBQgFAAgDgDQgCgDAAgEQACgDADAAIAPgCIgEgaIACgVIgBgDIgCgDIgBgFIgCgDIgBgCIgEgCIgKAAIgEABIgIAEIgBABIgBACIgBACIgCABIgCAAIgCABIAAABIgBACIAAACIgBABIgBAAIgBgBIgBABIAAADIgBABIgBAAIgBAAIABACIgBACIgCAEIAAACIABAHIAAADIgBACIAAABIgBACIADAGIABADIgBAHIACACIACAAIAHADIAEADIABAAQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIAAACIAAAGQAAAAAAAAQAAABgBAAQAAAAAAAAQgBABAAAAIgHACIgTABgAL2gIIgBABIgBACIgBABIABABIACABIAAgBIAAgCIABgBIABgBIgBgBIgBgBIAAABgAKugZIABABIACABIADABIABABIABgDIgBgDIgBgCIgCgBIgCACIgCAAIAAAAgALxgbIAAACIAAACQABAAAAABQAAAAAAAAQAAAAABAAQAAAAAAAAIACgBIAAgCIAAgBIAAgBIgCgBIgCABgAJLhSIgHgCIgFgCQgCgCgBgDIABgKIADgCIACgFIACgBIAAAAIAGgCIALADIAFAEIACAEIgBAGIgDAGIgDAEIgGACg");
	this.shape_3.setTransform(92.8,11.4,1,1,0,0,0,-0.1,1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AsYBzIgIgHIgCgDIgBgCQAAgBAAAAQABAAAAgBQAAAAAAAAQABgBAAAAIADgCIAIgBIAJAAIAIgBIAEAAIAIgBIAEgDIABgJIgDgdIAAAAIABAAIAAgBIgCgIIABgFIAAgFIAAgDIgDgEIgDgBIgDgBIgEABIgJADIgFAAIgRgBIgDgBIgBgDIABgFIACgDIAEgCIAmgCIAGAAQADABACACQADACABADQACADAAAEIgBAFIgDAFIACACIABAAIABABIABACIAAACIABABIADAmIACAEQABAAAAAAQAAABABAAQAAAAABAAQABAAABAAIARgDIAFABIAEACIAEADIAEABIACAAIAAACIABABIAAACIAAADIgCACIgDACIgDABIgBAAIgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIgIgBQAAAAgBgBQAAAAgBAAQAAgBAAAAQgBgBAAAAIgCgCIgDgBIgIACIgPAHIgIACIgFAAIgEgBIgBAAIgDABIgBAAIgBAAIgCABIABABIgHADIgIACIgFAAgAtoByIgHgCIgCgBIgCgDIgLgeIgCgDIAAgBIABgFIAAgDIgHgRIgCgEIgCgIQAAgDABgCIgCgEIgEgMIgBgHIgCgGIgDgFIgDgDIgDgBIgHAAIgGgDQgDgCAAgDIABgEIADgCIARgDIAFgCIARABIAEACQAAABAAAAQABAAAAABQAAAAAAABQABAAAAABIABADIgBADIgDADIgGAEIAAABIgBADQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAIACACIABAIIABAEQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAIACAPIABAEIAAABIgBABIACAFQABADADACIAAABIAAABIABAGIACAFIAAADIgBACIABADIAEAEIACACIAAAAIAEgBIACgDIABgDIABgIIADgLQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIgCgDIgBgCIAAgBIAAgDIACgEIACgIIAAgHIAFgNIAAAAIAAgBIAAgBIgBgCIACgCIgDgFIgFgEIgDAAIgDgGIgBgBIgBgCIAAgCIACgFIAAgBIACAAIAFgCIACAAIABAAIADAAIAHgDIAEgBIAJABIAGAAIAGACIAGABIADACIAAACIgBAFIgDADIgEADIgEABIgEADIgEAEIgDAFIgCAJIgDAIIAAACIABACIgCAPIgDALIgCACQACAFAAAFIAAAEIAAABIgBABIgCADIgCAHIgBAIIgBAGIgCADIgCACIABACIACADIABACIgBACIgDAHIgCACIgEADIgEABIgCgBgAquBnIgDgDIgDgDIgBgEQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAIACABIABAAIABgBIAAgBIABgBIACAAQAAAAABgBQABAAAAAAQABAAAAgBQAAAAABgBIADgDIABgJIgCgIIACgLIgDgiIgBgCIgBgEIABgIIgCgHIAAgHQgBgDgBgCQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAIgFgBIgFAAIgEgCQAAAAgBAAQAAAAAAgBQAAAAgBgBQAAAAAAgBIABgFIADgDIAJgCIAQADIADABIAAABIAEAZIgBAIIACAKIACAZIABAHIABABIABAAIADgBIAEgGIADgCIAEgEIAGgIIAEgDQAAAAABAAQAAgBAAAAQABgBAAAAQAAgBAAAAIgBgDIgCgGIAAgEIABAAIAAAAIAAgCIABgCIABAAIAMAAIAFgCIADgBIALABIALgBIABAAIACAAIABABIABABIgBABIgBAAIABACIADACIAAACIgCADIgLAEIgEABIgFgCIgEACIgGAEIgKAJIgDAFIgCAEIAAAGIABADIAFACIASAWIAEAJIAAAAIAKgBIANAAIAAACIAAADIAEADIABACIgBACIAAABIgCACIAAABIAAABIgIABIgHABIgBAAIgCAAIgBgBIAAgBIgGABIgCABIgCACIgNgBIgHgDIgCgDIAAgBIABgFIABgCIAEABIABAAIAAgBIgBgBIgBgBIgCAAIABgDIAAgDIAAgEIgCgEIgCgDQgBgBAAAAQAAgBgBAAQAAAAgBAAQAAgBgBAAIgCgCIgEgEIgDgBQgCAAgCACIgGAEIgEAGIgBADIAAABIABACIgBADIgCADIACACIADACIAGAAIACACIACABIACACIABACIgBABIgDABIgBACIABABIgWAEIgHABIgHABgAoQBfIgCgCIgCgCIgDAAIgBgCIgCgHIgBgCQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAIgCgDIgCgDIgBgGIgBgCIgCgCIAAgCIgBgNIABgHIABgCIABgCIAAgBIgCgEIACgEIABgKIgBgCQgCgCgDAAIgKgBIgFgBIgDgDQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAIgCAAIgBgDQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAAAABgBIALgDIADgBIADgBIAEgBIACgCIACgEIgCgQIABgGIADgGIABgBIACgCIABgBIACgBIABAAIAEAEIADARIAAAEIgBAEIAEAHIABACIAgABIACABIACABIACAAIACABQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQAAABAAAAIgDACIgEACIgPAAIgJACQgEABgCACQgDACgBAEIgBAIIADAbIABAFIAGAMQABADACADQADACAEgBIAJgCIADgCQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBIgCgGIAAgCIACgDIACgBIACgBIAEgEIAFgCIAEAAIAEACIAAAKIgEAQQgBAFgCADIgGAGIgIADIgcAEgAC3BaIgFgBIgFgCIgIgCIgCgBIgHgLQgBgCAAgEQgBgFACgFQACgFADgDIgFgRIgBgGIAAgDIACgDIABgCIABgCIAGgHIABgEIgBgCIgFgDIgBgCIABgRIAAgBIAAgBIAAgCIABgBIABgCIABgBIgBgDIAAgBIAEgGIAJgHIABABIABABIACgBIAHgDIAHgBIANABIAEACIAEAEIACgCIADgBIACgCIABgCIACAAIACgBIACgBIAGgDIANACIABADIADAJIABAEIgCADIgCAEIgFADIgEABIgBAAIAAAAIABgEIgCgBIgDABIgBACIgBAEIABAKIAAAEIgCAEIgCADIgEAIIgFAFIgBABIAAABIgBAAIgFABIgKADIgFABIgPAAIgFABIgEACIgDADIgCAFIABADIACACIACACIADAAIAGgCIACABIABABIABgCIABAAIABAAIACABIABgBIACAAIACAAIACABIAEABIABgBIABgBIACgBIACgBIACABIAFgBIACgBIAEABIAJABIAMAEIACABIABABIACACIAHAEIAEAMQAAADgCAEIgEAHIgFAFIgFACIgPAGIgJACIgWADgAC4BMIACABQAEACAEABIAIAAIAFgCIAEgCIAFAAIAFgCIADgCIAGgBIADABIADgBIADgCIABgDIAAgDIAAgBQABAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAgBIAAgDQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAIgEgCIgJgCIgBAAIgKgCIgLgBIgBAAIgDgBIgBAAIAAABIgCABIgBAAIgEAAIgEABIgEACIgJACIgCABIgGAHIgBADIABAGIADAEIAEACQADACADgBgAC4gfIgBABIgCABIgBABIgBABIgBACIgEAPIABABIAIAMIABACIAEACIADAAIADgBIADAAIACABIACAAIAGgDIAGgEIAEgHQACgEgBgDIAAgFIgDgEIgEgFQAAAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgLgDIgBAAIgBAAIgBABIgCAAIgEgBgADhgiIACAAIAAgBIgCgCIgDgBIgBABIgBABIABAAIACACIABAAgAmaBaIgFgBIgIgCIgDAAIgDgBIgIgGIgLgFQgDgBgCgDIgEgEIgGgKIgCgFIACgRIgBAAIAAgBIgBgBIgBAAIABgDIACgHIAAgCIABgBIABgCIAAgDIAAgCIABAAIABAAIAAgCIACgDIACgDIALgIIADgCIANgEIAQgDIAMACIAMAFIAAABIgBAEIAAAAIAGAAIACABIADAAIACADIAIAMIABADIABAHIgBADIgCAEIgBADIAAABIABABIABAAIAAgBIgBgDIAAgBIABAAIABABIABABIABACIAAAAIAAAEIgBACIAAACIgBAAIACAFIgBAAIgBABIgBAAIABAGIAAAEIgCABIgBABIAAACIgBACIgDADIgDACIgDABIgBAAIABACIAAACIgBABIgLAJIgEABIgCgBIgDAAIgDABIgEACgAm3A7IAEAFIAOAJIAPAAQADAAADgCIAEgFIACgDIAEgEIADgCIABgBIADgDIABgCIgBgBIAAgEIABgDIACgCIABgBIADAAIACABIAAgBQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAIgFAAIgCgCIAAgBIgCgLIgGgPIgCAAIgDAAIgGgDIgWAAQgGAAgEADIgIAHIgFAJQgCAFAAAGIADAQIADADIAAADIABABIACgBIABABgAlZBRIgCgBIgBgDIAAgCIAEgEIACgCIADAAIADABIAGgCIAFgDIADgEIABgFIgBgEIABgKIgDgPIAAgRIgDgKQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAIgNAAIgEAAIgEgBQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBIAAgEIACgCIAGgCIADAAIAQgCIAJABIACACIAEAGIADABIACgBIACgBIABgBIACgBIAEgCIADgCIAEgCIAKgDIAEgBIACgDIAHACIAGACIAHAEQACACAAADIAFAJIABACIAAAEIgFAIIgBAAIgMABQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgDgEIgCgFIgBgEIABgFIgBABIgCAAIgBABIgCAAIgCgBIgDABIgEACIgDADQAAAAgBAAQAAABAAAAQgBABAAAAQAAAAAAABIgDABIgEACIgDAGIgDAIIgDAEIAAAFIADAOIAAAJIABAEIADADIAIABIAJgBIABABIAAACIgBADIABABIACgBIABgCIABABIABABIAAABIgBABIgBABIAAABIAAACIAAABIgCAAIgDAAIgCgBIgBgBIgCgBIgBABIgDABIAAABIABACIAAABIAAABIgCABIgBAAIgBAAIgPgBIgIACIgBAAIgBgBIgBgBIgBAAIgEAAIgLADgAigBFIgBgBIgEgCIgDgEIgCgFIgBgIIABgDIgCgJIABgHIgCgFIABgBIAAgBIAAgFIAAgCIAAgCIABgCIABgBQABAAAAAAQAAABABAAQAAAAABABQAAAAABABIADAEIADAGIABAEIAAABIgBABIACAGIgBACIABACIABACIABABIACABIABAAIACAAIAFAFIAGAEIARABIAGgBIAFgCIATgOIAEgGIABgDIAAgBIgBgMIgCgFIgDgCIgHgEQgCgCgDAAIgJgBQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBIgBAAIgDABIgDAAIgGgBIgHAAIgCAAIgCAAIgDgCIgLgEIgDgFIgFgDIgFgNIgBgEIAAgEQAAgBAAAAQABgBAAAAQAAgBAAAAQABgBAAAAIABAAIAAgCIAAAAIgBgBIAAgBIABgFIAOgOIACAAIABgBIABABIACAAIABgBIABgBIABgCIACAAIACAAIAcgBIAHABIACgCIABgBIABgBIACgBIAFAAIAEACIAAABIgBACIAFAMIAAACIgBACIACAEIgBAEIACAMIgBAHIgCABIgGgDIgCgDIgCgHIgCgDIgGgIIgCgDIgCgBIgFAAIgKgCIgEAAIgFABIgRAIQgCAGAAAGIACAHIADAEIAEADIAKAFIAMgBIAHABIADACIADAAIADgBIAGAAIAFADIAIAEIAKAJIACAFIABAAIABAFIgBAUIgBgCIgCAAIgCABIgBABQAAABAAAAQAAAAABAAQAAABAAAAQAAAAAAAAIADAAIABAAIAAACIgCADIgCACIgBACIgBACIgDAEIgCAAIgCAAIgBAAIgBABIgBACIABABIgCACIgYAJIgIACIgHgBIgMgDIgGAAIgEAAIgDACIAAABIgBABIgCAAgAgTBAIgBgCIgCgCIgDAAIgCgCIgBgHIgBgCIgEAAIgCgDIgBgDIgBgGIgDgEIgBgDIAAgNIAAgGIABgCIABgCIAAgBIgBgEIACgCIAAgKIgBgCQgCgCgDAAIgKgBIgFgCIgDgCQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAIgCgBIgBgCQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBIALgFIADgCIADAAIAEgBIADgCIABgEIgBgQIAAgGIADgGIACgCIABgBIACgBIABgBIACAAIADAEIADARIAAAEIgBAEIAEAHIABACIAMABIAOAAIAGABIACABIACAAIACABQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAIgDACIgEACIgNAAIgJABQgEACgBACQgDACgCAEIgBAIIAEAZIABAFIAFAMQABADACADQADABAEAAIAHgCIADgDQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBIgCgGIAAgDIAEgDIACgBIAEgEIAFgCIAEAAIAEABIAAALIgEAQQgBAFgCADIgGAFQgEADgEABIgZAEgABOA4IgHgFIgLgFIgHgIIgGgKIgEgKIgBgJQgBgFADgEIgCgEIABgFIAGgPIADgEIACgBIABgCIABgCIABgBIATgIIANgCIAFAAIAEABIAHAEIAGABIAEADIAEADIAEAEQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAABIAAABIAAgBIABABIABADIABABIAEAEIgBADIACAGIAAAEIAAACQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAIgCABIgDACIgBACIgBABIgBgBIgRgBIggADIgIACIgIADIAAABQAAAFADAFIAHAIIALAGQAFACAGAAIAGgBIAGACIAFgEIAMgLIACgCIAGgBIACAAIAFAAIAAAJIgCAEIgIAHIgHAEIgGAEIgDABIgTADgABRgcIgBABIgHACIgGAGIgEACIgCAAIgCACIgBAFIgBAFIABACIAIADIALAAIAPgBIASgBIAEgBIADgBIABgDIgDgQIgBACIAAAAIgDAAIgCgCIgNgFIgOgBIgBAAIgBAAgAEuAqIgHgFQgGgCgEgDQgFgEgDgEIgFgJIgEgLIgCgHQAAgFACgFIgBgFIAAgFIAGgPQACgDACgBIACAAIAAgCIABgDIACgBIACgBIAQgHIAOgCIAFAAIAEABIAHAEIAFACIAJAFIAEAEQAAAAAAABQABAAAAAAQAAABAAABQAAAAAAABIAAABIAAABIABgBIAAABIACADIAAACIAEADIAAADIACAGIAAAEIgBAEQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIgFADIgBACIgBABIgCgBIgRAAIgSACIgNAAIgJACIgIABIAAABQAAAFADAFQADAEAFAEQAFAEAFACQAGACAFAAIAHAAIAGABIAFgDIALgMIACgBIAHgCIACAAIAEAAIABAJIgCAEIgJAIIgPAIIgUAEgAExgqIAAABIgHACIgGAGIgEACIgCABIgCABIgCAFIgBAFIABACIAEACIAEABIAMABIAPgCIASgBIAEAAIADgCIABgCIgEgRIAAACIgBABIgDgBIgBgBIgNgFIgHgCIgIAAIAAAAIgBAAgAGAAnIgCAAIgBgCIgBgEIACgEIAHgHQABgBAAAAQAAgBABgBQAAAAAAgBQAAAAAAgBIAAgBIgBgBIABgCIABgCIgEgOIAAgYIgCgJIgBgDIgDgCIgHgEIgBgDIABgDIAEgDIABgBIABgBIABAAIAFAAIAOAEIAEgCIAFgDIAGgDQADgCAFAAIADAAIAJAHIAFgEIAOgGIAHgBQAAAAABAAQABAAAAABQAAAAABAAQAAAAABABIAEADIAJATIAAABIAAABIAAADIgCAIIABADIABACIgBADIAAADIABAHIAAADIgBADIAAAFIAAAAIAAAAIAEAJIAEAEIAIAHQABAAAAABQAAAAAAAAQABABAAABQAAAAAAABIAAACIgCAFIgBABIgFAAIgNACIgDAAIgGgCIgDAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAgBAAAAIAAgFIAEgDIACgGQACgDAAgEIgEgnIgCgHIgDgDIgEgBIgEADIgDAEIgCAEIgDAXIACAZIABACIAFADIACACIACADQAAADgCACQgBAAAAABQgBAAAAAAQgBAAAAABQgBAAAAAAIgCAAIgBAAIgCAAIgEACIgOAAIgBgBIgDgEIAAgBIABgDIABgCIAFgEIACgJIgDgJIAAgKIgBgHIAAgCIABgCIAAgCIgCgFIABgKIgBgCIgCgCIgCgBIgCAAIgDABIgDABIgFAFIgBAEIgBABIgDACIAAABIAAACIABAAIACAEIAAAEIgCAGIABAMIABABIAAAAIABABIABABIABAIIAAAIIABADIABACIAFABIABABIABADQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAIgCACIgaAFgAIfAbIgHgEQgGgCgFgEQgEgDgDgFIgFgJIgEgJIgCgIQAAgFACgFIgBgFIAAgGIAGgOIADgFIACAAIABgCIABgCIABgCIATgHIANgDIAFAAIAEACIAHADIAGACIAEADIAEACIAEAEQABABAAAAQAAABAAAAQABAAAAABQAAABAAAAIAAABIAAABIAAAAIABABIABACIABACIAEAEIgBACIACAHIAAAEIAAADQAAABAAAAQAAAAAAABQAAAAAAAAQgBABAAAAIgCABIgDACIgBABIgBABIgBAAIgRgBIggADIgIABIgIAEIAAABQAAAFADAEIAHAGIALAGQAFADAGgBIAGAAIAGABIAFgDIAMgLIACAAIAGgBIACgBIAFABIAAAHIgCADIgIAIIgHADIgGAEIgOAEIgIABgAIig4IgBAAIgHADIgGAFIgEACIgCABIgCACIgBAEIgBAFIABADIAEACIAEABIALABIAPgDIASAAIAEgBIADgCIABgCIgDgQIgBABIAAABIgDgBIgCgBIgNgFIgOgCIgBABIgBAAgAJ0AcIgIgHIgCgDIgBgCQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABgBIADgCIAHgBIAKAAIAIgBIAEAAIAIgBIAEgDIABgHIgEgdIABAAIAAAAIABgBIgCgIIABgFIAAgFIgBgDIgDgEIgCgBIgEgBIgEABIgIADIgFAAIgSgBIgCgBIgCgDIABgFIADgDIAEgCIAlgCIAGABQAEAAACACQACACABADQACADAAAEIAAAFIgDAFIABACIACAAIABABIAAACIAAACIACABIADAmIACACQAAAAAAAAQABABAAAAQABAAABAAQAAAAABAAIARgCIAFAAIAFACIAEADIAEABIABAAIABACIAAABIAAACIAAADIgEAFIgDAAIgBAAIgBgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAIgIgBQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBgBAAIgCgCIgCgBIgJACIgPAHIgIACIgEAAIgFgBIgBABIgDAAIgBAAIgBAAIgBABIABABIgHADIgIACIgFAAgAL9AOIgHgFIgLgFIgHgGIgGgKIgEgKIgBgJQgBgFADgFIgCgFIABgFIAGgPIADgEIACgBIABgCIABgCIABgBIATgIIANgCIAFAAIALAFIAFABIAEADIAFADIAEAEQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABIAAABIAAABIABgBIAAABIACADIAAABIAEAEIAAADIACAGIAAAEIgBAEQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIgDABIgCACIgBACIgBABIgCgBIgRgBIgnAFIgIADIAAABQAAAFADAFIAHAIIALAGQAFAAAGAAIAGAAIAGABIAFgCIALgLIACgCIAHgBIACAAIAEAAIABAJIgCAEIgJAFIgHAEIgFAEIgDABIgTADgAMAhGIgBABIgHACIgGAGIgEACIgCAAIgCACIgBAFIgBAFIABACIAIADIALABIAPgCIASgBIAEgBIADgBIABgDIgEgQIAAACIgBAAIgDAAIgBgCIgNgFIgOgBIgBAAIgBAAgANJAJIgDgCIgBgCIABgCIAEgDIACgBIAGAAIAFgBIAFgDIAEgEIABgGIgBgEIAAgKIgCgOIgBgRIgDgLQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAIgMACIgFgBIgEgCQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgEIACgDIACgBIAEgBIAGAAIANgBIAIAAIADACIAEAHQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAABAAIACAAIABgBIACgCIACgBIAEgBIADgDIADgCIALgCIAEgCIACgCIAHABIANAGQACACAAADIAFAKIABAEIAAADIgFAJIgBgBIgMABIgEgBIgDgEIgCgFIgBgEIABgGIgBAAIgCAAIgBACIgCgBIgCgBIgDACIgEACIgDAEIgCADIgEABIgDADIgEAGIgCAHIgDAFIgBAFIADAOIAAAJIABAEIADACIAIABIAJgBIABACIAAABIAAADIAAABIADAAIABgDIABABIABABIAAABIgBABIgBABIAAAAIAAABIgBABIgBABIgFgBIgCgCIgBAAIgBAAIgCABIgBAAIgBABIABACIABABIgBABIgBABIgBAAIgCAAIgPAAIgHACIgCgBIgBgBIAAgBIgCAAIgOADgAsAAAIgGAAIgFgDQgCgCgBgDIABgJIACgCIADgFIACgCIAAAAIADgBIADAAIAFABIAGACIAEAEIACAEIAAAGIgDAGIgDAEQgDAAgDAAgAKMhVIgHgCIgFgDQgCgBAAgDIABgKIACgCIADgFIACgCIgBAAIADgBIADAAIAFABIAGACIAFAEIACAEIgBAGIgCAGIgEAEQgCACgDAAg");
	this.shape_4.setTransform(96.1,11,1,1,0,0,0,0.3,0.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AipBhIgKgEIgIgBIgCgCIgHgLQgBgCAAgEQgBgFACgEQACgGADgDIgFgRIgBgFIAAgEIACgDIABgCIABgBIAGgIIABgDIgBgDIgFgDIgBgDIABgPIAAgBIAAgCIAAgBIABgCIABgBIABgBIgBgEIAAgBIAEgFIAJgHIACABIACgBIAHgDIAHgBIANACIAEABIAEAEIACgCIADgBIACgCIABgCIACABIACgCIACgBIAGgCIANABIABAEIADAIIABAEIgBADIgDAFIgFACIgEABIgBAAIAAAAIABgDIgCgBIgDABIgBACIgBADIABALIAAAEIgCABIgCAEIgEAJIgFAGIgBABIAAABIgBAAIgFAAIgKAEIgFAAIgPAAIgJADIgDAEIgCAEIABADIACACIACACIADAAIADAAIADgCIACABIABABIABgBIABgBIABAAIACABIABgBIACAAIAIACIABgBIABgBIACgBIACAAIACAAIACAAIAFgCIACABIACABIAJAAIAEABIADABIAFACIACABIABACIACACIADABIAFACIAEANQAAADgCADIgFAHIgFAGIgFABIgPAGIgJADIgWACgAimBUQAEACAEAAIAIAAIAFgBIAEgDIAFAAIAFgCIADgBIADgBIAGAAIADAAIADgCIABgEIAAgDIAAgBQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAIAAgEQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAIgEgCIgJgCIgBAAIgKgCQgGgBgFAAIgBAAIgDgBIgBAAIAAABIgCABIgBAAIgCABIgCgBIgRAGIgCABIgGAHIgBADIABAFIADAEIAEACQADACADAAIACgBgAiogYIgBABIgCABIgBAAIgBABIgBACIgEAPIABACIAIALIABACIAEACIADABIAGgBIACAAIACAAIAGgDIAGgFIAEgFQACgEgBgDIAAgFIgDgFIgEgEQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAgBgBAAIgLgDIgBAAIgBAAIgBABIgCAAIgEgBgAiDgfIgBABIABABIACABIABAAIABABIACgBIAAAAIgCgCIgDgBgAptBQIgDgBIgDgBIgHgCIgCgCIgGgEIgCgBIAAgCIgBgBIAAAAIgBAAIgCgBIgEgLIgDgCIAAgCIgBgEIgEgIIgBgEIAAgDIAAgDIgEgNIABgCIAAgBIACgoIAHgIIABgCIAFgIIADgDIADgCIABAAIABgBIABAAIABgBIAAgBIAKgDIAKgCIAJABIAFABQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAIAAABIABAAIAAAAIAGAAIAHAAIADgCIACgCQABAAAAAAQABAAAAAAQABAAAAABQAAAAABABIACAEIADAKIgCAJIABADIAEAGIgBAFIAAAHIgBAFQgBACgDABIgDgBIgCgDQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIgBgBIgDgBIgBgBIgCgDIgCgHIgBgFIgBgBIgEgFIgCgCIgJgHIgBACIgCAAIgBAAIgCgBIgBgBIgBAAIgJACIgJgCIAAAAIgBAAIACAEIgBACIgIAIIgCADIAAAEIgCACIgDACIACAEIAAADIgBACIACALIgCAUIAEAMIABAHQAAAFACADIAKAJQACACABAEIADgBIALADIADgBQAEAAAEgCIAGgEIAFgHQADgCABgEIACgHIABgBIABAAIABgBIgBgBIAAgBIgBgBIAAgBIABgBIABgBIABgCIgCgDIgDgCIgEgBIgEgCIgDgDQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAIACgCIAPgGIACAAIAQACIAEACIACAFIAAABIAAACIgCADIgBAAIgBAAIgBABIAAACIgCABIgCABIgBAAIAAADIAAAcIACASIgBADIgCADIgDABQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAgBAAIgEgIIgDgBIgCABIgEADIgGADIgBACIgCAAIgJABIgEAAIgDABgAn6BNIgHgGQgGgCgEgCIgIgJIgFgJIgEgLIgCgIQAAgFACgGIgBgEIAAgGIAGgMQACgEACgBIACAAIAAgCIABgCIACgCIACgBIAQgGIAOgDIAFAAIAEACIAHADIAFACIAJAGIAEADQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABIAAABIAAABIABAAIAAABIACABIAAABIAEAEIAAACIACAHIAAADIgBAEIAAADIgDABIgCABIgBACIgBABIgCAAIgRgBIgSADIgNAAIgNADIgEACIAAABQAAAFADAEQADAFAFADQAFAEAFACQAGADAFgBIAHAAIAGABIAFgDIALgMIACgBIAHgCIACAAIAEAAIABAJIgCAFIgJAHIgCABIgNAIIgUADgAn2gJIgBABIAAAAIAAABIgHADIgGAEIgEABIgCABIgCACIgCAEIgBAGIABABIAIAEIAMAAIAPgCIASgBIAEAAIADgCIABgCIgEgOIAAABIgBABIgDAAIgBgCIgNgFIgHgCIgIAAgAl6BJIgFgBIgIgCIgDAAIgFgCIgGgFIgLgFQgDgCgCgDIgEgDIgGgKIgCgGIACgQIgBgBIAAgBIgBgBIgBAAIABgCIACgHIAAgCIABgBIABgCIAAgBIAAgCIABAAIABAAIAAgCIACgDIACgDIALgKIADgCIANgFIAQgCIAMACIAMAFIAAABIgBAFIAAAAIAGgBIACACIADABIACADIAIALIABACIABAGIgBAEIgDAHIAAABIABABIABAAIAAgBIgBgDIAAgBIABgBIABABIABACIABABIAAABIAAAEIgBACIAAABIgBABIACAFIgBAAIgBAAIgBAAIABAHIAAAEIgCABIgBAAIAAADIgBACIgDACIgDADIgDABIgBAAIABACIAAACIgBABIgIAGIgDADIgEABIgFgBIgDAAIgEADgAmXAqIAEAFIAOAIIAPAAQADAAADgCIAEgEIACgDIAEgEIADgCIABgBIADgEIABgBIgBgBIAAgFIABgDIACgBIABgBIAFABIAAgBQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAIgFAAIgCgCIAAgBIgCgLIgGgOIgCABIgDgBIgGgDIgWAAQgGABgEACIgIAHIgFAIQgCAFAAAFIADAQIADAEIAAADIABABIACgBIABABgAD1BHIgKgDIgIgBIgCgDIgHgKQgBgDAAgDQgBgFACgEQACgGADgDIgFgRIgBgGIAAgDIABgBIABgDIABAAIABgBIAGgIIABgDIgBgCIgFgEIgBgDIABgRIAAgBIAAgBIAAgCIABgBIABgCIABgBIgBgDIAAgCIAEgFIAJgHIABABIABAAIACAAIAGgDIAEgBIADAAIAOABIADACIAFAEIACgCIACgCIACgBIABgCIACAAIACAAIACgDIADgBIAEgBIANABIAAAFIAEAIIABADIgCAFIgDADIgEADIgFABIAAAAIgBgBIABgDIgBgBIgDACIgCABIAAAEIABAKIgBAEIgBAEIgDAEIgEAIIgEAHIgBABIgBAAIAAAAIgFABIgKABIgFABIgPgBIgJAEIgDADIgCAFIABADIACACIACABIADABIADgBIADgBIABAAIACABIAAgBIACAAIABAAIABABIABgBIACgBIACABIACABIAEAAIABAAIACgBIABgBIACgBIACAAIACAAIADAAIADgBIACAAIABABIANABIADACIAGABIABACIABABIADACIAFACIACACIAEAMQAAADgCAEIgEAGIgGAGIgEACIgFABIgUAIIgWACgADvAhIgCABIgDADIgDAEIgBADIABAGIADAEIAEADIAGABIACAAIACAAQADACAFABIAIAAIAFgBIAEgDIAFAAIAFgCIACgCIADgBIAEAAIADABIADgBIACgCIABgDIABgDIAAgBIACgCIAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAgBgBAAIgEgCIgJgCIAAAAIgLgDQgFAAgGAAIAAAAIgDgCIgBABIgBABIgBABIgBAAIgCAAIgDAAgAD1gxIgBABIgBAAIgBABIgBABIgBACIgEAPIABABIAIAOIABACIADACIADAAIADAAIAIAAQADgBADgCIAGgGIAEgHQABgDAAgEIgBgEIgCgGIgEgEIgEgCIgLgEIgCAAIgBABIgBABIgBAAIgFgBgAEag4IgBABIACAAIABABIABABIACAAIACgBIAAAAIgCgCIgDgBgAk5BAIgCgCIgBgCIAAgCIAEgFIACgBIADAAIADAAIAGgBIAFgDIADgEIABgFIgBgFIgCgnIgDgLQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAIgNABIgEgBIgEgCQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAIAAgEIACgCIAGgCIADAAIAQgCIAIABIADACIAEAGIADABIACAAIADgEIACgBIAEgBIADgCIAHgEIAHgBIAEgCIACgBIAHABIAGACIAHAEQACACAAADIAFAJIABAEIAAADIgFAJIgBAAIgMABQAAAAgBAAQgBAAAAAAQgBgBAAAAQAAAAgBAAIgDgFIgCgEIgBgFIABgFIgBAAIgCAAIgBABIgCAAIgCgBIgDABIgEACIgDAFQgBAAAAAAQAAABgBAAQAAAAAAABQAAAAAAAAIgEABIgDADIgEAGIgCAGIgDAEIgBAFIADAOIAAAJIABAEIADADIAIABIAJgBIABABIAAACIAAADIAAABIADgBIABgCIABABIABABIAAAAIgBABIgBABIAAACIAAACIgBABIgBAAIgDAAIgCgBIgCgCIgBAAIgBAAIgDACIgBABIABACIABABIgBAAIgBABIgBAAIgCAAIgPAAIgHACIgBgBIgBgBIgBgBIgBAAIgEABIgEABIgHABgAADApIgDgCIgBgEIgBgDIAAgMIgCgFIgCgFIgBgNIgEgPIgCgJIABgEIgCgFIgCgCIgBgEIAAgCIACgCIABgDIAAgEIAAgBQABAAAAAAQABAAABAAQAAABAAAAQABAAAAAAIABAIIADAGIAFARIABADIAAAMIABAHIACAAQABAAABAAQAAAAABAAQAAgBABAAQAAgBAAAAQACgCgBgDIgBgIIACgIIACgGIAAgRIAAgHIACgHIAAgEIgBgFIABgEIgCgFIgEgDIgFgCIgCAAIgEABIgCABIgFACIgCACIAAABIgCAEIgBACIABABIACAAIABACIABACIAAABIgBADIgBABQgBABAAAAQAAAAgBgBQAAAAAAAAQgBAAAAgBIgDgDIgEgIIgCgCIgBgBIgHgBIgDgBIgBgCIgBgCIABgCIADgCIADgCIADgBIAFABIAIgCIANACIACgBIADgCIADgBIAEgBIAQAAIABgBIADgBIADAAIAHADIAEAAIADAAIAKgFIASgBIAFACIAAACIAAABIABABIgBAAIgCAFIgHAKIgFAnIAAACIABAFIAAAGIgDARIACAIIAAAKQAAAEgCAEIgBANIgEAGIAAABIgCABIgKgCIgCgCIgCgDIgCgHIgFgUIAAgIIgHgdIAAgCIABgBIAAgBIAAgBIgBgDIgEgKQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABIgBACIgBAJIgCAFQAAAAAAAAQAAABgBAAQAAAAAAAAQgBAAAAABIABABIABABIABACIABABIgBACIAAABIgBABIAAABIABAMIgBAKIABADIAAADIgCAFIAAABIACAIIgBAFIgCAGIgEAFQgCACgDABgAAmhUIgEACIgCAEIgBAFIABADIAEAFIABACIAAACIgBABIgBACIAAACIAFALIABAKIAAABIABABIACABIABADIgBAJIAAAAIACABIABADIAAADIgBADIACAAIAEgBIABgEIgBgFIABgFIABgCIAEgeIgCgHIAAgCIACgHIAAgCQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAgBIgFgDIgFgCIgFgBIgEACgAB4AjQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIAAgBIgCABIgCAAQAAABgBAAQAAAAAAgBQgBAAAAAAQgBgBAAAAIgFgFIgEgFIgCgFIABgCIABgBIgCgFIACgIIAEgFIADgEIADgCIAEgCIADgDQABAAAAABQAAAAABAAQAAAAABAAQAAABABAAIANgDIAEABIADgBIADgCIAEgCIAOgFIADgCQACgCgBgDQAAgDgCgDIgFgHIgHgDQgDgCgDAAIgBAAIgBAAIgKACIgEADQgCACAAADIABAIIgBAEIgDAEIgFACIgFABIgFgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBIgDgEIgBgGIABgEIAEgJIABgGIACAAIAUgJIAIgBIASACIAIAEIAHAFIAEAFIACAGIADAOIAAARIAFAbIABADIABABQAAAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBIAEgGQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIADABIABABIABACIAAACIgBADIAAADIgBACIgBABIgIAFIgGACQgDAAgDgBIgEgDIgEgDIgDAAIgCAAIgEADIgGACIgIADIgJACIgRABgACogPIgMAGIgMACIgEABIgOAFIgCABIgBAAIAAAAIgFAFIgDADIgBAFQAAAAAAABQAAAAABABQAAAAAAABQAAABABAAIAEAEIAFACIAGABIAKABIAMgCIAGgDQADgBABgDIACgDIACgCIADgFIABgEIABgJIgBgCIgBgFIgCgCgAFQAZIgDgCIgBgDIgBgDIABgCIABgCIADgDIAHgBIADgBIACgEIAAgIIgBgFIgBgBIAAgBIABgCIABgEIgCgGIABgFIgBgFIAAgEIgCgKIgDgFIgMgEIgEgDIgBgFQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBIAEgCIAJgBIALABIACABIACABIACADIABACIABACIABAEIACAEIABgCIABgBIABgCIAFgEIACgCIABgBIABgCIAAgBIACgBIAAAAIACgBIADgCIAEgCIAHgBIAHgBIAHABIAGADQADABADADIACAEIADACIABACIAAAGIACAEIABADIABARIgBAKIAAACIABACIAAAHIACAFIgBABIAAABIgBABIgBACIACAAIACADIACACIADABIACgBIACgBIADABIACACIACADIAAAEIAAABIgCACIgCABIgCAAIgDAAIgDAAIgKADIgBAAIgBAAIgDAAIgEACIgKgCQgFAAgDgDQgDgDAAgFIAGgDIAPgBIgEgaIABgUIAAgEIgCgCIgBgGIgCgDIgCgCIgDgCIgKAAIgJADIgDACIgBABIgBACIgCACIgBABIgCAAIgCABIAAACIgBABIgBACIgBABIAAgBIgBAAIgBABIAAADIgBABIgBAAIgBAAIABACIgBACIgCAEIgBACIACAIIAAABIgBACIgBABIAAADIADAGIABADIgBAEIACAEIABABIAIADIAEADIAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAABABAAIAAACIAAAGQAAAAAAAAQgBABAAAAQAAAAgBAAQAAAAgBABIgGACIgZABgAGmgCIgBACIgBAAIAAAAIABABIABABIABgBIAAgBIABAAIABgBIgBgBIgBgBIgBABgAFegTIACABIAEACIACAAIABgCIgCgDIgBgCIgBgBIgCACIgCAAIgBAAgAGigVIAAACIAAACIACABIABgBIABgCIAAAAIgBgCIgCgBIgBABgAHzAQIgJgBIgHgFQgGgCgEgCIgIgHIgFgJIgEgLIgCgIQAAgFACgFIgBgGIAAgFIAGgOQACgDACgCIACAAIAAgCIABgCIACgCIACAAIAQgHIAOgDIAFABIADABIAHADIAGACIAIAFIAEAEQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAABIAAABIAAgBIABABIABADIABACIAEAEIgBACIACAHIAAADIAAAEQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAIgFADIgBACIgBABIgBAAIgRgBIgSADIgNAAIgJABIgIAEIAAABQAAAFADAEQADAEAFAEQAFAEAFABQAGABAFAAIAHAAIAFABIAFgCIAMgLIACgBIAGgBIACAAIAFAAIAAAJIgCAEIgIAFIgQAJIgTADgAHuhGIgBABIAAAAIAAACIgHACIgGAFIgEADIgCAAIgCACIgCAEIgBAGIABABIAIAEIAMABIAPgDIARgBIAEAAIADgCIABgCIgDgRIgBACIAAABIgDgBIgCgBIgMgFIgHgCIgIAAgAI2AKIgCgCIgBgCIAAgCIAEgEIACAAIADAAIADAAIAGgBIAFgCIADgFIABgFIgBgFIABgKIgDgOIAAgRIgDgLQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAIgNABIgEgBIgEgCQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAIAAgEIACgCIAGgCIADAAIAEAAIAMgCIAJABIACACIAEAGIADABIACAAIACgCIABgCIACgBIAEgBIADgCIAIgEIAHgBIADgCIADgBIAGABIAHACIAGAEQADACAAADIAFAKIABADIgBAEIgEAIIgCAAIgLABQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAAAIgDgEIgCgFIgBgFIABgFIgBAAIgCAAIgCABIgDgBIgEABIgEADIgDAEQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAAAAAIgHAEIgDAGIgDAIIgDAEIAAAFIADAOIAAAJIABAEIADADIAIABIAJgBIABABIAAACIgBADIABABIACgBIABgCIACABIABABIgBABIAAAAIgBAAIAAABIAAACIgBABIgCABIgDgBIgCgBIgBgCIgCAAIgBABIgCABIgBAAIAAABIABACIAAAAIAAABIgCABIgBAAIgBAAIgPAAIgIACIgBgBIgBAAIgBgBIgBgBIgEABIgEABIgHACg");
	this.shape_5.setTransform(69.7,12.8,1,1,0,0,0,0.1,-0.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AsJBtIgEgCIgDgDIgBgEQAAgEABgBIAEgDIAIgEIABgEIgCgOIABgHIgDgJIgBgHIABgEIABgGIABgDIgCgMIAAgIIgCgHIABgDIAAgCIgCgCIABgDIgBgDIgBgFIgCgCIgEgCIgDAAIgCgBIgBgCQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAIADgDIANgHIACgBIABABIADgBIACABIABAAIABABIABABIADABQADABACACQADABAAAEIgBADIABACIAEAKIACADIAEASIgBAFIAHATIAAAEIAEARIADAEIACACIADgBIAAgFIABgCIACgDIACgIIgBgjIACgKIAAgCIACgCIABAAIgBgBIgBgBIgBgBIAAAAIAAgBIABgBIACgEIgBgMIABgFIADAAIACgBIADgBIAFgCIABAAIABAAIAHgCIABAAIAAAAIAAABIABAAIADAAIAFgBIABABIADACIACAAIADABIABACQAAAEgBABIgIADQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABAAAAIgCAJIAAACIABAFIADAEIABALIgBASIAAAGIgBAFIABAIIADAQIgBAPIABAEIABABIADABIADAAIADgBIADAAIACACIABABIAAABIAAACIAAAAIgCADIgEACIgHACIgTgBIgEgBQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIADgCIAGgBIADgCQAAAAAAgBQAAAAAAAAQAAgBAAgBQAAAAAAgBIAAgEIgCgDIgBgGIABgGIgDgOIAAgGIgCgIIABgLIAAgEIgFgNIgDADIgDAHIAAAEIgDAPIgBAbIgCAJIgBAEIAAADIAAACIAAAIIgEAHQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAAAAAIgDACIgEABIgDABIgGgIIgEgLIgCgEIgBgCIABgCIAAgCIgHgZIgBgJIgDgJIgFgJIAAgBIgBgFIgBgBIgBACIgBACIAAABIgBABIgCACIAAACIADAJIgBAEIACAMIAAAIIABAKIgBAOQAAAEABACIAJAEIAEACIgCAHIgCACIgFACIgBABIgBABIgBABIgGAAIgDAAIgHABgArXBRIAAABIAAAAIABAAIADgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAAgBIgBAAIgBAAIgDAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABgAr7AAIAAAEIADABIAAgBIAAgBIgBgDIgCgBgAp1BhQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBIAAAAIgCABIgCAAIgDgCIgFgEIgGgKIACgEIgCgEIACgIIAEgIIADgEIAHgEIADgCQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAIANgCIAEABIADgBIADgCIAEgDIAOgEIADgDQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgDgCgEIgFgGIgHgEQgDgCgDAAIgBAAIgBABIgKACIgEACQgCACAAAEIABAHIgBAFIgDAEIgFACIgFAAIgFAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBgBgBIgDgEIgBgFIABgEIAEgKIABgFIACAAIACgCIADAAIAPgFIAIgBIASABIAIACIAHAFIAEAGIACAGIADAOIAAAQIAFAeIABADIABABQAAAAABAAQAAAAABgBQAAAAAAAAQABgBAAAAIAEgGIAEgCIADABIABABIABABIAAADIgBADIAAADIgBABIgBABIgIAFQgDACgDAAIgGgBIgLgGIgCAAIgEAEIgGABIgIAEIgJACIgRABgApFAuIgGAEIgGACIgMACIgEABIgOAEIgCABIgBABIAAACIgBABIgEADIgDAEIgBAEQAAABAAAAQAAABABABQAAAAAAABQAAAAABABIAEADIAFACIAGACIAKAAIAMgCIAGgCIAEgEIACgEIAFgGIABgEIABgLIgBgCIgBgFIgCgCgAoVBeIgCgBIgBgDIAAgCIAEgFIACgBIAGAAIAGgBIAFgDIADgEIABgFIgBgEIABgLIgDgOIAAgRIgDgKQAAgBgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAIgNABIgEgBIgEgBQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBIAAgEIACgCIADAAIADAAIADAAIAQgCIAJABQAAAAAAAAQABAAAAABQAAAAABAAQAAAAAAAAIAEAFQAAABABAAQAAAAAAAAQABAAAAAAQABAAAAAAIACgBIACgBIABgBIACgBIAEgCIADAAIAEgCIALgDIADgCIADgCIAGABIANAHQADABAAACIAFAKIABADIgBAEIgEAIIgCAAIgLABIgEgBIgDgEIgCgFIgBgFIABgGIgBAAIgCABIgCABIgBAAIgCgBIgEABIgEADIgDADIgCAEIgDABIgEACIgDAGIgDAHIgDAFIAAAFIADAOIAAAJIABAEIADADIAIABIAJgBIABABIAAACIgBADIABABIACgBIABgCIACABIABAAIgBACIAAABIgBABIAAABIAAACIgBABIgCAAIgFgBIgBgBIgCgBIgBABIgCAAIgBABIAAABIABABIAAABIAAABIgCACIgBAAIgBAAIgPgBIgIACIgBAAIgBgBIgBgBIgBgBIgPAEgAmZBdIgKgKIgBgCQAAgBAAAAQABAAAAgBQAAAAAAAAQABAAAAgBIADgCIAHgBIAKAAIAIgBIAEAAIAIgBIAEgDIABgJIgEgdIABAAIAAAAIABgBIgCgIIABgFIAAgFIgBgDIgDgEIgCgBIgEgBIgEAAIgIAEIgFAAIgRgBIgDgBIgBgDIABgDIACgDIAEgCIAlgCIAGAAQAEABACACIADAEQACACAAAEIAAAFIgDAFIABACIACAAIABABIAAACIAAACIACABIADAmIACAEQAAAAAAAAQABABAAAAQABAAABAAQAAAAABAAIARgDIAFABIAFACIAEADIAEABIABAAIABACIAAABIAAACIAAADIgCACIgCACIgDABIgBAAIgBgBQgBAAAAAAQAAgBAAAAQgBAAAAAAQgBAAAAAAIgIgBQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBgBAAIgCgCIgCgBIgJACIgPAHIgIACIgEAAIgFgBIgBAAIgDABIgBAAIgBAAIgBABIABABIgHADIgIACIgFAAgAktBQIgCgCIgCgCIAAgDIAAgDIACgCIADgCIAHgBIADgBIABgEIAAgKIgBgFIgBgBIABgCIABgBIABgEIgCgGIAAgGIgBgEIAAgEIgCgLIgCgEIgEgCIgJgBIgDgCIgBgGQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBIADgCIAJgBIALABIADABIACABIACACIABADIAAACIABADIADADIABAAIAAgCIACgBIAFgEIACgDIABgBIAAgBIABgBIABgBIABAAIACgBIACgCIAFgCIAGgCIAIAAIAGAAIAHADIAFAFIADADIACADIABACIAAAFIACADIACADIAAARIgBAJIABACIABADIgBAHIACAFIAAABIgBABIgBABIAAABIABADIACADIADABIADABIACAAIACgBIACABIADACIABADIABADIgBACIgBACIgDABIgCAAIgDAAIgDAAIgJADIgBgBIgBAAIgEABIgDABIgLgBQgFAAgDgDQgCgDAAgFIAGgDIAOgBIgEgcIACgVIgBgDIgCgDIgBgFIgBgCIgCgCIgEgBIgJAAIgFABIgIACIgBABIgBACIgBABIgCABIgCABIgBAAIgBACIgBACIAAACIgBABIgBgBIgBAAIgBABIAAACIgBABIgBAAIAAABIAAACIAAACIgDAEIAAACIACAHIAAACIgBACIgBABIgBACIAEAHIAAADIAAAGIABAEIACABIAIADIADACIABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAAAAAABIABACIgBAFQAAABAAAAQAAAAAAABQgBAAAAAAQgBAAAAAAIgGACIgZACgAjWAzIgBACIgBACIgBABIABABIACABIAAgCIABgBIABgBIAAgCIAAgBIgCgBIAAABgAkeAiIABACIACABIADAAIABABIABgCIgBgEIgBgBIgCgBIgCABIgCABIAAAAgAjaAhIgBABIABADIABABIACgCIAAgCIAAAAIAAgCIgCAAIgBABgAiQBKIgCgBIgDgEIgCgBIgCAAIgCAAIgCgEIgFgGIgCgCIgCg0IgCgIIgDgCIgNgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBIgDgCIgBgEQAAAAAAgBQAAgBAAAAQABAAAAgBQABAAAAgBIAFgDIALgDQAFAAAFACQAFABAEADIABABIABALIAAAHIABAEIAAACIAAACIACALIAAAFIgDAQQAAADACADIAEAFQADADADABIAHABIAFgBIADgCIADgCIADAAIACgBIADgDIACgBIADgBQABgBAAAAQAAgBABAAQAAgBAAAAQAAgBAAAAIAAgBIABAAIAAAAIABAAIABgBIAAgBIACgDIABgDIABgEIAAgEIgBgCIAAgDIAAgIIgBgCIgBgCIABgCIABgBIgBgCIgCgCIgBgBIAAgCIABgCIgBgDIgCgCIgDgBIgHgBIgDABIgDgCIgCgEIgBgDQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAIAFgDIAKgCIADABIAGgBIAEgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABIADADIACAKIAAAMIADANIgBACIgBACIAAAEIAAABIABAGIgBABIAAABIACAGIgBAHQAAAFADACQAEACAEAAIAFgBIACACIACACIACACIABAEIgBADIgCAEIgEADIgDACIgQgBIgCgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgCgDIgCgDIgDgCIgRAKIgJADIgMACgAgtBEIgBgDIgBgCIgDgDIAAgDIABgTIgCgFIgBgCIgBgBIAAgCIADgEIABAAIACAAIADACIACAAIAEAKIAGAIIACABIACABIACABIABAAIACAAIACAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAABAAAAIAAAAIABAAIAPgCIADAAIACABIAIgIIAEgBIABgCIgBgDIABgBIACgBIAAgDQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBgBAAIgDgFIgGgDIgGgCIgJgBIgFABIgFABQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBAAAAAAIgFgCIgDgCQgBACgDABIgEACIgFgBIgEgCIgDgEIgCgFIAAgCIgCgBIgBgDIgBgDIAAgHIABgDIABgCIAEgDIABgDIAAgCIACgBIACgBIABgBIAAgBIABgBIAEgCIAZgCIAGAAIAGADIACAAIADgBIADgBIACABIACABIABgBIABgBIADABIAEAFIABADIgBAOIACAHIgDACIgDADIgCgCIgCgCIgCgBIgDAAIAAgBIgBgBIABgEIAAgBIgFgEIgCgBIgBAAIgDgCIgBgBIgGACIgEAAIgHgCIgGgBQgBAAgBAAQAAABgBAAQAAAAgBAAQAAABAAAAIgCADIgCADQAAABAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAIgBAAIADAFIAFAGIAEACIABABIACABIABABIABAAIAGgCIAFAAIACAAIACAAIABAAIABAAIAFAAIAFAAIAEAAIAFACIAOAMIABADIADAIIgBADIgBAEIgBADIgBAFIgLALIgDACIgCAAIgCAAIgCAAIgEADIgCAAIgDACIgJgBIgDAAIgGAAIgGgCIgDAAQgDAAgCACIgGAHIgEACgAB4A1IgBAAIgEgDIgDgEIgCgFIgBgIIABgDIgCgJIABgGIgCgFIABgCIAAgBIAAgFIAAgBIAAgBIABgBIABgCQABAAAAAAQAAABABAAQAAAAABABQAAAAABABIAGAIIABAEIgBABIAAABIABAGIAAACIAAACIABACIACABIABABIACAAIACAAIAEAFIAGAEIARABIAHgBIAFgCIAIgHIAEgCIAGgFIAFgGIABgDIgBgBIgBgLIgCgDIgCgDIgIgEQgCgCgCAAIgKAAQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAgBIgCAAIgDABIgJgCIgGAAIgCAAIgDgBIgCgCQgGgDgGgBIgDgFIgEgDIgEgIIgCgJIAAgEQAAgBAAAAQABgBAAAAQAAgBAAAAQABgBAAAAIABAAIAAgBIAAgBIgBgBIAAgBIABgEIAOgPIABAAIABAAIADAAIACgBIAAgBIACgBIACgBIAdgBIAEABIADAAIADgBIABgBIABgCIACgBIAEABIAEABIAAABIAAACIAEAMIAAACIAAACIACAFIgBADIABAMIgBAHIgCABIgDgBIgDgCIgBgDIgDgHIgHgLIgDgDIgDgBIgDAAIgOgCIgMADIgKAGQgDAGABAGIABAHIADAEIAJAGIAFACIAMgBIAEABIAGACIAEAAIADgBIADAAIACABIANAGIALALIABAFIACABIABADIgBATIgBgCIgCAAIgCABIgBACQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAIACAAIACAAIgBACIgBADIgEAEIgBACIgDAEIgCABIgBgBIgCAAIgBABIAAACIAAABIgCACIgXAJIgJACIgZgEIgGACIAAABIgBABIgCAAgADyAsQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAIAAgBIgBABIgCABIgEgCIgFgFIgDgFIgCgEIABgCIAAgCIgBgFIACgIIADgHIADgDIAEgBIADgCIAEgDQAAABABAAQAAAAAAAAQABABAAAAQABAAAAAAIAOgCIADAAIAEgBIACgCIAEgCIAOgEIAEgDQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAgBQAAgDgCgDIgFgGIgHgEQgEgCgDAAIAAAAIgBAAIgLACIgEADQgBACAAADIABAIIgBAFIgEADIgFACIgFABIgFgBQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBAAAAgBIgDgEIgBgFIAAgFIAEgJIABgFIACgBIAVgIIAHgCIASACIAIAEIAHAFIAEAFIADAHIACAOIABAQIAFAcIAAADIABAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAABAAIAEgHQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIAEAAIABABIABACIgBADIgBADIAAACIAAACIgBABIgIAFQgDACgDAAQgDAAgDgBIgMgHIgCABIgEADIgFACIgJAEIgIACIgSAAgAEigGIgGAEIgFACIgNABIgDABIgPAEIgBABIgBABIgBABIgFAFIgCAEIgBAEQAAAAAAABQAAABAAAAQAAABABAAQAAABAAAAIAEADIAFADIAGABIAKABIAMgDIAGgCIAFgDIACgEIABgCIADgEIACgFIAAgKIAAgBIgBgFIgCgBgAFbAqIgFgBIgCgCIgCgDIAAgCIAAgDIACgCIADgCIAHgBIADgCIABgEIAAgKIgBgEIgBgCIABgBIABgCIABgBIgCgHIAAgFIgBgEIAAgFIgCgKIgCgFIgNgEIgDgDIgBgFQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAIADgDIAJgBIALABIADABIACACIACACIABACIAAACIABAEIADAEIABgCIAAgBIACgCIAFgEIACgCIABgBIAAgCIABgBIABAAIABAAIACgBIACgDIAEgCIAHgBIAHgBIAHABIAGADQADABADADIACAEIADACIABADIAAAFIACAFIABACIABARIgBAKIAAACIABACIAAAFIACAFIgBABIAAABIgBABIgBACIACADIACACIACACIADABIACgBIACgBIADABIACADIACADIAAADIAAACIgCABIgCACIgCAAIgDgBIgDABIgKACIgBAAIgBAAIgDAAIgEACIgKgCQgFAAgDgDQgDgDAAgEIAGgDIAPgBIgEgbIABgUIAAgDIgCgDIgBgGIgCgDIgCgCIgDgCIgKAAIgJADIgDACIgBABIgBACIgBACIgCABIgCAAIgBABIgBACIgBACIAAABIgBABIgBAAIgBgBIgBABIAAADIgBABIgBAAIAAABIAAACIAAACIgDADIAAACIACAIIAAACIgBABIgBAAIgBACIAEAHIAAACIAAAHIABADIACACIAIADIADACIABAAQAAAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAIABADIgBAFQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABAAAAIgGACIgTABgAGsAMIgBACIgBABIAAABIABACIABAAIABgBIAAgCIABgBIABgBIgBgBIgBgBIgBABgAFlgDIABABIAFACIABAAIABgCIgBgDIgBgCIgCAAIgCABIgCAAIAAAAgAGogFIAAACIAAACIACABIABgBIABgCIAAAAIgBgCIgCgBIgBABgAHnAcIgHgFIgHgGQgCgDgBgDIAAgDIgEgEIgCgDQgCgCgBgEIgBgIIAAgHIAFgZIAHgHIABgBIAAgBIABAAIABgBIACgBIAAgBIABgBIAAgBIACgBIAEgBIAKgEIAEgBIAHABIAGABIANACQABAAABAAQAAAAABgBQAAAAABAAQAAAAABgBIACgDIABgEIgCgUIgBABIgCAAIgBgBIgCgCIgCAAIgBABIgBABIgCAAIgHABIgDgBIgDgCIgDgDIgBgDIAAgCIACgDIADgCIADgBIACABIADAAIAIgCIAIABIALgBIADACIAAAAIADAIIAAAGIgBAEIACANIADBFIABAGIACAGIAEAGQADADAEgBIACAAIABAAIADAAIABACIACACIAAADIAAACIgCABIgCABIgDgBIgBABIAAABIgBACIgFABIgJgBIgEABIgFgDIgBgDQAAAAAAAAQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBAAIgCAAIAAgBIgDACIgDADIgBABIgCABIgHAEIgFABIgMABgAHygvQgFAAgEADQgEADgCAFIgEAJIgBAJIABAHIAAACIgDAEIgBACIABAAIAEAAIACADIAFAIIADADIAIAFIAIACIANgDIACAAIAFgHQADgDAEgCIgBgCIAEgYIgBgIIgDgHQgCgEgDgCQgDgDgEABIgHgEIgCAAIgEABIgBABIgCABIgDgBgAJpAYIgHgEIgLgGIgHgIIgGgHIgEgLIgBgIQgBgFADgFIgCgFIABgGIAGgOQABgEACgBIACAAIABgCIABgCIABgCIATgIIANgCIAFAAIAEACIAHADIAGACIADADIAFACIAEAEQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABIAAABIAAABIABgBIAAABIACADIAAACIAEAEIAAACIACAHIAAAEIgBADQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAABIgDABIgCABIgBACIgBABIgCAAIgQgBIggADIgIABIgFACIgDACIAAABQAAAFADAEIAHAGQAFAEAGACQAFADAGgBIAGAAIAGABIAFgDIALgKIACgBIAHgCIACAAIAEABIABAHIgCADIgJAIIgGADIgGAEIgDABIgTAEgAJsg7IgBAAIgEABIgDACIgGAFIgEACIgCABIgCABIgBAFIgBAFIABADIAIADIALAAIAlgDIADgCIABgCIgDgQIgBABIAAABIgDgBIgCgBIgNgFIgOgCIgBABIgBAAgAK1ATIgDgBIgBgDIABgCIAEgFIACgBIAGAAIAFgBIAFgDIAEgDIABgEIgBgFIAAgKIgCgOIgBgRIgDgKQAAgBAAAAQgBAAAAgBQAAAAgBAAQAAAAgBAAIgMABIgFgBIgEgBQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgEIACgDIACgBIAEAAIAGAAIANgCIAIABIADACIAEAGIADABIACgBIABgBIACgBIACgCIAEgBIADgDIADgBIALgDIAEgCIACgCIAHABIAGADIAHAEQACACAAADIAFAKIABADIAAAEIgFAIIgBAAIgMABQAAAAgBAAQAAAAgBgBQgBAAAAAAQAAAAgBgBIgDgDIgCgFIgBgFIABgGIgBAAIgCABIgBABIgCAAIgCgBIgDABIgEADIgDADIgCAEIgEABIgDACIgEAGIgCAHIgDAFIgBAFIADAOIAAAJIABAEIADABIAIABIAJgBIABABIAAACIAAADIAAABIADgBIABgCIABAAIABABIAAABIgBABIgBACIAAABIAAACIgBABIgBAAIgDAAIgCgBIgCgBIgBgBIgBABIgCAAIgBABIgBABIABABIABABIgBABIgBABIgBABIgCAAIgPgBIgHACIgCAAIgBgBIAAgBIgCgBIgOAEgAmBgUIgHgCIgFgDQgCgCAAgDIABgJIACgCIADgGIACgBIgBAAIADgBIADAAIAFABIAGACIAFAEIACAEIgBAGIgCAGIgEAEQgCACgDAAg");
	this.shape_6.setTransform(82.3,10.3,1,1,0,0,0,0.2,-0.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AsmBsIgEgCQAAgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBIABgEIAEgEIAHgGIAAgIIADgFIAAgBIgBgBIgCgEIgBgLIAAgDIABgDIgBgCIgBgCIABgOIAAgBIgBgCIABgCIgCgIIAAgCIACgJIgBgCIgBgCIAAgDIABgCIgBgCIgDgHIgDgCIgCgCIgEAAIgDgBIgEgEIAAgCIABgEIADgCIAMgCIAFgBIAIgBIATgBIAQgCIAPAAIANgCIADAAIAHAHIACADIADAGIAAADIAAAEIAAADIACABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBABAAAAIAEAIIgBACIgCAFIAAACIAAAAIgCAAIgEgBQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBIgBgBIgBgFIgCgBIAAgCIABAAIgCgLIAAgEIACgEIgBAAIgCAAIgCgBIgSADIgCAAIgNACIABgBIABAAIgBgBIgBAAIgDADIgGABIgDgBIgDAAIgEgBIgCgCIgBABIAAACIgBABIgDACQAAAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAIACAgIABAEQABABAAAAQAAABAAAAQABAAAAAAQAAABABAAIAKgBIAGgCIAFABQABAAAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIABgEIABgGIgCgNIABAAIAJABIACAAIACAIQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAIACADIAAADIAAAEIABACIAAABIgBAGIAEAXIgCAGIgCADIgEgBIgCgDIgCgGIgBgIIgFgCIgIAAIgEAAIgGABIgEADQgBABAAAAQgBAAAAABQAAAAAAAAQAAABAAAAIAAADIACAQIgBALQAAADACACIAEACIAKABIAjgCIAFgCIAEgCQACgCABgDIABgBIABgBIAAAAIAAgBIgBgDIAAgEIgBgEIABgKIAAgDQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAIADgCIADgBQAAAAABAAQAAABABAAQAAAAABAAQAAABAAAAIADAEIACAJIAAAHIgEAWIgBACIgBACIgBAAIgCACIgDABIgQACIgDABIgBAAIgCAAIgBAAIgCABIg6AGgAsaAhIAAABIAFADIAFAEIABAAIABgBIgBgDIgCgCIgEgCIgDAAIgCAAgAqtBlIgCgCIgBgCIAAgCIAEgFIACgBIADAAIADAAIAGgBIAEgDIAEgEIABgFIgBgFIABgKIgDgOIgBgRIgCgLQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAAAAAIgNABIgEgBIgFgCQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAIAAgEIACgDIAGgCIADABIAQgCIAIABIADABIAEAHIADABIACgBIABgBIACgCIACgBIAEgBIADgDIAEgBIAKgDIAEAAIADgCIAGABIAGABIAHADQACADAAADIAGAJIABAEIgBADIgFAJIgBgBIgMABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBIgEgEIgCgFIAAgEIAAgGIAAAAIgCABIgCABIgCgBIgCgBIgDACIgEACIgDAEQgBABAAAAQAAAAgBABQAAAAAAABQAAAAAAAAIgEABIgDADIgDAGIgDAHIgDAFIAAAFIACAOIAAAJIABAEIAEADIAIABIAJgBIABABIAAABIgBAEIABAAIACAAIABgDIABABIABABIAAABIgBABIgBABIAAACIAAABIgBABIgBABIgDAAIgCgBIgCgCIgBAAIgBAAIgDACIgBABIACABIAAABIAAABIgCABIgBAAIgCAAIgPAAIgHACIgCgBIgBgBIAAgBIgCAAIgDABIgLACgAo2BeIgCgCIgCgDIAAgCIAAgDIACgCIACgCIAHgBIADgCIACgEIAAgKIgBgEIgBgCIAAgBIABgCIACgDIgDgHIABgFIgBgEIAAgFIgCgKIgCgFIgNgEIgEgDIAAgFQgBgBAAAAQAAgBABAAQAAgBAAAAQAAAAAAAAIAEgCIAJgBIALABIADABIABABIACABIABACIABACIABAEIADAEIABgCIAAgBIABgCIAGgEIABgCIABgBIABgBIAAAAIACAAIAAAAIADgBIACgDIAEgCIAHgBIAIgBIAGABIAGADQADABADADIACACIADACIABADIAAAFIACAFIABACIABARIgBAKIAAACIABACIAAAHIACAFIgBABIAAABIgBABIgBACIACADIACACIADACIACABIACgBIADgBIACABIACADIACADIAAADIAAACIgCABIgCACIgCAAIgDgBIgDABIgJACIgBAAIgBAAIgEAAIgDACIgLgCQgFAAgDgDQgCgDAAgEIAFgDIAPgBIgEgdIACgUIgBgDIgCgDIgBgGIgCgDIgBgCIgEgCIgKAAIgJADIgDACIgBABIgBACIgBACIgCABIgCAAIgCABIAAACIgBACIAAABIgBABIgBAAIgBgBIgBABIAAADIgBABIgBAAIgBABIABACIgBACIgCADIAAACIACAIIAAACIgBACIgBABIgBACIADAHIABACIgBAHIACADIABACIAIADIAEACIABAAQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIAAADIAAAFQAAAAAAAAQAAABgBAAQAAAAAAAAQgBABAAAAIgHACIgGABIgTAAgAnfBBIgBACIgBABIgBABIABACIACAAIAAgBIABgCIAAgBIABgBIgBgBIgBgBIAAABgAonAwIABABIAEACIACABIABgDIgBgDIgCgCIgBAAIgCABIgCAAIAAAAgAnkAuIAAACIAAACIACABIACgBIAAgCIAAAAIAAgCIgDgBIgBABgAm2BaIgCgGIgCgCIAAgEIAAgSIgBgGIgBgCIgBgBIAAgCIADgDIAAgBIACABIADABIACABIABAAIADAKIAHAHIABACIACAAIACABIACABIACgBIABAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAABIAAAAIABAAIAPgCIAEAAIAEABIACgCIAGgGIADgBIABgBIgBgDIABgBIACgCIABgCQAAgBgBAAQAAgBAAgBQAAAAgBgBQAAAAgBgBIgDgEIgGgDIgMgEIgFAAIgFABIgFACQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAIgFgCIgDgCIgDAEIgFABIgFgBIgEgCIgDgEIgBgEIgBgDIgBgDIgBgCIgBgDIAAgHIACgGIADgBIABgDIAAgCIACgBIACAAIABgBIAAgBIABgCIAEgBIAFgBIAagCIAKADIADAAIAEgCIACACIABAAIABAAIABgCIADABIAEAFIABADIAAANIABAHIgDABIgCADIgDgBIgCgCIgCgCIgCAAIAAAAIgBgBIgBgBIACgEIgBgBIgFgEIgBgBIgCAAIgFgCIgBAAIgGABIgLgBQgDAAgDAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIgDAHQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgBAAIADAGIAFAGIAEADIACABIABABIACABIAAAAIADgBIADgBIAFABIACAAIADgBIABAAIABAAIAGABIAKgBIAEACIAOAMIACADIACAJIgBACIgBAFIAAACIgCAFIgEAEIgDAEIgEAEIgDABIgEAAIgCABIgCABIgGADIgDAAIgJgBIgDABIgDAAIgDgBIgFgBIgEgBIgEACIgHAHQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAAAAAgAkyBQIgBgCIgCgCIgDAAIgCgCIgBgHIgBgBIgDgBIgDgDIgBgDIgBgGIgDgEIAAgCIgBgNIABgHIABgCIABgBIAAgCIgCgDIACgFIABgKIgBgCIgGgCIgKAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIgEgDQAAgBAAAAQAAgBgBAAQAAAAgBAAQAAgBgBAAIgCAAIgBgDQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAIADgDIAIgDIADgBIAHgCIADgCIACgDIgCgQIAAgHIAEgGIABgBIADgDIABgBIACAAIABABIACADIADARIAAAEIgBAEIAFAHIABACIAMACIATgBIADABIACABIABAAIADABQAAAAABABQAAAAAAAAQAAAAAAABQAAAAAAAAQABABAAAAQAAABgBABQAAAAAAAAQAAABgBAAIgDADIgDABIgPAAIgJACQgEABgCACQgDACgBACIgBAIIADAbIABAFIAGANIADAFQADACAEgBIAJgCIADgCQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAIgDgHIABgCIACgCIACgCIACgBIAEgEIAFgCIAEAAIAEACIAAAKIgFAQQAAAFgDADIgGAGIgIADIgbAEgAifBCIgLgEIgPgMIgCgEIgBgDIABgQIABgEIAFgGIACgBIAEgBIAFAAIAFABIADADIADAGIACAHIAAADIgDADIgDAEIgCAFQAAABAAAAQAAABABABQAAAAAAAAQABABABAAIADACIAFABIAEgBIAEgBIADgCIALgDIADgDQABgHABgIIgBgQIAAgDIgBAAIgBgCIABgHIgDgJIABgWIgCgEIABgEIgBgCIgEgJIAAgDIgCgBIgCgBIgRAAIgBAAIgCgBIgBgCIgCgDIgBgDIABgDIACgCIAFgBIAKAAIADgBIAEgCIACgBIANABIADABIAFAAIAJgCIADAAIAKACIADABIACADIAAACIgBADIgCAEIgCACIgCAAIgCAAIgQADIgCAEIgBACIgBAGIACAQIAAANIAFAjIgBAKIgCAJIgGAFIgFAHIgCACIgBACIgBABIgCACIAAAAIgBABIgCABIgEAAIgHADIgFABIgIgBgAidhAIABACIACAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAAgBIgBAAIgCABgAgoA+IgHgFQgHgCgEgDQgEgEgDgEIgGgJIgEgLIgBgJQgBgFADgFIgCgFIABgDIAFgPQACgDACgBIACgBIAAgCIABgCIACgBIADgBIAPgHIAOgCIAFAAIAEABIAHAEIAFABIAFADIADADIADAEQAAAAABABQAAAAAAAAQAAABAAABQABAAAAABIAAABIAAABIAAgBIABABIABADIAAABIAFAEIgBADIACAFIAAADIAAAEQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAAAAAIgDABIgCACIgBACIgBABIgBgBIgPgBIggADIgJACIgIADIAAABQABAFADAFIAHAIIALAGQAFACAGAAIAGAAIAGABIAFgEIAKgLIABgBIAHgCIACAAIAFAAIAAAJIgCAEIgIAHIgGAEIgFAEIgOAEIgIABgAglgWIgBABIgHACIgGAGIgGADIgCABIgCAFIgBAEIABABIAFACIADABIAMABIAPgCIASgBIAEgBIADgBIABAAIgDgRIgBACIAAAAIgEAAIgBgBIgNgGIgOgBIgBAAIgBAAgAAlA5IgCgCIgCgDIAAgCIAAgDIACgDIADgBIAHgBIADgCIACgEIAAgKIgBgEIgBgCIAAgBIABgCIABgEIgCgGIABgFIgBgCIAAgFIgDgKIgCgFIgMgEIgEgDIgBgFQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAIAEgDIAEAAIAQAAIACABIACACIACACIABACIABACIABAEIACAEIABgCIAAgBIACgCIAFgEIACgCIABgBIAAgCIABgBIACAAIAAAAIACgBIACgDIAFgCIAGgBIAHgBIAHABIAHACIAFAFIADAEIACACIABADIAAAFIACAFIABACIABAQIgBAJIAAACIABACIAAAHIACAFIAAABIgBABIgBABIgBACIACADIACACIACACIADABIADgBIACgBIACABIACADIACADIABADIgBACIgCABIgCABIgCABIgDgBIgDAAIgKADIgBAAIAAAAIgEAAIgEACIgKgCQgFAAgDgDQgCgDAAgEQACgCADgBIAPgBIgEgdIACgSIgBgDIgCgDIgBgGIgCgDIgBgCIgEgCIgJAAIgJADIgEACIgBABIgBACIgBACIgBABIgDAAIgBABIgBACIgBACIAAABIgBABIAAAAIgBgBIgBABIAAADIgBABIgCAAIAAABIAAACIAAACIgDABIAAACIACAIIAAACIgBACIgBABIAAACIADAHIAAACIAAAHIACADIABACIAIADIADACIABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAIABADIgBAFQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABgBAAIgGACIgGABIgTAAgAB7AcIAAACIgBABIgBABIABACIABAAIABgBIAAgCIABgBIABgBIgBgBIgBgBIgBABgAA0ALIABABIACABIADABIACABIABgDIgCgDIgBgCIgBAAIgDABIgCAAIAAAAgAB4AJIgBACIABACIABABIACgBIAAgCIAAAAIAAgCIgCgBIgBABgACmA1IgBgEIgCgCIgCgCIgBgEIABgSIgCgGIAAgCIgBgBIAAgCIACgDIACgBIABABIAEABIABABIABAAIAEAJIAGAIIACACIACAAIACABIABABIACgBIACAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAABIAAAAIABAAIAPgCIAHABIADgCIAFgGIAEgBIABgBIgBgDIABgBIACgCIAAgDQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBAAAAgBIgEgEIgFgDIgNgCIgKABIgEAAQAAAAAAAAQAAAAAAAAQAAgBgBAAQAAAAAAAAIgFgCIgDgCIgEAEIgEABIgGgBIgDgCIgFgIIgBgDIgBgDIgBgCIgBgDIAAgHIABgEIABgCIADgDIABgDIABgCIACgBIACAAIAAgBIAAgBIABgCIAFgBIAEgBIAagCIAKADIAHgCIACACIACAAIABgBIAAgBIAEABIADAFIABADIAAAPIABAHIgDABIgCADIgHgFIgBAAIgBAAIAAgBIgBgBIABgEIAAgBIgGgEIgBgBIgCAAIgEgCIgCAAIgFABIgLgBQgDgCgDABQgBAAgBAAQgBAAAAAAQgBAAAAABQAAAAgBAAIgDAHQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIgBAAIADAGIAEAGIAFADIABABIACABIABABIAAAAIAEgBIADgBIAEABIADAAIACgBIABAAIABAAIAGABIAKgBIAEACIAPAKIABADIACAJIAAACIgCAFIAAACIgBAFIgEAEIgEAEIgDAEIgEABIgEAAIgBABIgCABIgGADIgDAAIgJgBIgDABIgDAAIgDgBIgGgBIgDgBIgFACIgHAHQAAABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAgAEnApIgHgEIgLgGIgHgIIgFgJIgFgLIgBgGQAAgFACgFIgCgFIABgGIAGgOQABgEACgBIACAAIABgCIABgCIACgCIASgIIANgCIAGAAIADACIAHADIAGACIAEADIAFACIADAEQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAABIAAABIAAgBIABABIACADIAAACIAEAEIgBACIACAHIAAAEIAAADQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBABIgCABIgCABIgCACIgBABIgBAAIgRgBIgfADIgJABIgFABIgDABIAAABQAAAFADAEIAHAIQAFAEAGACQAGADAFgBIAGAAIAHABIAEgDIAMgMIACgBIAHgCIACAAIAEABIAAAJIgCADIgIAIIgHADIgFAEIgDABIgUAEgAEqgqIgBAAIgDABIgDACIgGAFIgFACIgCABIgBACIgCAEIgBAFIABADIAIADIALAAIAlgDIADgCIACgCIgEgQIgBABIAAABIgDgBIgBgBIgOgFIgOgCIgBABIgBAAgAF3AkIgDgCIgCgDIAAgCIAAgDIACgCIADgCIADgBIAEAAIADgBIABgFIAAgKIgBgEIgBgBIABAAIABgCIABgDIgCgHIAAgFIgBgEIAAgFIgBgKIgDgEIgEgCIgJgDIgDgCIgBgGQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBIADgCIAJgBIALABIADAAIAEAEIABADIAAACIABADIADAEIABgCIABgBIABgBIAFgFIACgCIABgBIABgBIAAgBIABgBIABAAIAFgDIAEgCIAHgCIAHAAIAGAAIAHADIAGAFIACADIACADIABACIAAAFIADAFIABADIABARIgBAJIAAACIABADIAAAFIABAFIAAABIgBABIAAABIgBABIABADIACADIADABIADABIACAAIACgCIADACIACACIABADIABADIgBACIgBACIgCABIgIAAIgKACIgBAAIgBAAIgDABIgEABIgLgBQgEgBgDgCQgDgDAAgFIAGgDIAPgBIgFgaIACgVIgBgDIgCgDIAAgFIgCgDIgCgDIgEgCIgJABIgFABIgHADIgBABIgCACIgBACIgCABIgBABIgCAAIAAACIgBACIgBACIgBABIgBgBIgBAAIgBABIAAACIgBABIAAAAIgBABIABACIgBACIgCAEIgBACIACAHIAAACIgBACIgBABIgBACIAEAFIABACIgBAHIABADIACACIAIADIADACIABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAABABIAAACIAAAFQAAABgBAAQAAAAAAABQAAAAgBAAQAAAAgBAAIgGACIgZACgAHNAHIgBACIgCADIABABIACAAIABgBIAAgBIABgBIABgCIgBgBIgBgBIgBABgAGFgIIACACIACABIACAAIABABIABgCIgBgEIgBgBIgCgBIgBABIgCABIgBAAgAHJgJIAAABIAAADQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAIACgBIAAgCIAAAAIAAgCIgCgBIgBACgAH5AiIgHgHIgDgDIgBgCQAAgBABAAQAAAAAAgBQAAAAABAAQAAgBAAAAIAEgBIAEgCIANABIAIgCIAHAAIAFgBIADgCIABgKIgDgaIAAAAIABgBIAAgBIgCgIIABgEIAAgGIAAgDIgDgDIgDgCIgDgBIgEABIgIADIgGABIgRgCIgCgBIgCgDIABgFIACgDIAFgCIAlgCIAGABIAGACQACACABADQACADAAAEIAAAGIgEAEIACACIACAAIABABIAAACIAAACIACABIACAkIACAEQABAAAAAAQABABAAAAQABAAAAAAQABAAABAAIARgDQADAAACABIAIAFIAFABIABAAIAAACIABABIAAACIAAADIgCADIgCACIgEAAIgBAAIAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAIgIgBIgEgDIgCgCIgCAAQgFAAgEABIgPAIIgIABIgEAAIgFgBIgBABIgDAAIgBAAIgBABIgBAAIABABIgHADIgJACIgBAAIgEAAgAKEAXIgBgBIgEgEIgCgBIgCAAIgBAAIgDgEIgEgGIgCgCIgDgyIgCgKIgCgCIgOgBQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBIgCgCIgBgEQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAABgBIAFgDIALgDQAFAAAFACQAEABAFADIAAABIACALIAAAJIABADIAAACIgBADIACALIAAAFIgCAQQAAADABADIAFADQADADADAAQADACAEAAIAFgBIADgCIABgCIACAAIADAAIACAAIACgCIACgBIAEgBQAAgBABAAQAAAAAAgBQABAAAAgBQAAgBAAAAIAAgBIABAAIAAAAIABAAIAAgBIABgBIACgDIABgDIABgEIAAgEIgBgDIAAgCIAAgIIgBgCIgBgCIAAgCIACgBIgBgCIgCgCIgBgBIAAgCIAAgCIAAgCIgBgDIgBgCIgDgBIgHgBIgDABIgDgCIgCgEIgBgDQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAIAGgDIAKgCIADABIAGgBIADgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABIADADIACAKIAAAMIACAPIAAACIgBACIgBAEIAAABIACAGIgBABIAAABIABAGIAAAHQAAAFADABQADADAFAAIAEgBIACABIADABIACACIABAEIgBADIgCAEIgEADIgDABIgQAAIgCgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAIgDgDIgBgDIgDgCIgRAKIgJADIgMACgALoARIgBgDIgBgCIgDgDIgBgDIABgRIgCgFIgBgCIgBgBIABgCIACgEIACAAIACAAIADACIABAAIABAAIAEAKIAGAIIACABIACABIADABIACAAIACAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAABIAAAAIABAAIAPgCIAEAAIADABIAIgIIAEgBIABgCIgBgDIABgBIABgBIABgDQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgEgFIgFgDIgHgCIgKgBIgGABIgEABQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgGgBIgCgCQgCACgCABIgEABIgGAAIgDgDIgDgDIgCgFIgBgDIgCgCIgBgDIAAgDIAAgHIABgDIABgCIAEgDIABgDIAAgCIACgBIABgBIABgBIAAgBIABgBIAFgCIAZgCIAFAAIAKADIAEgBIADgBIACABIACABIABgBIABgBIACABIAEAFIACADIgBAOIACAHIgEACIgCADIgCgCIgCgCIgDgBIgCAAIgBgBIAAgBIABgEIgBgBIgFgEIgBgBIgCAAIgEgCIgCgBIgFACIgLgCIgGgBQgBAAgBAAQAAAAgBABQAAAAgBAAQAAABgBAAIgCADIgBADQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIgBAAIADAFIAEAHIAFADIABABIABABIACABIAAAAIAGgCIAGAAIACAAIACAAIABAAIABAAIAGAAIAGAAIAEAAIAFACIANAMIACADIADAIIgBADIgCAEIAAADIgCAFIgLAJIgCACIgDAAIgCAAIgCAAIgDADIgCAAIgDABIgCABIgJgBIgDAAIgGAAIgGgCIgDAAQgDAAgCACIgGAHIgEACgAIRhPIgGgCIgFgCQgCgCAAgDIABgKIACgCIACgFIACgBIAAAAIAGgCIALADIAFAEIACAEIgBAGIgCAGIgEAEIgFACg");
	this.shape_7.setTransform(84.9,10.1,1,1,0,0,0,0.1,-0.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Ap5BkQgCgCAAgDIABgFIADgDIALgFIABgDIgBgEIABgDIAAgIIgBgCIgBgBIAAgTIgBgJIAAgBIgBgCIABgDIgBgGIgCgHIgBgGIABgCIABgFIgCgLIABgDIABgCIACgBIABgCIAAgBIgCAAIgEACIgCgBIgBgCIgCgCIgCgBIgFABIgCgBIAAgCIAAgBIAAgBIAAgBIgBgBIgCAAIADgDIAPgEIABAAIACAAIAHAAIAFgCIACABIACAAIANgBIAHABIAOADIAGABIADABIAJAHIADAFIAFAFIABAEIABADIABAHIgBAGIgBADIgGAMIgBACIgJAGQgFAEgGACQgFACgHABIAAAAIgDgBIgDAAIgHABIgKAEIgCABIAAABIABABIABgBIAAgBIABABIABABIAAABIAAABIAAAXIABAHQAAABABAAQAAABAAAAQAAABABAAQAAABAAAAIAFACIAHABIAAABIABACIADACIABACIgBADIgBACIgBABIgBABIgCAAIgaACIgLADQgBAAAAAAQgBgBgBAAQAAAAgBAAQAAgBAAAAgApNgYIgMABIgJACIgEAEIgBADIABACIADAFIABADIgCAAIAAACIACAEIgBADIgBABIgBABIAAABIAEAHIADAEIABACIAcgDIACgBIABgBIABgBIADgBQADAAACgBIADgDIACgEIAAgFQgBgFgCgFQgCgFgEgDQgEgEgFgBQgEgCgFAAIgCAAgAn8BbQgBgBAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBIAAAAIgCABIgCABIgDgCIgFgFIgEgFIgCgFIABgCIABgBIgCgFIACgIIAEgIIADgDIAKgHIAEABIANgBIAEAAIADgBIADgCIAEgCIAJgDIAFgCIADgCQACgCgBgDQAAgDgCgDIgFgHIgHgEQgDgCgDABIgBAAIgBAAIgKACIgEADQgCABAAAEIABAIIgBAEIgDAEIgKADIgFgBQgBAAAAAAQgBgBAAAAQgBAAAAgBQAAgBgBAAIgDgFIgBgFIABgEIAEgJIABgGIACAAIACAAIADAAIAPgGIAIgCIASACIAIAEIAHADIAEAFIACAGIADAOIAAAQIAFAfIABADIABAAQAAAAABAAQAAAAABgBQAAAAAAAAQABAAAAgBIAEgGQABgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAIADABIABABIABABIgBAHIAAACIgBACIgBABIgIAFIgGACIgGgCIgEgCIgEgDIgDgBIgCABIgEADIgGABIgIAEIgJACIgMABgAnMAnIgMAGIgMADIgEAAIgOAEIgCABIgBABIAAACIgFAEIgDAEIgBAEQAAABAAAAQAAABABABQAAAAAAABQAAAAABABIAEADIAFACIAGACIAKAAIAMgCIAGgCQADgBABgCIACgFIACgBIADgEIABgFIABgLIgBgCIgBgFIgCgBgAl6BZIgBgBIgEgEIgCgBIgCAAIgBAAIgCgFIgHgHIgDg0IgCgKQAAgBAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAIgOgBQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBIgCgCIgBgCQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAABgBIAFgDIAGgCIAEgBQAGAAAFACQAEABAFADIAAABIACALIAAAHIABADIAAACIgBADIACALIAAAFIgCAQQAAADACADIAEAFQADADADAAQADACAEAAIAFgBIADgCIACgCIABAAIADAAIACgBIADgDIACgBIADgBQABgBAAAAQAAAAABgBQAAgBAAAAQAAgBAAAAIAAgBIABAAIAAAAIABAAIABgBIAAgBIACgDIABgEIABgDIAAgEIgBgDIAAgDIAAgHIgBgCIgBgCIABgCIABgBIgBgCIgBgCIgBgBIgBgCIAAgCIABgCIgBgDIgCgCIgDgBIgKgBIgDgBIgCgCIgBgDQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAIAFgDIAKgCIADABIAGgBIAEgCQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAABIADADIACAKIAAAKIADAPIgBACIgBACIAAAEIAAABIABAGIgBABIAAABIACAGIgBAHQAAAFADABQAEADAEgBIAFAAIACACIACACIACACIABAEIgBADIgCAEIgEADIgDABIgQAAIgCgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAIgCgDIgCgDIgDgCIgRAKIgJADIgMACgAkiBSIgCgBIABgLIAAAAQAAAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAIABgBIABAAIABgBIAAgBIAAAAIAYgBIAIgCQAEgBADgDQACgDAAgEIgGg1IABgHIADgGIgBAAIAAgBIgCAAIgBAAIAAgCIgBgEIgBgCIABgMIgBgDIgCgDIgBgBIABgCIgBAAIgCABIgBABIgBABIgBAAIgBAAIgDABIgagBIgFgCIAAgBQAAgFADgDQAEgDAFAAIARAAIAMgDQAEAAADABIAFADIABAAIAAACIACADIABADIAAACIACAIIgBAJIACALIgBAKIAEAHIAAADIAAAFIgBADIACAIIAAACIgBAEIgBACIAEAVIABAEIAAACIAAAGIAAADQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAAAIACAAIAEgDIAEgBIAKABIAHgBIAEgCIADAAQAEgBADADQADACAAAEQAAAEgBACIgGADIgNACIgFAAIgGgCIgDAAIgGABIgCAAIgBgBIgBgBIgBAAIgBAAIgBABIgCACIgCABIgIgBIgIACIgBAAIgBgBIgHACIgCAAIgCAAIgDABIgIABgAj2gYIABAEIABABIABgBIAAgCIAAgBIgCgBIAAAAIgBAAgAj9gxIgBABIABABIAAAAIACAAIABgCIgBAAIgBgBIgBABgAhLBAIgHgBIgDgBIgHgCIgCgCIgGgDIgCgCIAAgCIgBgBIAAAAIgBgBIgCAAIgDgHIgBgDIgDgDIAAgCIgFgMIgBgEIAAgDIAAgCIgEgNIABgBIAAgBIACgqIAHgIIABgCIAFgIIADgDIADgCIABAAIABAAIABgBIABgBIAAgBIAKgDIAKgCIAJABIAFABQAAAAABABQAAAAAAAAQABAAAAABQAAAAAAAAIAAABIABAAIAAAAIAKAAIADAAIADgCIACgCQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABIACAFIADAKIgCAJIABACIAEAGIgBAFIAAAHIgBAGQgBACgDAAIgDgBIgCgDQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAgBIgBgBIgDgBIgBgBIgCgDIgCgHIgBgFIgBgBIgEgFIgCgCIgJgGIgBABIgCAAIgBAAIgCgBIgBAAIgBgBIgJACIgJgCIAAAAIgBABIACADIgBADIgIAHIgCADIAAAEIgCACIgDADIACADIAAADIgBADIACAMIgCASIAEAMIABAIQAAAEACADIAKAJQACACABAEIADAAIAEAAIAHACIADgBQAEAAAEgCIAGgEIAFgGQADgDABgEIACgHIABgBIABAAIABgBIgBAAIAAgBIgBgCIAAAAIABgBIABgCIABgCIgCgDIgDgCIgIgDIgDgDQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBIACgCIAEgCIAEAAIAHgEIACAAIADAAIADABIAFAAIAFABIAFACIACAFIAAABIgBABIgBABIgBABIgBABIgBAAIgBAAIAAACIgCABIgCABIgBAAIAAADIAAAdIACARIgBADIgCADIgDABQgBAAAAAAQgBAAgBAAQAAAAgBgBQAAAAgBAAIgEgIIgDgBIgCABIgEAEIgGACIgBABIgCACIgJABIgEgBIgDABgAA1BAIgFgBIgIgCIgDgBIgFgCIgFgEIgMgFIgEgFIgEgDIgGgKIgBgGIABgPIAAgBIgBgBIAAgBIAAgBIAAAAIAAgCIAAgGIABgCIABgBIAAgBIAAgEIABgBIAAAAIABgBIABgBIACgDIABgDIAOgMIAOgFIAQgCIAMACIALAFIAAAAIgBAGIAAAAIAHgBIACACIACABIADACIAHANIABADIACAFIgBADIgEAHIABABIAAABIABAAIABgBIgBgDIAAgBIAAAAIACAAIABACIAAABIABABIAAAEIgBACIgBABIAAABIABAEIAAABIgBAAIgCAAIACAHIgBAEIgBABIgBAAIAAACIgBACIgDADIgEADIgCABIgBAAIAAABIAAACIgBACIgHAGIgDADIgEABIgGgBIgDAAIgEADgAAYAhIAEAFIAOAIIAQAAQADAAACgCIAFgEIABgDIAFgFIACgCIACAAIADgEIAAgBIAAgCIgBgEIABgDIACgCIACAAIAEABIAAgCQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAIgGAAIgCgBIAAgBIgCgJIgGgQIgBABIgDgBIgHgDIgWAAQgFABgFACIgIAHIgFAJQgCAEAAAFIADAQIADAEIAAADIABAAIADAAIAAABgACaA4IgCgDIgCgCIgDAAIgBgBIgCgIIgBgBIgDgBIgCgCIgCgEIgBgGIgDgEIAAgCIgBgNIABgHIABgCIABAAIAAgBIgCgDIACgFIABgKIgBgBQgCgCgDgBIgLgBQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAIgDgDQAAgBgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAIgDgBIgBgDQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAIALgGQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIAEAAIAEgCIACgCIACgDIgCgQIABgHIADgGIABgBIACgCIABgBIACAAIABgBIABABIADADIADASIAAAEIgBADIACAFIACACIABACIAMACIAUgBIACABIACABIAEABQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAIgDADIgEABIgPAAIgJACIgGADQgDACgBAEIgBAIIADAaIAHARQABADACACQADACAEAAIAJgCIADgDQABgBAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAIgCgHIAAgCIAEgEIAGgFQADgCACAAIAEABIAEABIAAAKIgEAQQgBAFgCADQgDAEgDACQgEACgEABIgKACIgSACgADiAxIgEgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAAAIAAgIIABgEIADgFIAAgBIABgBIACgCIABgBIABgCIACgCIAAgBIAeggIAGgJIACgCIADgFIAAgDIgBgCIgDgCIgFAAIgFABIgGgBIgBABIgBAAIgLACIgCABIgEADIgCAGIABAJIgBAFQgCACgEAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBIgDgDIgCgJIAAgEIAAgCIAAgKIAEgIIAHgEIACAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAIAEAEIABACIABACIAAAAIACAAIABAAIABAAIAAgCIgBgCIgCgBIgBgBIgBgCIAAAAIAFAAIAfgEIAPgBIABABIgBACIgBACIABABIABAAIABgBIAAgBIAAgBIABgBIABABIADAFIAAACIAAABIgBAAIgBABIAAAAIgBADIgBADIgNAQIgEAGIgCADIgEADIgBABIgBADIgDABIgJAIQgDADAAACIgBADIgCAHIgBAEQABADACABIAGACIAHABIALgBQAGAAADgCIAEgFIABgHIABgNIACgFIACAAIAFABIAFABIgBALQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAIgBADIABABIACAHIAAAHIABAFIgCABIgBADIgCACIgDABIgDABIgsAAIgUADgAF5ApIgEgBIgLAAIgDAAIgCgCIgBgCIAAgBIgBABIgBAAQgDABgDgCIgFgDIgIgIQgDgBgBgDIgDgGQgEgFgBgFIgCgNIABgDIABAAIABgBIABgBIAAgBIgCgEIABgCIABgCIAEgPQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAIAGABIABgBIAAgBIAAgBIgCAAIgBAAIgBgBIAAgBIACgBIABgBIABgBIABgBIABgCIABgBIANgDIgBgBIACgBIACgBIABgBIAQABIAFgBIAEABIAEACIABgBIACgBIAAABIABAAIACACIACAAIABACIAFABIABABIAAACIAIAGIACAEIABAGIAAAHIgCAGQgCACgDABQgDACgFAAIgGAAIgJgMIgBgEIAAgDIAAgDIgCgDIgGgCIgIABIgFACIAAgCIgCgBIgDABIgIAGIgIAPIgDACIAGAWIgBAHIABACIACAAIACACIABADIACACQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAABAAIAAAAIABAAIAEAHIABgBIABgCIABAAIACAAIABACIACABIABAAIAEgBIAMgFIAHgEQADgCACgEIADgDIACgEIACgBIAEAAIABABIABAAIgBACIgBABIgBABIgBABIAEAAIAFABIADACQAAABAAAAQABAAAAAAQAAABAAAAQAAAAAAABIAAACIgCAAIgBACIgBABIgCAEIgEAEIgJADQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAABIAAAAIgEABIgIAEIgEABgAGXAVIAAABIAAAAIABAAIABAAIABgBIgBgBIgBgBgAG6AnIgCgBIgEgBIgDABIgCgCIgCgEIABgDIAEgFIADgBIAEAAIACAAIABgBIABgCIACgBIgDgmIABgMIgCgGIABgEQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAIAAABIAAgCIgCgDIgBgCIACgDIgBgKIABgIIgBgCIgBAAIgCAAIAAgDIgDgIQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAIgCAAIgCAAIgEAAIgDgDIgCgDIgBgEQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIAIgBIACgBIAMgCIADABIADABIACACIADABIAAAIIACAIIAAABIgBAAIgBAAIAAABIAAACIABACIACADIgBAGIAAAEIAEAKQAAABAAAAQABABAAAAQAAAAABAAQAAAAAAAAIAEgBIAEgDIAFgGIAJgEIAKgCIAFAAIAJAGIAEAAIAJAIIADAFIACAEIgBAGIABAEIAAADIAAAEIgCAGIADAFIABAFIAAALIABAIIAEADIAJADIADACQACABAAAEIgBADIgBADIgMABIgEAAIgMACQgEAAgBgEIgCABIgCACIgDACIgCABIgEgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBIAAgBIABgBIABgBIAAgBIAAAAIgBgBIgBgBIAAgBQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAHgCIAIgBIACgCIABgEIABgLIAAgLIgCgIIgCgDIAAgEIAAgDIABgBIABgEIgDgFIgBgDIgCgEIgEgDIgBgCIgGAAIgIABIgHACIgGAEIgMAQIgCADIAAAUIACAEIAAACIgBAGIgBADIgBACIABACIAGADIACABIAEAAIAEAAIAEACIACADQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgBAAIgBAAIgBgBIgBgBIgBgBIgBgBIgBABIAAABIABACIACACIACACIABACIAAAAIgBABIgEgBIgEADIgDABIgGACIgBgBIgDgFIgCgBIgBABIgBABIACABIABADIAAABIgCAAIgKACgAJNAaIgHgEQgGgCgEgEQgFgDgDgFIgFgIIgEgKIgCgIQAAgFACgFIgBgFIAAgGIAGgOQACgDACgBIACgBIAAgCIABgCIACgCIACAAIAQgHIAOgDIAFABIAEABIAHADIAFACIAJAGIAEADQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIAAABIAAABIABAAIAAABIACADIAAABIAEAEIAAACIACAHIAAAEIgBADQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAABIgFADIgBABIgBABIgCAAIgRgBIgSADIgNAAIgJABIgIAEIAAABQAAAFADAEQADADAFADQAFAEAFACQAGADAFAAIAHgBIAGABIAFgDIALgKIACgBIAHgBIACAAIAEAAIABAHIgCAEIgJAHIgPAJIgUADgAJQg5IAAAAIgHADIgGAFIgEADIgCAAIgCACIgCAEIgBAGIABACIAEACIAEABIAMABIAPgDIASAAIAEgBIADgCIABgCIgEgQIAAABIgBABIgDAAIgBgCIgNgFIgHgBIgIgBIAAABIgBAAgAqFgWIgBgCIABgBIACABIABAAIgBACIgBAAIgBAAgAAXgoIgBgBIgCgCIgBgBIgBAAIgBgBIgBgCIgBgCIgBAAIgBgBIAAgGIACgCIABgCIABgCIABgCIAFgCIACAAQAEAAACABIAFADIACAFIABAGIAAABIgBABIAAABIAAABIgFAFIgGABIgCABIgCAAgAA7gqIgEgDIgEgEIgBgEIgBgDIACgJIACgDIAGgCIABgBIALADIADAEIABAFIABAGIgBAFIgDAEIgGACIgCAAIgBABg");
	this.shape_8.setTransform(67.1,11,1,1,0,0,0,0,-0.7);

	this.text = new cjs.Text("\"Nickname\"", "20px 'Special Elite'");
	this.text.lineHeight = 22;
	this.text.lineWidth = 261;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.text}]},1).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.5,0.7,157.7,21.1);


(lib.CharacterCardFamily = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{D:0,E:1,F:2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(15));

	// Text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhZBfIgJgJIgEgFIACgEIAFgBIAJgCIALAAIAFAAIAFgCIAJAAIAFgBIAFgDIABgMIgEgiIABAAIAAAAIAAgBIgCgKIABgLIgBgDIgDgDIgEgDIgEgBIgFABIgJAEIgNAAIgOgBIgEgCIgBgDQAAgEABgCIAEgEIASgDIAfgBIAIABQADAAADADIAEAGIACAIIAAAGIgEAEIACACIACABIABABIAAACIABACQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAIADAtIACAGQACABADAAIATgDQADgBADACIALAGIAEABIACAAIABACIAAACIAAABIAAAEIgCADIgDADIgEABIgBgBIgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBgBAAAAIgFAAIgEgBQgBgBgCgDIgCgCIgDgBQgGAAgEACIgSAJQgFACgFAAIgFAAIgGgCIgBABIgEABIgBAAIgBAAIgBABIABABIgJAEIgKACIgCABIgEgBgAjHBbIgOgFIgCgBIgLgHIgBgCIAAgCIgBAAIgBgBIgBAAIgGgNIgEgEIAAgCIAAgFIgDgFIgDgDIgBgFIABgHIgBgEIgCgEIgCgJIAAgBIABgCIABggIABgJIAAgIIAJgJIADgHIAHgJIAEgCIABAAIACAAIABgBIABgBIgBgCIAMgDIANgCIAEgBIAMADQABAAAAAAQABABAAAAQAAABABAAQAAAAAAABIAAABIABgBIAAAAIAEABIAEAAIAIgBIAGgEQABAAAAAAQABAAAAAAQABAAAAABQAAAAABABIADAGIACAMIAAAFIgBAGIABADIACACIACACIABACIgBAPIgCAHQgBADgDAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAIgDgEIABAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIgBgBIgBgCIgDgBIgBgBIgEgHIgCgIIAAgBIABgBIgBAAIgBgBIgCgDIgEgDIgBgDIgLgHIgCABIgCAAIgBAAIgCgBIgBgBIgCAAIgKACIgKgCIgBAAIgBABIABAEIgBADIgDADIgGAGIgCADIgCAIIgEADIACAEIAAAHIACAOIAAAEIgCATIABAFIADAIIABAHIAAACQAAAFADAEIALAMQADACABAFIAEgBIAEAAIAIACIAEABIAKgDIAIgFIAGgIQADgEAAgFIADgHIABgCIABgBIABAAIABgBIgBgBIgBgCIAAAAIABgBIABgCIABgDQAAAAAAgBQgBAAAAgBQAAAAAAAAQgBgBAAAAIgEgDIgJgDIgEgDIgCgFQAAgBAAAAQAAgBABAAQAAgBAAAAQAAgBABAAIADgEIAEgBIAHgCIAJgCIAHAAIAFAAIAGABIAGADQABAAAAABQAAAAABABQAAAAAAABQAAABAAAAIABADIgCAFIgCABIgBAAIgBAAIgBAAIgBACIgCACIgCABIgCAAIACAJIAAAHIgBAHIgBAPIADARIgBAIIgDADIgDABQgEABgBgCIgEgFIgCgEQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAIgPAJIgEADIgFABIgOAAIgEABgAAnBUIgHgCIgDgCIAAgFQAAgEABgCQACgCADgBIAFgCIAOgCIAGgCIAEgDIABgHIAAgEIgBgDIAAAAIABgDIgBgTIgBgHIgBgDIABgLIAAAAIgBAAIAAgBIgBgBIACgDIAAgDIgBgDIgDgDIgBgCIgKAAIgLgCIgEgCIgCgEIABgDIADgDIAIgDIAGAAIAIgCIABgCIABgDIAAgDIAAgDIgBgKIABgHQAAgDADgEIAMgMIAGgFIAJgDIAOgDIAUAEIAHADIAGADQACACAAADQAEgBACADIACAFIADANIAAABIAAAAIgFgCIAAABIABACIABABIACACIAAABQAAAAAAABQAAAAAAAAQAAAAAAAAQgBAAAAAAIgCABIgCABIgEAHIgGABIgIgBQgFgCgCgDQgCgDgBgEIgCgNIgDgFIgHgBIgJACIgIADIgGAHQgCADAAAFIABAJQAAADACABQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAIAIgBIADABIAHAHIABADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAIgFADIgMABIgDABIgBACIgBADIADAhQABAEgBADIgBAFIABACIAAADIAAAKIAAAEIACACIACADIABADIANgDIANABIAGACQACACABACIAAAFIgCAEIgDADIgKAFIgGABIgEAAIgIgDIgEAAIgVACIgRAFIgGABgAC/BKIgFgFIgEAAIgBgCIgCgJIgBgCIgFgBIgCgDIgCgEIgBgHIgFgIIABgXIABgDIABgCIABgCIgCgDIACgEIABgKIgBgEQgDgCgDAAIgOgCIgFgCIgDgDQAAgBgBAAQAAAAgBgBQAAAAgBAAQgBAAAAAAIgDgCIgBgDQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAIAEgDIAFgBIAEgDQABAAAAAAQAAgBABAAQAAAAABAAQABAAAAAAIAJgCIADgDIACgEIAAgFIgCgOIAAgIQABgEADgDIACgCIADgDIACgBIACAAIABABIADAEIABADIAAAFIADANIgBAJIABADIACACIACACIABAEIAFABIAhAAIADABIACABIAFABQABABAAAAQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAABQAAAAAAABQAAAAgBABQAAAAAAABIgDADIgFABIgSAAIgKACQgFABgDADQgEADgBAEQgCAEABAHIAEAdIABAGIAGAQQACADADADQACACAGAAIAEgBIAGgCIAFgDQAAAAABAAQAAgBAAAAQABgBAAAAQAAgBAAgBIgDgIIABgDIABgCIAFgEIAFgEQADgDADAAIAFABIAEACIABAEIAAAHIgFAVQgBAGgDADQgDAFgEACIgJAEIghAFgAhDgrIgGgEQgDgCAAgDIABgMIACgCIAEgHIACgBIAAAAIAHgCIAGABIAHADIAFAEQADADAAADIgBAHIgDAGIgFAGQgCACgEAAg");
	this.shape.setTransform(28.2,12.6,1,1,0,0,0,-0.1,0.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AoEBxIgFgCQAAAAgBAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIAAgGIABgEIADgFIAFgCIAFAAIADgBIACgDIADgBIgCgOIAAgHIACgGIgDgEIgBgOIAAgJIAAgDIAAgCIABAAIAAgBIABgBIgDgLIABgMIgEgZIgCgGIgEgFQgCgBgDAAIgKAAIgCgBIgDgIQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAIAEgDIAKgCIAPAAIAJgCIADgDIACAAIAEACIADAAIADAAIADgBIAFABIAZgHIAEABIAEACQAEgCAGgBIADAAIAKABIACAAIABACIABAEIABACIABADIABAAIACAAIABABIABACIACALIAGAPIAAAFQABAFgDADQgCADgFAAIgDAAIgEgBIgDgFIgEgQIgDgHQgCgEgCAAQgDgCgFAAIgRACIgJAAIgEgDIgLACIgDABIgMAFIgBAFIABAGIgBADIACARIgBAIIACADIAFACQAAABAAAAQAAAAABAAQAAABAAAAQAAAAAAABIADAAIAIgBIAHgDQADgBABgDIABgHIgBgKIABgDIAFgEIADgBIADABIAEACIACAFIACAkIADAPIAAAKIAAACIAAADIgCAEIgDADIgDABIgEgBIgEgEIgCgEIgBgCIAAAAIABgBIACAAIAAgCIAAgBIgCgBIgBAAIgBgCIAAgBIABAAIABgBIAAgBIgBgCIgDgDIgCgCIgDgBIgHACIgDgBIgDgBIgCACIgHAIIgBACIAAAEIADAPIAAAHIABAIIABAEIADACIAOABQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIADAJIAAADIgBAEIgCACIgDABIgPAAIgdAFgAoFBjIAAABIABAEIACABIAAgBIAAgBIAAgDQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBgBIABABgAl5BpIgDgBIgBgEIABgCIAFgGIACgBIAEAAIAEAAIAGgCIAGgCIAEgGIABgGIgBgGIABgMIgFgsIgDgGQAAgBgBAAQAAgBAAAAQgBAAgBAAQAAAAgBAAIgPACIgFgBIgEgDIgCgDIAAgEIACgCIADgCIAEAAIAEAAIATgCIAKABQAAAAABAAQABAAAAAAQABAAAAABQAAAAABAAIAEAIQABAAAAAAQAAAAABAAQAAAAABAAQABAAAAAAIACAAIADgCIAIgEIAIgFIARgFIADgCIAIABIAIACIAHAFQADADABADIABAEIAFAGIABAEIgBAFIgEAGIgBAEIgCgBIgOACQgDAAgCgBIgEgGIgCgLIAAgHIgBgBIgEADIgCgBIgCgBIgJAFIgFAEQAAABAAAAQgBABAAABQAAAAAAABQAAAAAAABIgEABIgFACIgCAEIgDAJIgFAKQgBACAAADIADARIAAALQAAADACACIADADIAFABIAQgBIABACIAAACIgBADIABABIADgBIACgCIABABIABABIgBABIAAABIgBACIAAABIAAABIAAABIgBACIgFAAIgDgBIgCgCIgCAAIgBAAIgCABIgBABIgBABIABABIAAACIAAABIgBABIgCABIgCAAIgSgCIgIADIgDAAIgBgBIgBgCIgCAAIgRAEgAjVBeIgFgCQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBIgBAAIgBABIgCABQgCAAgDgCIgGgGIgEgGIgDgFIABgCIABgDIgBgGIAAgFIACgFIAEgJIADgEIAJgEIAEgEQACADADgBIALgDIAJABIAEgBIADgCIAFgDIARgGIAEgCQABgDAAgEQAAgDgDgEIgGgGIgHgEQgFgCgEAAIgBAAIgBABIgMABQgDACgCACQgCACAAACIACAJQAAAEgCACIgEAEIgGACIgGACIgGgBQgDgBgBgEIgDgEIgCgGIABgGIAEgJIACgGIACgBIAOgFIAGgDIAFgCIAJgBIAKAAIALACIAKAFIAIAFIAEAGIAEAIIACAHIAHBAIABADIABAAQAAAAABAAQABAAAAAAQABAAAAgBQAAAAABgBIAFgHQABAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAIACAAIACABIACABIABACIgBAEIgBADIgBAFIgBABIgJAGQgEACgEABQgEAAgDgBIgKgHIgDgBIgDAAIgEAEIgEACIgDAAIgKAFIgaAEgAiuAlIgHACIgIABIgEABIgSAFIgCABIgBABIgBACIgBACIgCABIgDACIgDAGIgBAEQAAAEACADIAFADIAGADIAHABIAMABIAOgCIAIgEIAFgDIABgCIAAgCIABgCIAGgGIACgGIAAgHIAAgGIAAgDIgCgGIgBgBIgBAAIgBAAgAhgBcIgBgCIAAgBIgEgGIgBgEIABgWIgBgEIgDgGIAAgBIAAgCIADgEIABgCIADABIACACIAEABIAAAAIAIARIAEAEIADACIACABIADACIADAAIACgCQABAAAAABQABAAAAAAQAAAAAAAAQAAAAAAABIAAABIACAAIASgEIAEAAIAEACIAEgDIAGgGIAFgCIAAgCIAAgDIABgBIACgDIAAgDIgCgGIgFgEIgGgEIgVgEIgLADIgBgDIgHgCIgDgDIgEAFIgGABIgGgBIgFgDIgDgFIgCgFIgBgEIgCgCIgBgCIgBgFIAAgGIABgEIACgDIACgBIABgCIACgEIABgCQAAAAAAgBQAAAAABAAQAAAAAAAAQAAgBABAAIACAAIAAgBIABgBIABgBIAFgDIAegEIAMACIAEACIADABIAIgDIACACIACABIACgCIAAgBIADABIAEAEIACACIAAADIAAASIACAGIgHAGIgEgEIgGgDIAAAAIgBgBQAAABAAgBIABgCIgCgCIgCgDIgDgCIgBgBIgGgBIgCgCIgCAAIgDABIgJAAIgHgBQgEgBgEAAQgDAAgCABIgEAIQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAIgBAAIAFAJIAEAEIAFADIACABIABACIACAAIABABIAHgDIAGABIAFgBIABAAIACAAIAHABIAHgBIAFABIAKAEIAGAHIAEACIACADIAEAIIABAFIAAADIgCAEIgDALIgEAGIgJAIQgBAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAIgEAAIgDABIgEACIgDABIgGACIgEgBIgKgBIgEABIgEAAIgGgCIgEAAQgDAAgDABIgHAJQgCACgDAAgAAUBRIgEgCIgDgEIgBgFIABgFQABgDADAAIADACIABgBIABgBIABgBIACgBQADgBACgCIADgEIABgGIAAgKIgBgEIABgOIgDgTIAAgRIgBgGIgBgCIgBgCIABgJIgCgLIAAgIIgCgGIgFgDIgMgBIgEgCQgCgBgBgDQAAgEACgCIADgDIAFgCIAGgBIATAEIADABIAAAAIACAHIADAYIgBAMIADAMIADAlIACAAIAEgCIAFgGIAEgDQACgBACgCIAHgIIAFgEQACgCAAgCIgDgKIgBgEIAAgBIACAAIABAAIAAgBIAAgCIAAgCIACgBIAKACIAEgBIAKgEIAMACIANgEIACABIACAAIABACIABABIAAACIgBABIABAAIABACIABABIABADQAAAAAAAAQAAABAAAAQgBABAAAAQgBAAAAABIgOAFIgFABIgGgBIgFACIgFADIgNAMIgEAEIgBAFIgBAHIABADIAGAEIAWAaIADAGIABAEIAAABIAMgCIAPAAIAAACIABAEIAGAGIgBADIgBACIgCABIAAABIAAABIgSADIgBAAIgCAAIgCgCIgBgBIgGACIgEAEIgVgDIgEgDQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAIAAgCIABgGIABgBIAFABIABAAIAAgBIgBgCIgBAAIgDAAIACgEIgBgJIgCgFIgEgFIgEgCIgEgHIgDgBIgDgBQgCAAgEACIgKALIgDAFIACAEIgBAEIgCADIACAEIADABIAIABIACABIAFAEIABADIgBABIgDACIgBABIAAABIgaAGIgJAAIgHACgACxBPIgJgJIgCgDIgCgDQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAIAFgCIAJgCIALABIAKgCIAJgBIAFgBIAFgCIABgMIgEgiIABAAIAAgBIAAAAIgCgJIABgMIgBgDIgDgEIgEgDIgEAAIgFAAIgJAEIgGABIgHAAIgOgCIgEgBIgBgDQAAgFABgCIAEgDIASgEIAfgBIAIABQADABADADIAEAFIACAIIAAAHIgEAGIACABIACABIABABIAAACIABACQAAABAAAAQAAAAAAAAQABABAAAAQAAAAABAAIADArIACAFQACABADAAIAVgDIAGABIALAGIAEACIACAAIABABIAAACIAAABIAAAFIgCADIgDACIgEACIgBgBIgBAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBgBAAAAIgFAAIgFgBQgCgBgCgCIgCgDIgDgBQgGAAgEADIgSAIQgFACgFABIgFAAIgGgCIgBABIgEAAIgBAAIgBABIgBABIABAAIgJAFIgKACIgGAAgAE3BEIgOgCQgBAAgBAAQAAgBgBAAQAAAAAAAAQgBgBAAAAIACgMQAAAAAAAAQgBAAAAAAQAAgBAAAAQgBAAAAAAIABgBIABgBIABgBIAAgBIAAAAIAdgCIAKgCQAFgBADgEQADgCAAgGIgHhAIABgIQABgEADgEIAAAAIgCAAIgBgBIgBAAIgBgBIgCgJIABgNIgBgEIgEgFIAAgDIgBAAIgBABIgBACIgCABIgBABIgCAAIgDABIgRgCIgPABIgFgDIAAgCQgBgGAFgDQADgDAGAAIAQAAIAVgEIAHABIAIADIgBABIABACIADAEIAAABIAAACIAAACIACAKIAAALIACAOIgBAKIAFAQIAAAGIgBADIACAJIAAAHIgBAAIgCABIAFAaIACAEIAAADIgBAHIABAEQAAAAAAAAQABAAAAABQAAAAABAAQAAAAABAAIACgBIACgBIADgCIAEAAIALAAIASgEQAEAAAEADQADACAAAFQABAEgDADIgGAEIgPADIgHAAIgKgDIgIACIgCgBIgCgBIgBgBIgBgBIgBACIgBABIgCACIgDAAIgKAAIgJACIgBgBIgBAAIgJACIgCAAIgLADgAFfg9IgBAAIAAAFIACAAIACgBIAAgCIgBgCIgCgBgAFVhcIAAABIABACIAAAAIACAAIABgCIgCgBIgBAAgAHbA4IgDgDIgCgBIgEgBIgBgCIgCgIIgBgCQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBIgCgCIgCgEIgBgHIgDgGIgCgDIABgVIABgCIABgCIABgCIgCgEIACgGIABgKIgBgDQgDgCgDgBIgOgBQgDgBgCgCIgDgCQgBgCgDgBIgDgCIgBgCQAAgDABgCIANgGIAEgCIAEAAIAFgBIADgDIACgEIAAgFIgCgOIAAgIQABgFADgCIACgCIADgEIACgBIACABIABAAIADAEIABADIAAAFIADANIgBAJIABADIACADIACACIABADIAFACIAhAAIAKADQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAABIgDACIgFABIgSABIgKABIgIAFQgEACgBAFQgCAEABAGIAEAdIABAGIAGAQQACAEADACQACADAGAAIAKgEIAFgCQAAAAABgBQAAAAAAgBQABAAAAgBQAAAAAAgBIgDgIIACgGIAFgDIAFgFIAGgBIAFAAIAEABIABAFIAAAGIgFAVQgBAGgDAEQgDAEgEADIgJAEIghAFgADHg8IgGgDQgDgDAAgDIABgLIAGgJIACgBIAAAAIADgBIAEgBIAGABIAHACIAFAFQADACAAADIgBAHIgDAHIgFAFQgCACgEAAg");
	this.shape_1.setTransform(55.9,10.9,1,1,0,0,0,0.1,0.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AiAB4IgHgCIgHgDIgHgBIgDgCIgIgNQgCgDAAgEQgBgGACgGIAGgKIgBgHIgEgNIgCgHIACgHIABgCIAAgCIACgCIAHgJIACgEIgCgCIgFgFIgCgDIACgUIgBAAIAAgBIAAgDIACgBIABgCIABgBIgCgFIAAgBIAGgHIAKgHIACABIACAAIACAAIAHgEIAFgCIATACIAGACIAEAFIADgCIADgCIACgCIACgDIACAAIACAAIACgCIAIgDIAQABIABAFIAEAKIABAFQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABIgFAFIgFADIgFACIgBgBIAAAAIABgEIgCgBIgBAAIgDABIgBADIgBAMIABADIAAAEQAAAAAAABQAAAAgBABQAAAAAAABQgBABAAAAIgEAFIgEAKIgEAFIgCACIgBABIAAAAIgBAAIgGACIgMAFIgGAAIgTAAIgFABIgFADIgEAEQgCADABACIAAAEIACACIADADIAEABIAHgDIADAAIABABIAAgBIACgBIACABIABABIABgCIAFAAIAFACIACABIACgBIACgBIABgCIADAAIAEAAIAHgCIACAAIACABIAEABIAIAAIAOAFIACABIABACIAGAEIAGADIACAEIADALQAAADgDAFIgFAIIgHAGIgFACIgdAKIgTADIgHABgAh/BnIACABQAFADAFAAIAKAAIAGgBIAFgDIAGgBIAGgCIADgBIADgBIAEgBIAEABIAEgCIADgCIABgDIAAgEIAAgBQABAAAAgBQABAAAAAAQAAAAABgBQAAAAAAgBIAAgDQAAgEgCgCIgEgCIgLgCIgBAAIgNgDQgGgBgHABIgBAAIgCgCIgCABIgBABIgCABIgBABIgFgBIgFABIgKAEIgFABIgDABIgEAEIgDAEIgBAEIACAHIADAFIAFADQADABAEAAgAh+gbIgCACIgBABIgBAAIgBABIgBABIgDADIgDANIgBAEIABACIAKAOIACACIADADIAEAAIAKgBIACABQAEgBAEgCIAHgHIAFgIQACgDgBgDIgBgGIgCgGIgFgFQgCgDgDAAIgOgEIgBAAIgCABIgBAAIgBABIgGgBgAhTgiIgBACIACAAIABABIACABIABABIADgBIAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAgBIgEgBgAj4BNIgIgDIgDAAIgGABIgCAAIgCgBIgBgBIgGgBIgHgDIgEgEIgFgJIgDgIIgGghIABgVIgDggIABgJIAAgBIgBgCIgCgFIAAgGIgDgHIgEgDIgGgBIgGgCIgBgCIgBgCQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAIAFgDIAFgCIAEgBIAIABIAOgDIALACIAGACQAAABABAAQAAAAABABQAAAAAAABQABAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAABgBAAIgDAFIgKAKIgEAGQgBADAAAEIABAJIAAAUIACALIAAAHIAAABIAAABIAAACIgCAEIAAACIAAgBIACgBIABABIABABIABACIAAABIACAMIAAAQQABACADACIABABIABACIACADIACACIADACIADABIAHADIACADIAHAEIABADIAAgDIABABIgBACIABgBIABgCIABgBIAAgBIACABIABABIAAACIgBADIACgBIADgCIABgCIABgCIgBgCIgHAAIACgDIADgCIADgBIAHgEIAIgLIAAgCIgBgQIABgFIgCgJIABgHIgDgNIABgRIgEgWIABgCIAAgDIABgCIABgCIgDgBIgGgGIgBgCIgBAAIgBAAIgGgBIgDgCIgDAAIgBAAIgDgLIABgEIADgCIAHgCIAOAAIAIgDIADAAIAGADIAIABIAFgBIAEABIAGAEIABACIgBADIgFADIgCABIgCABIgBACIgCABIgBABIgHABIgCADIgCALIgEABIABADIAEAFIABADIgBAFIABAHIACAKIgBADIAAACIADATIAAAHQAAADgCADIADAHIABAKIgBAHIgDAFQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAAAIgBAAIAAAAIAAABIABAGIAAACIgHAIIgDAEIgBABIgIADIgJAFIgGACgAgNBGIgKgIIgCgDIgBgDQAAgBAAAAQAAAAAAgBQABAAAAAAQAAgBABAAIANgEIALABIAIgCIAJAAIAGgCIAEgDIABgLIgDghIAAAAIABAAIAAgBIgCgKIABgMIgCgEIgCgDIgEgDIgEAAIgFAAIgIAEIgFABIgHAAIgPgCIgDgBIgBgEQgBgEACgCIADgDIAFgCIAOgCIAdgBIAHABQAEABACACIAFAGIACAIIgBAGIgDAGIACACIABABIABABIABACIAAACQAAABAAAAQABAAAAAAQAAAAAAAAQABABAAAAIADArIADAFQABACAEgBIAUgDQADAAADABIALAGIAEABIACABIABABIAAACIAAACIAAAEIgCADIgDACIgEABIgBAAIgBgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBAAAAAAIgFgBIgFgBQgCgBgCgDIgCgCIgDgBQgGABgEACIgSAIQgEACgFABIgGgBIgGgBIgBABIgDAAIgBAAIgCABIgBAAIABABIgIAFIgIACIgCAAIgEgBgAByA8IgHgDIgDgCIAAgFQAAgEABgCIAFgDIAFgCIAOgBIAGgCIAEgEIABgHIAAgDIgBgEIAAAAIABgDIgBgRIgBgHIgBgDIABgLIAAgCIgBAAIAAgBIgBgBIACgDIAAgDIgBgDIgDgDIgBgCIgKAAIgLgCIgEgCIgCgEIABgDIADgCIAIgDIAGAAIAIgCIABgCIABgDIAAgEIAAgCIgBgLIABgHQAAgDADgDIAMgNIAGgEIAJgDIAOgDIAVADIAMAHQACACABACQADAAACACIADAGIACAMIABABIgBAAIgEgBIAAAAIAAACIACACIABABIABABQAAABAAAAQAAAAAAAAQgBABAAAAQAAAAAAAAIgCAAIgDACIgEAGIgFACQgEAAgEgCQgFgCgDgDIgDgGIgCgOIgDgEQgCgCgFABIgJABIgIAEIgGAGQgCAEAAAFIABAIQAAADACACQABAAAAAAQABABAAAAQABAAAAAAQABAAAAAAIAIgBIADACIAHAGIABADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAIgFADIgMACIgDABIgBACIgBADIADAjQABADgBACIgBAEIABADIAAACIAAAKIAAAEIACADIACACIABADIANgDIANABIAGACQADACAAADIAAAFIgCAEIgDADIgKAEIgGABIgEAAIgIgCIgEgBIgVACIgRAFIgGABgAEFAsIgDAAIgBgCIgCgIIgCgCQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAgBIgDgCIgBgEIgBgIIgEgFIgBgDIABgVIAAgCIACgCIAAgCIgCgEIACgFIABgKIgBgEQgCgDgEAAIgNgBIgFgCIgDgEQgCgCgDAAIgCgBIgCgDQAAgBAAgBQAAAAABgBQAAAAAAgBQAAAAABgBIAEgCIAFgCIAEgCIAEgCIAEAAIAFgCIADgCIABgEIAAgFIgCgPIABgIQABgDADgEIABgBIAEgEIACgBIABABIABAAIAEAEIABADIAAAFIADANIgCAJIABADIADACIABADIABADIAGABIAgAAIALAEQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAABgBAAIgDADIgEABIgTABIgKACQgEABgEACQgDADgBAEQgCAEAAAHIAEAfIACAEIAGAQQABAEADACQADADAFgBIALgCIAEgDQABgBAAAAQABAAAAgBQAAAAAAgBQAAgBAAAAIgDgJIABgCIACgDIAFgCIAFgEQADgCADAAIAEAAIAEACIABAEIAAAGIgFAUQAAAGgDAEQgDAEgFADIgJAEIghAFgAAGhEIgGgDQgBgDAAgDIABgMIAAgCIAFgGIABgCIAAABIAHgCIAGAAIAHADIAFAFQADACAAADIAAAHIgDAHIgFAFQgDACgDABg");
	this.shape_2.setTransform(35.1,14.3,1,1,0,0,0,0.3,0.2);

	this.text = new cjs.Text("Gift", "24px 'Special Elite'");
	this.text.lineHeight = 26;
	this.text.lineWidth = 137;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.text}]},1).wait(12));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.1,2.9,50.5,19.2);


(lib.CharacterCardChildren = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"D":0,"E":1,"F":2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(15));

	// Text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AB+BuIgFgBIgKgIIgCgCIgEgBIgIgTIgBgGIAAgHIACgFIABgCIAEgCIADgEIADAAQAGAAADABIAGADIAJAHIABAEIAAABIAAACIgEARQAAADACABIADAAIAFgBIAEgDIADgEIABgFIAAgBIABAAIAHAAIABAAIABgCIABgCIAAgBIADgaIgEgQIABgHIgDgNIAAgLIgDgZIAAgEQAAgEgCgCIgDgDIgGgBIgVABIgHgCIgEgCQgDgCAAgDQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAIAHgEIAcgCIABAAIAAgBIAEgCIAHAAIAIACQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAAAIAAACIgBABIAJAEIACAnIACAEIAAAFIAAABIgBACIgBACIAAACQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIACAbIgBAIIAAABIACAKIACAEIAAAFQABAHgCAFQgBAGgDAEQgDAEgFADQgFADgHAAIgBABIgBABIAAACIAAACIgCABIgEABIgDACIgEAFIgDABgAilBJIgFgDIgCgDQAAgDACgDQACgDAEgBIAIgBIAEgBIADgDIgBgDIABgRIAAgDIgCgQIgJhKIgCgEIgDgBIgFAAIgDgCIgDgCIgDgEIgBgGIABgHQABgDADgBIAGgCIAHgBIAIAAIAIABIAHACQADACADAEIAJAUIACAFIABACIAEAEIAEAOIADAIIADADIADANIACADIAFAGIACAEIACAEQACADADACIgBACIgBADIACAEIAEAHIADADIACABIABABIAAACIABADIAAABIABACIABACIACAAIABAAIAAgBIABgCIAAgBIABgDIAAgDIgCgIIABgFIgBgCIgBgCIAAAAIABAAIAAgBIABgBIgBgFIgEgJIgBgGIABgEIABgDIgBgDIgBgDIACgGIgBgCIgDgHIgBgEIgBgOIgCgGIgCgJIgCgDIgRgCIgCgCIgCgDIAAgEIAAgDQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAIAGgDIAKgDIAKAAIANACIAFACQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAAAIADgCIADgBIADABIACACIACADIAAADIAAACIgBABIgBAAIgBgBIgBgBIgBAAIAAADIAAACIgBAAIgBAAIgBABIgGABIgCABIgBACIABAIIgBAEIADAWIAAALIACAJIAAABIgBABIgBABIAAACIABAFIABAEIgBAcIABAGIACAFIAAABIAAACIAAACIgBACIABABIABACIADAMIgBAFIgDAEIgFADIgFACQgDAAgDgCIgFgFIgMgYIgGgGIgEgNIgJgSIgEgGIgEgKIgHgMIgDgGIAAgDIgFgHIgCgBIgCABIgCADIAAALIABAEIgBAEIAAADIABACIABACIAAADIABAOIgBADIgCADIgDACIABABIACABIABAAIABABIAAABIAAABIAAACIADADIABABIgBAGIACAKIAAADIgBABIAAABIAAABIABAEIgBABIAAACIABACIAEABIACACIABACIACAAIAHgCQADAAACACIABAFQAAAEgBABIgCACIgDACIgBACIABABIgEgCIgEAAIgOADIgKAAIgGABgAibA9IAAABIACABIABABIACABIAAgBIAAgBIAAgBIgCgBIgCgBIgBAAgAAbBAIgIAAIgDgBIgIgFQgIgDgDgEIgJgJQgEgGgCgGIgFgNIgCgJQgBgHADgDIgBgHIADgQIAEgIQADgEACgBIACgBIAAgCIABgCIADgCIAcgLIAIgBIAGAAIANAGIAHABIAKAHIAFAFIACAFIAAABIAAABIAAgBIABABIACAEIAAABIAFAFIAAADIACAIIAAAJQAAABAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgFADIgBACIgBABIgCAAIgVgCIgdAEIgJAAIgOAEIgEACIAAACQAAAFAEAGQABAFAGAFQAGAFAGACQAHADAHgBIAHAAIAIABIAGgDIAOgPIACgBIAIgBIACgBIAFABIABAFIAAAGIgDAEIgHAHIgVAMIgXAEgAAUgmIAAABIgBAAIgFACIgHAEIgDADIgGAEIgCACIgCAGIgBAGQAAAAAAABQAAAAAAAAQABABAAAAQAAABAAAAIAFACIADABIAOABIARgDIATAAIAIgCIAEgBIABgDIgBgDIgBgEIgCgMIgBABIgBABIgDAAIgCgCIgQgGIgHgCIgKAAIgBABgACQhBIgNgKQgDgDAAgDQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBAAIgEgFIgBgEQAAgDACgDIAQgJIAGgBIAJABIAHACQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAIACAEQAAAAAAAAQAAABABAAQAAAAABAAQAAAAAAAAIABAPQAAAFgCADQgCADgEAAIgBAAIgCAAIAAgBIACgGIAAgBIgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBABAAAAIgCAEIgCAJg");
	this.shape.setTransform(20.7,13.3,1,1,0,0,0,0,0.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhdBUIgOgFIgCgBIgBgCIgQgMIgCgJIgBgJIACgKIABgEIACgEIADgDIADgCIAFgBIAHAAIAGACIADAEIAEAGIABAHIAAAGQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAIgEAFIgBAGQAAADACACIAFACIAKABIAFgCIAEgCIAEgBIAIgEIAEgCQACgKAAgKIgBgSIAAgDIgBgBIAAgBIAAgBIAAgJIgDgLIABgaIgCgFIABgEIgBgDIgEgHIgCgHIgCgCIgNgBIgHABIgCgBIgCAAIgBgCIgFgFIAAgEIAAgDIACgCIAEgBIADgBIAGAAIAKgBIAEgDIAEAAIAYACIALgDIAPACIADACIADAEIAAACIgBADIgEAFIgCADIgMABIgJACIgCADIgDACIgBADIAAAGIAHBNIAAAMIgDAMIgGAFIgFAGIgHAJIgCACIAAABIgBABIgDAAIgFABIgJAEIgFABIgJgBgAhbhJIAAADIACgBQABAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAAgBIgCAAQAAAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAAAgAAhBOIgFgCQgBAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIAAgBIgBACIgCABQgDAAgDgDIgFgFIgHgLIABgDIAAgDIAAgFIAAgFIAGgOIADgEIAJgFIADgDQACACAEAAIAKgDIAJABIAFgBIADgDIAEgCIARgGIAFgCQABgBAAgEQgBgDgCgEIgGgIIgIgFQgEgCgEAAIgBABIgBAAIgMACQgDABgDADQgCACABAEIABAJQAAAEgBABIgEADIgGACIgGABIgGAAQgDgBgBgEIgDgDIgDgFIABgHIAFgKIABgGIARgGIAGgDIAEgCIAJgCIALABIALACIAKAEIAIAGIAEAGIAEAIIACAIIABAaIAGAkIABAEIABAAIAEgCIAGgHQAAAAAAgBQABAAAAgBQABAAAAAAQABAAAAAAIACAAIADABIABAAIABACIAAAEIgCAEIAAAFIgCABIgJAGQgEACgEAAIgGgBIgPgIIgCABIgCACIgDACIgDABIgDABIgHADIgDABIgWAEgABWAOIgBAAIgNAHIgHACIgIABIgFABIgSAFIgCABIAAABIgBACIgEADIgDACIgCAFIgBAFQAAAEACACIAEAEIAGACIAIACIAMABIAOgDIAIgDQADgBABgDIABgCIABgBIABgCIAFgHIACgGIABgGIgBgGIAAgDIgBgGIgCgCIAAABg");
	this.shape_1.setTransform(15.3,10.8,1,1,0,0,0,-0.3,-0.4);

	this.text = new cjs.Text("Nej", "24px 'Special Elite'");
	this.text.lineHeight = 26;
	this.text.lineWidth = 137;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.text}]},1).wait(12));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.6,1.6,36.2,22.2);


(lib.CharacterCardChallenge = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{A:0,B:1,C:2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(15));

	// Text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ArvByQgBgBAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAIAAgFIADgDIAEgCIAMgFIACgEIACgRIABgCIAAgDIAAgBIABgDIABAAIABgBIAAgGIABgCIABgBIABgCIgDgFIABgCIABgCIABgBIAAgCIgBgFIABgBIABgBIABAAIABgBIgCAAQAAAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAIgCgCIADgIIAAgEIgCgKIAAgCIADgEIABgDIABgDIAAgKIAEgMIADgZIACgCIAEgDIAGgBIAOgCIABAEIAGAGIABADIACAFQAAADACACIABADIgBAKIABAFIAIATIAQA+IABANIgCADIAMALIAOADQAAAAABABQAAAAAAAAQAAAAABABQAAAAAAAAIgBAEIgBACIgDABIgFABIgCABIAAABIgBACIgCAAIgEAAIgIADIgPgCIgHgDQgDgCAAgCQAAgBAAAAQAAgBAAAAQABgBAAAAQABgBAAAAIAKgMQABgDAAgEIgBgFIgGgIIgEgDIgCAAIgNACIgDAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBgBAAIgOAHIgCABIAAABIgBAFIAAAFIgBABIgCACIAAACIAAACIAAABIABACIADACIAFABIADADIAEAHIABADIAAAAIgsAGgAq3gEIgBABIgBABIgCAAIgBABIAAABIAAACIgDAIIABAQIgCAHIAAADIACALIACACIAEAAIANgCIAGgEQABAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAAAIgFgLIgFgXIgCgFIgCgDIgEgBIgCAAgApbBwIgPgBQgBAAAAgBQgBAAAAAAQgBAAAAgBQAAAAAAAAIACgMQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIABgBIAAAAIABgBIABgBIAAAAIAdgCIAKgCQAFgBADgEQADgDAAgFIgIhCIABgIQACgCADgEIgBAAIgCAAIgBgBIgBAAIgBgCIgCgIIACgNIgCgEIgEgGIABgCIgBABIgCAAIgBACIgBABIgBAAIgCAAIgEABIgRgBIgOABIgGgDIAAgCQAAgGAEgDQAEgEAGAAIAQABIAUgEIAIABIAHADIAAABIABACIACADIABACIAAACIgBACIADAKIAAALIACAOIgBAIIAEAQIAAAGIgBADIACAKIAAAFIgBADIgCABIAGAaIABAEIAAACIgBAIIABADQABABAAAAQAAAAABAAQAAABAAAAQABAAAAAAIADgBIABgBIADgCIAEgBIAMABIASgEQAEAAAEACQADADAAAFQABAEgDADIgGAEIgPADIgHAAIgLgEIgIACIgCAAIgBgBIgBgBIgCAAIgBAAIgBACIgBABIgDABIgLAAIgIACIgCgBIgBAAIgIACIgDAAIgLACgAo0gRIgBABIABAFIABAAIACgBIAAgCIAAgCIgCgBgAo+gvIABABIAAABIABABIABgBIACgBIgCgBIgCgBgAnhBlIgEgDIgDgEIgBgFIABgFQABgCADgBIADACIABAAIABgCIABgBIACgBIAFgCIADgFIABgGIAAgKIgBgEIABgNIgDgWIAAgRIgBgDIgBgCIgBgDIABgJIgCgLIAAgIQAAgEgCgCIgFgDIgMgBIgEgBQgCgCgBgDQAAgDACgCIADgEIAFgCIAGgBIATAEIADACIAAAAIACAHIADAXIgBANIAEASIAAANIACARIACAAQABAAAAAAQABAAAAAAQABAAAAgBQABAAAAAAIAJgKIAEgDIAHgKIAFgEQAAAAABAAQAAgBABAAQAAgBAAAAQAAgBAAgBIgDgIIgBgEIAAgBIACAAIABAAIAAAAIAAgCIAAgDIACAAIAKABIAEgBIAKgDIAMABIANgDIACAAIACABIABABIABACIAAABIgBABIABABIABACIABABIABACQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAIgOAGIgFAAIgDAAIgDgBIgFACIgFACIgNAMIgEAGIgBAFIgBAHIABADIAGADIAWAaIADAGIACAFIAAAAIALgBIAPAAIAAACIABAEIAEAEIACACIgBACIgBACIgCABIAAACIAAABIgSADIgBAAIgCgBIgBgBIgBgCIgDACIgDAAIgFAEIgPgBIgGgCIgEgCQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgCIABgGIABgBIAFAAIABAAIAAgBIgBgBIgBgBIgDAAIACgEIgBgJIgCgFIgEgEQAAgBgBAAQAAgBAAAAQgBAAgBAAQAAgBgBAAIgEgGIgDgCIgDAAIgGACIgKALIgDAEIACAFIgBAEIgCADIACADIADABIAIABIACABIAFAFIABACIgBACIgDABIgBABIAAACIgWAEIgEACIgJAAIgHACgAkWBcIgGgCIgLgBIgJgHIgOgHQgDgBgCgEIgKgLIgDgGIgCgGIAAgFIACgNIAAgBIgBgBIAAgBIgBgBIgBgBIABgHIACgFIABgCIABgBIABgCIAAgCIgBgCIAAgCIABgBIABAAIACAAIADgGIADgEIAOgLIAKgDIAGgCIATgDIAPACIAIADIAGADIgBAHIAAABIAIgCIACADIADABIADACIAKARIACAIIgBAEIgEAGIAAACIAAABIABABIABAAIABgBIgBgBIgBgCIAAgBIABAAIABABIACACIABABIAAAAIABABIAAABIgBADIgBADIgBABIAAABIAAADIABACIAAABIgBABIgCgBIABAJIAAAEIgBACIgCABIAAACIgBADIgIAGIgDABIgBAAIAAAEIAAACIgNALIgFABIgHgCIgKAFIgGgCgAkSBJIAHgBQAEAAADgCIAHgJIACgDIAGgFIACgBIACgCIABgCIABgCIgBgCIAAgFIADgFIADgBIACAAIADABIAAgCQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAAAgBAAIgGAAIgDgCIAAgBIgBgGIgJgXIgCAAIgDgBIgIgDIgaAAQgHAAgFAEQgGACgEAEQgEAFgCAHQgCAGAAAGIACAMIACAHQABADACABIAAADIABABIACAAIABAAIABABIAFAGIALAHIAFAEIACAAIACgBgAi5BXIgCgBIgIgBIgEgBIgBgFIAAgEIACgDIADgDIAEgBIAGAAIACAAIAAgCIACgCIACgBIAAgYIgDgYIAAgPIgCgFIACgFIAAAAQgBAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAIABAAIgBgBIgBgCIgBgCIgBgCIACgIIgBgIIABgKIgBgCIgBAAIgCAAIgCgJIgCgEQAAgBgBAAQAAAAgBAAQAAgBgBAAQAAAAgBAAIgFABIgEgBIgEgDIgDgEIgBgEQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAIAJgBIADgCIAOgCIADABIAHAEIADABIAAALIACAIIAAABIgBAAIgBABIAAACIABADIACAEIAAAEIgBADIACAMIADAFQAAABABAAQAAABABAAQAAAAAAABQABAAAAAAIAFgCIAEgDIAHgHIAEgDIAGgCIAMgCIAGAAIADABIACACIAGADIAEABIACABIANAOQABACAAADIAAAEIgBAEIABACIABABIgBAMIgBADIADAFIABAGIAAARQAAAGACACIAFAFIAKADIAFADQABABAAAEIAAAEIgCADIgiAEQgFABAAgFIgDABIgFAEIgDABIgEAAQgBgBgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBIAAgBIABgCIABAAIABgBIgBgBIgBgBIgBgBIgBgCIABgCIAEgCIANgCQABAAAAAAQABAAAAAAQAAgBAAAAQABAAAAgBIACgFIABgNIgCgPIgEgTIAAgCIACgFIAAAAIgBgDIgCgDIgCgGIgCgDIgFgFIgIAAIgJABIgJADIgHAFIgMAMIgEAHIgBAVIAAAEIAEAJIgBADIgCAJIgCABIACADIAHAEIADABIACAAIACgBIAFABIAEACIADADQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAIgBABIgBAAIgCgBIAAgBIgBgBIgBgBIgBABIAAABIABACIAEAFIABACIAAABIgBAAIgFgBIgEAEIgEACIgGABIgDgBIgCgGQAAAAgBAAQAAAAAAgBQAAAAgBAAQAAAAgBAAIgBABIgBABIABABIACAEIAAABIgFABIgJACgAAHBLIgIgDIgDAAIgEgBIgJgHIgNgGQgEgCgCgDIgJgLIgDgGIgCgHIACgSIAAgBIgBgBIgBgBIgBgBIAAAAIACgKIABgDIACgBIAAgCIAAgCIgBgCIABgCIABAAIABAAIABgCIAEgHIACgDIAPgMIAKgCIAGgDIARgDIAPACIAIADIAFAEIAAAHIAAAAIAHgBIACADIADAAIADADIALATIABAHIgBADIgDAFIgBACIABACIABABIABAAIABgBIgCgCIAAgBIAAgBIAAgBIACABIABACIACABIAAABIAAAAIAAABIAAAEIgBACIgBACIgBABIABACIABADIAAABIgBAAIgCAAIABAJIgBAEIgBABIgBABIAAACIgCADIgHAHIgEABIAAAAIAAAEIgBACIgNAKIgEABIgHgBIgLAEIgGgBgAALA3IAHAAQAEgBADgCIAIgIIACgDIAGgFIABgCIACgBIACgCIABgCIgBgCIAAgFIACgGIADgBIADAAIACACIAAgCQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAIgHgBIgCgBIAAgBIgCgGIgJgYIgBAAIgEAAIgHgDIgZgBQgHABgFADQgGADgDAGQgFAFgCAGQgCAEABAGIABANIACAGQABADADABIAAAEIABAAIABAAIACAAIABABIAEAHIALAGIAEAEIACAAIACAAgABVBEQgBAAAAgBQgBAAAAAAQgBAAAAgBQAAAAAAAAIACgMQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAgBIABgBIAAAAIABgBIABgBIAAAAIAdgCIAKgCQAFgCADgDQADgDAAgFIgIhAIABgIQACgEADgEIgBAAIgCgBIgBAAIgBAAIgBgCIgCgIIACgNIgCgEIgEgGIABgCIgBAAIgCABIgBACIgBABIgBAAIgCAAIgEABIgRgBIgEAAIgKAAQgDAAgDgCIAAgCQAAgGAEgDQAEgEAGAAIAQABIAUgEQAEgBAEACIAHADIAAABIABACIACADIABACIAAACIgBACIADAKIAAALIACAOIgBAKIAEAQIAAAGIgBADIACAJIAAAFIgBACIgCABIAGAaIABAEIAAACIgBAIIABADQAAABABAAQAAAAAAAAQABABAAAAQABAAAAAAIADgBIABgCIADgBIAEgBIALABIAJgCIAFgCIAEAAQAFgBADADQAEADAAAFQAAAEgCADIgHAEIgPADIgGgBIgLgDIgIACIgCAAIgBgBIgBgBIgCgBIgBABIgBACIgBABIgDABIgLgBIgIADIgCgBIgBAAIgIACIgDAAIgCAAIgJACIgEAAgACLg3IABABIACgBIAAgCIAAgCIgCgBIgBAAIgBAAgACBhaIABABIAAABIABABIABgBIACgBIgCgBIgCgBgADnBAIgKgJIgCgDIgBgDQAAAAAAgBQAAAAAAAAQABgBAAAAQAAAAABgBIAEgBIAJgCIAMAAIAFAAIAEgCIAJAAIAGgBIAEgDIABgMIgDggIAAAAIABgBIAAAAIgCgKIABgMIgCgEIgCgDIgEgDIgEgBIgFABIgKAEIgFAAIgWgBIgDgCIgBgDQgBgEACgCIADgEIATgEIAfAAIAHABQAEAAACADIAFAGIACAIIgBAGIgDAGIACACIABABIABAAIABADIAAACQAAAAAAAAQAAAAABABQAAAAAAAAQABAAAAAAIADArIADAGQABABAEAAIAVgDQADgBADACIAKAGIAFABIABAAIABACIAAACIABABIgBAEIgCADIgDADIgDABIgBgBIgBAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIgFAAIgEgBQgDgBgBgDIgDgCIgDgBQgFAAgFACIgSAJQgEACgFAAIgGAAIgGgCIgBABIgDABIgBAAIgCAAIgBABIABABIgIAEIgKACIgCAAIgEAAgAFlAxIgEgCIgCgEIgCgFIABgFQACgDADAAIADACIAAgBIABgBIABgBIACgBIAGgDIACgEIACgGIgBgKIgBgEIACgMIgDgWIAAgQIgBgGIgCgBIAAgDIABgKIgCgKIAAgIIgCgGIgFgDIgMgBIgFgCQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAgBQAAgDABgDIAEgDIAFgCIAGgBIATAEIACABIABABIACAGIADAYIgCAMIAEARIABAaIACAIIACAAIAEgBIAFgHIADgDIAFgEIAHgJIAEgEQABgBAAAAQABAAAAgBQAAAAABgBQAAAAAAgBIgEgLIAAgDIAAgBIABAAIABAAIABgBIgBgCIAAgCIACgBIAKACIAEgBIAKgEIAMABIANgCIACAAIACAAIACACIABABIgBABIgBABIABABIABACIACACIABACQAAAAAAABQgBAAAAABQAAAAgBAAQAAABgBAAIgOAFIgIABIgDgBIgFACIgFAEIgNAMIgDAGIgCAEIgBAHIACADIAFAEIAWAYIADAFIACAFIAAABIALgCIAQAAIAAACIABAEIAEAEIABACIgCAFIgBABIgBABIABACIgSACIgCAAIgCgBIgBAAIgBgCIgDABIgDABIgFAEIgPgCIgFgBIgEgCQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBIAAgCIABgGIACgBIAEABIABAAIAAgBIgBgCIgBgBIgDABIACgEIAAgEIAAgFIgDgFIgDgFQgBAAAAgBQgBAAAAAAQgBgBAAAAQgBAAAAAAIgEgEIgDgCIgEgBIgFACIgLAKIgCAEIABAFIgBADIgCADIACADIAEACIAHABIACABIAGAFIABACIgBABIgEABIgBACIABACIgaAFIgKABIgHABgAIqAnIgLgBIgIgFQgIgDgFgEQgFgEgEgGQgEgFgCgGIgFgMIgCgIQgBgHADgGIgBgGIADgQIAEgIIAFgFIACgBIAAgCIABgDIAZgLIAIgCIAIgBIAGAAIANAHIAHABIAKAHIAFAEIACAFIAAABIAAABIAAAAIABABIACAEIAAABIAFAFIAAADIACAIIAAAJQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAIgFADIgBACIgBABIgCAAIgVgCIgmAEIgQAEIgEACIAAABQAAAGAEAEQADAFAGAFQAGAEAGADQAHACAHAAIAHAAIAIABIALgIIAJgKIACgBIAIgCIACAAIAFAAIABAGIAAAFIgDAFIgKAJIgSAKIgXAEgAIjg/IAAAAIgBABIgFABIgHAEIgDAEIgDACIgFACIgCACIgCAGQgBACAAADQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIAFADIAFABIAOABIARgDIATAAIAIgCIAEgCIABgCIgBgEIgBgDIgCgMIgBABIgBABIgDgBIgCgCIgQgGIgHgBIgKAAIgBABgAJ7AgIgDgCIgBgDIABgCIAFgGIACgBIAIAAIAGgCIAGgDIAEgFIABgGIgBgEIABgMIgFgsIgDgGQAAgBgBAAQAAgBAAAAQgBAAgBAAQAAAAgBAAIgKABIgKAAIgEgDIgCgEIAAgFIACgDIADgBIAEgBIAEAAIATgCIAKABQAAAAABAAQABABAAAAQABAAAAAAQAAABABAAIAEAIQAAAAABAAQAAABABAAQAAAAABAAQABAAAAAAIACgBIADgDIAIgDIAHgFIASgGIADgCIAHABIAIADIAIAFQADADABADIABAFIAEAHIABAEIAAAEIgEAHIgCADIgCAAIgNACQgDAAgCgCIgEgFIgDgLIABgHIgCgBIgEADIgCgBIgCgBIgJAFIgEAEQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAAAIgEACIgFACIgCAEIgDAJIgFAJQgBADAAADIADARIAAAJQAAABAAAAQAAABABAAQAAABAAAAQAAABABAAIADAEIAFABIAPgBIABABIAAACIAAAEIAAABIADgBIACgCIACAAIAAACIAAABIgBABIgBACIAAABIAAABIABABIgCABIgFAAIgCgBIgCgBIgDAAIgCABIgBAAIgBABIABACIAAACIAAABIgBABIgCAAIgCAAIgSgBIgIADIgDgBIgBgBIgBgBIgCAAIgRAEgAD8hKIgGgEQgDgCAAgDIABgMIACgCIAFgHIABgBIAAAAIAHgCIAGABIAHADIAFAEQADADAAADIAAAHIgDAGIgFAGQgDACgDAAg");
	this.shape.setTransform(75.2,10.6,1,1,0,0,0,-0.3,-1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ak+BWIgDABIgNAAIgEgJIgBgEQAAgBAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAIADgDIAGAAIAEgDQADgBABgCQABgCAAgFIgEgZIAAgDIgCgPIAAgPIgBgHIgCgXIgEgPIgCgEQgCgCgEAAIgCgBIgBgBIgBAAIgDgBQgFgBgBgEIABgGIACgEIAIgHQADgCADgBIAXgDIAIABIADABIADABIAEgDIAAABIACABIAAgBIABgBIACABIAAABIACAAIABAAIAKgCIAGABIAGADIAJAHIAGADIAEACIACACIACAFIAFAEIAFAJQAEAHABAIIAHAaIgBAHIABACIACAAIAAADIgBASIgIAeIgDAIIgDACIgFAGIAAADIgEAAIgIADIgCABIgBAEIgBABIAAABIgHAAIgHADIgCAAIgKgBIgTAFgAkug4IgFADQAAAAAAABQgBAAAAABQAAAAAAABQAAABAAABIAGBlIACAFQAAAAAAABQABAAAAABQABAAAAAAQABAAAAABIAIACIAHAAIARgFIAGgEIADgEIAHgEIABgDIADgGIABgEIAEgSQABgFAAgEIgCgFIABgBIAAAAIABAAIAAgBIgCgJIgEgIIABgDIAAgHIgBgEIAAgBIgBgCIgDgCIgCgGIgDgEIAAgCIAAgDIgBgBIgDgBIgHgBIgIgEIgFgBgAiKBQIgKgDIgEAAIgDgBIgJgHIgNgHQgEgBgCgDIgJgMIgDgFIgDgHIADgSIAAgBIgCgBIAAgBIgBgBIgBgBIABgHIACgEIABgBIACgBIAAgDIAAgCIgBgCIABgBIABAAIAAAAIACgCIAEgHIACgEIAOgLIALgCIAFgDIATgDIAPACIAJADIAFADIgBAHIAAABIAIgBIACACIADABIADADIAKATIACAGIgBAEIgEAFIAAACIAAABIABABIABAAIABgBIgBgBIgBgBIAAgBIABgBIABABIACACIACABIAAAAIAAABIAAAAIAAAEIgBADIgCACIAAAAIAAADIACADIAAABIgCAAIgCAAIABAJIAAADIgBACIgCAAIAAADIgBADIgHAHIgEABIAAAAIAAADIgBADIgCABIgLAJIgEABIgHgBIgLAEIgGgBgAiGA8IAHAAQAEgBADgCIAIgIIABgEIAHgEIABgCIADgEIABgBIgBgCIAAgGIADgFIADgBIACAAIADACIAAgDQAAAAAAAAQAAgBAAAAQgBAAAAAAQAAgBgBAAIgGAAIgDgBIAAgBIgBgHIgJgXIgBAAIgEgBIgHgCIgbgBQgHAAgFADQgGAEgEAFQgEAGgCADQgCAHAAAGIACAMIACAHQABADACABIAAAEIABAAIACAAIACAAIABABIAEAHIAQAKIACAAIADAAgAgBBHIgCgBIgCgFIAAgEIgCAAIgBAAIgCAAIgBAAIgBgDIAAgEIgBgIIgEgFIgDgMIgBgDIgCgDIgFgIIgIgTQgEgLgGgJIgDABIgEABIgLgCIgDgBIgCgCIgCgGQAAgDACgCIADgDIAFgCIAFgBIAQABIAQgCIAHABIAGACQABABAAAAQAAABABAAQAAABAAAAQAAABAAABIAAAEQAAABAAABQgBAAAAABQAAAAgBABQAAAAAAABIgCABIgHACIgBAAIgBAGIABAEIAAADIAAACIACABIAAAAIABAGIACADIAFAEIAAACIgBAAIgBACIABAAIABAAIABAAIABAAIAAACIABAIIAHAOIABAIIACAAIADgDIAFgGIAEgDIAAgBIgBgGIACgHIAAgFIABgBIAEgHIACgEIAAgIIAAgOQAAgBgBAAQAAgBAAgBQAAAAAAAAQgBgBAAAAIgKgCQgBAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAgBIAAgBIABgBIABgBIAAgCIAAgCIgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAIACgBIAFgCIAGAAIAHADIACAAIACgBIACgDIABgCIACAAIADgBIAKAAIAHABIAHACIAGAEQgBAFgCACQgCADgDABIgGADIgHABQgFABgBACQgCABgBAEIgBAFIgFALIgCAEIACADIgCADIgCAEIAAAJIgHAMIgDAVIgDAKIgGAJIgOACgAAogwIABACIADABIABAAIABgBIgGgEIAAACgACKA8IgLgBIgIgFQgHgDgGgEQgEgEgFgGQgEgFgCgGIgFgNIgCgJQgBgFADgGIgBgGIADgPIAFgJIAEgFIACgBIABgCIABgCIAQgIIAQgGIAIgBIAGAAIANAHIAHABIAKAIIAFADIACAGIAAABIAAABIABgBIAAABIACAEIAAACIAGAEIgBADIACAIIAAAJQAAABAAAAQAAAAAAABQgBAAAAAAQAAABAAAAIgGACIgBABIgBABIgCgBIgUgBIgnAEIgPAEIgFACIAAABQAAAGAFAGQACAFAHAFQAFAFAHACQAGACAHABIAHAAIAIAAIAGgDIAKgJIAEgGIADAAIAHgCIADAAIAEAAIABAFIAAAGIgDADIgHAHIgCADIgQAIIgDACIgXAEgACDgrIAAABIgBABIgFACIgGAEIgEADIgDACIgFACIgCACIgCAGQgBACAAADQAAABAAAAQAAABAAAAQABABAAAAQAAAAAAABIAFACIALABIAIABIASgDIASAAIAIgBIAEgDIABgCIgBgDIgBgEIgCgMIAAABIgCABIgDgBIgBgBIgRgHIgHgBIgKAAIgBAAgADfA1IgDgCIgBgEIgBgDIABgDIACgDIADgCIAFgBIADAAIAEgCIACgFIAAgJIgBgJIgBgCIABgBIABgEIAAgCIgBgGIAAgFIAAgDIgBgDIAAgFIgDgNQgBgEgCgBIgEgDIgLgCIgDgDQgDgCABgFQgBgDACgCIAEgDIAGgBIASABIAHADIABADIABACIABADIABAEIABADIADABIAAgBIABgBIACgCIAGgGIACgCIACgDIABgCIACgBIABAAIACgBIACgCIAGgDIAHgCIAIAAIAJABIAHADIAHAFIAGAIIABADIABAFIADAKIABAEIAAAQIgBALIAAADIACAAIgBAIIADAHIAAABIgCABIgBACIAAABIAEAHIADACIADABIADgBIACgBIADABIAFAHIABAEIgBADIgCABIgDABIgKAAIgEACIgGACIgCAAIgBgBIgIACIgHAAIgHgBQgFAAgDgEQgDgDgBgGQADgCAFgBIAIgBIAJAAIgGgnIADgTIgBgDIgDgGIgCgIIgCgCIgFgCIgIgBIgJACIgIAEIgBABIgEAFIgCABIgCABIgCAAIAAACIgBADIgBACIgBABIgCgBIAAAAIgBAAIgBABIAAADIgBACIgBAAIAAAAIAAADIgDAJIACAJIgBAAIgBACIgBAEIABACIAEAJIgBAJIABADIACACIAKAEIAEADIABgBQAAAAAAAAQABAAAAABQAAAAABAAQAAABAAAAIABADIgBAHQAAAAAAAAQAAAAgBABQAAAAgBAAQAAABgBAAIgOADIgdAAgAFHATIgBABIgBACIAAACIABABIABABIABgBIABgCIAAgBIABgCIgBgCIgBgBIgBACgADxgBIACABIADAAIACAAIACACIABgCIgCgDIgBgCIgBAAIgDABIgDABIAAAAgAFCgDIgBADIABAAIACABIACgBIABAAIgBgDIgDgBIgBABg");
	this.shape_1.setTransform(35.5,12.9,1,1,0,0,0,0,-1.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("ApzBvIgCgBIgEgEIgEgEIgCgGIAAgGIAAgIIgCgLIABgIIgBgCIgBgDIAAgCIABgBIAAgDIAAgDIAAgCIAAgDIABgCIABgBQAAAAABAAQABAAAAAAQABABAAAAQABABAAAAIAIANIABAFIAAABIgBAAIABADIABADIgBAFIABACIACACIABACIACABIAFAAIAEAGIAIAFIAUACIAIgCIAGgDIAWgRIAGgHIABgDIAAgBIgCgPQgBgDgCgCIgDgDIgEgCIgFgDIgEgCIgMgBQgDAAgDgCIgBAAIgFACIgHgBIgDgCIgKgBIgDAAIgDgCQgHgEgGgBIgFgHIgEgDIgFgIIgDgKIAAgGQAAgCACgCIABgBIAAgBIAAgBIgBgBIAAgBIACgFIAEgFIAMgMIAEgBIACAAIACAAIABgBIAAgCIACgBIACAAIADAAIAhgCIAIABIAEgBIABgCIABgBIACgBIAKACIAAADIAAAEIAEAHIABAEIAAAFIABAEIABABIgBACIgBACIACAPIAAAEIgBAEQgBAAAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAIgDAAIgFgHIgDgHIgKgPIgCgDIgCgBIgCABIgVgEIgGACIgUAJQgDAHAAAHIACAJIAEADIALAHIAGACIAOAAIARADIAKgBIACACIALAEIACACIAFAGIAHAIIABAEIABABIACABIABAcIgDgBIgCgBIgCACIgBACIABACIADAAIABgBIAAADIgFAJIgCACIgEAFIgCABIgBgBIgCgBQAAAAgBAAQAAAAAAABQAAAAAAAAQgBAAAAABIAAAEIgCACIgcALIgKACIgIgBIgPgDIgHgBIgEABIgDACIgBABIgCACIgCAAgAm/BpIgCgCIgDgEIAAgEIgBAAIgCAAIgBAAIgCgBIAAgDIAAgDIgCgIIgEgGIgCgLIgCgEIgCgCIgFgIIgHgVQgEgLgHgJIgCABIgEABIgLgBIgEgCIgCgDIgBgEQAAgCACgCIACgDIAGgCIAFgBIAQABIAPgCIAIABIAFACQABABAAAAQABAAAAABQAAABABAAQAAABAAAAIgBAEQAAAAAAAAQAAABAAABQgBAAAAAAQAAABgBAAIgCACIgGACIgCAAIAAAFIAAAFIAAADIABABIABABIABABIABAFIACADIAEAGIABACIgBABIgCABIABABIABAAIABAAIABAAIAAACIACAIIAGAOIADAHIACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAgBIAFgHIADgCIAAgBIgBgGIADgIIAAgEIAAgCIAEgGIACgHIABgIIgBgNQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAIgKgCQgBAAAAAAQgBAAAAgBQAAAAAAAAQgBAAAAAAIAAgBIACgCIAAgBIAAgBIAAgCIAAgBQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAIADgCIAFgBIAGAAIAHACIACAAIADgBIABgCIABgCIACAAIADgBIALAAIAGABIAHACIAGAEQAAAEgDADQgBADgEABIgGABIgHABQgEABgCABQgCACgBAEIgBAFIgFALIgCADIACAGIgBADIgDAEIAAAJIgGAMIgFAVIgCAKIgGAJIgCAAIgMACgAmUgPIABADIADABIABAAIABgCIgGgDIAAABgAlOBbQgBAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAIgBgBQAAAAAAABQgBAAAAAAQgBABAAAAQAAAAgBAAQgCAAgDgCIgFgGIgIgLIABgDIABgCIgBgGIAAgFIAHgOIACgDIAJgFIAEgEQACACADAAIALgCIAJAAIAEgBIADgCIAFgDIARgFIAEgEQACgCgBgDQAAgEgCgEIgHgFIgHgFQgFgCgEAAIgBAAIgBAAIgLADQgEABgCACQgCACAAAEIACAIQAAADgCACIgDAEIgGADIgHABIgFgBQgEgBgBgDIgDgFIgCgGIABgFIAEgKIACgGIAbgLIAJgBIALAAIALACIAJAEIAIAGIAEAGIADgDIACgBIABgCIABgDIACgBIAOgHIAQgFIAIgBIAGAAIAFACIAJAFIAGABIAKAHIAFAEIACAFIAAABIAAABIAAAAIABABIABACIACACIAAABIAEADIAAADIACAIIAAAEIAAAFIgBADIgGADIgBACIgBABIgCgBIgUgBIgmADIgQAEIgFADIAAABQABAGAEAGQACAFAHAFQAFAEAHADQAHACAGAAIAIAAIAHABIAGgEIAJgJIAFgFIADgBIAHgCIADAAIAEAAIACAGIAAAFIgDAEIgLAKIgSAKIgWAEIgDAAIgCgBIgLgBIgCgCIgDgCIgCgCQgJgCgFgFQgFgEgFgGIgDAHIgFAFIgDACIgCACIgCABIgEACIgCAAIgIAEIgNADIgWABgAkiAjIgHACIgJABIgEABIgSAFIgCABIgBABIgBACIgDAEIgDABIgDAFIgBAFQABAEABACIAFAEIAGADIAHABIANABIANgCIAIgDQADgCACgDIABgBIABgCIABgCIAFgHIACgFIABgGIgBgHIAAgCIgCgHIgBgBIgBAAIgBAAgAjngOIABABIgBABIgFABIgEACIgKAIIgEABIgCABIgDAGIgBAFQAAABABAAQAAABAAAAQAAAAAAABQABAAAAAAIAEACIALACIAIABIASgDIASAAIADgBIAFgBIAEgCQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIgEgSIAAACIgBABIgEgBIgCgCIgPgGIgIgBIgJAAIgBAAIgBAAgAiOBSIgEgCIgDgEIgBgFIABgFQACgDADAAIACACIABgBIABgBIABgBIACgCIAFgCIADgFIACgFIgBgKIgBgFIACgNIgEgUIAAgQIgBgGIgBgCIgBgCIABgKIgBgKIAAgIQgBgEgBgCIgGgDIgLgBIgFgCQgCgBgBgDQABgEABgCIAEgDIAEgCIAHgBIASAEIADABIAAABIADAGIADAYIgCAMIADARIACAXIABAJIADAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAgBIAJgJIAFgEIAGgHIAFgEQABgBAAAAQABAAAAgBQAAAAAAgBQAAgBAAAAIgDgLIAAgDIAAgBIABAAIABAAIAAgBIAAgCIAAgCIACgBIAKABIAEAAIAKgEIAMABIAOgCIACAAIABAAIACACIABABIgBABIgBABIABABIABACIACACIABACQAAAAAAABQAAAAgBABQAAAAAAAAQgBABgBAAIgNAFIgJABIgCgBIgGACIgFADIgNANIgDADIgCAFIgBAHIACADIAFAEIAWAaIAEAFIABAFIAAABIALgCIAQAAIAAACIABAEIAEAEIACACIgBADIgBABIgCABIgBACIABACIgSACIgCAAIgCgBIgBgBIgBgBIgDABIgDABIgFAEIgVgDIgDgCQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAgCIABgGIABgBIAFABIABAAIABgBIgBgCIgCgBIgDAAIACgDIgBgJIgCgGIgDgEQgBAAAAgBQgBAAAAAAQgBgBAAAAQgBAAgBAAIgDgGIgEgCIgDgBIgGACIgKAMIgCAEIABAFIgBADIgCADIACADIADACIAIABIACABIAGAFIAAACIAAABIgEABIgBACIABABIgrAIgAAEBJIgEgCIAAgEIgCgFIABgFQABgDABAAIAEACIAAgBIABgBIABgBIACgCIAGgCIACgFIABgFIAAgKIgBgFIABgNIgCgUIAAgQIgBgGIgCgCIAAgCIABgKIgDgKIAAgIIgCgHIgEgCIgLgCIgEgBQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBIABgGIADgDIAGgCIADgBIATAEIADABIABABIABAGIADAYIgBAMIAEARIABAZIACAHIABAAIAFgCIAIgHQACgBADgDIAHgJIAEgEQABgBAAAAQABAAAAgBQAAAAAAgBQABgBAAAAIgEgLIgBgDIAAgBIACAAIABAAIAAgBIAAgCIAAgCIACgBIAKABIAEAAIAKgEIANABIAMgCIACAAIADAAIABACIABABIAAABIgBABIABABIABACIABACIABABQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABIgPAFIgEABIgEAAIgDgBIgEABIgGAEIgHAGIgKAMIgBAFIgBAFIABADIAGAEIAWAZIADAGIACAFIAAABIAMgCIAPAAIAAACIABAEIAEAEIABACIgBADIgBABIgBABIAAACIAAABIgSADIgBAAIgCgBIgCgBIgBgBIgDABIgDABIgDABIgCADIgUgDIgFgCQAAgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAgCIABgGIABgBIAFABIABAAIAAgBIgBgCIgBgBIgDAAIACgDIAAgJIgDgGIgEgEQAAAAAAgBQgBAAAAAAQgBgBAAAAQgBAAAAAAIgFgGIgCgCIgEgBIgFACIgLALIgDAFIACAFIgBADIgCADIACADIAEABIAHABIACACIAFAFIACACIgCABIgDABIgBACIABABIgrAIgADJA/IgHgBIgEgBIgIgFQgIgCgFgEIgJgKQgDgFgDgGIgFgOIgCgJQAAgGADgEIgCgGIADgQIAEgIIAFgFIACgBIAAgCIABgDIAEgCIAdgLIAJgBIAFAAIAOAGIAHACIAKAHIAEAEIACAFIAAABIAAABIABAAIABABIABADIAAACIAGAFIgBADIACAIIAAAJQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAAAAAIgGACIgBACIgBABIgCgBIgVgBIgdADIgIAAIgRAEIgDADIgBABQAAAGAEAFQADAGAGAEQAGAFAHADQAGACAHAAIAIAAIAIABIAFgEIAJgJIAFgFIACgBIAIgCIACAAIAGAAIAAAGIAAAFIgCAEIgHAHIgWANIgXAEgADCgoIABABIgBABIgGABIgHAEIgDAEIgIAEIgBABIgCAHQgCACAAADQAAABAAAAQAAABAAAAQABAAAAABQAAAAABAAIAEACIAFACIAOABIARgDIATgBIAIgBIAEgCIABgCIAAgEIgCgDIgCgNIgBACIgBAAIgCAAIgCgCIgQgGIgIgBIgKAAIgBAAgAEiA8IgOgCQgBAAgBAAQgBAAAAgBQgBAAAAAAQAAAAAAgBIACgMQAAAAgBAAQAAAAAAAAQAAAAgBgBQAAAAAAAAIABgBIABgBIABAAIAAgBIAAgBIAdgBIAKgDQAFgBADgDQADgDAAgFIgIhAIACgJQABgEADgDIAAgBIgCAAIgBAAIgBgBIgCgBIgCgIIACgOIgCgDIgDgGIAAgCIgBAAIgBABIgCABIgBABIgBABIgCAAIgDABIgRgCIgPABIgGgDIAAgBQAAgHAFgDQADgDAGgBIAQACIAVgFIAHABIAIADIgBABIABACIACAEIABABIAAADIgBACIADAJIAAALIACAOIgBALIAFAPIAAAGIgBAEIABAJIAAAGIAAACIgCACIAFAXIABAEIAAADIgBAHIABAEQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAIACAAIABgCIAEgCIAEAAIALAAIASgEQAEAAAEADQAEACAAAGQAAAEgDACIgGAEIgPADIgHAAIgKgDIgJACIgBgBIgCgBIgBgBIgCAAIgBABIgBABIgBACIgDAAIgKAAIgJADIgCgBIgBgBIgIADIgDgBIgKADgAFJhAIACAAIABgBIAAgCIAAgCIgCgBIAAABIgBAAgAFAhkIAAABIABACIAAAAIACAAIABgCIgCgBIgBAAgAGjA0IgBgCIAAgCIgEgFIgBgFIAAgWIAAgDIgDgGIAAgCIAAgCIADgDIABAAIACAAIADAAIADACIABgBIAIASIAEAEIADABIABACIAEABIADAAIACgBQAAAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAIgBABIAVgDIAIABIAEgCIAFgHIAGgCIAAgBIAAgEIABgBIABgCIABgDIgCgEIgFgFIgGgEIgIgCIgNgCIgMADIgBgDIgGgCIgDgDQgCADgCACIgGABIgGgBIgFgDIgEgEIgCgGIAAgDIgCgDIgBgCIgBgEIAAgIIABgFIACgCIABgCIACgCIABgEIACgCIACgBIABgBIABgBIAAgBIABgBIAGgDIAdgDIANACIAEACIADAAIAHgCIACABIADABIACgBIAAgBIADABIAEADIACADIAAADIAAASIACAIIgHAFIgCgBIgCgDIgEgBIgCgBIgBAAIAAgBIgBgBIABgEIgBgCIgCgCIgDgDIgCAAIgFgCIgDgBIgCAAIgCAAIgJAAIgHgBQgEgBgEAAQgEAAgBACIgFAIQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAIgBAAIAFAKIAEAEIAFADIABABIACACIACABIABAAIAHgCIAFAAIAGgBIABAAIABAAIAIABIAHgBIAEABIALAFIAGAHIADABIADADIADAIIACAEIgBADIgBADIgDALIgFAGIgJAIQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAIgCABIgDgBIgCABIgCACIgCABIgEAAIgFADIgFgCIgGAAIgHABIgEAAIgDgCIgEgBIgDAAQgEAAgCACIgHAJQgBAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAgAJIAnIgHAAIgDgBIgJgFQgHgDgFgEIgJgJQgEgGgCgGIgGgLIgCgJQAAgHADgFIgCgHIAEgQIAEgIIAFgFIACgBIAAgCIABgCIAZgLIAIgCIAIgBIAFAAIAOAGIAHACIAKAHIAFAEIABAFIAAABIAAABIABgBIABACIACADIAAABIAFAFIgBADIACAIIAAAJQAAABAAAAQAAABAAAAQAAAAAAABQgBAAAAAAIgFADIgCACIgBABIgCAAIgUgBIgdADIgJAAIgQAEIgEACIgBACQABAFAEAEQADAFAGAFQAGAFAGACQAHADAHgBIAHAAIAIACIALgJIAJgKIACAAIAIgCIACgBIAFABIABAFIAAAGIgDAEIgHAHIgWAMIgWAFgAJBg/IABABIgBAAIgFACIgHAEIgDADIgDACIgFACIgCACIgCAGQgBADgBADQAAAAABABQAAAAAAABQAAAAAAAAQABAAAAABIAFACIAKACIAJAAIARgDIATAAIAIgBIADgCIABgDIAAgDIgCgEIgBgMIgBABIgBABIgDAAIgCgCIgQgGIgHgCIgLAAIgBABg");
	this.shape_2.setTransform(65.1,11.3,1,1,0,0,0,-0.3,-0.7);

	this.text = new cjs.Text("Svækkelse", "24px 'Special Elite'");
	this.text.lineHeight = 26;
	this.text.lineWidth = 137;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.text}]},1).wait(12));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.1,0,151,23.3);


(lib._00Frontpage = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._0_0Frontpage();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


(lib.EmptyContainerGrey = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgtTAfkMAAAg/HMBamAAAMAAAA/Hg");
	this.shape.setTransform(290,202);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.EmptyContainer = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


(lib.BlockerButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#555555").s().p("Aj5D6IAAnzIHzAAIAAHzg");
	this.shape.setTransform(25,25);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


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


(lib.CheckBoxsmall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{inactive:0,active:9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,3.8,0.999);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Checked
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhtBjQg0g6gWgQQADgLAIgJIAHgFQAQABAnAdIAsAfQAyhXA/g/QBAg9BJggQhWBYhFCGQghBFghBKQgggogogsg");
	this.shape.setTransform(25.5,24.2);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:false},0).wait(11));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AjvjvIHfAAIAAHfInfAAg");
	this.shape_1.setTransform(24,24);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B9961D").s().p("AjvDvIAAneIHeAAIAAHeg");
	this.shape_2.setTransform(24,24);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,191.5,51.5);


(lib.CheckBoxshort = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"inactive":0,"active":9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,5.9,1.2);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Checked
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah5BuQg7hAgXgTQADgLAJgKIAIgHQAQACAtAgIAwAjQA4hhBGhGQBHhEBRgjQhfBhhNCVQglBNgkBSQgkgrgsgyg");
	this.shape.setTransform(30,30.9);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:false},0).wait(11));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AkhkhIJDAAIAAJDIpDAAg");
	this.shape_1.setTransform(29,29);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B9961D").s().p("AkhEhIAApCIJCAAIAAJCg");
	this.shape_2.setTransform(29,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,296.5,61.5);


(lib.CheckBox = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"inactive":0,"active":9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,8.398,1.2);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Checked
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah5BuQg7hAgXgTQADgLAJgKIAIgHQAQACAtAgIAwAjQA4hhBGhGQBHhEBRgjQhfBhhNCVQglBNgkBSQgkgrgsgyg");
	this.shape.setTransform(30,30.9);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:false},0).wait(11));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AkhkhIJDAAIAAJDIpDAAg");
	this.shape_1.setTransform(29,29);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B9961D").s().p("AkhEhIAApCIJCAAIAAJCg");
	this.shape_2.setTransform(29,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,421.4,61.5);


(lib._05Map = function() {
	this.initialize();

	// Checkboxes
	this.checkbox3 = new lib.CheckBoxsmall();
	this.checkbox3.setTransform(481.6,425);

	this.checkbox2 = new lib.CheckBoxsmall();
	this.checkbox2.setTransform(660.5,333.8);

	this.checkbox1 = new lib.CheckBoxsmall();
	this.checkbox1.setTransform(415.4,298.8);

	// Text
	this.text = new cjs.Text("Vælg hvor du starter", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 777;
	this.text.setTransform(210,38);

	// BG
	this.text_1 = new cjs.Text("svendborg", "37px 'BigNoodleTitling'", "#B9961D");
	this.text_1.lineHeight = 39;
	this.text_1.lineWidth = 134;
	this.text_1.setTransform(542.8,428.1);

	this.text_2 = new cjs.Text("sundby", "37px 'BigNoodleTitling'", "#B9961D");
	this.text_2.lineHeight = 39;
	this.text_2.lineWidth = 100;
	this.text_2.setTransform(722.9,336.6);

	this.text_3 = new cjs.Text("horsens", "37px 'BigNoodleTitling'", "#B9961D");
	this.text_3.lineHeight = 39;
	this.text_3.lineWidth = 100;
	this.text_3.setTransform(476,301.6);

	this.instance = new lib._0_5BG();

	this.addChild(this.instance,this.text_3,this.text_2,this.text_1,this.text,this.checkbox1,this.checkbox2,this.checkbox3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._03CardMain = function() {
	this.initialize();

	// Challenge
	this.kids = new lib.CharacterCardChildren();
	this.kids.setTransform(647.7,428.5,1,1,0,0,0,2.6,1.6);

	this.family = new lib.CharacterCardFamily();
	this.family.setTransform(711.1,377.3,1,1,0,0,0,3.1,2.9);

	this.challenge = new lib.CharacterCardChallenge();
	this.challenge.setTransform(710.9,329.5);

	// Name
	this.realname = new lib.CharacterCardName();
	this.realname.setTransform(553.6,148.6,1,1,0,0,0,2.5,0.7);

	this.nickname = new lib.CharacterCardNickame();
	this.nickname.setTransform(555.7,168,1,1,0,0,0,2.9,-4.4);

	// Portrait
	this.portrait = new lib.CharacterCardPortrait();
	this.portrait.setTransform(176.2,106.8);

	// BG Text 
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AogBbIgHgBIgDAAIgCABIgDAAIgBAAIgCgBIgCgBIgGgCIgDgCIgDgCIgDgEIgEgLIgGgcIABgTIgCgYIABgIIAAgBIgBgCIgCgEIgBgFQAAgEgBgCIgEgCIgKgDIgBgBIAAgCQgBAAAAgBQAAAAABAAQAAgBAAAAQAAAAABgBIAEgCIAIgCIAGABIAMgDIAEABIAKACIADADIgCAEIgLAMIgDAFQgBADAAADIABAIIAAAOIACAKIgBAFIABACIAAABIAAACIgBACIgBAEIABgBIABgBIABABIAAABIABABIAAABIACAKIAAAOQAAAAAAAAQABABAAAAQAAABABAAQAAAAABABIABABIADADIABACIACACIAGACIAFAEIADACIACACIABACIABgCIAAABIgBABIABgBIABgBIABgBIABgBIABAAIAAABIAAACIAAACIACgBIABgBIACgBIAAgCIgBgCIgFAAIACgDIACgBIAFgCIADgCIAGgJIABgCIAAgBIgBgIIABgJIgCgHIABgHIgCgLIAAgPIgCgQIAAgCIAAgFIACAAIgIgGIgBgDIAAAAIgBAAIgFAAIgDgCIgDAAIAAAAIgDgJIABgDIACgCIAEgBIAOgBIAHgCIADABIAHACIAEgBIAIABIADACIACACIABACIgBABIgHAFIgBAAIgBACIgBAAIgBABIgGABIgBACIgBAHIgCACQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAIACADIADADIABACIgBAFIAAAGIACAFIgBAFIADARIAAAGIgCAFIABACIACAFIABAIIgDALQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgBAAIAAABIACAFIgBACIgGAHIgBACIgBABIgBABIgHACIgHAFIgFAAgAnCBTIgIgFIgGgGQgDgDAAgDIgBgCIgBgDIgDgDIgBgDIgDgHIgBgIIAAgIIAFgYIAGgHIABgBIAAAAIABAAIACAAIABgBIABgBIABgCIAAgBIACAAIAEgBIAJgFIAEgBIAUAEIAHABQAAAAABgBQABAAAAAAQABAAAAAAQAAgBABAAIACgEIABgDIgCgUIgBABIgCAAIgBgBIgCgCIgCgBIgBABIgBACIgCAAIgHABIgDgBIgGgFIgBgDIABgDIABgCIADgCIADgBIACABIADAAIAIgCIAIABIALgBIADACIAAAAIADAIIAAACIgBAIIAGBXIACAIIAEAFQADACAEABIACAAIABgBIADABIACABIABADIAAACIAAADIgCAAIgEAAIgCABIAAABIgBACIgFAAIgJAAIgEAAIgFgCIgBgCQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAIgBAAIgCAAIAAgBIgDACIgCADIgCABIgCABIgHADIgFACIgMABgAm4AFQgFAAgEAEQgDADgDAFQgCAEgBAFQgCAFABAEIAAADIABAEIgBACIgDADIgBACIABAAIAFABIACADIAEALIADACIAIAFIAJACIAMgCIACAAIAFgHQADgEAEgCIAAgCIADgbIgBgIIgDgHIgFgFQgCgDgFABIgHgEIgCgBIgEACIgBABIgCAAIgDAAgAlhBTIgFgCIgBgFQAAgDACgBQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAABAAIALgDIAFAAIAFgCQABAAAAAAQABAAAAgBQABAAAAgBQAAAAABAAQABgDAAgEIAAgCIgCgDIABgBIABgCIAAgKIgCgMIgBgCIABgKIAAgBIgBgBIAAAAIAAgBIABgFIgBgCIgCgCIgBgBIgIAAIgKAAIgDgDQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAIABgCIADgDIAGgCIAJgBIADAAIABgCIABgEIAAgDIAAgBIgBgJIAAgGIADgFIAKgKIAFgFIAIgCIAMgBIAKAAIAMAEIAFADIACAEQADAAACACIACAEIACALIAAABIAAAAIgCgBIgCAAIAAAAIABABIABABIABABIAAABIgBABIgBACIgCABIgBACIgDACQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHgBIgGgEIgCgGIgDgLQAAAAAAgBQAAAAgBgBQAAAAgBgBQAAAAAAAAQgCgCgEAAIgHACQgEABgDACQgDACgCADQgCAEAAAEIABAGIACAEIAEACIAGgBIAGADIACADIABADQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABIgFABIgMACIgCACIAAABIADAcIAAAHIgCAEIACAFIgBAIIABADIACACIACAFIAPgDIAMADQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAIAAAFIgBADIgDACIgOAFIgDgBIgHgCIgDAAIgRACIgTAEgAjPBMIgFAAIgJgDIgDAAIgCgBIgTgKQgDgCgCgDIgEgDIgHgKIgBgGIAAgEIABgEIABgJIgBAAIgBgBIAAgBIgBAAIABgCIABgIIABgCIABgBIAAgCIAAgDIABgBIAAAAIABAAIABAAIADgGIALgKIAEgCIANgFIAQgCIAMABIALAGIAAAAIAAAFIAAABIAGgBIABACIADAAIACADIAIAKIABADIABAHIAAAEIgCADIABABIABABIABACIAAAAIABACIgBADIgBABIAAACIgBAAIACAFIgBABIgBAAIgBAAIABAHIAAADIgBACIgBAAIgBADIgBACIgGAFIgDABIgBAAIABACIAAACIgBABIgHAGIgDADIgEAAIgDAAIgDAAIgDAAIgDACgAjsAuIADAFIAOAIIAQAAQADAAACgCIAFgEIABgDIAFgEIADgCIABgBIACgEIABgBIgBgCIAAgEIABgDIACgCIACAAIACAAIACABIAAgCQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAAAgBAAIgFAAIgCgCIAAgBIgCgLIgGgNIgBAAIgDAAIgDgCIgEgBIgWAAQgFAAgEADQgFADgEACIgFAJQgCAFABAGIADAQIACADIAAAEIACAAIACAAIABABgAinAUIgBACIAAABIABACIABgBIAAgBIgBgDgAHaBIIgFgCIgEgDIgJgBIgCgCIgHgKQgBgDAAgDQgBgFACgFQACgFADgEIgFgQIgBgGIABgFIABgBIABgBIABgBIAGgHIABgEIgBgCIgEgEIgCgDIABgSIAAgBIAAAAIAAgCIACgBIABgCIAAgBIgBgEIAAAAIAEgGIAJgHIACABIABABIACgBIAGgEIAHgBIANACIAEACIAEAEIACgCIADgBIACgDIABgCIACABIACgBIACgCIAGgCIANACIABADIAEAIIAAAFIgBADIgDAEIgFADIgEABIgBAAIAAAAIABgEIgCgBIgDABIgBADIAAANIAAAEQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAIgCAEIgEAJIgFAFIgBABIAAABIgBAAIgFAAIgJADIgFAAIgQAAIgJADIgDAEQgBAAAAABQAAAAAAABQgBABAAAAQAAABABAAIAAADIACACIADACIACAAIADAAIADgBIACAAIACABIAAgBIACgBIABABIABABIABgBIACgBIAIACIABAAIACgBIABgCIACAAIACAAIACAAIAFgCIACAAIACACIAKAAIADABIADACIAFABIACABIABABIAKAGIAEAMIgCAGIgFAIIgFAFIgFACIgPAFIgJADIgQADIgMAAgAHeA6QADADAEAAIAIAAIAFgCIAFgCIAFgBIAEgBIADgCIADAAIAGAAIADgBIADgCIABgEIAAgDQAAAAABgBQAAAAAAAAQABAAAAAAQAAgBAAAAIABgDQgBgBAAAAQAAgBAAgBQAAAAgBgBQAAAAAAAAIgEgDIgJgCIgBAAIgKgBIgLgBIgBAAIgCgBIgBAAIgBABIgCABIgBAAIgCABIgCgBIgEABIgEABIgJADIgCABIgDAEIgDADIAAADIAAAFIADAFIAEACQADACADgBIACAAgAHbgyIgBABIgCABIgBAAIgBABIgBADIgEAOIABACIAIAOIACABIADACIADABIAGgBIACAAIACAAIAHgCIAFgGIAEgGQACgFgBgDIAAgFIgDgEIgDgFQgBAAAAgBQgBAAgBAAQAAgBgBAAQAAAAgBAAIgLgDIgBAAIgBAAIgBABIgCAAIgEgBgAIAg5IgBABIACABIABACIABAAIABAAIACAAIAAgBQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAAAAAgBIgEAAgAiPBDIgCgBIgBgCIAAgCIAFgFIACgBIADAAIADAAIAFgBIAFgDIADgEQACgCgBgDIAAgDIAAgMIgDgeIgDgKQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAAAAAAAIgNABIgEAAIgEgCQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAAAIABgFIABgCIAGgCIADABIAQgDIAJACIADACIADAFIAEACIADgDIABgBIACgBIAEgBIAEgDIADgCIALgDIADgBIADgCIAGABIAHACIAGAEQADACAAADIAFAKIABAEIAAADIgCADIgDAEIgCgBIgLABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAIgDgCIgCgEIgBgFIABgGIgBAAIgCABIgCABIgBgBIgCgBIgEACIgEACIgDAEQAAAAgBABQAAAAAAAAQgBABAAAAQAAABAAAAIgDABIgDACIgCADIgCABIgDAIIgCAEIgBAGIADANIAAAKQAAABAAAAQAAABAAAAQAAABAAAAQABABAAAAIADADIAIABIAJgBIABABIAAACIgBADIABAAIACAAIACgCIABABIABABIgBAAIAAABIgBABIAAACIAAACIgBAAIgCABIgCAAIgCgBIgCgCIgCAAIgBAAIgCACIAAAAIgBABIABABIAAABIAAABIgCABIgBAAIgBAAIgPgBIgIACIgBAAIgBgBIgBgBIgBAAIgEAAIgLADgAgEA3IgIgEIgGgGQgDgDAAgDIgBgDIgBgCIgDgDIgBgCIgDgIIgBgJIAAgHIAFgWIAGgHIABgBIAAgBIABgBIACAAIABgBIABgBIABgCIAAgBIACgBIACAAIACAAIAIgFIAEgBIAGABIAUAEQABgBAAAAQABAAABAAQAAAAAAgBQABAAAAAAIADgEIABgDIgDgUIgBABIgBgBIgDgCIgCgBIgBABIgBABIgDABIgGAAIgDAAIgDgDIgDgDIgCgCIABgDIACgDIAFgDIADABIACABIAIgCIAJABIAKgBIAEABIAAABIABAFIABADIABACIgBAHIAGBYIABAIIAFAFQADACAEAAIACAAIABgBIADACIABABIABACIABACIAAADIgDABIgCAAIgCAAIgBAAIAAACIgCABIgFABIgJgBIgDABIgFgDIgBgCQAAAAgBAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIgBAAIgBAAIgBgBIgDABIgCAEIgCABIgBAAIgIAEIgEACIgNAAgAgCgQIgHAHQgCAEgBAFQgCAEABAEIAAADIABAEIgBACIgDADIgBACIABAAIAFABIACACIAEAMIAEACIAGAFIAIACIAMgDIADABIAEgIQADgDAFgCIgBgCIADgbIgBgGIgCgHQgCgDgDgCQgDgDgEAAIgIgEIgCAAIgDABIgCABIgBABIgHAAQgEABgCADgABbA1IgDgBIAAgDIAAgCIAEgEIACgBIADgBIADABIAGgCIAEgCIAEgEQABgDAAgCIgBgDIAAgNIgDgdIgDgKQAAgBgBAAQAAgBAAAAQgBAAAAAAQAAAAgBAAIgMABIgFAAIgDgDQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAIAAgEIACgDIAGgCIADABIADAAIANgCIAIABIADACIAEAGIADABIACAAIADgDIACgCIAEgBIADgDIAHgCIAHgCIAEgCIACgCIAHABIAGADIAHAEQACACAAADIAGAKIAAADIAAADIgCAEIgCAFIgCgBIgLACQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBIgDgDIgCgFIAAgEIAAgHIgBAAIgCABIgBABIgEgBIgDABIgEADIgDADQgBABAAAAQgBABAAAAQAAAAAAABQAAAAAAAAIgEACIgDACIgCADIgCADIgCAHIgDAEIgBAEIADAOIAAAKQAAAAAAABQAAAAAAABQABAAAAABQAAAAABAAIACAEIAIABIAJgBIABABIABACIgBACIAAABIADgBIABgCIACABIAAABIAAABIgBABIgBABIAAACIABABIgDABIgFgBIgCgBIgBAAIgBABIgCAAIgBAAIAAABIAAABIABABIgBABIgBACIgBAAIgCAAIgPgBIgHACIgCAAIgBgBIAAgBIgCgBIgEABIgDACIgHABgADXA0IgIgHIgDgFQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAIAIgDIAMAAIAIgBIAIAAIAEgCIAEgCIABgKIgDgaIAAgBIABAAIAAgBIgCgIIABgFIAAgFIgBgEIgDgDIgCgBIgEgBIgEABIgIACIgFABIgSgBIgCgBIgBgDQgBgEABgCIADgCIAEgCIAmgCIAGAAIAFADIAEAFIACAHIgBAGIgDADIABACIACABIABABIAAACIABACQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIADAkIACAEQAAAAAAABQABAAAAAAQABAAAAAAQABABABAAIARgEQADAAACACIAFACIAEACIAEABIABAAIABACIAAACIAAABIAAADIgCACIgCADIgDAAIgBAAIgBgBIgDgBIgIgBIgEgDIgCgCIgCAAQgFAAgEACIgPAHIgIABIgEAAIgFgBIgBABIgDAAIgBAAIgBAAIgBABIABABIgHADIgIACIgCAAIgDAAgAFDAnIgCgCIgCgCIAAgDIAAgDIACgBIADgCIADgBIAEAAIADgCIACgEIgBgKIgBgFIAAgCIAAgBIABgBIABgCIgCgGIAAgGIgBgEIABgCIgDgNQAAgBAAAAQAAgBgBgBQAAAAAAgBQgBAAAAgBIgNgEIgDgCQgBgCAAgEIABgEIADgCIAJgBIALAAIADABIACADIACACIABACIAAABIABAEIADAEIABgCIAAAAIACgCIAEgFIACgBIABgBIABgCIABgBIABgBIABAAIACgBIACgCIAEgCIAHgCIAHAAIAHABIAGACIAGAFIACAEIADACIABADIAAAEIABADIABACIACADIAAARIgBAKIABADIAAAFIABADIABADIgBABIAAABIgBABIgBACIACADIACACIACACIAEABIABgBIACgBIADABIACADIACADIABADIgDADIgCABIgCAAIgDgBIgDABIgKADIgBgBIgBAAIgHACIgKgBQgFAAgDgEQgDgBAAgFQADgCAEgBIAOgCIgEgaIABgVIAAgDIgCgDIgCgJIgDgBIgDgCIgKAAIgJACIgDACIgBABIgBADIgCABIgBACIgCAAIgCAAIAAACIgBACIgBACIgBABIAAgBIgBAAIgBABIAAACIgBABIgBAAIAAABIAAACIAAACIgDAEIAAABIACAIIAAACIgBACIgBABIgBABIAEAGIABADIgBAHIABADIACABIAIAEIADACIAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABABAAIAAACIAAAFQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBABIgGABIgSACgAGZALIgBABIAAACIgBABIABACIABAAIABgBIABgCIABgBIAAgBIgBgBIgBgBIgBABgAFSgFIADACIADABIABACIABgDIgBgDIgBgCIgCgBIgEACIAAAAgAGVgGIAAABIAAACIACABIABgBIABgCIAAAAIgBgBIgBgBIgCABgAJBAVIgGgDIgEgEQgCgCAAgDIABgBIABgBIgCgCIgBgBIgBAAIgBgCIgBgHIABgCIABgCIACAAIABAAIgCgDIgBgCIAAgBIABAAIABAAIABABIAAgBIABgBIAAgBIgBAAIABgBIACgBIABgBIAAgBIABgBIABgBIACAAIAKgCIACABIAEABIAKAAIAEACQAAABABAAQAAABAAAAQAAABAAAAQABAAAAABIgBABIgCgBIgCAAIgCABIgCACIgBABQAAABAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAIACgBIACAAIABABIACABIACABIADgBIACAJQAAACgCACIgDADIgEACIgCACIABABIACAAIAEAAIABABIgBABIAAAAIgCABIgBAAIgBABIAAACIgBADIgDAAIgBABIAAABQgCgBgDAAIgLACIgFgBgAI/ALIAAgBIgBgBIgBgBIgCgBIgCgBQABAFAFAAgAJSABIAAAAIgBABIgBABIAAAAIAAABIADgBIABgBIgCgBIAAAAIAAAAgAJDADIADgBIACAAQAEgBAAgBIgGAAIgDAAgAJBgpIgEgCIgFgBIgHgPIABAAIABgBIgBgBIgCAAIABgCIACgDIABgCIAAgDIAEgDIAEgEIAFgBQABgBAAAAQABAAAAABQABAAAAAAQABAAABABQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABABQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAIACAEQAHgBAAAIIgDACIABACQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABIABAAIACAAIABABIAAAAIAAAGIgDAFIgEAEQgDAAgDAAIAAABIgBABIAAABIgFABgAJKhBIgBACIgBABIAAADIADgCIABgEIgBAAIgBAAIAAAAgADvg9IgGgCIgGgDQgCgCAAgCIABgKIADgFIACgCIACgBIAAAAIACgCIADAAIAGABIAFACIAFADQAAABAAABQABAAAAABQAAAAAAABQABAAAAABIAAAGIgDAFIgEAFIgFACg");
	this.shape.setTransform(637.1,352.6,1,1,0,0,0,0.2,0.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AnQBlIgIgHIgCgDIgBgCQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABgBIADgBIAEgCIANABIAIgCIAHAAIAFgBIAEgCIABgKIgEgdIABAAIAAAAIABgBIgCgIIABgFIAAgFIgBgDIgDgEIgCgCIgEAAIgEAAIgIADIgFABIgSgBIgCgCIgCgCIABgFIADgDIAEgBIAlgCIAGAAQAEABACACQACABABADQACADAAAEIAAAFIgDAEIABACIACABIABABIAAACIAAACIACABIADAmIACAEQAAABAAAAQABAAAAAAQABAAABAAQAAAAABAAIARgDIAFABIAJAFIAEABIABABIABABIAAACIAAABIAAADIgCADIgCACIgDABIgBAAIgBgBQgBgBAAAAQAAAAAAAAQgBgBAAAAQgBAAAAAAIgIgBIgEgDIgCgCIgCAAIgJABIgPAIIgIABIgEAAIgFgBIgBABIgDAAIgBAAIgBABIgBAAIABABIgHAEIgIACIgFgBgAoiBkIgFgCQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgCgDIgBgCIgBAAIgEgCIgIgGIgHgIIgBgDIgBgCIgCgFIgCgBIgCAAIgBgCIgEgUIgBgLIACggIADgJIADgFIAEgKQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAIAFgDIAUgIIAFAAQAFgBAEABIANAEIAEAAIADAAIACgCIACgEIACAAIAGABIACABIABABIABADIACACIAAABIACAJIgBAKIACANIgBAJIAAACIgBACIAAABIgCAAIgBAAIgBABIgBAAIgBAAIAAgBIgBgBIgBgBIgCAAIgDAAIgBgCIABgBIABAAIABABIACAAIgHgKIgFgEIgEgGIgCgDIgKgFQgGgCgGAAQgEAAgDACIgMAGIgDAFIAAAEIgBADIgBAAIgBABIgBAFIAAAOIgBAIIADAXIACAJIAHAPIAGAGIADAAIAGgBIADAAIAIgBQADAAACgDIADgCIAHgDIACgCIACgDIADgKIACgCIABgDIgBgQIABgDIACAAIACAAIACABIACgBIACgBQAAAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAIAFAGIABABQAAAAAAAAQAAAAAAABQABAAAAAAQAAAAAAABIAAAGIAAAEIgCAIQAAABAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAAAABIgBADIgCAIIAAACIAAABIgBABIgDADIgDADIgBADIgBABIgYANIgFABgAk8BaIgBgCIgBgCIgBgBIgBgDIgBAAIgBAAIgBgBIgBAAIgBgGIAAgDIgFgLIgBgGIgBgDIgGgJIgGgSQgEgJgFgIIgDABIgIAAIgEAAIgDgCIgBgCIgBgEIABgCIACgDIAJgCIAHABIAVgCIAFABIAEACQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAIAAACQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABIgCABIgDABIgCAAIgCABIAAALIACABIABAAIAAABIABAEIAFAKIgBAAIgBABIABAAIABABIABAAIABAAIAAACIABAGIAHASIACAAIADgBIAEgGQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAIABgBIgCgFIABgDIABgBIABgCIAAgEIAAgCIABgCIABgBIABgCIACgGIABgNIgBgFQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAgBIgIgCIgDgBIAAgBIABAAIABgBIAAgBIAAgBIgBgBQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAIADgBIAEgBIADAAIADAAIAFACIACAAIABgBIACgCIABgBIABgBIADAAIAEgBIALABIAFACIAFAEQAAADgCACIgEACIgMADQgDAAgCACQAAAAAAAAQgBABAAAAQAAABAAABQgBAAAAABIgCAJIgFAIIABAEIAAADIgCADIAAACIAAADIAAADIgCAFIgDAFIgEARIgDAIIgEAHIgMADgAkXgJIABACIACABIABgBIAAgBIgCgBIgCgBIAAABgAjmBXIgIgHIgCgDIgBgCQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBABAAIADgCIAHgBIAJAAIAIgBIAEAAIAIgBIAEgDIABgJIgDgdIAAAAIABgBIAAAAIgCgJIABgEIAAgFIAAgEIgDgDIgDAAIgDgBIgEABIgJABIgEABIgSgCIgCAAIgCgBIABgFIADgDIAEgCIAlgCIAGABQADAAACACQADACABADQACACAAADIgBAFIgDAEIACACIABABIABAAIABACIAAACIABABIADAnIACAEQAAAAABAAQAAABABAAQAAAAABAAQABAAABAAIARgDIAFABIAEACIAEADIAEABIACAAIAAACIABABIAAACIAAADIgFAFIgDAAIgBAAIgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIgIgBIgDgDIgCgCIgDgBIgIACIgPAHIgIACIgFAAIgEgBIgBABIgDAAIgBAAIgBAAIgCABIABABIgHADIgHACIgCAAIgDAAgAiDBNIgDgCIACgKIAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIAAAAIABAAIABgBIAAgBIAAgBIAYAAIAJgDQAEgBADgCQACgDAAgFIgGg1IABgGIADgGIgBgBIAAAAIgCgBIgBAAIAAgBIgBgEIgBgCIABgMIgBgDIgCgDIgBgCIABgBIgBAAIgCAAIgBABIgBABIgBABIgBAAIgEABIgZgBQgDAAgCgCIAAgBQAAgGADgDQADgCAFgBIAHABIAKAAIAJgDIAEAAQAEgBADACIAFACIABABIAAABIACADIABAEIAAABIACAJIgBAJIACALIgBAJIAEAMIAAAEIgBACIACAIIAAACIgBAFIgBABIAEAWIABADIAAACIAAAHIAAACQAAABABAAQAAAAAAAAQAAABABAAQAAAAAAAAIACgBIACgBIACgCIAEAAIAKABIAHgCIAEgBIADgBQAEAAADACQADACAAAFQAAADgBACIgGAEIgNACIgFAAIgGgCIgDgBIgGACIgCgBIgBAAIgBgBIgBgBIgBABIgBABIgCACIgCAAIgIAAIgIACIgBgBIgBAAIgJACIgCAAIgIACgAhXgdIABAEIABAAIABgBIAAgBIAAgCIgCgBIAAAAIgBABgAheg3IgBABIABABIAAABIACgBIABgBIgBgBIgBAAIgBAAgAgMBHIgBgDIgBgCIgCgDIgBgDIABgTIgCgGIgBgBIgBgCIABgBIACgEIACgBIABABIADACIADAAIAEAKIAEAIIACABIABABIACABIACAAIACAAIACAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABIAAAAIACAAIAPgCIADAAIAEABIAIgIIADgBIABgCIgBgDIABgBIACgCIAAgCQAAgBAAAAQAAgBAAgBQgBAAAAgBQAAAAgBgBIgDgEIgGgDIgGgCIgLgCIgFABIgEACQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAAAIgGgCIgCgCQgCADgCABIgDABIgFgBIgEgCIgCgEIgCgEIgBgDIgCgCIgBgBIAAgDIAAgHIABgDIABgCIADgDIABgDIABgCIACgBIABgBIABgBIAAgBIABgBIAEgCIAYgCIAFAAIAKADIAEgBIACgBIACABIACABIABgBIABgBIADABIAEAFIABADIgBAOIACAHIgDABIgDABIgCAAIgCgBIgCgCIgCAAIgBgBIAAAAIABgEIgBgBIgFgFIgBgBIgCAAIgEgCIgCAAIgFABIgEAAIgHgBIgHgBQgBAAAAAAQgBAAAAABQgBAAAAAAQAAABgBAAIAAADIgBADQgBAAAAAAQAAABAAAAQgBAAAAAAQgBAAAAAAIgBABIACAFIADAFIAFACIABABIABABIACABIAAAAIAGgCIAFABIACAAIADgBIABAAIABAAIAGABIAGgBIAEABIAEABIAOANIABACIADAJIgBACIgBAFIgBADIgBAFIgLALIgDACIgCAAIgCAAIgCAAIgDADIgCAAIgFACIgJgBIgDAAIgHAAIgFgCIgDAAQgDAAgBACIgGAHIgDACgAB2A+IgBgCIgCgCIgDAAIgCgCIgBgHIgBgCIgEgBIgCgCIgBgDIgBgGIgDgFIgBgCIAAgNIAAgHIABgCIABgBIAAgCIgBgDIACgDIAAgKIgBgBQgCgCgDgBIgKAAIgFgCIgDgDQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAIgCgBIgBgCQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBIALgFQAAgBAAAAQABAAAAAAQAAgBABAAQAAAAABAAIADAAIAEgBIADgCIABgEIgBgQIAAgGIADgGIACgCIABgBIACgBIABgBIACAAIAAAAIADAEIADARIAAAEIgBAEIADAEIABACIABADIANABIAPAAIAHABIABABIAFABQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABQAAABAAAAQAAAAAAABQAAAAgBABIgDACIgEABIgPABIgIABIgGADQgDACgCAEIgBAIIAEAaIAGARQABADADADQACABAEAAIAJgCIAEgDQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBIgDgHIABgCIADgEIAHgFQACgCADAAIAEABIADABIAAAKIgEARQAAAFgDADQgCADgEACQgDADgFABIgbAEgADKA0QgBAAAAgBQAAAAgBAAQAAgBAAAAQAAAAAAgBIAAAAIgCABIgCAAIgDgBIgFgFIgEgFIgCgFIABgCIABgBIgCgGIACgIIAEgHIADgEIADgCIAEgCIADgCQABAAAAAAQAAAAABAAQAAABABAAQAAAAABAAIANgBIAEAAIADAAIADgCIAEgCIAOgEIADgDQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQAAgDgCgDIgFgGIgHgEQgDgCgDAAIgBABIgBAAIgKACIgEADQgBAAAAAAQAAABAAAAQgBABAAABQAAAAAAABIABAIIgBAFIgDADIgFACIgFABIgFgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBIgDgEIgBgFIABgFIAEgJIABgFIACAAIAUgJIAIgBIASACIAIADIAHAFIAEAGIACAGIADAOIAAAOIAFAeIABADIABABQAAAAABAAQAAAAABgBQAAAAAAAAQABAAAAgBIAEgGQABgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAIADABIABABIABABIAAADIgBADIAAADIgBABIgBABIgIAFQgDACgDAAQgDABgDgCIgLgGIgCABIgEADIgGABIgIAEIgJACIgRABgAD6AAIgGADIgGADIgMACIgEABIgOAEIgCABIgBABIAAABIgFAFIgDAEIgBAEQAAABAAAAQAAABABABQAAAAAAABQAAAAABABIAEADIAFACIAGACIAKAAIAMgCIAGgCIAEgEIACgEIACgBIADgFIABgFIABgKIgBgCIgBgGIgCAAgAE4AyIgKgCIgDgCIgBgCIgBgDIABgDIABgCIADgCIAHgBIADgBIACgEIgBgPIgBgCIAAgBIACgFIgCgFIAAgJIgBgCIAAgDIgBgKIgDgFIgMgEIgEgCIgBgGQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAAAgBIAEgCIAJgBIAKABIADABIACACIACABIABADIAAACIABADIADAEIABgCIAAgBIACgCIAFgDIACgDIABgBIAAgBIABgBIABgBIABAAIACgBIACgCIAFgCIAGgCIAIAAIAGAAIAHADQACABADAEIADAEIACACIABACIAAAFIACAFIACACIAAARIgBAIIABACIABACIgBAHIACAGIAAABIgBABIgBABIAAABIABADIACADIADACIADAAIACAAIACgBIACABIADACIABADIABADIgBACIgBACIgDABIgCAAIgDAAIgDAAIgJADIgBgBIgBAAIgEABIgDABIgLgBQgFAAgDgDQgCgDAAgFQACgCAEAAIAOgCIgEgdIACgSIgBgDIgCgDIgBgGIgBgDIgCgCIgEgCIgJAAIgKADIgDACIgBABIgBACIgBACIgCABIgCAAIgBABIgBACIgBACIAAABIgBABIgBAAIgBgBIgBABIAAADIgBABIgBAAIAAABIAAACIAAACIgDADIAAACIACAGIAAACIgBACIgBABIgBACIAEAHIAAADIAAAGIABAEIACABIAIADIADACIABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAAAAAABIABACIgBAFQAAABAAAAQAAAAAAAAQgBABAAAAQgBAAAAAAIgGACIgTACgAGEAUIgBABIgBACIgBABIABABIACABIAAgBIABgCIABgBIAAgCIAAgBIgCAAIAAABgAE8ACIABABIAFACIABABIABgDIgBgDIgBAAIgCAAIgCAAIgCAAIAAAAgAGAAAIgBACIABACIABABIACgBIAAgCIAAAAIAAgCIgCAAIgBAAgAG+AjIgHgFIgGgGQgDgCAAgDIgBgDIgEgFIgBgDQgDgEAAgEIgBgGIAAgHIADgVIACgEIAGgGIABgBIAAgBIABgBIACgBIABAAIABgBIAAgCIABgBIABAAIAEgBIALgFIAEAAIAGAAIANADIAHAAQAAAAABAAQABAAAAAAQABAAAAgBQABAAAAAAIADgDIAAgFIgCgTIgBABIgBgBIgCgBIgBgBIgCgBIgBABIgBABIgDABIgGAAIgHgCIgCgDIgCgDIABgDIACgCIADgDIACgBIADABIACAAIAIgCIAJABIAKAAIAEABIAAABIACAHIAAAGIgBAEIAGBXIACAIIAFAGQACACAEAAIACAAIACgBIACABIACABIABADIABACIgBADIgCABIgCAAIgCAAIgBAAIAAACIgCABIgFABIgJAAIgDAAIgGgDIAAgCQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIgBAAIgBAAIgBgBIgDABIgCADIgCABIgBACIgIAEIgEABIgNAAgAHJgoQgFAAgEADQgDADgDAFIgEAJIgBAJIABAHIAAACIgDACIgBACIABAAIAEAAIADADIAEALIADADIAJAEIAIACIAMgCIADAAIAEgHQADgEAFgBIgBgCIADgZIgBgIIgDgHQgBgEgDgCQgDgDgFABIgHgEIgCAAIgDABIgCABIgBABIgEgBgAIvAeIgKgIIgBgFIAAgBIABgBIgCgCIgBAAIgBgBIAAgCIgBgJIAAgBIABgBIACAAIABAAIgCgDIAAgCIAAgBIAAAAIABAAIABABIABgBIAAgBIAAgBIgBAAIABgBIACAAIABgBIABgBIAAgBIABgBIACgBIAKgCIADABIAEABIAJABIAEACQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAIgBABIgCgBIgCAAIgCABIgDAEQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIACgBIABABIACABIAEABIADAAIACAHQAAADgCACIgDADIgEACIgCACIABABIABAAIAEABIABABIAAABIAAAAIgCABIgBAAIgBABIAAACIgCACIgBAAIgBABIAAACIgGgCIgKADIgCAAIgEgBgAItAUIAAgBIAAgCIgCgBIgCgBIgBAAQAAAFAFAAgAJBAKIgBAAIgBABIgBAAIAAABIAAAAIADAAIABgCIgBAAIAAgBIgBAAgAIxALIAEgBIACAAQADAAABgEIgGACIgEgBgAm4gMIgHgCIgFgCQgCgCAAgDIABgKIACgCIADgFIACgBIgBAAIAGgCIALADIAFAEIACAEIgBAGIgCAGIgEAEQgCACgDAAgAjPgaIgGgCIgFgDQgCgBgBgDIABgKIACgCIADgFIACgCIAAABIADgCIADAAIAFABIAGACIAEAEIACAEIAAAGIgDAGIgDAEQgDACgDAAgAI0gfIgOgFIgHgOIABgBIABAAIgBgBIgBAAIABgDIABgCIABgFIAFgDIAEgEIAFgCQAAAAABAAQAAAAABAAQAAABABAAQABAAAAABQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAgBAAAAQABAAAAAAQAAgBABAAQAAAAABAAIACAEQAHgBAAAIIgBABIgCABIABACQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIABABIACAAIABAAIAAAAIgBAGIgCAFQgCADgCABQgDABgDgBIAAABIAAABIAAACIgFABIgBAAgAI4g4IAAABIgBACIgBABIABACIACgCIABgEIgBAAIAAgBIgBABg");
	this.shape_1.setTransform(640.2,394.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ah4BKIgDgCIgCgEIgBgDIABgDIAFgKIAAgBIgCgBIgCgCIgHgHIgHgKIgBgFIAAgEIABgDIAAgKIAAAAIgBgBIgBgBIgBAAIABgDIACgGIABgCIABgBIAAgBIAAgDIAAgCIABAAIABAAIABgCIADgGIALgKIADgCIANgEIAQgDIAFABIADABIADAAIADgBQABAAAAgBQAAAAAAAAQABgBAAAAQAAAAAAgBIACgBIABgBIACgBIADgBQAEAAADACQADABAAADIAAADIgCACIgGADIABADIAAACIADAAIABABIADABIACADIAIANIABACIABAFIAAADIgDAFIgBACIABABIAAABIABAAIABgBIgCgDIAAAAIABgBIABABIABABIABACIABAAIAAABIgBAEIgBACIAAABIAAABIABAEIgBABIgBAAIgBAAIABAHIAAAEIgBABIgBAAIgBACIgBACIgCAEIgHADIgBAAIABABIAAADIgBABIgIAGIgCADIgEABIgDgBIgDAAIgHADIgCAAQgCAAgDgBIgIgCIgGgBIgCgCIAAgBIgBACIABABIgBADIgFAJQAAAAgBABQAAAAgBAAQAAAAgBAAQgBAAAAAAgAhEgIIgEAIIgDABIgGAMIAAAAIAAABIAAADIgCACIgBABIAAACIgGAIIgCAFIgDADIAAABIgBAEIgCADIABABIABAAIAQAAQADAAACgCIAEgFIACgDIAHgGIACgBIACgDIABgBIgBgCIAAgEIABgDIACgDIACAAIACAAIACACIAAgCQAAAAAAgBQAAAAAAAAQAAAAgBgBQAAAAAAAAIgDgBIgDAAIgCAAIAAgGIgFgNIgCgEIgCgBQgBAAAAAAQAAABAAAAQAAABAAABQAAAAAAACgAhtgPQgFADgDAEQgDAEgCAEQgCAFAAAFIADAQIADADIAAADIABAAIADAAIAAACIADADIAEADIAAgDIAAAAIAAAAIABgCIAAgDIADgEIAAgBIAAgBIACgDIAEgJIAAgDQADgDABgDIAJgTIACgDIABgBIgDAAIgPAAQgGAAgEADgAj3BFIgDgBIgDgCIgCgBIAAgBIAAgBIADgFIAGgEIAEgEIACgFQABgDgBgGIgFhNIgBgGQgBgCgCgCQgCgCgDAAIgEgBIgIgFIgBgDIAAgDIACgDIADgBIADAAIANAAIAggEIANgBIACACIAOADIADAAIACACIACAFIABABIAEABIACABIACAEIAFALIABAEIgBAIIgBAHIgGALIgBAFIACAGIADAEIAHAIIACAHIABAMIAAABIgCABIgEABIgCABIABACIADAAIABACIgBADIgBADIgCACIgBADIgBACIgIAGIAAAAIgBAAIgBAAIgBABIABAAIgLAHIgIACIgvADIgBAAIgBABgAjUA1IACABIAAAAIABgCIACAAIAKgBIAIgDIAGgCIAFgFIAEgFIACgIIgBgFIgCgEIAAgEIgBgDIgBgBIgEgCIgBgDIgBgBIgBAAIgBAAIgBgCIgEgCIgLgBIgCABIgBAAIgBAAIgCAAIgDgBIgRAEIgBAFIgBAOIAAADIAAABIABABIAAAAIgBAQIACAEIACAFIAHABIADgBIACgBgAjag4IAAAAIAAABIgCABIgHABIgDACIgBAEIAAAZIgCAGIALACIASgBIAIgBIAIgEIADgDQABAAAAgBQABAAAAgBQAAAAAAAAQAAgBAAAAIADgGIABgCIgDgMIgBgCIgDgDIgIgEIgEgCIgFgBgAgUA4IgCgBIgBgDIAAgCIAFgFIACgBIAGAAIAFgBIAFgDIABgEQACgDgBgDIAAgCIgCgqIgCgKQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBAAAAAAIgNACIgEgBIgEgCIgCgEIABgDIACgEIACgBIADAAIAHAAIAMgCIAHABIADACIAEAGIADABIACgBIACgCIACgBIAEgBIAEgEIADgBIALgCIADgCIADgDIAGABIAGADIAHAEQACACABADIAFAKIAAADIAAAEIgCADIgCAFIgCAAIgLABQgBAAAAAAQgBAAgBAAQAAgBAAAAQgBAAAAgBIgDgDIgCgFIgBgFIABgGIgBAAIgCABIgCABIgBAAIgCgBIgEABIgHAGQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAABIgDABIgDACIgEAHIgDAGIgCADIgBAGIADANIAAAJIABAFIADADIAIAAIAJAAIABABIAAABIgBAEIABABIACgBIACgDIABABIABABIgBABIAAABIgBABIAAABIAAACIgBABIgCABIgCgBIgCgBIgCgBIgCAAIAAAAIgCABIgBAAIgBABIABACIAAABIAAABIgCABIgBABIgBAAIgPgBIgIACIgBAAIgBgBIAAgBIAAgBIgEABIgEABIgHABgABhAxIgDgDIgCgFIABgDIACgBIADgCIADgBIADAAIADgCIACgEIAAgKIgBgFIgBgCIABgBIABgFIgCgFIABgFIgBgEIAAgCIgCgNQAAgBgBAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgFgCIgIgCIgDgDQgCgCAAgEQAAAAAAgBQAAAAABgBQAAAAAAgBQAAgBABAAIADgCIAJgBIAOABIACADIABACIABACIABACIABAEIACADIABgBIABgBIABgCIAFgFIACgCIABAAIABgCIABgBIABgBIABAAIACgBIACgCIAEgCIAOgCIAHABIAHACIAFAFIAFAGIABADIAAAEIABADIABADIACACIAAARIgBAIIAAABIACACIgBAIIABACIABADIgBABIAAACIgBAAIAAACIABADIACACIADACIADABIACgBIABgBIADABIACADIACADIABACIgBADIgCABIgCACIgIAAIgKACIgBAAIgBAAIgGABIgLAAQgFgBgDgDQgDgCAAgFQADgCAEgBIAOgCIgEgcIACgTIgBgDIgCgDIgCgIIgDgCIgDgCIgKAAIgFABIgEACIgDABIgBABIgBADIgCABIgBACIgCAAIgCAAIAAACIgBACIgBACIgBABIAAAAIgBgBIgBABIAAACIgBABIgBAAIAAABIAAACIgBACIgCADIAAADIACAFIgBACIgBADIgBABIAAACIADAGIABADIAAAHIABADIABABIAJAEIADACIAAAAIADABIAAACIAAAGQAAAAAAAAQgBABAAAAQAAAAgBAAQAAABgBAAIgGACIgSABgAC3AUIAAABIgBACIgBABIABACIABAAIABgBIABgCIABgBIAAgBIgBgBIgBgBIgBABgABwACIABACIAEABIACACIABgDIgCgDIgBgBIgBAAIgEAAIgBAAgACzABIAAABIAAACIACABIABgBIABgCIAAAAIgBgBIgBgBIgCABgADqAlIgFgCIgEgFIgCgFIAAgCIABgBIgBgBIgBgBIgBAAIgBgBIgBgKIAAgCIACgCIACgBIAAAAIgCgCIAAgCIAAAAIAAAAIABAAIABAAIABAAIAAAAIAAgBIAAgBIABAAIABgBIACAAIAAgCIAAgBIABAAIACgBIAKgCIADACIAOABIAEABQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAIAAABIgEgBIgCABIgCAAIgBABQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIABgBIABAAIABAAIACACIABABIADAAIACgBIACAJQAAAEgBACIgEADIgEACQAAAAgBABQAAAAAAAAQAAAAAAAAQAAABAAAAIABABIABAAIAEABIABABIAAAAIgBAAIgBACIgBAAIgBABIgBABIgBADIgBAAIgCABIAAABIAAAAIgFgBIgLACIgCABIgEgCgADpAcIAAgBIgBgCIgEgCIgBgBQABAGAFAAgAD8ASIAAAAIgBABIgBAAIgBABIABAAIACAAIACgBIgCgBIAAgBIgBAAgADtAUIADgCIACAAQAEAAAAgEIgGACIgEgBgADvgYIgEAAIgEgDIgFgBIgIgPIACAAIABgBIgCgBIgBAAIABgDIABgCIABgCIAAgDIAJgGIAFgCQACgBADADQAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAABQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAIACADQAIgBAAAIIgCABIgCABIACACQAAABAAAAQAAABAAAAQAAAAgBAAQAAAAAAABIABABIABAAIABAAIABAAIgBAGIgDAFQgBACgDABQgCACgDgBIgBABIAAABIAAACIgFABIgBgBgADzgxIgBAFIAAACIADgDQAAAAAAgBQAAAAAAAAQAAgBAAgBQAAAAAAgBIgBAAIAAAAIgBAAg");
	this.shape_2.setTransform(609.3,442.5,1,1,0,0,0,0.1,-1);

	// BG
	this.instance = new lib._0_3BG();

	this.addChild(this.instance,this.shape_2,this.shape_1,this.shape,this.portrait,this.nickname,this.realname,this.challenge,this.family,this.kids);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.CharacterNickname = function() {
	this.initialize();

	// Checkboxes
	this.checkbox6 = new lib.CheckBoxshort();
	this.checkbox6.setTransform(540.7,443.7,1,1,0,0,0,29,29);

	this.checkbox5 = new lib.CheckBoxshort();
	this.checkbox5.setTransform(540.7,330.1,1,1,0,0,0,29,29);

	this.checkbox4 = new lib.CheckBoxshort();
	this.checkbox4.setTransform(540.7,217.3,1,1,0,0,0,29,29);

	this.checkbox3 = new lib.CheckBoxshort();
	this.checkbox3.setTransform(242.7,443.7,1,1,0,0,0,29,29);

	this.checkbox2 = new lib.CheckBoxshort();
	this.checkbox2.setTransform(242.7,330.1,1,1,0,0,0,29,29);

	this.checkbox1 = new lib.CheckBoxshort();
	this.checkbox1.setTransform(242.7,217.3,1,1,0,0,0,29,29);

	// Text
	this.text = new cjs.Text("paven", "48px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 50;
	this.text.lineWidth = 212;
	this.text.setTransform(586,418.8);

	this.text_1 = new cjs.Text("putte", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_1.lineHeight = 50;
	this.text_1.lineWidth = 212;
	this.text_1.setTransform(586,303.6);

	this.text_2 = new cjs.Text("nitteren", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 212;
	this.text_2.setTransform(586,189.8);

	this.text_3 = new cjs.Text("skæve", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_3.lineHeight = 50;
	this.text_3.lineWidth = 212;
	this.text_3.setTransform(289,418.8);

	this.text_4 = new cjs.Text("sutsko", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_4.lineHeight = 50;
	this.text_4.lineWidth = 212;
	this.text_4.setTransform(289,303.6);

	this.text_5 = new cjs.Text("stormkrogen", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_5.lineHeight = 50;
	this.text_5.lineWidth = 212;
	this.text_5.setTransform(289,189.8);

	this.text_6 = new cjs.Text("Vælg dit øgenavn", "48px 'Special Elite'", "#FFFFFF");
	this.text_6.lineHeight = 50;
	this.text_6.lineWidth = 584;
	this.text_6.setTransform(208.4,91);

	this.addChild(this.text_6,this.text_5,this.text_4,this.text_3,this.text_2,this.text_1,this.text,this.checkbox1,this.checkbox2,this.checkbox3,this.checkbox4,this.checkbox5,this.checkbox6);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(208.4,91,593.5,383.7);


(lib.CharacterFamily = function() {
	this.initialize();

	// Checkboxes
	this.checkbox3 = new lib.CheckBox();
	this.checkbox3.setTransform(359.5,443.7,1,1,0,0,0,29,29);

	this.checkbox2 = new lib.CheckBox();
	this.checkbox2.setTransform(359.5,330.1,1,1,0,0,0,29,29);

	this.checkbox1 = new lib.CheckBox();
	this.checkbox1.setTransform(359.5,217.3,1,1,0,0,0,29,29);

	// Text
	this.text = new cjs.Text("ugift - ingen børn", "48px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 50;
	this.text.lineWidth = 329;
	this.text.setTransform(405.8,418.8);

	this.text_1 = new cjs.Text("fraskilt - med børn", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_1.lineHeight = 50;
	this.text_1.lineWidth = 337;
	this.text_1.setTransform(405.8,303.6);

	this.text_2 = new cjs.Text("gift - ingen børn", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 336;
	this.text_2.setTransform(405.8,189.8);

	this.text_3 = new cjs.Text("Vælg din civilstand", "48px 'Special Elite'", "#FFFFFF");
	this.text_3.lineHeight = 50;
	this.text_3.lineWidth = 584;
	this.text_3.setTransform(208.4,91);

	this.addChild(this.text_3,this.text_2,this.text_1,this.text,this.checkbox1,this.checkbox2,this.checkbox3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(208.4,91,587.6,383.7);


(lib.CharacterChallenge = function() {
	this.initialize();

	// Checkboxes
	this.checkbox3 = new lib.CheckBox();
	this.checkbox3.setTransform(359.5,443.7,1,1,0,0,0,29,29);

	this.checkbox2 = new lib.CheckBox();
	this.checkbox2.setTransform(359.5,330.1,1,1,0,0,0,29,29);

	this.checkbox1 = new lib.CheckBox();
	this.checkbox1.setTransform(359.5,217.3,1,1,0,0,0,29,29);

	// Text
	this.text = new cjs.Text("nedslidt", "48px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 50;
	this.text.lineWidth = 228;
	this.text.setTransform(405.8,418.8);

	this.text_1 = new cjs.Text("doven", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_1.lineHeight = 50;
	this.text_1.lineWidth = 228;
	this.text_1.setTransform(405.8,303.6);

	this.text_2 = new cjs.Text("alkoholiker", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 228;
	this.text_2.setTransform(405.8,189.8);

	this.text_3 = new cjs.Text("Vælg din udfordring", "48px 'Special Elite'", "#FFFFFF");
	this.text_3.lineHeight = 50;
	this.text_3.lineWidth = 584;
	this.text_3.setTransform(208.4,91);

	this.addChild(this.text_3,this.text_2,this.text_1,this.text,this.checkbox1,this.checkbox2,this.checkbox3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(208.4,91,587.6,383.7);


(lib._02CharacterMain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(28));

	// Intro
	this.character_intro = new lib.CharacterIntro();
	this.character_intro.setTransform(0,3);

	this.timeline.addTween(cjs.Tween.get(this.character_intro).wait(28));

	// Challenge
	this.character_challenge = new lib.CharacterChallenge();
	this.character_challenge.setTransform(0,-88.2,1,1,0,0,0,0,-91.2);

	this.timeline.addTween(cjs.Tween.get(this.character_challenge).wait(28));

	// Family
	this.character_family = new lib.CharacterFamily();
	this.character_family.setTransform(0,3);

	this.timeline.addTween(cjs.Tween.get(this.character_family).wait(28));

	// Nickname
	this.character_nickname = new lib.CharacterNickname();
	this.character_nickname.setTransform(0,3);

	this.timeline.addTween(cjs.Tween.get(this.character_nickname).wait(28));

	// BG
	this.instance = new lib._0_2BG();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(28));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.ControllerButtonSTOP = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{out:0,over:1,click:2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,0.68,0.68);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({x:1,y:1},0).wait(2));

	// Symbol
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgLABIA+hDIA0AAIg+BCIA+BCIg2ABgAhlABIBAhDIAyAAIg8BCIA8BCIg0ABg");
	this.shape.setTransform(17.3,17.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AgLABIA+hDIA0AAIg+BCIA+BCIg2ABgAhlABIBAhDIAyAAIg8BCIA8BCIg0ABg");
	this.shape_1.setTransform(17.3,17.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AgLABIA9hDIA1AAIg+BCIA+BCIg2ABgAhlABIA/hDIAzAAIg8BCIA8BCIg0ABg");
	this.shape_2.setTransform(18.3,18.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).wait(2));

	// BG
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCMIEWAAIAAkWIkWAAg");
	this.shape_3.setTransform(17,16.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCNIEXAAIAAkXIkXAAg");
	this.shape_4.setTransform(18,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,34,34);


(lib.ControllerButtonPLAY = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"out":0,"over":1,"click":2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,0.68,0.68);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({x:1,y:1},0).wait(2));

	// Symbol
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhHhgICPBgIiPBhg");
	this.shape.setTransform(18.2,17.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhHhgICPBgIiPBhg");
	this.shape_1.setTransform(18.2,17.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1,p:{x:18.2,y:17.4}}]},1).to({state:[{t:this.shape_1,p:{x:19.2,y:18.4}}]},1).wait(2));

	// BG
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCMIEWAAIAAkWIkWAAg");
	this.shape_2.setTransform(17,16.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCNIEXAAIAAkXIkXAAg");
	this.shape_3.setTransform(18,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2}]}).to({state:[{t:this.shape_3}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,34,34);


(lib.ControllerButtonPAUSE = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"out":0,"over":1,"click":2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,0.68,0.68);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({x:1,y:1},0).wait(2));

	// Symbol
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAYBkIAAjGIAzAAIAADGgAhKBkIAAjGIAzAAIAADGg");
	this.shape.setTransform(17.5,17);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhHhgICPBgIiPBhg");
	this.shape_1.setTransform(18.2,17.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AAYBjIAAjFIAzAAIAADFgAhKBjIAAjFIAzAAIAADFg");
	this.shape_2.setTransform(18.5,18);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).wait(2));

	// BG
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCMIEWAAIAAkWIkWAAg");
	this.shape_3.setTransform(17,16.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCNIEXAAIAAkXIkXAAg");
	this.shape_4.setTransform(18,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,34,34);


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


(lib.PlayerSlides = function() {
	this.initialize();

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgshAgWMAAAg/HMBanAAAMAAAA/Hg");
	mask.setTransform(295,207);

	// Slide
	this.container = new lib.EmptyContainerGrey();
	this.container.setTransform(10,10);

	this.container.mask = mask;

	// Progression Bar
	this.progressionBar = new lib.ProgressionBar();
	this.progressionBar.setTransform(101,436,1,1,0,0,0,0,5);

	// Progression BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2F2E19").s().p("EgmkABPIAAidMBNKAAAIAACdg");
	this.shape.setTransform(343,436);

	// Play
	this.playBtn = new lib.ControllerButtonPLAY();
	this.playBtn.setTransform(69,436.9,1,1,0,0,0,17,16.9);

	// Pause
	this.pauseBtn = new lib.ControllerButtonPAUSE();
	this.pauseBtn.setTransform(52,420);

	// Stop
	this.stopBtn = new lib.ControllerButtonSTOP();
	this.stopBtn.setTransform(28,436.9,1,1,0,0,0,17,16.9);

	// Background
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Egu3Aj3MAAAhHtMBdvAAAMAAABHtg");
	this.shape_1.setTransform(300,229.5);

	this.addChild(this.shape_1,this.stopBtn,this.pauseBtn,this.playBtn,this.shape,this.progressionBar,this.container);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,600,459);


(lib.PlayerAudio = function() {
	this.initialize();

	// Progression Bar
	this.progressionBar = new lib.ProgressionBar();
	this.progressionBar.setTransform(90,16,1,1,0,0,0,0,5);

	// Progression BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EgmlABQIAAieMBNKAAAIAACeg");
	this.shape.setTransform(332,16);

	// Play
	this.playBtn = new lib.ControllerButtonPLAY();
	this.playBtn.setTransform(58,16.9,1,1,0,0,0,17,16.9);

	// Pause
	this.pauseBtn = new lib.ControllerButtonPAUSE();
	this.pauseBtn.setTransform(41,0);

	// Stop
	this.stopBtn = new lib.ControllerButtonSTOP();
	this.stopBtn.setTransform(17,16.9,1,1,0,0,0,17,16.9);

	this.addChild(this.stopBtn,this.pauseBtn,this.playBtn,this.shape,this.progressionBar);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,579,33.8);


(lib.OpinionPlayerManager = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("forvalteren på fattiggården", "37px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 39;
	this.text.lineWidth = 459;

	this.player = new lib.PlayerAudio();
	this.player.setTransform(2.1,55);

	this.addChild(this.player,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,581.1,88.8);


(lib.OpinionPlayerDaughter = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("Din voksne datter", "37px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 39;
	this.text.lineWidth = 459;

	this.player = new lib.PlayerAudio();
	this.player.setTransform(2.1,55);

	this.addChild(this.player,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,581.1,88.8);


(lib._04OpinionMain = function() {
	this.initialize();

	// Text
	this.playerChallenge = new lib.OpinionPlayerManager();
	this.playerChallenge.setTransform(210,295);

	this.playerFamily = new lib.OpinionPlayerDaughter();
	this.playerFamily.setTransform(210,125);

	this.text = new cjs.Text("Det siger andre om dig....", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 777;
	this.text.setTransform(210,38);

	// Closeups
	this.portrait = new lib.OpenionCloseups();
	this.portrait.setTransform(822,261,1,1,0,0,0,201,279);

	// BG
	this.instance = new lib._0_4BG();

	this.addChild(this.instance,this.portrait,this.text,this.playerFamily,this.playerChallenge);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-18,1024,558);


(lib._01IntroMain = function() {
	this.initialize();

	// Player
	this.player = new lib.PlayerSlides();
	this.player.setTransform(512,269.5,1,1,0,0,0,300,229.5);

	// BG
	this.instance = new lib._0_1BG();

	this.addChild(this.instance,this.player);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


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
(lib.FlashApp = function(mode,startPosition,loop) {
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

	this.timeline.addTween(cjs.Tween.get(this.topbar).wait(19).to({_off:false},0).wait(51));

	// Continue
	this.continueBtn = new lib.ContinueButton();
	this.continueBtn.setTransform(951,579.4,1,1,0,0,0,48,48);
	this.continueBtn._off = true;

	this.timeline.addTween(cjs.Tween.get(this.continueBtn).wait(10).to({_off:false},0).wait(60));

	// 0.0 Start
	this.pageStart = new lib._00Frontpage();
	this.pageStart.setTransform(512,324,1,1,0,0,0,512,324);
	this.pageStart._off = true;

	this.timeline.addTween(cjs.Tween.get(this.pageStart).wait(10).to({_off:false},0).to({_off:true},9).wait(51));

	// 0.1 Intro
	this.page_intro = new lib._01IntroMain();
	this.page_intro.setTransform(1024,108);
	this.page_intro._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_intro).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.2 Character
	this.page_character = new lib._02CharacterMain();
	this.page_character.setTransform(1023,108);
	this.page_character._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_character).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.3 Card
	this.page_card = new lib._03CardMain();
	this.page_card.setTransform(1024,108);
	this.page_card._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_card).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.4 Opinion
	this.page_opinion = new lib._04OpinionMain();
	this.page_opinion.setTransform(1024,108);
	this.page_opinion._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_opinion).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.5 Map
	this.page_map = new lib._05Map();
	this.page_map.setTransform(1024,108);
	this.page_map._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_map).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 1.0 Poor House Container
	this.poorhouse_container = new lib.EmptyContainer();
	this.poorhouse_container.setTransform(0,108);
	this.poorhouse_container._off = true;

	this.timeline.addTween(cjs.Tween.get(this.poorhouse_container).wait(10).to({_off:false},0).to({_off:true},34).wait(26));

	// 2.0 Germany Container
	this.germany_container = new lib.EmptyContainer();
	this.germany_container.setTransform(0,108);
	this.germany_container._off = true;

	this.timeline.addTween(cjs.Tween.get(this.germany_container).wait(10).to({_off:false},0).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(502,324,1044,768);

})(mainLib = mainLib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var mainLib, images, createjs, ss;
(function () {
	'use strict';
	var app = angular.module('fattiggarden', ['ngRoute']);	

	app.controller('MainController', function($scope, Device) {

		$scope.lib = mainLib;
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
				setup();				
				// Preloader.remove();
			};
			Preloader.load($scope.lib.properties.manifest, onFileLoad, onLoadComplete, 'full');
		}

		function setup(){
			// Instantiate root object. Equivalent to root timeline
			$scope.exportRoot = new $scope.lib.FlashApp();

			var stage = new createjs.Stage($scope.canvas);
			stage.addChild($scope.exportRoot);

			// Do cursor
			stage.enableMouseOver(25);

			// Scale canvas according to ratio
			stage.scaleX = stage.scaleY = Device.ratio;
			stage.update();

			// Tik tak
			createjs.Ticker.setFPS($scope.lib.properties.fps);
			createjs.Ticker.addEventListener('tick', stage);

			// --------------------- Go start ->
			ApplicationManager.start($scope.exportRoot);
		}

		init();
	});
	
	app.directive('slCanvas', function(Device, Canvas) {	
		function link(scope){	
			// Create base canvas
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
  $templateCache.put('/fattiggarden/js/FlashApp.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>FlashApp</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="FlashApp.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(mainLib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new mainLib.FlashApp();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(mainLib.properties.fps);\n' +
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
    '	loader.loadManifest(germany1GameLib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new germany1GameLib.germany_1();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(germany1GameLib.properties.fps);\n' +
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
    '	loader.loadManifest(svendborgGameLib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new svendborgGameLib.svendborg();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '	stage.enableMouseOver();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(svendborgGameLib.properties.fps);\n' +
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
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_germany1_traveling.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_germany1_traveling</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_germany1_traveling.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(germany1SlideLib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new germany1SlideLib.slide_germany1_traveling();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(germany1SlideLib.properties.fps);\n' +
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
    '	loader.loadManifest(lib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new lib.slide_home1A();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(lib.properties.fps);\n' +
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
    '	loader.loadManifest(lib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new lib.slide_home1B();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(lib.properties.fps);\n' +
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
    '	loader.loadManifest(libSlideIntro.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new libSlideIntro.slide_intro();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(libSlideIntro.properties.fps);\n' +
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
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_svendborg.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_svendborg</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_svendborg.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(svendborgSlideLib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new svendborgSlideLib.slide_svendborg();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(svendborgSlideLib.properties.fps);\n' +
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
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_work_amory.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_work_amory</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_work_amory.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(lib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new lib.slide_work_amory();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(lib.properties.fps);\n' +
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
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_work_butcher.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_work_butcher</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_work_butcher.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(lib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new lib.slide_work_butcher();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(lib.properties.fps);\n' +
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
  $templateCache.put('/fattiggarden/assets/logic/slides/slide_work_mine.html',
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>slide_work_mine</title><script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script><script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script><script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script><script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script><script src="slide_work_mine.js"></script><script>var canvas, stage, exportRoot;\n' +
    '\n' +
    'function init() {\n' +
    '	canvas = document.getElementById("canvas");\n' +
    '	images = images||{};\n' +
    '\n' +
    '	var loader = new createjs.LoadQueue(false);\n' +
    '	loader.addEventListener("fileload", handleFileLoad);\n' +
    '	loader.addEventListener("complete", handleComplete);\n' +
    '	loader.loadManifest(lib.properties.manifest);\n' +
    '}\n' +
    '\n' +
    'function handleFileLoad(evt) {\n' +
    '	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n' +
    '}\n' +
    '\n' +
    'function handleComplete(evt) {\n' +
    '	exportRoot = new lib.slide_work_mine();\n' +
    '\n' +
    '	stage = new createjs.Stage(canvas);\n' +
    '	stage.addChild(exportRoot);\n' +
    '	stage.update();\n' +
    '\n' +
    '	createjs.Ticker.setFPS(lib.properties.fps);\n' +
    '	createjs.Ticker.addEventListener("tick", stage);\n' +
    '}</script></head><body onload="init()" style="background-color:#D4D4D4"><canvas id="canvas" width="580" height="404" style="background-color:#FFFFFF"></canvas></body></html>');
}]);
})();
