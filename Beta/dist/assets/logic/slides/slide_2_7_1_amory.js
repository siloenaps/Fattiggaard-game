(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/amory/weapon01.jpg", id:"weapon01"},
		{src:"../../../assets/images/slides/amory/weapon02.jpg", id:"weapon02"},
		{src:"../../../assets/images/slides/amory/weapon03.jpg", id:"weapon03"}
	]
};



// symbols:



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
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(709));

	// Layer 1
	this.instance = new lib.weapon03();

	this.instance_1 = new lib.weapon01();

	this.instance_2 = new lib.weapon02();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},211).to({state:[{t:this.instance_2}]},186).to({state:[{t:this.instance}]},162).wait(150));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;