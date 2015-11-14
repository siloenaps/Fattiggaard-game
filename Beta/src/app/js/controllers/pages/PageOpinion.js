var PageOpinion = function(view){
	'use strict';
	this.view = view;
	this.listeners = {};
	this.activePlayer = null;

	this.playersCount = 0;
	this.completed = 0;

	var key = PlayerStats.challenge + PlayerStats.family;

	// Get sound
	this.soundChallengeObject = SoundService.matrix.oppinion[key];

	// Set Text
	this.view.charactertext.gotoAndStop(key);
	this.view.playerlabel.gotoAndStop(key);


	// Player - Challenge
	// view.player.visible = false;
	if(this.soundChallengeObject != null){
		// view.player.visible = true;
		this.challengePlayerComponent = new PlayerSoundComponent(view.player);
		this.challengePlayerComponent.preload(this.soundChallengeObject.src, this.soundChallengeObject.duration);
		this.playersCount++;

		this.listeners.challengeStart = this.challengePlayerComponent.on("start", this.onSoundStart, this);

		this.listeners.challenge = this.challengePlayerComponent.on('complete', this.onComplete, this);
	}

	// Continue/Skip button
	this.continueBtn = ContinueButton;
	this.continueBtn.activate("skip");
	this.listeners.continue = this.continueBtn.on('click', this.onContinue, this);
};
PageOpinion.prototype.onSoundStart = function(event) {
	// If there is a player active, pause it
	if(this.activePlayer != null){
		if(event.target.id != this.activePlayer.id){
			this.activePlayer.pause();
		}
	}

	// Save activated player
	this.activePlayer = event.target;
};
PageOpinion.prototype.onComplete = function(event){
	this.completed++;
	if(this.completed >= this.playersCount){
		if(this.challengePlayerComponent !== undefined){
			this.challengePlayerComponent.off('complete', this.listeners.challenge);
		}
		if(this.familyPlayerComponent !== undefined){
			this.familyPlayerComponent.off('complete', this.listeners.family);
		}

		this.continueBtn.activate("next");
	}
};
PageOpinion.prototype.start = function() {
	var frm = PlayerStats.challenge + PlayerStats.family;
	this.view.portrait.gotoAndStop(frm);
};
PageOpinion.prototype.onContinue = function(event) {
	this.continueBtn.off('click', this.listeners.continue);

	// Stop sound if it still on
	if(this.challengePlayerComponent !== undefined){
		this.challengePlayerComponent.stop();
	}

	if(this.familyPlayerComponent !== undefined){
		this.familyPlayerComponent.stop();
	}

	this.dispatchEvent(new createjs.Event('continue'));
};
PageOpinion.prototype.destroy = function() {
	this.view = null;	

	if(this.challengePlayer != null){
		this.challengePlayer.destroy();
		this.challengePlayer = null;
	}
	if(this.familyPlayerComponent != null){
		this.familyPlayerComponent.destroy();
		this.familyPlayerComponent = null;
	}

	this.activePlayer = null;
};
createjs.EventDispatcher.initialize(PageOpinion.prototype);