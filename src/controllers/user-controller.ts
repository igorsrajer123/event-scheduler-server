import { Request, Response } from "express";

import userService from "src/services/user-service";

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

const addUser = async (req: any, res: any) => {
  await userService.addUser();

  res.status(200).json({ message: "User added!" });
};

export default { getAllUsers, addUser };
