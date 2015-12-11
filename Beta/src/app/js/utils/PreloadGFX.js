PreloadGFX = {
	blocker: null,
	shown: 0,
	preloader: null,
	show: function(progress){
		// if(this.shown < 0)
		// 	this.shown = 0;
		
		this.shown++;
		

		(progress === undefined || progress === null)? progress = true : progress = progress;
		// var progress = true
		

		if(this.preloader !== undefined && this.preloader !== null){
			console.log('show', this.preloader.visible);
			this.preloader.visible = true;
			// this.preloader.progress_bar.visible = true;
			if(progress)
				this.preloader.progress_bar.visible = true;
			else
				this.preloader.progress_bar.visible = false;
		}

		if(PreloadGFX.blocker !== null && progress){
			PreloadGFX.blocker.visible = true;
			PreloadGFX.blocker.alpha = .3;	
		}		
	},
	hide: function(){
		this.shown--;

		if(this.preloader !== undefined && this.preloader !== null){
			console.log('hide', this.shown);
			if(this.shown == 0)
				this.preloader.visible = false;
		}

		if(PreloadGFX.blocker !== null)
			PreloadGFX.blocker.visible = false;
	},
	showProgress: function(progress){

		if(this.preloader !== undefined && this.preloader !== null){
			this.preloader.progress_bar.bar.scaleX = progress;
			// console.log(progress, this.preloader.bar)
		}
	}
}