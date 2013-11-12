var IOHandler = require('../app/util/iohandler.js');
var ScalaReader = require('../app/util/scalatest.js');

describe('jasmine-node', function(){
	it("Should list only HTML files by default", function(){
		var files = IOHandler.listFiles("./spec/testresources/");
		expect(files.length).toEqual(2837);
		expect(files[0]).toMatch(/html$/);
		expect(files[1]).toMatch(/html$/);
		expect(files[2]).toMatch(/html$/);
	});
	
	it("Should read the contents of a file", function(){
		var contents = IOHandler.readFile("./spec/testresources/someResource.dummyFile");
		expect(contents).toEqual("HELLO_WORLD");
	});
	
	it("Should return the results of a function applied to all files in a folder", function() {
		var results = IOHandler.foreachFileIn(
			"./spec/testresources", 
			function(contents){
				var scenario = ScalaReader.getScenario(contents);
				if(ScalaReader.scenarioContainsKeyword(scenario, "payment")){
					return scenario;
				}else{
					return false;
				}
			}
		);
	});
	
});