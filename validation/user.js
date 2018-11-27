const validator = require("validator")

function UserValidation(user) {
    let result = "valid";

    const username = user.username ? user.username : ""
    const email = user.email ? user.email : ""
    const password = user.password ? user.password : ""
    const isUsername = !validator.isEmpty(username) ? validator.isLength(username, {min: 2, max: 6}) : false
    const isEmail = !validator.isEmpty(email) ? validator.isEmail(email) : false
    const isPassword = !validator.isEmpty(password) ? validator.isLength(password, {min: 6, max: 14}) : false
    
    if(!isUsername) result = "Invalid Username"
    if(!isEmail) result = "Invalid Email"
    if(!isPassword) result = "Invalid Password"

    return result
}

module.exports = {UserValidation}