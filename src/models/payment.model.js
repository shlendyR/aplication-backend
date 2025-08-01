import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllPayments = async () => {
  try {
    const payments = await prisma.payment.findMany({
      select: {
        id_accounts_receivable: true,
        amount_paid: true,
        payment_date: true,
        payment_method: true,
      },
    });

    if (!payments) {
      throw createError("RECORD_NOT_FOUND");
    }
    return payments;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getPaymentById = async (id) => {
  try {
    const paymentId = validateAndConvertId(id);
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: {
        id_accounts_receivable: true,
        amount_paid: true,
        payment_date: true,
        payment_method: true,
      },
    });

    if (!payment) {
      throw createError("RECORD_NOT_FOUND");
    }
    return payment;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const createPayment = async (reqBody) => {
  try {
    const { id_accounts_receivable, amount_paid, payment_method } = reqBody;

    const data = {
      id_accounts_receivable,
      amount_paid,
      payment_method,
    };

    const payment = await prisma.payment.create({
      data,
      select: {
        id_accounts_receivable: true,
        amount_paid: true,
        payment_date: true,
        payment_method: true,
      },
    });
    return payment;
  } catch (error) {
    console.error("Error creating sale:", error);
    console.error("Error Prisma al crear detalle:", error);
    throw createError("INTERNAL_SERVER_ERROR");
  }
};
