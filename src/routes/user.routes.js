import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
} from "../controllers/user.controller.js";
const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

export default router;
