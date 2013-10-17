var utils = require('../app/util/utils.js')
describe('jasmine-node', function(){
	it("Should Pass basic arithmic", function(){
		expect(utils.testAddMe(1,2)).toEqual(3);
		expect(utils.testMultiplyMe(3, 2)).toEqual(6)
	});
	
	it("Should recognize strings in an object", function(){
		var obj = { hello: "Recognize this plz", steps: [ "An array", "of things"]};
		expect(utils.objectContains(obj,"Recognize")).toEqual(true);
		expect(utils.objectContains(obj,"things")).toEqual(true);
		expect(utils.objectContains(obj,"hello")).toEqual(false);
	})
});