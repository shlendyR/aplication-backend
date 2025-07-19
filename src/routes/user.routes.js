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

const userRoutes = express.Router();

userRoutes.post("/", verifyToken, validate(createUserSchema), createUser);

userRoutes.get("/", verifyToken, getAllUsers);

userRoutes.get("/:id", getUserById);

userRoutes.delete("/:id", verifyToken, deleteUser);

userRoutes.put("/:id", verifyToken, validate(updateUserSchema), updateUser);

export default userRoutes;
