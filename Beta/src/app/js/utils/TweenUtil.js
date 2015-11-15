'use strict';
var TweenUtil = {
	to: function(element, options, delay, delegate){
		createjs.Tween.get(element)
			.to(options, delay, createjs.Ease.linear)
			.call(function(){
				if(delegate !== undefined){
					delegate();
				}
			})
	}
}