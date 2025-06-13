import pkg from "../../generated/prisma/index.js";
const { PrismaClient, Prisma } = pkg;
const prisma = new PrismaClient();
export { prisma, Prisma };
