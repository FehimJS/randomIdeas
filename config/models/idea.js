const mongoose = require("mongoose");
const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "a text needed"],
  },
  tag: {
    type: String,
    required: [true, "Please add a tag"],
  },
  username: {
    type: String,
    required: [true, "Are not you a user yet?"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("idea", IdeaSchema);
