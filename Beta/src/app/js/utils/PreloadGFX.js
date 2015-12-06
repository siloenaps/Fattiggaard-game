PreloadGFX = {
	blocker: null,
	show: function(progress){
		(progress === undefined || progress === null)? progress = true : progress = progress;
		$('.preload-wrapper').removeClass('hide');
		$('.preload-wrapper').addClass('show');
		$('.progress-bar').removeClass('hide');

		// console.log('PreloadGFX',progress);
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
		$('.preload-wrapper').removeClass('show');
		$('.preload-wrapper').addClass('hide');
		$('.progress-bar').removeClass('show');
		$('.progress-bar').removeClass('hide');

		if(PreloadGFX.blocker !== null)
			PreloadGFX.blocker.visible = false;
	}
}