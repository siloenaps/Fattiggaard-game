var Preloader = {
	id: 0,
	imagePath: 'assets/images/preloader.gif',
	tracker: {},


	load: function(manifest, handleFileLoad, handleComplete, clss, keep, factor){
		'use strict';
		this.id++;
		
		// FIXME
		// Should not happen trying to load an empty manifest
		// If nothing to load exit 
		if(manifest.length === 0){
			handleComplete(null);
			return;
		}

		// (factor === undefined) ? this.factor = 1 : this.factor = factor;
		// if(clss === undefined) clss = 'small';

		this.tracker[this.id] = false;

		var self = this;

		var loader = new createjs.LoadQueue(true);
		loader.id = this.id;
		(keep === undefined) ? loader.keepPreloader = false : loader.keepPreloader = keep;
		if(handleFileLoad != null)
			loader.addEventListener('fileload', function(event){
				if(handleFileLoad != null){
					handleFileLoad(event);
				}				
			});		
			loader.addEventListener('complete', function(event){
				var id = event.target.id;
				self.tracker[id] = true;
				if(handleComplete != null){
					handleComplete(event);
				}	
				
				PreloadGFX.hide();
			});
			loader.addEventListener('progress', function(event){
				PreloadGFX.showProgress(event.loaded);
			});	
			loader.addEventListener('error', function(event){
				console.log('Preloader:error', event);
			});	
		manifest = Path.adjustManifest(manifest);
		loader.loadManifest(manifest);

		PreloadGFX.show();
	}
};