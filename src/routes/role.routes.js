import express from "express";
import { prisma, Prisma } from "../config/db.js";

const roleRoutes = express.Router();

roleRoutes.get("/", async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
});

export default roleRoutes;
