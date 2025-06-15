import express from "express";
import {
  login,
  register,
  getCurrentDate,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validateInput.js";

const router = express.Router();

router.get("/", getCurrentDate);
router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;
