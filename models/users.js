const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 2, maxLength: 20 },
  last_name: { type: String, required: true, minLength: 2, maxLength: 20 },
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
    unique: true,
  },
  password: { type: String, required: true, minLength: 5, maxLength: 200 },
  author: { type: Boolean, required: true },
});

module.exports = mongoose.model("BlogUser", UserSchema);
