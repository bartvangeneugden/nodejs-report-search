var utils = require('../app/util/utils.js')
describe('jasmine-node', function(){
	it("Should Pass basic arithmic", function(){
		expect(utils.testAddMe(1,2)).toEqual(3);
		expect(utils.testMultiplyMe(3, 2)).toEqual(6)
	})
});