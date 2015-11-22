var Transitions = {
	inOut: function(inObj, outObj, delegate){
		// For checking done of in/out tween
		var left = 2;
		var checkDone = function(left){
			if(left == 0){
				if(delegate !== undefined){
					delegate();
				}
			}
		}
		// Previous page out
		switch(outObj.prop){
			case 'pos': 
				this.transOutPosition(outObj.element, function(){
					checkDone(--left);
				});
			break;
			case 'alpha': 
				this.transOutAlpha(outObj.element, function(){
					checkDone(--left);
				});
			break;
		}
		// New page in
		switch(inObj.prop){
			case 'pos': 
				this.transInPosition(inObj.element, function(){
					checkDone(--left);
				});
			break;
			case 'alpha': 
				this.transInAlpha(inObj.element, function(){
					checkDone(--left);
				});
			break;
		}
		
	},
	transInPosition: function(pageView, callback){
		if(pageView === undefined)
			return;

		// New page in
		pageView.visible = true;
		pageView.alpha = 1;
		pageView.x = 1024;
		createjs.Tween.get(pageView)
			.to({x:0}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transOutPosition: function(pageView, callback){
		if(pageView === undefined)
			return;

		// New page in
		createjs.Tween.get(pageView)
			.to({x:-1024}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
					pageView.visible = false;
				}
			});
	},
	transInAlpha: function(pageView, callback){
		if(pageView === undefined)
			return;

		// New page in
		pageView.visible = true;
		pageView.alpha = 0;
		pageView.x = 0;
		createjs.Tween.get(pageView)
			.to({alpha:1}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transOutAlpha: function(pageView, callback){
		if(pageView === undefined)
			return;
		
		// New page in
		createjs.Tween.get(pageView)
			.to({alpha:0}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	changeBackground: function(oldView, newView){
		try{
			if(oldView !== null){
				oldView.x = 1024;
				oldView.visible = false;
			}
		}catch(err) {
			console.log(err);
		}
		try{
			newView.x = 0;
			newView.visible = true;
		}catch(err) {
			console.log(err);
		}
		return newView;
	}
}