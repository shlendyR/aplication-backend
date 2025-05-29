import { getProductsByCategory as getProductsByCategoryModel } from "../models/product.model.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await getProductsByCategoryModel(id);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay productos en esta categoría" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en getProductsByCategory:", error);
    res
      .status(500)
      .json({ message: "Error interno al obtener productos por categoría" });
  }
};
