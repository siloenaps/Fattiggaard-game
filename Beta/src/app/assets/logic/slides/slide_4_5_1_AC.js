(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/kneipe.jpg", id:"kneipe"},
		{src:"../../../assets/images/slides/slaughter01.jpg", id:"slaughter01"},
		{src:"../../../assets/images/slides/slaughter02.jpg", id:"slaughter02"},
		{src:"../../../assets/images/slides/slaughter04.jpg", id:"slaughter04"},
		{src:"../../../assets/images/slides/slaughter05.jpg", id:"slaughter05"},
		{src:"../../../assets/images/slides/slaughter06.jpg", id:"slaughter06"},
		{src:"../../../assets/images/slides/slaughter07.jpg", id:"slaughter07"},
		{src:"../../../assets/images/slides/slaughter08.jpg", id:"slaughter08"},
		{src:"../../../assets/images/slides/slaughter09.jpg", id:"slaughter09"}
	]
};



// symbols:



(lib.kneipe = function() {
	this.initialize(img.kneipe);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter01 = function() {
	this.initialize(img.slaughter01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter02 = function() {
	this.initialize(img.slaughter02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.slaughter04 = function() {
	this.initialize(img.slaughter04);
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
(lib.slide_4_5_1_AB_ = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.slaughter06();

	this.instance_1 = new lib.slaughter05();

	this.instance_2 = new lib.slaughter01();

	this.instance_3 = new lib.slaughter02();

	this.instance_4 = new lib.slaughter07();

	this.instance_5 = new lib.slaughter08();

	this.instance_6 = new lib.kneipe();

	this.instance_7 = new lib.slaughter04();

	this.instance_8 = new lib.slaughter09();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},107).to({state:[{t:this.instance_2}]},68).to({state:[{t:this.instance_3}]},196).to({state:[{t:this.instance_4}]},229).to({state:[{t:this.instance_5}]},177).to({state:[{t:this.instance_6}]},240).to({state:[{t:this.instance_7}]},105).to({state:[{t:this.instance_8}]},166).wait(181));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,404);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;