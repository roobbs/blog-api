var express = require("express");
var router = express.Router();

const postController = require("../controllers/postController");

/* GET posts listing. */
router.get("/", postController.postsListGet);

router.get("/:id", postController.postDetail);

module.exports = router;
