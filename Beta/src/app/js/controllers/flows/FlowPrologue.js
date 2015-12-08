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