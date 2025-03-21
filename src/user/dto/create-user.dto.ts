import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
  
  @IsEmail(  )
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  status: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}