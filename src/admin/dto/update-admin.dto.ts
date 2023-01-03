import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateAdminDto {
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

  password?: string;
  rol: string;
  image?: string;
}
