var Tick = {
	defaultDelay: 100,
	stage: null,
	enabled: false,
	debug: true,
	init: function(stage, framerate){
		this.stage = stage;
		// createjs.Ticker.setFPS(framerate);
		this.framerate(framerate);
		enabled = false;
	},
	framerate: function(framerate){
		createjs.Ticker.framerate = framerate;
	},
	enable: function(){		
		if(enabled)
			return false;

		createjs.Ticker.removeEventListener('tick', self.stage); // Handbreak. Remove handler before setting again
		createjs.Ticker.addEventListener('tick', this.stage);
		if(this.debug){
			createjs.Ticker.addEventListener('tick', this.foo);
		}
		enabled = true;
	},
	disable: function(delay){		
		if(delay === undefined){
			delay = this.defaultDelay;
		}

		var self = this;
		setTimeout(function(){
			// Hand break. Hdnles enable/disable conflicts due tp timer
			if(enabled)
				return false;

			createjs.Ticker.removeEventListener('tick', self.stage);

			if(self.debug){
				createjs.Ticker.removeEventListener('tick', self.foo);
			}
		}, delay);

		enabled = false;
	},
	resume: function(){
		createjs.Ticker.paused = false;
	},
	pause: function(){
		createjs.Ticker.paused = true;
	},
	foo: function(event){
		console.log(createjs.Ticker.framerate);
		// console.log(event.paused,
	 //         createjs.Ticker.getTime(false),
	 //         createjs.Ticker.getTime(true));
	}
}