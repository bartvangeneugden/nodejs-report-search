var express = require('express');
var app = express();
var fs = require('fs');
var jsdom = require('jsdom');
var IOHandler = require('./app/util/iohandler.js');
var ScalaReader = require('./app/util/scalatest.js');
var child_process = require('child_process');
var async = require('async');
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

app.get('/scala.json', function(req, response){
	if (typeof(req.query.q) !== 'undefined' && req.query.q.match(/^[a-z0-9]+$/i)){
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
	}else{
		response.json({success: false, error: "Please specify an alphanumeric search query using the GET parameter 'q'"})
	}
});

app.get('/scalamr.json', function(req, response) {
	var result = [];
	var Worker = function() {
	  var worker = child_process.fork(__dirname + '/app/util/iohandlerchild.js');
	  return worker;
	}
	if (typeof(req.query.q) !== 'undefined' && req.query.q.match(/^[a-z0-9]+$/i)){
		async.waterfall([		
			function(callback) {
				var workerLimit = require('os').cpus().length;
				var workers = [];
				var files = fs.readdirSync("./spec/testresources");
				var numOfWorkers = files.length>workerLimit?workerLimit:files.length;
				var exit = function() {
			      numOfWorkers--;
			      if (numOfWorkers == 0) {
			        callback(null, result);
			      }
			    };
				
				for (var i = 0; i < workerLimit; i++) {
				  var worker = new Worker();
				  var filesToSend = new Array();
				  worker.on('exit', exit);
				  worker.on('message', function(msg) {
				   	result.push(msg);
				  });
				  for(var j=0;j<parseInt(files.length/workerLimit)+1;j++) {
				  	if(parseInt(i*files.length/workerLimit) + j < files.length) {
						filesToSend.push("./spec/testresources/" + files[parseInt(i*files.length/workerLimit) + j]);
					} else {
						break;
					}
				  }
				  worker.send(new Array(filesToSend, req.query.q));
				  workers.push(worker);
				}
			}
			
			/*
			function(arryList, callback) {
			    async.reduce(arryList, {}, function(memo, item, cback) {
			    cback(null, memo + item);
			    }, callback)
			  }
			  */
		], function(err, result) {
			  //console.log("Result: " + JSON.stringify(result));
			  response.json(result);
		});
	}
});

app.listen(3000);
console.log('Listening on port 3000');