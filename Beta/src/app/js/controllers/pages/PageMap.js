var PageMap = function(container){

	return{
		currentPage:null,
		container: container,
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