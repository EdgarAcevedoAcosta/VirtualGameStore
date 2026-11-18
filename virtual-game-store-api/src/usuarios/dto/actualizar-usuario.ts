import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  passwordHash?: string;

  @IsOptional()
  @IsString()
  rol?: string;

  @IsOptional()
  @IsString()
  activo?: string;
}
