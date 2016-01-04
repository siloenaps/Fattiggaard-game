(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/slaughter01.jpg", id:"slaughter01"},
		{src:"../../../assets/images/slides/slaughter02.jpg", id:"slaughter02"},
		{src:"../../../assets/images/slides/slaughter05.jpg", id:"slaughter05"},
		{src:"../../../assets/images/slides/slaughter06.jpg", id:"slaughter06"},
		{src:"../../../assets/images/slides/slaughter07.jpg", id:"slaughter07"},
		{src:"../../../assets/images/slides/slaughter08.jpg", id:"slaughter08"},
		{src:"../../../assets/images/slides/slaughter09.jpg", id:"slaughter09"}
	]
};



// symbols:



(lib.slaughter01 = function() {
	this.initialize(img.slaughter01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter02 = function() {
	this.initialize(img.slaughter02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter05 = function() {
	this.initialize(img.slaughter05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter06 = function() {
	this.initialize(img.slaughter06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter07 = function() {
	this.initialize(img.slaughter07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter08 = function() {
	this.initialize(img.slaughter08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter09 = function() {
	this.initialize(img.slaughter09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_2_7_1_butcher = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1810));

	// Layer 4
	this.instance = new lib.slaughter06();

	this.instance_1 = new lib.slaughter05();

	this.instance_2 = new lib.slaughter01();

	this.instance_3 = new lib.slaughter02();

	this.instance_4 = new lib.slaughter07();

	this.instance_5 = new lib.slaughter08();

	this.instance_6 = new lib.slaughter09();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},154).to({state:[{t:this.instance_2}]},80).to({state:[{t:this.instance_3}]},189).to({state:[{t:this.instance_4}]},188).to({state:[{t:this.instance_5}]},313).to({state:[{t:this.instance_6}]},252).to({state:[{t:this.instance}]},162).wait(472));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;