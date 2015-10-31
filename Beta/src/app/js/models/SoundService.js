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
	points: {
		plus: { src:SoundService.properties.basePath+'Point_plus.mp3', duration: 2.208 },
		minus: { src:SoundService.properties.basePath+'Point_minus.mp3', duration: 1.128 }
	},
	dormitry: { src:SoundService.properties.basePath+'2.6.1_sovesal.mp3', duration: 83.458 },
	drunk: { src:SoundService.properties.basePath+'drunk.mp3', duration: 1.078 },
	constable: { src:SoundService.properties.basePath+'constable.mp3', duration: 1.815 },
	whatnow: {
		'A': { src:SoundService.properties.basePath+'whatnow_A.mp3', duration: 8.314 },
		'B': { src:SoundService.properties.basePath+'whatnow_B.mp3', duration: 1.078 },
		'C': { src:SoundService.properties.basePath+'whatnow_C.mp3', duration: 1.815 }
	},
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
			'A': { src:SoundService.properties.basePath+'1.3.4_RaadIndlagt.mp3', duration: 41.987 },
			'B': { src:SoundService.properties.basePath+'1.3.4_RaadAnsat.mp3', duration: 40.857 }
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
				'slide_svendborg': { src:SoundService.properties.basePath+'Fattiggaarden_Svendborg.mp3', duration: 48.573 },
				'slide_2_5': { src:SoundService.properties.basePath+'slide_2_5.mp3', duration: 35.083 },
				'slide_2_7_1_amory': { src:SoundService.properties.basePath+'slide_2_7_1_amory.mp3', duration: 29.541 },
				'slide_2_7_1_butcher': { src:SoundService.properties.basePath+'slide_2_7_1_butcher.mp3', duration: 61.208 },
				'slide_2_7_1_mine': { src:SoundService.properties.basePath+'slide_2_7_1_mine.mp3', duration: 48.573 },
				'slide_home1A': { src:SoundService.properties.basePath+'slide_home1_A.mp3', duration: 48.573 },
				'slide_home1B': { src:SoundService.properties.basePath+'slide_home1_B.mp3', duration: 48.573 }
				// 'slide_svendborg': { src:SoundService.properties.basePath+'daughter.mp3', duration: 2.368 }
			},
	challenge: {
				'A': { label: 'manager', src:SoundService.properties.basePath+'alcoholic.mp3', duration: 8.314 },
				'B': { label: 'manager', src:SoundService.properties.basePath+'lazy.mp3', duration: 1.078 },
				'C': { label: 'manager', src:SoundService.properties.basePath+'weakness.mp3', duration: 1.815 }
			},
	family: {
				'D': null,
				'E': { label: 'daughter', src:SoundService.properties.basePath+'0.4_datter.mp3', duration: 39.277 },
				'F': null
			}
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