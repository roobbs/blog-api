var express = require("express");
var router = express.Router();
const indexControler = require("../controllers/indexController");

const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("HI!");
});

router.post("/signup", indexControler.signUp);

router.post("/login", indexControler.logIn);

// router.get(
//   "/protected",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     res.status(200).json({ success: true, msg: "you are authorized" });
//   }
// );

module.exports = router;
