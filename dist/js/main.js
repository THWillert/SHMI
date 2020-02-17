var Round = function(num,n = 2) {
		var f;
		f = Math.pow(10,n);
		return(Math.round(num * f) / f);
}

function empty(data) {
	if(typeof(data) == 'number' || typeof(data) == 'boolean') return false;

	if(typeof(data) == 'undefined' || data === null) return true;

	if(typeof(data.length) != 'undefined') return data.length == 0;

	var count = 0;
	for(var i in data) {
		if(data.hasOwnProperty(i)) count ++;
	}
	return count == 0;
}
