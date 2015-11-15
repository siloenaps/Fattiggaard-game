(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 648,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"../assets/images/main/_0_0Frontpage.jpg", id:"_0_0Frontpage"},
		{src:"../assets/images/main/_0_1BG.jpg", id:"_0_1BG"},
		{src:"../assets/images/main/_0_2BG.jpg", id:"_0_2BG"},
		{src:"../assets/images/main/_0_3BG.jpg", id:"_0_3BG"},
		{src:"../assets/images/main/_0_4BG.jpg", id:"_0_4BG"},
		{src:"../assets/images/main/_0_5_1_close_bt.png", id:"_0_5_1_close_bt"},
		{src:"../assets/images/main/_0_5_infobt.png", id:"_0_5_infobt"},
		{src:"../assets/images/main/_0_5BG.jpg", id:"_0_5BG"},
		{src:"../assets/images/main/_1_0BGhorsens.jpg", id:"_1_0BGhorsens"},
		{src:"../assets/images/main/_1_0BGsundholm.jpg", id:"_1_0BGsundholm"},
		{src:"../assets/images/main/_1_0BGsvendborg.jpg", id:"_1_0BGsvendborg"},
		{src:"../assets/images/main/ADCloseUp.png", id:"ADCloseUp"},
		{src:"../assets/images/main/AECloseUp.png", id:"AECloseUp"},
		{src:"../assets/images/main/AFCloseUp.png", id:"AFCloseUp"},
		{src:"../assets/images/main/BDCloseUp.png", id:"BDCloseUp"},
		{src:"../assets/images/main/BECloseUp.png", id:"BECloseUp"},
		{src:"../assets/images/main/BFCloseUp.png", id:"BFCloseUp"},
		{src:"../assets/images/main/CDCloseUp.png", id:"CDCloseUp"},
		{src:"../assets/images/main/CECloseUp.png", id:"CECloseUp"},
		{src:"../assets/images/main/CFCloseUp.png", id:"CFCloseUp"},
		{src:"../assets/images/main/CharacterCardChallenge0001.png", id:"CharacterCardChallenge0001"},
		{src:"../assets/images/main/CharacterCardChallenge0002.png", id:"CharacterCardChallenge0002"},
		{src:"../assets/images/main/CharacterCardChallenge0003.png", id:"CharacterCardChallenge0003"},
		{src:"../assets/images/main/CharacterCardChildren0001.png", id:"CharacterCardChildren0001"},
		{src:"../assets/images/main/CharacterCardChildren0002.png", id:"CharacterCardChildren0002"},
		{src:"../assets/images/main/CharacterCardFamily0001.png", id:"CharacterCardFamily0001"},
		{src:"../assets/images/main/CharacterCardFamily0002.png", id:"CharacterCardFamily0002"},
		{src:"../assets/images/main/CharacterCardFamily0003.png", id:"CharacterCardFamily0003"},
		{src:"../assets/images/main/CharacterCardlabelspng.png", id:"CharacterCardlabelspng"},
		{src:"../assets/images/main/CharacterCardName0001.png", id:"CharacterCardName0001"},
		{src:"../assets/images/main/CharacterCardName0002.png", id:"CharacterCardName0002"},
		{src:"../assets/images/main/CharacterCardName0003.png", id:"CharacterCardName0003"},
		{src:"../assets/images/main/CharacterCardName0004.png", id:"CharacterCardName0004"},
		{src:"../assets/images/main/CharacterCardName0005.png", id:"CharacterCardName0005"},
		{src:"../assets/images/main/CharacterCardName0006.png", id:"CharacterCardName0006"},
		{src:"../assets/images/main/CharacterCardName0007.png", id:"CharacterCardName0007"},
		{src:"../assets/images/main/CharacterCardName0008.png", id:"CharacterCardName0008"},
		{src:"../assets/images/main/CharacterCardName0009.png", id:"CharacterCardName0009"},
		{src:"../assets/images/main/CharacterCardNickame0001.png", id:"CharacterCardNickame0001"},
		{src:"../assets/images/main/CharacterCardNickame0002.png", id:"CharacterCardNickame0002"},
		{src:"../assets/images/main/CharacterCardNickame0003.png", id:"CharacterCardNickame0003"},
		{src:"../assets/images/main/CharacterCardNickame0004.png", id:"CharacterCardNickame0004"},
		{src:"../assets/images/main/CharacterCardNickame0005.png", id:"CharacterCardNickame0005"},
		{src:"../assets/images/main/CharacterCardNickame0006.png", id:"CharacterCardNickame0006"},
		{src:"../assets/images/main/FotoAD.jpg", id:"FotoAD"},
		{src:"../assets/images/main/FotoAE.jpg", id:"FotoAE"},
		{src:"../assets/images/main/FotoAF.jpg", id:"FotoAF"},
		{src:"../assets/images/main/FotoBD.jpg", id:"FotoBD"},
		{src:"../assets/images/main/FotoBE.jpg", id:"FotoBE"},
		{src:"../assets/images/main/FotoBF.jpg", id:"FotoBF"},
		{src:"../assets/images/main/FotoCD.jpg", id:"FotoCD"},
		{src:"../assets/images/main/FotoCE.jpg", id:"FotoCE"},
		{src:"../assets/images/main/FotoCF.jpg", id:"FotoCF"},
		{src:"../assets/images/main/IntroTextFrame.png", id:"IntroTextFrame"},
		{src:"../assets/images/main/Logo.png", id:"Logo"},
		{src:"../assets/images/main/p1.png", id:"p1"},
		{src:"../assets/images/main/p10.png", id:"p10"},
		{src:"../assets/images/main/p2.png", id:"p2"},
		{src:"../assets/images/main/p3.png", id:"p3"},
		{src:"../assets/images/main/p4.png", id:"p4"},
		{src:"../assets/images/main/p5.png", id:"p5"},
		{src:"../assets/images/main/p6.png", id:"p6"},
		{src:"../assets/images/main/p7.png", id:"p7"},
		{src:"../assets/images/main/p8.png", id:"p8"},
		{src:"../assets/images/main/p9.png", id:"p9"},
		{src:"../assets/images/main/Page04CharacterText0001.png", id:"Page04CharacterText0001"},
		{src:"../assets/images/main/Page04CharacterText0002.png", id:"Page04CharacterText0002"},
		{src:"../assets/images/main/Page04CharacterText0003.png", id:"Page04CharacterText0003"},
		{src:"../assets/images/main/Page04CharacterText0004.png", id:"Page04CharacterText0004"},
		{src:"../assets/images/main/Page04CharacterText0005.png", id:"Page04CharacterText0005"},
		{src:"../assets/images/main/Page04CharacterText0006.png", id:"Page04CharacterText0006"},
		{src:"../assets/images/main/Page04CharacterText0007.png", id:"Page04CharacterText0007"},
		{src:"../assets/images/main/Page04CharacterText0008.png", id:"Page04CharacterText0008"},
		{src:"../assets/images/main/Page04CharacterText0009.png", id:"Page04CharacterText0009"},
		{src:"../assets/images/main/PersonCardAD.png", id:"PersonCardAD"},
		{src:"../assets/images/main/PersonCardAE.png", id:"PersonCardAE"},
		{src:"../assets/images/main/PersonCardAF.png", id:"PersonCardAF"},
		{src:"../assets/images/main/PersonCardBD.png", id:"PersonCardBD"},
		{src:"../assets/images/main/PersonCardBE.png", id:"PersonCardBE"},
		{src:"../assets/images/main/PersonCardBF.png", id:"PersonCardBF"},
		{src:"../assets/images/main/PersonCardCD.png", id:"PersonCardCD"},
		{src:"../assets/images/main/PersonCardCE.png", id:"PersonCardCE"},
		{src:"../assets/images/main/PersonCardCF.png", id:"PersonCardCF"},
		{src:"../assets/images/main/PointBG.png", id:"PointBG"},
		{src:"../assets/images/main/tekst_bg_sort.png", id:"tekst_bg_sort"},
		{src:"../assets/images/main/TopBG.jpg", id:"TopBG"},
		{src:"../assets/images/main/TopCard.png", id:"TopCard"}
	]
};



