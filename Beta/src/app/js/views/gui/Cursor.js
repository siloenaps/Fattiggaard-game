var Cursor = {
	root: null,
	init: function(root){
		'use strict';
		this.root = root;
	},
	over: function(){
		'use strict';
		this.root.cursor = 'pointer';
	},
	out: function(){
		'use strict';
		this.root.cursor = 'auto';
	}
};