(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/train01.jpg", id:"train01"},
		{src:"../../../assets/images/slides/train05.jpg", id:"train05"},
		{src:"../../../assets/images/slides/train06.jpg", id:"train06"},
		{src:"../../../assets/images/slides/train07.jpg", id:"train07"},
		{src:"../../../assets/images/slides/train08.jpg", id:"train08"},
		{src:"../../../assets/images/slides/train09.jpg", id:"train09"},
		{src:"../../../assets/images/slides/train10.jpg", id:"train10"}
	]
};



// symbols:



(lib.train01 = function() {
	this.initialize(img.train01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train05 = function() {
	this.initialize(img.train05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train06 = function() {
	this.initialize(img.train06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train07 = function() {
	this.initialize(img.train07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train08 = function() {
	this.initialize(img.train08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train09 = function() {
	this.initialize(img.train09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train10 = function() {
	this.initialize(img.train10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_2_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(842));

	// Layer 2
	this.instance = new lib.train09();

	this.instance_1 = new lib.train07();

	this.instance_2 = new lib.train06();

	this.instance_3 = new lib.train01();

	this.instance_4 = new lib.train08();

	this.instance_5 = new lib.train10();

	this.instance_6 = new lib.train05();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},83).to({state:[{t:this.instance_2}]},103).to({state:[{t:this.instance_3}]},136).to({state:[{t:this.instance_4}]},211).to({state:[{t:this.instance_5}]},74).to({state:[{t:this.instance_6}]},162).wait(73));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;