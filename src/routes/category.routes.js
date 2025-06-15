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
const router = Router();

router.get("/", verifyToken, getAllCategory);

router.get("/:id", verifyToken, getCategoryById);

router.post("/", verifyToken, validate(createCategorySchema), createCategory);

router.delete("/:id", verifyToken, deleteCategory);

router.put("/:id", verifyToken, validate(updateCategorySchema), updateCategory);

export default router;
