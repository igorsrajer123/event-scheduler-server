import userRepository from "@src/data-access/user-repository";
import mongoose from "mongoose";

const addUser = async (userData: any) => {
  return await userRepository.addUser(userData);
};

const getByEmail = async (email: string) => {
  return await userRepository.getByEmail(email);
};

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

const getById = async (id: string) => {
  return await userRepository.getById(id);
};

const updatePassword = async (email: string, password: string) => {
  return await userRepository.updatePassword(email, password);
};

export default { getAllUsers, addUser, getByEmail, getById, updatePassword };
