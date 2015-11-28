(function () {
	'use strict';
	var app = angular.module('fattiggarden', ['ngRoute']);	

	app.controller('MainController', function($scope, Device) {

		$scope.lib = mainlib;
		$scope.images = images;
		// $scope.exportRoot;
		// $scope.canvas;

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
					stage.scaleX = stage.scaleY = Device.ratio;
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
			Preloader.load($scope.lib.properties.manifest, onFileLoad, onLoadComplete, 'full');
		}

		init();
	});
	
	app.directive('slCanvas', function(Device, Canvas) {	
		function link(scope){	
			// Create base canvas
			// Device.ratio = 1;
			// scope.canvas = Canvas.create(1024, 648, Device.ratio);
			scope.canvas = Canvas.create(1024, 648, Device.ratio);
			scope.canvas.style.background = '#000';
			document.body.appendChild(scope.canvas);	
		}
		return {
			restrict: 'AEC',
	    	link: link
		};
	});

	app.factory('Device', function(){
		function ratio(){
			var ctx = document.createElement('canvas').getContext('2d'),
	        dpr = window.devicePixelRatio || 1,
	        bsr = ctx.webkitBackingStorePixelRatio ||
	              ctx.mozBackingStorePixelRatio ||
	              ctx.msBackingStorePixelRatio ||
	              ctx.oBackingStorePixelRatio ||
	              ctx.backingStorePixelRatio || 1;

	    	return dpr / bsr;
		}
		return {
			ratio: ratio()
		};
	});

	app.factory('Canvas', function() {
		return {
			create: function(w, h, ratio) {			    
			    var canvas = document.createElement('canvas');
			    canvas.width = w * ratio;
			    canvas.height = h * ratio;
			    canvas.style.width = w + 'px';
			    canvas.style.height = h + 'px';
			    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);			    
			    return canvas;
			}
		};
	});

})();