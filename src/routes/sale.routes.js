import { Router } from "express";

import {
  getAllSale,
  createSale,
  getSaleById,
} from "../controllers/sale.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";
import { createSaleSchema } from "../schemas/sale.schema.js";

const saleRoutes = Router();

saleRoutes.get("/", verifyToken, getAllSale);
saleRoutes.post("/", verifyToken, validate(createSaleSchema), createSale);
saleRoutes.get("/:id", verifyToken, getSaleById);

// ...existing code...

export default saleRoutes;
