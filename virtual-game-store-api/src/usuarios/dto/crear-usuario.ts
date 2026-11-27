import { EstadoActivoUsuario, rolUsuario } from '../Entidades/entidades';
import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  passwordHash: string;

  @IsOptional()
  rol?: string;

  @IsOptional()
  activo?: string;
}
