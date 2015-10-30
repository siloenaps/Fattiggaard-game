var CheckboxGroup = {
	clickedCounter: 0,
	setup: function(viewList, valueList, delegate){
		'use strict';
		var self = this;

		// this.clear();
		
		this.clickedCounter = 0;
		
		this.delegate = delegate;

		// Group
		this.group = new ButtonGroup();

		for (var i = 0; i < viewList.length; i++) {
			// Checkbox
			var cb = new RadioButton(viewList[i], {value:valueList[i]});
			this.group.add(cb);
		};

		// Checkbox events
		this.listener = this.group.on('click', function(event){
			self.clickedCounter++;
			if(self.delegate != null)
				self.delegate({clicked: self.clickedCounter, value: event.data.value});
		});
	},
	clear: function(){
		'use strict';
		// Clean eventual previous events and delegates
		if(this.group != null){
			this.group.reset();
			if(this.listener != null){
				this.group.off('click', this.listener);
			}
			this.group = null;
		}
		this.delegate = null;
	}
}