(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 540,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../../../assets/images/pool/_4_11_1BG.jpg", id:"_4_11_1BG"},
		{src:"../../../assets/images/pool/_4_11_2BG.jpg", id:"_4_11_2BG"},
		{src:"../../../assets/images/pool/_4_11_3BG.jpg", id:"_4_11_3BG"},
		{src:"../../../assets/images/pool/_4_11_4BG.jpg", id:"_4_11_4BG"},
		{src:"../../../assets/images/pool/ADCloseUp.png", id:"ADCloseUp"},
		{src:"../../../assets/images/pool/AECloseUp.png", id:"AECloseUp"},
		{src:"../../../assets/images/pool/AFCloseUp.png", id:"AFCloseUp"},
		{src:"../../../assets/images/pool/BDCloseUp.png", id:"BDCloseUp"},
		{src:"../../../assets/images/pool/BECloseUp.png", id:"BECloseUp"},
		{src:"../../../assets/images/pool/BFCloseUp.png", id:"BFCloseUp"},
		{src:"../../../assets/images/pool/CDCloseUp.png", id:"CDCloseUp"},
		{src:"../../../assets/images/pool/CECloseUp.png", id:"CECloseUp"},
		{src:"../../../assets/images/pool/CFCloseUp.png", id:"CFCloseUp"}
	]
};



// symbols:



(lib._4_11_1BG = function() {
	this.initialize(img._4_11_1BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._4_11_2BG = function() {
	this.initialize(img._4_11_2BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._4_11_3BG = function() {
	this.initialize(img._4_11_3BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._4_11_4BG = function() {
	this.initialize(img._4_11_4BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.ADCloseUp = function() {
	this.initialize(img.ADCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.AECloseUp = function() {
	this.initialize(img.AECloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.AFCloseUp = function() {
	this.initialize(img.AFCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.BDCloseUp = function() {
	this.initialize(img.BDCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.BECloseUp = function() {
	this.initialize(img.BECloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.BFCloseUp = function() {
	this.initialize(img.BFCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.CDCloseUp = function() {
	this.initialize(img.CDCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.CECloseUp = function() {
	this.initialize(img.CECloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.CFCloseUp = function() {
	this.initialize(img.CFCloseUp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


(lib.ProgressionBar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Egl4AAxIAAhiMBLxAAAIAABig");
	this.shape.setTransform(242.5,5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,485,10);


(lib.OpenionCloseups = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{AD:0,AE:1,AF:2,BD:3,BE:4,BF:5,CD:6,CE:7,CF:8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// Content
	this.instance = new lib.ADCloseUp();

	this.instance_1 = new lib.AECloseUp();

	this.instance_2 = new lib.AFCloseUp();

	this.instance_3 = new lib.BDCloseUp();

	this.instance_4 = new lib.BECloseUp();

	this.instance_5 = new lib.BFCloseUp();

	this.instance_6 = new lib.CDCloseUp();

	this.instance_7 = new lib.CECloseUp();

	this.instance_8 = new lib.CFCloseUp();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,402,558);


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


(lib.Background4114 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._4_11_4BG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.Background4113 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._4_11_3BG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.Background4112 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._4_11_2BG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.Background4111 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._4_11_1BG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


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


(lib.PlayerAudio = function() {
	this.initialize();

	// Progression Bar
	this.progressionBar = new lib.ProgressionBar();
	this.progressionBar.setTransform(90,16,1,1,0,0,0,0,5);

	// Progression BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EgmlABQIAAieMBNKAAAIAACeg");
	this.shape.setTransform(332,16);

	// Play
	this.playBtn = new lib.ControllerButtonPLAY();
	this.playBtn.setTransform(58,16.9,1,1,0,0,0,17,16.9);

	// Pause
	this.pauseBtn = new lib.ControllerButtonPAUSE();
	this.pauseBtn.setTransform(41,0);

	// Stop
	this.stopBtn = new lib.ControllerButtonSTOP();
	this.stopBtn.setTransform(17,16.9,1,1,0,0,0,17,16.9);

	this.addChild(this.stopBtn,this.pauseBtn,this.playBtn,this.shape,this.progressionBar);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,579,33.8);


(lib._4113PageRunAway = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Efterskrift…", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 800;
	this.text.setTransform(210,38);

	// Player
	this.player = new lib.PlayerAudio();
	this.player.setTransform(501.5,149,1,1,0,0,0,289.5,17);

	// Character
	this.portrait = new lib.OpenionCloseups();
	this.portrait.setTransform(0,0,1,1,0,0,0,-622,18);

	this.addChild(this.portrait,this.player,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(210,-18,814,558);


(lib._4112PageIllness = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Efterskrift…", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 800;
	this.text.setTransform(210,38);

	// Player
	this.player = new lib.PlayerAudio();
	this.player.setTransform(501.5,149,1,1,0,0,0,289.5,17);

	// Character
	this.portrait = new lib.OpenionCloseups();
	this.portrait.setTransform(0,0,1,1,0,0,0,-622,18);

	this.addChild(this.portrait,this.player,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(210,-18,814,558);


(lib._4111PageCompensation = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Efterskrift…", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 800;
	this.text.setTransform(210,38);

	// Player
	this.player = new lib.PlayerAudio();
	this.player.setTransform(501.5,149,1,1,0,0,0,289.5,17);

	// Character
	this.portrait = new lib.OpenionCloseups();
	this.portrait.setTransform(0,0,1,1,0,0,0,-622,18);

	this.addChild(this.portrait,this.player,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(210,-18,814,558);


// stage content:
(lib.epilogue = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{intro:0});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(26));

	// 4.11.4 Hippopotimus
	this.hippopotimus = new lib._4112PageIllness();
	this.hippopotimus.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.hippopotimus).wait(26));

	// 4.11.3 Run Away?
	this.runaway = new lib._4113PageRunAway();
	this.runaway.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.runaway).wait(26));

	// 4.11.2 Illness
	this.illness = new lib._4112PageIllness();
	this.illness.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.illness).wait(26));

	// 4.11.1 Compensation
	this.compensation = new lib._4111PageCompensation();
	this.compensation.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.compensation).wait(26));

	// 4.11.4
	this.bg_4_11_4 = new lib.Background4114();
	this.bg_4_11_4.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_4_11_4).wait(26));

	// 4.11.3
	this.bg_4_11_3 = new lib.Background4113();
	this.bg_4_11_3.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_4_11_3).wait(26));

	// 4.11.2
	this.bg_4_11_2 = new lib.Background4112();
	this.bg_4_11_2.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_4_11_2).wait(26));

	// 4.11.1
	this.bg_4_11_1 = new lib.Background4111();
	this.bg_4_11_1.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_4_11_1).wait(26));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1536,252,1024,558);

})(gamelib = gamelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var gamelib, images, createjs, ss;