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
	if(this.active || !this.enabled){
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
var Cursor = {
	root: null,
	init: function(root){
		'use strict';
		this.root = root;
	},
	over: function(){
		'use strict';
		this.root.cursor = 'pointer';
	},
	out: function(){
		'use strict';
		this.root.cursor = 'auto';
	}
};
var ContinueButton = {
	init: function(view){
		'use strict';
		if(view === undefined){
			throw new Error("'view' is undefined");
		}

		this.type = null;

		// Safety belt
		this.destroy();		

		this.view = view;
		this.nextBtnInstance = null;
		this.skipBtnInstance = null;
		this.listners = {};


		if(this.nextBtnInstance === null){
			this.nextBtnInstance = new ButtonCustom(this.view.nextBtn);
		}
		if(this.skipBtnInstance === null){
			this.skipBtnInstance = new ButtonCustom(this.view.skipBtn);
		}

		// Default is none are visible
		this.skipBtnInstance.visible(false);
		this.nextBtnInstance.visible(false);
		
		// Events
		this.listners.skip = this.skipBtnInstance.on('click', this.onClick, this);
		this.listners.next = this.nextBtnInstance.on('click', this.onClick, this);
	},
	activate: function(type){
		'use strict';
		this.type = type;
		switch(type){
			case 'next':
				this.skipBtnInstance.visible(false);
				// this.nextBtnInstance.visible(true);
				this.nextBtnInstance.setActive(true);
			break;
			case 'skip':
				this.skipBtnInstance.setActive(true);
				this.nextBtnInstance.visible(false);
			break;
		}
	},
	ghost: function(type){
		'use strict';
		this.type = type;
		switch(type){
			case 'next':
				this.skipBtnInstance.visible(false);
				this.nextBtnInstance.setActive(false);
			break;
			case 'skip':
				this.skipBtnInstance.setActive(false);
				this.nextBtnInstance.visible(false);
			break;
		}
	},
	hide: function(){
		'use strict';
		switch(this.type){
			case 'next':
				this.nextBtnInstance.visible(false);
			break;
			case 'skip':
				this.skipBtnInstance.visible(false);
			break;
		}
	},
	show: function(){
		'use strict';
		switch(this.type){
			case 'next':
				this.nextBtnInstance.visible(true);
			break;
			case 'skip':
				this.skipBtnInstance.visible(true);
			break;
		}
	},
	onClick: function(event){
		'use strict';
		// console.log(event.target);
		// event.target.goto('out');
		var e = new createjs.Event('click');
 		this.dispatchEvent(e);
	},
	// onMouseDown: function(event){
	// 	'use strict';
	// 	// console.log(event.target);
	// 	event.target.goto('click');
	// },
	// onMouseUp: function(event){
	// 	'use strict';
	// 	console.log(event.target);
	// 	event.target.goto('out');
	// },
	destroy: function(){
		'use strict';
		if(this.listners !== undefined){
			if(this.listners.skip != null){
				this.skipBtnInstance.off('click', this.listners.skip);
			}
			if(this.listners.next != null){
				this.nextBtnInstance.off('click', this.listners.next);
			}
		}
		this.view = null;
	}
}
createjs.EventDispatcher.initialize(ContinueButton);

var CheckboxGroup = {
	clickedCounter: 0,
	setup: function(viewList, valueList, delegate){
		'use strict';
		var self = this;

		// this.clear();
		
		this.clickedCounter = 0;
		
		this.delegate = delegate;

		// Group
		this.group = new ButtonGroup();

		for (var i = 0; i < viewList.length; i++) {
			// Checkbox
			var cb = new RadioButton(viewList[i], {value:valueList[i]});
			this.group.add(cb);
		};

		// Checkbox events
		this.listener = this.group.on('click', function(event){
			self.clickedCounter++;
			if(self.delegate != null)
				self.delegate({clicked: self.clickedCounter, value: event.data.value});
		});
	},
	disableCheckbox: function(value){
		this.group.disableByValue(value);
	},
	clear: function(){
		'use strict';
		// Clean eventual previous events and delegates
		if(this.group != null){
			this.group.reset();
			if(this.listener != null){
				this.group.off('click', this.listener);
			}
			this.group = null;
		}
		this.delegate = null;
	}
}
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
var ButtonCustom = function(view){
	'use strict';
	this.view = view;	
	this.active = true;

	// Events
	this.view.on('click', this.onClick, this);
	// this.view.on('mousedown', this.onDown, this);
	// this.view.on('pressup', this.onUp, this);
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
ButtonCustom.prototype.goto = function(frm){
	'use strict';
	this.view.gotoAndStop(frm);
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
// ButtonCustom.prototype.onDown = function(event){
// 	'use strict';
// 	if(!this.active){
// 		return false;
// 	}

// 	// Dispatch event
// 	var e = new createjs.Event('mousedown');
//  	this.dispatchEvent(e);
// };
// ButtonCustom.prototype.onUp = function(event){
// 	'use strict';
// 	if(!this.active){
// 		return false;
// 	}
// 	console.log('up');

// 	// Dispatch event
// 	var e = new createjs.Event('pressup');
//  	this.dispatchEvent(e);
// };
ButtonCustom.prototype.destroy = function(){
	'use strict';
	this.view = null;
}

createjs.EventDispatcher.initialize(ButtonCustom.prototype);
var PageMap = function(container){

	return{
		currentPage:null,
		container: container,
		startInfo: false,
		view: null,
		trigger: 'map', // Default start pointer
		continueBtn: ContinueButton,
		listeners: {},
		start: function(){
			'use strict';

			// Dispatcher
			createjs.EventDispatcher.initialize(this);

			// Events
			this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	

			this.id = 'map';//PlayerStats.poorhouse;

			LoadJS.load(
				['../assets/logic/map.js'], 
				Delegate.create(this.setup, this)
			);
		},
		next: function(){
			// console.log('next: ', this.flow);
			this.flow.next(this.trigger);
			
		},
		setup: function(){
			'use strict';
			if(this.runonce != null)
				return;

			var self = this;

			// Setup may run ONLY once
			this.runonce = true;

			// Setup flow
			this.flow = new SubFlowController();
			this.flow.addAction('map', Delegate.create(this.map, this), 'end');
			this.flow.addAction('end', Delegate.create(
				function(){
					self.removeEvents();
					self.dispatchEvent(new createjs.Event('continue'));
				}, this)
			);

			try{
				// Load files for flow	
				this.lib = lib;
				var Clss = this.lib.map;
				var manifest = this.lib.properties.manifest;
				var onFileLoad = function(event){
					if (event.item.type === 'image') { 
						// // console.log('result:', event.item.id, event.result);
						images[event.item.id] = event.result; 
					}
				};
				var onLoadComplete = function(event){
					// // console.log('onLoadComplete');

					// Instantiate view
					self.view = new Clss();

					//Add
					self.container.addChild(self.view);

					// Set start page
					self.flow.next(self.trigger);

					self.dispatchEvent(new createjs.Event('ready'));
				};
				Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
			}catch(err) {
		   		console.log(err);
		   	}
		},
		setInfo: function(state){
			this.startInfo = state;
		},
		onContinue: function(event) {
			'use strict';
			// console.log('PageMap::onContinue');	

			// Stop player if any
			if(this.playerComponent != null){
				this.playerComponent.stop();
			}

			// Must be set after stopping player
			this.next();
		},		
		removeEvents: function() {
			'use strict';
			
			// Remove events
			this.continueBtn.off('click', this.listeners.continue);
			this.listeners.continue = null;
		},
		restart: function(){
			'use strict';
			this.currentPage = null;
		},
		destroy: function(){
			'use strict';
			this.currentPage = null;
			this.flow.destroy();
			this.flow = null;
			this.container = null;
			this.currentBackground = null;
			this.trigger = null;
			this.view = null;
			if(this.playerComponent != null)
				this.playerComponent.destroy();
			this.playerComponent = null;
		},

		// Pages --------------------------------------------------------------------------------------------------------
		
		map: function(trigger){
			this.continueBtn.ghost("next");

			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_5);

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.page_map;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				Tick.framerate(Tick.medium);
			}, this));	

			// Checkboxes
			var btn1 = new RadioButton(this.currentPage.checkbox1, {value:'horsens'});
			var btn2 = new RadioButton(this.currentPage.checkbox2, {value:'sundholm'});
			var btn3 = new RadioButton(this.currentPage.checkbox3, {value:'svendborg'});

			// Group
			this.group = new ButtonGroup();
			this.group.add(btn1);
			this.group.add(btn2);
			this.group.add(btn3);

			// Events
			this.eventGroupListener = this.group.on("click", function(event){
				// Save chosen "fattiggård"
				PlayerStats.poorhouse = event.data.value;

				// User may continue
				self.continueBtn.activate('next');
				self.continueBtn.on('click', function(e){
					e.remove();
					event.remove();

					// FIXME
					// self.currentPage.info1.off('click', self.listeners['info1']);
					// self.currentPage.info2.off('click', self.listeners['info2']);
					// self.currentPage.info3.off('click', self.listeners['info3']);

					self.dispatchEvent(new createjs.Event('continue'));
				});
			}, this);
			
			this.currentPage.infotext.visible = this.startInfo;
			this.currentPage.headline.visible = !this.startInfo;
			

			// Info popup
			this.currentPage.infopopup.visible = false;
			var infoButtons = {};
			infoButtons.horsens = new ButtonCustom(this.currentPage.info1);
			infoButtons.sundholm = new ButtonCustom(this.currentPage.info2);
			infoButtons.svendborg = new ButtonCustom(this.currentPage.info3);
			infoButtons.horsens.id = 0;
			infoButtons.sundholm.id = 1;
			infoButtons.svendborg.id = 2;

			var openInfo = function(id) {
				'use strict';
				self.currentPage.infopopup.gotoAndStop(id);
				self.currentPage.infopopup.x = 0;
				self.currentPage.infopopup.visible = true;
				self.continueBtn.hide();
			};
			var closeInfo = function(id) {
				'use strict';
				self.currentPage.infopopup.x = 1024;
				self.currentPage.infopopup.visible = false;
				self.continueBtn.show();
			};

			// Info buttons events
			this.listeners['horsens'] = infoButtons.horsens.on('click', function(event){
				console.log(event)
				openInfo(event.target.id);
			}, this);
			this.listeners['sundholm'] = infoButtons.sundholm.on('click', function(event){
				openInfo(event.target.id);
			}, this);
			this.listeners['svendborg'] = infoButtons.svendborg.on('click', function(event){
				openInfo(event.target.id);
			}, this);

			// Disable buttons
			if(PlayerStats.poorhouse !== null && PlayerStats.poorhouse !== undefined){
				this.group.disableByValue(PlayerStats.poorhouse);
				infoButtons[PlayerStats.poorhouse].setActive(false);			
				infoButtons[PlayerStats.poorhouse].off('click', this.listeners[PlayerStats.poorhouse]);
			}			

			// infoButtons[PlayerStats.poorhouse].off('click', this.listeners[PlayerStats.poorhouse]);
			// infoButtons[PlayerStats.poorhouse].alpha = .2;
			// infoButtons[PlayerStats.poorhouse].buttonEnabled = false;


			// Close button	
			this.listeners['closebutton'] = this.currentPage.infopopup.closebutton.on('click', function(event){
				closeInfo();
			}, this);

		},


	};	
}
var PageIntroSlide = function(container){
	'use strict';
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.slideLib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = 'start'; 
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};
	// this.portrait = null;

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};
PageIntroSlide.prototype.setPortrait = function(image){
	this.portrait = image;
}
PageIntroSlide.prototype.start = function(flowId, slideName){
	this.id = PlayerStats.poorhouse;
	this.flowId = flowId;
	this.slideName = slideName;

	var gameFile;

	// console.log('PageIntroSlide:start', slideName+'.js');
	// console.log('PageIntroSlide', this.runonce, slideName+'.js');

	LoadJS.load(
		['../assets/logic/games/poorhouse_intro.js', '../assets/logic/slides/'+slideName+'.js'], 
		Delegate.create(this.setup, this)
	);
};
PageIntroSlide.prototype.setup = function(){
	'use strict';
	console.log('PageIntroSlide::setup:runonce', this.container);

	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	// Tick
	Tick.framerate(Tick.high);

	var self = this;
	var manifest, Clss;	

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('start', Delegate.create(this.intro, this), 'end');
	this.flow.addAction('end', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);

	this.addContent();
	// Set background image
	// this.addBgImage();
	// this.dispatchEvent(new createjs.Event('ready'));
	
};
// PageIntroSlide.prototype.addContent = function(){
// 	// console.log('PageIntroSlide::setup:flowId', this.flowId);
// 	this.lib = gamelib;
// 	this.slideLib = slidelib;
// 	Clss = this.lib.poorhouse_intro;
// 	manifest = this.lib.properties.manifest;

// 	// Instantiate view
// 	this.view = new Clss();

// 	//Add
// 	this.container.addChild(self.view);
// }
PageIntroSlide.prototype.addContent = function(){
	// console.log('PageIntroSlide::setup:flowId', this.flowId);
	var self = this;
	this.lib = gamelib;
	this.slideLib = slidelib;
	Clss = this.lib.poorhouse_intro;
	manifest = this.lib.properties.manifest;

	try{
		// Background image
		if(this.flowId === '0.1'){
			this.bgImage = ImageService.matrix[this.flowId];
		}else{
			this.bgImage = ImageService.matrix[this.flowId][PlayerStats.poorhouse];// './assets/images/pool/_1_0BGsvendborg.jpg';			
		}

		var tmpList = this.bgImage.src.split('/');	// SPlit url into an array
		var filename = tmpList[tmpList.length-1];	// Get filename
		var fileId = filename.split('.')[0];		// Filename without postfix 

		// manifest.push({src: this.bgImage.src, id: fileId});	
		// manifest.push({src: this.bgImage.src, id: this.bgImage.id});	

		// for(var i in manifest){
		// 	console.log('manifest: ', manifest[i].id, manifest[i].src)
		// }
		// for(var i in images){
		// 	console.log('images: ', images[i])
		// }

	}catch(err){
		// console.log(PlayerStats.poorhouse, this.bgImage);
		// console.log(err);
	}	
	
	// Load files
	var onFileLoad = function(event){
		if (event.item.type === 'image') { 
			// console.log(event.item.id, event.result);
			images[event.item.id] = event.result; 
		}
	};
	var onLoadComplete = function(event){
		console.log('onLoadComplete');
		// Instantiate view
		self.view = new Clss();

		//Add
		self.container.addChild(self.view);

		// Set start page
		self.next();

		// console.log('PageIntroSlide:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};

	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
}
PageIntroSlide.prototype.next = function(){
	'use strict';
	this.flow.next(this.trigger);	
};
PageIntroSlide.prototype.onComplete = function(event) {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}

	// Set next button active
	this.continueBtn.activate('next');	
};
PageIntroSlide.prototype.onContinue = function(event) {
	'use strict';
	
	// console.log('PageIntroSlide::onContinue');
	
	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	this.next();

	// // console.log('this.playerComponent:', this.playerComponent)
};
PageIntroSlide.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
PageIntroSlide.prototype.destroy = function() {
	'use strict';
	
	// Remove events
	this.removeEvents();

	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
		this.playerComponent.destroy();	
		this.playerComponent = null;
	}			
	this.view = null;
	this.lib = null;
	this.currentPage = null;
	this.listeners = null;
	this.flow = null;
};
PageIntroSlide.prototype.intro = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set page view
	this.currentPage = this.view.intro;
	this.currentPage.x = 0;

	// Set background
	this.view.bg_container.x = 0;

	// Background
	console.log('this.bgImage.src:', this.bgImage.src);
	var bitmap = new createjs.Bitmap(this.bgImage.src);	
	this.view.bg_container.addChild(bitmap);

	// Slide. Loading is self contained
	this.playerComponent = new PlayerSliderComponent(this.currentPage.player);
	this.listeners.complete = self.playerComponent.on('complete', function(event){
		// console.log('PageIntroSlide::complete');
		self.continueBtn.activate('next');
		Tick.framerate(Tick.low);
	}, self);
	this.playerComponent.on('ready', function(event){
		event.remove();		
		self.continueBtn.activate("skip");
		// self.dispatchEvent(new createjs.Event('ready'));
		// console.log('PageIntroSlide::ready');
		// No tick
		// Tick.framerate(Tick.low);
		// console.log('NB. Disabled tick-disablign as test in PageIntroSlide');
	});
	// // console.log(this.slideLib)
	this.playerComponent.preload(this.slideName, this.slideLib);
	
};
createjs.EventDispatcher.initialize(PageIntroSlide.prototype);



