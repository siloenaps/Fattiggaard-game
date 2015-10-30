var LoadJS = {
	// load: function(url, delegate, location){
	// 	'use strict';

	// 	//url is URL of external file, code is the code
	//     //to be called from the file, location is the location to 
	//     //insert the <script> element

	//     if(location == null)
	//     	location = document.body;

	//     var scriptTag = document.createElement('script');	    

	//     scriptTag.onload = delegate;
	//     scriptTag.onreadystatechange = delegate;

	//     scriptTag.src = url;
	//     location.appendChild(scriptTag);

	// },
	load: function(urls, delegate, location){
		'use strict';
		var urlList;
		
		//url is URL of external file, code is the code
	    //to be called from the file, location is the location to 
	    //insert the <script> element

	    var counter = 0;
	    var tracker = {};

	    if(typeof urls === 'string'){
	    	urlList = urls.split(',');
	    }else{
	    	urlList = urls;
	    }


	    if(location == null)
	    	location = document.body;

	    for(var i=0; i<urlList.length; i++){
		    var scriptTag = document.createElement('script');		    
		    // console.log(urlList[i]);

		    scriptTag.onload = scriptTag.onreadystatechange = function(event){
		    	counter++;

		    	// Split the path of the laoded file. Get the 2 last entries
		    	var arr = event.target.src.split('/');
		    	var identifier1 = arr[arr.length-2] +'/'+arr[arr.length-1];

		    	// Track which file is loaded
		    	tracker[identifier1] = true;

		    	// Through list of files requested to be loaded
		    	for(var a=0; a<urlList.length; a++){
		    		// Split the path of the file requsted to be loaded. Get the 2 last entries
		    		var arr2 = urlList[a].split('/');
		    		var identifier2 = arr2[arr2.length-2] +'/'+arr2[arr2.length-1];

		    		// Check if the file requested to be loaded match the one of those loaded
		    		// If one is still not loaded then leave
					if(tracker[identifier2] !== true){
						return false;
					}
		    	}

		    	// Reached this? All files are loaded
		    	delegate();
		    };

		    scriptTag.src = urlList[i];
		    location.appendChild(scriptTag);			    
	    }	    
	}	
};