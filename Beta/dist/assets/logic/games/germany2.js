(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 540,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../../../assets/images/pool/_22.jpg", id:"_22"},
		{src:"../../../assets/images/pool/_23RecruimentOffice.jpg", id:"_23RecruimentOffice"},
		{src:"../../../assets/images/pool/_2_5BG.jpg", id:"_2_5BG"},
		{src:"../../../assets/images/pool/CharacterCardName0001.png", id:"CharacterCardName0001"},
		{src:"../../../assets/images/pool/CharacterCardName0002.png", id:"CharacterCardName0002"},
		{src:"../../../assets/images/pool/CharacterCardName0003.png", id:"CharacterCardName0003"},
		{src:"../../../assets/images/pool/CharacterCardName0004.png", id:"CharacterCardName0004"},
		{src:"../../../assets/images/pool/CharacterCardName0005.png", id:"CharacterCardName0005"},
		{src:"../../../assets/images/pool/CharacterCardName0006.png", id:"CharacterCardName0006"},
		{src:"../../../assets/images/pool/CharacterCardName0007.png", id:"CharacterCardName0007"},
		{src:"../../../assets/images/pool/CharacterCardName0008.png", id:"CharacterCardName0008"},
		{src:"../../../assets/images/pool/CharacterCardName0009.png", id:"CharacterCardName0009"},
		{src:"../../../assets/images/pool/LetterWriteBG.png", id:"LetterWriteBG"},
		{src:"../../../assets/images/pool/PointDobbeltBG.png", id:"PointDobbeltBG"},
		{src:"../../../assets/images/pool/PointPositiv.png", id:"PointPositiv"}
	]
};



// symbols:



