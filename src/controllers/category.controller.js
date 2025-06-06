import {
  getAllCategory as categoryModel,
  getCategoryById as getCategoryByIdModel,
  createCategory as createCategoryModel,
  deleteCategory as deleteCategoryModel,
  updateCategory as updateCategoryModel,
} from "../models/category.model.js";

export const getAllCategory = async (req, res) => {
  try {
    const { rows } = await categoryModel();
    res.json(rows);
  } catch (error) {
    console.error("Error en getAllCategorys:", error);
    res.status(500).json({
      message: "Error interno al obtener categorias",
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await getCategoryByIdModel(id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error en getCategoryById:", error);
    res.status(500).json({ error: "Error al obtener categoría por ID" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await createCategoryModel({
      name,
    });

    res.status(201).json({
      status: 201,
      message: "categoria creada con éxito",
    });
  } catch (error) {
    console.error("Error en createCategory:", error);
    res.status(500).json({
      status: 500,
      message: "Error al crear categoria",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await deleteCategoryModel(id);

    if (rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.json({
      message: "Category deleted",
    });
  } catch (error) {
    console.error("Error en deleteCategory:", error);
    res.status(500).json({
      message: "Error interno al eliminar categoria",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await updateCategoryModel(id, data);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const updatedCategory = result.rows[0];

    return res.status(200).json({
      message: "Categoría actualizada correctamente",
      category: updatedCategory,
    });
  } catch (err) {
    console.error("Error en updateCategory:", err);
    return res.status(500).json({
      message: "Error interno al actualizar la categoría",
    });
  }
};
