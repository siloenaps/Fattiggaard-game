(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/_4_7_1.jpg", id:"_4_7_1"},
		{src:"../../../assets/images/slides/_4_7_10.jpg", id:"_4_7_10"},
		{src:"../../../assets/images/slides/_4_7_2.jpg", id:"_4_7_2"},
		{src:"../../../assets/images/slides/_4_7_3.jpg", id:"_4_7_3"},
		{src:"../../../assets/images/slides/_4_7_4.jpg", id:"_4_7_4"},
		{src:"../../../assets/images/slides/_4_7_5.jpg", id:"_4_7_5"},
		{src:"../../../assets/images/slides/_4_7_6.jpg", id:"_4_7_6"},
		{src:"../../../assets/images/slides/_4_7_7.jpg", id:"_4_7_7"},
		{src:"../../../assets/images/slides/_4_7_8.jpg", id:"_4_7_8"}
	]
};



// symbols:



(lib._4_7_1 = function() {
	this.initialize(img._4_7_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_10 = function() {
	this.initialize(img._4_7_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_2 = function() {
	this.initialize(img._4_7_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_3 = function() {
	this.initialize(img._4_7_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_4 = function() {
	this.initialize(img._4_7_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_5 = function() {
	this.initialize(img._4_7_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_6 = function() {
	this.initialize(img._4_7_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_7 = function() {
	this.initialize(img._4_7_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_7_8 = function() {
	this.initialize(img._4_7_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_4_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1959));

	// Layer 2
	this.instance = new lib._4_7_5();

	this.instance_1 = new lib._4_7_6();

	this.instance_2 = new lib._4_7_1();

	this.instance_3 = new lib._4_7_3();

	this.instance_4 = new lib._4_7_8();

	this.instance_5 = new lib._4_7_4();

	this.instance_6 = new lib._4_7_2();

	this.instance_7 = new lib._4_7_7();

	this.instance_8 = new lib._4_7_10();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},115).to({state:[{t:this.instance_2}]},207).to({state:[{t:this.instance_3}]},180).to({state:[{t:this.instance_4}]},170).to({state:[{t:this.instance_5}]},176).to({state:[{t:this.instance_6}]},474).to({state:[{t:this.instance_7}]},344).to({state:[{t:this.instance_8}]},190).wait(103));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;