var SubFlowController = function(){
	'use strict';

	var action = function(delegate, triggers){
		return{
			delegate: delegate,
			triggers: triggers
		};
	}

	return {
		actions: {},
		addAction: function (trigger, delegate, triggers){
			'use strict';
			this.actions[trigger] = new action(delegate, triggers);
		},
		next: function(trigger){
			'use strict';
		
			// Allow tick
			Tick.enable();
			Tick.framerate(Tick.high);


			var action = this.actions[trigger];

			console.log('next:', trigger, action);
			
			try{
				action.delegate(action.triggers);
			}catch(err) {
				console.log(err);
			}
		},	
		onComplete: function(event) {
			'use strict';
			// // Set next button active
			// this.continueBtn.activate('next');

			// // Remove events
			// if(this.playerComponent != null){
			// 	this.playerComponent.off('complete', this.listeners.complete);	
			// }	
		},
		onContinue: function(event) {
			'use strict';
			this.next();
		},
		destroy: function(){
			this.actions.triggers = null;
			this.actions.delegate = null;
			this.actions = null;
		}
	};
};
var FlowPrologue = function(container){

	return{
		currentPage:null,
		container: container,
		view: null,
		trigger: '0.2.1', // Default start pointer
		continueBtn: ContinueButton,
		listeners: {},
		start: function(){
			'use strict';

			// Dispatcher
			createjs.EventDispatcher.initialize(this);

			// Events
			this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	

			this.id = 'epilogue';//PlayerStats.poorhouse;

			// // console.log('FlowPrologue:start', this.container);

			LoadJS.load(
				['../assets/logic/games/prologue.js'], 
				Delegate.create(this.setup, this)
			);
		},
		next: function(){
			// console.log('next: ', this.flow);
			this.flow.next(this.trigger);
			
		},
		setup: function(){
			'use strict';
			if(this.runonce != null)
				return;

			var self = this;

			// Setup may run ONLY once
			this.runonce = true;

			// Setup flow
			this.flow = new SubFlowController();
			// console.log('setup: ', this.flow);
			this.flow.addAction('4.11', 
				Delegate.create(
					Flow.statsSplit, this), {
												type: 'bool',
												threshold:false, 
												value: PlayerStats.bomb,
												triggers:['4.11.1', '4.11.2'], 
												callback: Delegate.create(this.next, this)
											}
								);
			this.flow.addAction('0.2.1', Delegate.create(this.intro, this), '0.2.2');
			this.flow.addAction('0.2.2', Delegate.create(this.challenge, this), '0.2.3');
			this.flow.addAction('0.2.3', Delegate.create(this.family, this), '0.2.4');
			this.flow.addAction('0.2.4', Delegate.create(this.nickname, this), '0.3');
			this.flow.addAction('0.3', Delegate.create(this.card, this), '0.4');
			this.flow.addAction('0.4', Delegate.create(this.opinion, this), 'end');
			// this.flow.addAction('0.5', Delegate.create(this.map, this), 'end');
			this.flow.addAction('end', Delegate.create(
				function(){
					self.removeEvents();
					self.dispatchEvent(new createjs.Event('continue'));
				}, this)
			);

			try{
				// Load files for flow	
				this.lib = gamelib; //germany1GameLib;
				var Clss = this.lib.prologue;
				var manifest = this.lib.properties.manifest;
				var onFileLoad = function(event){
					if (event.item.type === 'image') { 
						// // console.log('result:', event.item.id, event.result);
						images[event.item.id] = event.result; 
					}
				};
				var onLoadComplete = function(event){
					// // console.log('onLoadComplete');

					// Instantiate view
					self.view = new Clss();

					//Add
					self.container.addChild(self.view);

					// Set start page
					self.flow.next(self.trigger);

					self.dispatchEvent(new createjs.Event('ready'));
				};
				Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
			}catch(err) {
		   		console.log(err);
		   	}
		},
		onContinue: function(event) {
			'use strict';
			// console.log('FlowPrologue::onContinue');	

			// Stop player if any
			if(this.playerComponent != null){
				this.playerComponent.stop();
			}

			// Must be set after stopping player
			this.next();
		},		
		removeEvents: function() {
			'use strict';
			
			// Remove events
			this.continueBtn.off('click', this.listeners.continue);
			this.listeners.continue = null;
		},
		restart: function(){
			'use strict';
			this.currentPage = null;
		},
		destroy: function(){
			'use strict';
			this.currentPage = null;
			this.flow.destroy();
			this.flow = null;
			this.container = null;
			this.currentBackground = null;
			this.trigger = null;
			this.view = null;
			if(this.playerComponent != null)
				this.playerComponent.destroy();
			this.playerComponent = null;
		},

		// Pages --------------------------------------------------------------------------------------------------------
		intro: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_2_1);

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.character_intro;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
				Tick.framerate(Tick.low);
			}, this));

			// Next
			this.continueBtn.activate('next');
		},
		challenge: function(trigger){
			this.continueBtn.ghost("next");

			// Next move
			this.trigger = trigger;

			var self = this;	

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_2_2);

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.character_challenge;
			Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				Tick.framerate(Tick.medium);
			}, this));

			// Checkboxes
			var btn1 = new RadioButton(this.currentPage.checkbox1, {value:'A'});
			var btn2 = new RadioButton(this.currentPage.checkbox2, {value:'B'});
			var btn3 = new RadioButton(this.currentPage.checkbox3, {value:'C'});

			// Group
			this.group = new ButtonGroup();
			this.group.add(btn1);
			this.group.add(btn2);
			this.group.add(btn3);

			// Events
			this.eventGroupListener = this.group.on("click", function(event){
				// Save chosen "challenge"
				PlayerStats.challenge = event.data.value

				// User may continue
				self.continueBtn.activate('next');
				self.continueBtn.on('click', function(e){
					e.remove();
					event.remove();
				});
			}, self);
		},
		family: function(trigger){
			this.continueBtn.ghost("next");

			// Next move
			this.trigger = trigger;
			
			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_2_3);

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.character_family;
			Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
				Tick.framerate(Tick.medium);
			}, this));			

			// Checkboxes
			var btn1 = new RadioButton(this.currentPage.checkbox1, {value:'D'});
			var btn2 = new RadioButton(this.currentPage.checkbox2, {value:'E'});
			var btn3 = new RadioButton(this.currentPage.checkbox3, {value:'F'});

			// Group
			this.group = new ButtonGroup();
			this.group.add(btn1);
			this.group.add(btn2);
			this.group.add(btn3);

			// Events
			this.eventGroupListener = this.group.on("click", function(event){
				// Save chosen "family" state
				PlayerStats.family = event.data.value

				// User may continue
				self.continueBtn.activate('next');
				self.continueBtn.on('click', function(e){
					e.remove();
					event.remove();
				});
			}, self);
		},
		nickname: function(trigger){
			this.continueBtn.ghost("next");

			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_2_4);

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.character_nickname;
			Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
				Tick.framerate(Tick.medium);
			}, this));	

			// Checkboxes
			var btn1 = new RadioButton(this.currentPage.checkbox1, {value:1});
			var btn2 = new RadioButton(this.currentPage.checkbox2, {value:2});
			var btn3 = new RadioButton(this.currentPage.checkbox3, {value:3});
			var btn4 = new RadioButton(this.currentPage.checkbox4, {value:4});
			var btn5 = new RadioButton(this.currentPage.checkbox5, {value:5});
			var btn6 = new RadioButton(this.currentPage.checkbox6, {value:6});

			// Group
			this.group = new ButtonGroup();
			this.group.add(btn1);
			this.group.add(btn2);
			this.group.add(btn3);
			this.group.add(btn4);
			this.group.add(btn5);
			this.group.add(btn6);

			// Events
			this.eventGroupListener = this.group.on("click", function(event){		
				// Save chosen "nickname"
				PlayerStats.nickname = event.data.value
				
				// User may continue
				self.continueBtn.activate('next');
				self.continueBtn.on('click', function(e){
					e.remove();
					event.remove();
				});
			}, self);
		},
		card: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_3);

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.page_card;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
				Tick.framerate(Tick.low);
			}, this));

			// Set portrait a real name
			var frm = PlayerStats.challenge + PlayerStats.family;
			this.currentPage.portrait.gotoAndStop(frm);
			this.currentPage.realname.gotoAndStop(frm);
			this.currentPage.height.gotoAndStop(frm);

			// Set nickname
			frm = PlayerStats.nickname - 1; // Timeline frame number starts at 0 and nickname refs starts at 1
			this.currentPage.nickname.gotoAndStop(frm);

			// Set challenge
			frm = PlayerStats.challenge;
			this.currentPage.challenge.gotoAndStop(frm);	

			// Set family, kids
			frm = PlayerStats.family;
			this.currentPage.family.gotoAndStop(frm);
			this.currentPage.kids.gotoAndStop(frm);

			// Next
			this.continueBtn.activate('next');
		},
		opinion: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_4);

			// Get sound
			var key = PlayerStats.challenge + PlayerStats.family;
			var sound = SoundService.matrix['0.4'][key];

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.page_opinion;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				// Sound Player
				self.listeners.complete = self.playerComponent.on('complete', function(event){
					self.continueBtn.activate('next');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.preload(sound.src, sound.duration);
			}, this));

			// Set portrait + text realted to speaking character
			var frm = PlayerStats.challenge + PlayerStats.family;
			this.currentPage.portrait.gotoAndStop(frm);	
			this.currentPage.playerlabel.gotoAndStop(frm);
			this.currentPage.charactertext.gotoAndStop(frm);

			// Reuse player component var for sound
			this.playerComponent = null;
			this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

			// Next
			this.continueBtn.ghost('skip');
		},
		map: function(trigger){
			this.continueBtn.ghost("next");

			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_0_5);

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.page_map;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				Tick.framerate(Tick.medium);
			}, this));	

			// Checkboxes
			var btn1 = new RadioButton(this.currentPage.checkbox1, {value:'horsens'});
			var btn2 = new RadioButton(this.currentPage.checkbox2, {value:'sundholm'});
			var btn3 = new RadioButton(this.currentPage.checkbox3, {value:'svendborg'});

			// Group
			this.group = new ButtonGroup();
			this.group.add(btn1);
			this.group.add(btn2);
			this.group.add(btn3);

			// Events
			this.eventGroupListener = this.group.on("click", function(event){
				// Save chosen "fattiggård"
				PlayerStats.poorhouse = event.data.value;

				// User may continue
				self.continueBtn.activate('next');
				self.continueBtn.on('click', function(e){
					e.remove();
					event.remove();

					// FIXME
					// self.currentPage.info1.off('click', self.listeners['info1']);
					// self.currentPage.info2.off('click', self.listeners['info2']);
					// self.currentPage.info3.off('click', self.listeners['info3']);

					self.dispatchEvent(new createjs.Event('continue'));
				});
			}, this);

			// Info popup
			this.currentPage.infopopup.visible = false;
			this.infoButtons = [];
			this.infoButtons.push(this.currentPage.info1);
			this.infoButtons.push(this.currentPage.info2);
			this.infoButtons.push(this.currentPage.info3);
			this.currentPage.info1.id = 0;
			this.currentPage.info2.id = 1;
			this.currentPage.info3.id = 2;


			var openInfo = function(id) {
				'use strict';
				self.currentPage.infopopup.gotoAndStop(id);
				self.currentPage.infopopup.x = 0;
				self.currentPage.infopopup.visible = true;
				self.continueBtn.hide();
			};
			var closeInfo = function(id) {
				'use strict';
				self.currentPage.infopopup.x = 1024;
				self.currentPage.infopopup.visible = false;
				self.continueBtn.show();
			};


			// Info buttons events
			this.listeners['info1'] = this.currentPage.info1.on('click', function(event){
				openInfo(event.target.id);
			}, this);
			this.listeners['info2'] = this.currentPage.info2.on('click', function(event){
				openInfo(event.target.id);
			}, this);
			this.listeners['info3'] = this.currentPage.info3.on('click', function(event){
				openInfo(event.target.id);
			}, this);
			// Close button	
			this.listeners['closebutton'] = this.currentPage.infopopup.closebutton.on('click', function(event){
				closeInfo();
			}, this);

		},


	};	
}
var FlowPoorhouseSecond = function(container, id){
	'use strict';
	this.container = container;
	this.id = id; 
	this.view = null;	
	this.lib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '3.1'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};
FlowPoorhouseSecond.prototype.start = function(){
	this.id = PlayerStats.poorhouse;
	var gameFile;

	console.log('FlowPoorhouseSecond:start');

	LoadJS.load(
		['../assets/logic/games/'+this.id+'_second.js'], 
		Delegate.create(this.setup, this)
	);
};
FlowPoorhouseSecond.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	// Tick
	Tick.framerate(Tick.high);

	var self = this;
	var manifest, Clss;	

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('3.1', Delegate.create(this.chooseJob, this), '3.2.1');
	this.flow.addAction('3.2.1', Delegate.create(this.work, this), '3.2.2');
	this.flow.addAction('3.2.2', Delegate.create(this.points1, this), '3.3');
	this.flow.addAction('3.3', Delegate.create(this.getout, this), '3.4.1');
	this.flow.addAction('3.4.1', Delegate.create(this.playAdvice, this), '3.4.2');
	this.flow.addAction('3.4.2', Delegate.create(this.playAdvice, this), '3.5');
	this.flow.addAction('3.5', Delegate.create(this.chooseWayOut, this), {'A':'3.6.1', 'B':'3.8'});
	this.flow.addAction('3.6.1', Delegate.create(this.farmWork, this), '3.6.2');
	this.flow.addAction('3.6.2', Delegate.create(this.points2, this), '3.7.1');
	this.flow.addAction('3.7.1', Delegate.create(this.farmworkEnded, this), '3.7.2');
	this.flow.addAction('3.7.2', Delegate.create(this.points3, this), '4.0');
	this.flow.addAction('3.8', Delegate.create(this.letterWrite, this), '3.9');
	this.flow.addAction('3.9', Delegate.create(this.letterAnswer, this), '3.10');
	this.flow.addAction('3.10', Delegate.create(this.points4, this), '4.0');
	this.flow.addAction('4.0', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);

	//this.id = 'svendborg';
	console.log('FlowPoorhouseSecond:setup', this.id);

	this.lib = gamelib;
	switch(this.id){
		case 'horsens':			
			// this.lib = horsensGameLib;
			Clss = this.lib.horsens_second;
			manifest = this.lib.properties.manifest;
		break;
		case 'sundholm':
			// this.lib = sundbyGameLib;
			Clss = this.lib.sundholm_second;
			manifest = this.lib.properties.manifest;
		break;
		case 'svendborg':	
			
			Clss = this.lib.svendborg_second;
			manifest = this.lib.properties.manifest;

		break;
	}
	
	// Load files
	var onFileLoad = function(event){
		if (event.item.type === 'image') { 
			images[event.item.id] = event.result; 
		}
	};
	var onLoadComplete = function(event){
		// Instantiate view
		self.view = new Clss();

		//Add
		self.container.addChild(self.view);

		// Set start page
		self.next();

		console.log('FlowPoorhouseSecond:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};
	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
};
FlowPoorhouseSecond.prototype.next = function(){
	'use strict';

	this.flow.next(this.trigger);	
};
FlowPoorhouseSecond.prototype.onComplete = function(event) {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}

	// Set next button active
	this.continueBtn.activate('next');	
};
FlowPoorhouseSecond.prototype.onContinue = function(event) {
	'use strict';
	
	// console.log('FlowPoorhouseSecond::onContinue');
	
	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	this.next();

	// console.log('this.playerComponent:', this.playerComponent)
};
FlowPoorhouseSecond.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowPoorhouseSecond.prototype.destroy = function() {
	'use strict';
	
	// Remove events
	this.removeEvents();

	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
		this.playerComponent.destroy();	
		this.playerComponent = null;
	}			
	this.view = null;
	this.lib = null;
	this.currentPage = null;
	this.listeners = null;
	this.flow = null;
};


// Pages ------------------------------------------------------------------------------------------------

FlowPoorhouseSecond.prototype.chooseJob = function(trigger) {
	'use strict';
	var self = this;

	console.log('chooseJob');

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosework;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Desactivate continue button
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
		Delegate.create(function(vo){
			// Save chosen 'job'
			PlayerStats.job = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);
};
FlowPoorhouseSecond.prototype.work = function(trigger) {
	'use strict';

	var self = this;

	// Next move
	this.trigger = trigger;

	this.continueBtn.activate('skip');

	// Get sound
	var sound = SoundService.matrix['3.2.1'][this.id][PlayerStats.job]; // "svendborg/A"	
	
	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view['bg_3_2_1'+PlayerStats.job]);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.work;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Tick.framerate(Tick.low);

		// Sound	
		self.listeners.complete = this.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);

	}, this));

	// Reuse player component var for sound
	self.playerComponent = new PlayerSoundComponent(self.currentPage.player);

	// Nxt button
	self.continueBtn.ghost('skip');
};
FlowPoorhouseSecond.prototype.points1 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.getout = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_3);

	// Get sound
	var sound = SoundService.matrix[currentTrigger][this.id];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.getout;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	self.continueBtn.ghost('skip');
};
FlowPoorhouseSecond.prototype.playAdvice = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;
	
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;

	// Set new page out
	switch(currentTrigger){
		case '3.4.1': // Employee
			this.currentPage = this.view.adviceemployee;
		break;
		case '3.4.2': // Inmate
			// Change background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_4_2);

			this.currentPage = this.view.adviceinmate;	
		break;		
	}	

	// Get sound
	var sound = SoundService.matrix[currentTrigger];
	
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Portrait
	// this.currentPage.portrait.gotoAndStop(this.id);

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouseSecond.prototype.chooseWayOut = function(triggers) {
	'use strict';
	var self = this;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosewayout;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Desactivate continue button
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

		// Save chosen 'way out'
		PlayerStats.wayout = vo.value;
		self.trigger = triggers[PlayerStats.wayout]; // Set trigger due to choice!!

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);
};
FlowPoorhouseSecond.prototype.farmWork = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_6);

	// Get sound
	var sound = SoundService.matrix[currentTrigger];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.farmwork;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.farmworkEnded = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_7);

	// Get sound
	var sound = SoundService.matrix[currentTrigger];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.workended;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	self.continueBtn.ghost('skip');
};
FlowPoorhouseSecond.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.letterWrite = function(trigger) {
	'use strict';
	var self = this;

	self.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_3_8);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.letterwrite;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Dropdowns
	var dropdown1 = new Dropdown(this.currentPage.dropdown_A);
	var dropdown2 = new Dropdown(this.currentPage.dropdown_B);
	var dropdown3 = new Dropdown(this.currentPage.dropdown_C);

	// Close dropdowns when entering the fullscreen button ... whcih willl happen every toe you leave a dropdown
	var fullscreenButton = this.currentPage.fullscreenButton;
	var screenListener = fullscreenButton.on('mouseover', function(){
		dropdown1.setActive(false);
		dropdown2.setActive(false);
		dropdown3.setActive(false);
	});

	// Name
	var frm = PlayerStats.challenge + PlayerStats.family;
   	this.currentPage.realname.gotoAndStop(frm);

   	// Special conitnue event event listener
   	this.continueBtn.on('click', function(event){
   		event.remove();
   		fullscreenButton.off('click', screenListener);
   	});
};
FlowPoorhouseSecond.prototype.letterAnswer = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutPosition(this.currentPage);

	// Set new page out
	this.currentPage = this.view.letteranswer;

	// New page in
	Transitions.transInAlpha(this.currentPage);

	this.continueBtn.activate('next');
};
FlowPoorhouseSecond.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points4;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};

