import Blog from "../models/Blog";
import * as obj from "../../util/mongoose";
import { query } from "express";

class BlogsController {
  // [GET]: /blogs/:slug
  show(req, res, next) {
    Blog.findOne({ slug: req.params.slug })
      .then((blog) => {
        res.render("blogs/show", blog);
      })
      .catch((error) => res.status(500).json({ error: "Error...!" }));
  }
  // [GET]: /blogs/create
  create(req, res, next) {
    res.render("blogs/create");
  }
  // [POST]: /blogs/store
  store(req, res, next) {
    const blog = new Blog(req.body);
    blog
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(next);
  }
  // [GET]: /blogs/:id/edit
  edit(req, res, next) {
    Blog.findById(req.params.id)
      .then((blog) => {
        res.render("blogs/edit", { blog: obj.mongooseToObject(blog) });
      })
      .catch(next);
  }
  // [PUT]: /blogs/:id
  update(req, res, next) {
    Blog.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/me/stored/blogs");
      })
      .catch(next);
  }
  // [DELETE]: /blogs/:id
  delete(req, res, next) {
    Blog.softDelete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
  // [PATCH]: /blogs/:id/restore
  restore(req, res, next) {
    Blog.restore({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
  // [POST]: /blogs/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Blog.softDelete({ _id: { $in: req.body.blogIds } })
          .then(() => {
            res.redirect("back");
          })
          .catch(next);
        break;
      default:
        res.json({ message: "Action invalid" });
    }
  }
}

export default BlogsController;
