import { Injectable } from '@nestjs/common';
import { Carrito } from '../Entidades/entidades';
import { AnadirCarritoDto } from '../dto/añadir-carrito';
import { ActualizarCarritoDto } from '../dto/actualizar-carrito';

@Injectable()
export class CarritoMemoriaRepository {
  private carritos: Carrito[] = [];
  private idSiguiente = 1;
  async listar(): Promise<Carrito[]> {
    return this.carritos;
  }
  async buscarPorId(id: number): Promise<Carrito | null> {
    return this.carritos.find((d) => d.idCarrito === id) ?? null;
  }
  async crearCarrito(datos: AnadirCarritoDto): Promise<Carrito> {
    const idUsuario = datos.idUsuario;
    if (idUsuario === undefined) {
      throw new Error('El id del usuario es obligatorio');
    }
    if (datos.total === undefined) {
      throw new Error('El total de la compra es obligatorio');
    }
    const nuevo: Carrito = {
      idCarrito: this.idSiguiente++,
      idUsuario: datos.idUsuario,
      productos: datos.productos ?? [],
      total: datos.total,
    };

    this.carritos.push(nuevo);
    return nuevo;
  }
  async actualizarCarrito(
    id: number,
    datos: ActualizarCarritoDto,
  ): Promise<Carrito | null> {
    const categ = this.carritos.find((c) => c.idCarrito === id);
    if (!categ) return null;
    if (datos.productos !== undefined) {
      categ.productos = datos.productos;
    }
    if (datos.total !== undefined) categ.total = datos.total;
    return categ;
  }

  /*async eliminarCategoria(id: number): Promise<boolean> {
    const i = this.categorias.findIndex((d) => d.idCategoria === id);
    if (i === -1) {
      return false;
    }
    const [eliminado] = this.categorias.slice(i, 1);
    return true;
  }*/
}
