var PlayerStats = {
	challenge: 'B',			// Default test value
	family: 'D',			// Default test value
	nickname: null,
	poorhouse: null,
	mood: 2,
	health: 4,
	money: 3,
	job: null,
	advice: null,
	wayout: null,
	job_germany: ['A', 'A'], // Default test values
	spending: null,
	whatnow: null,

	set: function(type, val){		
		this[type] = val;

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
		this[type] += val;

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