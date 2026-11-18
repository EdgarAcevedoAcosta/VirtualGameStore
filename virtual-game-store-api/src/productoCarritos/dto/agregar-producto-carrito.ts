import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDecimal,
  IsInt,
} from 'class-validator';

export class AgregarProductoCarritoDto {
  @IsInt()
  @IsNotEmpty()
  idCarrito: number;

  @IsInt()
  @IsNotEmpty()
  idProducto: number;

  @IsInt()
  @IsNotEmpty()
  cantidad: number;
}
