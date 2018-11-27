const router = require('express').Router()

// ? authentication middleware
// ! for test purposes only
const {authenticate} = require("../authentication/auth")

// ? auth functions
const login = require("../authentication/login");
const register = require("../authentication/register");

router.post("/login", login)

router.post("/register", register)

// ! for test purposes only
router.get("/auth", authenticate, (req,res)=>{
    res.status(200).send(req.user)
})

module.exports = router