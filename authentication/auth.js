const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

// ? jsonwebtoken options
const {JWT_OPTIONS} = require('./jwt-config')
// ? find user by email query
const {findUserByEmail} = require("../queries/user")

const CheckAuth = async (payload, done) => {
  // ? search for the user's ID by their email
  try {
    const result = await findUserByEmail(payload.email);
    // ? send the ID
    return done(null , result)
  } catch (err) {
    return done(err, false)
  }
}

const authenticate = passport.authenticate('jwt', {session: false})

const Strategy = new JwtStrategy(JWT_OPTIONS, CheckAuth)

module.exports = {
  Strategy,
  authenticate
}