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

module.exports.foreachFileIn = function(directoryPath, applyFunction, callBack) {
	var results = new Array();
	var files = module.exports.listFiles(directoryPath);
    
	for(var i in files){
		var contents = module.exports.readFile(directoryPath+"/"+files[i]);
		var result = applyFunction(contents);
		if(result){
			results.push(result);
		}
	}
	return results;
}