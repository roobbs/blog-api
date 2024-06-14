var express = require("express");
var router = express.Router();

/* GET posts listing. */
router.get("/", function (req, res, next) {
  // get all posts with its comments
  res.send("respond with published posts");
});

router.get("/:id", function (req, res, next) {
  //get post with post's comments

  res.send(`respond with post: ${req.params.id}`);
});

module.exports = router;
