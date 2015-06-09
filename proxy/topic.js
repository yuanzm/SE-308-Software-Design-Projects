var models = require('../models');
var Topic = models.Topic;
var eventproxy = require('eventproxy');
var UserProxy = require('./user.js');
/*
 *  根据话题的id查询一条话题，需要返回话题的
 * @pram {ObjectId} id: 话题的id
 * -author: 该话题的作者
 * -topic: 该话题本身
 * -lastReplay: 最后一条评论
 */
exports.getTopicById = function(id, callback) {
	var ep = new eventproxy();
	ep.fail(callback);

	ep.on('author', 'topic', 'last-comment', function(author, topic, lastComment) {
		if (!topic) {
			callback(null, null, null, null);
		} else {
			callback(null, topic, author, lastComment);
		}
	})

	Topic.findOne({"_id": id}, function(err, topic) {
		//  如果没有找到该话题，所有返回信息都为空
		if (!topic) {
			ep.emit('author', null);
			ep.emit('topic', null);
			ep.emit('last-replay', null);
		}
		ep.emit('topic', topic);

		UserProxy.getUserById({'_id': topic.author_id}, eq.done('author'));

		
	});
};

exports.newAndSave = function(title, content, author_id, callback) {
	var topic = new Topic();

	topic.title = title;
	topic.content = content;
	topic.author_id = author_id;

	topic.save(callback);
};

