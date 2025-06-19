import {
  createUser as createUserModel,
  getAllUsers as usersModel,
  getUserById as getUserByIdModel,
  deleteUser as deleteUserModel,
  updateUser as updateUserModel,
} from "../models/user.model.js";

export const createUser = async (req, res, next) => {
  try {
    const newUser = await createUserModel(req.body);
    res.status(201).json({ data: newUser });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersModel();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error en createUser:", error);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdModel(req.params.id);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserModel(req.params.id);
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await updateUserModel(req.params.id, req.body);
    res.status(200).json({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};
