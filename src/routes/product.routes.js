import { Router } from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";
import { createProductSchema } from "../schemas/product.schema.js";

const productRoutes = Router();

productRoutes.get("/", verifyToken, getProducts);

productRoutes.post(
  "/category/:categoryId",
  verifyToken,
  validate(createProductSchema),
  createProduct
);

export default productRoutes;
