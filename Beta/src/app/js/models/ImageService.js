var ImageService = {
	init: function(){
		'use strict';
		console.log('ImageService.init');
		var recursive = function(obj){
			for (var i in obj) {
				if(typeof obj[i] === 'object'){
					// console.log(obj[i].src);
					if(obj[i].src !== undefined){
						obj[i].src = ImageService.basePath() + obj[i].src;
					}
					recursive(obj[i]);
				}
			};
		}
		recursive(this.matrix);
	},
	basePath: function(){
		'use strict';
		return Environment.basePath() + 'assets/images/pool/';
	},
	matrix: {
		'0.1': { id: 'poorhouse_bg_horsens', label:'background', src:'_0_1BG.jpg'},
		'1.0.1': {
			'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
			'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
			'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
		},
		'3.0': {
			'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
			'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
			'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
		}
	}
}
// var ImageService = function(){
// 	'use strict';
// }
// ImageService.init = function(){
// 	console.log('ImageService.init');
// 	var recursive = function(obj){
// 		for (var i in obj) {
// 			if(typeof obj[i] === 'object'){
// 				// console.log(obj[i].src);
// 				if(obj[i].src !== undefined){
// 					obj[i].src = ImageService.basePath() + obj[i].src;
// 				}
// 				recursive(obj[i]);
// 			}
// 		};
// 	}
// 	recursive(this.matrix);
// };
// ImageService.basePath = function(){
// 	return Environment.basePath() + 'assets/images/pool/';
// 	// return 'assets/game/assets/images/pool/';
// };
// ImageService.matrix = {
// 	// portrait:{
// 	// 	'AD': { id: 'ADCloseUp', label:'background', src:'ADCloseUp.png'},
// 	// 	'AE': { id: 'AECloseUp', label:'background', src:'AECloseUp.png'},
// 	// 	'AF': { id: 'AFCloseUp', label:'background', src:'AFCloseUp.png'},
// 	// 	'BD': { id: 'BDCloseUp', label:'background', src:'BDCloseUp.png'},
// 	// 	'BE': { id: 'BECloseUp', label:'background', src:'BECloseUp.png'},
// 	// 	'BF': { id: 'BFCloseUp', label:'background', src:'BFCloseUp.png'},
// 	// 	'CD': { id: 'CDCloseUp', label:'background', src:'CDCloseUp.png'},
// 	// 	'CE': { id: 'CECloseUp', label:'background', src:'CECloseUp.png'},
// 	// 	'CF': { id: 'CFCloseUp', label:'background', src:'CFCloseUp.png'}
// 	// },
// 	'0.1': { id: 'poorhouse_bg_horsens', label:'background', src:'_0_1BG.jpg'},
// 	'1.0.1': {
// 		'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
// 		'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
// 		'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
// 	},
// 	'3.0': {
// 		'horsens': { id: 'poorhouse_bg_horsens', label:'background', src:'_1_0BGhorsens.jpg'},
// 		'sundholm': { id: 'poorhouse_bg_ssundholm', label:'background', src:'_1_0BGsundholm.jpg'},
// 		'svendborg': { id: 'poorhouse_bg_svendborg', label:'background', src:'_1_0BGsvendborg.jpg'}
// 	}
// }