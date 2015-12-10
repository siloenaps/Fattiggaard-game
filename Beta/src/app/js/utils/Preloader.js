var Preloader = {
	id: 0,
	imagePath: 'assets/images/preloader.gif',
	tracker: {},


	load: function(manifest, handleFileLoad, handleComplete, clss, keep, factor){
		'use strict';
		this.id++;

		console.log('Preloader:load', this.id, manifest.length);

		
		// FIXME
		// Should not happen trying to load an empty manifest
		// If nothing to load exit 
		if(manifest.length === 0){
			handleComplete(null);
			return;
		}


		(factor === undefined) ? this.factor = 1 : this.factor = factor;
		if(clss === undefined) clss = 'small';

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
				console.log('Preloader:complete', id);
				if(handleComplete != null){
					handleComplete(event);
				}	
				if(!event.target.keepPreloader){					
					self.remove(id);
				}
			});
			loader.addEventListener('progress', function(event){
				var w = (event.loaded * 400) / self.factor;
				$(".progress-bar .bar").css("width", w);
			});	
			loader.addEventListener('error', function(event){
				console.log('Preloader:error', event);
			});	

		// self.add('preloader small');
		if(clss !== undefined){
			self.add(clss);
		}
		manifest = Path.adjustManifest(manifest);
		loader.loadManifest(manifest);
	},
	add: function(clss){
		'use strict';
		PreloadGFX.show();
	},
	remove: function(id){
		'use strict';	

		// this.tracker[id] = true;
		for(var t in this.tracker){
			//console.log('remove', t, this.tracker[t]);	
			if(this.tracker[t] === false)
				return;
		}
		PreloadGFX.hide();		
	}
};