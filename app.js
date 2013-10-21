var express = require('express');
var app = express();
var jsdom = require('jsdom');
var IOHandler = require('../app/util/iohandler.js');
var ScalaReader = require('../app/util/scalatest.js');

app.get('/scala.json', function(req, response){
	IOHandler.foreachFileIn("./spec/testresources", function(contents){
		return ScalaReader.containsKeyword(contents, req.query.q)
	}, function(results){
		//TODO: Actually get results here
	}));
	req.query.q
});

app.listen(3000);
console.log('Listening on port 3000');