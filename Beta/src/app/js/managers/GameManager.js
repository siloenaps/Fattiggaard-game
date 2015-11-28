var GameManager = {
	root: null,
	init: function(root){
		'use strict';
		if(root === undefined){
			throw new Error("'root' is undefined");
		}
		this.root = root;
	},
	restart: function(){
		'use strict';
	},
	destroy: function(){
		'use strict';
	}
};