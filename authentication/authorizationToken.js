const jwt = require("jsonwebtoken");
const {JWT} = require('./jwt-config');

const AuthorizationToken = (email) => { // generate access token
  const Secret = JWT.SECRET;
  return jwt.sign({email,Secret}, JWT.SALT).toString()
}

module.exports = AuthorizationToken;