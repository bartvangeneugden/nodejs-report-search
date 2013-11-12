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
	
});