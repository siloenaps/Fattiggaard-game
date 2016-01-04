(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/arbejdere.jpg", id:"arbejdere"},
		{src:"../../../assets/images/slides/fly.jpg", id:"fly"},
		{src:"../../../assets/images/slides/rejsende.jpg", id:"rejsende"},
		{src:"../../../assets/images/slides/sovesal.jpg", id:"sovesal"},
		{src:"../../../assets/images/slides/train15.jpg", id:"train15"},
		{src:"../../../assets/images/slides/train21.jpg", id:"train21"},
		{src:"../../../assets/images/slides/trist.jpg", id:"trist"},
		{src:"../../../assets/images/slides/work.jpg", id:"work"},
		{src:"../../../assets/images/slides/work2.jpg", id:"work2"},
		{src:"../../../assets/images/slides/work3.jpg", id:"work3"}
	]
};



// symbols:



(lib.arbejdere = function() {
	this.initialize(img.arbejdere);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.fly = function() {
	this.initialize(img.fly);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.rejsende = function() {
	this.initialize(img.rejsende);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.sovesal = function() {
	this.initialize(img.sovesal);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train15 = function() {
	this.initialize(img.train15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.train21 = function() {
	this.initialize(img.train21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.trist = function() {
	this.initialize(img.trist);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.work = function() {
	this.initialize(img.work);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.work2 = function() {
	this.initialize(img.work2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.work3 = function() {
	this.initialize(img.work3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_4_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1611));

	// Layer 2
	this.instance = new lib.train21();

	this.instance_1 = new lib.train15();

	this.instance_2 = new lib.work();

	this.instance_3 = new lib.work2();

	this.instance_4 = new lib.fly();

	this.instance_5 = new lib.work3();

	this.instance_6 = new lib.sovesal();

	this.instance_7 = new lib.arbejdere();

	this.instance_8 = new lib.trist();

	this.instance_9 = new lib.rejsende();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},158).to({state:[{t:this.instance_2}]},201).to({state:[{t:this.instance_3}]},137).to({state:[{t:this.instance_4}]},53).to({state:[{t:this.instance_5}]},93).to({state:[{t:this.instance_6}]},235).to({state:[{t:this.instance_7}]},246).to({state:[{t:this.instance_8}]},166).to({state:[{t:this.instance_9}]},199).wait(123));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;