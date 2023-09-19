import { Router } from "express";
import SiteController from "../app/controllers/SiteController";
const siteController = new SiteController();
const siteRouter = Router();

siteRouter.get("/contact", siteController.contact);
siteRouter.get("/search", siteController.search);
siteRouter.get("/", siteController.home);

export default siteRouter;
