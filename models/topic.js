var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var BaseModel = require("./base_model");
var config    = require('../config');
var _         = require('lodash');

var TopicSchema = new Schema({
    title: {type: String},
    content: {type: String},
    author_id: {type: ObjectId},

    comment_count: {type: Number, default: 0},
    visit_count: {type: Number, default: 0},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
    collect_count: {type: Number, default: 0},
    ups: [Schema.Types.ObjectId]
});

TopicSchema.plugin(BaseModel);
TopicSchema.index({create_at: -1});
TopicSchema.index({author_id: 1, create_at: -1});

mongoose.model('Topic', TopicSchema);
