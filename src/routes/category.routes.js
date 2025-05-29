import { Router } from "express";
import {
  getAllCategory,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
const router = Router();

router.get("/", getAllCategory);

router.get("/:id", getCategoryById);

router.post("/", createCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

export default router;
