import { Role } from "@src/models/user-model";
import { Document } from "mongoose";

export type User = Document & {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  active: boolean;
  role: Role;
};

export type UserDto = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  active: boolean;
  role: Role;
};
