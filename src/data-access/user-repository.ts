import User from "@src/models/user-model";

const getAllUsers = async () => {
  console.log("GET ALL USERS HITR");
  const users = await User.find();
  return users;
};

const addUser = async () => {
  const newUser = new User({
    email: `${(Math.random() + 1).toString(36).substring(7)}@gmail.com`,
    password: "adasasdasdasdasd",
  });

  newUser
    .save()
    .then((savedUser: any) => {
      console.log("User saved to database:", savedUser);
    })
    .catch((error: any) => {
      console.error("Error saving user to database:", error);
    });
};

export default { addUser, getAllUsers };
