import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";
import { BcryptAdapter } from "../adapters/bcryptAdapter.js";

export const createUser = async (reqBody) => {
  try {
    const { name, email, password, birthdate, id_role, phone } = reqBody;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) throw createError("EMAIL_IN_USE");

    const hashedPassword = await BcryptAdapter.hash(password);
    const data = {
      name,
      email,
      password: hashedPassword,
      birthdate: new Date(birthdate),
      id_role,
      phone,
    };

    const user = await prisma.user.create({
      data,
      include: {
        role: {
          select: { name_role: true },
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error en createUser:", error);
    // Si el error ya tiene status, es un error personalizado, relánzalo directamente.
    if (error.status) throw error;
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: {
          select: {
            name_role: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getUserById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: numericId },
      include: {
        role: {
          select: {
            name_role: true,
          },
        },
      },
    });

    if (!user) {
      throw createError("RECORD_NOT_FOUND");
    }

    return user;
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

export async function deleteUser(id) {
  try {
    const numericId = validateAndConvertId(id);
    const deleteUser = await prisma.user.delete({
      where: { id: numericId },
    });
    return deleteUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError("RECORD_NOT_FOUND");
    }

    throw error;
  }
}

export async function updateUser(id, data) {
  try {
    const numericId = validateAndConvertId(id);

    const updatedUser = await prisma.user.update({
      where: { id: numericId },
      data,
    });

    return updatedUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError("RECORD_NOT_FOUND");
    }

    throw error;
  }
}
