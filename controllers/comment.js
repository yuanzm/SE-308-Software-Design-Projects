var eventproxy     = require('eventproxy');
var validator = require('validator');
var Topic = require('../proxy').Topic;
var User = require('../proxy').User;
var Comment = require('../proxy').Comment;

/*
 * 新增一条评论
 * 	- 保存该评论到数据库
 *	- 话题的评论数加1
 *	- 话题作者的评论数加1，分数加1
 */
exports.add = function(req, res, next) {
	var ep = new eventproxy();
	ep.fail(next);

	var content = validator.trim(req.body.content);
	content = validator.escape(content);
	var topic_id = req.params.tid;
	author_id = req.session.user._id;
	// 如果是评论的评论，就能用上
	comment_id = req.body.comment_id;

	ep.on('empty-message', function(errMessage) {
		res.status(422);
		data = {
			errCode: 422,
			message: errMessage
		}
		res.json(data);
	})
	if (!content.length) {
		return ep.emit('empty-message', '评论内容不能为空')
	}
	// 数据库中新增一条评论
	Comment.newAndSave(content, topic_id, author_id, comment_id, function(err, comment) {
		if (err) {
			return next();
		}

		Comment.getCommentById(comment._id, function(err, comment) {
			console.log(comment)
		})

		var proxy = new eventproxy();
		proxy.all('update-topic', 'update-user', function(topic) {
			res.status(200);
			data = {
				errCode: 200,
				message: '评论成功',
			}
			res.json(data);
		})
		Topic.getTopicById(topic_id, function(err, topic, author) {
			topic.comment_count += 1;
			topic.save(function(err, topic) {
				if (err) {
					return next()
				}
				proxy.emit('update-topic', topic);
			})

			author.score += 1;
			author.comment_count += 1;
			author.save(function(err) {
				if (err) {
					return next();
				}
				proxy.emit('update-user');
			})
		});
	});	
};

exports.update = function(req, res, next) {

};

/*
 * 删除一条评论
 * - 必须是作者或者才能删除
 */ 
exports.delete = function(req, res, next) {
	var cid = req.params.cid;
	var author_id = req.session.user._id;

	
};

exports.up = function(req, res, next) {
    
} 