var Dropdown = function(view, args){
	'use strict';

	if(view === null){
		console.log('Dropdown view is null:', this);
		return;
	}

	// view.gotoAndStop('inactive');
	view.stop();

	this.view = view;	
	this.active = true;
	// this.enabled = true;
	this.args = args;
	this.listeners = {};

	// Events
	if(this.listeners.click === undefined || this.listeners.click === null){		
		this.listeners.click = this.view.hitarea.on('click', this.onClick, this);
	}


	// if(this.listeners.mouseover === undefined || this.listeners.mouseover === null){
	// 	this.listeners.mouseover = this.view.on('mouseover', this.onOver, this);
	// }

	// if(this.listeners.mouseout === undefined || this.listeners.mouseout === null){
	// 	this.listeners.mouseout = this.view.on('mouseout', this.onOut, this);
	// }

	// Set id by the help of a static variable (counter)
	if(Dropdown.counter === undefined){
		Dropdown.counter = 0;
	}else{
		Dropdown.counter++;
	}

	// ID
	this.id = Dropdown.counter;

	// Reset label
	this.view.label.text = '';

	// Template for dropdown items
	this.item = function(id, view, callback){
		this.id = id;
		this.listener = view.on('click', function(event){
			callback(view);
		}, this);
	}

	// Items
	var self = this;
	var cb = function(view){
		createjs.Tween.get(view)
			.to({alpha:0}, 40, createjs.Ease.linear)
			.to({alpha:1}, 40, createjs.Ease.linear)
			.to({alpha:0}, 40, createjs.Ease.linear)
			.to({alpha:1}, 40, createjs.Ease.linear)
			.call(function(){
				self.view.label.text = view.label.text;
				self.view.gotoAndStop('closed');
			});
	}
	var item1 =  new this.item('A', this.view.item_A, cb);
	var item2 =  new this.item('B', this.view.item_B, cb);
	var item3 =  new this.item('C', this.view.item_C, cb);
	

	// this.items = [];
	// this.items.push();
};
// Dropdown.prototype.getValue = function(){
// 	'use strict';
// 	return this.args.value;
// };
// Dropdown.prototype.disable = function(){
// 	'use strict';
// 	this.enabled = false;
// 	// this.mouseEnabled = false;
// };
Dropdown.prototype.setActive = function(state){
	'use strict';
	// Set state
	if(state){
		this.view.gotoAndStop('open');
	}else{
		this.view.gotoAndStop('closed');
	}
};
Dropdown.prototype.onClick = function(event){
	'use strict';
	this.view.gotoAndStop('open');

	// Dispatch event
	var e = new createjs.Event('click');
 	this.dispatchEvent(e);
};
// Dropdown.prototype.onOver = function(event){
// 	'use strict';
// 	if(!this.enabled){
// 		return;
// 	}

// 	// Rollover cursor
// 	Cursor.over();
// };
// Dropdown.prototype.onOut = function(event){
// 	'use strict';
// 	this.view.gotoAndStop('closed');

// 	// Back to default cursor
// 	Cursor.out();
// };
Dropdown.prototype.reset = function(){
	'use strict';
	// this.active = false;
	this.enabled = true;
	this.view.gotoAndStop('inactive');
};
Dropdown.prototype.destroy = function(){
	'use strict';
	this.view = null;	
	this.active = false;
	this.enabled = true;
	this.args = null;
	this.listeners = null;
};
createjs.EventDispatcher.initialize(Dropdown.prototype);