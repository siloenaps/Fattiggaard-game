(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/intro/_1940_01.jpg", id:"_1940_01"},
		{src:"../../../assets/images/slides/intro/Intro_1.jpg", id:"Intro_1"},
		{src:"../../../assets/images/slides/intro/Intro_11.jpg", id:"Intro_11"},
		{src:"../../../assets/images/slides/intro/Intro_12.jpg", id:"Intro_12"},
		{src:"../../../assets/images/slides/intro/Intro_13.jpg", id:"Intro_13"},
		{src:"../../../assets/images/slides/intro/Intro_14.jpg", id:"Intro_14"},
		{src:"../../../assets/images/slides/intro/Intro_15.jpg", id:"Intro_15"},
		{src:"../../../assets/images/slides/intro/Intro_16.jpg", id:"Intro_16"},
		{src:"../../../assets/images/slides/intro/Intro_17.jpg", id:"Intro_17"},
		{src:"../../../assets/images/slides/intro/Intro_2.jpg", id:"Intro_2"},
		{src:"../../../assets/images/slides/intro/Intro_4.jpg", id:"Intro_4"},
		{src:"../../../assets/images/slides/intro/Intro_7.jpg", id:"Intro_7"},
		{src:"../../../assets/images/slides/intro/Intro_8.jpg", id:"Intro_8"},
		{src:"../../../assets/images/slides/intro/Intro_9.jpg", id:"Intro_9"}
	]
};



// symbols:



(lib._1940_01 = function() {
	this.initialize(img._1940_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_1 = function() {
	this.initialize(img.Intro_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_11 = function() {
	this.initialize(img.Intro_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_12 = function() {
	this.initialize(img.Intro_12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_13 = function() {
	this.initialize(img.Intro_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_14 = function() {
	this.initialize(img.Intro_14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_15 = function() {
	this.initialize(img.Intro_15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_16 = function() {
	this.initialize(img.Intro_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_17 = function() {
	this.initialize(img.Intro_17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_2 = function() {
	this.initialize(img.Intro_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_4 = function() {
	this.initialize(img.Intro_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_7 = function() {
	this.initialize(img.Intro_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_8 = function() {
	this.initialize(img.Intro_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_9 = function() {
	this.initialize(img.Intro_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_intro = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2137));

	// Layer 2
	this.instance = new lib.Intro_1();

	this.instance_1 = new lib.Intro_2();

	this.instance_2 = new lib.Intro_17();
	this.instance_2.setTransform(0,0.5);

	this.instance_3 = new lib._1940_01();

	this.instance_4 = new lib.Intro_4();

	this.instance_5 = new lib.Intro_9();

	this.instance_6 = new lib.Intro_7();

	this.instance_7 = new lib.Intro_8();

	this.instance_8 = new lib.Intro_12();

	this.instance_9 = new lib.Intro_11();

	this.instance_10 = new lib.Intro_13();

	this.instance_11 = new lib.Intro_14();

	this.instance_12 = new lib.Intro_15();

	this.instance_13 = new lib.Intro_16();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},211).to({state:[{t:this.instance_2}]},75).to({state:[{t:this.instance_3}]},111).to({state:[{t:this.instance_4}]},162).to({state:[{t:this.instance_5}]},52).to({state:[{t:this.instance_6}]},91).to({state:[{t:this.instance_7}]},188).to({state:[{t:this.instance_8}]},193).to({state:[{t:this.instance_9}]},145).to({state:[{t:this.instance_10}]},169).to({state:[{t:this.instance_11}]},296).to({state:[{t:this.instance_12}]},269).to({state:[{t:this.instance_13}]},174).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(libSlideIntro = libSlideIntro||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var libSlideIntro, images, createjs, ss;