(lib._22 = function() {
	this.initialize(img._22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._23RecruimentOffice = function() {
	this.initialize(img._23RecruimentOffice);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._2_5BG = function() {
	this.initialize(img._2_5BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.CharacterCardName0001 = function() {
	this.initialize(img.CharacterCardName0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0002 = function() {
	this.initialize(img.CharacterCardName0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0003 = function() {
	this.initialize(img.CharacterCardName0003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0004 = function() {
	this.initialize(img.CharacterCardName0004);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0005 = function() {
	this.initialize(img.CharacterCardName0005);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0006 = function() {
	this.initialize(img.CharacterCardName0006);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0007 = function() {
	this.initialize(img.CharacterCardName0007);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0008 = function() {
	this.initialize(img.CharacterCardName0008);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.CharacterCardName0009 = function() {
	this.initialize(img.CharacterCardName0009);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,19);


(lib.LetterWriteBG = function() {
	this.initialize(img.LetterWriteBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,804,540);


(lib.PointDobbeltBG = function() {
	this.initialize(img.PointDobbeltBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,600,266);


(lib.PointPositiv = function() {
	this.initialize(img.PointPositiv);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,279,75);


(lib.ProgressionBar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Egl4AAxIAAhiMBLxAAAIAABig");
	this.shape.setTransform(242.5,5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,485,10);


(lib._42PagePoints1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("+1", "48px 'Special Elite'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 50;
	this.text.lineWidth = 145;
	this.text.setTransform(323.5,150);

	this.text_1 = new cjs.Text("Du glæder dig til at komme\nud af anstalten og tjene \npenge", "18px 'Special Elite'");
	this.text_1.lineHeight = 20;
	this.text_1.lineWidth = 286;
	this.text_1.setTransform(529.8,137);

	this.text_2 = new cjs.Text("Point", "48px 'Special Elite'", "#FFFFFF");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 584;
	this.text_2.setTransform(212,40);

	this.text_3 = new cjs.Text("+1", "48px 'Special Elite'", "#FFFFFF");
	this.text_3.textAlign = "center";
	this.text_3.lineHeight = 50;
	this.text_3.lineWidth = 145;
	this.text_3.setTransform(323.5,244);

	this.text_4 = new cjs.Text("humør", "28px 'BigNoodleTitling'");
	this.text_4.textAlign = "center";
	this.text_4.lineHeight = 30;
	this.text_4.lineWidth = 106;
	this.text_4.setTransform(454.3,246);

	this.text_5 = new cjs.Text("penge", "28px 'BigNoodleTitling'");
	this.text_5.textAlign = "center";
	this.text_5.lineHeight = 30;
	this.text_5.lineWidth = 106;
	this.text_5.setTransform(454.3,151);

	this.instance = new lib.PointPositiv();
	this.instance.setTransform(238.8,228);

	this.instance_1 = new lib.PointPositiv();
	this.instance_1.setTransform(238.8,134);

	this.instance_2 = new lib.PointDobbeltBG();
	this.instance_2.setTransform(213.8,50);

	this.addChild(this.instance_2,this.instance_1,this.instance,this.text_5,this.text_4,this.text_3,this.text_2,this.text_1,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(212,40,608.2,276);


(lib.CharacterCardName = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{AD:0,AE:1,AF:2,BD:3,BE:4,BF:5,CD:6,CE:7,CF:8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(14));

	// Nickname png
	this.instance = new lib.CharacterCardName0001();
	this.instance.setTransform(2,1.5);

	this.instance_1 = new lib.CharacterCardName0002();
	this.instance_1.setTransform(2,1.5);

	this.instance_2 = new lib.CharacterCardName0003();
	this.instance_2.setTransform(2,1.5);

	this.instance_3 = new lib.CharacterCardName0004();
	this.instance_3.setTransform(2,1.5);

	this.instance_4 = new lib.CharacterCardName0005();
	this.instance_4.setTransform(2,1.5);

	this.instance_5 = new lib.CharacterCardName0006();
	this.instance_5.setTransform(2,1.5);

	this.instance_6 = new lib.CharacterCardName0007();
	this.instance_6.setTransform(2,1.5);

	this.instance_7 = new lib.CharacterCardName0008();
	this.instance_7.setTransform(2,1.5);

	this.instance_8 = new lib.CharacterCardName0009();
	this.instance_8.setTransform(2,1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[]},1).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2,1.5,188,19);


(lib.EmptyContainerGrey = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgtTAfkMAAAg/HMBamAAAMAAAA/Hg");
	this.shape.setTransform(290,202);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.DropdownItem213 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.label = new cjs.Text("70 kr", "24px 'Special Elite'");
	this.label.name = "label";
	this.label.lineHeight = 26;
	this.label.lineWidth = 80;
	this.label.setTransform(5,3);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(4));

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EEEEEE").s().p("A0YB9IAAj5MAoxAAAIAAD5g");
	this.shape.setTransform(0,0,0.398,1,0,0,0,-130.5,-12.5);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5,3,84,28.1);


(lib.DropdownItem212 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.label = new cjs.Text("60 kr", "24px 'Special Elite'");
	this.label.name = "label";
	this.label.lineHeight = 26;
	this.label.lineWidth = 78;
	this.label.setTransform(5,3);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(4));

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EEEEEE").s().p("AoHB9IAAj5IQPAAIAAD5g");
	this.shape.setTransform(52,12.5);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5,3,82,28.1);


(lib.DropdownItem211 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.label = new cjs.Text("50 kr", "24px 'Special Elite'");
	this.label.name = "label";
	this.label.lineHeight = 26;
	this.label.lineWidth = 79;
	this.label.setTransform(5,3);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(4));

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EEEEEE").s().p("AoHB9IAAj5IQPAAIAAD5g");
	this.shape.setTransform(52,12.5);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5,3,83,30);


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


(lib.Background25 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._2_5BG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.Background23 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._23RecruimentOffice();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.Background22 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._22();

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


(lib.Letter2Dropdown1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{closed:0,open:4});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(15));

	// Hitarea
	this.hitarea = new lib.BlockerButton();
	this.hitarea.setTransform(0,0,2.101,0.58);
	new cjs.ButtonHelper(this.hitarea, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.hitarea).to({_off:true},4).wait(11));

	// Horizontal line
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,0,3).p("AHCAAIuDAA");
	this.shape.setTransform(53,26);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4).to({_off:false},0).wait(11));

	// Chosen Label
	this.label = new cjs.Text("<la>", "24px 'Special Elite'");
	this.label.name = "label";
	this.label.lineHeight = 26;
	this.label.lineWidth = 68;
	this.label.setTransform(5.2,4.7);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(15));

	// Items
	this.item_A = new lib.DropdownItem211();
	this.item_A.setTransform(3,31,1,1,0,0,0,3,1);
	new cjs.ButtonHelper(this.item_A, 0, 1, 2, false, new lib.DropdownItem211(), 3);

	this.item_C = new lib.DropdownItem213();
	this.item_C.setTransform(3,82,1,1,0,0,0,3,1);
	new cjs.ButtonHelper(this.item_C, 0, 1, 2, false, new lib.DropdownItem213(), 3);

	this.item_B = new lib.DropdownItem212();
	this.item_B.setTransform(3,56.5,1,1,0,0,0,3,1);
	new cjs.ButtonHelper(this.item_B, 0, 1, 2, false, new lib.DropdownItem212(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.item_B},{t:this.item_C},{t:this.item_A}]},4).wait(11));

	// Arrow
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhUgsICoAAIhTBZg");
	this.shape_1.setTransform(89,16.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(15));

	// Button BG
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,0,3).p("AhyhtIDlAAIAADbIjlAAg");
	this.shape_2.setTransform(89,14.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C99800").s().p("AhyBtIAAjZIDlAAIAADZg");
	this.shape_3.setTransform(89,14.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(15));

	// BG
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,0,3).p("AoJiQIQTAAIAAEhIwTAAg");
	this.shape_4.setTransform(52.3,14.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AoJCQIAAkgIQTAAIAAEgg");
	this.shape_5.setTransform(52.3,14.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,1,0,3).p("AoJolIQTAAIAARLIwTAAg");
	this.shape_6.setTransform(52.3,55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AoJIlIAAxKIQTAAIAARKg");
	this.shape_7.setTransform(52.3,55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).to({state:[{t:this.shape_7},{t:this.shape_6}]},4).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,106.5,33.8);


(lib.CheckBox = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{inactive:0,active:9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,8.398,1.2);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Checked
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah5BuQg7hAgXgTQADgLAJgKIAIgHQAQACAtAgIAwAjQA4hhBGhGQBHhEBRgjQhfBhhNCVQglBNgkBSQgkgrgsgyg");
	this.shape.setTransform(30,30.9);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:false},0).wait(11));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AkhkhIJDAAIAAJDIpDAAg");
	this.shape_1.setTransform(29,29);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B9961D").s().p("AkhEhIAApCIJCAAIAAJCg");
	this.shape_2.setTransform(29,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,421.4,61.5);


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


(lib._40PageChooseJob = function() {
	this.initialize();

	// checkboxes
	this.checkboxC = new lib.CheckBox();
	this.checkboxC.setTransform(543.2,413.2,1,1,0,0,0,209.2,29.2);

	this.checkboxB = new lib.CheckBox();
	this.checkboxB.setTransform(543.2,303.2,1,1,0,0,0,209.2,29.2);

	this.checkboxA = new lib.CheckBox();
	this.checkboxA.setTransform(543.2,193.2,1,1,0,0,0,209.2,29.2);

	// Text
	this.cbTextC = new cjs.Text("Slagteri", "40px 'BigNoodleTitling'", "#C69700");
	this.cbTextC.name = "cbTextC";
	this.cbTextC.lineHeight = 42;
	this.cbTextC.lineWidth = 326;
	this.cbTextC.setTransform(415,391);

	this.cbTextB = new cjs.Text("Kulmine", "40px 'BigNoodleTitling'", "#C69700");
	this.cbTextB.name = "cbTextB";
	this.cbTextB.lineHeight = 42;
	this.cbTextB.lineWidth = 326;
	this.cbTextB.setTransform(415,281);

	this.cbTextA = new cjs.Text("Våbenfabrik", "40px 'BigNoodleTitling'", "#C69700");
	this.cbTextA.name = "cbTextA";
	this.cbTextA.lineHeight = 42;
	this.cbTextA.lineWidth = 326;
	this.cbTextA.setTransform(415,171);

	this.text = new cjs.Text("Vælg job", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 584;
	this.text.setTransform(210,38);

	this.addChild(this.text,this.cbTextA,this.cbTextB,this.cbTextC,this.checkboxA,this.checkboxB,this.checkboxC);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(210,38,587.6,408.7);


(lib._25PageTraveling = function() {
	this.initialize();

	// Layer 1
	this.player = new lib.PlayerSlides();
	this.player.setTransform(512,269.5,1,1,0,0,0,300,229.5);

	this.addChild(this.player);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(212,40,600,459);


(lib._23PageLetter = function() {
	this.initialize();

	// Dropdowns
	this.dropdown = new lib.Letter2Dropdown1();
	this.dropdown.setTransform(366,232,1,1,0,0,0,0,0.5);

	// Fullscreen Button
	this.fullscreenButton = new lib.BlockerButton();
	this.fullscreenButton.setTransform(0,0,20.479,10.8);
	new cjs.ButtonHelper(this.fullscreenButton, 0, 1, 2, false, new lib.BlockerButton(), 3);

	// Name
	this.realname = new lib.CharacterCardName();
	this.realname.setTransform(520,401,1.203,1.203,0,0,0,81,9.2);

	// Text
	this.text = new cjs.Text("Til det sociale udvalg\n\nUndertegnede skal tiltræde arbejde i Tyskland\nog anmoder herved høfligst det ærede udvalg\nom et lån på                 til indkøb af arbejdstøj.\n\nHåber det ærede udvalg vil bevilge dette mig\nandragende, da jeg jo ikke kan købe tøj i\nTyskland.\n\n         Ærbødigst", "24px 'Special Elite'");
	this.text.lineHeight = 26;
	this.text.lineWidth = 599;
	this.text.setTransform(212,132);

	// BG
	this.instance = new lib.LetterWriteBG();
	this.instance.setTransform(116,0);

	this.addChild(this.instance,this.text,this.realname,this.fullscreenButton,this.dropdown);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


// stage content:
(lib.germany_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{intro:0});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(26));

	// 4.3 Travelling
	this.traveling = new lib._25PageTraveling();
	this.traveling.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.traveling).wait(26));

	// 4.2 Points1
	this.points1 = new lib._42PagePoints1();
	this.points1.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.points1).wait(26));

	// 4.1 Letter
	this.recruitementletter = new lib._23PageLetter();
	this.recruitementletter.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.recruitementletter).wait(26));

	// 4.0 Choose Job
	this.choosejob = new lib._40PageChooseJob();
	this.choosejob.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.choosejob).wait(26));

	// 4.3
	this.bg_4_3 = new lib.Background25();
	this.bg_4_3.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_4_3).wait(26));

	// 4.1
	this.bg_4_1 = new lib.Background23();
	this.bg_4_1.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_4_1).wait(26));

	// 4.0
	this.bg_4_0 = new lib.Background22();
	this.bg_4_0.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_4_0).wait(26));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1536,252,1024,598);

})(gamelib = gamelib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var gamelib, images, createjs, ss;