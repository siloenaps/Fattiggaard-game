var Tick = {
	stage: null,
	init: function(stage){
		this.stage = stage;
	},
	enable: function(){
		createjs.Ticker.addEventListener('tick', this.stage);
		createjs.Ticker.addEventListener('tick', this.foo);
	},
	disable: function(delay){		
		if(delay === undefined){
			createjs.Ticker.removeEventListener('tick', this.stage);
			createjs.Ticker.removeEventListener('tick', this.foo);
		}else{
			var self = this;
			setTimeout(function(){
				createjs.Ticker.removeEventListener('tick', self.stage);
				createjs.Ticker.removeEventListener('tick', self.foo);
			}, delay);
		}
	},
	resume: function(){
		createjs.Ticker.paused = false;
	},
	pause: function(){
		createjs.Ticker.paused = true;
	},
	foo: function(event){
		console.log(event.paused,
	         createjs.Ticker.getTime(false),
	         createjs.Ticker.getTime(true));
	}
}