import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  name: string;
  
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
