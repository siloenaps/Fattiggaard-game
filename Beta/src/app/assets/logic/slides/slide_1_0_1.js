(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/arbejde.jpg", id:"arbejde"},
		{src:"../../../assets/images/slides/BAD.jpg", id:"BAD"},
		{src:"../../../assets/images/slides/baenk3.jpg", id:"baenk3"},
		{src:"../../../assets/images/slides/Bitmap2.png", id:"Bitmap2"},
		{src:"../../../assets/images/slides/fattiggard.jpg", id:"fattiggard"},
		{src:"../../../assets/images/slides/fattighjalp.jpg", id:"fattighjalp"},
		{src:"../../../assets/images/slides/Intro_8.jpg", id:"Intro_8"},
		{src:"../../../assets/images/slides/laset.jpg", id:"laset"},
		{src:"../../../assets/images/slides/reglement.jpg", id:"reglement"},
		{src:"../../../assets/images/slides/sne.jpg", id:"sne"},
		{src:"../../../assets/images/slides/toj.jpg", id:"toj"},
		{src:"../../../assets/images/slides/vindue.jpg", id:"vindue"},
		{src:"../../../assets/images/slides/vindue2.jpg", id:"vindue2"}
	]
};



// symbols:



(lib.arbejde = function() {
	this.initialize(img.arbejde);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.BAD = function() {
	this.initialize(img.BAD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.baenk3 = function() {
	this.initialize(img.baenk3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,405);


(lib.fattiggard = function() {
	this.initialize(img.fattiggard);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.fattighjalp = function() {
	this.initialize(img.fattighjalp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.Intro_8 = function() {
	this.initialize(img.Intro_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.laset = function() {
	this.initialize(img.laset);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.reglement = function() {
	this.initialize(img.reglement);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.sne = function() {
	this.initialize(img.sne);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.toj = function() {
	this.initialize(img.toj);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.vindue = function() {
	this.initialize(img.vindue);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.vindue2 = function() {
	this.initialize(img.vindue2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


// stage content:
(lib.slide_1_0_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1524));

	// Layer 5
	this.instance = new lib.Bitmap2();

	this.instance_1 = new lib.Intro_8();

	this.instance_2 = new lib.baenk3();

	this.instance_3 = new lib.sne();

	this.instance_4 = new lib.laset();

	this.instance_5 = new lib.fattiggard();

	this.instance_6 = new lib.fattighjalp();

	this.instance_7 = new lib.vindue();

	this.instance_8 = new lib.arbejde();

	this.instance_9 = new lib.BAD();

	this.instance_10 = new lib.toj();

	this.instance_11 = new lib.reglement();

	this.instance_12 = new lib.vindue2();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},99).to({state:[{t:this.instance_2}]},142).to({state:[{t:this.instance_3}]},89).to({state:[{t:this.instance_4}]},130).to({state:[{t:this.instance_5}]},218).to({state:[{t:this.instance_6}]},79).to({state:[{t:this.instance_7}]},227).to({state:[{t:this.instance_8}]},78).to({state:[{t:this.instance_9}]},66).to({state:[{t:this.instance_10}]},53).to({state:[{t:this.instance_11}]},26).to({state:[{t:this.instance_12}]},190).wait(127));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,405);

})(slidelib = slidelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var slidelib, images, createjs, ss;