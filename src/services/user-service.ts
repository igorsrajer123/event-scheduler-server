import userRepository from "@src/data-access/user-repository";

const addUser = async (userData: any) => {
  try {
    // const existingUser = await userRepository.findUserByEmail(userData.email);
    // if (existingUser) {
    //   throw new Error("Email address already exists");
    // }
    return await userRepository.addUser(userData);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  return users;
};

export default { getAllUsers, addUser };
