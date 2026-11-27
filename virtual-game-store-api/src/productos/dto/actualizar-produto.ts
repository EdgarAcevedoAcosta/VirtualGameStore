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
export class ActualizarProductoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  precio?: number;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  stock?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  imagenUrl?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  categorias?: number[];

  @IsOptional()
  @IsString()
  @MaxLength(7)
  estado?: string;
}
