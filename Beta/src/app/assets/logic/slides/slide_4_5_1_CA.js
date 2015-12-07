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
		{src:"../../../assets/images/slides/_4_5_1d.jpg", id:"_4_5_1d"},
		{src:"../../../assets/images/slides/_4_5_1e.jpg", id:"_4_5_1e"},
		{src:"../../../assets/images/slides/_4_5_1f.jpg", id:"_4_5_1f"}
	]
};



// symbols:



(lib._4_5_1b = function() {
	this.initialize(img._4_5_1b);
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


// stage content:
(lib.slide_4_5_1_CA = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1325));

	// Layer 2
	this.instance = new lib._4_5_1b();

	this.instance_1 = new lib._4_5_1e();

	this.instance_2 = new lib._4_5_1d();

	this.instance_3 = new lib._4_5_1f();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},550).to({state:[{t:this.instance_2}]},100).to({state:[{t:this.instance_3}]},289).wait(386));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;