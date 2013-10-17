var utils = require('../app/util/utils.js')
describe('jasmine-node', function(){
	it("Should Pass basic arithmic", function(){
		console.log(utils);
		expect(utils.testAddMe(1,2)).toEqual(3);
	})
});