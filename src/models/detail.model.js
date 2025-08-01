import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllDetails = async () => {
  try {
    const details = await prisma.saleDetail.findMany({
      select: {
        id: true,
        amount: true,
        subtotal: true,
        id_product: true,
        id_sale: true,
      },
    });

    if (!details) {
      throw createError("RECORD_NOT_FOUND");
    }
    return details;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getDetailById = async (id) => {
  try {
    const detailId = validateAndConvertId(id);
    const detail = await prisma.saleDetail.findUnique({
      where: { id: detailId },
      select: {
        id: true,
        amount: true,
        subtotal: true,
        id_product: true,
        id_sale: true,
      },
    });

    if (!detail) {
      throw createError("RECORD_NOT_FOUND");
    }
    return detail;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const createDetail = async (reqBody) => {
  try {
    const { amount, subtotal, id_product, id_sale } = reqBody;

    const data = {
      amount,
      subtotal,
      id_product,
      id_sale,
    };

    const detail = await prisma.saleDetail.create({
      data,
      select: {
        id: true,
        amount: true,
        subtotal: true,
        id_product: true,
        id_sale: true,
      },
    });
    return detail;
  } catch (error) {
    console.error("Error creating sale:", error);
    console.error("Error Prisma al crear detalle:", error);
    throw createError("INTERNAL_SERVER_ERROR");
  }
};
