import { User } from "@src/types/user-types";
import UserModel from "@src/models/user-model";

const getAllUsers = async (): Promise<User[]> => {
  return await UserModel.find();
};

const getById = async (id: string): Promise<User | null> => {
  return await UserModel.findById(id);
};

const getByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

const addUser = async (userData: User): Promise<User> => {
  const newUser = new UserModel(userData);
  return await newUser.save();
};

const updateUser = async (
  id: string,
  userData: Pick<User, "fullName" | "phoneNumber">
): Promise<User | null> => {
  return await UserModel.findByIdAndUpdate(id, { ...userData });
};

const updatePassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  return await UserModel.findOneAndUpdate({ email }, { password });
};

export default {
  addUser,
  getAllUsers,
  getByEmail,
  getById,
  updatePassword,
  updateUser,
};
