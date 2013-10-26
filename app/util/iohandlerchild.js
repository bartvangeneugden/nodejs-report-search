var fs = require('fs');
var cheerio = require('cheerio');
var utils = require('/Users/tonchen/dev/git/nodejs-report-search/app/util/utils.js');
var ScalaReader = require('/Users/tonchen/dev/git/nodejs-report-search/app/util/scalatest.js');

//msg[0] : filename
//msg[1] : keyword to search
//msg[2] : transformer
//msg[3]: searcher
process.on('message', function(msg) {
  var valuesToReturn = [];
  msg[0].forEach(function(file) {
	  var transformedContent = ScalaReader.getScenario(fs.readFileSync(file, 'utf-8'));
	  if(ScalaReader.scenarioContainsKeyword(transformedContent, msg[1])) {
	  	valuesToReturn.push(transformedContent);
	  }
  });
  process.send(valuesToReturn);
  process.exit(0);
})