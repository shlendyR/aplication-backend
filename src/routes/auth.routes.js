import express from "express";
import {
  login,
  register,
  getCurrentDate,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validateInput.js";

const authRoutes = express.Router();

authRoutes.get("/", getCurrentDate);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.post("/register", validate(registerSchema), register);

export default authRoutes;
