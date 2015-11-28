var FlowProloque = function(container){
	return{
		currentPage:null,
		container: container,
		// init: function(view){
		// 	'use strict';
		// 	this.view = view;
		// },
		start: function(){
			'use strict';
			this.id = 'prologue';//PlayerStats.poorhouse;

			// console.log('FlowProloque:start', this.view);

			LoadJS.load(
				['../assets/logic/games/prologue.js'], 
				Delegate.create(this.setup, this)
			);
		},
		setup: function(){
			'use strict';
			if(this.runonce != null)
				return;

			var self = this;

			// Setup may run ONLY once
			this.runonce = true;

			// Tick
			Tick.framerate(15);


			// Load files
			this.lib = gamelib;
			var Clss = this.lib.prologue;		
			var manifest = this.lib.properties.manifest;

			var onFileLoad = function(event){
				if (event.item.type === 'image') { 
					// console.log(event.item.id, event.result);
					images[event.item.id] = event.result; 
				}
			};
			var onLoadComplete = function(event){
				// Instantiate view
				self.view = new Clss();

				//Add
				self.container.addChild(self.view);

				// Set start page
				self.next('0.1');

				// Ready
				FlowProloque.dispatchEvent(new createjs.Event('ready'));
			};
			Preloader.load(manifest, onFileLoad, onLoadComplete, 'full');

			// this.next('0.0');
		},
		next: function(page){
			'use strict';
			console.log('next:',page);
			if(this.currentPage !== null){
				this.currentPage.destroy();
				this.currentPage = null;
			}
			var self = this;
			// this.view.gotoAndStop('character_build'); // TEST
			switch(page){					
				// break;
				case '0.1':
					// Tick.enable();
					this.view.gotoAndStop('character_build');				
					this.view.page_intro.x = 0;				
					this.currentPage = new PageIntro(this.view.page_intro, 'intro'); 
					this.currentPage.start(); 

					// Topbar
					Topbar.show();
					Topbar.go('intro');
					console.log('FlowProloque:next', page, Topbar);

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.2');
					}, this);				
				break;
				case '0.2':				
					// Tick.enable();
					// this.view.gotoAndStop('character');
					this.view.page_intro.x = 1024;
					this.view.page_character.x = 0;
					this.currentPage = new FlowCharacter(this.view.page_character); // Id references to flow id '0.1'
					this.currentPage.start(); 

					
					// createjs.Tween.get(this.view.page_character)
					// 	.to({x:0}, 300, createjs.Ease.linear);

					// Topbar
					Topbar.go('character');

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.3');
					}, this);
					// Tick.disable();
				break;
				case '0.3':
					Tick.framerate(15);
					TweenUtil.to(this.view.page_character, {x:-1024}, 300, Delegate.create(function(){
						Tick.framerate(8);
					}, this));

					this.currentPage = new PageCard(this.view.page_card); // Id references to flow id '0.1'
					this.currentPage.start(); 

					this.view.page_card.x = 0;
					// createjs.Tween.get(this.view.page_card)
					// 		.to({x:0}, 300, createjs.Ease.linear);

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.4');
					}, this);
					// Tick.disable();
				break;
				case '0.4':
					Tick.framerate(15);
					TweenUtil.to(this.view.page_card, {x:-1024}, 300, Delegate.create(function(){
						Tick.framerate(8);
					}, this));		

					this.currentPage = new PageOpinion(this.view.page_opinion); // Id references to flow id '0.1'
					this.currentPage.start(); 

					this.view.page_opinion.x = 0;

					// createjs.Tween.get(this.view.page_opinion)
					// 		.to({x:0}, 300, createjs.Ease.linear);

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						self.next('0.5');
					}, this);
					// Tick.disable();
				break;
				case '0.5':
					TweenUtil.to(this.view.page_opinion, {x:-1024}, 300, Delegate.create(function(){
						//Tick.framerate(8);
					}, this));				

					this.currentPage = new PageMap(this.view.page_map); // Id references to flow id '0.1'
					this.currentPage.start(); 

					this.view.page_map.x = 0;

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();

						// Clean
						self.lib = null;
						self.container.removeAllChildren();

						// From here it a sepereate flow related to chosen poorhouse New page LOADS new content						
						FlowProloque.dispatchEvent(new createjs.Event('continue'));
					}, this);
					// Tick.disable();
				break;
				// case '1.0':				
				// 	this.view.page_map.x = -1024;

				// 	// view frame
				// 	this.view.gotoAndStop('poorhouse');

				// 	// Topbar
				// 	Topbar.go('game');

				// 	this.currentPage = new FlowPoorhouse(this.view.poorhouse_container); // Id references to flow id '0.1'
				// 	this.currentPage.start(); 				

				// 	// Button to next page/flow
				// 	this.currentPage.on('continue', function(event){
				// 		event.remove();
				// 		self.next('2.5');
				// 	}, this);
				// 	// Tick.disable();
				// break;
				// case '2.5':
				// 	// view frame
				// 	this.view.gotoAndStop('germany');

				// 	// Topbar
				// 	Topbar.go('game');

				// 	this.currentPage = new FlowGermany1(this.view.germany_container); 
				// 	this.currentPage.start(); 				
				// 	// Tick.disable();
				// break;
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
}
createjs.EventDispatcher.initialize(FlowProloque);