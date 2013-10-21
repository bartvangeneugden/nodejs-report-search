var fs = require('fs');
var cheerio = require('cheerio');
var utils = require('./utils');
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
module.exports.containsKeyword = function(htmlHaystack, needle) {
	return utils.objectContains(module.exports.getScenario(htmlHaystack), needle);
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