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

const getById = async (id: mongoose.Types.ObjectId) => {
  console.log(id);
  const usr = await User.findById(id);
  console.log(usr);
  return usr;
};

const updatePassword = async (id: string, password: string) => {
  return await User.findByIdAndUpdate(id, { password });
};

export default { addUser, getAllUsers, getByEmail, getById, updatePassword };
