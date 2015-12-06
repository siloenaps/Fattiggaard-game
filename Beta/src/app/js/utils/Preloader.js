var Preloader = {
	id: 0,
	imagePath: 'assets/images/preloader.gif',
	tracker: {},


	load: function(manifest, handleFileLoad, handleComplete, clss, keep, factor){
		'use strict';
		this.id++;

		(factor === undefined) ? this.factor = 1 : this.factor = factor;
		if(clss === undefined) clss = 'small';

		this.tracker[this.id] = false;
		
		// If nothing to load exit 
		if(manifest.length === 0){
			handleComplete(null);
			return;
		}

		var self = this;

		// if(clss == null)
		// 	clss = 'center';

		var loader = new createjs.LoadQueue(false);
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
				if(!event.target.keepPreloader){					
					self.remove(id);
				}
			});
			loader.addEventListener('progress', function(event){
				var w = (event.loaded * 400) / self.factor;
				$(".progress-bar .bar").css("width", w);
			});	

		// self.add('preloader small');
		if(clss !== undefined){
			self.add(clss);
		}
		
		loader.loadManifest(manifest);
	},
	add: function(clss){
		'use strict';
		console.log('add:', clss, this.id);		

		// this.id = id;
		$('.preload-wrapper').removeClass('hide');
		$('.preload-wrapper').addClass('show');

		// $('.preload-wrapper').removeClass('full');
		// $('.preload-wrapper').removeClass('small');
		// $('.preloader').removeClass('full');
		// $('.preloader').removeClass('small');

		// $('.preload-wrapper').addClass(clss);
		// $('.preloader').addClass(clss);


		$('.progress-bar').removeClass('hide');
		$('.progress-bar').removeClass('show');
		// $('.progress-bar').addClass('show');
	},
	remove: function(id){
		'use strict';		
		
		
		// this.tracker[id] = true;
		for(var t in this.tracker){
			//console.log('remove', t, this.tracker[t]);	
			if(this.tracker[t] === false)
				return;
		}

		$('.preload-wrapper').removeClass('show');
		$('.preload-wrapper').addClass('hide');
		$('.progress-bar').removeClass('show');
		$('.progress-bar').removeClass('hide');
		// $('.progress-bar').addClass('hide');
		
	}
};