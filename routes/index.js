var express = require("express");
var router = express.Router();
const indexControler = require("../controllers/indexController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("HI!");
});

router.post("/signup", indexControler.signUp);

router.get("/login", indexControler.logIn);

module.exports = router;
