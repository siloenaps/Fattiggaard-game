var ApplicationManager = {
	root: null,
	start: function(root){
		'use strict';
		this.root = root;

		PreloadGFX.preloader = this.root.preload_clip;

		// PreloadGFX.hide();

		// // Init Environment info
		// Environment.init();
		ImageService.init();
		SoundService.init();


		// Cursor init
		Cursor.root = root;

		// GUI
		try{
			ContinueButton.init(root.continueBtn);
		}catch(err){
			console.log(err);
		}
		
		// Game
		try{
			GameManager.init(root);
		}catch(err){
			console.log(err);
		}		

		// Init page manager
		try{
			FlowManager.init(root);
		}catch(err){
			console.log(err);
		}
			

		// Fade black blocker out
		// createjs.Tween.get(root.blocker_black)
  //        .to({alpha: 0}, 600, createjs.Ease.linear)
  //        .call(function(){
  //        	root.blocker_black.visible = false;
  //        });         


		// Go to start
		FlowManager.gotoPage('0.0');
		// FlowManager.gotoPage('2.12');

		//console.log('Ticker.framerate:', Ticker.framerate);
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};