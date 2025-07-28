import { PaymentMethod } from "../../generated/prisma/index.js";
import {
  getAllSale as saleModel,
  getSaleById as getSaleByIdModel,
  createSale as createSaleModel,
} from "../models/sale.model.js";

export const getAllSale = async (req, res, next) => {
  try {
    const sales = await saleModel();
    res.status(200).json({ data: sales });
  } catch (error) {
    next(error);
  }
};

export const getSaleById = async (req, res, next) => {
  try {
    const sales = await getSaleByIdModel(req.params.id);
    res.status(200).json({ data: sales });
  } catch (error) {
    next(error);
  }
};

export const createSale = async (req, res, next) => {
  try {
    const { date, total, description, status, Payment_method, id_user } =
      req.body;

    const newSale = await createSaleModel({
      date,
      total,
      description,
      status,
      Payment_method,
      id_user,
    });

    res.status(200).json({
      message: "Venta creada correctamente",
      data: newSale,
    });
  } catch (error) {
    next(error);
  }
};
