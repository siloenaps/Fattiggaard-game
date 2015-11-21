var FlowManager = {
	currentPage:null,
	root: null,
	init: function(root){
		'use strict';
		this.root = root;
	},
	clearLib: function(){
		lib = null;
	},
	gotoPage: function(page){
		'use strict';
		if(this.currentPage !== null){
			this.currentPage.destroy();
			this.currentPage = null;
		}
		var self = this;
		this.root.gotoAndStop('character_build'); // TEST
		switch(page){
			case '0.0':
				// Proluque

				// Tick.disable();

				var self = this;

				// Go to start frame
				this.root.gotoAndStop('start');
				this.currentPage = new FlowProloque(this.root.startpagecontainer);
				this.currentPage.start(); 

				Topbar.hide();

				// Blocker
				FlowProloque.on('ready', function(event){
					event.remove();					
					self.root.blocker_black.visible = false;
				}, this);

				// Button to next page
				FlowProloque.on('continue', function(event){
					event.remove();
					Library.clearSlide();
					Library.clearGame();
					self.gotoPage('1.0.1');
				}, this);				
				// Tick.disable();	
				
			break;
			case '1.0.1':	
				// Poor House Intro	
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');

				this.currentPage = null;
				this.currentPage = new PagePoorhouseIntro(this.root.pagecontainer); // Id references to flow id '0.1'
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
					self.gotoPage('1.0.2');
				}, this);
				// Tick.disable();
			break;
			case '1.0.2':	
				// Poor House		
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');
				

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
				Tick.disable();
			break;
			case '2.5':
				// Germany 1.

				// Root frame
				this.root.gotoAndStop('germany');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');

				this.currentPage = null;
				this.currentPage = new FlowGermany1(this.root.pagecontainer); 
				this.currentPage.start(); 				
				// Tick.disable();
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