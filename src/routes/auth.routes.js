import express from "express";
import {
  login,
  register,
  getCurrentDate,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getCurrentDate);
router.post("/login", login);
router.post("/register", register);

export default router;