// symbols:



(lib._0_0Frontpage = function() {
	this.initialize(img._0_0Frontpage);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


(lib._0_1BG = function() {
	this.initialize(img._0_1BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._0_2BG = function() {
	this.initialize(img._0_2BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._0_3BG = function() {
	this.initialize(img._0_3BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib._0_4BG = function() {
	this.initialize(img._0_4BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


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


(lib.CharacterCardChallenge0001 = function() {
	this.initialize(img.CharacterCardChallenge0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,195,34);


(lib.CharacterCardChallenge0002 = function() {
	this.initialize(img.CharacterCardChallenge0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,195,34);


(lib.CharacterCardChallenge0003 = function() {
	this.initialize(img.CharacterCardChallenge0003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,195,34);


(lib.CharacterCardChildren0001 = function() {
	this.initialize(img.CharacterCardChildren0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,22);


(lib.CharacterCardChildren0002 = function() {
	this.initialize(img.CharacterCardChildren0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,22);


(lib.CharacterCardFamily0001 = function() {
	this.initialize(img.CharacterCardFamily0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,107,22);


(lib.CharacterCardFamily0002 = function() {
	this.initialize(img.CharacterCardFamily0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,107,22);


(lib.CharacterCardFamily0003 = function() {
	this.initialize(img.CharacterCardFamily0003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,107,22);


(lib.CharacterCardlabelspng = function() {
	this.initialize(img.CharacterCardlabelspng);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,105);


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


(lib.CharacterCardNickame0001 = function() {
	this.initialize(img.CharacterCardNickame0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0002 = function() {
	this.initialize(img.CharacterCardNickame0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0003 = function() {
	this.initialize(img.CharacterCardNickame0003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0004 = function() {
	this.initialize(img.CharacterCardNickame0004);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0005 = function() {
	this.initialize(img.CharacterCardNickame0005);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.CharacterCardNickame0006 = function() {
	this.initialize(img.CharacterCardNickame0006);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,28);


(lib.FotoAD = function() {
	this.initialize(img.FotoAD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoAE = function() {
	this.initialize(img.FotoAE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoAF = function() {
	this.initialize(img.FotoAF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoBD = function() {
	this.initialize(img.FotoBD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoBE = function() {
	this.initialize(img.FotoBE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoBF = function() {
	this.initialize(img.FotoBF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoCD = function() {
	this.initialize(img.FotoCD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoCE = function() {
	this.initialize(img.FotoCE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.FotoCF = function() {
	this.initialize(img.FotoCF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.IntroTextFrame = function() {
	this.initialize(img.IntroTextFrame);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,153);


(lib.Logo = function() {
	this.initialize(img.Logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,118);


(lib.p1 = function() {
	this.initialize(img.p1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p10 = function() {
	this.initialize(img.p10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p2 = function() {
	this.initialize(img.p2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p3 = function() {
	this.initialize(img.p3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p4 = function() {
	this.initialize(img.p4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p5 = function() {
	this.initialize(img.p5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p6 = function() {
	this.initialize(img.p6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p7 = function() {
	this.initialize(img.p7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p8 = function() {
	this.initialize(img.p8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.p9 = function() {
	this.initialize(img.p9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6,26);


(lib.Page04CharacterText0001 = function() {
	this.initialize(img.Page04CharacterText0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0002 = function() {
	this.initialize(img.Page04CharacterText0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0003 = function() {
	this.initialize(img.Page04CharacterText0003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0004 = function() {
	this.initialize(img.Page04CharacterText0004);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0005 = function() {
	this.initialize(img.Page04CharacterText0005);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0006 = function() {
	this.initialize(img.Page04CharacterText0006);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0007 = function() {
	this.initialize(img.Page04CharacterText0007);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0008 = function() {
	this.initialize(img.Page04CharacterText0008);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.Page04CharacterText0009 = function() {
	this.initialize(img.Page04CharacterText0009);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,602,214);


(lib.PersonCardAD = function() {
	this.initialize(img.PersonCardAD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardAE = function() {
	this.initialize(img.PersonCardAE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardAF = function() {
	this.initialize(img.PersonCardAF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardBD = function() {
	this.initialize(img.PersonCardBD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardBE = function() {
	this.initialize(img.PersonCardBE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardBF = function() {
	this.initialize(img.PersonCardBF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardCD = function() {
	this.initialize(img.PersonCardCD);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardCE = function() {
	this.initialize(img.PersonCardCE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PersonCardCF = function() {
	this.initialize(img.PersonCardCF);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.PointBG = function() {
	this.initialize(img.PointBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.tekst_bg_sort = function() {
	this.initialize(img.tekst_bg_sort);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,737,343);


(lib.TopBG = function() {
	this.initialize(img.TopBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,108);


(lib.TopCard = function() {
	this.initialize(img.TopCard);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,389,108);


(lib.IntroTextTopgfx = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.IntroTextFrame();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,318,153);


(lib.BackgroundGFX = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.TopBG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,108);


(lib.TopbarRealName = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{AD:0,AE:1,AF:2,BD:3,BE:4,BF:5,CD:6,CE:7,CF:8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// Layer 1
	this.text = new cjs.Text("Arnold Knudsen", "18px 'Special Elite'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 176;

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({text:"Albert Rasmussen"},0).wait(1).to({text:"Vilhelm Laursen"},0).wait(1).to({text:"Charles Kræfting"},0).wait(1).to({text:"Viktor Stegemeier"},0).wait(1).to({text:"Georg Wagner"},0).wait(1).to({text:"Marinus Sander"},0).wait(1).to({text:"Ernst Jensenius"},0).wait(1).to({text:"Paul Götzche"},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,180,22);


(lib.TopbarPhoto = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// Content
	this.instance = new lib.FotoAD();

	this.instance_1 = new lib.FotoAE();

	this.instance_2 = new lib.FotoAF();

	this.instance_3 = new lib.FotoBD();

	this.instance_4 = new lib.FotoBE();

	this.instance_5 = new lib.FotoBF();

	this.instance_6 = new lib.FotoCD();

	this.instance_7 = new lib.FotoCE();

	this.instance_8 = new lib.FotoCF();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,165,108);


(lib.PointIndicator = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(10));

	// Bar
	this.instance = new lib.p1();
	this.instance.setTransform(12,9);

	this.instance_1 = new lib.p2();
	this.instance_1.setTransform(21,9);

	this.instance_2 = new lib.p3();
	this.instance_2.setTransform(30,9);

	this.instance_3 = new lib.p4();
	this.instance_3.setTransform(39,9);

	this.instance_4 = new lib.p5();
	this.instance_4.setTransform(48,9);

	this.instance_5 = new lib.p6();
	this.instance_5.setTransform(57,9);

	this.instance_6 = new lib.p7();
	this.instance_6.setTransform(66,9);

	this.instance_7 = new lib.p8();
	this.instance_7.setTransform(75,9);

	this.instance_8 = new lib.p9();
	this.instance_8.setTransform(84,9);

	this.instance_9 = new lib.p10();
	this.instance_9.setTransform(93,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6},{t:this.instance_7}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6},{t:this.instance_7},{t:this.instance_8}]},1).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2},{t:this.instance_3},{t:this.instance_4},{t:this.instance_5},{t:this.instance_6},{t:this.instance_7},{t:this.instance_8},{t:this.instance_9}]},1).wait(1));

	// Layer 1
	this.instance_10 = new lib.PointBG();

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(10));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.ProgressionBar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Egl4AAxIAAhiMBLxAAAIAABig");
	this.shape.setTransform(242.5,5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,485,10);


(lib.Playerlabels = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(25));

	// Layer 1
	this.text = new cjs.Text("???", "37px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 39;
	this.text.lineWidth = 459;

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({text:"Din voksne datter"},0).wait(1).to({text:"???"},0).wait(2).to({text:"Din voksne datter"},0).wait(1).to({text:"???"},0).wait(2).to({text:"Din voksne datter"},0).wait(1).to({text:"???"},0).wait(17));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,462.8,43.9);


(lib.OpenionCloseups = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

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


(lib.InfoButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib._0_5_infobt();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


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


(lib.Page04CharacterText = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// Text png
	this.instance = new lib.Page04CharacterText0001();
	this.instance.setTransform(1.5,1.5);

	this.instance_1 = new lib.Page04CharacterText0002();
	this.instance_1.setTransform(1.5,1.5);

	this.instance_2 = new lib.Page04CharacterText0003();
	this.instance_2.setTransform(1.5,1.5);

	this.instance_3 = new lib.Page04CharacterText0004();
	this.instance_3.setTransform(1.5,1.5);

	this.instance_4 = new lib.Page04CharacterText0005();
	this.instance_4.setTransform(1.5,1.5);

	this.instance_5 = new lib.Page04CharacterText0006();
	this.instance_5.setTransform(1.5,1.5);

	this.instance_6 = new lib.Page04CharacterText0007();
	this.instance_6.setTransform(1.5,1.5);

	this.instance_7 = new lib.Page04CharacterText0008();
	this.instance_7.setTransform(1.5,1.5);

	this.instance_8 = new lib.Page04CharacterText0009();
	this.instance_8.setTransform(1.5,1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,603.5,262);


(lib.CharacterIntro = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Du bliver nu indlagt og indespærret på en\nfattiggård et sted i Danmark på et tidspunkt i\nåret 1940. Du stilles over for - og skal tage stilling til de samme dilemmaer som en række\nfattige og udsatte danskere stod over for under\n2. verdenskrig og dermed tage del i deres\nhistorie. Du skal vælge mellem fattiggård eller fjendeland.\n\nMen først skal du være med til at bestemme,\nhvem du er…", "24px 'Special Elite'", "#D9D1B4");
	this.text.lineHeight = 26;
	this.text.lineWidth = 594;
	this.text.setTransform(212,132);

	this.addChild(this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(212,132,597.6,392.8);


(lib.CharacterCardPortrait = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(15));

	// Layer 1
	this.instance = new lib.PersonCardAD();

	this.instance_1 = new lib.PersonCardAE();

	this.instance_2 = new lib.PersonCardAF();

	this.instance_3 = new lib.PersonCardBD();

	this.instance_4 = new lib.PersonCardBE();

	this.instance_5 = new lib.PersonCardBF();

	this.instance_6 = new lib.PersonCardCD();

	this.instance_7 = new lib.PersonCardCE();

	this.instance_8 = new lib.PersonCardCF();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(7));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,326,426);


(lib.CharacterCardNickame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(14));

	// Nickname png
	this.instance = new lib.CharacterCardNickame0001();
	this.instance.setTransform(3.8,0.7);

	this.instance_1 = new lib.CharacterCardNickame0002();
	this.instance_1.setTransform(3.8,0.7);

	this.instance_2 = new lib.CharacterCardNickame0003();
	this.instance_2.setTransform(3.8,0.7);

	this.instance_3 = new lib.CharacterCardNickame0004();
	this.instance_3.setTransform(3.8,0.7);

	this.instance_4 = new lib.CharacterCardNickame0005();
	this.instance_4.setTransform(3.8,0.7);

	this.instance_5 = new lib.CharacterCardNickame0006();
	this.instance_5.setTransform(3.8,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[]},1).wait(8));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.5,0.6,212.3,28.1);


(lib.CharacterCardName = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"AD":0,"AE":1,"AF":2,"BD":3,"BE":4,"BF":5,"CD":6,"CE":7,"CF":8});

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


(lib.CharacterCardFamily = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{D:0,E:1,F:2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Text png
	this.instance = new lib.CharacterCardFamily0001();
	this.instance.setTransform(2.9,2.6);

	this.instance_1 = new lib.CharacterCardFamily0002();
	this.instance_1.setTransform(2.9,2.6);

	this.instance_2 = new lib.CharacterCardFamily0003();
	this.instance_2.setTransform(2.9,2.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.9,2,107,22.6);


(lib.CharacterCardChildren = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"D":0,"E":1,"F":2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Text png
	this.instance = new lib.CharacterCardChildren0001();
	this.instance.setTransform(2.3,2.4);

	this.instance_1 = new lib.CharacterCardChildren0002();
	this.instance_1.setTransform(2.3,2.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.3,2.1,36.1,22.5);


(lib.CharacterCardChallenge = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{A:0,B:1,C:2});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Text png
	this.instance = new lib.CharacterCardChallenge0001();
	this.instance.setTransform(-1.9,0.5);

	this.instance_1 = new lib.CharacterCardChallenge0002();
	this.instance_1.setTransform(-1.9,0.5);

	this.instance_2 = new lib.CharacterCardChallenge0003();
	this.instance_2.setTransform(-1.9,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.3,0,195.5,34.5);


(lib._00Frontpage = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._0_0Frontpage();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,648);


(lib.EmptyContainerGrey = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgtTAfkMAAAg/HMBamAAAMAAAA/Hg");
	this.shape.setTransform(290,202);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,580,404);


(lib.EmptyContainer = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


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


(lib.BlockerBLACK = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ApXJXIAAyuISuAAIAASug");
	this.shape.setTransform(60,60);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


(lib.BlackTextBG = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.tekst_bg_sort();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,737,343);


(lib.PointsMood = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("humør", "18px 'BigNoodleTitling'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 55;
	this.text.setTransform(110,10);

	this.points = new lib.PointIndicator();
	this.points.setTransform(88.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.points,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.PointsMoney = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("penge", "18px 'BigNoodleTitling'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 55;
	this.text.setTransform(110,10);

	this.points = new lib.PointIndicator();
	this.points.setTransform(88.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.points,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.PointsHealth = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("helbred", "18px 'BigNoodleTitling'");
	this.text.lineHeight = 20;
	this.text.lineWidth = 55;
	this.text.setTransform(110,10);

	this.points = new lib.PointIndicator();
	this.points.setTransform(88.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.points,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177,50);


(lib.InfoPopup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

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
	this.text.lineWidth = 724;
	this.text.setTransform(219,135.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({text:"Sundholm er en kæmpe stor fattiganstalt på Amager med plads til op mod\n750 indlagte. Mænd og kvinder holdes adskilt. Sundholm består af en\narbejdsanstalt, en forsørgelsesanstalt og en tvangsarbejdsanstalt. \nArbejdsdygtige individer bliver indlagt på arbejdsanstalten eller tvangs-\narbejdsanstalten, da man mener, at de selv bærer hovedansvaret for deres \nfattigdom. Rundt om Sundholm har man gravet en fire meter dyb voldgrav.\nPå kanten af voldgraven står et to meter højt pigtrådshegn. Pigtrådshegnet\ner ca. 1400 meter langt. Anstaltens chef er Forvalteren, det er ham, der\nbestemmer over de indlagte og har det overordnede ansvar for, at stedets\nregler bliver overholdt. Opsynsmændene er forvalterens forlængede arm. ",lineWidth:781},0).wait(1).to({text:"Svendborg Fattiggård er en anstalt med plads til 51 indlagte. Svendborg \nfattiggård indeholder en arbejdsafdeling, en forsørgelsesafdeling og en \nsygeafdeling. Mænd og kvinder holdes adskilt. Arbejdsdygtige individer \nbliver indlagt på arbejdsafdelingen, da man mener, at de er dovne og \narbejdssky, og derfor selv bærer hovedansvaret for deres fattigdom. \nLangs fattiggårdens bygninger er der høje mure med pigtråd på toppen. \nAnstaltens chef er Forvalteren, det er ham, der bestemmer over de indlagte \nog har det overordnede ansvar for, at stedets regler bliver overholdt.",lineWidth:724},0).wait(1));

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
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.CheckBoxsmall = function(mode,startPosition,loop) {
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


(lib.CheckBoxshort = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"inactive":0,"active":9});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Hitarea
	this.instance = new lib.BlockerButton();
	this.instance.setTransform(0,0,5.9,1.2);
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
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,296.5,61.5);


(lib.CheckBox = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"inactive":0,"active":9});

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
	this.checkbox3 = new lib.CheckBoxsmall();
	this.checkbox3.setTransform(481.6,425);

	this.checkbox2 = new lib.CheckBoxsmall();
	this.checkbox2.setTransform(660.5,333.8);

	this.checkbox1 = new lib.CheckBoxsmall();
	this.checkbox1.setTransform(415.4,298.8);

	// Text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B9961D").s().p("AAML9QgnAAAAgtIAAivQAAguAnAAIAYAAQAtAAAAAuIAAAdIgjAAIAAgYQAAgJgEgFQgEgFgHAAIgJAAQgIAAgEAFQgEAFAAAJIAACjQAAAUAQAAIAYAAIAAhCIgTAAIAAggIA2AAIAACCgAhVL9IgXhsIgWAAIAABsIgjAAIAAkKIBFAAQApAAAAAuIAABBQAAAjgVAJIAZBvgAiCJzIAYAAQAIAAAEgFQAEgEAAgKIAAg6QAAgJgEgFQgEgFgIAAIgYAAgAkRL9QgVAAgLgLQgKgMAAgWIAAivQAAguAqAAIAiAAQAVAAALAMQALALAAAXIAACvQAAAWgLAMQgLALgVAAgAkYIjIAACqQAAAQAQAAIASAAQAOAAAAgQIAAiqQAAgIgEgEQgEgEgIAAIgQAAQgQAAAAAQgAnHL9IAAkKIA9AAQAYAAAMAMQALAMAAAYIAAAzQAAAXgZAFIAAACQAPAEAHAIQAHAHAAAMIAABCQAAAUgKAKQgKAKgUAAgAmjLdIAbAAQAOAAAAgMIAAg7QAAgTgWAAIgTAAgAmjJjIARAAQAKAAAFgFQAFgEAAgKIAAgqQAAgJgEgFQgEgFgIAAIgVAAgApWL9IAAkKIA+AAQAyAAAAAzIAACwQAAAUgKAJQgLAKgVAAgAoyLdIAbAAQAHAAADgDQAEgDAAgGIAAirQAAgJgEgFQgEgFgIAAIgZAAgAqaL9IAAg1Igmh5IAACuIgkAAIAAkKIAkAAIAmCAIAAiAIAjAAIAAEKgAtVL9IAAkKIBYAAIAAAgIg1AAIAABRIAvAAIAAAgIgvAAIAABZIA1AAIAAAggAu+L9IgrkKIAjAAIAdDLIAdjLIAjAAIgrEKgAw6L9QgrAAAAgxIAAgNIAkAAIAAAOQAAAQAQAAIAGAAQAOAAAAgQIAAgtQAAgIgDgCIg7gkQgFgEgDgGQgCgHAAgKIAAg2QAAguArAAIAWAAQAVAAALAMQALALAAAXIAAAaIgkAAIAAgYQAAgIgEgEQgEgEgIAAIgFAAQgIAAgEAEQgDAEAAAIIAAAsQAAAIADACIAJAHIAyAcQAEADADAFQADAFAAAOIAAA5QAAAtgrAAgAbaiUIAEiuIgbB+IgbAAIgbh+IAECuIgkAAIAAkKIAoAAIAhCcIAhicIAnAAIAAEKgAYFiUIAAkKIAjAAIAADqIAxAAIAAAggAWZiUQgVAAgLgLQgKgMAAgWIAAivQAAguAqAAIAiAAQAVAAALAMQALALAAAXIAACvQAAAWgLAMQgLALgVAAgAWSluIAACqQAAAQAQAAIASAAQAOAAAAgQIAAiqQAAgIgEgEQgEgEgIAAIgQAAQgQAAAAAQgAUsiUIAAh5IgsAAIAAB5IgkAAIAAkKIAkAAIAABxIAsAAIAAhxIAjAAIAAEKgARNiUIAAkKIA+AAQAyAAAAAzIAACwQAAAUgKAJQgLAKgVAAgARxi0IAbAAQAHAAADgDQAEgDAAgGIAAirQAAgJgEgFQgEgFgIAAIgZAAgAQJiUIAAg1Igmh5IAACuIgkAAIAAkKIAkAAIAmCAIAAiAIAjAAIAAEKgANWiUQgWAAgKgNQgLgNAAgZIAAjXIAjAAIAADYQAAAJAEAEQAEAFAIAAIAOAAQAIAAADgFQAEgEAAgJIAAjYIAjAAIAADXQAAAzgrAAgALNiUQgrAAAAgxIAAgNIAkAAIAAAOQAAAQAQAAIAGAAQAOAAAAgQIAAgtQAAgIgDgCIg7gkQgFgEgDgGQgCgHAAgKIAAg2QAAguArAAIAWAAQAVAAALAMQALALAAAXIAAAaIgkAAIAAgYQAAgIgEgEQgEgEgIAAIgFAAQgIAAgEAEQgDAEAAAIIAAAsQAAAIADACIAJAHIAyAcQAEADADAFQADAFAAAOIAAA5QAAAtgrAAgAudnyQgrAAAAgxIAAgNIAkAAIAAAOQAAAQAQAAIAGAAQAOAAAAgQIAAgtQAAgIgDgCIg7gkQgFgEgDgGQgCgHAAgKIAAg2QAAguArAAIAWAAQAVAAALAMQALALAAAXIAAAaIgkAAIAAgYQAAgIgEgEQgEgEgIAAIgFAAQgIAAgEAEQgDAEAAAIIAAAsQAAAIADACIAJAHIAyAcQAEADADAFQADAFAAAOIAAA5QAAAtgrAAgAwInyIAAg1Ignh5IAACuIgjAAIAAkKIAjAAIAnCAIAAiAIAjAAIAAEKgAzEnyIAAkKIBZAAIAAAgIg1AAIAABRIAvAAIAAAgIgvAAIAABZIA1AAIAAAggA0inyQgqAAAAgxIAAgNIAjAAIAAAOQAAAQAQAAIAGAAQAOAAAAgQIAAgtQAAgIgCgCIg8gkQgFgEgCgGQgCgHAAgKIAAg2QAAguAqAAIAWAAQAWAAAKAMQALALAAAXIAAAaIgkAAIAAgYQAAgIgDgEQgEgEgIAAIgGAAQgHAAgEAEQgEAEAAAIIAAAsQAAAIADACIAKAHIAxAcQAFADACAFQADAFAAAOIAAA5QAAAtgrAAgA2EnyIgXhsIgWAAIAABsIgjAAIAAkKIBFAAQApAAAAAuIAABBQAAAjgVAJIAZBvgA2xp8IAYAAQAIAAAEgFQAEgEAAgKIAAg6QAAgJgEgFQgEgFgIAAIgYAAgA5AnyQgVAAgLgLQgKgMAAgWIAAivQAAguAqAAIAiAAQAVAAALAMQALALAAAXIAACvQAAAWgLAMQgLALgVAAgA5HrMIAACqQAAAQAQAAIASAAQAOAAAAgQIAAiqQAAgIgEgEQgEgEgIAAIgQAAQgQAAAAAQgA6tnyIAAh5IgsAAIAAB5IgkAAIAAkKIAkAAIAABxIAsAAIAAhxIAjAAIAAEKg");
	this.shape.setTransform(658.7,386.7);

	this.text = new cjs.Text("Vælg hvor du starter", "48px 'Special Elite'", "#FFFFFF");
	this.text.lineHeight = 50;
	this.text.lineWidth = 777;
	this.text.setTransform(210,38);

	// BG
	this.instance = new lib._0_5BG();

	this.addChild(this.instance,this.text,this.shape,this.checkbox1,this.checkbox2,this.checkbox3,this.info1,this.info2,this.info3,this.infopopup);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,2048,540);


(lib._03CardMain = function() {
	this.initialize();

	// Challenge
	this.kids = new lib.CharacterCardChildren();
	this.kids.setTransform(648.7,429.7,1,1,-3.5,0,0,2.6,1.6);

	this.family = new lib.CharacterCardFamily();
	this.family.setTransform(707.9,381.7,1,1,-3.5,0,0,3.1,2.9);

	this.challenge = new lib.CharacterCardChallenge();
	this.challenge.setTransform(707.9,334.5,1,1,-3.5);

	// Name
	this.realname = new lib.CharacterCardName();
	this.realname.setTransform(553.6,148.6,1,1,-3.5,0,0,2.5,0.7);

	this.nickname = new lib.CharacterCardNickame();
	this.nickname.setTransform(556.1,179.1,1,1,-3.5,0,0,4,0.8);

	// Portrait
	this.portrait = new lib.CharacterCardPortrait();
	this.portrait.setTransform(176.2,106.8);

	// BG Text 
	this.instance = new lib.CharacterCardlabelspng();
	this.instance.setTransform(576.6,347,1,1,-3.5);

	// BG
	this.instance_1 = new lib._0_3BG();

	this.addChild(this.instance_1,this.instance,this.portrait,this.nickname,this.realname,this.challenge,this.family,this.kids);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.CharacterNickname = function() {
	this.initialize();

	// Checkboxes
	this.checkbox6 = new lib.CheckBoxshort();
	this.checkbox6.setTransform(540.7,443.7,1,1,0,0,0,29,29);

	this.checkbox5 = new lib.CheckBoxshort();
	this.checkbox5.setTransform(540.7,330.1,1,1,0,0,0,29,29);

	this.checkbox4 = new lib.CheckBoxshort();
	this.checkbox4.setTransform(540.7,217.3,1,1,0,0,0,29,29);

	this.checkbox3 = new lib.CheckBoxshort();
	this.checkbox3.setTransform(242.7,443.7,1,1,0,0,0,29,29);

	this.checkbox2 = new lib.CheckBoxshort();
	this.checkbox2.setTransform(242.7,330.1,1,1,0,0,0,29,29);

	this.checkbox1 = new lib.CheckBoxshort();
	this.checkbox1.setTransform(242.7,217.3,1,1,0,0,0,29,29);

	// Text
	this.text = new cjs.Text("paven", "48px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 50;
	this.text.lineWidth = 212;
	this.text.setTransform(586,418.8);

	this.text_1 = new cjs.Text("putte", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_1.lineHeight = 50;
	this.text_1.lineWidth = 212;
	this.text_1.setTransform(586,303.6);

	this.text_2 = new cjs.Text("nitteren", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 212;
	this.text_2.setTransform(586,189.8);

	this.text_3 = new cjs.Text("skæve", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_3.lineHeight = 50;
	this.text_3.lineWidth = 212;
	this.text_3.setTransform(289,418.8);

	this.text_4 = new cjs.Text("sutsko", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_4.lineHeight = 50;
	this.text_4.lineWidth = 212;
	this.text_4.setTransform(289,303.6);

	this.text_5 = new cjs.Text("stormkrogen", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_5.lineHeight = 50;
	this.text_5.lineWidth = 212;
	this.text_5.setTransform(289,189.8);

	this.text_6 = new cjs.Text("Vælg dit øgenavn", "48px 'Special Elite'", "#FFFFFF");
	this.text_6.lineHeight = 50;
	this.text_6.lineWidth = 584;
	this.text_6.setTransform(208.4,91);

	this.addChild(this.text_6,this.text_5,this.text_4,this.text_3,this.text_2,this.text_1,this.text,this.checkbox1,this.checkbox2,this.checkbox3,this.checkbox4,this.checkbox5,this.checkbox6);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(208.4,91,593.5,383.7);


(lib.CharacterFamily = function() {
	this.initialize();

	// Checkboxes
	this.checkbox3 = new lib.CheckBox();
	this.checkbox3.setTransform(359.5,443.7,1,1,0,0,0,29,29);

	this.checkbox2 = new lib.CheckBox();
	this.checkbox2.setTransform(359.5,330.1,1,1,0,0,0,29,29);

	this.checkbox1 = new lib.CheckBox();
	this.checkbox1.setTransform(359.5,217.3,1,1,0,0,0,29,29);

	// Text
	this.text = new cjs.Text("ugift - ingen børn", "48px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 50;
	this.text.lineWidth = 329;
	this.text.setTransform(405.8,418.8);

	this.text_1 = new cjs.Text("fraskilt - med børn", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_1.lineHeight = 50;
	this.text_1.lineWidth = 337;
	this.text_1.setTransform(405.8,303.6);

	this.text_2 = new cjs.Text("gift - ingen børn", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 336;
	this.text_2.setTransform(405.8,189.8);

	this.text_3 = new cjs.Text("Vælg din civilstand", "48px 'Special Elite'", "#FFFFFF");
	this.text_3.lineHeight = 50;
	this.text_3.lineWidth = 584;
	this.text_3.setTransform(208.4,91);

	this.addChild(this.text_3,this.text_2,this.text_1,this.text,this.checkbox1,this.checkbox2,this.checkbox3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(208.4,91,587.6,383.7);


(lib.CharacterChallenge = function() {
	this.initialize();

	// Checkboxes
	this.checkbox3 = new lib.CheckBox();
	this.checkbox3.setTransform(359.5,443.7,1,1,0,0,0,29,29);

	this.checkbox2 = new lib.CheckBox();
	this.checkbox2.setTransform(359.5,330.1,1,1,0,0,0,29,29);

	this.checkbox1 = new lib.CheckBox();
	this.checkbox1.setTransform(359.5,217.3,1,1,0,0,0,29,29);

	// Text
	this.text = new cjs.Text("SVÆKKET", "48px 'BigNoodleTitling'", "#B9961D");
	this.text.lineHeight = 50;
	this.text.lineWidth = 228;
	this.text.setTransform(405.8,418.8);

	this.text_1 = new cjs.Text("doven", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_1.lineHeight = 50;
	this.text_1.lineWidth = 228;
	this.text_1.setTransform(405.8,303.6);

	this.text_2 = new cjs.Text("Drikfældig", "48px 'BigNoodleTitling'", "#B9961D");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 228;
	this.text_2.setTransform(405.8,189.8);

	this.text_3 = new cjs.Text("Vælg din udfordring", "48px 'Special Elite'", "#FFFFFF");
	this.text_3.lineHeight = 50;
	this.text_3.lineWidth = 584;
	this.text_3.setTransform(208.4,91);

	this.addChild(this.text_3,this.text_2,this.text_1,this.text,this.checkbox1,this.checkbox2,this.checkbox3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(208.4,91,587.6,383.7);


(lib._02CharacterMain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(28));

	// Page 0.2.1 Intro
	this.character_intro = new lib.CharacterIntro();

	this.timeline.addTween(cjs.Tween.get(this.character_intro).wait(28));

	// Page 0.2.2 Challenge
	this.character_challenge = new lib.CharacterChallenge();
	this.character_challenge.setTransform(0,-88.2,1,1,0,0,0,0,-91.2);

	this.timeline.addTween(cjs.Tween.get(this.character_challenge).wait(28));

	// Page 0.2.3 Family
	this.character_family = new lib.CharacterFamily();
	this.character_family.setTransform(0,3);

	this.timeline.addTween(cjs.Tween.get(this.character_family).wait(28));

	// Page 0.2.4 Nickname
	this.character_nickname = new lib.CharacterNickname();
	this.character_nickname.setTransform(0,3);

	this.timeline.addTween(cjs.Tween.get(this.character_nickname).wait(28));

	// BG
	this.instance = new lib._0_2BG();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(28));

}).prototype = p = new cjs.MovieClip();
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


(lib.HUD = function() {
	this.initialize();

	// Text
	this.mood = new lib.PointsMood();

	// Points
	this.money = new lib.PointsMoney();
	this.money.setTransform(209.7,72.4,1,1,0,0,0,88.5,25);

	this.health = new lib.PointsHealth();
	this.health.setTransform(268.5,25,1,1,0,0,0,88.5,25);

	this.addChild(this.health,this.money,this.mood);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,357,97.4);


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


(lib._04OpinionMain = function() {
	this.initialize();

	// Text
	this.playerlabel = new lib.Playerlabels();
	this.playerlabel.setTransform(443.4,69,1,1,0,0,0,231.4,21.9);

	this.charactertext = new lib.Page04CharacterText();
	this.charactertext.setTransform(36,309.1,1,1,-3,0,0,-0.2,0.4);

	// Players
	this.player = new lib.PlayerAudio();
	this.player.setTransform(212,98);

	// Closeups
	this.portrait = new lib.OpenionCloseups();
	this.portrait.setTransform(822,261,1,1,0,0,0,201,279);

	// BG
	this.instance = new lib._0_4BG();

	this.addChild(this.instance,this.portrait,this.player,this.charactertext,this.playerlabel);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-18,1024,558);


(lib._01IntroMain = function() {
	this.initialize();

	// Player
	this.player = new lib.PlayerSlides();
	this.player.setTransform(512,269.5,1,1,0,0,0,300,229.5);

	// BG
	this.instance = new lib._0_1BG();

	this.addChild(this.instance,this.player);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,540);


(lib.TopBarMain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{intro:4,character:11,game:19});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(30));

	// Logo
	this.instance = new lib.Logo();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30));

	// Points
	this.hud = new lib.HUD();
	this.hud.setTransform(652,9);
	this.hud._off = true;

	this.timeline.addTween(cjs.Tween.get(this.hud).wait(19).to({_off:false},0).wait(11));

	// Real Name / Nickname
	this.nickname = new lib.CharacterCardNickame();
	this.nickname.setTransform(483,72,0.7,0.7,3.5,0,0,108.6,12.2);

	this.realname = new lib.TopbarRealName();
	this.realname.setTransform(487,44,1,1,0,0,0,90,11);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.realname},{t:this.nickname}]},19).wait(11));

	// Photo
	this.photo = new lib.TopbarPhoto();
	this.photo.setTransform(301.5,54,1,1,0,0,0,82.5,54);

	this.instance_1 = new lib.TopCard();
	this.instance_1.setTransform(200,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.photo}]},19).wait(11));

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

	// Speecbubble
	this.instance_2 = new lib.IntroTextTopgfx("synched",0);
	this.instance_2.setTransform(569,82.5,1,1,0,0,0,159,76.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({_off:false},0).to({_off:true},15).wait(11));

	// BG
	this.instance_3 = new lib.BackgroundGFX("synched",0);
	this.instance_3.setTransform(512,54,1,1,0,0,0,512,54);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1024,118);


// stage content:
(lib.FlashApp = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{preload:4,start:10,character_build:19,poohouse:34,germany:44});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(70));

	// Blocker
	this.blocker_black = new lib.BlockerBLACK();
	this.blocker_black.setTransform(-10,0,8.7,6.4);

	this.timeline.addTween(cjs.Tween.get(this.blocker_black).wait(70));

	// Top Bar
	this.topbar = new lib.TopBarMain();
	this.topbar.setTransform(512,54,1,1,0,0,0,512,54);
	this.topbar._off = true;

	this.timeline.addTween(cjs.Tween.get(this.topbar).wait(19).to({_off:false},0).wait(51));

	// Continue
	this.continueBtn = new lib.ContinueButton();
	this.continueBtn.setTransform(951,579.4,1,1,0,0,0,48,48);
	this.continueBtn._off = true;

	this.timeline.addTween(cjs.Tween.get(this.continueBtn).wait(10).to({_off:false},0).wait(60));

	// 0.0 Start
	this.pageStart = new lib._00Frontpage();
	this.pageStart.setTransform(512,324,1,1,0,0,0,512,324);
	this.pageStart._off = true;

	this.timeline.addTween(cjs.Tween.get(this.pageStart).wait(10).to({_off:false},0).to({_off:true},9).wait(51));

	// 0.1 Intro
	this.page_intro = new lib._01IntroMain();
	this.page_intro.setTransform(1024,108);
	this.page_intro._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_intro).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.2 Character
	this.page_character = new lib._02CharacterMain();
	this.page_character.setTransform(1023,108);
	this.page_character._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_character).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.3 Card
	this.page_card = new lib._03CardMain();
	this.page_card.setTransform(1024,108);
	this.page_card._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_card).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.4 Opinion
	this.page_opinion = new lib._04OpinionMain();
	this.page_opinion.setTransform(1024,108);
	this.page_opinion._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_opinion).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 0.5 Map
	this.page_map = new lib._05Map();
	this.page_map.setTransform(1024,108);
	this.page_map._off = true;

	this.timeline.addTween(cjs.Tween.get(this.page_map).wait(10).to({_off:false},0).to({_off:true},24).wait(36));

	// 1.0 Poor House Container
	this.poorhouse_container = new lib.EmptyContainer();
	this.poorhouse_container.setTransform(0,108);
	this.poorhouse_container._off = true;

	this.timeline.addTween(cjs.Tween.get(this.poorhouse_container).wait(10).to({_off:false},0).to({_off:true},34).wait(26));

	// 2.0 Germany Container
	this.germany_container = new lib.EmptyContainer();
	this.germany_container.setTransform(0,108);
	this.germany_container._off = true;

	this.timeline.addTween(cjs.Tween.get(this.germany_container).wait(10).to({_off:false},0).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(502,324,1044,768);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;