import { Router } from "express";

import {
  getAllDetails,
  createDetail,
  getDetailById,
} from "../controllers/datail.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";
import { createDetailSchema } from "../schemas/detail.schema.js";

const detailRoutes = Router();

detailRoutes.get("/", verifyToken, getAllDetails);
detailRoutes.post("/", verifyToken, validate(createDetailSchema), createDetail);
detailRoutes.get("/:id", verifyToken, getDetailById);

// ...existing code...

export default detailRoutes;
