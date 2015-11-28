var PageMap = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.continueBtn = ContinueButton;
	this.continueBtn.ghost("next");	
};
PageMap.prototype.start = function() {
	'use strict';
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
	this.view.info1.id = 0;
	this.view.info2.id = 1;
	this.view.info3.id = 2;
	// Info buttons events
	this.listeners['info1'] = this.view.info1.on('click', function(event){
		self.openInfo(event.target.id);
	}, this);
	this.listeners['info2'] = this.view.info2.on('click', function(event){
		self.openInfo(event.target.id);
	}, this);
	this.listeners['info3'] = this.view.info3.on('click', function(event){
		self.openInfo(event.target.id);
	}, this);
	// Close button	
	this.listeners['closebutton'] = this.view.infopopup.closebutton.on('click', function(event){
		this.closeInfo();
	}, this);
};
PageMap.prototype.openInfo = function(id) {
	'use strict';
	this.view.infopopup.gotoAndStop(id);
	this.view.infopopup.x = 0;
	this.view.infopopup.visible = true;
	this.continueBtn.hide();
};
PageMap.prototype.closeInfo = function(id) {
	'use strict';
	this.view.infopopup.x = 1024;
	this.view.infopopup.visible = false;
	this.continueBtn.show();
};
PageMap.prototype.destroy = function() {
	'use strict';
	this.view = null;	
};
createjs.EventDispatcher.initialize(PageMap.prototype);