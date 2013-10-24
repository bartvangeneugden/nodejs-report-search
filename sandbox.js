var express = require('express');
var app = express();
var jsdom = require('jsdom');
var Parallel = require('paralleljs');
var fs = require('fs');
var child_process = require('child_process');
var async = require('async');

require('nodetime').profile({
    accountKey: 'e042e1d0246f5073c4325f1b9897582838165a18', 
    appName: 'Node.js Application'
  });

function findContent(search) {
	var result = new Array();
	fs.readdir('/Users/tonchen/Desktop/express/', function(err, files) {
    	files.filter(function(file) { return file.substr(-5) == '.html'; })
         .forEach(function(file) { 
			 fs.readFile('/Users/tonchen/Desktop/express/' + file, 'utf-8', function(err, contents) { result.push(inspectFile(contents, err, search)); }); 
		 });
	 });
	return result;
}

function inspectFile(contents, err, search) {
	if (contents.indexOf(search) != -1) {
		//console.info("found");
		return "fo";
	}
}

function readDir(dirPath) {
	return fs.readdirSync(dirPath);
}

function readFile(file) {
	console.info("file to process " + file);
	return fs.readFileSync("/Users/tonchen/Downloads/logs/Archive/" + file);
}

var spawn = function (data) {
    data = data.split('').reverse().join('');
    return data;
}

var slowSquare = function (n) { 
    var i = 0; 
    while (++i < n * n) {}
    return i; 
}

function fib(n) {
  return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
}

function factorial(n) { 
	return n < 2 ? 1 : n * factorial(n - 1); 
}

function outoputResult(result) {
	//console.log(result);
}

function adder(d) { return d[0] + d[1]; }

var Worker = function() {
  var worker = child_process.fork(__dirname + '/sandboxchild.js');
  return worker;
}

app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  
  //spawn 1
  var p = new Parallel('forwards');
  p.spawn(spawn).then(outoputResult);
  
  //spawn 2
  p = new Parallel(10000);
  p.spawn(slowSquare).then(outoputResult);
 
  //mapper
  p = new Parallel([1, 2, 3, 4, 5]);  
  p.map(fib).then(outoputResult);
  
  //reducer
  p = new Parallel([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  p.require(factorial)
  p.map(function (n) { return Math.pow(10, n) / factorial(n); }).reduce(adder).then(outoputResult);
  
  //mapper for file reading
  var files = readDir("/Users/tonchen/Downloads/logs/Archive/");
  //console.log("files to process: " + files);
  p = new Parallel(files);
  p.require(fs.readFileSync);
  //this doesn't work as web worker has access only to the following
  //
  //XMLHttpRequest
	//Application Cache
	//create other web workers
	//navigator object
	//location object
	//setTimeout method
	//clearTimeout method
	//setInterval method
	//clearInterval method
	//importScripts method
	//JSON
	//Worker
  //p.map(readFile).then(outoputResult);
  
    var result = [];

	async.waterfall([		
		function(callback) {
			var workers = [];
			var files = readDir("/Users/tonchen/Downloads/logs/Archive/");
			var numOfWorkers = files.length;
			var exit = function() {
		      numOfWorkers--;
		      if (numOfWorkers == 0) {
		        callback(null, result);
		      }
		    };
			
			files.forEach(function(file) {
				var worker = new Worker();
				worker.on('exit', exit);
			  	worker.on('message', function(msg) {
			   		result.push(msg);
			  	});
			  	worker.send(new Array(file, "error"));
		    	workers.push(worker);
			});
		},
		
		function(arryList, callback) {
		    async.reduce(arryList, {}, function(memo, arry, cback) {
		    cback(null, memo + arry);
		    }, callback)
		  },
	], function(err, result) {
		  console.log("Result: " + result);
	})
	
	async.waterfall([
	    function(callback){
	        callback(null, 'one', 'two');
	    },
	    function(arg1, arg2, callback){
	        callback(null, 'three');
	    },
	    function(arg1, callback){
	        // arg1 now equals 'three'
	        callback(null, 'done');
	    }
	], function (err, result) {
	   // result now equals 'done'    
	});
  
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  body += findContent("ignoredResultNode");
  res.end(body);
});
app.listen(3000);
console.log('Listening on port 3000');