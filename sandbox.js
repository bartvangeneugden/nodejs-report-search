var express = require('express');
var app = express();
var jsdom = require('jsdom');
var Parallel = require('paralleljs');

var fs = require('fs');

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
		console.info("found");
		return "fo";
	}
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
	console.log(result);
}

function adder(d) { return d[0] + d[1]; }

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
  
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  body += findContent("ignoredResultNode");
  res.end(body);
});
app.listen(3000);
console.log('Listening on port 3000');