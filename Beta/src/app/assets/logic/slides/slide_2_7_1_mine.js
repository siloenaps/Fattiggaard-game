(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/mine01.jpg", id:"mine01"},
		{src:"../../../assets/images/slides/mine02.jpg", id:"mine02"},
		{src:"../../../assets/images/slides/mine03.jpg", id:"mine03"},
		{src:"../../../assets/images/slides/mine04.jpg", id:"mine04"}
	]
};



// symbols:



(lib.mine01 = function() {
	this.initialize(img.mine01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.mine02 = function() {
	this.initialize(img.mine02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.mine03 = function() {
	this.initialize(img.mine03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.mine04 = function() {
	this.initialize(img.mine04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_2_7_1_mine = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2036));

	// Layer 1
	this.instance = new lib.mine03();

	this.instance_1 = new lib.mine02();

	this.instance_2 = new lib.mine04();

	this.instance_3 = new lib.mine01();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},330).to({state:[{t:this.instance_2}]},786).to({state:[{t:this.instance_3}]},281).wait(639));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;