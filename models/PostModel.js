const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post must have a title"],
    },
    body: {
      type: String,
      required: [true, "Post must have a body"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
