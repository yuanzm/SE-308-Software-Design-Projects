var models = require('../models');
var Comment = models.Comment;
var eventproxy = require('eventproxy');

exports.getLastCommentById = function() {

}

/*
 * @param {String} content: 评论的内容
 * @param {ObjectId} topic_id: 话题的id
 * @param {ObjectId} author_id: 话题作者的id
 * @param {ObjectId} comment_id: 该条评论的id
 */
exports.newAndSave = function(content, topic_id, author_id, comment_id, callback) {
    var comment = new Comment();
    comment.content = content;
    comment.topic_id = topic_id;
    comment.author_id = author_id;
    comment.comment_id = comment_id;

    comment.save(callback);
}
