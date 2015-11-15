var Preloader = {
	id: 'preloader',
	imagePath: 'assets/images/preloader.gif',


	load: function(manifest, handleFileLoad, handleComplete, clss){
		var self = this;

		if(clss == null)
			clss = 'center';

		var loader = new createjs.LoadQueue(false);
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
				self.remove();
			});

		// self.add('preloader small');
		self.add('preloader '+clss);
		// self.add('preloader full');
		loader.loadManifest(manifest);
	},
	add: function(clss){
		console.log('preloader:', clss);
		$('body').append(
			'<div id="preloader" class="'+clss+'"><div><div></div>'
		);
	},
	// add: function(clss){
	// 	$('body').append(
	// 		'<div id="preloader" class="'+clss+'">'+
	// 			'<div><img src="'+this.imagePath+'"></div>'+
	// 		'</div>'
	// 	);
	// },
	// add: function(clss){
	// 	$('body').append(
	// 		'<div id="preloader" class="'+clss+'">'+
	// 			'<div class="loader">'+
	// 			  '<div class="box"></div>'+
	// 			  '<div class="box"></div>'+
	// 			  '<div class="box"></div>'+
	// 			  '<div class="box"></div>'+
	// 			'</div>'+
	// 		'</div>'
	// 	);
	// },



	remove: function(){
		$('#'+this.id).remove();
	}
};