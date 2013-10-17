//These are for jasmine-node sanity testing in test-spec.js
module.exports.testAddMe = function(one, two){ return one + two; }
module.exports.testMultiplyMe = function(one, two){ return one * two; }

module.exports.containsString = function(haystack, needle) {
	//Change to regex?
	return haystack.toLowerCase().indexOf(needle.toLowerCase()) != -1;
}

function objectContains(object, needle) {
	for(var propt in object) {
		if (object.hasOwnProperty(propt)) {
			if(type(object[propt]) == 'array' || type(object[propt]) == 'object'){
				return objectContains(object[propt], needle);
			}else if(module.exports.containsString(object[propt], needle)){
				return true;
			}
		}
	}
	return false;
}
//Borrowed from the excellent YUI3 as referenced here http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390555#7390555
var TYPES = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
},
TOSTRING = Object.prototype.toString;

function type(o) {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};

module.exports.objectContains = objectContains;