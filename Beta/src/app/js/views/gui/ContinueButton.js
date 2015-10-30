var ContinueButton = {
	init: function(view){

		// Safety belt
		this.destroy();		

		this.view = view;
		this.nextBtnInstance = null;
		this.skipBtnInstance = null;
		this.listners = {};


		if(this.nextBtnInstance === null){
			this.nextBtnInstance = new ButtonCustom(this.view.nextBtn);
		}
		if(this.skipBtnInstance === null){
			this.skipBtnInstance = new ButtonCustom(this.view.skipBtn);
		}

		// Default is none are visible
		this.skipBtnInstance.visible(false);
		this.nextBtnInstance.visible(false);
		
		// Events
		this.listners.skip = this.skipBtnInstance.on('click', this.onClick, this);
		this.listners.next = this.nextBtnInstance.on('click', this.onClick, this);
	},
	activate: function(type){
		switch(type){
			case 'next':
				this.skipBtnInstance.visible(false);
				// this.nextBtnInstance.visible(true);
				this.nextBtnInstance.setActive(true);
			break;
			case 'skip':
				this.skipBtnInstance.setActive(true);
				this.nextBtnInstance.visible(false);
			break;
		}
	},
	ghost: function(type){
		switch(type){
			case 'next':
				this.skipBtnInstance.visible(false);
				this.nextBtnInstance.setActive(false);
			break;
			case 'skip':
				this.skipBtnInstance.setActive(false);
				this.nextBtnInstance.visible(false);
			break;
		}
	},
	hide: function(){
		this.skipBtnInstance.visible(false);
		this.nextBtnInstance.visible(false);
	},
	onClick: function(event){
		var e = new createjs.Event('click');
 		this.dispatchEvent(e);
	},
	destroy: function(){
		if(this.listners !== undefined){
			if(this.listners.skip != null){
				this.skipBtnInstance.off('click', this.listners.skip);
			}
			if(this.listners.next != null){
				this.nextBtnInstance.off('click', this.listners.next);
			}
		}
		this.view = null;
	}
}
createjs.EventDispatcher.initialize(ContinueButton);
