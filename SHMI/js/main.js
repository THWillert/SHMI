var Round = function(zahl,n){
		var f;
		f = Math.pow(10,n);
		return(Math.round(zahl * f) / f);
}
//==============================================================================
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//==============================================================================
/*
var smoothed = 0; // or some likely initial value
var smoothing = 10; // or whatever is desired
var lastUpdate = new Date;
function smoothedValue( newValue )
{ var now = new Date;
var elapsedTime = now - lastUpdate;
smoothed += elapsedTime * ( newValue - smoothed ) / smoothing; lastUpdate = now;
return smoothed; }
*/
//==============================================================================
