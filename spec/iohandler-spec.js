var IOHandler = require('../app/util/iohandler.js');
var ScalaReader = require('../app/util/scalatest.js');

describe('jasmine-node', function(){
	it("Should list only HTML files by default", function(){
		IOHandler.listFiles("./spec/testresources/", function(files){
			expect(files.length).toEqual(3);
			expect(files[0]).toMatch(/html$/);
			expect(files[1]).toMatch(/html$/);
			expect(files[2]).toMatch(/html$/);
		});
	});
	
	it("Should read the contents of a file", function(){
		var contents = IOHandler.readFile("./spec/testresources/someResource.dummyFile");
		expect(contents).toEqual("HELLO_WORLD");
	});
	
	it("Should return the results of a function applied to all files in a folder", function() {
		IOHandler.foreachFileIn(
			"./spec/testresources", 
			function(contents){
				var scenario = ScalaReader.getScenario(contents);
				if(ScalaReader.scenarioContainsKeyword(scenario, "payment")){
					return scenario;
				}else{
					return false;
				}
			},
			function(results){
				console.log(results);
			}
		);
	});
	
});