(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/_3_0_11.jpg", id:"_3_0_11"},
		{src:"../../../assets/images/slides/_3_0_2.jpg", id:"_3_0_2"},
		{src:"../../../assets/images/slides/_3_0_3.jpg", id:"_3_0_3"},
		{src:"../../../assets/images/slides/_3_0_4.jpg", id:"_3_0_4"},
		{src:"../../../assets/images/slides/_3_0_5.jpg", id:"_3_0_5"},
		{src:"../../../assets/images/slides/_3_0_7.jpg", id:"_3_0_7"},
		{src:"../../../assets/images/slides/vindue.jpg", id:"vindue"}
	]
};



// symbols:



(lib._3_0_11 = function() {
	this.initialize(img._3_0_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._3_0_2 = function() {
	this.initialize(img._3_0_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._3_0_3 = function() {
	this.initialize(img._3_0_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._3_0_4 = function() {
	this.initialize(img._3_0_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._3_0_5 = function() {
	this.initialize(img._3_0_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._3_0_7 = function() {
	this.initialize(img._3_0_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.vindue = function() {
	this.initialize(img.vindue);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.text = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("fredag d. 13. november 1942", "24px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 26;
	this.text.lineWidth = 371;
	this.text.setTransform(-65,0);

	this.addChild(this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-65,0,375,28.1);


// stage content:
(lib.slide_3_0 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1556));

	// Layer 2
	this.instance = new lib.text();
	this.instance.setTransform(467.5,387.2,1,1,0,0,0,169.5,23.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(132).to({alpha:0},10).to({_off:true},1).wait(1413));

	// Layer 4
	this.instance_1 = new lib.vindue();

	this.instance_2 = new lib._3_0_2();

	this.instance_3 = new lib._3_0_3();

	this.instance_4 = new lib._3_0_4();

	this.instance_5 = new lib._3_0_5();

	this.instance_6 = new lib._3_0_7();

	this.instance_7 = new lib._3_0_11();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},277).to({state:[{t:this.instance_3}]},59).to({state:[{t:this.instance_4}]},43).to({state:[{t:this.instance_5}]},342).to({state:[{t:this.instance_6}]},317).to({state:[{t:this.instance_7}]},230).wait(288));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,608,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;