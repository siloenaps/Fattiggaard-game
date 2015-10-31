var Topbar = {
	view: null,
	soundController: null,
	init: function(view){
		this.view = view;		
	},
	go: function(frm){
		// console.log(this.view);
		// this.view.label_intro.x = 564 + 300;
		// createjs.Tween.get(this.view.label_intro)
		// 	.to({x:564}, 300, createjs.Ease.backIn);


		this.view.gotoAndStop(frm);

		// Setup for game related to user's choices
		if(frm === 'game'){
			this.view.photo.gotoAndStop(PlayerStats.challenge + PlayerStats.family);
			this.view.realname.gotoAndStop(PlayerStats.challenge + PlayerStats.family);
			this.view.nickname.gotoAndStop(PlayerStats.nickname - 1);

			// Points
			HUDController.init(this.view.hud);
		}
	},
	pointsUpdate: function(){
		HUDController.update();
	}
}