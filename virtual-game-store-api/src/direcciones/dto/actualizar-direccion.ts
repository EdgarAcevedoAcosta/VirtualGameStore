import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsInt,
} from 'class-validator';
export class ActualizarDireccionDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  calle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  ciudad?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  codigoPostal?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  pais?: string;

  @IsOptional()
  @IsInt()
  idUsuario?: number;
}
