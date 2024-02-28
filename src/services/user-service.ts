import userRepository from "@src/data-access/user-repository";

const getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  return users;
};

const addUser = async () => {
  await userRepository.addUser();
};

export default { getAllUsers, addUser };
