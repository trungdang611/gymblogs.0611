import Blog from "../models/Blog";
import * as obj from "../../util/mongoose";

class MeController {
  // [GET] /me/stored/blogs
  storedBlogs(req, res, next) {
    let blogQuery = Blog.find({});

    if (req.query.hasOwnProperty("_sort")) {
      blogQuery = blogQuery.sort({
        [req.query.column]: req.query.type,
      });
    }
    Promise.all([blogQuery, Blog.countDocuments({ isDeleted: true })])
      .then(([blogs, deletedCount]) => {
        res.render("me/stored-blogs", {
          deletedCount,
          blogs: obj.mutipleMongooseToObject(blogs),
        });
      })
      .catch(next);
  }
  // [GET] /me/trash/blogs
  trashBlogs(req, res, next) {
    Blog.findDeleted({})
      .then((blogs) => {
        res.render("me/trash-blogs", {
          blogs: obj.mutipleMongooseToObject(blogs),
        });
      })
      .catch(next);
  }
}

export default MeController;
