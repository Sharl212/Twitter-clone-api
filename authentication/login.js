const {findUserByEmail} = require("../queries/user")
// ? compare passwords
const {ComparePassword} = require("./password")
// ? generate auth token
const AuthorizationToken = require("./authorizationToken")
// ? input validation
const {UserValidation} = require("../validation/user")

const login = async (req, res)=>{
    const userCredentials = req.body;
    const validation = UserValidation(userCredentials);

    if(!validation) return res.status(400).send(validation)

    try {
        const user = await findUserByEmail(userCredentials.email)
        await ComparePassword(userCredentials.password, user.password).then(success =>{
            res.cookie("jWtToken", AuthorizationToken(userCredentials.email)).status(200).send({"success":"logged in"})
        })
        .catch(e => res.status(401).send({e}))
    }
    catch(error)
    {
        res.status(401).send({error})
    }
}
module.exports = login