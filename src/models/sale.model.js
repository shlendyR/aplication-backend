import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllSale = async () => {
  try {
    const sales = await prisma.sale.findMany({
      select: {
        id: true,
        date: true,
        total: true,
        description: true,
        status: true,
        payment_method: true,
        id_user: true,
      },
    });

    if (!sales) {
      throw createError("RECORD_NOT_FOUND");
    }
    return sales;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getSaleById = async (id) => {
  try {
    const saleId = validateAndConvertId(id);
    const sale = await prisma.sale.findUnique({
      where: { id: saleId },
      select: {
        id: true,
        date: true,
        total: true,
        description: true,
        status: true,
        payment_method: true,
        id_user: true,
      },
    });

    if (!sale) {
      throw createError("RECORD_NOT_FOUND");
    }
    return sale;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const createSale = async (reqBody) => {
  try {
    const { date, total, description, status, id_user } = reqBody;

    const data = {
      date,
      total,
      description,
      status,
      payment_method,
      id_user,
    };

    const sale = await prisma.sale.create({
      data,
      select: {
        id: true,
        date: true,
        total: true,
        description: true,
        status: true,
        payment_method: true,
        id_user: true,
      },
    });
    return sale;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};
