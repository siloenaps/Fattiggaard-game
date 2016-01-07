var SoundService = {
	init: function(){
		'use strict';
		// console.log('SoundService.init');
		var recursive = function(obj){
			for (var i in obj) {
				if(typeof obj[i] === 'object'){
					// console.log(obj[i].src);
					if(obj[i].src !== undefined){
						obj[i].src = SoundService.basePath() + obj[i].src;
					}
					recursive(obj[i]);
				}
			};
		}
		recursive(this.matrix);
	},
	getSlideDurationById: function(id){
		'use strict';
		return this.matrix.slides[id].duration;
	},
	getSlideSoundpathById: function(id){
		'use strict';
		return SoundService.properties.slidePath + id+'.mp3';
	},
	getSlideSoundById: function(id){
		'use strict';
		return SoundService.matrix.slides[id]
	},
	basePath: function(){
		'use strict';
		return Environment.basePath() + 'assets/sounds/';
	},
	matrix: {
		effects: {
			typewriter: { src:'typewriter.mp3', volume: 0.4 },
			woodchopper: { src:'1.2.1_hugbraende_lydeffekt.mp3' }
		},
		'1.1.1' :{
			horsens: { src:'1.1.1_horsens.mp3' },
			sundholm: { src:'1.1.1_sundholm.mp3' },
			svendborg: { src:'1.1.1_svendborg.mp3' }
		},
		points: {
			plus: { src:'Point_plus.mp3' },
			minus: { src:'Point_minus.mp3' }
		},
		dormitry: { src:'2.6.1.mp3' },
		drunk: { src:'1.5.1.mp3' },
		constable: { src:'1.6.1.mp3' },
		'1.2.1': {
			'horsens': {
							'A': { src:'1.1.2_pashaven.mp3' },
							'B': { src:'1.1.2_goerrent.mp3' },
							'C': { src:'1.1.2_fletmaatter.mp3' }
						},
			'sundholm': {
							'A': { src:'1.1.2_hugbraende.mp3' },
							'B': { src:'1.1.2_pasgrise.mp3' },
							'C': { src:'1.1.2_skaerver.mp3' }						
						},
			'svendborg': {
							'A': { src:'1.1.2_skaerver.mp3' },
							'B': { src:'1.1.2_vaevmaatter.mp3' },
							'C': { src:'1.1.2_pilorm.mp3' }
						},
		},
		'1.3.2': { label:'wants out', src:'1.3.2.mp3' },
		'1.3.3': { label:'inmate', src:'1.3.3_indsat.mp3' },
		'1.3.4': { label:'employee', src:'1.3.4.mp3' },	
		'1.8': { label:'arrested', src:'1.8.mp3' },	
		'2.2.1': { src:'2.2.1.mp3' },
		'2.2.3': { src:'2.2.3.mp3' },
		'2.8.1': { description:'get paid', src:'2.8.1.mp3' },
		// '2.10.1': { description:'what now', src:'2.10.1_kontraktudlob.mp3' },
		'2.10.2': {
			'A': { description:'Finnish contract', src:'2.10.2.a.mp3' },
			'B': { description:'Go home', src:'2.10.2.b.mp3' }
		},
		'2.11.1': { description:'home comming', src:'2.11.1.mp3' },
		
		slides: {
					'slide_0_1': { src:'film01medmusik_mixdown.mp3' },
					'slide_1_0_1': { src:'film10_mixdown.mp3' },
					'slide_2_5': { src:'2.5_mixdown.mp3' },
					'slide_2_7_1_amory': { src:'2.7.1.vaaben_mixdown.mp3' },
					'slide_2_7_1_butcher': { src:'2.7.1.slagt_mixdown.mp3' },
					'slide_2_7_1_mine': { src:'2.7.1.mine_mixdown.mp3' },
					// 'slide_home1A': { src:'2.7.1.vaaben_mixdown.mp3' },
					// 'slide_home1B': { src:'slide_home1_B.mp3' },
					'slide_3_0': { src:'3.0_mixdown.mp3' },
					'slide_4_3': { src:'4.3_mixdown.mp3' },
					'slide_4_5_1_AB': { src:'4.5.1.mine_mixdown.mp3' },
					'slide_4_5_1_AC': { src:'4.5.1hud_efter_vaaben_mixdown.mp3' },
					'slide_4_5_1_BA': { src:'4.5.1.vaaben_efter kul_mixdown.mp3' },
					'slide_4_5_1_BC': { src:'4.5.1hud_efter_mine_mixdown.mp3' },
					'slide_4_5_1_CA': { src:'4.5.1.vaaben_efter hud_mixdown.mp3' },
					'slide_4_5_1_CB': { src:'4.5.1.mine_mixdown.mp3' },
					'slide_4_7': { src:'4.7_mixdown.mp3' }				
				},
		'0.4': { // oppinion
				'AD': { label: 'alkoholiker', src:'0.4_forvalteren.mp3' },
				'AE': { label: 'alkoholiker, børn', src:'0.4_datter.mp3' },
				'AF': { label: 'alkoholiker', src:'0.4_forvalteren.mp3' },
				'BD': { label: 'dovenskab', src:'0.4_kone.mp3' },
				'BE': { label: 'dovenskab, børn', src:'0.4_datter.mp3' },
				'BF': { label: 'dovenskab', src:'0.4_andenindlagt.mp3' },
				'CD': { label: 'svækkelse', src:'0.4_kone.mp3' },
				'CE': { label: 'svækkelse, børn', src:'0.4_datter.mp3' },
				'CF': { label: 'svækkelse', src:'0.4_andenindlagt.mp3' }
			},
		'3.2.1': {
			'horsens': {
							'A': { src:'1.1.2_pashaven.mp3' },
							'B': { src:'1.1.2_goerrent.mp3' },
							'C': { src:'1.1.2_fletmaatter.mp3' }
						},
			'sundholm': {
							'A': { src:'1.1.2_hugbraende.mp3' },
							'B': { src:'1.1.2_pasgrise.mp3' },
							'C': { src:'1.1.2_skaerver.mp3' }						
						},
			'svendborg': {
							'A': { src:'1.1.2_skaerver.mp3' },
							'B': { src:'1.1.2_vaevmaatter.mp3' },
							'C': { src:'1.1.2_pilorm.mp3' }
						},
		},
		'3.3' : {
			'horsens': { src:'3.3.horsens.svendborg.mp3' },
			'sundholm': { src:'3.3.sundholm.mp3' },
			'svendborg': { src:'3.3.horsens.svendborg.mp3' }
		},
		'3.4.1': { label:'employee', src:'3.4.1.mp3' },
		'3.4.2': { label:'inmate', src:'3.4.2.mp3' },
		'3.7.1': { label:'work over', src:'3.7.1.mp3' },
		'4.6.1': { label:'dansk front', src:'4.6.1.mp3' },
		'4.10.1': { label:'bombe', src:'4.10.1.mp3' },
		'4.10.4': { label:'illness', src:'4.10.4.mp3' },
		'4.10.7': { label:'going home', src:'4.10.7.mp3' },
		'4.11.1': { label:'post script', src:'14_11_1efterskrift_red_musik.mp3' },
		'4.11.2': { label:'post script',src:'14_11_2efterskrift_red_musik.mp3' },
		'4.11.3': { label:'post script',src:'14_11_3efterskrift_red_musik.mp3' },
		'4.11.4': { label:'post script',src:'14_11_4efterskrift_red_musik.mp3' },
	}
}
