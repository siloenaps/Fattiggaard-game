(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/train09.jpg", id:"train09"},
		{src:"../../../assets/images/slides/train12.jpg", id:"train12"},
		{src:"../../../assets/images/slides/train14.jpg", id:"train14"},
		{src:"../../../assets/images/slides/train16.jpg", id:"train16"},
		{src:"../../../assets/images/slides/train17.jpg", id:"train17"},
		{src:"../../../assets/images/slides/train19.jpg", id:"train19"},
		{src:"../../../assets/images/slides/train21.jpg", id:"train21"}
	]
};



// symbols:



(lib.train09 = function() {
	this.initialize(img.train09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train12 = function() {
	this.initialize(img.train12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train14 = function() {
	this.initialize(img.train14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train16 = function() {
	this.initialize(img.train16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train17 = function() {
	this.initialize(img.train17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train19 = function() {
	this.initialize(img.train19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train21 = function() {
	this.initialize(img.train21);
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
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1043));

	// Layer 4
	this.instance = new lib.train09();

	this.instance_1 = new lib.train21();

	this.instance_2 = new lib.train17();

	this.instance_3 = new lib.train12();

	this.instance_4 = new lib.train19();

	this.instance_5 = new lib.train16();

	this.instance_6 = new lib.train14();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},140).to({state:[{t:this.instance_2}]},117).to({state:[{t:this.instance_3}]},148).to({state:[{t:this.instance_4}]},281).to({state:[{t:this.instance_5}]},74).to({state:[{t:this.instance_6}]},177).wait(106));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;