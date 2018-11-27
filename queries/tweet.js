const tweetSchema = require("../models/tweet");

const fetchTweets = async (userID, followings) => {
    const options = {owner: userID}
    const userTweets = await fetchTweetsByUserId(options)
    const followingsTweets = await fetchEachUserTweets(followings)

    return StructureTweets(userTweets, followingsTweets)
}

const fetchTweetsByUserId = async (options) => {
    let result;

    try {
        result = await tweetSchema.find(options).exec()
    }
    catch(e) {
        result = e
    }

    return result
}

const fetchEachUserTweets = (usersIds) => {
    return new Promise ( async (resolve, reject)=>{
        let TweetsList = []

        for(userId of usersIds){
            await tweetSchema.find({owner: userId})
            .then(tweetArray => {
                if(tweetArray.length > 0){ // ? if the the person being followed has tweets
                    tweetArray.forEach(tweet => TweetsList.push(tweet)) // ? push the objects out of [] to the 'TweetsList'
                }
            })
            .catch(e => reject(e))
        }

        resolve(TweetsList)
    })
}

const StructureTweets = (userTweets, followingsTweets) =>{
    return followingsTweets.concat(userTweets)
}

const deleteTweet = async id =>{
    let result;
    try {
        result = await tweetSchema.findByIdAndDelete(id).exec()
    }
    catch(e){
        result = e
    }

    return result
}

module.exports = {fetchTweets, deleteTweet};