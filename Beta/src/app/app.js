(function () {
	'use strict';
	var app = angular.module('fattiggarden', ['ngRoute']);	

	app.controller('MainController', function($scope, Device) {

		$scope.lib = mainLib;
		$scope.images = images;
		// $scope.exportRoot;
		// $scope.canvas;

		function init(){
			// Load files
			var onFileLoad = function(evt){		
				if (evt.item.type === 'image') { 
					$scope.images[evt.item.id] = evt.result; 
				}
			};
			var onLoadComplete = function(evt){
				setup();				
				// Preloader.remove();
			};
			Preloader.load($scope.lib.properties.manifest, onFileLoad, onLoadComplete, 'full');
		}

		function setup(){
			// Instantiate root object. Equivalent to root timeline
			$scope.exportRoot = new $scope.lib.FlashApp();

			var stage = new createjs.Stage($scope.canvas);
			stage.addChild($scope.exportRoot);

			// Do cursor
			stage.enableMouseOver(10);

			// Scale canvas according to ratio
			stage.scaleX = stage.scaleY = Device.ratio;
			stage.update();

			// Tik tak						
			//createjs.Ticker.setFPS($scope.lib.properties.fps);
			createjs.Ticker.setFPS(10);

			// Utility to set/remove ticker
			Tick.init(stage);
			Tick.enable();			
			//createjs.Ticker.addEventListener('tick', stage);

			
			//console.log('createjs.Ticker.framerate:', createjs.Ticker.framerate)

			// --------------------- Go start ->
			ApplicationManager.start($scope.exportRoot);
		}

		init();
	});
	
	app.directive('slCanvas', function(Device, Canvas) {	
		function link(scope){	
			// Create base canvas
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