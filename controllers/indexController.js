const BlogUser = require("../models/blogUser");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const utils = require("../lib/utils");

exports.signUp = [
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new BlogUser({
        first_name,
        last_name,
        username,
        password: hashedPassword,
        author: false,
      });

      await newUser.save();

      const jwt = utils.issueJwt(newUser);

      res.status(201).json({
        success: true,
        msg: "User created successfully",
        user: newUser,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    } catch (error) {
      next(error);
    }
  }),
];

exports.logIn = asyncHandler(async (req, res, next) => {
  const user = await BlogUser.findOne({ username: req.body.username });

  if (!user) {
    res.status(401).json({ success: false, message: "could not find user" });
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (isValid) {
    const jwt = utils.issueJwt(user);

    res.status(201).json({
      success: true,
      msg: "User logged in successfully",
      user: user,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  }
  // else {
  //   return next(null, false, { succes: false, msg: "Incorrect password" });
  // }
});
