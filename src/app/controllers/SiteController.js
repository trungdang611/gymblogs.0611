import Blog from "../models/Blog";
import * as obj from "../../util/mongoose";

class SiteController {
  // [GET]: /
  home(req, res, next) {
    Blog.find({})
      .then((Blogs) => {
        res.render("HOME", {
          Blogs: obj.mutipleMongooseToObject(Blogs),
        });
      })
      .catch(next);
  }
  // [GET]: /search
  search(req, res, next) {
    const search = req.query.search;
    Blog.find({ $text: { $search: ".*" + search + ".*" } })
      .then((blogs) => {
        res.render("search", { blogs: obj.mutipleMongooseToObject(blogs) });
      })
      .catch(next);
  }
  // [POST]: /contact
  contact(req, res, next) {
    Blog.find({})
      .then((Blogs) => {
        res.render("CONTACT", {
          Blogs: obj.mutipleMongooseToObject(Blogs),
        });
      })
      .catch(next);
  }
}

export default SiteController;
