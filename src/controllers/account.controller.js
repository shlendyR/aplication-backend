import {
  getAllAccounts as accountsModel,
  getAccountById as getAccountByIdModel,
  createAccount as createAccountModel,
} from "../models/account.model.js";

export const getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await accountsModel();
    res.status(200).json({ data: accounts });
  } catch (error) {
    next(error);
  }
};

export const getAccountById = async (req, res, next) => {
  try {
    console.log("ID recibido:", req.params.id);
    const accounts = await getAccountByIdModel(req.params.id);
    res.status(200).json({ data: accounts });
  } catch (error) {
    console.error("Error en getAccountById:", error);
    next(error);
  }
};

export const createAccount = async (req, res, next) => {
  try {
    const { expiration_date, id_sale } = req.body;

    const newAccount = await createAccountModel({
      expiration_date,
      id_sale,
    });

    res.status(200).json({
      message: "cuenta pendiente creada",
      data: newAccount,
    });
  } catch (error) {
    next(error);
    console.error("Error creating sale:", error);
  }
};
