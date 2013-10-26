var fs = require('fs');
var cheerio = require('cheerio');
var utils = require('/Users/tonchen/dev/git/nodejs-report-search/app/util/utils.js');
var ScalaReader = require('/Users/tonchen/dev/git/nodejs-report-search/app/util/scalatest.js');

//msg[0] : filename
//msg[1] : keyword to search
//msg[2] : transformer
//msg[3]: searcher
process.on('message', function(msg) {
  console.info(process.pid + " : " + msg[0] + " : " + msg[1]);
  var transformedContent = ScalaReader.getScenario(fs.readFileSync(msg[0], 'utf-8'));
  if(ScalaReader.scenarioContainsKeyword(transformedContent, msg[1])) {
  	process.send(transformedContent);
  }
  process.exit(0);
})