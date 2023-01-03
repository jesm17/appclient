import { MinLength, IsEmail, MaxLength } from 'class-validator';
export class CreateUserDto {
  @MinLength(5, {
    message: ` El minino de caracteres para el nombre de usuario es: $constraint1`,
  })
  @MaxLength(100, {
    message:
      ' El maximo de caracteres para el nombre de usuario es: $constraint1',
  })
  username: string;

  @IsEmail(undefined, {
    always: true,
    message: ' El correo electronico debe de contener @example.com',
  })
  email: string;

  @MinLength(8, {
    message: ' la contraseña debe ser de minimo 8 caracteres ',
  })
  password: string;
  rol: string;
  image?: string;
}
