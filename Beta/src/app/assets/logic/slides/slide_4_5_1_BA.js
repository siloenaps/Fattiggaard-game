(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/_4_5_1b.jpg", id:"_4_5_1b"},
		{src:"../../../assets/images/slides/_4_5_1c.jpg", id:"_4_5_1c"},
		{src:"../../../assets/images/slides/_4_5_1d.jpg", id:"_4_5_1d"},
		{src:"../../../assets/images/slides/_4_5_1e.jpg", id:"_4_5_1e"},
		{src:"../../../assets/images/slides/_4_5_1f.jpg", id:"_4_5_1f"},
		{src:"../../../assets/images/slides/weapon04.jpg", id:"weapon04"},
		{src:"../../../assets/images/slides/weapon05.jpg", id:"weapon05"},
		{src:"../../../assets/images/slides/weapon06.jpg", id:"weapon06"},
		{src:"../../../assets/images/slides/weapon07.jpg", id:"weapon07"},
		{src:"../../../assets/images/slides/weapon08.jpg", id:"weapon08"},
		{src:"../../../assets/images/slides/weapon09.jpg", id:"weapon09"},
		{src:"../../../assets/images/slides/weapon11.jpg", id:"weapon11"}
	]
};



// symbols:



(lib._4_5_1b = function() {
	this.initialize(img._4_5_1b);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


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


(lib.weapon04 = function() {
	this.initialize(img.weapon04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon05 = function() {
	this.initialize(img.weapon05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon06 = function() {
	this.initialize(img.weapon06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon07 = function() {
	this.initialize(img.weapon07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon08 = function() {
	this.initialize(img.weapon08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon09 = function() {
	this.initialize(img.weapon09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.weapon11 = function() {
	this.initialize(img.weapon11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_4_5_1_BA = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1991));

	// Layer 2
	this.instance = new lib.weapon07();

	this.instance_1 = new lib._4_5_1b();

	this.instance_2 = new lib._4_5_1e();

	this.instance_3 = new lib.weapon09();

	this.instance_4 = new lib.weapon05();

	this.instance_5 = new lib._4_5_1c();

	this.instance_6 = new lib.weapon04();

	this.instance_7 = new lib._4_5_1f();

	this.instance_8 = new lib.weapon08();

	this.instance_9 = new lib._4_5_1d();

	this.instance_10 = new lib.weapon11();

	this.instance_11 = new lib.weapon06();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},334).to({state:[{t:this.instance_2}]},84).to({state:[{t:this.instance_3}]},109).to({state:[{t:this.instance_4}]},110).to({state:[{t:this.instance_5}]},174).to({state:[{t:this.instance_6}]},175).to({state:[{t:this.instance_7}]},193).to({state:[{t:this.instance_8}]},237).to({state:[{t:this.instance_9}]},173).to({state:[{t:this.instance_10}]},249).to({state:[{t:this.instance_11}]},67).wait(86));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;