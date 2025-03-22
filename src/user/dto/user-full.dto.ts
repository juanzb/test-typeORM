import { User } from "../entities/user.entity";
import { UserPass } from "../entities/user-pass.entity";

export class UserEntity implements User, UserPass {
  id: number;
  userId: number;
  user: User;
  password: string;
  createPassdAt: Date;
  updatePassdAt: Date;
  name: string;
  lastname: string;
  identityNum: string;
  cellphoneNum: string;
  age: number;
  gender: number;
  birthdate: Date;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}