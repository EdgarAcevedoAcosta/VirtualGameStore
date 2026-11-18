import {
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  IsDecimal,
} from 'class-validator';
export class AnadirCarritoDto {
  @IsInt()
  @IsOptional()
  idUsuario: number;

  @IsDecimal()
  @IsNotEmpty()
  total: number;
}
