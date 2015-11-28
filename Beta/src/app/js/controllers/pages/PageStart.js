var PageStart = function(container){

	return{
		currentPage:null,
		container: container,
		view: null,
		trigger: '0.0', // Default start pointer
		continueBtn: ContinueButton,
		listeners: {},
		start: function(){
			'use strict';

			if(this.container === undefined){
				throw new Error("'container' is undefined");
			}

			// Dispatcher
			createjs.EventDispatcher.initialize(this);

			// Events
			this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	

			this.id = 'frontpage';//PlayerStats.poorhouse;
			LoadJS.load(
				['../assets/logic/games/frontpage.js'], 
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
			this.flow.addAction('0.0', Delegate.create(this.show, this), 'end');
			this.flow.addAction('end', Delegate.create(
				function(){
					self.removeEvents();
					self.dispatchEvent(new createjs.Event('continue'));
				}, this)
			);

			try{
				// Load files for flow	
				this.lib = gamelib; //germany1GameLib;
				var Clss = this.lib.frontpage;
				var manifest = this.lib.properties.manifest;
				var onFileLoad = function(event){
					if (event.item.type === 'image') { 
						// // console.log('result:', event.item.id, event.result);
						images[event.item.id] = event.result; 
					}
				};
				var onLoadComplete = function(event){
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
			this.container = null;
			if(this.playerComponent != null)
				this.playerComponent.destroy();
			this.playerComponent = null;
		},

		// Pages --------------------------------------------------------------------------------------------------------
		show: function(trigger){
			'use strict';
			// Next move
			this.trigger = trigger;

			// Pages in/out
			var previousPage = this.currentPage;
			this.currentPage = this.view.frontpage;
			Transitions.inOut({element: this.currentPage, prop: 'alpha'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
				Tick.disable();
			}, this));

			this.continueBtn.activate('next');
		}
	};	
}

// var PageStart = function(view){
// 	'use strict';
// 	this.view = view;
// 	this.listeners = {};
// 	this.continueBtn = ContinueButton;
// 	this.continueBtn.activate("next");
// 	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
// };
// PageStart.prototype.start = function() {
// 	'use strict';
// 	Tick.disable();
// };
// PageStart.prototype.onContinue = function(event) {
// 	'use strict';
// 	this.continueBtn.off('click', this.listeners.continue);	
// 	this.dispatchEvent(new createjs.Event('continue'));
// };
// PageStart.prototype.destroy = function() {
// 	'use strict';
// 	this.view = null;	
// };
// createjs.EventDispatcher.initialize(PageStart.prototype);