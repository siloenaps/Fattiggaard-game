var Transitions = {
	transInPosition: function(pageView, callback){
		// New page in
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
		// New page in
		createjs.Tween.get(pageView)
			.to({x:-1024}, 300, createjs.Ease.linear)
			.call(function(){
				if(callback !== undefined){
					callback();
				}
			});
	},
	transInAlpha: function(pageView, callback){
		// New page in
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