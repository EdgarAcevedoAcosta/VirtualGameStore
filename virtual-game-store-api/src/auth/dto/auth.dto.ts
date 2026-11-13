import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class RegistroDto {
  @IsString()
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MaxLength(120)
  nombre: string;

  @IsEmail({}, { message: 'el correo no tiene un formato valido' })
  correo: string;

  // El minimo va aqui, en la frontera. En el Service ya seria tarde.
  @MinLength(8, { message: 'la contrasena debe tener al menos 8 caracteres' })
  password: string;

  @IsOptional() // si no lo mandan, el Service pone "miembro"
  @IsString()
  rol?: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'el correo no tiene un formato valido' })
  correo: string;

  @MinLength(1, { message: 'la contrasena es obligatoria' })
  password: string;
}

export class UsuarioSesionDto {
  correo: string;
  nombre: string;
  rol: string;
}
// Lo que regresa el login. Es de salida: no lleva validaciones.
export class TokenDto {
  access_token: string; // el JWT
  token_type: string; // siempre "Bearer"
  expires_in: number; // segundos de vigencia
  usuario: UsuarioSesionDto; // quien inicio sesion
}
