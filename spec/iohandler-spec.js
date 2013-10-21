var IOHandler = require('../app/util/iohandler.js')
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
		IOHandler.readFile("./spec/testresources/someResource.dummyFile", function(contents){
			expect(contents).toEqual("HELLO_WORLD");
		})
	})
});