;(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 648,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../assets/images/pool/_0_0Frontpage.jpg", id:"_0_0Frontpage"},
		{src:"../assets/images/pool/Bitmap33.jpg", id:"Bitmap33"}
	]
};



// symbols:



(lib._0_0Frontpage = function() {
	this.initialize(img._0_0Frontpage);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


(lib.Bitmap33 = function() {
	this.initialize(img.Bitmap33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,641,270);


(lib.PreloaderSquares = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(194,45,27,0.329)").s().p("AgxAxIAAhiIBiAAIAABig");
	this.shape.setTransform(5,5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(194,45,27,0.659)").s().p("AgxAxIAAhiIBiAAIAABig");
	this.shape_1.setTransform(17,5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(194,45,27,0.898)").s().p("AgxAxIAAhiIBiAAIAABig");
	this.shape_2.setTransform(17,17);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,22,22);


(lib.preloaderbar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.6)").s().p("EhP/AAeIAAg7MCf/AAAIAAA7g");
	this.shape.setTransform(512,3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,6);


(lib.PageContainerEmpty = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


(lib.SkipButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA/BHIAAiNIAjAAQAXAAAAAYIAAArQAAAKgFAGQgHAGgLAAIgQAAIAAA0gABSACIAMAAQAIAAAAgHIAAgoQAAgEgCgCQgCgCgFAAIgLAAgAAaBHIAAiNIATAAIAACNgAgCBHIgYhGIAAgBIAUhGIAQAAIgSBGIAYBHgAguBHIAAiNIATAAIAACNgAhhBHQgXAAAAgaIAAgHIATAAIAAAHQAAAJAJAAIADAAQAIAAAAgJIAAgYQAAgEgCgBIgFgEIgbgOQgDgCgBgDIgBgJIAAgeQAAgYAXAAIAMAAQAMAAAFAGQAGAGAAAMIAAAOIgTAAIAAgMQAAgFgDgCQgCgCgDAAIgEAAQgEAAgCACQgCACAAAFIAAAXQAAAFACABIAFADIAaAOQADABACADQABADAAAHIAAAfQAAAYgXAAg");
	this.shape.setTransform(48,46.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA/BHIAAiNIAjAAQAXAAAAAYIAAArQAAAKgFAGQgHAGgLAAIgQAAIAAA0gABSACIAMAAQAIAAAAgHIAAgoQAAgEgCgCQgDgCgEAAIgLAAgAAaBHIAAiNIATAAIAACNgAgCBHIgYhGIAAgBIAUhGIAQAAIgSBGIAYBHgAguBHIAAiNIATAAIAACNgAhhBHQgXAAAAgaIAAgHIATAAIAAAHQAAAJAJAAIADAAQAIAAAAgJIAAgYQAAgEgCgBIgFgEIgbgOQgDgCgBgDIgBgJIAAgeQAAgYAXAAIAMAAQAMAAAFAGQAGAGAAAMIAAAOIgTAAIAAgMQAAgFgDgCQgCgCgDAAIgEAAQgEAAgCACQgCACAAAFIAAAXQAAAFACABIAFADIAaAOQADABACADQABADAAAHIAAAfQAAAYgXAAg");
	this.shape_1.setTransform(49,47.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[]},1).wait(1));

	// Layer 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D18B00").s().p("Ai6C7QhOhOAAhtQAAhsBOhOQBOhOBsAAQBtAABOBOQBOBOAABsQAABthOBOQhOBOhtAAQhsAAhOhOg");
	this.shape_2.setTransform(47,47);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2).to({x:48,y:48},0).to({_off:true},1).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1DAB5").s().p("AjiDhQhchdAAiEQAAiDBchfQBfhcCDAAQCFAABcBcQBfBfAACDQAACEhfBdQhcBfiFAAQiDAAhfhfg");
	this.shape_3.setTransform(47,47);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1DAB5").s().p("AjiDhQhdhdABiEQgBiDBdhfQBfhdCDABQCEgBBdBdQBfBfAACDQAACEhfBdQhdBfiEAAQiDAAhfhfg");
	this.shape_4.setTransform(48,48);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15,15,64,64);


(lib.GoOnButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AinC1ICwi1IiziyIBUhTIEBEHIkCEEg");
	this.shape.setTransform(51.4,45.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({x:53.4,y:47.9},0).to({_off:true},1).wait(1));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D18B00").s().p("AkSETQhyhyAAihQAAifByhzQBzhyCfAAQChAAByByQBzBzAACfQAAChhzByQhyBzihAAQifAAhzhzg");
	this.shape_1.setTransform(47,47);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D18B00").s().p("AkSETQhyhzgBigQABifByhzQBzhyCfgBQCgABBzByQByBzABCfQgBCghyBzQhzByigABQifgBhzhyg");
	this.shape_2.setTransform(49,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},2).to({state:[]},1).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1DAB5").s().p("AlMFLQiIiJgBjCQABjBCIiLQCLiIDBgBQDCABCJCIQCKCLAADBQAADCiKCJQiJCKjCAAQjBAAiLiKg");
	this.shape_3.setTransform(47,47);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1DAB5").s().p("AlMFLQiIiJgBjCQABjBCIiLQCLiIDBgBQDDABCICIQCLCLAADBQAADCiLCJQiICLjDAAQjBAAiLiLg");
	this.shape_4.setTransform(49,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,94,94);


(lib.BlockerBLACK = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ApXJXIAAyuISuAAIAASug");
	this.shape.setTransform(60,60);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


(lib.preloadersquaresanim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.PreloaderSquares("synched",0);
	this.instance.setTransform(11,11,1,1,0,0,0,11,11);
	this.instance.filters = [new cjs.ColorFilter(0, 0, 0, 1, 204, 204, 204, 0)];
	this.instance.cache(-2,-2,26,26);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({rotation:90},0).wait(5).to({rotation:180},0).wait(5).to({rotation:270},0).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22,22);


(lib.preloader = function() {
	this.initialize();

	// Layer 2
	this.bar = new lib.preloaderbar();

	this.addChild(this.bar);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1,-1,1026,8);


(lib.ContinueButton = function() {
	this.initialize();

	// Skip
	this.skipBtn = new lib.SkipButton();
	this.skipBtn.setTransform(47,47,1,1,0,0,0,47,47);
	new cjs.ButtonHelper(this.skipBtn, 0, 1, 2, false, new lib.SkipButton(), 3);

	// Continue
	this.nextBtn = new lib.GoOnButton();
	this.nextBtn.setTransform(47,47,1,1,0,0,0,47,47);
	new cjs.ButtonHelper(this.nextBtn, 0, 1, 2, false, new lib.GoOnButton(), 3);

	this.addChild(this.nextBtn,this.skipBtn);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,96,96);


(lib.PreloaderMain = function() {
	this.initialize();

	// Square
	this.instance = new lib.preloadersquaresanim();
	this.instance.setTransform(5,10,2.273,2.273);

	// Progress Bar
	this.progress_bar = new lib.preloader();

	// BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.329)").s().p("EhP/AyoMAAAhlPMCf/AAAMAAABlPg");
	this.shape.setTransform(512,324);

	this.addChild(this.shape,this.progress_bar,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


// stage content:
(lib.Main = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{preload:4,frontpage:14,start:24,character_build:33,poohouse:48,germany:58});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(84));

	// Actions
	this.text = new cjs.Text("abcdefghijklmnopqrdtuvxyzæøå", "24px 'Special Elite'", "#D9D1B4");
	this.text.lineHeight = 26;
	this.text.lineWidth = 910;
	this.text.setTransform(0,-40);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(84));

	// Preloader Bar
	this.preload_clip = new lib.PreloaderMain();

	this.timeline.addTween(cjs.Tween.get(this.preload_clip).wait(84));

	// Blocker
	this.blocker_black = new lib.BlockerBLACK();
	this.blocker_black.setTransform(-10,0,8.7,6.4);

	this.timeline.addTween(cjs.Tween.get(this.blocker_black).wait(84));

	// Topbar Container
	this.topbarcontainer = new lib.PageContainerEmpty();

	this.timeline.addTween(cjs.Tween.get(this.topbarcontainer).wait(84));

	// Continue
	this.continueBtn = new lib.ContinueButton();
	this.continueBtn.setTransform(951,579.4,1,1,0,0,0,48,48);
	this.continueBtn._off = true;

	this.timeline.addTween(cjs.Tween.get(this.continueBtn).wait(14).to({_off:false},0).wait(70));

	// Container
	this.pagecontainer = new lib.PageContainerEmpty();
	this.pagecontainer.setTransform(0,108);

	this.timeline.addTween(cjs.Tween.get(this.pagecontainer).wait(84));

	// Start IMage
	this.instance = new lib._0_0Frontpage();
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).to({_off:true},10).wait(60));

	// Layer 1
	this.instance_1 = new lib.Bitmap33();
	this.instance_1.setTransform(171,137);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(84));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(502,284,1044,808);

})(mainlib = mainlib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var mainlib, images, createjs, ss;