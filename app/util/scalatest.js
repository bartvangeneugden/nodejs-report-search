var fs = require('fs');
var cheerio = require('cheerio');

module.exports.fileContains = function(filename, needle) {
	var contains = false;	
	fs.readFile(filename, 'utf-8', function(err, contents){
		if(err) throw err;
		contains = utils.containsString(contents)
	});
}
module.exports.getScenario = function(htmlHaystack) {
	var scenarios = [];
	$=cheerio.load(htmlHaystack);
	$(".specification").each(function(){
		var scenario = {
			scope: trim($(this).find('.scope').text()),
			given: trim($(this).find('.test_passed').text()),
			steps: []
		};
		$(this).find('.info dl dt').each(function(){
			scenario.steps.push(trim($(this).text()));
		});
		scenarios.push(scenario);
	});
	return scenarios;
}

function trim (str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}