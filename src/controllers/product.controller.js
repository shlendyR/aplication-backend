import { getProductsByCategory as getProductsByCategoryModel } from "../models/product.model.js";

export const getProductsByCategory = async (req, res, next) => {
  try {
    const product = await getProductsByCategoryModel(req.params.id);
  } catch (error) {
    next(error);
  }
};
