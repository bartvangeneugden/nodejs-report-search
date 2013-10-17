var express = require('express');
var app = express();
var jsdom = require('jsdom');
var fs = require('fs');

function findContent(search) {
	var result = new Array();
	fs.readdir('/Users/tonchen/Desktop/express/', function(err, files) {
    	files.filter(function(file) { return file.substr(-5) == '.html'; })
         .forEach(function(file) { 
			 fs.readFile('/Users/tonchen/Desktop/express/' + file, 'utf-8', function(err, contents) { result.push(inspectFile(contents, err, search)); }); 
		 });
	 });
	 console.info("aaaaa" + result);
	return result;
}

function inspectFile(contents, err, search) {
	if (contents.indexOf(search) != -1) {
		console.info("found");
		return "fo";
	}
}

app.listen(3000);
console.log('Listening on port 3000');