import {
  getAllUsers as userModel,
  getUserById as getUserByIdModel,
  createUser as createUserModel,
  deleteUser as deleteUserModel,
  updateUser as updateUserModel,
} from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const { rows } = await userModel();
    res.json(rows);
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    res.status(500).json({
      message: "Error interno al obtener usuarios",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await getUserByIdModel(id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error en getUserById:", error);
    res.status(500).json({ error: "Error al obtener usuario por ID" });
  }
};

export const creatUser = async (req, res) => {
  try {
    const { name, email, password, phone, birthdate, id_rol } = req.body;

    if (!password) {
      return res.status(400).json({
        status: 400,
        message: "La contraseña es requerida",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      birthdate,
      id_rol,
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      status: 201,
      message: "Usuario creado con éxito",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).json({
      status: 500,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.param;
    const { rowCount } = await deleteUserModel(id);

    if (rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User deleted",
    });
  } catch (error) {
    console.error("Error en deleteUser:", error);
    res.status(500).json({
      message: "Error interno al eliminar el usuario",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await updateUserModel(id, data);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updatedUser = result.rows[0];
    delete updatedUser.password;

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error en updateUser:", err);
    return res
      .status(500)
      .json({ message: "Error interno al actualizar el usuario" });
  }
};
