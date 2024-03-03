import User from "@src/models/user-model";
import mongoose from "mongoose";

const addUser = async (userData: typeof User) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const getByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const getAllUsers = async () => {
  return await User.find();
};

const getById = async (id: string) => {
  return await User.findById(id);
};

const updatePassword = async (email: string, password: string) => {
  return await User.findOneAndUpdate({ email: email }, { password });
};

export default { addUser, getAllUsers, getByEmail, getById, updatePassword };
