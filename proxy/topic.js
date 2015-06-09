var models = require('../models');
var Topic = models.User;

exports.getTopicById = function(id, callback) {

};

exports.newAndSave = function(title, content, author_id, callback) {
	var topic = new Topic();

	topic.title = title;
	topic.content = content;
	topic.author_id = author_id;

	topic.save(callback);
};

