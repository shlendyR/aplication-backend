import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updatUser,
  createUser,
  deleteUser,
} from "../controllers/user.controller.js";
const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/", updateUser);

export default router;
