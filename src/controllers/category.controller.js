import {
  getAllCategory as categoryModel,
  getCategoryById as getCategoryByIdModel,
  createCategory as createCategoryModel,
  deleteCategory as deleteCategoryModel,
  updateCategory as updateCategoryModel,
} from "../models/category.model.js";

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await categoryModel();
    res.status(200).json({ data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const categories = await getCategoryByIdModel(req.params.id);
    res.status(200).json({ data: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategoryModel({ name });
    res.status(201).json({
      message: "Categoria creada correctamente",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const result = await deleteCategoryModel(req.params.id);
    return res.status(200).json({
      message: "Categoría eliminada correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updateCategory = await updateCategoryModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Categoría actualizada correctamente",
      data: updateCategory,
    });
  } catch (error) {
    next(error);
  }
};
