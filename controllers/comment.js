var eventproxy     = require('eventproxy');
var validator = require('validator');
var Topic = require('../proxy').Topic;
var User = require('../proxy').User;

/*
 * 新增一条评论
 */
exports.add = function(req, res, next) {
	var ep = new eventproxy();
	ep.fail(next);

	var content = validator.trim(req.body.content);
	content = validator.escape(content);
	var topic_id = validator.trim(req.body.topic_id);
	topic_id = validator.escape(topic_id);
	author_id = req.session.user._id;
	// 如果是评论的评论，就能用上
	comment_id = req.body.comment_id;

	ep.on('empty-message', function(errMessage) {
		res.status(422);
		data = {
			errCode: 422,
			message: errMessage
		}
	})
	if (content === '') {
		return eq.emit('empty-message', '评论内容不能为空')
	}


	
};

exports.update = function(req, res, next) {

};

exports.delete = function(req, res, next) {

};

exports.up = function(req, res, next) {
    
} 