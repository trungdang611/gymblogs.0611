import { Router } from "express";
import BlogsController from "../app/controllers/BlogsController";
const blogsController = new BlogsController();
const blogsRouter = Router();

blogsRouter.get("/create", blogsController.create);
blogsRouter.post("/store", blogsController.store);
blogsRouter.get("/:id/edit", blogsController.edit);
blogsRouter.post("/handle-form-actions", blogsController.handleFormActions);
blogsRouter.put("/:id", blogsController.update);
blogsRouter.patch("/:id/restore", blogsController.restore);
blogsRouter.delete("/:id", blogsController.delete);
blogsRouter.get("/:slug", blogsController.show);

export default blogsRouter;
