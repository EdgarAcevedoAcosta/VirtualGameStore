import {
  IsOptional,
  IsNotEmpty,
  IsDecimal,
  MaxLength,
  IsInt,
} from 'class-validator';
export class ActualizarCarritoDto {
  @IsInt()
  @IsOptional()
  idUsuario?: number;

  @IsDecimal()
  @IsNotEmpty()
  total?: number;
}
