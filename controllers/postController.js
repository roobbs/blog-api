const Post = require("../models/posts");
const Comment = require("../models/comment");
const BlogUserUser = require("../models/blogUser");
const asyncHandler = require("express-async-handler");

exports.postsListGet = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ published: true }).sort({ date: -1 }).exec();

  res.json(posts);
});

exports.postDetail = asyncHandler(async (req, res, next) => {
  try {
    const [post, comments] = await Promise.all([
      Post.findById(req.params.id)
        .populate({
          path: "author",
          select: "first_name last_name",
        })
        .exec(),
      Comment.find({ post: req.params.id })
        .sort({ date: -1 })
        .populate({
          path: "author",
          select: "username",
        })
        .exec(),
    ]);

    if (post === null) {
      return res.status(404).json({ msg: "ERROR GETTING THIS POST" });
    }

    res.json({ post, comments });
  } catch (error) {
    next(error);
  }
});
