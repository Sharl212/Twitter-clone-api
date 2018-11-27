const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId;

// ? authentication middleware
const {authenticate} = require("../authentication/auth")

const {newTweet} = require("../queries/createTweet")
const {fetchTweets, deleteTweet} = require("../queries/tweet")

router.post("/tweet", authenticate, async(req, res) => {
    const tweet = {
        owner: req.user._id,
        username: req.user.username,
        content: req.body.content
    }

    await newTweet(tweet).then(response => res.status(201).send(response))
    .catch(error => res.status(400).send({error}))
})

router.get("/timeline", authenticate, async (req, res) => {
    const userID = req.user._id
    const following = req.user.following

    await fetchTweets(userID, following).then(tweets => {
        if(tweets.length < 1) return res.status(404).send({"error":"You're not following anyone yet."})
        res.status(200).send(tweets)
    })
    .catch(error => res.status(200).send({error}))
})

router.delete("/tweet/:id", authenticate, async (req, res) =>{
    const tweetID = req.params.id
    // ? if the provided id is not a valid id 
    if(!ObjectId.isValid(tweetID)) return res.status(400).send({"error": "invalid tweet id"})

    const isDeleted = await deleteTweet(tweetID)

    if(isDeleted == null) return res.status(400).send({"error": "Tweet not found"})
    return res.status(200).send({"success": "Tweet Deleted"})
})

module.exports = router