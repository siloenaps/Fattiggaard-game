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