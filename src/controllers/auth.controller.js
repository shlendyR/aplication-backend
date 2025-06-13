import { registerUser as registerUserModel } from "../models/auth.model.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUserModel(req.body);
    res.status(201).json({
      status: 201,
      message: "Usuario creado con éxito",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token } = await loginUser(req.body);
    res.status(200).json({
      status: 200,
      message: "Login exitoso",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentDate = async (req, res, next) => {
  try {
    const data = await getCurrentDateService();
    res.status(200).json({
      status: 200,
      message: "Date",
      data,
    });
  } catch (error) {
    next(error);
  }
};
