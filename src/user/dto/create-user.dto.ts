import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength, minLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/,
    {
      message: 'El nombre no es valido',
    }
  )
  name: string;

  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/,
    {
      message: 'El epellido no es valido',
    }
  )
  lastname: string;
  
  @IsString()
  @MaxLength(10)
  identityNum: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  cellphoneNum: string;
  
  @IsEmail()
  @Matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, {
    message: 'El correo electrónico no es válido.',
  })
  email: string;
  
  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsNumber()
  @Min(1) //1=M, 2=F, 3=Other
  @Max(3)
  gender: number;

  @IsDate()
  @IsOptional()
  birthdate: Date;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 
    {
      message: "La contraseña debe contener: minimo 8 caracteres, mayuscula, minuscula y numero"
    }
  )
  password: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
