const jwt = require("jsonwebtoken");

function issueJwt(user) {
  const _id = user._id;
  const expiresIn = "1d";
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, "SECRETKEY", { expiresIn: expiresIn });

  console.log(`Generated Token: ${signedToken}`);
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

module.exports.issueJwt = issueJwt;
