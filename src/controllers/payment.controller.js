import {
  getAllPayments as paymentModel,
  getPaymentById as getPaymentByIdModel,
  createPayment as createPaymentModel,
} from "../models/payment.model.js";

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentModel();
    res.status(200).json({ data: payments });
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const payments = await getPaymentByIdModel(req.params.id);
    res.status(200).json({ data: payments });
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (req, res, next) => {
  try {
    const { id_accounts_receivable, amount_paid, payment_method } = req.body;

    const newPayment = await createPaymentModel({
      id_accounts_receivable,
      amount_paid,
      payment_method,
    });

    res.status(200).json({
      message: "detalle creado correctamente",
      data: newPayment,
    });
  } catch (error) {
    next(error);
    console.error("Error creating sale:", error);
  }
};
