(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 540,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../../assets/images/pool/_0_5_1_close_bt.png", id:"_0_5_1_close_bt"},
		{src:"../../assets/images/pool/_0_5_infobt.png", id:"_0_5_infobt"},
		{src:"../../assets/images/pool/_0_5BG.jpg", id:"_0_5BG"},
		{src:"../../assets/images/pool/_1_0BGhorsens.jpg", id:"_1_0BGhorsens"},
		{src:"../../assets/images/pool/_1_0BGsundholm.jpg", id:"_1_0BGsundholm"},
		{src:"../../assets/images/pool/_1_0BGsvendborg.jpg", id:"_1_0BGsvendborg"},
		{src:"../../assets/images/pool/tekst_bg_sort.png", id:"tekst_bg_sort"}
	]
};



// symbols:



(lib._0_5_1_close_bt = function() {
	this.initialize(img._0_5_1_close_bt);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,37,37);


(lib._0_5_infobt = function() {
	this.initialize(img._0_5_infobt);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib._0_5BG = function() {
	this.initialize(img._0_5BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._1_0BGhorsens = function() {
	this.initialize(img._1_0BGhorsens);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._1_0BGsundholm = function() {
	this.initialize(img._1_0BGsundholm);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._1_0BGsvendborg = function() {
	this.initialize(img._1_0BGsvendborg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.tekst_bg_sort = function() {
	this.initialize(img.tekst_bg_sort);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,737,343);


(lib.InfoButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib._0_5_infobt();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.CloseButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib._0_5_1_close_bt();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,37,37);


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


(lib.BlackTextBG = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.tekst_bg_sort();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,737,343);


(lib.Background0_5 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._0_5BG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.Additionalinfo = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("Du har ikke flere penge, og har ikke spist i flere dage. Du ved at maden i\nTyskland er tarvelig og underernærende, og frygter, at du ikke vil\nkunne holde til seks måneders arbejde i Tyskland i din nuværende\ntilstand. I stedet beslutter du at opsøge en fattiganstalt, hvor du kan få\nmad og samle kræfter.", "18px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 20;
	this.text.lineWidth = 687;

	this.addChild(this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,691,222.8);


(lib.InfoPopup = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Close Button
	this.closebutton = new lib.CloseButton();
	this.closebutton.setTransform(995.5,28.5,1,1,0,0,0,18.5,18.5);
	new cjs.ButtonHelper(this.closebutton, 0, 1, 2, false, new lib.CloseButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.closebutton).wait(3));

	// Text
	this.text = new cjs.Text("Horsens Forsørgelsesanstalt er en fattiganstalt med plads til i alt 74\npersoner, 52 mænd og 22 kvinder. Mænd og kvinder holdes adskilt. Horsens\nForsørgelsesanstalt består af en arbejdsafdeling en forsørgelsesafdeling\nog en sygeafdeling. Arbejdsdygtige individer, alkoholister og forsømmelige\nforsørgere bliver indlagt på arbejdsafdelingen. Der er mure langs anstaltens\ngårdarealer. Anstaltens chef er Forvalteren, det er ham, der bestemmer over\nde indlagte og har det overordnede ansvar for, at stedets regler bliver\noverholdt. Opsynsmændene er forvalterens forlængede arm. ", "28px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 30;
	this.text.lineWidth = 822;
	this.text.setTransform(219,135.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({text:"Sundholm er en kæmpe stor fattiganstalt på Amager med plads til op mod\n750 indlagte. Mænd og kvinder holdes adskilt. Sundholm består af en\narbejdsanstalt, en forsørgelsesanstalt og en tvangsarbejdsanstalt. \nArbejdsdygtige individer bliver indlagt på arbejdsanstalten eller tvangs-\narbejdsanstalten, da man mener, at de selv bærer hovedansvaret for deres \nfattigdom. Rundt om Sundholm har man gravet en fire meter dyb voldgrav.\nPå kanten af voldgraven står et to meter højt pigtrådshegn. Pigtrådshegnet\ner ca. 1400 meter langt. Anstaltens chef er Forvalteren, det er ham, der\nbestemmer over de indlagte og har det overordnede ansvar for, at stedets\nregler bliver overholdt. Opsynsmændene er forvalterens forlængede arm. ",lineWidth:898},0).wait(1).to({text:"Svendborg Fattiggård er en anstalt med plads til 51 indlagte. Svendborg \nfattiggård indeholder en arbejdsafdeling, en forsørgelsesafdeling og en \nsygeafdeling. Mænd og kvinder holdes adskilt. Arbejdsdygtige individer \nbliver indlagt på arbejdsafdelingen, da man mener, at de er dovne og \narbejdssky, og derfor selv bærer hovedansvaret for deres fattigdom. \nLangs fattiggårdens bygninger er der høje mure med pigtråd på toppen. \nAnstaltens chef er Forvalteren, det er ham, der bestemmer over de indlagte \nog har det overordnede ansvar for, at stedets regler bliver overholdt.",lineWidth:908},0).wait(1));

	// Text BG
	this.instance = new lib.BlackTextBG("synched",0);
	this.instance.setTransform(164,108,1.039,1,0,0,0,-0.4,0.1);
	this.instance.alpha = 0.391;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.02,scaleY:1.11},0).wait(1).to({scaleX:1.01,scaleY:0.97},0).wait(1));

	// BG
	this.instance_1 = new lib._1_0BGhorsens();

	this.instance_2 = new lib._1_0BGsundholm();

	this.instance_3 = new lib._1_0BGsvendborg();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1045,540);


(lib.CheckBoxSvendborg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{inactive:0,active:9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,3.8,0.999);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Layer 2
	this.text = new cjs.Text("svendborg", "36px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 38;
	this.text.lineWidth = 153;
	this.text.setTransform(57,3.8);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(20));

	// Checked
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhtBjQg0g6gWgQQADgLAIgJIAHgFQAQABAnAdIAsAfQAyhXA/g/QBAg9BJggQhWBYhFCGQghBFghBKQgggogogsg");
	this.shape.setTransform(25.5,24.2);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:false},0).wait(11));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AjvjvIHfAAIAAHfInfAAg");
	this.shape_1.setTransform(24,24);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B9961D").s().p("AjvDvIAAneIHeAAIAAHeg");
	this.shape_2.setTransform(24,24);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,215.6,51.5);


(lib.CheckBoxSundholm = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"inactive":0,"active":9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,3.8,0.999);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Layer 2
	this.text = new cjs.Text("sundholm", "36px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 38;
	this.text.lineWidth = 133;
	this.text.setTransform(57,3.8);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(20));

	// Checked
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhtBjQg0g6gWgQQADgLAIgJIAHgFQAQABAnAdIAsAfQAyhXA/g/QBAg9BJggQhWBYhFCGQghBFghBKQgggogogsg");
	this.shape.setTransform(25.5,24.2);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:false},0).wait(11));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AjvjvIHfAAIAAHfInfAAg");
	this.shape_1.setTransform(24,24);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B9961D").s().p("AjvDvIAAneIHeAAIAAHeg");
	this.shape_2.setTransform(24,24);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,195.1,51.5);


(lib.CheckBoxHorsens = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"inactive":0,"active":9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,3.8,0.999);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.BlockerButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Layer 2
	this.text = new cjs.Text("horsens", "36px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 38;
	this.text.lineWidth = 100;
	this.text.setTransform(57,3.8);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(20));

	// Checked
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhtBjQg0g6gWgQQADgLAIgJIAHgFQAQABAnAdIAsAfQAyhXA/g/QBAg9BJggQhWBYhFCGQghBFghBKQgggogogsg");
	this.shape.setTransform(25.5,24.2);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:false},0).wait(11));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AjvjvIHfAAIAAHfInfAAg");
	this.shape_1.setTransform(24,24);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B9961D").s().p("AjvDvIAAneIHeAAIAAHeg");
	this.shape_2.setTransform(24,24);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,191.5,51.5);


