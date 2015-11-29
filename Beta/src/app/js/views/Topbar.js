var Topbar = {
	view: null,
	soundController: null,
	init: function(view){
		if(view === undefined || view === null){
			throw new Error("'view' is undefined");
		}
		this.view = view;		
	},
	go: function(frm){
		// console.log(this.view);
		// this.view.label_intro.x = 564 + 300;
		// createjs.Tween.get(this.view.label_intro)
		// 	.to({x:564}, 300, createjs.Ease.backIn);

		if(this.view === undefined || this.view === null){
			throw new Error("'view' is undefined");
		}
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
	},
	show: function(){
		this.view.visible = true;
	},
	hide: function(){
		this.view.visible = false;	
	}
}