var PlayerStats = {
	challenge: 'B',			// Default test value
	family: 'D',			// Default test value
	nickname: null,
	poorhouse: 'svendborg', // Test 
	mood: 2,
	health: 4,
	money: 3,
	job: null,
	advice: null,
	wayout: null,
	job_germany: ['B', 'A'], // Default test values
	spending: null,
	whatnow: null,
	nazi: null,
	pointsDiff: {mood: 0, health: 0, money: 0},

	resetDiff: function(){
		'use strict';
		this.pointsDiff = {mood: 0, health: 0, money: 0};
	},

	isAPlusPoint: function(){
		'use strict';
		for(var key in this.pointsDiff){
			if(this.pointsDiff[key] > 0){
				return true;
			}
		}
	},

	isAMinusPoint: function(){
		'use strict';
		for(var key in this.pointsDiff){
			if(this.pointsDiff[key] < 0){
				return true;
			}
		}
	},

	set: function(type, val){
		'use strict';
		// Reset diff
		this.pointsDiff[type] = 0;

		// Remember the previous value
		var prev = this[type];	

		// Set new value
		this[type] = val;

		// Find diff
		this.pointsDiff[type] = this[type] - prev;		

		// Cap values for points
		if(type == 'mood' || type == 'health' || type == 'money'){
			if(this[type] > 10){
				this[type] = 10;
			}
			if(this[type] < 1){
				this[type] = 1;
			}
		}
	},
	append: function(type, val){	
		'use strict';	
		// Reset diff
		this.pointsDiff[type] = 0;
		
		// Remember the previous value
		var prev = this[type];	

		// Set new value
		this[type] += val;

		// Find diff
		this.pointsDiff[type] = this[type] - prev;			

		// Cap values for points
		if(type == 'mood' || type == 'health' || type == 'money'){
			if(this[type] > 10){
				this[type] = 10;
			}
			if(this[type] < 1){
				this[type] = 1;
			}
		}
	}
}