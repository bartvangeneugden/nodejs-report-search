var express = require('express');
var app = express();
var jsdom = require('jsdom');
var IOHandler = require('./app/util/iohandler.js');
var ScalaReader = require('./app/util/scalatest.js');

app.get('/scala.json', function(req, response){
	IOHandler.foreachFileIn(
		"./spec/testresources", 
		function(contents){
			var scenario = ScalaReader.getScenario(contents);
			if(ScalaReader.scenarioContainsKeyword(scenario, req.query.q)){
				return scenario;
			}else{
				return false;
			}
		},
		function(results){
			response.json(results);
		}
	);
});

app.listen(3000);
console.log('Listening on port 3000');