import { IsOptional, IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class editarCategoriaDto {
  @IsString()
  @IsOptional()
  @MaxLength(120)
  nombre?: string;
}
