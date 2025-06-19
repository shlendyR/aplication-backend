import { Router } from "express";
import {
  getAllCategory,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schemas.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";
const categoryRoutes = Router();

categoryRoutes.get("/", verifyToken, getAllCategory);

categoryRoutes.get("/:id", verifyToken, getCategoryById);

categoryRoutes.post(
  "/",
  verifyToken,
  validate(createCategorySchema),
  createCategory
);

categoryRoutes.delete("/:id", verifyToken, deleteCategory);

categoryRoutes.put(
  "/:id",
  verifyToken,
  validate(updateCategorySchema),
  updateCategory
);

export default categoryRoutes;
