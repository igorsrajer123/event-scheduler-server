import { User } from "@src/types/user-types";
import userRepository from "@src/data-access/user-repository";

const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.getAllUsers();
};

const getById = async (id: string): Promise<User | null> => {
  return await userRepository.getById(id);
};

const getByEmail = async (email: string): Promise<User | null> => {
  return await userRepository.getByEmail(email);
};

const addUser = async (userData: User): Promise<User> => {
  return await userRepository.addUser(userData);
};

const updateUser = async (
  id: string,
  userData: Pick<User, "fullName" | "phoneNumber">
): Promise<User | null> => {
  return await userRepository.updateUser(id, userData);
};

const updatePassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  return await userRepository.updatePassword(email, password);
};

export default {
  getAllUsers,
  addUser,
  getByEmail,
  getById,
  updatePassword,
  updateUser,
};
