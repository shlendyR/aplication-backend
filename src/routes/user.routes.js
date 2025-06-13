import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller.js";
import { verifyToken } from '../middlewares/auth.js'
import { validate } from '../middlewares/validateInput.js'

const router = express.Router();


router.post("/",verifyToken,validate(),createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.delete("/:id",verifyToken,deleteUser);

router.put("/:id",verifyToken,validate(),updateUser);

export default router;
