import { ActualizarCarritoDto } from '../dto/actualizar-carrito';
import { AnadirCarritoDto } from '../dto/añadir-carrito';
import { Carrito } from './entidades';

export interface CarritoRepository {
  listar(): Promise<Carrito[]>;
  buscarPorId(id: number): Promise<Carrito | null>;
  crearCarrito(datos: AnadirCarritoDto): Promise<Carrito>;
  actualizarCarrito(
    id: number,
    datos: ActualizarCarritoDto,
  ): Promise<Carrito | null>;
  //eliminarCategoria(id: number): Promise<boolean>;
}
