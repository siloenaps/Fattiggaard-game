(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 540,
	fps: 24,
	color: "#000000",
	manifest: []
};



// symbols:



(lib.ProgressionBar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Egl4AAxIAAhiMBLxAAAIAABig");
	this.shape.setTransform(242.5,5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,485,10);


(lib.EmptyContainerGrey = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgtTAfkMAAAg/HMBamAAAMAAAA/Hg");
	this.shape.setTransform(290,202);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.BlockerButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#555555").s().p("Aj5D6IAAnzIHzAAIAAHzg");
	this.shape.setTransform(25,25);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.BackgroundContainer = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


(lib.ControllerButtonSTOP = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{out:0,over:1,click:2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,0.68,0.68);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({x:1,y:1},0).wait(2));

	// Symbol
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgLABIA+hDIA0AAIg+BCIA+BCIg2ABgAhlABIBAhDIAyAAIg8BCIA8BCIg0ABg");
	this.shape.setTransform(17.3,17.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AgLABIA+hDIA0AAIg+BCIA+BCIg2ABgAhlABIBAhDIAyAAIg8BCIA8BCIg0ABg");
	this.shape_1.setTransform(17.3,17.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AgLABIA9hDIA1AAIg+BCIA+BCIg2ABgAhlABIA/hDIAzAAIg8BCIA8BCIg0ABg");
	this.shape_2.setTransform(18.3,18.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).wait(2));

	// BG
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCMIEWAAIAAkWIkWAAg");
	this.shape_3.setTransform(17,16.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCNIEXAAIAAkXIkXAAg");
	this.shape_4.setTransform(18,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,34,34);


(lib.ControllerButtonPLAY = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"out":0,"over":1,"click":2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,0.68,0.68);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({x:1,y:1},0).wait(2));

	// Symbol
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhHhgICPBgIiPBhg");
	this.shape.setTransform(18.2,17.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhHhgICPBgIiPBhg");
	this.shape_1.setTransform(18.2,17.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1,p:{x:18.2,y:17.4}}]},1).to({state:[{t:this.shape_1,p:{x:19.2,y:18.4}}]},1).wait(2));

	// BG
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCMIEWAAIAAkWIkWAAg");
	this.shape_2.setTransform(17,16.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCNIEXAAIAAkXIkXAAg");
	this.shape_3.setTransform(18,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2}]}).to({state:[{t:this.shape_3}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,34,34);


(lib.ControllerButtonPAUSE = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"out":0,"over":1,"click":2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,0.68,0.68);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({x:1,y:1},0).wait(2));

	// Symbol
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAYBkIAAjGIAzAAIAADGgAhKBkIAAjGIAzAAIAADGg");
	this.shape.setTransform(17.5,17);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhHhgICPBgIiPBhg");
	this.shape_1.setTransform(18.2,17.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AAYBjIAAjFIAzAAIAADFgAhKBjIAAjFIAzAAIAADFg");
	this.shape_2.setTransform(18.5,18);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).wait(2));

	// BG
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCMIEWAAIAAkWIkWAAg");
	this.shape_3.setTransform(17,16.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D1C8AA").s().p("AipCpIAAlRIFTAAIAAFRgAiLCNIEXAAIAAkXIkXAAg");
	this.shape_4.setTransform(18,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,34,34);


(lib.PlayerSlides = function() {
	this.initialize();

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgshAgWMAAAg/HMBanAAAMAAAA/Hg");
	mask.setTransform(295,207);

	// Slide
	this.container = new lib.EmptyContainerGrey();
	this.container.setTransform(10,10);

	this.container.mask = mask;

	// Progression Bar
	this.progressionBar = new lib.ProgressionBar();
	this.progressionBar.setTransform(101,436,1,1,0,0,0,0,5);

	// Progression BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2F2E19").s().p("EgmkABPIAAidMBNKAAAIAACdg");
	this.shape.setTransform(343,436);

	// Play
	this.playBtn = new lib.ControllerButtonPLAY();
	this.playBtn.setTransform(69,436.9,1,1,0,0,0,17,16.9);

	// Pause
	this.pauseBtn = new lib.ControllerButtonPAUSE();
	this.pauseBtn.setTransform(52,420);

	// Stop
	this.stopBtn = new lib.ControllerButtonSTOP();
	this.stopBtn.setTransform(28,436.9,1,1,0,0,0,17,16.9);

	// Background
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Egu3Aj3MAAAhHtMBdvAAAMAAABHtg");
	this.shape_1.setTransform(300,229.5);

	this.addChild(this.shape_1,this.stopBtn,this.pauseBtn,this.playBtn,this.shape,this.progressionBar,this.container);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,600,459);


(lib._101PageIntro = function() {
	this.initialize();

	// Layer 1
	this.player = new lib.PlayerSlides();
	this.player.setTransform(512,269.5,1,1,0,0,0,300,229.5);

	this.addChild(this.player);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(212,40,600,459);


// stage content:
(lib.poorhouse_intro = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{intro:0});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(26));

	// 1.0.1 Intro
	this.intro = new lib._101PageIntro();
	this.intro.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.intro).wait(26));

	// BG Container
	this.bg_container = new lib.BackgroundContainer();

	this.timeline.addTween(cjs.Tween.get(this.bg_container).wait(26));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1748,310,600,459);

})(gamelib = gamelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var gamelib, images, createjs, ss;