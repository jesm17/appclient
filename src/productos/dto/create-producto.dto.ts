import {
  IsNumber,
  MaxLength,
  MinLength,
  Min,
  IsDecimal,
} from 'class-validator';

export class CreateProductoDto {
  @MinLength(3, {
    message: ' El nombre del producto debe de ser minimo: $constraint1',
  })
  @MaxLength(100, {
    message: ' El nombre del producto debe ser menor a: $constraint1',
  })
  nombre: string;

  @MinLength(0)
  @MaxLength(150, {
    message: ' La descripcion del producto debe ser menor a: $constraint1',
  })
  descripcion: string;

  @Min(1000, { message: ' El precio minimo es: $constraint1' })
  precio: number;
}
