var Flow = {
	statsSplit: function(vo) {
		if(vo.type == 'bool'){
			if(vo.value !== vo.threshold){
				this.trigger = vo.triggers[0];
			}else{
				this.trigger = vo.triggers[1];
			}
		}else{
			if(vo.value < vo.threshold){
				this.trigger = vo.triggers[0];
			}else{
				this.trigger = vo.triggers[1];
			}
		}
		
		vo.callback();
		//this.flow.next(this.trigger);
	}
}