var PageCard = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.continueBtn = ContinueButton;
	this.continueBtn.activate("next");	
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
};
PageCard.prototype.start = function() {
	'use strict';
	var frm;


	// Set portrait a real name
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
	'use strict';
	this.continueBtn.off('click', this.listeners.continue);	
	this.dispatchEvent(new createjs.Event('continue'));
};
PageCard.prototype.destroy = function() {
	'use strict';
	this.view = null;	
};
createjs.EventDispatcher.initialize(PageCard.prototype);