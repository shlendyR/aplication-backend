import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { updateProfileSchema } from "../schemas/profile.schema.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";

const profileRoutes = Router();

profileRoutes.post("/", verifyToken, getProfile);

profileRoutes.put(
  "/",
  verifyToken,
  validate(updateProfileSchema),
  updateProfile
);

export default profileRoutes;
