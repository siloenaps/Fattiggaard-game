var ApplicationManager = {
	root: null,
	start: function(root){
		'use strict';
		this.root = root;

		// Cursor init
		Cursor.root = root;

		// GUI
		ContinueButton.init(root.continueBtn);
		
		// Init Environment info
		Environment.init();

		// Game
		GameManager.init(root);

		// Init page manager
		FlowManager.init(root);

		// Topbar
		Topbar.init(root.topbar);

		// Fade black blocker out
		createjs.Tween.get(root.blocker_black)
         .to({alpha: 0}, 600, createjs.Ease.linear)
         .call(function(){
         	root.blocker_black.visible = false;
         });

		// Go to start
		FlowManager.gotoPage('0.0');
		// FlowManager.gotoPage('0.5');
		// FlowManager.gotoPage('2.5');


		//console.log('Ticker.framerate:', Ticker.framerate);
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};