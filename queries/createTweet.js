// * tweet schema model
const tweetSchema = require("../models/tweet")

// * moment library
const moment = require("moment");

// * input validation
const {TweetValidation} = require("../validation/tweet")

const newTweet = tweet => {
    const validation = TweetValidation(tweet);

    return new Promise(async (resolve, reject) => {
        if (validation !== "valid") return reject(validation)
        await createTweet(tweet).then(success => {
            resolve(success)
        }).catch(err => {
            reject(err)
        });
    })
}

const createTweet = tweet => {
    return new Promise(async (resolve, reject) => {
        const newTweet = new tweetSchema({
            owner: tweet.owner,
            username: tweet.username.toLowerCase(),
            content: tweet.content.toLowerCase(),
            createdAt: moment().format('MMMM Do YYYY, h:mm a')
        })

        try {
            await newTweet.save();
            resolve(newTweet)
        } catch (e) {
            reject(e.errmsg)
        }
    })
}

module.exports = {
    newTweet
}