createjs.EventDispatcher.initialize(FlowPoorhouseSecond.prototype);



var FlowPoorhouse = function(container){
	'use strict';
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '1.0.2'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.ghost('skip');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
};
FlowPoorhouse.prototype.soundEffectPlay = function(sound){
	var self = this;
	// Sound effect
	if(this.soundEffect != null){
		this.soundEffect.destroy();
		this.soundEffect = null;
	}

	try{
		// var sound = SoundService.matrix.effects.typewriter;
		this.soundEffect = new SoundController(sound.src, true);	
		this.soundEffect.volume(sound.volume);
		this.soundEffect.on('ready', Delegate.create(function(event){
			event.remove();
			this.soundEffect.play();
		}, this));		
		this.soundEffect.load();
	}catch(err){
		console.log(err);
	}
	
};
FlowPoorhouse.prototype.soundEffectStop = function(sound){
	// Sound effect
	if(this.soundEffect != null){
		this.soundEffect.stop();
		this.soundEffect.destroy();
		this.soundEffect = null;
	}
};
FlowPoorhouse.prototype.start = function(){
	this.id = PlayerStats.poorhouse;
	var gameFile;

	// console.log('FlowPoorhouse:start');

	LoadJS.load(
		['../assets/logic/games/'+this.id+'.js'], 
		Delegate.create(this.setup, this)
	);
};
FlowPoorhouse.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	// Tick
	Tick.framerate(Tick.high);

	var self = this;
	var manifest, Clss;	

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('1.0.2', Delegate.create(this.points1, this), '1.1.1');
	this.flow.addAction('1.1.1', Delegate.create(this.caretaker, this), '1.1.2');
	this.flow.addAction('1.1.2', Delegate.create(this.chooseJob, this), '1.2.1');
	this.flow.addAction('1.2.1', Delegate.create(this.work, this), '1.2.2');
	this.flow.addAction('1.2.2', Delegate.create(this.points2, this), '1.3.1');
	this.flow.addAction('1.3.1', Delegate.create(this.points3, this), '1.3.2');
	this.flow.addAction('1.3.2', Delegate.create(this.getout, this), '1.3.3');
	this.flow.addAction('1.3.3', Delegate.create(this.playAdvice, this), '1.3.4');
	this.flow.addAction('1.3.4', Delegate.create(this.playAdvice, this), '1.3.5');
	this.flow.addAction('1.3.5', Delegate.create(this.chooseWayOut, this), {'A':'1.5.1', 'B':'2.1'}); 
	this.flow.addAction('1.5.1', Delegate.create(this.drunk, this), '1.5.2');
	this.flow.addAction('1.5.2', Delegate.create(this.points7, this), '1.6.1');
	this.flow.addAction('1.6.1', Delegate.create(this.constable, this), '1.6.2');
	this.flow.addAction('1.6.2', Delegate.create(this.report, this), '1.6.3');
	this.flow.addAction('1.6.3', Delegate.create(this.points6, this), '1.8');	
	this.flow.addAction('1.8', Delegate.create(this.backToPoorhouse, this), '2.1');
	this.flow.addAction('2.1', Delegate.create(this.recruimentOffice, this), '2.2.1');
	this.flow.addAction('2.2.1', Delegate.create(this.jobInterviewPart1, this), '2.2.2');
	this.flow.addAction('2.2.2', Delegate.create(this.chooseJobGermany, this), '2.2.3');
	this.flow.addAction('2.2.3', Delegate.create(this.jobInterviewPart2, this), '2.2.4');
	this.flow.addAction('2.2.4', Delegate.create(this.points8, this), '2.3');
	this.flow.addAction('2.3', Delegate.create(this.recruitementLetter, this), '2.4');
	this.flow.addAction('2.4', Delegate.create(this.points9, this), '2.5');
	this.flow.addAction('2.5', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);

	// this.id = 'svendborg';
	// console.log('FlowPoorhouse:setup', this.id);

	this.lib = gamelib;
	switch(this.id){
		case 'horsens':			
			// this.lib = horsensGameLib;
			Clss = this.lib.horsens;
			manifest = this.lib.properties.manifest;
		break;
		case 'sundholm':
			// this.lib = sundbyGameLib;
			Clss = this.lib.sundholm;
			manifest = this.lib.properties.manifest;
		break;
		case 'svendborg':	
			
			Clss = this.lib.svendborg;
			manifest = this.lib.properties.manifest;

		break;
	}
	
	// Load files
	var onFileLoad = function(event){
		if (event.item.type === 'image') { 
			images[event.item.id] = event.result; 
		}
	};
	var onLoadComplete = function(event){
		// Instantiate view
		self.view = new Clss();

		//Add
		self.container.addChild(self.view);

		// Set start page
		self.next();

		// console.log('FlowPoorhouse:onLoadComplete');
		self.dispatchEvent(new createjs.Event('ready'));
	};
	Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
};
FlowPoorhouse.prototype.next = function(){
	'use strict';

	// // Allow tick
	// Tick.enable();
	// Tick.framerate(Tick.high);

	this.flow.next(this.trigger);	
};
FlowPoorhouse.prototype.onComplete = function(event) {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
	}

	// Set next button active
	this.continueBtn.activate('next');	
};
FlowPoorhouse.prototype.onContinue = function(event) {
	'use strict';
	
	// console.log('FlowPoorhouse::onContinue');
	
	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Sound effect - stop
	this.soundEffectStop();

	this.next();

	// console.log('this.playerComponent:', this.playerComponent)
};
FlowPoorhouse.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowPoorhouse.prototype.destroy = function() {
	'use strict';
	
	// Remove events
	this.removeEvents();

	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
		this.playerComponent.destroy();	
		this.playerComponent = null;
	}			
	this.view = null;
	this.lib = null;
	this.currentPage = null;
	this.listeners = null;
	this.flow = null;
};
FlowPoorhouse.prototype.points1 = function(trigger) {
	'use strict';

	// Next move
	this.trigger = trigger;

	// 	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_0);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	this.currentPage.x = 0;
	PlayerStats.append('mood', -1);
	PlayerStats.append('health', 1);
	Topbar.pointsUpdate();
	
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.caretaker = function(trigger) {
	'use strict';

	var self = this;

	// Next move
	this.trigger = trigger;
	
	// Get sound
	var sound = SoundService.matrix['1.1.1'][this.id]; // E.g. this.id == 'svendborg'

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.caretaker;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){

		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(self.currentPage.player);

	// Desactivate continue button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.chooseJob = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosework;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Desactivate continue button
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
		Delegate.create(function(vo){
			// Save chosen 'job'
			PlayerStats.job = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);
};
FlowPoorhouse.prototype.work = function(trigger) {
	'use strict';

	var self = this;

	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	this.continueBtn.activate('skip');

	// Get sound
	var sound = SoundService.matrix[currentTrigger][this.id][PlayerStats.job]; // "svendborg/A"	
	// this.soundEffectPlay(SoundService.matrix.effects.woodchopper);
	
	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view['bg_1_2'+PlayerStats.job]);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.work;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Tick.framerate(Tick.low);

		// Sound	
		self.listeners.complete = this.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);

	}, this));

	// Reuse player component var for sound
	self.playerComponent = new PlayerSoundComponent(self.currentPage.player);

	// Nxt button
	self.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_3);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', -2);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.getout = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Get sound
	var sound = SoundService.matrix[currentTrigger];
	console.log(sound);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.getout;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	self.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.playAdvice = function(trigger) {
	'use strict';
	var self = this;
	var currentTrigger = this.trigger;
	
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;

	// Set new page out
	switch(currentTrigger){
		case '1.3.3': // Inmate
			this.currentPage = this.view.adviceinmate;	
		break;
		case '1.3.4': // Employee
			// Change background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_3_4);

			this.currentPage = this.view.adviceemployee;
		break;
	}	

	// Get sound
	var sound = SoundService.matrix[currentTrigger];
	
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Portrait
	// this.currentPage.portrait.gotoAndStop(this.id);

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.chooseWayOut = function(triggers) {
	'use strict';
	var self = this;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosewayout;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Desactivate continue button
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

		// Save chosen 'way out'
		PlayerStats.wayout = vo.value;
		self.trigger = triggers[PlayerStats.wayout]; // Set trigger due to choice!!

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);
};
FlowPoorhouse.prototype.drunk = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_5);

	// Get sound
	var sound = SoundService.matrix.drunk;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.drunk;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));


	// Portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.points7 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points7;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('mood', 1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.constable = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_6);

	// Get sound
	var sound = SoundService.matrix.constable;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.constable;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.report = function(trigger) {
	'use strict';
	var self = this;

	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.report;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Sound effect
	this.soundEffectPlay(SoundService.matrix.effects.typewriter);

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points6 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points6;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	// Next button
	this.continueBtn.activate('next');
};

FlowPoorhouse.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points4;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
			PlayerStats.append('mood', 1);
			Topbar.pointsUpdate();
		});

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points5 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Previous page out
	Transitions.transOutAlpha(this.currentPage);

	// Set new page out
	this.currentPage = this.view.points5;

	// New page in
	Transitions.transInPosition(this.currentPage, function(){
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
	});

	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.backToPoorhouse = function(trigger) {
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_8);

	// Get sound
	var sound = SoundService.matrix['1.8'];

	// Pages in/out
	var previousPage = this.currentPage;
	// this.currentPage = this.view.prerecruitment;
	this.currentPage = this.view.backtopoorhouse;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Next bnutton
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.preRecruitment = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Change background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_1_9);

	// Get sound
	var sound = SoundService.matrix.prerecruitment[this.id]; // "svendborg"

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.prerecruitment;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next bnutton
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.recruimentOffice = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.recruitementoffice;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Next in flow
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.jobInterviewPart1 = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_2);

	// Get sound
	var sound = SoundService.matrix['2.2.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.jobinterviewpart1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.chooseJobGermany = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosejob;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Next in flow
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
		Delegate.create(function(vo){

		// Save chosen 'first job in Germany'
		PlayerStats.job_germany[0] = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);
};
FlowPoorhouse.prototype.jobInterviewPart2 = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Get sound
	var sound = SoundService.matrix['2.2.3'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.jobinterviewpart2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next Button
	this.continueBtn.ghost('skip');
};
FlowPoorhouse.prototype.points8 = function(trigger){
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points8;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 2);
		PlayerStats.append('mood', 1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.recruitementLetter = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_3);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.recruitementletter;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Dropdowns
	var dropdown1 = new Dropdown(this.currentPage.dropdown);
	
	// Close dropdowns when entering the fullscreen button ... whih will happen every time you leave a dropdown
	var fullscreenButton = this.currentPage.fullscreenButton;
	var screenListener = fullscreenButton.on('mouseover', function(){
		dropdown1.setActive(false);
	});

	// Set name
	var frm = PlayerStats.challenge + PlayerStats.family;
	console.log('frm:', frm);
   	this.currentPage.realname.gotoAndStop(frm);

	// Next button
	this.continueBtn.activate('next');
};
FlowPoorhouse.prototype.points9 = function(trigger){
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points9;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		PlayerStats.append('mood', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	// Next button
	this.continueBtn.activate('next');
};
createjs.EventDispatcher.initialize(FlowPoorhouse.prototype);



var FlowGermany2 = function(container){
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.slideLib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '4.0'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.activate('next');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
}

FlowGermany2.prototype.start = function(){
	LoadJS.load(
		['../assets/logic/games/germany2.js'], 
		Delegate.create(this.setup, this)
	);
}
FlowGermany2.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	var self = this;
	this.id = 'germany2';

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('4.0', Delegate.create(this.chooseJobGermany, this), '4.1');
	this.flow.addAction('4.1', Delegate.create(this.recruitementLetter, this), '4.2');
	this.flow.addAction('4.2', Delegate.create(this.points1, this), '4.3');
	this.flow.addAction('4.3', Delegate.create(this.traveling, this), '4.5.1');
	this.flow.addAction('4.5.1', Delegate.create(this.work, this), '4.5.2');
	this.flow.addAction('4.5.2', Delegate.create(this.points2, this), '4.5.3');
	this.flow.addAction('4.5.3', Delegate.create(this.points3, this), '4.6.1');
	this.flow.addAction('4.6.1', Delegate.create(this.danskFront, this), '4.6.2');
	this.flow.addAction('4.6.2', Delegate.create(this.chooseParticipation, this), '4.6.3');
	this.flow.addAction('4.6.3', Delegate.create(this.points4, this), '4.7_split');
	this.flow.addAction('4.7', Delegate.create(this.warProgresses, this), '4.10.1');
	this.flow.addAction('4.7_split', Delegate.create(this.statsSplit, this), {type: 'health', threshold:4, triggers:['4.10.4', '4.10.1']});
	this.flow.addAction('4.10.1', Delegate.create(this.theBomb, this), '4.10.2');
	this.flow.addAction('4.10.2', Delegate.create(this.choose1, this), '4.10.3');
	this.flow.addAction('4.10.3', Delegate.create(this.points5, this), '4.10.7');
	this.flow.addAction('4.10.4', Delegate.create(this.illness, this), '4.10.5');
	this.flow.addAction('4.10.5', Delegate.create(this.choose2, this), '4.10.6');
	this.flow.addAction('4.10.6', Delegate.create(this.points6, this), '4.10.7');
	this.flow.addAction('4.10.7', Delegate.create(this.goingHome, this), '4.10.8');
	this.flow.addAction('4.10.8', Delegate.create(this.intermezzo, this), 'end');
	this.flow.addAction('end', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);


	// this.flow.addAction('4.11', 
	// 			Delegate.create(
	// 				Flow.statsSplit, this), {
	// 											type: 'health',
	// 											threshold:4, 
	// 											value: PlayerStats.health,
	// 											triggers:['4.10.4', '4.10.1'], 
	// 											callback: Delegate.create(this.next, this)
	// 										}
	// 							);

	try{
		// Load files for flow	
		this.lib = gamelib; //germany1GameLib;
		var Clss = this.lib.germany_2;
		var manifest = this.lib.properties.manifest;
		var onFileLoad = function(event){
			if (event.item.type === 'image') { 
				// console.log('result:', event.item.id, event.result);
				images[event.item.id] = event.result; 
			}
		};
		var onLoadComplete = function(event){
			// console.log('onLoadComplete');

			// Instantiate view
			self.view = new Clss();

			//Add
			self.container.addChild(self.view);

			// Set start page
			self.flow.next(self.trigger);

			self.dispatchEvent(new createjs.Event('ready'));
		};
		Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
	}catch(err) {
   		console.log(err);
   	}
};
FlowGermany2.prototype.next = function(){
	this.flow.next(this.trigger);
	
},
FlowGermany2.prototype.onContinue = function(event) {
	'use strict';
	// console.log('FlowGermany2::onContinue');	

	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Must be set after stopping player
	this.next();
};
FlowGermany2.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowGermany2.prototype.destroy = function() {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
		this.playerComponent.destroy();	
		this.playerComponent = null;
	}			
	this.view = null;
	this.lib = null;
	this.currentPage = null;
	this.listeners = null;
	this.flow = null;
};


// Util
FlowGermany2.prototype.statsSplit = function(vo) {
	var value = PlayerStats[vo.type];
	if(value <= vo.threshold){
		this.trigger = vo.triggers[0];
	}else{
		this.trigger = vo.triggers[1];
	}
	this.next();
}

// Pages ------------------------------------------------------------------------


