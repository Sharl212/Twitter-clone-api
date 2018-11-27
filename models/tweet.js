const mongoose = require('mongoose');

// * Define a schema
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    id: Schema.Types.ObjectId,
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 8
    },
    content: {
        type:String,
        required: true,
        trim: true,
        minlength: 5
    },
    likes: [
        {
            // * id of the user who liked the tweet
            id: Schema.Types.ObjectId,
            username: String,
            createdAt: String
        }
    ],
    replies: [
        {
            // * id of the user who replied
            id: Schema.Types.ObjectId,
            username: String,
            content: String,
            createdAt: String
        }
    ],
    createdAt: String
});

module.exports = mongoose.model('Tweet', tweetSchema);