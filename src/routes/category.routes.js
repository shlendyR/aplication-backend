import { Router } from "express";
import {
  getAllCategory,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategry,
} from "../controllers/category.controller.js";
const router = Router();

router.get("/", getAllCategry);

router.get("/:id", getCategoryById);

router.post("/", createCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

export default router;