FlowGermany2.prototype.chooseJobGermany = function(trigger){
	var self = this;

	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_0);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosejob;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Next in flow
	this.continueBtn.ghost('next');

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkboxA, this.currentPage.checkboxB, this.currentPage.checkboxC],
		['A', 'B', 'C'],
		Delegate.create(function(vo){

		// Save chosen 'second job in Germany'
		PlayerStats.job_germany[1] = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	// Disable checkbox
	CheckboxGroup.disableCheckbox(PlayerStats.job_germany[0]);
	this.currentPage['cbText'+PlayerStats.job_germany[0]].alpha = .2;
};
FlowGermany2.prototype.recruitementLetter = function(trigger){
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.recruitementletter;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Dropdowns
	var dropdown1 = new Dropdown(this.currentPage.dropdown);
	
	// Close dropdowns when entering the fullscreen button ... whih will happen every time you leave a dropdown
	var fullscreenButton = this.currentPage.fullscreenButton;
	var screenListener = fullscreenButton.on('mouseover', function(){
		dropdown1.setActive(false);
	});

	// Set name
	var frm = PlayerStats.challenge + PlayerStats.family;
	console.log('frm:', frm);
   	this.currentPage.realname.gotoAndStop(frm);

	// Next button
	this.continueBtn.activate('next');
};
FlowGermany2.prototype.points1 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('money', 1);
		PlayerStats.append('mood', 1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.traveling = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_3);
	
	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.traveling;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		try{
			// Load slide
			LoadJS.load(
				['../assets/logic/slides/slide_4_3.js'], 
				Delegate.create(function(){
					// Slide. Loading is self contained
					self.slideLib = slidelib;	
					self.playerComponent = new PlayerSliderComponent(self.currentPage.player); // Added delay of sound start (frame 14)
					self.listeners.complete = self.playerComponent.on('complete', function(event){
						self.continueBtn.activate('next');
					}, self);
					self.playerComponent.preload('slide_4_3', self.slideLib);
					self.continueBtn.activate('skip');
				}, self)
			);
		}catch(err){
			console.log(err);
		}
	}, this));

	// Ghost continue button
	self.continueBtn.ghost('skip');
};
FlowGermany2.prototype.work = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Get work related assets
	var slidePath, slideName;
	try{
		// Get path to slide script
		var combi = PlayerStats.job_germany[0]+PlayerStats.job_germany[1];
		slideName = 'slide_4_5_1_' + combi; // E.g. slide_4_5_1_AC
		slidePath = '../assets/logic/slides/'+slideName+'.js';
	}catch(err){
		console.log(err);
	}	

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_5_1);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.work;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		try{
			// Load slide
			LoadJS.load(
				[slidePath], 
				Delegate.create(function(){
					// Slide. Loading is self contained
					self.slideLib = slidelib;	
					self.playerComponent = new PlayerSliderComponent(self.currentPage.player);
					self.listeners.complete = self.playerComponent.on('complete', function(event){
						self.continueBtn.activate('next');
					}, self);
					self.playerComponent.preload(slideName, self.slideLib);
					self.continueBtn.activate('skip');
				}, self)
			);
		}catch(err){
			console.log(err);
		}
	}, this));

	// Ghost continue button
	self.continueBtn.ghost('skip');
};
FlowGermany2.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_5_2);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 2);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.danskFront = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_6);

	// Get sound
	var sound = SoundService.matrix['4.6.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.danskfront;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.chooseParticipation = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.chooseparticipation;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

		// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Save chosen 'advice'
			PlayerStats.nazi = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	this.continueBtn.ghost('next');
};
FlowGermany2.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points4;
	this.currentPage.gotoAndStop(PlayerStats.nazi);
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		switch(PlayerStats.nazi){
			case 'A':
				PlayerStats.append('mood', -1);
			break;
			case 'B':
				PlayerStats.append('mood', 1);
			break;
		}
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.warProgresses = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Get path to slide script
	var slideName = 'slide_4_7';
	var slidePath = '../assets/logic/slides/'+slideName+'.js';

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.warprogresses;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		try{
			// Load slide
			LoadJS.load(
				[slidePath], 
				Delegate.create(function(){
					// Slide. Loading is self contained
					self.slideLib = slidelib;	
					self.playerComponent = new PlayerSliderComponent(self.currentPage.player);
					self.listeners.complete = self.playerComponent.on('complete', function(event){
						self.continueBtn.activate('next');
					}, self);
					self.playerComponent.preload(slideName, self.slideLib);
					self.continueBtn.activate('skip');
				}, self)
			);
		}catch(err){
			console.log(err);
		}
	}, this));

	// Ghost continue button
	self.continueBtn.ghost('skip');
};
FlowGermany2.prototype.theBomb = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Got the bomb
	PlayerStats.bomb = true;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_1);

	// Get sound
	var sound = SoundService.matrix['4.10.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.thebomb;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.illness = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_4);

	// Get sound
	var sound = SoundService.matrix['4.10.4'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.illness;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.choose1 = function(trigger) {
	'use strict';
	var self = this;

	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choose1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

		// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Choice
			PlayerStats['4.10.2'] = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	this.continueBtn.ghost('next');
};
FlowGermany2.prototype.points5 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	var previousChoice = PlayerStats['4.10.2'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points5;
	this.currentPage.gotoAndStop(previousChoice);
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		switch(previousChoice){
			case 'A':
				PlayerStats.append('money', -2);
			break;
			case 'B':
				PlayerStats.append('money', 2);
			break;
		}
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.choose2 = function(trigger) {
	'use strict';
	var self = this;

	var currentTrigger = this.trigger;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choose1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

		// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Choice
			PlayerStats['4.10.5'] = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	this.continueBtn.ghost('next');
};
FlowGermany2.prototype.points6 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	var previousChoice = PlayerStats['4.10.5'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points5;
	this.currentPage.gotoAndStop(previousChoice);
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		switch(previousChoice){
			case 'A':
				PlayerStats.append('money', -1);
			break;
			case 'B':
				PlayerStats.append('money', 1);
			break;
		}
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany2.prototype.goingHome = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_7);

	// Get sound
	var sound = SoundService.matrix['4.10.7'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.goinghome;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany2.prototype.intermezzo = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_10_8);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = null;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Next
	this.continueBtn.activate('next');
};
createjs.EventDispatcher.initialize(FlowGermany2.prototype);
var FlowGermany1 = function(container){
	this.container = container;
	this.id = null; 
	this.view = null;	
	this.lib = null;
	this.slideLib = null;
	this.playerComponent = null;
	this.listeners = {};
	this.trigger = '2.5'; // Default start pointer
	this.currentPage = null;
	this.currentBackground = null;
	this.groups = {};

	this.continueBtn = ContinueButton;
	this.continueBtn.activate('next');

	// Events
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	
}

FlowGermany1.prototype.start = function(){
	LoadJS.load(
		['../assets/logic/games/germany1.js', '../assets/logic/slides/slide_2_5.js'], 
		Delegate.create(this.setup, this)
	);
}
FlowGermany1.prototype.setup = function(){
	'use strict';
	if(this.runonce != null)
		return;

	// Setup may run ONLY once
	this.runonce = true;

	var self = this;
	this.id = 'germany1';

	// Setup flow
	this.flow = new SubFlowController();
	this.flow.addAction('2.5', Delegate.create(this.traveling, this), '2.6.1');
	this.flow.addAction('2.6.1', Delegate.create(this.dormitry, this), '2.6.2');
	// this.flow.addAction('2.6.1', Delegate.create(this.dormitry, this), '2.11.1'); // TEST
	this.flow.addAction('2.6.2', Delegate.create(this.points1, this), '2.7.1');
	this.flow.addAction('2.7.1', Delegate.create(this.work, this), '2.7.2');
	this.flow.addAction('2.7.2', Delegate.create(this.points2, this), '2.7.3');
	this.flow.addAction('2.7.3', Delegate.create(this.points3, this), '2.8.1');
	this.flow.addAction('2.8.1', Delegate.create(this.getPaid, this), '2.8.2');
	this.flow.addAction('2.8.2', Delegate.create(this.chooseSpending, this), '2.9.1');
	this.flow.addAction('2.9.1', Delegate.create(this.points4, this), '2.9.2');
	this.flow.addAction('2.9.2', Delegate.create(this.facts, this), '2.10.1');
	this.flow.addAction('2.10.1', Delegate.create(this.chooseWhatNow, this), '2.10.2');
	this.flow.addAction('2.10.2', Delegate.create(this.whatNow, this), '2.10.3');
	this.flow.addAction('2.10.3', Delegate.create(this.points6, this), '2.11.1');
	this.flow.addAction('2.11.1', Delegate.create(this.homeComming, this), '3.0');
	this.flow.addAction('3.0', Delegate.create(
		function(){
			self.removeEvents();
			self.dispatchEvent(new createjs.Event('continue'));
		}, this)
	);


	try{
		// Load files for flow	
		this.lib = gamelib; //germany1GameLib;
		var Clss = this.lib.germany_1;
		var manifest = this.lib.properties.manifest;
		var onFileLoad = function(event){
			if (event.item.type === 'image') { 
				// console.log('result:', event.item.id, event.result);
				images[event.item.id] = event.result; 
			}
		};
		var onLoadComplete = function(event){
			// console.log('onLoadComplete');

			// Instantiate view
			self.view = new Clss();

			//Add
			self.container.addChild(self.view);

			// Set start page
			self.flow.next(self.trigger);

			self.dispatchEvent(new createjs.Event('ready'));
		};
		Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
	}catch(err) {
   		console.log(err);
   	}
	

	// console.log('manifest:', manifest);
};
// FlowGermany1.prototype.next = function(){
// 	'use strict';
// 	this.flow.next(this.trigger);	
// };
FlowGermany1.prototype.onContinue = function(event) {
	'use strict';
	console.log('FlowGermany1::onContinue');	

	// Stop player if any
	if(this.playerComponent != null){
		this.playerComponent.stop();
	}

	// Must be set after stopping player
	this.flow.next(this.trigger);
};
FlowGermany1.prototype.removeEvents = function() {
	'use strict';
	
	// Remove events
	this.continueBtn.off('click', this.listeners.continue);
	this.listeners.continue = null;
};
FlowGermany1.prototype.destroy = function() {
	'use strict';
	// Remove events
	if(this.playerComponent != null){
		this.playerComponent.off('complete', this.listeners.complete);	
		this.playerComponent.destroy();	
		this.playerComponent = null;
	}			
	this.view = null;
	this.lib = null;
	this.currentPage = null;
	this.listeners = null;
	this.flow = null;
};


// Pages ------------------------------------------------------------------------

FlowGermany1.prototype.traveling = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set page view
	this.currentPage = this.view.traveling;
	this.currentPage.x = 0;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_5);
	
	// Slide. Loading is self contained
	try{
		this.slideLib = slidelib;	
		this.playerComponent = new PlayerSliderComponent(this.currentPage.player);
		this.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		this.playerComponent.on('ready', function(event){
			event.remove();
			// No tick
			Tick.framerate(Tick.low);
			self.continueBtn.activate("skip");
		});
		this.playerComponent.preload('slide_2_5', this.slideLib);
	}catch(err){
		console.log(err);
	}
	this.continueBtn.activate('skip');
};
FlowGermany1.prototype.dormitry = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_6);


	// Get sound
	var sound = SoundService.matrix.dormitry;


	// Set portrait (NB. In background!)
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentBackground.portrait.gotoAndStop(frm);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.dormitry;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){

		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));


	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany1.prototype.points1 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points1;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		PlayerStats.append('mood', 1);
		PlayerStats.append('health', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.work = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Get work related assets
	var bg, slidePath, slideName;
	try{
		bg = this.view['bg_2_7'+PlayerStats.job_germany[0]]; // Index 0 is job choice for the first time in Germany [A,B,C]

		// Get path to slide script
		switch(PlayerStats.job_germany[0]){
			case 'A':
				slideName = 'slide_2_7_1_amory';
			break;
			case 'B':
				slideName = 'slide_2_7_1_mine';
			break;
			case 'C':
				slideName = 'slide_2_7_1_butcher';
			break;
		}
		slidePath = '../assets/logic/slides/'+slideName+'.js';
	}catch(err){
		console.log(err);
	}	

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, bg);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.work;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		try{
			// Load slide
			LoadJS.load(
				[slidePath], 
				Delegate.create(function(){
					// Slide. Loading is self contained
					self.slideLib = slidelib;	
					self.playerComponent = new PlayerSliderComponent(self.currentPage.player);
					self.listeners.complete = self.playerComponent.on('complete', function(event){
						self.continueBtn.activate('next');
					}, self);
					self.playerComponent.preload(slideName, self.slideLib);
					self.continueBtn.activate('skip');
				}, self)
			);
		}catch(err){
			console.log(err);
		}
	}, this));

	// Ghost continue button
	self.continueBtn.ghost('skip');
};
FlowGermany1.prototype.points2 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points2;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', 2);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.points3 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points3;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		PlayerStats.append('money', -1);
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.getPaid = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_8);

	// Get sound
	var sound = SoundService.matrix['2.8.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.getpaid;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));


	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = null;
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany1.prototype.chooseSpending = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosespending;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2, this.currentPage.checkbox3],
		['A', 'B', 'C'],
		Delegate.create(function(vo){

			// Save chosen 'advice'
			PlayerStats.spending = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	// Desactivate continue button
	this.continueBtn.ghost('next');
};
FlowGermany1.prototype.points4 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Get spending related assets
	var page, bg;
	try{
		bg = this.view['bg_2_9'+PlayerStats.spending];
		page = this.view['points4'+PlayerStats.spending];
	}catch(err){
		console.log(err);
	}	
	
	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, bg);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = page;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		console.log(PlayerStats.spending, page);
		switch(PlayerStats.spending){
			case 'A':
				PlayerStats.append('health', 1);
			break;
			case 'B':
				PlayerStats.append('mood', 1);
			break;
			case 'C':
				PlayerStats.append('mood', 1);
				PlayerStats.append('health', -1);
			break;
		}			
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	this.continueBtn.activate('next');
};
FlowGermany1.prototype.facts = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.facts;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));


	// Desactivate continue button
	this.continueBtn.activate('next');
};

