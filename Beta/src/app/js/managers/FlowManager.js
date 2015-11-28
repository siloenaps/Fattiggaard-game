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
		// this.root.gotoAndStop('character_build'); // TEST
		switch(page){
			case '0.0':
				// Tick.disable();
				var self = this;
				this.root.gotoAndStop('frontpage');	
				// Go to start frame
				try{
					this.currentPage = new PageStart(this.root.startpagecontainer);
					this.currentPage.start(); 

					// Blocker
					this.currentPage.on('ready', function(event){
						event.remove();					
						self.root.blocker_black.visible = false;
					}, this);

					// Button to next page
					this.currentPage.on('continue', function(event){
						event.remove();
						try{
							Library.clearSlide();	
						}catch(err){
							console.log(err);
						}
						try{
							Library.clearGame();
						}catch(err){
							console.log(err);
						}					
						self.gotoPage('0.1');
					}, this);	
				}catch(err){
					console.log(err);
				}
				
				
			break;
			case '0.1':
				// Proluque

				// Tick.disable();
				console.log('0.1')

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
					self.gotoPage('3.0');
				}, this);
				Tick.disable();
			break;
			case '3.0':	
				// Poor House 2. time

				// Get id for next poorhouse
				var newId;
				var list = ['horsens', 'sundholm', 'svendborg'];
				list = list.shuffle();
				for(var i=0; i<list.length; i++){
					if(list[i] !== PlayerStats.poorhouse){
						PlayerStats.poorhouse = list[i];
						break;
					}
				}

				// TEST
				PlayerStats.poorhouse = 'svendborg';
				
				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');

				this.currentPage = null;
				this.currentPage = new PagePoorhouseIntro(this.root.pagecontainer); // Id references to flow id '0.1'
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
				Topbar.go('game');				

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
				Tick.disable();
			break;
			case '4.0':	
				// Germany 2.	

				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');				

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
				Tick.disable();
			break;
			case '4.11':	

				this.root.gotoAndStop('start');
				this.root.pagecontainer.removeAllChildren();

				// Topbar
				Topbar.go('game');				

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
				Tick.disable();
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