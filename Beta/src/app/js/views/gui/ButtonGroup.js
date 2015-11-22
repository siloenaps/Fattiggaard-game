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
ButtonGroup.prototype.disableByValue = function(value){
	'use strict';
	for(var i=0; i<this.buttonList.length; i++){
		var btn = this.buttonList[i];
		if(btn.getValue() === value){
			btn.ghost();
			return;
		}		
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