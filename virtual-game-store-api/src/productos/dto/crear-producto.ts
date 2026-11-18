import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDecimal,
  IsInt,
} from 'class-validator';
//import { Categoria } from "../dominio/entidades";
export class CrearProductoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  descripcion: string;

  @IsDecimal()
  @IsNotEmpty()
  precio: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  imagenUrl: string;
}
