(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/home1B/Bitmap1.png", id:"Bitmap1"},
		{src:"../../../assets/images/slides/home1B/krig1.jpg", id:"krig1"},
		{src:"../../../assets/images/slides/home1B/krig10.jpg", id:"krig10"},
		{src:"../../../assets/images/slides/home1B/krig11.jpg", id:"krig11"},
		{src:"../../../assets/images/slides/home1B/krig12.jpg", id:"krig12"},
		{src:"../../../assets/images/slides/home1B/krig13.jpg", id:"krig13"},
		{src:"../../../assets/images/slides/home1B/krig14.jpg", id:"krig14"},
		{src:"../../../assets/images/slides/home1B/krig15.jpg", id:"krig15"},
		{src:"../../../assets/images/slides/home1B/krig3.jpg", id:"krig3"},
		{src:"../../../assets/images/slides/home1B/krig5.jpg", id:"krig5"}
	]
};



// symbols:



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig1 = function() {
	this.initialize(img.krig1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig10 = function() {
	this.initialize(img.krig10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig11 = function() {
	this.initialize(img.krig11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig12 = function() {
	this.initialize(img.krig12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig13 = function() {
	this.initialize(img.krig13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig14 = function() {
	this.initialize(img.krig14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig15 = function() {
	this.initialize(img.krig15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig3 = function() {
	this.initialize(img.krig3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.krig5 = function() {
	this.initialize(img.krig5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_home1B = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2137));

	// Layer 2
	this.text = new cjs.Text("tag hjem", "48px 'BigNoodleTitling'", "#FF0000");
	this.text.lineHeight = 50;
	this.text.lineWidth = 279;
	this.text.setTransform(169,150.6);

	this.instance = new lib.Bitmap1();

	this.instance_1 = new lib.krig1();

	this.instance_2 = new lib.krig5();

	this.instance_3 = new lib.krig3();

	this.instance_4 = new lib.krig13();

	this.instance_5 = new lib.krig14();

	this.instance_6 = new lib.krig10();

	this.instance_7 = new lib.krig11();

	this.instance_8 = new lib.krig12();

	this.instance_9 = new lib.krig15();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).to({state:[{t:this.instance_1}]},211).to({state:[{t:this.instance_2}]},186).to({state:[{t:this.instance_3}]},162).to({state:[{t:this.instance_4}]},150).to({state:[{t:this.instance_5}]},354).to({state:[{t:this.instance_6}]},397).to({state:[{t:this.instance_7}]},233).to({state:[{t:this.instance_8}]},269).to({state:[{t:this.instance_9}]},174).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;