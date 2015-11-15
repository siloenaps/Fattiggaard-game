var FlowManager = {
	currentPage:null,
	root: null,
	init: function(root){
		'use strict';
		this.root = root;
	},
	gotoPage: function(page){
		'use strict';
		// console.log("page:", page);
		if(this.currentPage !== null){
			this.currentPage.destroy();
			this.currentPage = null;
		}
		var self = this;
		this.root.gotoAndStop('character_build'); // TEST
		switch(page){
			case '0.0':
				//Tick.pause();
				Tick.disable(1000);

				// Go to start frame
				this.root.gotoAndStop('start');
				this.currentPage = new PageStart(this.root.pageStart);
				this.currentPage.start(); 

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.1');
					// Tick.enable();
				}, this);				
				// Tick.disable(1000);	
				
			break;
			case '0.1':
				// Tick.disable(1000);	

				this.root.gotoAndStop('character_build');				
				this.root.page_intro.x = 0;				
				this.currentPage = new PageIntro(this.root.page_intro, 'intro'); 
				this.currentPage.start(); 

				// Topbar
				Topbar.go('intro');

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.2');
				}, this);
			break;
			case '0.2':				
				// this.root.gotoAndStop('character');
				this.root.page_intro.x = 1024;
				this.root.page_character.x = 0;
				this.currentPage = new FlowCharacter(this.root.page_character); // Id references to flow id '0.1'
				this.currentPage.start(); 

				
				// createjs.Tween.get(this.root.page_character)
				// 	.to({x:0}, 300, createjs.Ease.linear);

				// Topbar
				Topbar.go('character');

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.3');
				}, this);
			break;
			case '0.3':
				createjs.Tween.get(this.root.page_character)
						.to({x:-1024}, 300, createjs.Ease.linear);

				this.currentPage = new PageCard(this.root.page_card); // Id references to flow id '0.1'
				this.currentPage.start(); 

				this.root.page_card.x = 0;
				// createjs.Tween.get(this.root.page_card)
				// 		.to({x:0}, 300, createjs.Ease.linear);

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.4');
				}, this);
			break;
			case '0.4':
				createjs.Tween.get(this.root.page_card)
						.to({x:-1024}, 300, createjs.Ease.linear);

				this.currentPage = new PageOpinion(this.root.page_opinion); // Id references to flow id '0.1'
				this.currentPage.start(); 

				this.root.page_opinion.x = 0;

				// createjs.Tween.get(this.root.page_opinion)
				// 		.to({x:0}, 300, createjs.Ease.linear);

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('0.5');
				}, this);
			break;
			case '0.5':
				createjs.Tween.get(this.root.page_opinion)
						.to({x:-1024}, 300, createjs.Ease.linear);

				this.currentPage = new PageMap(this.root.page_map); // Id references to flow id '0.1'
				this.currentPage.start(); 

				this.root.page_map.x = 0;

				// Button to next page
				this.currentPage.on('continue', function(event){
					event.remove();
					// From here it a spereate flow related to chosen poorhouse New page LOADS new content
					self.gotoPage('1.0');
				}, this);
			break;
			case '1.0':
				// createjs.Tween.get(this.root.page_map)
				// 		.to({x:-1024}, 300, createjs.Ease.linear);
				this.root.page_map.x = -1024;

				// Root frame
				this.root.gotoAndStop('poorhouse');

				// Topbar
				Topbar.go('game');

				this.currentPage = new FlowPoorhouse(this.root.poorhouse_container); // Id references to flow id '0.1'
				this.currentPage.start(); 				

				// Button to next page/flow
				this.currentPage.on('continue', function(event){
					event.remove();
					self.gotoPage('2.5');
				}, this);
			break;
			case '2.5':
				// Root frame
				this.root.gotoAndStop('germany');

				// Topbar
				Topbar.go('game');

				this.currentPage = new FlowGermany1(this.root.germany_container); 
				this.currentPage.start(); 				

				// Button to next page
				// this.currentPage.on('continue', function(event){
				// 	event.remove();
				// 	// self.gotoPage('1.0.2');
				// }, this);
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