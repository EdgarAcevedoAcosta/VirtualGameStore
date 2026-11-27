import { IsOptional, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;
}
