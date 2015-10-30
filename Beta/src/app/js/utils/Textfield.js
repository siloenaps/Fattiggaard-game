var TextField = function(){

} 
TextField.create = function(type, text, fontsize, color, fontface, fontWeight){

	if(!fontWeight)
	 var fontWeight = '';

	var tf = new createjs.Text();
	// tf.lineWidth = 490;

	tf.font = fontWeight+fontsize+'px '+fontface;
	tf.color = color;
	tf.text = text;
	return tf;
}
TextField.createBmp = function(id, text, fontsize, color){
	var bmptxt = Font.create(id, fontsize, text);
	if(color)
		bmptxt.setColor(color);
	return bmptxt;
}