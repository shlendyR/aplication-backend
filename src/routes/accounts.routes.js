import { Router } from "express";

import {
  getAllAccounts,
  createAccount,
  getAccountById,
} from "../controllers/account.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateInput.js";
import { createAccountSchema } from "../schemas/account.schema.js";

const accountRoutes = Router();

accountRoutes.get("/", verifyToken, getAllAccounts);
accountRoutes.post(
  "/",
  verifyToken,
  validate(createAccountSchema),
  createAccount
);
accountRoutes.get("/:id", verifyToken, getAccountById);

export default accountRoutes;
