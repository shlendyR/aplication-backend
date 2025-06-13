import { BcryptAdapter } from "../adapters/bcryptAdapter.js";
import jwt from "jsonwebtoken";
import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";

export const registerUser = async (reqBody) => {
  try {
    const { name, email, password, birthdate, id_rol, phone } = reqBody;

    const hashedPassword = await BcryptAdapter.hash(password);

    const data = {
      name,
      email,
      password: hashedPassword,
      birthdate,
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

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { rol: { select: { name: true } } },
  });

  const isValid =
    user && (await BcryptAdapter.compare(password, user.password));
  if (!isValid) throw createError("INVALID_CREDENTIALS");

  const token = jwt.sign(
    {
      id: user.id,
      email,
      id_rol: user.id_rol,
      rol_name: user.rol.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
  };
};
