const mongoose = require("mongoose");
const uniqid = require("uniqid");

const blogSchema = new mongoose.Schema(
  {

        blogId: {
          type: String,
          default: uniqid(),
        },

    blogHeader: {
      type: String,
      required: [true, "Enter blogHeader"],
    },
    blogContent: {
      type: String,
      required: [true, "Enter blogContent"],
    },
    imageUrl: {
      type: String,
      required: [true, "Enter imageUrl"],
    },
    relatedLinks: [{}, {}],
  },
  {
    versionKey: false,
  }
);

const Blog = mongoose.model("Data", blogSchema);

module.exports = Blog;
