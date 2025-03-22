import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/,
    {
      message: 'El nombre no es valido',
    }
  )
  @IsOptional()
  name: string;

  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/,
    {
      message: 'El epellido no es valido',
    }
  )
  @IsOptional()
  lastname: string;
  
  @IsString()
  @MaxLength(10)
  @IsOptional()
  identityNum: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  cellphoneNum: string;

  @IsNumber()
  @Min(18)
  @Max(100)
  @IsOptional()
  age: number;

  @IsNumber()
  @Min(1) //1=M, 2=F, 3=Other
  @Max(3)
  @IsOptional()
  gender: number;

  @IsDate()
  @IsOptional()
  @IsOptional()
  birthdate: Date;

  @IsEmail()
  @Matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, {
    message: 'El correo electrónico no es válido.',
  })
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 
    {
      message: "La contraseña debe contener: minimo 8 caracteres, mayuscula, minuscula y numero"
    }
  )
  @IsOptional()
  password: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
