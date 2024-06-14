const passport = require("passport");
const BlogUser = require("../models/blogUser");
const bcrypt = require("bcryptjs");

require("./database");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRET",
  // algorithms: [RS256],
};

const strategy = new JWTstrategy(options, (payload, done) => {
  const user = BlogUser.findOne({ id: payload.sub })
    .then((user) => {
      //
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use(strategy);
};

// try {
//   const user = BlogUser.findOne({ id: payload.sub });
//   if (!user) {
//     return done(null, false);
//   } else {
//     return done(null, user);
//   }
// } catch (err) {
//   return done(err);
// }
