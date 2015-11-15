var SubFlowController = function(){
	'use strict';

	var action = function(delegate, triggers){
		return{
			delegate: delegate,
			triggers: triggers
		};
	}

	return {
		actions: {},
		addAction: function (trigger, delegate, triggers){
			'use strict';
			this.actions[trigger] = new action(delegate, triggers);
		},
		next: function(trigger){
			'use strict';
		
			// Allow tick
			Tick.enable();
			Tick.framerate(15);


			var action = this.actions[trigger];

			console.log('next:', trigger, action);
			
			try{
				action.delegate(action.triggers);
			}catch(err) {
				console.log(err);
			}
		},	
		onComplete: function(event) {
			'use strict';
			// // Set next button active
			// this.continueBtn.activate('next');

			// // Remove events
			// if(this.playerComponent != null){
			// 	this.playerComponent.off('complete', this.listeners.complete);	
			// }	
		},
		onContinue: function(event) {
			'use strict';
			this.next();
		}
	};
};