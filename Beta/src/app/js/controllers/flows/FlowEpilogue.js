var FlowEpilogue = function(container){

	return{
		currentPage:null,
		container: container,
		view: null,
		trigger: '4.11.1', // Default start pointer
		continueBtn: ContinueButton,
		listeners: {},
		start: function(){
			'use strict';
			createjs.EventDispatcher.initialize(this);

			this.id = 'epilogue';//PlayerStats.poorhouse;

			// console.log('FlowEpilogue:start', this.container);

			LoadJS.load(
				['../assets/logic/games/epilogue.js'], 
				Delegate.create(this.setup, this)
			);
		},
		setup: function(){
			'use strict';
			if(this.runonce != null)
				return;

			// Setup may run ONLY once
			this.runonce = true;

			var self = this;

			// Setup flow
			this.flow = new SubFlowController();
			this.flow.addAction('4.11.1', Delegate.create(this.compensation, this), '4.11.2');
			this.flow.addAction('1113.0', Delegate.create(
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
			Transitions.inOut({element: this.currentPage, prop: 'pos'}, {element: previousPage, prop: 'pos'}, Delegate.create(function(){
				//console.log(self.playerComponent)
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