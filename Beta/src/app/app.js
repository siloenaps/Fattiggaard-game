var canvas;
(function () {
	'use strict';
	var app = angular.module('fattiggarden', ['ngRoute']);	

	app.controller('MainController', function($scope, Canvas) {
		var vm = this;

		// Init Environment info
		Environment.init();

		$scope.lib = mainlib;
		$scope.images = images;

		$scope.canvas = Canvas.create(1024, 648, Environment.ratio);
		$scope.canvas.style.background = '#000';
		$('.content').append($scope.canvas);

		function init(){
			// Device.ratio = 1;
			// Load files
			var onFileLoad = function(evt){		
				if (evt.item.type === 'image') { 
					$scope.images[evt.item.id] = evt.result; 
				}
			};
			var onLoadComplete = function(evt){
				// Instantiate root object. Equivalent to root timeline
				$scope.exportRoot = new $scope.lib.Main();

				try{
					var stage = new createjs.Stage($scope.canvas);
					stage.addChild($scope.exportRoot);
					
					// Do cursor
					stage.enableMouseOver(10);

					// Scale canvas according to ratio
					stage.scaleX = stage.scaleY = Environment.ratio;
					stage.update();

					// Tik tak - ticker
					Tick.init(stage, 15);
					Tick.enable();	

					// --------------------- Go start ->
					ApplicationManager.start($scope.exportRoot);
				}catch(err){
					console.log(err);
				}				
			};
			// Start preload app
			Preloader.load($scope.lib.properties.manifest, onFileLoad, onLoadComplete, 'full');
		}

		init();
	});
	app.factory('Canvas', function() {
		return {
			create: function(w, h, ratio) {	
				var winScale = Environment.winScale;
				if(winScale > 1) winScale = 1;

			    var canvas = document.createElement('canvas');
			    canvas.width = w * ratio;
			    canvas.height = h * ratio;
			    canvas.style.width = w * winScale + 'px';
			    canvas.style.height = h * winScale + 'px';
			    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);	
			    return canvas;
			}
		};
	});
})();