// ? generate authorization token
const AuthorizationToken = require("./authorizationToken")
// ? createUser
const {newUser} = require("../queries/createUser")
const register = (req, res)=>{
    const email = req.body.email
    const Token = AuthorizationToken(email);

    newUser(req.body).then(response => res.cookie("jWtToken", Token).status(201).send())
    .catch(error => res.status(400).send({error}))
}
module.exports = register