import { Router } from "express";
import { getProductsByCategory } from "../controllers/product.controller.js";

const router = Router();

router.get("/category/:id", getProductsByCategory);

export default router;
