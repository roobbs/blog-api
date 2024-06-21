const Post = require("../models/posts");
const Comment = require("../models/comment");
const BlogUserUser = require("../models/blogUser");
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

    const { message, userId, postId } = req.body;

    try {
      const comment = new Comment({
        author: userId,
        post: postId,
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
