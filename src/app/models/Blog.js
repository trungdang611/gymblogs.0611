import mongoose from "mongoose";
import pkg from "mongoose-slug-updater";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

const slug = pkg;
const Schema = mongoose.Schema;

const BlogPost = new Schema({
  name: { type: String },
  slug: { type: String, slug: "name", unique: true },
  description: { type: String },
  image: { type: String },
  videoId: { type: String },
  level: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add Plugins
mongoose.plugin(slug);
BlogPost.plugin(softDeletePlugin);
BlogPost.index({ title: "text", description: "text", tags: "text" });

const Blog = mongoose.model("Blogs", BlogPost);
export default Blog;
