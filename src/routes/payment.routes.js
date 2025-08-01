import { Router } from "express";

import {
  getAllPayments,
  createPayment,
  getPaymentById,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";
import { createPaymentSchema } from "../schemas/payment.schema.js";

const paymentRoutes = Router();

paymentRoutes.get("/", verifyToken, getAllPayments);

paymentRoutes.post(
  "/",
  verifyToken,
  validate(createPaymentSchema),
  createPayment
);

paymentRoutes.get("/:id", verifyToken, getPaymentById);

export default paymentRoutes;
