(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 580,
	height: 404,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"../../../assets/images/slides/svendborg/arbejde.jpg", id:"arbejde"},
		{src:"../../../assets/images/slides/svendborg/BAD.jpg", id:"BAD"},
		{src:"../../../assets/images/slides/svendborg/baenk.jpg", id:"baenk"},
		{src:"../../../assets/images/slides/svendborg/Bitmap2.png", id:"Bitmap2"},
		{src:"../../../assets/images/slides/svendborg/fattiggard.jpg", id:"fattiggard"},
		{src:"../../../assets/images/slides/svendborg/fattighjalp.jpg", id:"fattighjalp"},
		{src:"../../../assets/images/slides/svendborg/Intro_8.jpg", id:"Intro_8"},
		{src:"../../../assets/images/slides/svendborg/reglement.jpg", id:"reglement"},
		{src:"../../../assets/images/slides/svendborg/sne.jpg", id:"sne"},
		{src:"../../../assets/images/slides/svendborg/toj.jpg", id:"toj"},
		{src:"../../../assets/images/slides/svendborg/vindue.jpg", id:"vindue"},
		{src:"../../../assets/images/slides/svendborg/vindue2.jpg", id:"vindue2"}
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


(lib.baenk = function() {
	this.initialize(img.baenk);
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
(lib.slide_1_0_1_svendborg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1617));

	// Layer 2
	this.instance = new lib.Bitmap2();

	this.instance_1 = new lib.Intro_8();

	this.instance_2 = new lib.baenk();

	this.instance_3 = new lib.sne();

	this.instance_4 = new lib.fattiggard();

	this.instance_5 = new lib.fattighjalp();

	this.instance_6 = new lib.vindue();

	this.instance_7 = new lib.arbejde();

	this.instance_8 = new lib.BAD();

	this.instance_9 = new lib.toj();

	this.instance_10 = new lib.reglement();

	this.instance_11 = new lib.vindue2();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},99).to({state:[{t:this.instance_2}]},154).to({state:[{t:this.instance_3}]},153).to({state:[{t:this.instance_4}]},352).to({state:[{t:this.instance_5}]},106).to({state:[{t:this.instance_6}]},233).to({state:[{t:this.instance_7}]},90).to({state:[{t:this.instance_8}]},59).to({state:[{t:this.instance_9}]},46).to({state:[{t:this.instance_10}]},53).to({state:[{t:this.instance_11}]},194).wait(78));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(290,202,580,405);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;