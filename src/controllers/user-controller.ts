import { Request, Response } from "express";

import { User, UserDto } from "@src/types/user-types";
import userService from "@src/services/user-service";

//utils
import { validateToken } from "@src/utils/reset-password-utils";
import { hashPassword } from "@src/utils/hash-password-utils";
import { MapUserToDto } from "@src/mappers/user-mappers";

const getAll = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await userService.getAllUsers();
    const userDtos: UserDto[] = users.map((user: User) => MapUserToDto(user));

    return res.status(200).json(userDtos);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

const getById = async (_req: Request, res: Response) => {
  try {
    const user: User = res.locals.user;
    const userDto: UserDto = MapUserToDto(user);

    return res.status(200).json(userDto);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser: User = await userService.addUser({
      ...req.body,
      password: hashedPassword,
    });

    const userDto: UserDto = MapUserToDto(newUser);

    return res.status(201).json(userDto);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  try {
    const user: User = res.locals.user;
    const { newPassword } = req.body;

    const hashedPassword = await hashPassword(newPassword);
    await userService.updatePassword(user.email, hashedPassword);

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const user: User = res.locals.user;
    const { password, token } = req.body;

    const isValidToken = validateToken(
      token,
      `${process.env.PASSWORD_RESET_SECRET}`
    );

    if (isValidToken) {
      const hashedPassword = await hashPassword(password);
      await userService.updatePassword(user.email, hashedPassword);

      return res
        .status(200)
        .json({ message: "Password updated successfully." });
    } else {
      return res.status(400).json({ message: "Token validation failed" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default { getAll, addUser, getById, updatePassword, resetPassword };
