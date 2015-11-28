var Preloader = {
	id: 0,
	imagePath: 'assets/images/preloader.gif',


	load: function(manifest, handleFileLoad, handleComplete, clss, keep, factor){
		'use strict';
		this.id++;

		(factor === undefined) ? this.factor = 1 : this.factor = factor;
		(clss === undefined) ? clss = 'center': //nothing;

		// clss = 'center'
		// console.log('factor:', this.factor)
		console.log('clss:', clss)
		// clss = 'small'
		
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
				if(handleComplete != null){
					handleComplete(event);
				}	
				if(!event.target.keepPreloader){
					self.remove(event.target.id);
				}
			});
			loader.addEventListener('progress', function(event){
				// console.log(event.loaded);
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
		$('body').append(
			'<div class="preload-wrapper"><div class="preloader '+clss+'">'+
				'<div class="image">'+					
				'</div>'+
				'<div class="progress-bar"><div class="bar"></div></div>'+
			'</div>'
		);
	},
	remove: function(id){
		'use strict';
		$('.preload-wrapper').remove();
	}
};