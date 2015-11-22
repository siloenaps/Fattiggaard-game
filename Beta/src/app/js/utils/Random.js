// Math
Math.range = function(min, max){
	'use strict';
	return Math.random() * (max - min) + min;
}
Math.rangeInt = function(min, max){
	'use strict';
	return Math.floor(Math.random() * (max - min + 1)) + min;
}