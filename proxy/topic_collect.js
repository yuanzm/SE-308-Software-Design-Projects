var models = require('../models');
var TopicCollect = models.TopicCollect;
var UserProxy = require('./user.js');
var TopicProxy = require('./topic.js');
var eventproxy = require('eventproxy');

/*
 * 新建一条收藏
 * @param {ObjectId} user_id: 收藏者的id
 * @param {ObjectId} topic_id: 话题的id
 */
exports.newAndSave = function(user_id, topic_id, callback) {
	var topiccollect = new TopicCollect();
	topiccollect.user_id = user_id;
	topiccollect.topic_id = topic_id;
	
	topiccollect.save(callback);	
}

/*
 * 从数据库中删除一条收藏
 */
exports.remove = function(user_id, topic_id, callback) {
	TopicCollect.remove({'user_id': user_id, 'topic_id': topic_id}, callback);
}

/*
 * 根据用户id和话题id来查找一条收藏
 */
exports.getCollectByUserId = function(user_id, topic_id, callback) {
	TopicCollect.findOne({'user_id': user_id, 'topic_id': topic_id}, callback);
}