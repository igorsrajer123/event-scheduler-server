const userRepository = require("./../data-access/user-repository");

const getAllUsers = async (req: any, res: any) => {
  const users = await userRepository.getAllUsers();
  return users;
};

const addUser = async () => {
  await userRepository.addUser();
};

module.exports = { getAllUsers, addUser };
