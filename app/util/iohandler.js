var fs = require('fs');
module.exports.listFiles = function(directoryPath, callback, regexMatch) {
	regexMatch = typeof regexMatch !== 'undefined' ? regexMatch : /html$/;
	var result = new Array();
	fs.readdir(directoryPath, function(err, files) {
		if(err) throw err;
    	files = files.filter(function(file) { return file.match(regexMatch); });
		callback(files)
	});
}

module.exports.readFile = function(filepath, callback) {
	return fs.readFileSync(filepath, 'utf-8');
}

module.exports.foreachFileIn = function(directoryPath, applyFunction, callBack) {
	var results = new Array();
	module.exports.listFiles(directoryPath, function(files){
		for(var i in files){
			var contents = module.exports.readFile(directoryPath+"/"+files[i]);
			var result = applyFunction(contents);
			if(result){
				results.push(result);
			}
		}
		callBack(results);
	});
}