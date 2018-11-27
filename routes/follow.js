const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId;

// ? authentication middleware
const {authenticate} = require("../authentication/auth")

// ? for following/ unfollowing users
const {Follow} = require("../queries/user")

router.post("/follow/:id", authenticate, async (req, res) => {
    const followedID = req.params.id;
    const followerID = req.user._id;
    const followingsList = req.user.followers;

    // ? if the provided id is not a valid id 
    if(!ObjectId.isValid(followedID)) return res.status(400).send({"error": "invalid ID"})
    if(followedID == followerID) return res.status(400).send({"error": "You can't follow yourself"})

    try{
        const followUser = await Follow(followedID, followerID, followingsList);
        res.status(200).send(followUser)
    }
    catch(error){
        res.status(400).send({error})
    }
})

module.exports = router