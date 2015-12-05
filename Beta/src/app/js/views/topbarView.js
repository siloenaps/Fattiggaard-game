(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 108,
	fps: 24,
	color: "#000000",
	manifest: []
};



// symbols:



(lib.TopBarMain = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{intro:4,character:11,game:19});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(30));

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("A2uFQIAAqfMAtdAAAIAAKfg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:569.4,y:48.9}).wait(19).to({graphics:null,x:0,y:0}).wait(11));

	// Layer 6
	this.label_intro = new cjs.Text("Intro", "48px 'BigNoodleTitling'", "#FFFFFF");
	this.label_intro.name = "label_intro";
	this.label_intro.textAlign = "center";
	this.label_intro.lineHeight = 50;
	this.label_intro.lineWidth = 287;
	this.label_intro.setTransform(566.5,21.9);
	this.label_intro._off = true;

	this.label_intro.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.label_intro).wait(4).to({_off:false},0).wait(7).to({text:"hvem er du?"},0).to({_off:true},8).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1024,118);


// stage content:



(lib.TopbarView = function() {
	this.initialize();

	// Layer 1
	this.mainClip = new lib.TopBarMain();
	this.mainClip.setTransform(512,59,1,1,0,0,0,512,59);

	this.addChild(this.mainClip);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(512,54,714.9,82.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;