// 引入所需模块
var models = require('../models');
var Notification = models.Notification;
var eventproxy = require('eventproxy');
var UserProxy = require('./user.js');


/*
 * 新建一条通知
 */ 
exports.newAndSave = function(type, sender_id, receiver_id, topic_id, comment_id, callback) {
	var notification = new Notification();

	notification.type = type;
	notification.sender_id = sender_id;
	notification.receiver_id = receiver_id;
	notification.topic_id = topic_id;
	notification.comment_id = comment_id;

	notification.save(callback);
}

/*
 * 根据用户id获取一个用户未读的消息
 */
exports.getUnreadNotificationCountById = function(receiver_id, callback) {
	Notification.find({'receiver_id': receiver_id, 'has_read': false}, callback);
}

/*
 * 标记一个用户的所有消息为已读
 * @param {ObjectId} receiver_id: 需要被更新的用户
 */
exports.markAllNotificationAsReadById = function(receiver_id, callback) {
	var query = {'receiver_id': receiver_id, 'has_read': false};
	var update = {'has_read': true};
	Notification.update(query, update, {}, callback);
}
