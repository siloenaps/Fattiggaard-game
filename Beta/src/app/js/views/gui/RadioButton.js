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
	this.view.mouseEnabled = false;
};
RadioButton.prototype.ghost = function(){
	'use strict';
	this.enabled = false;
	this.view.alpha = 0.2;
	this.view.mouseEnabled = false;
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
	if(this.active || !this.enabled){
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
	// }else{
	// 	Cursor.out();
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