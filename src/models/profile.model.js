import { prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";

export const getProfile = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
        phone: true,
        rol: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) throw createError("RECORD_NOT_FOUND");

    return user;
  } catch (error) {
    throw error;
  }
};
