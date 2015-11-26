var PageStart = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.continueBtn = ContinueButton;
	this.continueBtn.activate("next");
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
};
PageStart.prototype.start = function() {
	'use strict';
	Tick.disable();
};
PageStart.prototype.onContinue = function(event) {
	'use strict';
	this.continueBtn.off('click', this.listeners.continue);	
	this.dispatchEvent(new createjs.Event('continue'));
};
PageStart.prototype.destroy = function() {
	'use strict';
	this.view = null;	
};
createjs.EventDispatcher.initialize(PageStart.prototype);