var express = require("express");
var router = express.Router();

/* GET posts listing. */
router.get("/", function (req, res, next) {
  res.send("respond with published posts");
});

module.exports = router;
