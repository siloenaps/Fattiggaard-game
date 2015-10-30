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