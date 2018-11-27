const mongoose = require('mongoose');

// ? Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 8,
        unique: true
    },
    email: {
        type: String,
        required:true,
        trim: true,
        lowercase: true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    followers: {
        type: Array
    },
    following: {
        type: Array
    }
});

module.exports = mongoose.model('User', userSchema);