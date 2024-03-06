const bcrypt = require("bcrypt");

export async function hashPassword(newPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(newPassword, salt);
}
