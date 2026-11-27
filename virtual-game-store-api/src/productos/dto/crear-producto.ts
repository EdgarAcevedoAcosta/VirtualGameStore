import {
  ArrayUnique,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
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

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  imagenUrl: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  categorias?: number[];

  @IsOptional()
  @IsString()
  estado?: string;
}
