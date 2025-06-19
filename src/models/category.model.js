import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllCategory = async () => {
  try {
    const result = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return result;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getCategoryById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const category = await prisma.category.findUnique({
      where: { id: numericId },
      select: {
        name: true,
      },
    });

    if (!category) {
      throw createError("RECORD_NOT_FOUND");
    }

    return category;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError("RECORD_NOT_FOUND");
    }

    throw error;
  }
};

export const createCategory = async (reqBody) => {
  try {
    const { name } = reqBody;

    data = {
      name,
    };
    const category = await prisma.category.create({
      data,
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteCategory = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deleteCategory = await prisma.category.delete({
      where: { id: numericId },
    });
    return deleteCategory;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updateCategory = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.category.update({
      where: { id: numericId },
      data,
    });

    return updateData;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError("RECORD_NOT_FOUND");
    }

    throw error;
  }
};
