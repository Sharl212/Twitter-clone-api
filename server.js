const express = require('express'),
      app = express(),
      passport = require("passport"),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      PORT = 4000

// * establish database connection
require("./database");
// * routes
const user = require("./routes/user")
// * follow/unfollow routes
const follow = require("./routes/follow")
// * tweet routes
const tweet = require("./routes/tweet")

// * JWT authentication strategy
const {Strategy} = require("./authentication/auth")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// * passport for authentication
passport.use(Strategy);
// * routes
app.use("/auth", user);
app.use("/api", follow);
app.use("/api", tweet);

app.listen(PORT, () => console.log(`API is up on ${PORT}`));