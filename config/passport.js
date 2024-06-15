const passport = require("passport");
const BlogUser = require("../models/blogUser");
const bcrypt = require("bcryptjs");

require("./database");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRETKEY",
  // algorithms: [RS256],
};

const strategy = new JWTstrategy(options, (payload, done) => {
  try {
    const user = BlogUser.findOne({ id: payload.sub });
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
