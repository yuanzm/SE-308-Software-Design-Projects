var User = require('../proxy/user');
var should = require('should');

describe('test/proxy/user.test.js', function() {
	describe('newAndSave', function() {
		it('should not exist err', function(done) {
			User.newAndSave('yuanzm', '100413', '1229084233@qq.com', function(err) {
				should.not.exist(err);
				done()
			})
		});
	});

	describe('add', function() {
		it('should return 3', function() {
			(1 + 2).should.equal(3);			
			// User.add(1, 2).should.equal(3);
		})
	})
});
