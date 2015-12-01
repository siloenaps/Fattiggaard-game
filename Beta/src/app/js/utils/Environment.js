/**
	A facade to browser detection method
	Wrapped in order to enable change of lib if nessesary
*/
var Environment = {	
	data: null,
	browser: {},
	os: null,
	dimensions: {},
	ratioValue: null,
	init: function(){
		'use strict';
		var data = browserDetection();
		this.browser.name = data.browser.toLowerCase();
		this.browser.version = data.version;
		this.browser.firefox = (this.browser.name === 'firefox');
		this.os = data.os;
		this.dimensions.w = window.innerWidth;
		this.dimensions.h = window.innerHeight;
		

		var cr = function(){
			var ctx = document.createElement('canvas').getContext('2d'),
	        dpr = window.devicePixelRatio || 1,
	        bsr = ctx.webkitBackingStorePixelRatio ||
	              ctx.mozBackingStorePixelRatio ||
	              ctx.msBackingStorePixelRatio ||
	              ctx.oBackingStorePixelRatio ||
	              ctx.backingStorePixelRatio || 1;
	    	return dpr / bsr;
		}
		this.ratio = cr();

		var wf = function(){
			return Environment.dimensions.w / 1024;
		}
		this.winScale = wf();
	}
};