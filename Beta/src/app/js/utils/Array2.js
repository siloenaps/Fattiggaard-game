// Array
// Shuffle array and indicate correct index
Array.prototype.shuffle = function(index){
	var correctAnswer = this[index];
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x)
    
    // Find correct answer's index in array
    for(var a=0; a<this.length; a++){
    	if(correctAnswer == this[a]){
    		this.correct = a;
    		break;
    	}	    
    }
    return this;
}