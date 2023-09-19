import { Router } from "express";
import MeController from "../app/controllers/MeController";
const meController = new MeController();
const meRouter = Router();

meRouter.get("/stored/blogs", meController.storedBlogs);
meRouter.get("/trash/blogs", meController.trashBlogs);

export default meRouter;
