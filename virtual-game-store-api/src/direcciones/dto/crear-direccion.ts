import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsInt,
} from 'class-validator';
export class CrearDireccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  calle: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  codigoPostal: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  pais: string;

  @IsInt()
  @IsNotEmpty()
  idUsuario: number;
}
