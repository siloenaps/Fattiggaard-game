var Path = {
	adjustManifest: function(manifest){
		for(var i in manifest){
			if(typeof manifest[i] === 'object'){
				if(!manifest[i].adjusted){
					manifest[i].src = this.adjustUrl(manifest[i].src);
					manifest[i].adjusted = true
				}
			}
		}
		return manifest;
	},
	adjustUrl: function(url){
		var newUrl = Environment.basePath() + url.replace(/\.\.\//g, '');
		// console.log(url, '|', newUrl);
		return newUrl;
	}
}