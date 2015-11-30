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

			// Remove startup preloader div
			// $('.preload-wrapper').remove();
			// $('.preload-wrapper').hide();

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


	// app.directive('resize', function ($window) {
	//     return function (scope, element) {
	//         var w = angular.element($window);
	//         scope.getWindowDimensions = function () {
	//             return {
	//                 'h': w.height(),
	//                 'w': w.width()
	//             };
	//         };
	//         scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
	//             scope.windowHeight = newValue.h;
	//             scope.windowWidth = newValue.w;

	//             scope.style = function () {
	//                 return {
	//                     'height': (newValue.h - 100) + 'px',
	//                         'width': (newValue.w - 100) + 'px'
	//                 };
	//             };

	//         }, true);

	//         w.bind('resize', function () {
	//             scope.$apply();
	//         });
	//     }
	// })

	// app.factory('Device', function(){
	// 	function ratio(){
	// 		var ctx = document.createElement('canvas').getContext('2d'),
	//         dpr = window.devicePixelRatio || 1,
	//         bsr = ctx.webkitBackingStorePixelRatio ||
	//               ctx.mozBackingStorePixelRatio ||
	//               ctx.msBackingStorePixelRatio ||
	//               ctx.oBackingStorePixelRatio ||
	//               ctx.backingStorePixelRatio || 1;
	//     	return dpr / bsr;
	// 	}
	// 	return {
	// 		ratio: ratio()
	// 	};
	// });
	
	// app.directive('slCanvas', function(Device, Canvas) {	
	// 	function link(scope){	
	// 		// Create base canvas
	// 		scope.canvas = Canvas.create(1024, 648, Device.ratio);
	// 		scope.canvas.style.background = '#000';
	// 		document.body.appendChild(scope.canvas);	
	// 		canvas = scope.canvas;
	// 	}
	// 	return {
	// 		restrict: 'AEC',
	//     	link: link
	// 	};
	// });

})();