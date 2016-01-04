var canvas;
$(function() {
   'use strict';
	var vm = this;

	// Init Environment info
	Environment.init();

	vm.lib = mainlib;
	vm.imagesContainer = images;

	vm.canvas = Canvas.create(1024, 648, Environment.ratio);
	vm.canvas.style.background = '#000';
	$('.canvas').append(vm.canvas);

	// Device.ratio = 1;
	// Load files
	var onFileLoad = function(evt){		
		if (evt.item.type === 'image') { 
			vm.imagesContainer[evt.item.id] = evt.result; 
		}
	};
	var onLoadComplete = function(evt){
		// Instantiate root object. Equivalent to root timeline
		vm.exportRoot = new vm.lib.Main();

		try{
			var stage = new createjs.Stage(vm.canvas);
			stage.addChild(vm.exportRoot);
			
			// Do cursor
			stage.enableMouseOver(20);
			createjs.Touch.enable(stage);

			// Scale canvas according to ratio
			stage.scaleX = stage.scaleY = Environment.ratio;
			stage.update();

			// Tik tak - ticker
			Tick.init(stage, 15);
			Tick.enable();	

			// --------------------- Go start ->
			ApplicationManager.start(vm.exportRoot);
		}catch(err){
			console.log(err);
		}				
	};
	
	// Start preload app
	Preloader.load(vm.lib.properties.manifest, onFileLoad, onLoadComplete, 'full');
});