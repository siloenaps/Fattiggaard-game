var SoundService = function(){
	'use strict';
}

SoundService.getSlideDurationById = function(id){
	'use strict';
	return this.matrix.slides[id].duration;
};
SoundService.getSlideSoundpathById = function(id){
	'use strict';
	return SoundService.properties.slidePath + id+'.mp3';
};
SoundService.getSlideSoundById = function(id){
	'use strict';
	return SoundService.matrix.slides[id]
};
SoundService.getSoundByCharacter = function(character){
	'use strict';
	return;
};

SoundService.properties = {
	basePath: 'assets/sounds/',
	slidePath: 'assets/sounds/'
};
SoundService.matrix = {
	effects: {
		typewriter: { src:SoundService.properties.basePath+'typewriter.mp3' },
		woodchopper: { src:SoundService.properties.basePath+'1.2.1_hugbraende_lydeffekt.mp3' }
	},
	'1.1.1' :{
		horsens: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3' },
		sundholm: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3' },
		svendborg: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3' }
	},
	points: {
		plus: { src:SoundService.properties.basePath+'Point_plus.mp3' },
		minus: { src:SoundService.properties.basePath+'Point_minus.mp3' }
	},
	dormitry: { src:SoundService.properties.basePath+'2.6.1_sovesal.mp3' },
	drunk: { src:SoundService.properties.basePath+'1.5.1_druk.mp3' },
	constable: { src:SoundService.properties.basePath+'1.6.1_betjent.mp3' },
	'1.2.1': {
		'horsens': {
						'A': { src:SoundService.properties.basePath+'1.2.1_fletmaatter.mp3' },
						'B': { src:SoundService.properties.basePath+'1.2.1_rengoring.mp3' },
						'C': { src:SoundService.properties.basePath+'1.2.1_havearbejde.mp3' }
					},
		'sundholm': {
						'A': { src:SoundService.properties.basePath+'1.2.1_hugbraende.mp3' },
						'B': { src:SoundService.properties.basePath+'1.2.1_pasgrise.mp3' },
						'C': { src:SoundService.properties.basePath+'1.2.1_skaerver2.mp3' }						
					},
		'svendborg': {
						'A': { src:SoundService.properties.basePath+'1.2.1_skaerver2.mp3' },
						'B': { src:SoundService.properties.basePath+'1.2.1_fletmaatter.mp3' },
						'C': { src:SoundService.properties.basePath+'1.2.1_pilkaal.mp3' }
					},
	},
	'1.3.2': { label:'wants out', src:SoundService.properties.basePath+'1.3.2_vilud.mp3' },
	'1.3.3': { label:'inmate', src:SoundService.properties.basePath+'1.3.3_RaadIndlagt.mp3' },
	'1.3.4': { label:'employee', src:SoundService.properties.basePath+'1.3.4_RaadAnsat.mp3' },	
	'1.8': { label:'arrested', src:SoundService.properties.basePath+'1.8.mp3' },	
	'2.2.1': { src:SoundService.properties.basePath+'2.2.1_hvervekontor.mp3' },
	'2.2.3': { src:SoundService.properties.basePath+'2.2.3_hvervekontor.mp3' },
	'2.8.1': { description:'get paid', src:SoundService.properties.basePath+'2.8.1_loen.mp3' },
	'2.10.1': { description:'what now', src:SoundService.properties.basePath+'2.10.1_kontraktudlob.mp3' },
	'2.10.2': {
		'A': { description:'Finnish contract', src:SoundService.properties.basePath+'2.10.2a.mp3' },
		'B': { description:'Go home', src:SoundService.properties.basePath+'2.10.2b.mp3' }
	},
	'2.11.1': { description:'home comming', src:SoundService.properties.basePath+'2.11.1_hjemkomst.mp3' },
	
	slides: {
				'slide_0_1': { src:SoundService.properties.basePath+'slide_intro.mp3' },
				'slide_1_0_1': { src:SoundService.properties.basePath+'1_0_1_ankomst.mp3' },
				'slide_2_5': { src:SoundService.properties.basePath+'slide_2_5.mp3' },
				'slide_2_7_1_amory': { src:SoundService.properties.basePath+'slide_2_7_1_amory.mp3' },
				'slide_2_7_1_butcher': { src:SoundService.properties.basePath+'slide_2_7_1_butcher.mp3' },
				'slide_2_7_1_mine': { src:SoundService.properties.basePath+'slide_2_7_1_mine.mp3' },
				'slide_home1A': { src:SoundService.properties.basePath+'slide_home1_A.mp3' },
				'slide_home1B': { src:SoundService.properties.basePath+'slide_home1_B.mp3' },
				'slide_3_0': { src:SoundService.properties.basePath+'3_0_anstalt_igen_alle.mp3' },
				'slide_4_3': { src:SoundService.properties.basePath+'4.3_rejse2.mp3' },
				'slide_4_5_1_AB': { src:SoundService.properties.basePath+'4.3_rejse2.mp3' },
				'slide_4_5_1_AC': { src:SoundService.properties.basePath+'4.3_rejse2.mp3' },
				'slide_4_5_1_BA': { src:SoundService.properties.basePath+'4.3_rejse2.mp3' },
				'slide_4_5_1_BC': { src:SoundService.properties.basePath+'4.3_rejse2.mp3' },
				'slide_4_5_1_CA': { src:SoundService.properties.basePath+'4.3_rejse2.mp3' },
				'slide_4_5_1_CB': { src:SoundService.properties.basePath+'4.3_rejse2.mp3' },
				'slide_4_7': { src:SoundService.properties.basePath+'4.7_krigenskriderfrem.mp3' }				
			},
	'0.4': { // oppinion
			'AD': { label: 'alkoholiker', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3' },
			'AE': { label: 'alkoholiker, børn', src:SoundService.properties.basePath+'0.4_datter.mp3' },
			'AF': { label: 'alkoholiker', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3' },
			'BD': { label: 'dovenskab', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3' },
			'BE': { label: 'dovenskab, børn', src:SoundService.properties.basePath+'0.4_datter.mp3' },
			'BF': { label: 'dovenskab', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3' },
			'CD': { label: 'svækkelse', src:SoundService.properties.basePath+'0.4_forvalter.mp3' },
			'CE': { label: 'svækkelse, børn', src:SoundService.properties.basePath+'0.4_datter.mp3' },
			'CF': { label: 'svækkelse', src:SoundService.properties.basePath+'0.4_forvalter.mp3' }
		},
	'3.2.1': {
		'horsens': {
						'A': { src:SoundService.properties.basePath+'1.2.1_fletmaatter.mp3' },
						'B': { src:SoundService.properties.basePath+'1.2.1_rengoring.mp3' },
						'C': { src:SoundService.properties.basePath+'1.2.1_havearbejde.mp3' }
					},
		'sundholm': {
						'A': { src:SoundService.properties.basePath+'1.2.1_hugbraende.mp3' },
						'B': { src:SoundService.properties.basePath+'1.2.1_pasgrise.mp3' },
						'C': { src:SoundService.properties.basePath+'1.2.1_skaerver2.mp3' }						
					},
		'svendborg': {
						'A': { src:SoundService.properties.basePath+'1.2.1_skaerver2.mp3' },
						'B': { src:SoundService.properties.basePath+'1.2.1_fletmaatter.mp3' },
						'C': { src:SoundService.properties.basePath+'1.2.1_pilkaal.mp3' }
					},
	},
	'3.3' : { label: 'tristesse', src:SoundService.properties.basePath+'3.3 - Det er trist herinde.mp3' },
	'3.4.1': { label:'employee', src:SoundService.properties.basePath+'3.4_ansat.mp3' },
	'3.4.2': { label:'inmate', src:SoundService.properties.basePath+'3.4_indsat.mp3' },
	'3.7.1': { label:'work over', src:SoundService.properties.basePath+'3.7.1_arbslut.mp3' },
	'4.6.1': { label:'dansk front', src:SoundService.properties.basePath+'4.6.1_moede.mp3' },
	'4.10.1': { label:'dansk front', src:SoundService.properties.basePath+'4.10.1_bombe.mp3' },
	'4.10.4': { label:'illness', src:SoundService.properties.basePath+'4.10.4_sygdom.mp3' },
	'4.10.7': { label:'illness', src:SoundService.properties.basePath+'4.10.7_pavejhjem.mp3' },
	'4.11.1': { label:'compensation', src:SoundService.properties.basePath+'4.11.1.mp3' },
	'4.11.2': { src:SoundService.properties.basePath+'typewriter.mp3' },
	'4.11.3': { src:SoundService.properties.basePath+'typewriter.mp3' },
	'4.11.4': { src:SoundService.properties.basePath+'typewriter.mp3' },
};