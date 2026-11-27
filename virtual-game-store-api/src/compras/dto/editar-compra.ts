import { IsOptional, IsString, MaxLength, IsInt } from 'class-validator';
export class ActualizarCompraDto {
  @IsInt()
  @IsOptional()
  idUsuario?: number;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  estado?: string;
}
