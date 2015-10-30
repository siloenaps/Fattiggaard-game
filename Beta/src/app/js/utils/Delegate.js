'use strict';
var Delegate = {	
	create: function (func, target) {
		'use strict';
	    return function() { 
	    	try{
	    		return func.apply(target, arguments);	
	    	}catch(err){
			   console.log(err);
			}
	    }
	}
};