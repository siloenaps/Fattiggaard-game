var HUDController = {
	init: function(view){
		this.view = view;		
		this.update();
	},
	update: function(){
		this.view.mood.points.gotoAndStop(PlayerStats.mood-1);
		this.view.health.points.gotoAndStop(PlayerStats.health-1);
		this.view.money.points.gotoAndStop(PlayerStats.money-1);
	}
}