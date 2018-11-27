const validator = require("validator")

function TweetValidation(tweet) {
    let result = "valid";

    const username = tweet.username ? tweet.username : ""
    const content = tweet.content ? tweet.content : ""
    const isUsername = !validator.isEmpty(username) ? validator.isLength(username, {min: 2, max: 6}) : false
    const isContent = !validator.isEmpty(content) ? validator.isLength(content, {min: 5, max: 50}) : false
    
    if(!isUsername) result = "Invalid Username"
    if(!isContent) result = "Invalid content"

    return result
}

module.exports = {TweetValidation}