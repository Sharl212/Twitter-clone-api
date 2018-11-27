const userSchema = require("../models/user");

const findUserByEmail = email => {
    return new Promise((resolve, reject)=>{
        try{
            resolve(userSchema.findOne({email}).exec())
        }
        catch(e) {
            reject(e)
        }
    })
}

const Follow = async (followedID, followerID, followersList) => {
    // ? check if already followed this user
    let checkIfFollowed = followersList.filter(Id => Id == followedID).length;
    let options1 = checkIfFollowed > 0 ? {$pull: {'followers': followerID}} : {$addToSet: {'followers': followerID}}
    let options2 = checkIfFollowed > 0 ? {$pull: {'followers': followedID}} : {$addToSet: {'followers': followedID}}

    return Promise.all([
        await findUserByIdAndUpdate(followedID, options1),
        await findUserByIdAndUpdate(followerID, options2)
    ]).then(response => response).catch(error => error)
}

const findUserByIdAndUpdate = (Id, options) => {
    return new Promise ( async (resolve, reject)=>{
        // ? "select" is used to exclude the password field
        await userSchema.findByIdAndUpdate(Id, options, {new:true}).select("-password").exec()
        .then(success => resolve(success))
        .catch(e => reject(e.message))
    })
}

module.exports = {findUserByEmail, Follow}