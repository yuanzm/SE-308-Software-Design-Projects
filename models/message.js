var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var BaseModel = require("./base_model");

var MessageSchema = new Schema({
    content: {type: String},
    create_at: {type: Date, default: Date.now},
    group_id: {type: ObjectId},
    sender: {
        sender_id: {type: ObjectId},
        avatar_url: {type: String},
        name: {type: String}
    }
});

MessageSchema.plugin(BaseModel);
mongoose.model('Message', MessageSchema);
