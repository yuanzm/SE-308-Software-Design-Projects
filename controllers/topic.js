// 引入所需模块
var eventproxy     = require('eventproxy');
var validator = require('validator');
var Topic = require('../proxy').Topic;
var User = require('../proxy').User;

exports.showCreate = function(req, res) {

};

exports.create = function(req, res, next) {
	var ep = new eventproxy();
	ep.fail(next);

	var title = validator.trim(req.body.title);
	title = validator.escape(title);
	var content = validator.trim(validator);
	content = validator.escape(content);
	var author_id = req.session.user._id;

	ep.on('create-err', function(errMessage) {
		res.status(422);
		data = {
			errCode: 422,
			message: errMessage
		}
		res.json(data);
	});

	if([title, content].some(function(item) {return item === ''})) {
		return ep.eimt('create-err', '标题或内容不能为空');
	}
	res.status(200);
	data = {
		errCode: 200,
		message: '发表成功'
	}
	// req.session.user = user;
	res.json(data);

	// Topic.newAndSave(title, content, author_id, function(err, topic) {
		// if (err) {
			// return next(err);
		// }
		// User.getUserById(author_id, function(err, user) {
		// 	if (err) {
		// 		return next(err);
		// 	}
		// 	if(user) {
		// 		console.log('00000000000000000000000000000')
		// 	}
		// 	user.topic_count += 1;
		// 	user.score += 5;
		// 	user.save(function(err) {
		// 		if (err) {
		// 			return next(err);
		// 		}
		// 		res.status(200);
		// 		data = {
		// 			errCode: 200,
		// 			message: '发表成功'
		// 		}
		// 		req.session.user = user;
		// 		res.json(data);
		// 	})
		// });
	// })

};

exports.index = function(req, res, next) {

};

exports.showEdit = function(req, res, next) {

};

exports.delete = function(req, res, next) {

};
