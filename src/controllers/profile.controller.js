import { getProfile as getProfileModel } from "../models/profile.model.js";
import { updateUser as updateUserModel } from "../models/user.model.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await getProfileModel(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await updateUserModel(req.user.id, req.body);
    res.status(200).json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    next(error);
  }
};
