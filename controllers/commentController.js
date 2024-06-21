const Comment = require("../models/comment");
const Post = require("../models/posts");
const BlogUser = require("../models/blogUser");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.createComment = [
  body("message", "Message must be at least 6 characters")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, postId } = req.body;

    const post = await Post.findById(postId).exec();

    try {
      const comment = new Comment({
        author: req.user._id,
        post: post._id,
        date: new Date(),
        text: message,
      });

      await comment.save();

      res.status(201).json({
        success: true,
        msg: "Comment created successfully",
        comment,
      });
    } catch (error) {
      next(error);
    }
  }),
];
