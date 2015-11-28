(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 648,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../../../assets/images/pool/_0_0Frontpage.jpg", id:"_0_0Frontpage"}
	]
};



// symbols:



(lib._0_0Frontpage = function() {
	this.initialize(img._0_0Frontpage);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


(lib._00Frontpage = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._0_0Frontpage();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


// stage content:
(lib.frontpage = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{start:0});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// 0.0 Start
	this.frontpage = new lib._00Frontpage();

	this.timeline.addTween(cjs.Tween.get(this.frontpage).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(512,324,1024,648);

})(gamelib = gamelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var gamelib, images, createjs, ss;