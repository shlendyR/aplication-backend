import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller.js";
import { createUserSchema, updateUserSchema } from "../schemas/users.schema.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";

const router = express.Router();

router.post("/", verifyToken, validate(createUserSchema), createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.delete("/:id", verifyToken, deleteUser);

router.put("/:id", verifyToken, validate(updateUserSchema), updateUser);

export default router;
