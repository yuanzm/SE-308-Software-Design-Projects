var app = require('../app');
var request = require('supertest')(app);
var config = require('../config');
var should = require("should");
var pedding = require('pedding');
var support = require('./support/support');

describe('test/controllers/topic.test', function() {
	var testUser;
	var title = '我真棒';
	var content = '这简直是犀利';

	// 产生用于表示用户登录的的debug cookie
	before(function(done) {
		done = pedding(done, 2);
		support.ready(done);
		support.createUser(function(err, user) {
			testUser = user;
			done(err)
		});
	});

	describe('create', function() {
		before(function() {
			console.log(support.normalUserCookie)
		})
		it('should create a topic successful', function(done) {
			request.post('/topic/create')
			.set('Cookie', support.normalUserCookie)
			.send({
				title: title,
				content: content
			})
			.expect(200, function(err, res) {
				// res.status.should.equal(200);
				// res.text.should.containEql('成功');
				should.not.exist(err);
				done();
			})
		})
	})
})
