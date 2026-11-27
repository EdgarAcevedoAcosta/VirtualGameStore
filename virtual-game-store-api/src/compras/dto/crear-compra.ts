import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  Min,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CrearCompraDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  idUsuario: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  idDireccion: number;

  @IsDateString()
  fecha: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  estado: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  idCarrito: number;
}

export type CrearCompraDatos = Omit<CrearCompraDto, 'fecha'> & { fecha: Date };
