var Canvas = {
	create: function(w, h, ratio) {	
		var winScale = Environment.winScale;
		if(winScale > 1) winScale = 1;

	    var canvas = document.createElement('canvas');
	    canvas.width = w * ratio;
	    canvas.height = h * ratio;
	    canvas.style.width = w * winScale + 'px';
	    canvas.style.height = h * winScale + 'px';
	    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);	
	    return canvas;
	}
}