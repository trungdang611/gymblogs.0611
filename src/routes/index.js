import meRouter from "./me";
import blogsRouter from "./blogs";
import siteRouter from "./site";

function route(app) {
  app.use("/blogs", blogsRouter);
  app.use("/me", meRouter);
  app.use("/", siteRouter);
}

export default route;
