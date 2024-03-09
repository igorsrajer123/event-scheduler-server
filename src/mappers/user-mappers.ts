import { pick } from "lodash";

import { User, UserDto } from "@src/types/user-types";

export const MapUserToDto = (user: User): UserDto => {
  return pick(user, [
    "id",
    "email",
    "fullName",
    "phoneNumber",
    "active",
    "role",
  ]);
};
