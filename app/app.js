var express = require('express');
var app = express();
var jsdom = require('jsdom');
var IOHandler = require('./util/iohandler.js');
app.use("/js", express.static(__dirname+'/js'))
var ScalaReader = require('./util/scalatest.js');
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
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

app.get('/', function(req, res){
    res.render('index')
});


app.listen(3000);
console.log('Listening on port 3000');