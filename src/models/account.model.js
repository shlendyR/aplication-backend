import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllAccounts = async () => {
  try {
    const Accounts = await prisma.accountsReceivable.findMany({
      select: {
        id: true,
        expiration_date: true,
        id_sale: true,
      },
    });

    if (!Accounts) {
      throw createError("RECORD_NOT_FOUND");
    }
    return Accounts;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getAccountById = async (id) => {
  try {
    const accountId = validateAndConvertId(id);
    const account = await prisma.accountsReceivable.findUnique({
      where: { id: accountId },
      select: {
        id: true,
        expiration_date: true,
        id_sale: true,
      },
    });

    if (!account) {
      throw createError("RECORD_NOT_FOUND");
    }
    return account;
  } catch (error) {
    console.error("Error Prisma al obtener cuenta por ID:", error);
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const createAccount = async (reqBody) => {
  try {
    const { expiration_date, id_sale } = reqBody;

    const data = {
      expiration_date,
      id_sale,
    };

    const account = await prisma.accountsReceivable.create({
      data,
      select: {
        id: true,
        expiration_date: true,
        id_sale: true,
      },
    });
    return account;
  } catch (error) {
    console.error("Error Prisma al crear venta:", error);
    throw createError("INTERNAL_SERVER_ERROR");
  }
};
