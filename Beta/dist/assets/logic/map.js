!function(e,t,n){var i;e.properties={width:1024,height:540,fps:24,color:"#000000",manifest:[{src:"../../assets/images/pool/_0_5_1_close_bt.png",id:"_0_5_1_close_bt"},{src:"../../assets/images/pool/_0_5_infobt.png",id:"_0_5_infobt"},{src:"../../assets/images/pool/_0_5BG.jpg",id:"_0_5BG"},{src:"../../assets/images/pool/_1_0BGhorsens.jpg",id:"_1_0BGhorsens"},{src:"../../assets/images/pool/_1_0BGsundholm.jpg",id:"_1_0BGsundholm"},{src:"../../assets/images/pool/_1_0BGsvendborg.jpg",id:"_1_0BGsvendborg"},{src:"../../assets/images/pool/tekst_bg_sort.png",id:"tekst_bg_sort"}]},(e._0_5_1_close_bt=function(){this.initialize(t._0_5_1_close_bt)}).prototype=i=new n.Bitmap,i.nominalBounds=new n.Rectangle(0,0,37,37),(e._0_5_infobt=function(){this.initialize(t._0_5_infobt)}).prototype=i=new n.Bitmap,i.nominalBounds=new n.Rectangle(0,0,35,35),(e._0_5BG=function(){this.initialize(t._0_5BG)}).prototype=i=new n.Bitmap,i.nominalBounds=new n.Rectangle(0,0,1024,540),(e._1_0BGhorsens=function(){this.initialize(t._1_0BGhorsens)}).prototype=i=new n.Bitmap,i.nominalBounds=new n.Rectangle(0,0,1024,540),(e._1_0BGsundholm=function(){this.initialize(t._1_0BGsundholm)}).prototype=i=new n.Bitmap,i.nominalBounds=new n.Rectangle(0,0,1024,540),(e._1_0BGsvendborg=function(){this.initialize(t._1_0BGsvendborg)}).prototype=i=new n.Bitmap,i.nominalBounds=new n.Rectangle(0,0,1024,540),(e.tekst_bg_sort=function(){this.initialize(t.tekst_bg_sort)}).prototype=i=new n.Bitmap,i.nominalBounds=new n.Rectangle(0,0,737,343),(e.InfoButton=function(t,i,s){this.initialize(t,i,s,{}),this.instance=new e._0_5_infobt,this.timeline.addTween(n.Tween.get(this.instance).wait(4))}).prototype=i=new n.MovieClip,i.nominalBounds=new n.Rectangle(0,0,35,35),(e.CloseButton=function(t,i,s){this.initialize(t,i,s,{}),this.instance=new e._0_5_1_close_bt,this.timeline.addTween(n.Tween.get(this.instance).wait(4))}).prototype=i=new n.MovieClip,i.nominalBounds=new n.Rectangle(0,0,37,37),(e.BlockerButton=function(e,t,i){this.initialize(e,t,i,{}),this.shape=new n.Shape,this.shape.graphics.f("#555555").s().p("Aj5D6IAAnzIHzAAIAAHzg"),this.shape.setTransform(25,25),this.shape._off=!0,this.timeline.addTween(n.Tween.get(this.shape).wait(3).to({_off:!1},0).wait(1))}).prototype=i=new n.MovieClip,i.nominalBounds=null,(e.BlackTextBG=function(){this.initialize(),this.instance=new e.tekst_bg_sort,this.addChild(this.instance)}).prototype=i=new n.Container,i.nominalBounds=new n.Rectangle(0,0,737,343),(e.Background0_5=function(){this.initialize(),this.instance=new e._0_5BG,this.addChild(this.instance)}).prototype=i=new n.Container,i.nominalBounds=new n.Rectangle(0,0,1024,540),(e.Additionalinfo=function(){this.initialize(),this.text=new n.Text("Du har ikke flere penge, og har ikke spist i flere dage. Du ved at maden i\nTyskland er tarvelig og underernærende, og frygter, at du ikke vil\nkunne holde til seks måneders arbejde i Tyskland i din nuværende\ntilstand. I stedet beslutter du at opsøge en fattiganstalt, hvor du kan få\nmad og samle kræfter.","18px 'Special Elite'","#FFFFFF"),this.text.lineHeight=20,this.text.lineWidth=687,this.addChild(this.text)}).prototype=i=new n.Container,i.nominalBounds=new n.Rectangle(0,0,691,222.8),(e.InfoPopup=function(t,i,s){null==s&&(s=!1),this.initialize(t,i,s,{}),this.frame_0=function(){this.stop()},this.timeline.addTween(n.Tween.get(this).call(this.frame_0).wait(3)),this.closebutton=new e.CloseButton,this.closebutton.setTransform(995.5,28.5,1,1,0,0,0,18.5,18.5),new n.ButtonHelper(this.closebutton,0,1,2,!1,new e.CloseButton,3),this.timeline.addTween(n.Tween.get(this.closebutton).wait(3)),this.text=new n.Text("Horsens Forsørgelsesanstalt er en fattiganstalt med plads til i alt 74\npersoner, 52 mænd og 22 kvinder. Mænd og kvinder holdes adskilt. Horsens\nForsørgelsesanstalt består af en arbejdsafdeling en forsørgelsesafdeling\nog en sygeafdeling. Arbejdsdygtige individer, alkoholister og forsømmelige\nforsørgere bliver indlagt på arbejdsafdelingen. Der er mure langs anstaltens\ngårdarealer. Anstaltens chef er Forvalteren, det er ham, der bestemmer over\nde indlagte og har det overordnede ansvar for, at stedets regler bliver\noverholdt. Opsynsmændene er forvalterens forlængede arm. ","28px 'BigNoodleTitling'","#B9961D"),this.text.lineHeight=30,this.text.lineWidth=822,this.text.setTransform(219,135.3),this.timeline.addTween(n.Tween.get(this.text).wait(1).to({text:"Sundholm er en kæmpe stor fattiganstalt på Amager med plads til op mod\n750 indlagte. Mænd og kvinder holdes adskilt. Sundholm består af en\narbejdsanstalt, en forsørgelsesanstalt og en tvangsarbejdsanstalt. \nArbejdsdygtige individer bliver indlagt på arbejdsanstalten eller tvangs-\narbejdsanstalten, da man mener, at de selv bærer hovedansvaret for deres \nfattigdom. Rundt om Sundholm har man gravet en fire meter dyb voldgrav.\nPå kanten af voldgraven står et to meter højt pigtrådshegn. Pigtrådshegnet\ner ca. 1400 meter langt. Anstaltens chef er Forvalteren, det er ham, der\nbestemmer over de indlagte og har det overordnede ansvar for, at stedets\nregler bliver overholdt. Opsynsmændene er forvalterens forlængede arm. ",lineWidth:898},0).wait(1).to({text:"Svendborg Fattiggård er en anstalt med plads til 51 indlagte. Svendborg \nfattiggård indeholder en arbejdsafdeling, en forsørgelsesafdeling og en \nsygeafdeling. Mænd og kvinder holdes adskilt. Arbejdsdygtige individer \nbliver indlagt på arbejdsafdelingen, da man mener, at de er dovne og \narbejdssky, og derfor selv bærer hovedansvaret for deres fattigdom. \nLangs fattiggårdens bygninger er der høje mure med pigtråd på toppen. \nAnstaltens chef er Forvalteren, det er ham, der bestemmer over de indlagte \nog har det overordnede ansvar for, at stedets regler bliver overholdt.",lineWidth:908},0).wait(1)),this.instance=new e.BlackTextBG("synched",0),this.instance.setTransform(164,108,1.039,1,0,0,0,-.4,.1),this.instance.alpha=.391,this.timeline.addTween(n.Tween.get(this.instance).wait(1).to({scaleX:1.02,scaleY:1.11},0).wait(1).to({scaleX:1.01,scaleY:.97},0).wait(1)),this.instance_1=new e._1_0BGhorsens,this.instance_2=new e._1_0BGsundholm,this.instance_3=new e._1_0BGsvendborg,this.timeline.addTween(n.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1))}).prototype=i=new n.MovieClip,i.nominalBounds=new n.Rectangle(0,0,1045,540),(e.CheckBoxSvendborg=function(t,i,s){this.initialize(t,i,s,{inactive:0,active:9}),this.frame_0=function(){this.stop()},this.timeline.addTween(n.Tween.get(this).call(this.frame_0).wait(20)),this.instance=new e.BlockerButton,this.instance.setTransform(0,0,3.8,.999),new n.ButtonHelper(this.instance,0,1,2,!1,new e.BlockerButton,3),this.timeline.addTween(n.Tween.get(this.instance).wait(20)),this.text=new n.Text("svendborg","36px 'BigNoodleTitling'","#B9961D"),this.text.lineHeight=38,this.text.lineWidth=153,this.text.setTransform(57,3.8),this.timeline.addTween(n.Tween.get(this.text).wait(20)),this.shape=new n.Shape,this.shape.graphics.f("#FFFFFF").s().p("AhtBjQg0g6gWgQQADgLAIgJIAHgFQAQABAnAdIAsAfQAyhXA/g/QBAg9BJggQhWBYhFCGQghBFghBKQgggogogsg"),this.shape.setTransform(25.5,24.2),this.shape._off=!0,this.timeline.addTween(n.Tween.get(this.shape).wait(9).to({_off:!1},0).wait(11)),this.shape_1=new n.Shape,this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AjvjvIHfAAIAAHfInfAAg"),this.shape_1.setTransform(24,24),this.shape_2=new n.Shape,this.shape_2.graphics.f("#B9961D").s().p("AjvDvIAAneIHeAAIAAHeg"),this.shape_2.setTransform(24,24),this.timeline.addTween(n.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11))}).prototype=i=new n.MovieClip,i.nominalBounds=new n.Rectangle(-1.5,-1.5,215.6,51.5),(e.CheckBoxSundholm=function(t,i,s){this.initialize(t,i,s,{inactive:0,active:9}),this.frame_0=function(){this.stop()},this.timeline.addTween(n.Tween.get(this).call(this.frame_0).wait(20)),this.instance=new e.BlockerButton,this.instance.setTransform(0,0,3.8,.999),new n.ButtonHelper(this.instance,0,1,2,!1,new e.BlockerButton,3),this.timeline.addTween(n.Tween.get(this.instance).wait(20)),this.text=new n.Text("sundholm","36px 'BigNoodleTitling'","#B9961D"),this.text.lineHeight=38,this.text.lineWidth=133,this.text.setTransform(57,3.8),this.timeline.addTween(n.Tween.get(this.text).wait(20)),this.shape=new n.Shape,this.shape.graphics.f("#FFFFFF").s().p("AhtBjQg0g6gWgQQADgLAIgJIAHgFQAQABAnAdIAsAfQAyhXA/g/QBAg9BJggQhWBYhFCGQghBFghBKQgggogogsg"),this.shape.setTransform(25.5,24.2),this.shape._off=!0,this.timeline.addTween(n.Tween.get(this.shape).wait(9).to({_off:!1},0).wait(11)),this.shape_1=new n.Shape,this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AjvjvIHfAAIAAHfInfAAg"),this.shape_1.setTransform(24,24),this.shape_2=new n.Shape,this.shape_2.graphics.f("#B9961D").s().p("AjvDvIAAneIHeAAIAAHeg"),this.shape_2.setTransform(24,24),this.timeline.addTween(n.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11))}).prototype=i=new n.MovieClip,i.nominalBounds=new n.Rectangle(-1.5,-1.5,195.1,51.5),(e.CheckBoxHorsens=function(t,i,s){this.initialize(t,i,s,{inactive:0,active:9}),this.frame_0=function(){this.stop()},this.timeline.addTween(n.Tween.get(this).call(this.frame_0).wait(20)),this.instance=new e.BlockerButton,this.instance.setTransform(0,0,3.8,.999),new n.ButtonHelper(this.instance,0,1,2,!1,new e.BlockerButton,3),this.timeline.addTween(n.Tween.get(this.instance).wait(20)),this.text=new n.Text("horsens","36px 'BigNoodleTitling'","#B9961D"),this.text.lineHeight=38,this.text.lineWidth=100,this.text.setTransform(57,3.8),this.timeline.addTween(n.Tween.get(this.text).wait(20)),this.shape=new n.Shape,this.shape.graphics.f("#FFFFFF").s().p("AhtBjQg0g6gWgQQADgLAIgJIAHgFQAQABAnAdIAsAfQAyhXA/g/QBAg9BJggQhWBYhFCGQghBFghBKQgggogogsg"),this.shape.setTransform(25.5,24.2),this.shape._off=!0,this.timeline.addTween(n.Tween.get(this.shape).wait(9).to({_off:!1},0).wait(11)),this.shape_1=new n.Shape,this.shape_1.graphics.f().s("#F1EBDD").ss(3,2,0,3).p("AjvjvIHfAAIAAHfInfAAg"),this.shape_1.setTransform(24,24),this.shape_2=new n.Shape,this.shape_2.graphics.f("#B9961D").s().p("AjvDvIAAneIHeAAIAAHeg"),this.shape_2.setTransform(24,24),this.timeline.addTween(n.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},9).wait(11))}).prototype=i=new n.MovieClip,i.nominalBounds=new n.Rectangle(-1.5,-1.5,191.5,51.5),(e._05Map=function(){this.initialize(),this.infopopup=new e.InfoPopup,this.infopopup.setTransform(1024,0),this.info3=new e.InfoButton,this.info3.setTransform(672,433.5),new n.ButtonHelper(this.info3,0,1,2,!1,new e.InfoButton,3),this.info2=new e.InfoButton,this.info2.setTransform(843,342.5),new n.ButtonHelper(this.info2,0,1,2,!1,new e.InfoButton,3),this.info1=new e.InfoButton,this.info1.setTransform(578,306),new n.ButtonHelper(this.info1,0,1,2,!1,new e.InfoButton,3),this.checkbox3=new e.CheckBoxSvendborg,this.checkbox3.setTransform(481.6,425),this.checkbox2=new e.CheckBoxSundholm,this.checkbox2.setTransform(660.5,333.8),this.checkbox1=new e.CheckBoxHorsens,this.checkbox1.setTransform(415.4,298.8),this.infotext=new e.Additionalinfo,this.infotext.setTransform(555.4,223.7,1,1,0,0,0,345.4,111.4),this.text=new n.Text("Vælg hvor du starter","48px 'Special Elite'","#FFFFFF"),this.text.lineHeight=50,this.text.lineWidth=777,this.text.setTransform(210,38),this.addChild(this.text,this.infotext,this.checkbox1,this.checkbox2,this.checkbox3,this.info1,this.info2,this.info3,this.infopopup)}).prototype=i=new n.Container,i.nominalBounds=new n.Rectangle(210,0,1859,540),(e.map=function(t,i,s){null==s&&(s=!1),this.initialize(t,i,s,{start:0,character_build:9}),this.frame_0=function(){this.stop()},this.timeline.addTween(n.Tween.get(this).call(this.frame_0).wait(24)),this.page_map=new e._05Map,this.page_map.setTransform(1024,0),this.timeline.addTween(n.Tween.get(this.page_map).wait(24)),this.bg_0_5=new e.Background0_5,this.bg_0_5.setTransform(1024,0),this.timeline.addTween(n.Tween.get(this.bg_0_5).wait(24))}).prototype=i=new n.MovieClip,i.nominalBounds=new n.Rectangle(1536,270,2069,540)}(lib=lib||{},images=images||{},createjs=createjs||{},ss=ss||{});var lib,images,createjs,ss;