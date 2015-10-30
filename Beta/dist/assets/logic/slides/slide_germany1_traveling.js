(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/germany1/Bitmap2.png", id:"Bitmap2"},
		{src:"../../../assets/images/slides/germany1/Svendborg1.jpg", id:"Svendborg1"},
		{src:"../../../assets/images/slides/germany1/Svendborg2.jpg", id:"Svendborg2"},
		{src:"../../../assets/images/slides/germany1/Svendborg3.jpg", id:"Svendborg3"}
	]
};



// symbols:



(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,405);


(lib.Svendborg1 = function() {
	this.initialize(img.Svendborg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,405);


(lib.Svendborg2 = function() {
	this.initialize(img.Svendborg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,405);


(lib.Svendborg3 = function() {
	this.initialize(img.Svendborg3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,405);


// stage content:
(lib.slide_germany1_traveling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1169));

	// Layer 2
	this.text = new cjs.Text("tyskland", "24px 'Special Elite'", "#66CC99");
	this.text.lineHeight = 26;
	this.text.lineWidth = 209;
	this.text.setTransform(145,175.1);

	this.instance = new lib.Bitmap2();

	this.instance_1 = new lib.Svendborg3();

	this.instance_2 = new lib.Svendborg1();

	this.instance_3 = new lib.Svendborg2();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).to({state:[{t:this.instance_1}]},252).to({state:[{t:this.instance_2}]},168).to({state:[{t:this.instance_3}]},399).wait(350));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,405);

})(germany1SlideLib = germany1SlideLib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var germany1SlideLib, images, createjs, ss;