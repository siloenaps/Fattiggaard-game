var Library = {
	clearSlide: function(){
		'use strict';
		// console.log('clearSlide');
		try{
			slidelib = null;
		}catch(err){
			console.log(err);
		}		
	},
	clearGame: function(){
		'use strict';
		// console.log('clearGame');		
		try{
			gamelib = null;
		}catch(err){
			console.log(err);
		}
	},
	clearMain: function(){
		'use strict';
		// console.log('clearMain');		
		try{
			mainlib = null;
		}catch(err){
			console.log(err);
		}
	},
}