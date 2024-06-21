var express = require("express");
var router = express.Router();
const commentcontroller = require("../controllers/commentController");
const passport = require("passport");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  commentcontroller.createComment
);

module.exports = router;
