import { Router } from "express";
import { getProductsByCategory } from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const productRoutes = Router();

productRoutes.get("/category/:id", verifyToken, getProductsByCategory);

export default productRoutes;
