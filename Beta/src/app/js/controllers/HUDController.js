var HUDController = {
	init: function(){
		console.log('HUDController::init');
		// this.soundControllerPlus = new SoundController(SoundService.matrix.points.plus.src);
		// this.soundControllerMinus = new SoundController(SoundService.matrix.points.minus.src);

		// this.soundControllerPlus.load();
		// this.soundControllerMinus.load();
		this.soundControllerPlus = new SoundEffect(SoundService.matrix.points.plus.src, false);	
		// this.soundControllerPlus.play();

		this.soundControllerMinus = new SoundEffect(SoundService.matrix.points.minus.src, false);	
		// this.soundControllerMinus.play();
	},
	setView: function(view){
		this.view = view;		
		this.update();
	},
	update: function(){
		if(this.view === undefined || this.view === null){
			throw new Error("'view' is undefined");
		}

		var self = this;
		this.view.mood.points.gotoAndStop(PlayerStats.mood-1);
		this.view.health.points.gotoAndStop(PlayerStats.health-1);
		this.view.money.points.gotoAndStop(PlayerStats.money-1);

		var delay = 0;
		// console.log('PlayerStats.pointsDiff:', PlayerStats.pointsDiff)
		for(var key in PlayerStats.pointsDiff){
			if(PlayerStats.pointsDiff[key] > 0){
				setTimeout(function(){ 
					self.soundControllerPlus.play();
				}, delay);
				delay += 500;
			}else if(PlayerStats.pointsDiff[key] < 0){
				setTimeout(function(){ 
					self.soundControllerMinus.play();
				}, delay);
				delay += 500;
			}
		}

		// Need to reset 
		PlayerStats.resetDiff();
	}
}