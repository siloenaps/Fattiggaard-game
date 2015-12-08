(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/_4_5_1c.jpg", id:"_4_5_1c"},
		{src:"../../../assets/images/slides/_4_5_1d.jpg", id:"_4_5_1d"},
		{src:"../../../assets/images/slides/_4_5_1e.jpg", id:"_4_5_1e"},
		{src:"../../../assets/images/slides/_4_5_1f.jpg", id:"_4_5_1f"},
		{src:"../../../assets/images/slides/weapon01.jpg", id:"weapon01"},
		{src:"../../../assets/images/slides/weapon02.jpg", id:"weapon02"},
		{src:"../../../assets/images/slides/weapon03.jpg", id:"weapon03"}
	]
};



// symbols:



(lib._4_5_1c = function() {
	this.initialize(img._4_5_1c);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_5_1d = function() {
	this.initialize(img._4_5_1d);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_5_1e = function() {
	this.initialize(img._4_5_1e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib._4_5_1f = function() {
	this.initialize(img._4_5_1f);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon01 = function() {
	this.initialize(img.weapon01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon02 = function() {
	this.initialize(img.weapon02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon03 = function() {
	this.initialize(img.weapon03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_2_7_1_amory = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2231));

	// Layer 1
	this.instance = new lib.weapon03();

	this.instance_1 = new lib.weapon01();

	this.instance_2 = new lib._4_5_1e();

	this.instance_3 = new lib._4_5_1d();

	this.instance_4 = new lib.weapon02();

	this.instance_5 = new lib._4_5_1c();

	this.instance_6 = new lib._4_5_1f();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},384).to({state:[{t:this.instance_2}]},189).to({state:[{t:this.instance_3}]},106).to({state:[{t:this.instance_4}]},132).to({state:[{t:this.instance_5}]},166).to({state:[{t:this.instance_6}]},376).to({state:[{t:this.instance_4}]},377).wait(501));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;