var SoundService = function(){
	'use strict';
}

// SoundService.getPathByKey = function(key){
// 	'use strict';
// 	return SoundService.properties.basePath + this.matrix[key].file;
// };
// SoundService.getDurationByKey = function(key){
// 	'use strict';
// 	return this.matrix[key].duration;
// };

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
		typewriter: { src:SoundService.properties.basePath+'typewriter.mp3', duration: null },
		woodchopper: { src:SoundService.properties.basePath+'1.2.1_hugbraende_lydeffekt.mp3', duration: null }
	},
	'1.1.1' :{
		horsens: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3', duration: 57.862 },
		sundholm: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3', duration: 57.862 },
		svendborg: { src:SoundService.properties.basePath+'1.1.1_forvalter_test.mp3', duration: 57.862 }
	},
	points: {
		plus: { src:SoundService.properties.basePath+'Point_plus.mp3', duration: 2.208 },
		minus: { src:SoundService.properties.basePath+'Point_minus.mp3', duration: 1.128 }
	},
	dormitry: { src:SoundService.properties.basePath+'2.6.1_sovesal.mp3', duration: 83.458 },
	drunk: { src:SoundService.properties.basePath+'1.5.1_druk.mp3', duration: 70 },
	constable: { src:SoundService.properties.basePath+'1.6.1_betjent.mp3', duration: 5.737 },
	'2.10.1': { description:'what now', src:SoundService.properties.basePath+'2.10.1_kontraktudlob.mp3', duration: 53.501 },
	'2.11.1': { description:'home comming', src:SoundService.properties.basePath+'2.11.1_hjemkomst.mp3', duration: 46.536 },
	jobinterview: {
		'svendborg': { 
			'part1': { src:SoundService.properties.basePath+'2.2.1_hvervekontor.mp3', duration: 36.161 },
			'part2': { src:SoundService.properties.basePath+'2.2.3_hvervekontor.mp3', duration: 28.299 }
		}
	},
	prerecruitment: {
		'svendborg': { src:SoundService.properties.basePath+'prerecruitment_svendborg.mp3', duration: 1.078 }
	},
	advice: {
		'svendborg': {
			'employee': { src:SoundService.properties.basePath+'1.3.4_RaadIndlagt.mp3', duration: 41.987 }, 	// Employee
			'inmate': { src:SoundService.properties.basePath+'1.3.4_RaadAnsat.mp3', duration: 40.857 }		// Fellow inmate
		},
	},
	work: {
		'svendborg': {
			'A': { src:SoundService.properties.basePath+'1.1.2a_slaa_skaerver.mp3', duration: 12.408 },
			'B': { src:SoundService.properties.basePath+'work_svendborg_B.mp3', duration: 1.078 },
			'C': { src:SoundService.properties.basePath+'work_svendborg_C.mp3', duration: 1.815 }
		},
	},
	slides: {
				'slide_intro': { src:SoundService.properties.basePath+'slide_intro.mp3', duration: 89.014 },
				'slide_1_0_1_svendborg': { src:SoundService.properties.basePath+'1_0_1_ankomst.mp3', duration: 67.341 },
				'slide_2_5': { src:SoundService.properties.basePath+'slide_2_5.mp3', duration: 35.083 },
				'slide_2_7_1_amory': { src:SoundService.properties.basePath+'slide_2_7_1_amory.mp3', duration: 29.541 },
				'slide_2_7_1_butcher': { src:SoundService.properties.basePath+'slide_2_7_1_butcher.mp3', duration: 61.208 },
				'slide_2_7_1_mine': { src:SoundService.properties.basePath+'slide_2_7_1_mine.mp3', duration: 48.573 },
				'slide_home1A': { src:SoundService.properties.basePath+'slide_home1_A.mp3', duration: 48.573 },
				'slide_home1B': { src:SoundService.properties.basePath+'slide_home1_B.mp3', duration: 48.573 }
				// 'slide_svendborg': { src:SoundService.properties.basePath+'daughter.mp3', duration: 2.368 }
			},
	oppinion: { // 0.4
			'AD': { label: 'alkoholiker', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'AE': { label: 'alkoholiker, børn', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
			'AF': { label: 'alkoholiker', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'BD': { label: 'dovenskab', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'BE': { label: 'dovenskab, børn', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
			'BF': { label: 'dovenskab', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
			'CD': { label: 'svækkelse', src:SoundService.properties.basePath+'0.4_forvalter.mp3', duration: 57.862 },
			'CE': { label: 'svækkelse, børn', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
			'CF': { label: 'svækkelse', src:SoundService.properties.basePath+'0.4_forvalter.mp3', duration: 57.862 }
		}
	// challenge: {
	// 			// 'A': { label: 'manager', src:SoundService.properties.basePath+'alcoholic.mp3', duration: 8.314 },
	// 			// 'B': { label: 'manager', src:SoundService.properties.basePath+'lazy.mp3', duration: 1.078 },
	// 			// 'C': { label: 'manager', src:SoundService.properties.basePath+'weakness.mp3', duration: 1.815 }
	// 			'A': { label: 'manager', src:SoundService.properties.basePath+'0.4_forvalter.mp3', duration: 57.862 },
	// 			'B': { label: 'manager', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 },
	// 			'C': { label: 'manager', src:SoundService.properties.basePath+'0.4_bekendt_anden indlagt.mp3', duration: 52.610 }
	// 		},
	// family: {
	// 			'D': null,
	// 			'E': { label: 'daughter', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
	// 			'F': null
	// 		}
	// characters: {
	// 			'AD': [ { label: 'manager', src:'alcoholic.mp3', duration: 89.014 } ],
	// 			'AE': [ { label: 'manager', src:'alcoholic.mp3', duration: 89.014 }, { label: 'daughter', duration: 89.014 }],
	// 			'AF': [ { label: 'manager', src:'alcoholic.mp3', duration: 89.014 } ],
	// 			'BD': [ { label: 'manager', src:'lazy.mp3', duration: 89.014 } ],
	// 			'BE': [ { label: 'manager', src:'lazy.mp3', duration: 89.014 }, { label: 'daughter', duration: 89.014 }],
	// 			'BF': [ { label: 'manager', src:'lazy.mp3', duration: 89.014 } ],
	// 			'CD': [ { label: 'manager', src:'weakness.mp3', duration: 89.014 } ],
	// 			'CE': [ { label: 'manager', src:'weakness.mp3', duration: 89.014 }, { label: 'daughter', duration: 89.014 }],
	// 			'CF': [ { label: 'manager', src:'weakness.mp3', duration: 89.014 } ]
	// 		}
};