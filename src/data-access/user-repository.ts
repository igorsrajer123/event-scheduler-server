import User from "@src/models/user-model";

const addUser = async (userData: typeof User) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export default { addUser, getAllUsers };
