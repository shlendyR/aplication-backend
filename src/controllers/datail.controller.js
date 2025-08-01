import {
  getAllDetails as detailModel,
  getDetailById as getDetailByIdModel,
  createDetail as createDetailModel,
} from "../models/detail.model.js";

export const getAllDetails = async (req, res, next) => {
  try {
    const details = await detailModel();
    res.status(200).json({ data: details });
  } catch (error) {
    next(error);
  }
};

export const getDetailById = async (req, res, next) => {
  try {
    const details = await getDetailByIdModel(req.params.id);
    res.status(200).json({ data: details });
  } catch (error) {
    next(error);
  }
};

export const createDetail = async (req, res, next) => {
  try {
    const { amount, subtotal, id_product, id_sale } = req.body;

    const newDetail = await createDetailModel({
      amount,
      subtotal,
      id_product,
      id_sale,
    });

    res.status(200).json({
      message: "detalle creado correctamente",
      data: newDetail,
    });
  } catch (error) {
    next(error);
    console.error("Error creating sale:", error);
  }
};
