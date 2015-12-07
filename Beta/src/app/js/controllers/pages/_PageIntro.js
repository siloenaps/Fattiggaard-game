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
	'use strict';
	LoadJS.load(
		'../assets/logic/slides/'+"slide_"+this.id+".js", 
		Delegate.create(this.setup, this)
	);
	// Allow tick
	Tick.enable();
};
PageIntro.prototype.setup = function() {
	'use strict';
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
			Tick.framerate(Tick.low);
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
	'use strict';
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
	'use strict';
	this.playerComponent.off('complete', this.listeners.complete);	
	this.listeners.complete = null;

	// Set next button active
	this.continueBtn.activate("next");
};
PageIntro.prototype.destroy = function() {
	'use strict';
	if(this.playerComponent != null){
		this.playerComponent.destroy();	
	}
	this.playerComponent = null;
	this.view = null;
	this.lib = null;
};
createjs.EventDispatcher.initialize(PageIntro.prototype);