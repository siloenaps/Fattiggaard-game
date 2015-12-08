PreloadGFX = {
	blocker: null,
	shown: 0,
	show: function(progress){
		// if(this.shown < 0)
		// 	this.shown = 0;
		
		// this.shown++;
		// console.log('show', this.shown);

		(progress === undefined || progress === null)? progress = true : progress = progress;
		$('.preload-wrapper').removeClass('hide');
		$('.preload-wrapper').addClass('show');
		$('.progress-bar').removeClass('hide');

		if(progress)
			$('.progress-bar').removeClass('show');
		else
			$('.progress-bar').addClass('hide');

		if(PreloadGFX.blocker !== null && progress){
			PreloadGFX.blocker.visible = true;
			PreloadGFX.blocker.alpha = .3;	
		}		
	},
	hide: function(){
		// this.shown--;

		// if(this.shown < 0)
		// 	this.shown = 0;

		// console.log('hide', this.shown);

		// if(this.shown > 0)
		// 	return;

		$('.preload-wrapper').removeClass('show');
		$('.preload-wrapper').addClass('hide');
		$('.progress-bar').removeClass('show');
		$('.progress-bar').removeClass('hide');

		if(PreloadGFX.blocker !== null)
			PreloadGFX.blocker.visible = false;
	}
}