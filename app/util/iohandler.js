var fs = require('fs');
module.exports.listFiles = function(directoryPath, regexMatch) {
	regexMatch = typeof regexMatch !== 'undefined' ? regexMatch : /html$/;
	var result = new Array();
	var files = fs.readdirSync(directoryPath);
    return files.filter(function(file) { return file.match(regexMatch); });
}

module.exports.readFile = function(filepath, callback) {
	return fs.readFileSync(filepath, 'utf-8');
}
module.exports.getFilesInDirectoryClosure = function(directory) {
    var result = [];
    var files = module.exports.listFiles(directory);
    files.forEach(function(item){
        result.push(function(){ return fs.readFileSync(directory+item, 'utf-8'); });
    });
    return result;
}