import { Router } from "express";
import { ProductController } from "@Controllers/ProductController";

const controller = new ProductController();

export const ProductRouter = Router();

ProductRouter.get("/index", controller.index);
ProductRouter.post("/store", controller.store);