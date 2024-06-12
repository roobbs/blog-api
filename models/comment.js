const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "BlogUser", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  date: { type: Date, required: true },
  text: { type: String, required: true, minLength: 20 },
});

module.exports = mongoose.model("Comment", CommentSchema);
