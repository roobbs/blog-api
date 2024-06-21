var express = require("express");
var router = express.Router();
const commentcontroller = require("../controllers/commentController");

router.post("/create", commentcontroller.createComment);

module.exports = router;
