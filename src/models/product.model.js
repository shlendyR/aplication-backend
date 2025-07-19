import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";
// getProductsByCategory

//getProductsByCategory
export const createProduct = async (reqBody) => {
  try {
    const { price_sale, cost_price, stock, description, id_category } = reqBody;

    const data = {
      price_sale,
      cost_price,
      stock,
      description,
      id_category,
    };

    const product = await prisma.product.create({
      data,
      select: {
        id: true,
        price_sale: true,
        cost_price: true,
        stock: true,
        description: true,
        id_category: true,
      },
    });
    return product;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      error.meta?.target?.includes("description")
    ) {
      throw createError("PRODUCT_ALREADY_EXISTS");
    }

    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getProducts = async () => {
  try {
    const product = await prisma.product.findMany({
      select: {
        description: true,
        price_sale: true,
        cost_price: true,
        stock: true,
        id_category: true,
      },
    });

    if (!product) {
      throw createError("RECORD_NOT_FOUND");
    }
    return product;
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