FlowGermany1.prototype.chooseWhatNow = function(trigger) {
	'use strict';
	var self = this;

	// Next move
	this.trigger = trigger;

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosewhatnow;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	// Checkboxes
	CheckboxGroup.setup(
		[this.currentPage.checkbox1, this.currentPage.checkbox2],
		['A', 'B'],
		Delegate.create(function(vo){

			// Save chosen 'advice'
			PlayerStats.whatnow = vo.value;

			// Only first time a checkbox is clicked
			if(vo.clicked === 1){
				// User may continue
				self.continueBtn.activate('next');
				// Add listener to continue button
				self.listeners.continueClick = self.continueBtn.on('click', function(event){
					event.remove();
					// Clear checkboxes
					CheckboxGroup.clear();
				});
			}
		}, this)
	);

	// Desactivate continue button
	this.continueBtn.ghost('next');
};
FlowGermany1.prototype.whatNow = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_10);

	// Get sound
	var sound = SoundService.matrix['2.10.2'][PlayerStats.whatnow];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.whatnow;
	Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Frame A, B
	this.currentPage.gotoAndStop(PlayerStats.whatnow);

	// Set portrait
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Next
	this.continueBtn.ghost('skip');
};
FlowGermany1.prototype.points6 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;



	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.points6;
	this.currentPage.gotoAndStop(PlayerStats.whatnow);
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		switch(PlayerStats.whatnow){
			case 'A':
				PlayerStats.append('money', 1);
			break;
			case 'B':
				PlayerStats.append('money', -1);
			break;
		}			
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));
console.log('points6', PlayerStats.whatnow, this.currentPage);
	this.continueBtn.activate('next');
};
FlowGermany1.prototype.homeComming = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_11);

	// Get sound
	var sound = SoundService.matrix['2.11.1'];

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.homecomming;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		// Sound Player
		self.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.on('ready', function(event){
			self.continueBtn.activate('skip');
			Tick.framerate(Tick.low);
		}, self);
		self.playerComponent.preload(sound.src, sound.duration);
	}, this));

	// Reuse player component var for sound
	this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

	// Set portrait (NB. In background!)
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.currentPage.portrait.gotoAndStop(frm);

	// Ghost continue button
	self.continueBtn.ghost('skip');
};
FlowGermany1.prototype.points5 = function(trigger) {
	'use strict';
	// Next move
	this.trigger = trigger;

	// Get spending related assets
	var page;
	try{
		page = this.view['points5'+PlayerStats.whatnow];
	}catch(err){
		console.log(err);
	}	

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = page;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
		switch(PlayerStats.whatnow){
			case 'A':
				PlayerStats.append('money', 1);
			break;
			case 'B':
				PlayerStats.append('money', -1);
			break;
		}			
		Topbar.pointsUpdate();
		Tick.framerate(Tick.low);
	}, this));

	// Next
	this.continueBtn.activate('next');
};
FlowGermany1.prototype.intermezzo = function(trigger){
	'use strict';

	// Next move
	this.trigger = trigger;

	var self = this;

	// Set page view
	this.currentPage = this.view.intermezzo;
	this.currentPage.x = 0;

	// Set background
	this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_2_5);

	// Pages in/out
	var previousPage = this.currentPage;
	this.currentPage = this.view.choosewhatnow;
	Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
		Tick.framerate(Tick.low);
	}, this));

	
	// Slide. Loading is self contained
	try{
		this.slideLib = slidelib;	
		this.playerComponent = new PlayerSliderComponent(this.currentPage.player);
		this.listeners.complete = self.playerComponent.on('complete', function(event){
			self.continueBtn.activate('next');
			Tick.framerate(Tick.low);
		}, self);
		this.playerComponent.on('ready', function(event){
			event.remove();
			// No tick
			Tick.framerate(Tick.low);
			self.continueBtn.activate("skip");
		});
		this.playerComponent.preload('slide_2_5', this.slideLib);
	}catch(err){
		console.log(err);
	}
	this.continueBtn.activate('skip');
};
createjs.EventDispatcher.initialize(FlowGermany1.prototype);
var FlowEpilogue = function(container){

	return{
		currentPage:null,
		container: container,
		view: null,
		trigger: null, // Default start pointer
		continueBtn: ContinueButton,
		listeners: {},
		start: function(){
			'use strict';

			// Dispatcher
			createjs.EventDispatcher.initialize(this);

			// Events
			this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	

			this.id = 'epilogue';//PlayerStats.poorhouse;
			
			// PlayerStats['4.10.2']
			if(PlayerStats['4.10.2'] !== null && PlayerStats['4.10.2'] !== undefined){
				if(PlayerStats['4.10.2'] === 'A'){
					this.trigger = '4.11.3';
				}else
				if(PlayerStats['4.10.2'] === 'B'){
					this.trigger = '4.11.1';
				}

			// PlayerStats['4.10.5']
			}else{
				if(PlayerStats['4.10.5'] === 'A'){
					this.trigger = '4.11.2';
				}else
				if(PlayerStats['4.10.5'] === 'B'){
					this.trigger = '4.11.4';
				}
			}

			LoadJS.load(
				['../assets/logic/games/epilogue.js'], 
				Delegate.create(this.setup, this)
			);
		},
		next: function(){
			// console.log('next: ', this.flow);
			this.flow.next(this.trigger);
			
		},
		setup: function(){
			'use strict';
			if(this.runonce != null)
				return;

			var self = this;

			// Setup may run ONLY once
			this.runonce = true;

			// Setup flow
			this.flow = new SubFlowController();
			this.flow.addAction('4.11.1', Delegate.create(this.compensation, this), '4.12');
			this.flow.addAction('4.11.2', Delegate.create(this.illness, this), '4.12');
			this.flow.addAction('4.11.3', Delegate.create(this.runAway, this), '4.12');
			this.flow.addAction('4.11.4', Delegate.create(this.hippopotimus, this), '4.12');
			this.flow.addAction('4.12', Delegate.create(this.outro, this), 'end');
			this.flow.addAction('end', Delegate.create(
				function(){
					self.removeEvents();
					self.dispatchEvent(new createjs.Event('continue'));
				}, this)
			);

			try{
				// Load files for flow	
				this.lib = gamelib; //germany1GameLib;
				var Clss = this.lib.epilogue;
				var manifest = this.lib.properties.manifest;
				var onFileLoad = function(event){
					if (event.item.type === 'image') { 
						// // console.log('result:', event.item.id, event.result);
						images[event.item.id] = event.result; 
					}
				};
				var onLoadComplete = function(event){
					// // console.log('onLoadComplete');

					// Instantiate view
					self.view = new Clss();

					//Add
					self.container.addChild(self.view);

					// Set start page
					self.flow.next(self.trigger);

					self.dispatchEvent(new createjs.Event('ready'));
				};
				Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');
			}catch(err) {
		   		// console.log(err);
		   	}
		},
		onContinue: function(event) {
			'use strict';
			// console.log('FlowEpilogue::onContinue');	

			// Stop player if any
			if(this.playerComponent != null){
				this.playerComponent.stop();
			}

			// Must be set after stopping player
			this.next();
		},		
		removeEvents: function() {
			'use strict';
			
			// Remove events
			this.continueBtn.off('click', this.listeners.continue);
			this.listeners.continue = null;
		},
		restart: function(){
			'use strict';
			this.currentPage = null;
		},
		destroy: function(){
			'use strict';
			this.currentPage = null;
			this.flow.destroy();
			this.flow = null;
			this.container = null;
			this.currentBackground = null;
			this.trigger = null;
			this.view = null;
			if(this.playerComponent != null)
				this.playerComponent.destroy();
			this.playerComponent = null;
		},

		// Pages --------------------------------------------------------------------------------------------------------
		compensation: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_11_1);

			// Get sound
			var sound = SoundService.matrix['4.11.1'];

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.compensation;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				//// console.log(self.playerComponent)
				// Sound Player
				self.listeners.complete = self.playerComponent.on('complete', function(event){
					self.continueBtn.activate('next');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.preload(sound.src, sound.duration);
			}, this));

			// Set portrait
			var frm = PlayerStats.challenge + PlayerStats.family;
			this.currentPage.portrait.gotoAndStop(frm);

			// Reuse player component var for sound
			this.playerComponent = null;
			this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

			// Next
			this.continueBtn.ghost('skip');
		},
		illness: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_11_2);

			// Get sound
			var sound = SoundService.matrix['4.11.2'];

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.compensation;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				// Sound Player
				self.listeners.complete = self.playerComponent.on('complete', function(event){
					self.continueBtn.activate('next');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.preload(sound.src, sound.duration);
			}, this));

			// Set portrait
			var frm = PlayerStats.challenge + PlayerStats.family;
			this.currentPage.portrait.gotoAndStop(frm);

			// Reuse player component var for sound
			this.playerComponent = null;
			this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

			// Next
			this.continueBtn.ghost('skip');
		},
		runAway: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_11_3);

			// Get sound
			var sound = SoundService.matrix['4.11.3'];

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.runaway;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				//// console.log(self.playerComponent)
				// Sound Player
				self.listeners.complete = self.playerComponent.on('complete', function(event){
					self.continueBtn.activate('next');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.preload(sound.src, sound.duration);
			}, this));

			// Set portrait
			var frm = PlayerStats.challenge + PlayerStats.family;
			this.currentPage.portrait.gotoAndStop(frm);

			// Reuse player component var for sound
			this.playerComponent = null;
			this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

			// Next
			this.continueBtn.ghost('skip');
		},
		hippopotimus: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;

			// Set background
			this.currentBackground = Transitions.changeBackground(this.currentBackground, this.view.bg_4_11_4);

			// Get sound
			var sound = SoundService.matrix['4.11.4'];

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.hippopotimus;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'alpha'}, Delegate.create(function(){
				//// console.log(self.playerComponent)
				// Sound Player
				self.listeners.complete = self.playerComponent.on('complete', function(event){
					self.continueBtn.activate('next');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.preload(sound.src, sound.duration);
			}, this));

			// Set portrait
			var frm = PlayerStats.challenge + PlayerStats.family;
			this.currentPage.portrait.gotoAndStop(frm);

			// Reuse player component var for sound
			this.playerComponent = null;
			this.playerComponent = new PlayerSoundComponent(this.currentPage.player);

			// Next
			this.continueBtn.ghost('skip');
		},

		outro: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;


			// Next
			this.continueBtn.ghost('skip');
		},


	};	
}
var Topbar = {
	view: null,
	soundController: null,
	init: function(view){
		// console.log('Topbar::init', view);
		if(view === undefined || view === null){
			throw new Error("'view' is undefined");
		}
		this.view = view;	

		HUDController.init();	
	},
	go: function(frm){
		// console.log('Topbar:',this.view);
		// this.view.label_intro.x = 564 + 300;
		// createjs.Tween.get(this.view.label_intro)
		// 	.to({x:564}, 300, createjs.Ease.backIn);

		if(this.view === undefined || this.view === null){
			throw new Error("'view' is undefined");
		}
		this.view.gotoAndStop(frm);

		// Setup for game related to user's choices
		if(frm === 'game'){
			this.view.photo.gotoAndStop(PlayerStats.challenge + PlayerStats.family);
			this.view.realname.gotoAndStop(PlayerStats.challenge + PlayerStats.family);
			this.view.nickname.gotoAndStop(PlayerStats.nickname - 1);

			// Points
			HUDController.setView(this.view.hud);
		}
	},
	pointsUpdate: function(){
		try{
			HUDController.update();
		}catch(err){
			console.log(err);			
		}		
	},
	show: function(){
		this.view.visible = true;
	},
	hide: function(){
		this.view.visible = false;	
	}
}
'use strict';
var TweenUtil = {
	to: function(element, options, delay, delegate){
		createjs.Tween.get(element)
			.to(options, delay, createjs.Ease.linear)
			.call(function(){
				if(delegate !== undefined){
					delegate();
				}
			})
	}
}
var Transitions = {
	inOut: function(inObj, outObj, delegate){
		// For checking done of in/out tween
		var left = 0;
		
		//console.log(outObj.element)
		(inObj.element !== null) ? left++ : console.log('inObj::none');
		(outObj.element !== null) ? left++ : console.log('outObj::none');

		var checkDone = function(left){
			// console.log('checkDone', left)
			if(left == 0){
				if(delegate !== null){
					delegate();
				}
			}
		}
		// Previous page out
		switch(outObj.prop){
			case 'pos': 
				this.transOutPosition(outObj.element, function(){
					checkDone(--left);
				});
			break;
			case 'alpha': 
				this.transOutAlpha(outObj.element, function(){
					checkDone(--left);
				});
			break;
		}
		// New page in
		switch(inObj.prop){
			case 'pos': 
				this.transInPosition(inObj.element, function(){
					checkDone(--left);
				});
			break;
			case 'alpha': 
				this.transInAlpha(inObj.element, function(){
					checkDone(--left);
				});
			break;
		}
		
	},
	transInPosition: function(pageView, callback){
		if(pageView === null || pageView === undefined)
			return;

		// New page in
		pageView.visible = true;
		pageView.alpha = 1;
		pageView.x = 1024;
		createjs.Tween.get(pageView)
			.to({x:0}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transOutPosition: function(pageView, callback){
		if(pageView === null || pageView === undefined)
			return;

		// New page in
		createjs.Tween.get(pageView)
			.to({x:-1024}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
					pageView.visible = false;
				}
			});
	},
	transInAlpha: function(pageView, callback){
		if(pageView === null || pageView === undefined)
			return;

		// New page in
		pageView.visible = true;
		pageView.alpha = 0;
		pageView.x = 0;
		createjs.Tween.get(pageView)
			.to({alpha:1}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transOutAlpha: function(pageView, callback){
		if(pageView === null || pageView === undefined)
			return;
		
		// New page in
		createjs.Tween.get(pageView)
			.to({alpha:0}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	changeBackground: function(oldView, newView){
		try{
			if(oldView !== null && oldView !== undefined){
				oldView.x = 1024;
				oldView.visible = false;
			}
		}catch(err) {
			console.log(err);
		}
		try{
			newView.x = 0;
			newView.visible = true;
		}catch(err) {
			console.log(err);
		}
		return newView;
	}
}
var Tick = {
	defaultDelay: 100,
	stage: null,
	enabled: false,
	debug: false,
	low: 4,
	medium: 8,
	high: 15,
	perfect: 24,
	init: function(stage, framerate){
		this.stage = stage;
		// createjs.Ticker.setFPS(framerate);
		this.framerate(framerate);
		enabled = false;
	},
	framerate: function(framerate){
		// console.log('framerate', framerate);
		createjs.Ticker.framerate = framerate;
	},
	enable: function(){		
		if(enabled)
			return false;

		// console.log('enable');

		createjs.Ticker.removeEventListener('tick', self.stage); // Handbreak. Remove handler before setting again
		createjs.Ticker.addEventListener('tick', this.stage);
		if(this.debug){
			createjs.Ticker.addEventListener('tick', this.foo);
		}
		enabled = true;
	},
	disable: function(delay){		
		// console.log('disable');
		if(delay === undefined){
			delay = this.defaultDelay;
		}

		var self = this;
		setTimeout(function(){
			// Hand break. Hdnles enable/disable conflicts due tp timer
			if(enabled)
				return false;

			createjs.Ticker.removeEventListener('tick', self.stage);

			if(self.debug){
				createjs.Ticker.removeEventListener('tick', self.foo);
			}
		}, delay);

		enabled = false;
	},
	resume: function(){
		createjs.Ticker.paused = false;
	},
	pause: function(){
		createjs.Ticker.paused = true;
	},
	foo: function(event){
		// console.log(createjs.Ticker.framerate);
		// // console.log(event.paused,
	 //         createjs.Ticker.getTime(false),
	 //         createjs.Ticker.getTime(true));
	}
}
var TextField = function(){

} 
TextField.create = function(type, text, fontsize, color, fontface, fontWeight){

	if(!fontWeight)
	 var fontWeight = '';

	var tf = new createjs.Text();
	// tf.lineWidth = 490;

	tf.font = fontWeight+fontsize+'px '+fontface;
	tf.color = color;
	tf.text = text;
	return tf;
}
TextField.createBmp = function(id, text, fontsize, color){
	var bmptxt = Font.create(id, fontsize, text);
	if(color)
		bmptxt.setColor(color);
	return bmptxt;
}
// Math
Math.range = function(min, max){
	'use strict';
	return Math.random() * (max - min) + min;
}
Math.rangeInt = function(min, max){
	'use strict';
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Preloader = {
	id: 0,
	imagePath: 'assets/images/preloader.gif',
	tracker: {},


	load: function(manifest, handleFileLoad, handleComplete, clss, keep, factor){
		'use strict';
		this.id++;
		
		// FIXME
		// Should not happen trying to load an empty manifest
		// If nothing to load exit 
		if(manifest.length === 0){
			handleComplete(null);
			return;
		}

		// (factor === undefined) ? this.factor = 1 : this.factor = factor;
		// if(clss === undefined) clss = 'small';

		this.tracker[this.id] = false;

		var self = this;

		var loader = new createjs.LoadQueue(true);
		loader.id = this.id;
		(keep === undefined) ? loader.keepPreloader = false : loader.keepPreloader = keep;
		if(handleFileLoad != null)
			loader.addEventListener('fileload', function(event){
				if(handleFileLoad != null){
					handleFileLoad(event);
				}				
			});		
			loader.addEventListener('complete', function(event){
				var id = event.target.id;
				self.tracker[id] = true;
				if(handleComplete != null){
					handleComplete(event);
				}	
				
				PreloadGFX.hide();
			});
			loader.addEventListener('progress', function(event){
				PreloadGFX.showProgress(event.loaded);
			});	
			loader.addEventListener('error', function(event){
				console.log('Preloader:error', event);
			});	
		manifest = Path.adjustManifest(manifest);
		loader.loadManifest(manifest);

		PreloadGFX.show();
	}
};
PreloadGFX = {
	blocker: null,
	shown: 0,
	preloader: null,
	show: function(progress){
		this.shown++;		

		(progress === undefined || progress === null)? progress = true : progress = progress;
		
		if(this.preloader !== undefined && this.preloader !== null){
			console.log('show', this.preloader.visible);
			this.preloader.visible = true;
			if(progress)
				this.preloader.progress_bar.visible = true;
			else
				this.preloader.progress_bar.visible = false;
		}

		if(PreloadGFX.blocker !== null && progress){
			PreloadGFX.blocker.visible = true;
			PreloadGFX.blocker.alpha = .3;	
		}		
	},
	hide: function(){
		this.shown--;

		if(this.preloader !== undefined && this.preloader !== null){
			console.log('hide', this.shown);
			if(this.shown == 0)
				this.preloader.visible = false;
		}
		if(PreloadGFX.blocker !== null)
			PreloadGFX.blocker.visible = false;
	},
	showProgress: function(progress){
		if(this.preloader !== undefined && this.preloader !== null){
			this.preloader.progress_bar.bar.scaleX = progress;
		}
	}
}
var Path = {
	adjustManifest: function(manifest){
		for(var i in manifest){
			if(typeof manifest[i] === 'object'){
				if(!manifest[i].adjusted){
					manifest[i].src = this.adjustUrl(manifest[i].src);
					manifest[i].adjusted = true
				}
			}
		}
		return manifest;
	},
	adjustUrl: function(url){
		var newUrl = Environment.basePath() + url.replace(/\.\.\//g, '');
		// console.log(url, '|', newUrl);
		return newUrl;
	}
}
var LoadJS = {
	cache: [],
	load: function(urls, delegate, location){
		'use strict';
		var urlList = [];
		var tmpList = [];

		PreloadGFX.show();

		// $('.preload-wrapper').removeClass('hide');
		// $('.preload-wrapper').addClass('show');
		// $('.preload-wrapper').addClass('full');
		// $('.preloader').addClass('full');
		
		//url is URL of external file, code is the code
	    //to be called from the file, location is the location to 
	    //insert the <script> element

	    var counter = 0;
	    var tracker = {};

	    if(typeof urls === 'string'){
	    	tmpList = urls.split(',');
	    }else{
	    	tmpList = urls;
	    }

	    // Through list of files requested to be loaded
    	for(var k=0; k<tmpList.length; k++){	
    		var may = true;
			for(var b = 0; b<this.cache.length; b++){
				if(this.cache[b] === tmpList[k]){
					may == false;
					break;
				}				
			}
			if(may){
				urlList.push(Path.adjustUrl(tmpList[k]));
			}
    	}

	    if(location == null)
	    	location = document.body;

	    for(var i=0; i<urlList.length; i++){

    		// console.log(this.cache);
    		this.cache.push(urlList[i]);

		    var scriptTag = document.createElement('script');		    
		    // console.log(urlList[i]);

		    scriptTag.onload = scriptTag.onreadystatechange = function(event){
		    	counter++;

		    	// Split the path of the laoded file. Get the 2 last entries
		    	var arr = event.target.src.split('/');
		    	var identifier1 = arr[arr.length-2] +'/'+arr[arr.length-1];

		    	// Track which file is loaded
		    	tracker[identifier1] = true;

		    	// Through list of files requested to be loaded
		    	for(var a=0; a<urlList.length; a++){		    		

		    		// Split the path of the file requsted to be loaded. Get the 2 last entries
		    		var arr2 = urlList[a].split('/');
		    		var identifier2 = arr2[arr2.length-2] +'/'+arr2[arr2.length-1];

		    		// Check if the file requested to be loaded match the one of those loaded
		    		// If one is still not loaded then leave
					if(tracker[identifier2] !== true){
						// console.log('LoadJS:onload', urlList[a]);
						// this.cache.push(urlList[a]);
						return false;
					}
		    	}

		    	// Reached this? All files are loaded
		    	delegate();
		    	PreloadGFX.hide();

		  //   	$('.preload-wrapper').addClass('hide');
				// $('.preload-wrapper').removeClass('show');
		    };

		    scriptTag.src = urlList[i];
		    location.appendChild(scriptTag);
		    // location.removeChild(scriptTag);  
	    }	    
	}	
};
var Font = {
	BIGNOODLE: 'BigNoodleTitling',
	
	// AMERICANTYPEWRITER: 'americantypewriter',
	// xml: {},
	// images: {},
	// bitmapfonts: {},
	// init: function(){
	// 	'use strict';
	// 	this.xml = {};
	// 	this.images = {};
	// 	this.bitmapfonts = {};	
	// },
	// register: function(id, size){
	// 	'use strict';
	// 	var key = id;//+'_'+size;
	// 	this.bitmapfonts[key] = new BitmapFont(this.images[id], this.xml[id], size);
	// 	BitmapTextField.registerBitmapFont(this.bitmapfonts[id], id);
	// },
	// create: function(id, size, text){
	// 	'use strict';
	// 	var key = id;//+'_'+size;
	// 	var bitmapText = new BitmapTextField(800,100,text,key,size,0,0,'left','top',true);
	// 	// var bitmapText = new BitmapTextField(200,100,'Bitmap text','cooper',-1,0,0,'left','top',true);
	// 	return bitmapText;
	// }
};
var Flow = {
	statsSplit: function(vo) {
		if(vo.type == 'bool'){
			if(vo.value !== vo.threshold){
				this.trigger = vo.triggers[0];
			}else{
				this.trigger = vo.triggers[1];
			}
		}else{
			if(vo.value < vo.threshold){
				this.trigger = vo.triggers[0];
			}else{
				this.trigger = vo.triggers[1];
			}
		}
		
		vo.callback();
		//this.flow.next(this.trigger);
	}
}
/**
	A facade to browser detection method
	Wrapped in order to enable change of lib if nessesary
*/
var Environment = {	
	gameBasePath: '/assets/game/',
	data: null,
	browser: {},
	os: null,
	dimensions: {},
	ratioValue: null,
	init: function(){
		'use strict';
		var data = browserDetection();
		this.browser.name = data.browser.toLowerCase();
		this.browser.version = data.version;
		this.browser.firefox = (this.browser.name === 'firefox');
		this.os = data.os;
		this.dimensions.w = window.innerWidth;
		this.dimensions.h = window.innerHeight;
		
		var cr = function(){
			var ctx = document.createElement('canvas').getContext('2d'),
	        dpr = window.devicePixelRatio || 1,
	        bsr = ctx.webkitBackingStorePixelRatio ||
	              ctx.mozBackingStorePixelRatio ||
	              ctx.msBackingStorePixelRatio ||
	              ctx.oBackingStorePixelRatio ||
	              ctx.backingStorePixelRatio || 1;
	    	return dpr / bsr;
		}
		this.ratio = cr();

		var wf = function(){
			return Environment.dimensions.w / 1024;
		}
		this.winScale = wf();
	},
	basePath: function(){		
		// console.log('this.gameBasePath', this.gameBasePath);
		if(this.gameBasePath === undefined)
			this.gameBasePath = '/'; // Default local usage
		return this.gameBasePath;
	}
};
'use strict';
var Delegate = {	
	create: function (func, target) {
		'use strict';
	    return function() { 
	    	try{
	    		return func.apply(target, arguments);	
	    	}catch(err){
			   console.log(err);
			}
	    }
	}
};
var Canvas = {
	create: function(w, h, ratio) {	
		var winScale = Environment.winScale;
		if(winScale > 1) winScale = 1;

	    var canvas = document.createElement('canvas');
	    canvas.width = w * ratio;
	    canvas.height = h * ratio;
	    canvas.style.width = w * winScale + 'px';
	    canvas.style.height = h * winScale + 'px';
	    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);	
	    return canvas;
	}
}
// Array
// Shuffle array and indicate correct index
Array.prototype.shuffle = function(index){
	var correctAnswer = this[index];
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x)
    
    // Find correct answer's index in array
    for(var a=0; a<this.length; a++){
    	if(correctAnswer == this[a]){
    		this.correct = a;
    		break;
    	}	    
    }
    return this;
}
var SoundService = {
	init: function(){
		'use strict';
		console.log('SoundService.init');
		var recursive = function(obj){
			for (var i in obj) {
				if(typeof obj[i] === 'object'){
					// console.log(obj[i].src);
					if(obj[i].src !== undefined){
						obj[i].src = SoundService.basePath() + obj[i].src;
					}
					recursive(obj[i]);
				}
			};
		}
		recursive(this.matrix);
	},
	getSlideDurationById: function(id){
		'use strict';
		return this.matrix.slides[id].duration;
	},
	getSlideSoundpathById: function(id){
		'use strict';
		return SoundService.properties.slidePath + id+'.mp3';
	},
	getSlideSoundById: function(id){
		'use strict';
		return SoundService.matrix.slides[id]
	},
	basePath: function(){
		'use strict';
		return Environment.basePath() + 'assets/sounds/';
	},
	matrix: {
		effects: {
			typewriter: { src:'typewriter.mp3', volume: 0.4 },
			woodchopper: { src:'1.2.1_hugbraende_lydeffekt.mp3' }
		},
		'1.1.1' :{
			horsens: { src:'1.1.1_horsens.mp3' },
			sundholm: { src:'1.1.1_sundholm.mp3' },
			svendborg: { src:'1.1.1_svendborg.mp3' }
		},
		points: {
			plus: { src:'Point_plus.mp3' },
			minus: { src:'Point_minus.mp3' }
		},
		dormitry: { src:'2.6.1.mp3' },
		drunk: { src:'1.5.1.mp3' },
		constable: { src:'1.6.1.mp3' },
		'1.2.1': {
			'horsens': {
							'A': { src:'1.1.2_pashaven.mp3' },
							'B': { src:'1.1.2_goerrent.mp3' },
							'C': { src:'1.1.2_fletmaatter.mp3' }
						},
			'sundholm': {
							'A': { src:'1.1.2_hugbraende.mp3' },
							'B': { src:'1.1.2_pasgrise.mp3' },
							'C': { src:'1.1.2_skaerver.mp3' }						
						},
			'svendborg': {
							'A': { src:'1.1.2_skaerver.mp3' },
							'B': { src:'1.1.2_vaevmaatter.mp3' },
							'C': { src:'1.1.2_pilorm.mp3' }
						},
		},
		'1.3.2': { label:'wants out', src:'1.3.2.mp3' },
		'1.3.3': { label:'inmate', src:'1.3.3_indsat.mp3' },
		'1.3.4': { label:'employee', src:'1.3.4.mp3' },	
		'1.8': { label:'arrested', src:'1.8.mp3' },	
		'2.2.1': { src:'2.2.1.mp3' },
		'2.2.3': { src:'2.2.3.mp3' },
		'2.8.1': { description:'get paid', src:'2.8.1.mp3' },
		// '2.10.1': { description:'what now', src:'2.10.1_kontraktudlob.mp3' },
		'2.10.2': {
			'A': { description:'Finnish contract', src:'2.10.2.a.mp3' },
			'B': { description:'Go home', src:'2.10.2.b.mp3' }
		},
		'2.11.1': { description:'home comming', src:'2.11.1.mp3' },
		
		slides: {
					'slide_0_1': { src:'film01medmusik_mixdown.mp3' },
					'slide_1_0_1': { src:'film10_mixdown.mp3' },
					'slide_2_5': { src:'2.5_mixdown.mp3' },
					'slide_2_7_1_amory': { src:'2.7.1.vaaben_mixdown.mp3' },
					'slide_2_7_1_butcher': { src:'2.7.1.slagt_mixdown.mp3' },
					'slide_2_7_1_mine': { src:'2.7.1.mine_mixdown.mp3' },
					// 'slide_home1A': { src:'2.7.1.vaaben_mixdown.mp3' },
					// 'slide_home1B': { src:'slide_home1_B.mp3' },
					'slide_3_0': { src:'3.0_mixdown.mp3' },
					'slide_4_3': { src:'4.3_mixdown.mp3' },
					'slide_4_5_1_AB': { src:'4.5.1.mine_mixdown.mp3' },
					'slide_4_5_1_AC': { src:'4.5.1hud_efter_vaaben_mixdown.mp3' },
					'slide_4_5_1_BA': { src:'4.5.1.vaaben_efter kul_mixdown.mp3' },
					'slide_4_5_1_BC': { src:'4.5.1hud_efter_mine_mixdown.mp3' },
					'slide_4_5_1_CA': { src:'4.5.1.vaaben_efter hud_mixdown.mp3' },
					'slide_4_5_1_CB': { src:'4.5.1.mine_mixdown.mp3' },
					'slide_4_7': { src:'4.7_mixdown.mp3' }				
				},
		'0.4': { // oppinion
				'AD': { label: 'alkoholiker', src:'0.4_forvalteren.mp3' },
				'AE': { label: 'alkoholiker, børn', src:'0.4_datter.mp3' },
				'AF': { label: 'alkoholiker', src:'0.4_forvalteren.mp3' },
				'BD': { label: 'dovenskab', src:'0.4_kone.mp3' },
				'BE': { label: 'dovenskab, børn', src:'0.4_datter.mp3' },
				'BF': { label: 'dovenskab', src:'0.4_andenindlagt.mp3' },
				'CD': { label: 'svækkelse', src:'0.4_kone.mp3' },
				'CE': { label: 'svækkelse, børn', src:'0.4_datter.mp3' },
				'CF': { label: 'svækkelse', src:'0.4_andenindlagt.mp3' }
			},
		'3.2.1': {
			'horsens': {
							'A': { src:'1.1.2_pashaven.mp3' },
							'B': { src:'1.1.2_goerrent.mp3' },
							'C': { src:'1.1.2_fletmaatter.mp3' }
						},
			'sundholm': {
							'A': { src:'1.1.2_hugbraende.mp3' },
							'B': { src:'1.1.2_pasgrise.mp3' },
							'C': { src:'1.1.2_skaerver.mp3' }						
						},
			'svendborg': {
							'A': { src:'1.1.2_skaerver.mp3' },
							'B': { src:'1.1.2_vaevmaatter.mp3' },
							'C': { src:'1.1.2_pilorm.mp3' }
						},
		},
		'3.3' : {
			'horsens': { src:'3.3.horsens.svendborg.mp3' },
			'sundholm': { src:'3.3.sundholm.mp3' },
			'svendborg': { src:'3.3.horsens.svendborg.mp3' }
		},
		'3.4.1': { label:'employee', src:'3.4.1.mp3' },
		'3.4.2': { label:'inmate', src:'3.4.2.mp3' },
		'3.7.1': { label:'work over', src:'3.7.1.mp3' },
		'4.6.1': { label:'dansk front', src:'4.6.1.mp3' },
		'4.10.1': { label:'bombe', src:'4.10.1.mp3' },
		'4.10.4': { label:'illness', src:'4.10.4.mp3' },
		'4.10.7': { label:'going home', src:'4.10.7.mp3' },
		'4.11.1': { label:'post script', src:'14_11_1efterskrift_red_musik.mp3' },
		'4.11.2': { label:'post script',src:'14_11_2efterskrift_red_musik.mp3' },
		'4.11.3': { label:'post script',src:'14_11_3efterskrift_red_musik.mp3' },
		'4.11.4': { label:'post script',src:'14_11_4efterskrift_red_musik.mp3' },
	}
}

// console.log('SoundService');
// var SoundService = function(){
// 	'use strict';
// }
// SoundService.init = function(){
// 	console.log('SoundService.init');
// 	var recursive = function(obj){
// 		for (var i in obj) {
// 			if(typeof obj[i] === 'object'){
// 				// console.log(obj[i].src);
// 				if(obj[i].src !== undefined){
// 					obj[i].src = SoundService.basePath() + obj[i].src;
// 				}
// 				recursive(obj[i]);
// 			}
// 		};
// 	}
// 	recursive(this.matrix);
// };

// SoundService.getSlideDurationById = function(id){
// 	'use strict';
// 	return this.matrix.slides[id].duration;
// };
// SoundService.getSlideSoundpathById = function(id){
// 	'use strict';
// 	return SoundService.properties.slidePath + id+'.mp3';
// };
// SoundService.getSlideSoundById = function(id){
// 	'use strict';
// 	return SoundService.matrix.slides[id]
// };
// SoundService.getSoundByCharacter = function(character){
// 	'use strict';
// 	return;
// };

// SoundService.basePath = function(){
// 	return Environment.basePath() + 'assets/sounds/';
// 	// return 'assets/game/assets/sounds/';
// };

// SoundService.matrix = {
// 	effects: {
// 		typewriter: { src:'typewriter.mp3', volume: 0.4 },
// 		woodchopper: { src:'1.2.1_hugbraende_lydeffekt.mp3' }
// 	},
// 	'1.1.1' :{
// 		horsens: { src:'1.1.1_horsens.mp3' },
// 		sundholm: { src:'1.1.1_sundholm.mp3' },
// 		svendborg: { src:'1.1.1_svendborg.mp3' }
// 	},
// 	points: {
// 		plus: { src:'Point_plus.mp3' },
// 		minus: { src:'Point_minus.mp3' }
// 	},
// 	dormitry: { src:'2.6.1.mp3' },
// 	drunk: { src:'1.5.1.mp3' },
// 	constable: { src:'1.6.1.mp3' },
// 	'1.2.1': {
// 		'horsens': {
// 						'A': { src:'1.1.2_pashaven.mp3' },
// 						'B': { src:'1.1.2_goerrent.mp3' },
// 						'C': { src:'1.1.2_fletmaatter.mp3' }
// 					},
// 		'sundholm': {
// 						'A': { src:'1.1.2_hugbraende.mp3' },
// 						'B': { src:'1.1.2_pasgrise.mp3' },
// 						'C': { src:'1.1.2_skaerver.mp3' }						
// 					},
// 		'svendborg': {
// 						'A': { src:'1.1.2_skaerver.mp3' },
// 						'B': { src:'1.1.2_vaevmaatter.mp3' },
// 						'C': { src:'1.1.2_pilorm.mp3' }
// 					},
// 	},
// 	'1.3.2': { label:'wants out', src:'1.3.2.mp3' },
// 	'1.3.3': { label:'inmate', src:'1.3.3_indsat.mp3' },
// 	'1.3.4': { label:'employee', src:'1.3.4.mp3' },	
// 	'1.8': { label:'arrested', src:'1.8.mp3' },	
// 	'2.2.1': { src:'2.2.1.mp3' },
// 	'2.2.3': { src:'2.2.3.mp3' },
// 	'2.8.1': { description:'get paid', src:'2.8.1.mp3' },
// 	// '2.10.1': { description:'what now', src:'2.10.1_kontraktudlob.mp3' },
// 	'2.10.2': {
// 		'A': { description:'Finnish contract', src:'2.10.2.a.mp3' },
// 		'B': { description:'Go home', src:'2.10.2.b.mp3' }
// 	},
// 	'2.11.1': { description:'home comming', src:'2.11.1.mp3' },
	
// 	slides: {
// 				'slide_0_1': { src:'film01medmusik_mixdown.mp3' },
// 				'slide_1_0_1': { src:'film10_mixdown.mp3' },
// 				'slide_2_5': { src:'2.5_mixdown.mp3' },
// 				'slide_2_7_1_amory': { src:'2.7.1.vaaben_mixdown.mp3' },
// 				'slide_2_7_1_butcher': { src:'2.7.1.slagt_mixdown.mp3' },
// 				'slide_2_7_1_mine': { src:'2.7.1.mine_mixdown.mp3' },
// 				// 'slide_home1A': { src:'2.7.1.vaaben_mixdown.mp3' },
// 				// 'slide_home1B': { src:'slide_home1_B.mp3' },
// 				'slide_3_0': { src:'3.0_mixdown.mp3' },
// 				'slide_4_3': { src:'4.3_mixdown.mp3' },
// 				'slide_4_5_1_AB': { src:'4.5.1.mine_mixdown.mp3' },
// 				'slide_4_5_1_AC': { src:'4.5.1hud_efter_vaaben_mixdown.mp3' },
// 				'slide_4_5_1_BA': { src:'4.5.1.vaaben_efter kul_mixdown.mp3' },
// 				'slide_4_5_1_BC': { src:'4.5.1hud_efter_mine_mixdown.mp3' },
// 				'slide_4_5_1_CA': { src:'4.5.1.vaaben_efter hud_mixdown.mp3' },
// 				'slide_4_5_1_CB': { src:'4.5.1.mine_mixdown.mp3' },
// 				'slide_4_7': { src:'4.7_mixdown.mp3' }				
// 			},
// 	'0.4': { // oppinion
// 			'AD': { label: 'alkoholiker', src:'0.4_forvalteren.mp3' },
// 			'AE': { label: 'alkoholiker, børn', src:'0.4_datter.mp3' },
// 			'AF': { label: 'alkoholiker', src:'0.4_forvalteren.mp3' },
// 			'BD': { label: 'dovenskab', src:'0.4_kone.mp3' },
// 			'BE': { label: 'dovenskab, børn', src:'0.4_datter.mp3' },
// 			'BF': { label: 'dovenskab', src:'0.4_andenindlagt.mp3' },
// 			'CD': { label: 'svækkelse', src:'0.4_kone.mp3' },
// 			'CE': { label: 'svækkelse, børn', src:'0.4_datter.mp3' },
// 			'CF': { label: 'svækkelse', src:'0.4_andenindlagt.mp3' }
// 		},
// 	'3.2.1': {
// 		'horsens': {
// 						'A': { src:'1.1.2_pashaven.mp3' },
// 						'B': { src:'1.1.2_goerrent.mp3' },
// 						'C': { src:'1.1.2_fletmaatter.mp3' }
// 					},
// 		'sundholm': {
// 						'A': { src:'1.1.2_hugbraende.mp3' },
// 						'B': { src:'1.1.2_pasgrise.mp3' },
// 						'C': { src:'1.1.2_skaerver.mp3' }						
// 					},
// 		'svendborg': {
// 						'A': { src:'1.1.2_skaerver.mp3' },
// 						'B': { src:'1.1.2_vaevmaatter.mp3' },
// 						'C': { src:'1.1.2_pilorm.mp3' }
// 					},
// 	},
// 	'3.3' : {
// 		'horsens': { src:'3.3.horsens.svendborg.mp3' },
// 		'sundholm': { src:'3.3.sundholm.mp3' },
// 		'svendborg': { src:'3.3.horsens.svendborg.mp3' }
// 	},
// 	'3.4.1': { label:'employee', src:'3.4.1.mp3' },
// 	'3.4.2': { label:'inmate', src:'3.4.2.mp3' },
// 	'3.7.1': { label:'work over', src:'3.7.1.mp3' },
// 	'4.6.1': { label:'dansk front', src:'4.6.1.mp3' },
// 	'4.10.1': { label:'bombe', src:'4.10.1.mp3' },
// 	'4.10.4': { label:'illness', src:'4.10.4.mp3' },
// 	'4.10.7': { label:'going home', src:'4.10.7.mp3' },
// 	'4.11.1': { label:'post script', src:'14_11_1efterskrift_red_musik.mp3' },
// 	'4.11.2': { label:'post script',src:'14_11_2efterskrift_red_musik.mp3' },
// 	'4.11.3': { label:'post script',src:'14_11_3efterskrift_red_musik.mp3' },
// 	'4.11.4': { label:'post script',src:'14_11_4efterskrift_red_musik.mp3' },
// };
var PlayerStats = {
	challenge: 'B',			// Default test value
	family: 'D',			// Default test value
	nickname: null,
	poorhouse: null,
	mood: 2,
	health: 4,
	money: 3,
	job: null,
	advice: null,
	wayout: null,
	job_germany: ['A', 'B'], // Default test values
	spending: null,
	whatnow: null,
	nazi: null,
	pointsDiff: {mood: 0, health: 0, money: 0},
	bomb: false,

	resetDiff: function(){
		'use strict';
		this.pointsDiff = {mood: 0, health: 0, money: 0};
	},

	isAPlusPoint: function(){
		'use strict';
		for(var key in this.pointsDiff){
			if(this.pointsDiff[key] > 0){
				return true;
			}
		}
	},

	isAMinusPoint: function(){
		'use strict';
		for(var key in this.pointsDiff){
			if(this.pointsDiff[key] < 0){
				return true;
			}
		}
	},

	set: function(type, val){
		'use strict';
		// Reset diff
		this.pointsDiff[type] = 0;

		// Remember the previous value
		var prev = this[type];	

		// Set new value
		this[type] = val;

		// Find diff
		this.pointsDiff[type] = this[type] - prev;		

		// Cap values for points
		if(type == 'mood' || type == 'health' || type == 'money'){
			if(this[type] > 10){
				this[type] = 10;
			}
			if(this[type] < 1){
				this[type] = 1;
			}
		}
	},
	append: function(type, val){	
		'use strict';	
		// Reset diff
		this.pointsDiff[type] = 0;
		
		// Remember the previous value
		var prev = this[type];	

		// Set new value
		this[type] += val;

		// Find diff
		this.pointsDiff[type] = this[type] - prev;			

		// Cap values for points
		if(type == 'mood' || type == 'health' || type == 'money'){
			if(this[type] > 10){
				this[type] = 10;
			}
			if(this[type] < 1){
				this[type] = 1;
			}
		}
	}
}
var Library = {
	clearSlide: function(){
		'use strict';
		// console.log('clearSlide');
		try{
			slidelib = null;
		}catch(err){
			console.log(err);
		}		
	},
	clearGame: function(){
		'use strict';
		// console.log('clearGame');		
		try{
			gamelib = null;
		}catch(err){
			console.log(err);
		}
	},
	clearMain: function(){
		'use strict';
		// console.log('clearMain');		
		try{
			mainlib = null;
		}catch(err){
			console.log(err);
		}
	},
}
var ImageService = {
	init: function(){
		'use strict';
		console.log('ImageService.init');
		var recursive = function(obj){
			for (var i in obj) {
				if(typeof obj[i] === 'object'){
					// console.log(obj[i].src);
					if(obj[i].src !== undefined){
						obj[i].src = ImageService.basePath() + obj[i].src;
					}
					recursive(obj[i]);
				}
			};
		}
		recursive(this.matrix);
	},
	basePath: function(){
		'use strict';
		return Environment.basePath() + 'assets/images/pool/';
	},
	matrix: {
		'0.1': { id: 'poorhouse_bg_horsens', label:'background', src:'_0_1BG.jpg'},
		'1.0.1': {
			'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
			'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
			'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
		},
		'3.0': {
			'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
			'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
			'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
		}
	}
}
// var ImageService = function(){
// 	'use strict';
// }
// ImageService.init = function(){
// 	console.log('ImageService.init');
// 	var recursive = function(obj){
// 		for (var i in obj) {
// 			if(typeof obj[i] === 'object'){
// 				// console.log(obj[i].src);
// 				if(obj[i].src !== undefined){
// 					obj[i].src = ImageService.basePath() + obj[i].src;
// 				}
// 				recursive(obj[i]);
// 			}
// 		};
// 	}
// 	recursive(this.matrix);
// };
// ImageService.basePath = function(){
// 	return Environment.basePath() + 'assets/images/pool/';
// 	// return 'assets/game/assets/images/pool/';
// };
// ImageService.matrix = {
// 	// portrait:{
// 	// 	'AD': { id: 'ADCloseUp', label:'background', src:'ADCloseUp.png'},
// 	// 	'AE': { id: 'AECloseUp', label:'background', src:'AECloseUp.png'},
// 	// 	'AF': { id: 'AFCloseUp', label:'background', src:'AFCloseUp.png'},
// 	// 	'BD': { id: 'BDCloseUp', label:'background', src:'BDCloseUp.png'},
// 	// 	'BE': { id: 'BECloseUp', label:'background', src:'BECloseUp.png'},
// 	// 	'BF': { id: 'BFCloseUp', label:'background', src:'BFCloseUp.png'},
// 	// 	'CD': { id: 'CDCloseUp', label:'background', src:'CDCloseUp.png'},
// 	// 	'CE': { id: 'CECloseUp', label:'background', src:'CECloseUp.png'},
// 	// 	'CF': { id: 'CFCloseUp', label:'background', src:'CFCloseUp.png'}
// 	// },
// 	'0.1': { id: 'poorhouse_bg_horsens', label:'background', src:'_0_1BG.jpg'},
// 	'1.0.1': {
// 		'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
// 		'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
// 		'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
// 	},
// 	'3.0': {
// 		'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
// 		'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
// 		'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
// 	}
// }
var FlowData ={
	
}
// var Assets = {
// 	fattiggard: {
// 		svendborg: {
// 			images: [
// 				{src: '../assets/images/1_0BGsvendborg.png', id:'1_0BGsvendborg'},
// 				{src: '../assets/images/1_1BGsvendborg.png', id:'1_1BGsvendborg'},
// 				{src: '../assets/images/1_2BGsvendborgA.png', id:'1_2BGsvendborgA'},
// 				{src: '../assets/images/1_2BGsvendborgB.png', id:'1_2BGsvendborgB'},
// 				{src: '../assets/images/1_2BGsvendborgC.png', id:'1_2BGsvendborgC'},
// 				{src: '../assets/images/1_3BGsvendborg.png', id:'1_3BGsvendborg'}
// 			]
// 		}
// 	}
// }
var GameManager = {
	root: null,
	init: function(root){
		'use strict';
		if(root === undefined){
			throw new Error("'root' is undefined");
		}
		this.root = root;
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};
var FlowManager = {
	currentPage:null,
	root: null,
	topbar: null,
	init: function(root){
		'use strict';
		if(root === undefined && root === null){
			throw new Error("'root' is", root);
		}
		this.root = root;
		PreloadGFX.blocker = this.root.blocker_black;
	},
	clearLib: function(){
		lib = null;
	},
	gotoPage: function(page){
		'use strict';
		
		// $('.content').hide();

		if(this.currentPage !== null){
			this.currentPage.destroy();
			this.currentPage = null;
		}
		var self = this;
		// this.root.gotoAndStop('character_build'); // TEST
		switch(page){
			case '0.0':
				this.root.gotoAndStop('frontpage');					
				PreloadGFX.blocker.visible = false;

				ContinueButton.on('click', function(event){
					event.remove();
					self.gotoPage('loadtopbar');					
				}, this);
				ContinueButton.activate('next');				
			break;
			case 'loadtopbar':
				Library.clearSlide();
				Library.clearGame();
				// Load JS
				LoadJS.load(
					['../assets/logic/topbarview.js'], 
					Delegate.create(function(){						
						// Load assets
						Preloader.load(lib.properties.manifest, function(event){
							//console.log('>>', event.item)
							if (event.item.type === 'image') { 
								images[event.item.id] = event.result; 
							}
						}, function(event){
							event.remove();
							self.topbar = new lib.TopbarView();
							self.root.topbarcontainer.addChild(self.topbar);
							self.gotoPage('0.1');
						}, 'full', true);						
					}, this)
				);
			break;
			// break;
			case '0.1':	
				// Intro	
				this.root.blocker_black.visible = false;
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					self.root.topbarcontainer.addChild(self.topbar);
					Topbar.init(this.topbar.mainClip);
					Topbar.go('intro');
				}catch(err){
					console.log(err);
				}

				this.currentPage = null;
				this.currentPage = new PageIntroSlide(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start('0.1', 'slide_0_1');

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('0.2');
				}, this);
				// Tick.framerate(Tick.low);
			break;
			case '0.2':
				// Proloque
				// Topbar
				try{
					Topbar.init(this.topbar.mainClip);
					Topbar.go('intro');
				}catch(err){
					console.log(err);
				}

				// Tick.framerate(Tick.low);
				var self = this;

				// Go to start frame
				this.root.gotoAndStop('start');
				this.currentPage = new FlowPrologue(this.root.pagecontainer);
				this.currentPage.start(); 

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('0.5');
				}, this);				
				// Tick.framerate(Tick.low);				
			break;
			case '0.5':
				// Map
				// Topbar
				try{
					Topbar.init(this.topbar.mainClip);
					Topbar.go('intro');
				}catch(err){
					console.log(err);
				}

				var self = this;

				// Go to start frame
				this.root.gotoAndStop('start');
				this.currentPage = new PageMap(this.root.pagecontainer);
				// this.currentPage.setInfo(false);
				this.currentPage.start(); 

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('1.0.1');
				}, this);				
				// Tick.framerate(Tick.low);				
			break;
			case '1.0.1':	
				// Poor House Intro	
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}

				this.currentPage = null;
				this.currentPage = new PageIntroSlide(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start('1.0.1', 'slide_1_0_1');

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('1.0.2');
				}, this);
				// Tick.framerate(Tick.low);
			break;
			case '1.0.2':	
				// Poor House		
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}
				

				this.currentPage = null;
				this.currentPage = new FlowPoorhouse(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);


				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('2.5');
				}, this);
				Tick.framerate(Tick.low);
			break;
			case '2.5':
				// Germany 1.

				// Root frame
				this.root.gotoAndStop('germany');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}

				this.currentPage = null;
				this.currentPage = new FlowGermany1(this.root.pagecontainer); 
				this.currentPage.start(); 		

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('2.12');
				}, this);
				Tick.framerate(Tick.low);
			break;
			case '2.12':
				// Map
				// Topbar
				try{
					Topbar.init(this.topbar.mainClip);
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}

				var self = this;

				// Go to start frame
				this.root.gotoAndStop('start');
				this.currentPage = new PageMap(this.root.pagecontainer);
				this.currentPage.setInfo(true);
				this.currentPage.start(); 

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('3.0');
				}, this);				
				// Tick.framerate(Tick.low);				
			break;
			case '3.0':	
				// Poor House 2. time
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}				

				this.currentPage = null;
				this.currentPage = new PageIntroSlide(this.root.pagecontainer); // Id references to flow id '0.1'
				// this.currentPage.setPortrait(ImageService.matrix.portrait['AD']);
				this.currentPage.start('3.0', 'slide_3_0');	

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('3.1');
				}, this);
			break;
			case '3.1':	
				// Poor House 2.	

				// TEST
				// PlayerStats.poorhouse = 'svendborg';
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}				

				this.currentPage = null;
				this.currentPage = new FlowPoorhouseSecond(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);


				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('4.0');
				}, this);
				Tick.framerate(Tick.low);
			break;
			case '4.0':	
				// Germany 2.	

				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}				

				this.currentPage = null;
				this.currentPage = new FlowGermany2(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('4.11');
				}, this);
				Tick.framerate(Tick.low);
			break;
			case '4.11':	

				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				try{
					Topbar.go('game');
				}catch(err){
					console.log(err);
				}				

				this.currentPage = null;
				this.currentPage = new FlowEpilogue(this.root.pagecontainer); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Blocker
				this.currentPage.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page/flow
				// this.currentPage.on('continue', function(event){
				// 	event.remove();
				// 	Library.clearSlide();
				// 	Library.clearGame();
				// 	self.gotoPage('4.10');
				// }, this);
				Tick.framerate(Tick.low);
			break;
		}
	},
	restart: function(){
		'use strict';
		this.currentPage = null;
	},
	destroy: function(){
		'use strict';
		this.currentPage = null;
	}
};
var ApplicationManager = {
	root: null,
	start: function(root){
		'use strict';
		this.root = root;

		PreloadGFX.preloader = this.root.preload_clip;

		// // Init Environment info
		// Environment.init();
		ImageService.init();
		SoundService.init();

		// Cursor init
		Cursor.root = root;

		// GUI
		try{
			ContinueButton.init(root.continueBtn);
		}catch(err){
			console.log(err);
		}
		
		// Game
		try{
			GameManager.init(root);
		}catch(err){
			console.log(err);
		}		

		// Init page manager
		try{
			FlowManager.init(root);
		}catch(err){
			console.log(err);
		}
			
		// Go to start
		FlowManager.gotoPage('0.0');
		// FlowManager.gotoPage('2.12');

		//console.log('Ticker.framerate:', Ticker.framerate);
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};
/**
	Controller uses the browser's AUDIO element as play back for sound
*/
function SoundController(audioPath, loopCount) {
	'use strict';

	var self = this;

	this.loopCount = loopCount;
	if(loopCount === undefined || loopCount === null)
		this.loopCount = false;	

	this.audioPath = audioPath;
}
// SoundController.prototype.dispatcher = function(event){
// 	this.dispatchEvent(event);
// }
SoundController.prototype = {
	sndObj: null,
	currentSndPosition: 0,
	paused: false,
	self: this,
	complete: false,
	dispatcher: function(event){
		this.dispatchEvent(event);
	},
	getState: function(){
		return this.sndObj.state;
	},
	load: function(){
		'use strict';
		var self = this;
		// Howler
		this.sndObj = new Howl({
		  urls: [this.audioPath],
		  autoplay: false,
		  loop: this.loopCount,
		  volume: 1,
		  buffer: false,
		  onend: function() {
		    self.complete = true;
		    self.dispatcher(new createjs.Event('complete'));
		  },
		  onload: function() {		    
		    self.dispatcher(new createjs.Event('ready'));
		    console.log('SoundController.onload');
		    PreloadGFX.hide();
		  }
		}); 

		PreloadGFX.show(false);
	},
	volume: function(value) {
		'use strict';
		if(this.sndObj != null){
			this.sndObj.volume = value;
		}
	},
	play: function() {
		'use strict';
		this.sndObj.play();
		this.paused = false;
		this.sndObj.state = 'play';
		this.complete = false;
	},
	stop: function() {
		'use strict';
		this.sndObj.stop();
		// this.sndObj.currentTime = 0;
		this.paused = false;
		this.sndObj.state = 'stop';
	},
	pause: function() {
		'use strict';
		// this.currentSndPosition = this.sndObj.currentTime;
		this.sndObj.pause();
		this.paused = true;
		this.sndObj.state = 'pause';
	},
	resume: function() {
		'use strict';
		this.sndObj.play();
	},
	progress: function(){
		'use strict';
		var num = this.sndObj.pos() / this.sndObj._duration;
		// $('.debug').text('position:'+ this.sndObj.pos() +', '+ this.sndObj._duration);
		return Math.round(num * 1000) / 1000; // Cap to 3 decimals
	},
	isComplete: function(){
		'use strict';
		this.state = 'stop';
		return this.complete;
	},
	destroy: function(){
		'use strict';
		this.state = 'stop';
		this.sndObj = null;
		this.duration = null;
	}
};
createjs.EventDispatcher.initialize(SoundController.prototype);
var HUDController = {
	init: function(){
		this.soundEffectPlus = new SoundController(SoundService.matrix.points.plus.src, false);	
		this.soundEffectMinus = new SoundController(SoundService.matrix.points.minus.src, false);	
		this.soundEffectPlus.load();
		this.soundEffectMinus.load();
	},
	setView: function(view){
		this.view = view;		
		this.update();
	},
	update: function(){
		if(this.view === undefined || this.view === null){
			throw new Error("'view' is undefined");
		}

		var self = this;
		this.view.mood.points.gotoAndStop(PlayerStats.mood-1);
		this.view.health.points.gotoAndStop(PlayerStats.health-1);
		this.view.money.points.gotoAndStop(PlayerStats.money-1);

		var delay = 0;
		// console.log('PlayerStats.pointsDiff:', PlayerStats.pointsDiff)
		for(var key in PlayerStats.pointsDiff){
			if(PlayerStats.pointsDiff[key] > 0){
				setTimeout(function(){ 
					self.soundEffectPlus.play();
				}, delay);
				delay += 500;
			}else if(PlayerStats.pointsDiff[key] < 0){
				setTimeout(function(){ 
					self.soundEffectMinus.play();
				}, delay);
				delay += 500;
			}
		}

		// Need to reset 
		PlayerStats.resetDiff();
	}
}
var PlayerSoundComponent = function(view){
	'use strict';
	if(PlayerSoundComponent.counter == null)
		PlayerSoundComponent.counter = 0;

	PlayerSoundComponent.counter++;
	this.id = PlayerSoundComponent.counter;

	this.view = view;
	this.paused = false;
	this.duration = 0;
	this.listeners = {tick:null, play:null, pause:null, stop:null};
	this.playBtn = new ButtonCustom(view.playBtn);
	this.pauseBtn = new ButtonCustom(view.pauseBtn);
	this.stopBtn = new ButtonCustom(view.stopBtn);

	// Initial visibility of play/pause/stop
	this.playBtn.setActive(false);
	this.stopBtn.setActive(false);
	this.pauseBtn.setActive(true);	
	this.pauseBtn.visible(false);

	// Controller button events
	this.listeners.play = this.playBtn.on('click', this.play, this);
	this.listeners.pause = this.pauseBtn.on('click', this.pause, this);
	this.listeners.stop = this.stopBtn.on('click', this.stop, this);

	// Progression
	this.progressionBar = view.progressionBar;
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController = null;
};
PlayerSoundComponent.prototype.preload = function(src, duration){
	'use strict';
	var self = this;

	// console.log('PlayerSoundComponent.preload');

	// Safety net
	this.removeLoopEvent();

	// Sound ready state
	if(self.soundController !== null){
		self.soundController.destroy();
		self.soundController = null;
	}
	self.soundController = new SoundController(src);
	self.soundController.on('ready', function(event){
		event.remove();
		// Enable buttons
		self.playBtn.setActive(true);
		self.stopBtn.setActive(true);

		// Dispatch event 
		self.dispatchEvent(new createjs.Event('ready'));
	}, self);
	self.soundController.on('complete', function(event){
		// Swap Play/Pause visibility
		this.pauseBtn.visible(false);
		this.playBtn.visible(true);

		self.removeLoopEvent();

		// Dispatch event 
		self.dispatchEvent(new createjs.Event('complete'));
	}, self);
	self.soundController.load();
};
PlayerSoundComponent.prototype.addLoopEvent = function(){
	'use strict';
	if(this.listeners.tick === null){
		this.listeners.tick = this.progressionBar.on('tick', this.loop, this);
	}
};
PlayerSoundComponent.prototype.removeLoopEvent = function(){
	'use strict';
	this.progressionBar.off('tick', this.listeners.tick);
	this.listeners.tick = null;
};
PlayerSoundComponent.prototype.loop = function(){
	'use strict';	
	var sndProgression = this.soundController.progress();
	
	// Progression bar
	this.progressionBar.scaleX = sndProgression;
};
PlayerSoundComponent.prototype.play = function(){
	'use strict';
	this.previousFrame = 0;

	// Swap Play/Pause visibility
	this.pauseBtn.visible(true);
	this.playBtn.visible(false);

	// Timeline
	this.addLoopEvent('tick');

	// Sound
	this.soundController.play();

	// Dispacth event 
	this.dispatchEvent(new createjs.Event('start'));

	// Set this last
	this.paused = false;

	// Tick
	Tick.enable();
	Tick.framerate(Tick.perfect);
};
PlayerSoundComponent.prototype.pause = function(){
	'use strict';

	// If invoked from external the state could be stopped
	// Adn we do not want to set in paused unintentional
	if(this.paused)
		return;

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Dispacth event 
	// this.dispatchEvent(new createjs.Event('pause'));

	this.paused = true;

	// Sound
	this.soundController.pause();

	// Tick
	Tick.disable(100);
};
PlayerSoundComponent.prototype.stop = function(){
	'use strict';

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Progression bar
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController.stop();

	// Dispacth event 
	// this.dispatchEvent(new createjs.Event('stop'));

	this.paused = false;

	// Tick
	Tick.disable(100);
};
PlayerSoundComponent.prototype.progress = function(){
	'use strict';
	var num = this.slide.currentFrame / this.duration;
	return Math.round(num * 1000) / 1000;
};
PlayerSoundComponent.prototype.reset = function(){
	'use strict';
	this.removeLoopEvent();
	this.paused = false;
	this.listeners = null;
};
PlayerSoundComponent.prototype.destroy = function(){
	'use strict';
	this.removeLoopEvent();
	this.view = null;
	this.listeners = null;
	this.playBtn.destroy();
	this.pauseBtn.destroy();
	this.stopBtn.destroy();
	this.playBtn = null;
	this.pauseBtn = null;
	this.stopBtn = null;
};
createjs.EventDispatcher.initialize(PlayerSoundComponent.prototype);
var PlayerSliderComponent = function(view, soundOffset){
	'use strict';
	this.view = view;
	this.soundOffset = soundOffset;
	this.container = view.container;
	this.slideId = null;
	this.slide = null;
	this.paused = false;
	this.state = null;
	this.duration = 0;
	this.listeners = {tick:null, play:null, pause:null, stop:null, auto:null};
	this.playBtn = new ButtonCustom(view.playBtn);
	this.pauseBtn = new ButtonCustom(view.pauseBtn);
	this.stopBtn = new ButtonCustom(view.stopBtn);

	if(this.soundOffset === null || this.soundOffset === undefined){
		this.soundOffset = 0;
	}

	// Initial visibility of play/pause/stop
	this.playBtn.setActive(false);
	this.stopBtn.setActive(false);
	this.pauseBtn.setActive(true);	
	this.pauseBtn.visible(false);

	// Controller button events
	this.listeners.play = this.playBtn.on('click', this.play, this);
	this.listeners.pause = this.pauseBtn.on('click', this.pause, this);
	this.listeners.stop = this.stopBtn.on('click', this.stop, this);

	// Progression
	this.progressionBar = view.progressionBar;
	this.progressionBar.scaleX = 0;

	// Sound
	this.soundController = null;
};
PlayerSliderComponent.prototype.preload = function(slideId, lib){
	'use strict';
	
	var self = this;
	this.slideId = slideId;

	// Load assets	
	Preloader.load(lib.properties.manifest, 
		function(event){
			if (event.item.type === 'image'){ 
				images[event.item.id] = event.result; 
			}
			// // console.log(event.result);
		}, 
		function(event){			
			// Clean slider container if a slider already has been played
			if(self.slide !== null){
				self.container.remove(slide);
				self.slide = null;
			}
			
			// Create slider object and attach to container
			self.slide = eval('new lib.'+slideId+'()');
			
			self.container.addChild(self.slide);

			// Get the duration of the timeline in the slide
			self.duration = self.slide.timeline.duration - 1;

			// Sound
			if(self.soundController !== null){
				self.soundController.destroy();
				self.soundController = null;
			}
			try{
				var snd = SoundService.getSlideSoundById(self.slideId);
				self.soundController = new SoundController(snd.src);
				self.soundController.on('ready', function(event){
					event.remove(); // Only run once. Otherwise it will run every time player has ended and starts slide after it played to the end
					// Enable buttons
					self.playBtn.setActive(true);
					self.stopBtn.setActive(true);

					// Dispatch event 
					self.dispatchEvent(new createjs.Event('ready'));
				}, self);
				self.soundController.on('complete', function(event){
					// event.remove();
					// console.log('complete');

					// Stop on last frame
					this.slide.gotoAndStop(this.slide.totalFrames-1);

					// Swap Play/Pause visibility
					this.pauseBtn.visible(false);
					this.playBtn.visible(true);

					self.removeLoopEvent();

					this.state = 'complete';

					// Dispatch event 
					self.dispatchEvent(new createjs.Event('complete'));
				}, self);
				self.soundController.load();
			}catch(err){
				console.log(err);
			}			
		},
		'small'
	);	
};
PlayerSliderComponent.prototype.addLoopEvent = function(){
	'use strict';
	if(this.listeners.tick === null){
		this.listeners.tick = this.slide.on('tick', this.loop, this);
	}
};
PlayerSliderComponent.prototype.removeLoopEvent = function(){
	'use strict';
	this.slide.off('tick', this.listeners.tick);
	this.listeners.tick = null;
};
PlayerSliderComponent.prototype.loop = function(){
	'use strict';	
	var sndProgression = this.soundController.progress();
	
	var desiredFrame = Math.round(this.duration * sndProgression) + this.soundOffset;

	// Truncate frame to show to max number of frames
	if(desiredFrame > this.slide.totalFrames-1)
		desiredFrame = this.slide.totalFrames-1

	this.slide.gotoAndPlay(desiredFrame);

	// Progression bar
	this.progressionBar.scaleX = this.progress()
};
PlayerSliderComponent.prototype.play = function(){
	'use strict';
	// console.log('play');
	var self = this;

	if(this.state === 'complete')
		this.slide.gotoAndStop(0);

	// Swap Play/Pause visibility
	this.pauseBtn.visible(true);
	this.playBtn.visible(false);

	// Sound
	// Sound starts at frame 0
	if(this.soundOffset === 0){
		this.soundController.play();		

	// Sound starts later than frame 0
	}else{
		// Current frame is after sound start frame
		if(this.slide.currentFrame >= this.soundOffset){
			this.soundController.play();

		// Current frame is before sound start frame
		}else{
			// Listen for an event dispatch 
			this.on('autoplay', function(event){
				event.remove();
				this.listeners.auto = null;
				self.soundController.play();
			}, this);
		}		
	}
	
	// Timeline
	this.addLoopEvent('tick');

	// Set this last
	this.paused = false;
	this.state = 'play';

	// Tick
	Tick.enable();
	Tick.framerate(Tick.perfect);
};
PlayerSliderComponent.prototype.pause = function(){
	'use strict';

	// console.log('pause');

	// Remove tick
	this.removeLoopEvent();

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	this.paused = true;
	this.state = 'pause';

	// Pause timeline
	this.slide.stop();

	// Sound
	this.soundController.pause();

	// Tick
	Tick.disable(100);
};
PlayerSliderComponent.prototype.stop = function(){
	'use strict';
	Tick.enable();

	// console.log('stop');


	// Progression bar
	this.progressionBar.scaleX = 0;

	// Remove tick
	this.removeLoopEvent();

	// Set slide timeline back to start
	this.slide.gotoAndStop(0);

	// Swap Play/Pause visibility
	this.pauseBtn.visible(false);
	this.playBtn.visible(true);

	// Sound
	this.soundController.stop();

	this.state = 'stop';

	// Tick
	Tick.disable(100);
};
PlayerSliderComponent.prototype.progress = function(){
	'use strict';
	var num = this.slide.currentFrame / this.duration;
	return Math.round(num * 1000) / 1000;
};
PlayerSliderComponent.prototype.reset = function(){
	'use strict';
	this.slideId = null;
	this.paused = false;
};
PlayerSliderComponent.prototype.destroy = function(){
	'use strict';
	this.view = null;
	this.slideId = null;
};
createjs.EventDispatcher.initialize(PlayerSliderComponent.prototype);
;(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 648,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../assets/images/pool/_0_0Frontpage.jpg", id:"_0_0Frontpage"},
		{src:"../assets/images/pool/Bitmap33.jpg", id:"Bitmap33"}
	]
};



