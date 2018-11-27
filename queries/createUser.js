// ? user schema model
const userSchema = require("../models/user")

// ? input validation
const {UserValidation} = require("../validation/user")
// ? Hash password
const {HashPassword} = require("../authentication/password")

const newUser = user => {
    const validation = UserValidation(user);

    return new Promise(async (resolve, reject) => {
        if (validation !== "valid") return reject(validation)
        await createUser(user).then(success => {
            resolve(success)
        }).catch(err => {
            reject(err)
        });
    })
}

const createUser = user => {
    return new Promise(async (resolve, reject) => {
        const password = HashPassword(user.password.toLowerCase());
        
        const newUser = new userSchema({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password
        })

        try {
            await newUser.save();
            resolve(newUser)
        } catch (e) {
            reject(e.errmsg)
        }
    })
}

module.exports = {
    newUser
}