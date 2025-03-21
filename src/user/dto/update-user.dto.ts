import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({message: 'este caracter no puede tener muchas vainas estrañas'})
  @MaxLength(50)
  @IsOptional()
  name: string;

  @IsString()
  // @Matches('')
  @MaxLength(50)
  @IsOptional()
  lastname: string;
  
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email: string;

  @MinLength(8)
  @IsOptional()
  password: string;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
