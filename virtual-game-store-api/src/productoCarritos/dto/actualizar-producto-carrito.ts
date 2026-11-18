import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDecimal,
  IsInt,
} from 'class-validator';

export class ActualizarProductoCarritoDto {
  @IsInt()
  @IsOptional()
  idCarrito?: number;

  @IsInt()
  @IsOptional()
  idProducto?: number;

  @IsInt()
  @IsOptional()
  cantidad?: number;
}