// symbols:



(lib._0_0Frontpage = function() {
	this.initialize(img._0_0Frontpage);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


(lib.Bitmap33 = function() {
	this.initialize(img.Bitmap33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,641,270);


(lib.PreloaderSquares = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(194,45,27,0.329)").s().p("AgxAxIAAhiIBiAAIAABig");
	this.shape.setTransform(5,5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(194,45,27,0.659)").s().p("AgxAxIAAhiIBiAAIAABig");
	this.shape_1.setTransform(17,5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(194,45,27,0.898)").s().p("AgxAxIAAhiIBiAAIAABig");
	this.shape_2.setTransform(17,17);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,22,22);


(lib.preloaderbar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.6)").s().p("EhP/AAeIAAg7MCf/AAAIAAA7g");
	this.shape.setTransform(512,3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,6);


(lib.PageContainerEmpty = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


(lib.SkipButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA/BHIAAiNIAjAAQAXAAAAAYIAAArQAAAKgFAGQgHAGgLAAIgQAAIAAA0gABSACIAMAAQAIAAAAgHIAAgoQAAgEgCgCQgCgCgFAAIgLAAgAAaBHIAAiNIATAAIAACNgAgCBHIgYhGIAAgBIAUhGIAQAAIgSBGIAYBHgAguBHIAAiNIATAAIAACNgAhhBHQgXAAAAgaIAAgHIATAAIAAAHQAAAJAJAAIADAAQAIAAAAgJIAAgYQAAgEgCgBIgFgEIgbgOQgDgCgBgDIgBgJIAAgeQAAgYAXAAIAMAAQAMAAAFAGQAGAGAAAMIAAAOIgTAAIAAgMQAAgFgDgCQgCgCgDAAIgEAAQgEAAgCACQgCACAAAFIAAAXQAAAFACABIAFADIAaAOQADABACADQABADAAAHIAAAfQAAAYgXAAg");
	this.shape.setTransform(48,46.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA/BHIAAiNIAjAAQAXAAAAAYIAAArQAAAKgFAGQgHAGgLAAIgQAAIAAA0gABSACIAMAAQAIAAAAgHIAAgoQAAgEgCgCQgDgCgEAAIgLAAgAAaBHIAAiNIATAAIAACNgAgCBHIgYhGIAAgBIAUhGIAQAAIgSBGIAYBHgAguBHIAAiNIATAAIAACNgAhhBHQgXAAAAgaIAAgHIATAAIAAAHQAAAJAJAAIADAAQAIAAAAgJIAAgYQAAgEgCgBIgFgEIgbgOQgDgCgBgDIgBgJIAAgeQAAgYAXAAIAMAAQAMAAAFAGQAGAGAAAMIAAAOIgTAAIAAgMQAAgFgDgCQgCgCgDAAIgEAAQgEAAgCACQgCACAAAFIAAAXQAAAFACABIAFADIAaAOQADABACADQABADAAAHIAAAfQAAAYgXAAg");
	this.shape_1.setTransform(49,47.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[]},1).wait(1));

	// Layer 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D18B00").s().p("Ai6C7QhOhOAAhtQAAhsBOhOQBOhOBsAAQBtAABOBOQBOBOAABsQAABthOBOQhOBOhtAAQhsAAhOhOg");
	this.shape_2.setTransform(47,47);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2).to({x:48,y:48},0).to({_off:true},1).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1DAB5").s().p("AjiDhQhchdAAiEQAAiDBchfQBfhcCDAAQCFAABcBcQBfBfAACDQAACEhfBdQhcBfiFAAQiDAAhfhfg");
	this.shape_3.setTransform(47,47);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1DAB5").s().p("AjiDhQhdhdABiEQgBiDBdhfQBfhdCDABQCEgBBdBdQBfBfAACDQAACEhfBdQhdBfiEAAQiDAAhfhfg");
	this.shape_4.setTransform(48,48);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15,15,64,64);


(lib.GoOnButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AinC1ICwi1IiziyIBUhTIEBEHIkCEEg");
	this.shape.setTransform(51.4,45.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({x:53.4,y:47.9},0).to({_off:true},1).wait(1));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D18B00").s().p("AkSETQhyhyAAihQAAifByhzQBzhyCfAAQChAAByByQBzBzAACfQAAChhzByQhyBzihAAQifAAhzhzg");
	this.shape_1.setTransform(47,47);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D18B00").s().p("AkSETQhyhzgBigQABifByhzQBzhyCfgBQCgABBzByQByBzABCfQgBCghyBzQhzByigABQifgBhzhyg");
	this.shape_2.setTransform(49,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},2).to({state:[]},1).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1DAB5").s().p("AlMFLQiIiJgBjCQABjBCIiLQCLiIDBgBQDCABCJCIQCKCLAADBQAADCiKCJQiJCKjCAAQjBAAiLiKg");
	this.shape_3.setTransform(47,47);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1DAB5").s().p("AlMFLQiIiJgBjCQABjBCIiLQCLiIDBgBQDDABCICIQCLCLAADBQAADCiLCJQiICLjDAAQjBAAiLiLg");
	this.shape_4.setTransform(49,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,94,94);


(lib.BlockerBLACK = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ApXJXIAAyuISuAAIAASug");
	this.shape.setTransform(60,60);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


(lib.preloadersquaresanim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.PreloaderSquares("synched",0);
	this.instance.setTransform(11,11,1,1,0,0,0,11,11);
	this.instance.filters = [new cjs.ColorFilter(0, 0, 0, 1, 204, 204, 204, 0)];
	this.instance.cache(-2,-2,26,26);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({rotation:90},0).wait(5).to({rotation:180},0).wait(5).to({rotation:270},0).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22,22);


(lib.preloader = function() {
	this.initialize();

	// Layer 2
	this.bar = new lib.preloaderbar();

	this.addChild(this.bar);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1,-1,1026,8);


(lib.ContinueButton = function() {
	this.initialize();

	// Skip
	this.skipBtn = new lib.SkipButton();
	this.skipBtn.setTransform(47,47,1,1,0,0,0,47,47);
	new cjs.ButtonHelper(this.skipBtn, 0, 1, 2, false, new lib.SkipButton(), 3);

	// Continue
	this.nextBtn = new lib.GoOnButton();
	this.nextBtn.setTransform(47,47,1,1,0,0,0,47,47);
	new cjs.ButtonHelper(this.nextBtn, 0, 1, 2, false, new lib.GoOnButton(), 3);

	this.addChild(this.nextBtn,this.skipBtn);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,96,96);


(lib.PreloaderMain = function() {
	this.initialize();

	// Square
	this.instance = new lib.preloadersquaresanim();
	this.instance.setTransform(5,10,2.273,2.273);

	// Progress Bar
	this.progress_bar = new lib.preloader();

	// BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.329)").s().p("EhP/AyoMAAAhlPMCf/AAAMAAABlPg");
	this.shape.setTransform(512,324);

	this.addChild(this.shape,this.progress_bar,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


// stage content:
(lib.Main = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{preload:4,frontpage:14,start:24,character_build:33,poohouse:48,germany:58});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(84));

	// Preloader Bar
	this.preload_clip = new lib.PreloaderMain();

	this.timeline.addTween(cjs.Tween.get(this.preload_clip).wait(84));

	// Blocker
	this.blocker_black = new lib.BlockerBLACK();
	this.blocker_black.setTransform(-10,0,8.7,6.4);

	this.timeline.addTween(cjs.Tween.get(this.blocker_black).wait(84));

	// Topbar Container
	this.topbarcontainer = new lib.PageContainerEmpty();

	this.timeline.addTween(cjs.Tween.get(this.topbarcontainer).wait(84));

	// Continue
	this.continueBtn = new lib.ContinueButton();
	this.continueBtn.setTransform(951,579.4,1,1,0,0,0,48,48);
	this.continueBtn._off = true;

	this.timeline.addTween(cjs.Tween.get(this.continueBtn).wait(14).to({_off:false},0).wait(70));

	// Container
	this.pagecontainer = new lib.PageContainerEmpty();
	this.pagecontainer.setTransform(0,108);

	this.timeline.addTween(cjs.Tween.get(this.pagecontainer).wait(84));

	// Start IMage
	this.instance = new lib._0_0Frontpage();
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).to({_off:true},10).wait(60));

	// Layer 1
	this.instance_1 = new lib.Bitmap33();
	this.instance_1.setTransform(171,137);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(84));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(502,324,1044,768);

})(mainlib = mainlib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var mainlib, images, createjs, ss;
var canvas;
$(function() {
   'use strict';
	var vm = this;

	// Init Environment info
	Environment.init();

	vm.lib = mainlib;
	vm.imagesContainer = images;

	vm.canvas = Canvas.create(1024, 648, Environment.ratio);
	vm.canvas.style.background = '#000';
	$('.canvas').append(vm.canvas);

	// Device.ratio = 1;
	// Load files
	var onFileLoad = function(evt){		
		if (evt.item.type === 'image') { 
			vm.imagesContainer[evt.item.id] = evt.result; 
		}
	};
	var onLoadComplete = function(evt){
		// Instantiate root object. Equivalent to root timeline
		vm.exportRoot = new vm.lib.Main();

		try{
			var stage = new createjs.Stage(vm.canvas);
			stage.addChild(vm.exportRoot);
			
			// Do cursor
			stage.enableMouseOver(20);
			createjs.Touch.enable(stage);

			// Scale canvas according to ratio
			stage.scaleX = stage.scaleY = Environment.ratio;
			stage.update();

			// Tik tak - ticker
			Tick.init(stage, 15);
			Tick.enable();	

			// --------------------- Go start ->
			ApplicationManager.start(vm.exportRoot);
		}catch(err){
			console.log(err);
		}				
	};
	
	// Start preload app
	Preloader.load(vm.lib.properties.manifest, onFileLoad, onLoadComplete, 'full');
});