import {
  getProducts as getProductsModel,
  createProduct as createProductModel,
} from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
  try {
    const id_category = Number(req.params.categoryId);
    // Puedes validar aquí si id_category es un número válido si lo deseas

    const productData = {
      ...req.body,
      id_category, // debe coincidir con el nombre en tu schema.prisma
    };

    const newProduct = await createProductModel(productData);
    res.status(201).json({ data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const product = await getProductsModel();
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};
