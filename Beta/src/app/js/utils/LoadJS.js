var LoadJS = {
	cache: [],
	load: function(urls, delegate, location){
		'use strict';
		var urlList = [];
		var tmpList = [];

		// $('.preload-wrapper').removeClass('hide');
		// $('.preload-wrapper').addClass('show');
		// $('.preload-wrapper').addClass('full');
		// $('.preloader').addClass('full');
		
		//url is URL of external file, code is the code
	    //to be called from the file, location is the location to 
	    //insert the <script> element

	    var counter = 0;
	    var tracker = {};

	    if(typeof urls === 'string'){
	    	tmpList = urls.split(',');
	    }else{
	    	tmpList = urls;
	    }

	    // Through list of files requested to be loaded
    	for(var k=0; k<tmpList.length; k++){	
    		var may = true;
			for(var b = 0; b<this.cache.length; b++){
				if(this.cache[b] === tmpList[k]){
					may == false;
					break;
				}				
			}
			if(may){
				urlList.push(tmpList[k]);
			}
    	}

	    if(location == null)
	    	location = document.body;

	    for(var i=0; i<urlList.length; i++){

    		// console.log(this.cache);
    		this.cache.push(urlList[i]);

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
						// console.log('LoadJS:onload', urlList[a]);
						// this.cache.push(urlList[a]);
						return false;
					}
		    	}

		    	// Reached this? All files are loaded
		    	delegate();

		  //   	$('.preload-wrapper').addClass('hide');
				// $('.preload-wrapper').removeClass('show');
		    };

		    scriptTag.src = urlList[i];
		    location.appendChild(scriptTag);
		    // location.removeChild(scriptTag);  
	    }	    
	}	
};