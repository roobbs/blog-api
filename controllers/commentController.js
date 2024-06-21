const Post = require("../models/posts");
const Comment = require("../models/comment");
const BlogUserUser = require("../models/blogUser");
const asyncHandler = require("express-async-handler");

exports.createComment = asyncHandler(async (req, res, next) => {
  // const posts = await Post.find({ published: true }).sort({ date: 1 }).exec();

  // res.json(posts);
  res.send("comment");
});