(lib._05Map = function() {
	this.initialize();

	// Info Popup
	this.infopopup = new lib.InfoPopup();
	this.infopopup.setTransform(1024,0);

	// Info Buttons
	this.info3 = new lib.InfoButton();
	this.info3.setTransform(672,433.5);
	new cjs.ButtonHelper(this.info3, 0, 1, 2, false, new lib.InfoButton(), 3);

	this.info2 = new lib.InfoButton();
	this.info2.setTransform(843,342.5);
	new cjs.ButtonHelper(this.info2, 0, 1, 2, false, new lib.InfoButton(), 3);

	this.info1 = new lib.InfoButton();
	this.info1.setTransform(578,306);
	new cjs.ButtonHelper(this.info1, 0, 1, 2, false, new lib.InfoButton(), 3);

	// Checkboxes
	this.checkbox3 = new lib.CheckBoxSvendborg();
	this.checkbox3.setTransform(481.6,425);

	this.checkbox2 = new lib.CheckBoxSundholm();
	this.checkbox2.setTransform(660.5,333.8);

	this.checkbox1 = new lib.CheckBoxHorsens();
	this.checkbox1.setTransform(415.4,298.8);

	// Layer 3
	this.infotext = new lib.Additionalinfo();
	this.infotext.setTransform(555.4,223.7,1,1,0,0,0,345.4,111.4);

	// Text
	this.text = new cjs.Text("Vælg hvor du starter", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 777;
	this.text.setTransform(210,38);

	this.addChild(this.text,this.infotext,this.checkbox1,this.checkbox2,this.checkbox3,this.info1,this.info2,this.info3,this.infopopup);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(210,0,1859,540);


// stage content:
(lib.map = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{start:0,character_build:9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(24));

	// 0.5 Map
	this.page_map = new lib._05Map();
	this.page_map.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.page_map).wait(24));

	// 0.5
	this.bg_0_5 = new lib.Background0_5();
	this.bg_0_5.setTransform(1024,0);

	this.timeline.addTween(cjs.Tween.get(this.bg_0_5).wait(24));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1536,270,2069,540);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;