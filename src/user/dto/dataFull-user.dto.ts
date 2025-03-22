import { IDataFullUser } from "../interfaces/dataFull-user.interface";

export class DataFullUser implements IDataFullUser{
  id: number;
  name: string;
  lastname: string;
  identityNum: string;
  cellphoneNum: string;
  age: number;
  gender: number;
  birthdate: Date;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  createPsswdAt: Date;
  updatePsswdAt: Date;
} 