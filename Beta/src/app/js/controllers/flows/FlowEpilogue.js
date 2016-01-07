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

			// Disable Next
			this.continueBtn.hide(); // Remove if game has to continue

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
					// self.continueBtn.activate('next'); // Insert if game has to continue
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					// self.continueBtn.activate('skip'); // Insert if game has to continue
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
			// this.continueBtn.ghost('skip');  // Insert if game has to continue
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
					// self.continueBtn.activate('next');// Insert if game has to continue
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					// self.continueBtn.activate('skip');// Insert if game has to continue
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
			// this.continueBtn.ghost('skip');// Insert if game has to continue
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
					// self.continueBtn.activate('next');// Insert if game has to continue
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					// self.continueBtn.activate('skip');// Insert if game has to continue
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
			// this.continueBtn.ghost('skip');// Insert if game has to continue
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
					// self.continueBtn.activate('next'); // Insert if game has to continue
					Tick.framerate(Tick.low);
				}, self);
				self.playerComponent.on('ready', function(event){
					// self.continueBtn.activate('skip'); // Insert if game has to continue
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
			// this.continueBtn.ghost('skip'); // Insert if game has to continue
		},

		outro: function(trigger){
			'use strict';

			// Next move
			this.trigger = trigger;

			var self = this;


			// Next
			// this.continueBtn.ghost('skip'); // Insert if game has to continue
		},


	};	
}