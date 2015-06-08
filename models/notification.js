var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var var BaseModel = require("./base_model");

var NotificationScema = new Schema({
    type: {type: String},
    master_id: {type: ObjectId},
    author_id: {type: ObjectId},
    topic_id: {type: ObjectId},
    comment_id: {type: ObjectId},
    has_read: {type: Boolean, default: false},
    create_at: {type: Date, default: Date.now}
});

NotificationScema.plugin(BaseModel);
NotificationScema.index({master_id: 1, has_read: -1, create_at: -1});

mongoose.model('Notification', NotificationScema);
