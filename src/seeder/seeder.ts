import { usersData } from "@src/seeder/user-data";
import User from "@src/models/user-model";
import { User as UserType } from "@src/types/user-types";
import { hashPassword } from "@src/utils/hash-password-utils";

const seedDatabase = async () => {
  try {
    await User.deleteMany();

    const password = await hashPassword("Pass123!");
    usersData.forEach((user) => {
      user.password = password;
    });

    await User.create(usersData);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("[mongo] Error seeding database: ", error);
  }
};

export default seedDatabase;
