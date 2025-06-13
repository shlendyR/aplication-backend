import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";
import { BcryptAdapter } from "../adapters/bcryptAdapter.js";


export const createUser = async (reqBody) => {
  try {
    const { name, email, password, birthdate, id_rol, phone } = reqBody;
    const hashedPassword = await BcryptAdapter.hash(password);
    const data = {
      name,
      email,
      password: hashedPassword,
      birthdate: new Date(birthdate),
      id_rol,
      phone,
    };

    const user = await prisma.user.create({
      data,
      include: {
        rol: {
          select: {
            name: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error en createUser:", error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      error.meta?.target?.includes("email") // verifica que es el campo email
    ) {
      throw createError("EMAIL_IN_USE");
    }
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        rol: {
          select: {
            name: true,
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
        rol: {
          select: {
            name: true,
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
