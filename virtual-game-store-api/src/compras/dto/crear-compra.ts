export interface CrearCompraDto {
  idUsuario: number;
  idDireccion: number;
  fecha: Date;
  total: number;
  estado: string;
  idCarrito: number;
}
