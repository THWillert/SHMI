/*
	Modified: 2020-03-18

	Copyright (c) 2020 Thorsten Willert

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
	Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
	PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// =============================================================================
// Local storage key: File name without suffix + ID of the element
const sStorage_Key = 'SHMI__' +
location.pathname.substring(
	location.pathname.lastIndexOf('/') + 1
	).replace(/\..+$/, '');

// =============================================================================
var Round = function(num,n = 2) {
		var f;
		f = Math.pow(10,n);
		return(Math.round(num * f) / f);
}

// =============================================================================
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
