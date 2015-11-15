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