var FlowEpilogue = function(container){

	return{
		currentPage:null,
		container: container,
		view: null,
		trigger: '4.11', // Default start pointer
		continueBtn: ContinueButton,
		listeners: {},
		start: function(){
			'use strict';

			// Dispatcher
			createjs.EventDispatcher.initialize(this);

			// Events
			this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);	

			this.id = 'epilogue';//PlayerStats.poorhouse;

			// // console.log('FlowEpilogue:start', this.container);

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
			this.flow.addAction('4.11.2', Delegate.create(this.illness, this), '4.11.3');
			this.flow.addAction('4.11.3', Delegate.create(this.runAway, this), '4.11.4');
			this.flow.addAction('4.11.4', Delegate.create(this.hippopotimus, this), 'end');
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
					Tick.disable();
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.disable();
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
					Tick.disable();
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.disable();
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
					Tick.disable();
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.disable();
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
					Tick.disable();
				}, self);
				self.playerComponent.on('ready', function(event){
					self.continueBtn.activate('skip');
					Tick.disable();
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


	};	
}