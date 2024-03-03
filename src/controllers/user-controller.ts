import { Request, Response } from "express";

import userService from "@src/services/user-service";
import { validateToken } from "@src/utils/reset-password-utils";

const bcrypt = require("bcrypt");

const addUser = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userService.addUser({ ...req.body, hashedPassword });

    return res.status(201).json(newUser);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({ users });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    await userService.updatePassword(id, password);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password, token } = req.body;

    if (validateToken(email, token, `${process.env.PASSWORD_RESET_SECRET}`)) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      const response = await userService.updatePassword(email, newPassword);

      return res.status(200).json({ response });
    } else {
      return res.status(400).json({ message: "Token validation failed" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default { getAll, addUser, getById, updatePassword, resetPassword };
