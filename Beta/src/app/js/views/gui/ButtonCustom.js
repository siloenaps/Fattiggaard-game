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