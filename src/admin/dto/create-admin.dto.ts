import { MinLength } from 'class-validator';

export class CreateAdminDto {
  @MinLength(5, {
    message: 'El nombre de usuario debe ser de minimo 5 caracteres',
  })
  username: string;
  email: string;
  password: string;
  rol: string;
}
