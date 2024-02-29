import { NextFunction, Request, Response } from "express";

import userService from "@src/services/user-service";
import { validateUser } from "@src/models/schema-validators/user-validator";
import mongoose from "mongoose";

const bcrypt = require("bcrypt");

const addUser = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await userService.getByEmail(req.body.email);
  if (user) {
    return res.status(400).send("User already exisits. Please sign in");
  }

  try {
    const { body } = req;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    const newUser = await userService.addUser({ ...body, password });

    return res.status(201).json(newUser);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
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

    const x = new mongoose.Types.ObjectId(id);
    const user = await userService.getById(x);

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
    const { newPassword, oldPassword } = req.body;

    const x = new mongoose.Types.ObjectId(id);
    const user = await userService.getById(x);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    if (oldPassword !== newPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    await userService.updatePassword(user.id, password);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default { getAllUsers, addUser, getById, updatePassword };
