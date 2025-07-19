import { BcryptAdapter } from "../adapters/bcryptAdapter.js";
import jwt from "jsonwebtoken";
import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";

export const registerUser = async (reqBody) => {
  try {
    const { name, email, password, birthdate, id_role, phone } = reqBody;

    const hashedPassword = await BcryptAdapter.hash(password);

    const data = {
      name,
      email,
      password: hashedPassword,
      birthdate,
      id_role,
      phone,
    };

    const user = await prisma.user.create({
      data,
      include: {
        role: {
          select: {
            name_role: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error original en registerUser:", error); // <-- Log detallado
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
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      id_role: true,
      password: true,
      birthdate: true,
      role: true,
    },
    where: { email },
  });

  const isValid =
    user && (await BcryptAdapter.compare(password, user.password));
  if (!isValid) throw createError("INVALID_CREDENTIALS");

  const token = jwt.sign(
    {
      id: user.id,
      email,
      id_role: user.id_role, // igual que en el modelo
      rol_name: user.role.name_role, // corresponde al campo de relación 'rol'
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
