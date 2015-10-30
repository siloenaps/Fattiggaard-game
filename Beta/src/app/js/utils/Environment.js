/**
	A facade to browser detection method
	Wrapped in order to enable change of lib if nessesary
*/
var Environment = {	
	data: null,
	browser: {},
	os: null,
	init: function(){
		'use strict';
		var data = browserDetection();
		this.browser.name = data.browser.toLowerCase();
		this.browser.version = data.version;
		this.browser.firefox = (this.browser.name === 'firefox');
		this.os = data.os;

	}
};