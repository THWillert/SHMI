var Round = function(zahl,n){
		var f;
		f = Math.pow(10,n);
		return(Math.round(zahl * f) / f);
}
