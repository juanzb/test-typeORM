import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, MaxLength, MinLength, minLength } from "class-validator";

export class CreateUserDto {
  @IsString({message: 'este caracter no puede tener muchas vainas estrañas'})
  @MaxLength(50)
  name: string;

  @IsString()
  // @Matches('')
  @MaxLength(50)
  lastname: string;
  
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNumber()
  status: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
