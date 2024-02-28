import { NextFunction, Request, Response } from "express";

import userService from "@src/services/user-service";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const newUser = await userService.addUser(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({ users });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default { getAllUsers, addUser };
