var fs = require('fs');
module.exports.listFiles = function(directoryPath, callback, regexMatch) {
	regexMatch = typeof regexMatch !== 'undefined' ? regexMatch : /html$/;
	var result = new Array();
	var files = fs.readdirSync(directoryPath);
    return files.filter(function(file) { return file.match(regexMatch); });
}

module.exports.readFile = function(filepath, callback) {
	return fs.readFileSync(filepath, 'utf-8');
}
