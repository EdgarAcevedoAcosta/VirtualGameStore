import { Injectable } from '@nestjs/common';
import { Producto } from '../Entidades/entidades';
import { ActualizarProductoDto } from '../dto/actualizar-produto';
import { CrearProductoDto } from '../dto/crear-producto';
import { Categoria } from '../../categoria/Entidades/entidades';

@Injectable()
export class ProductoMemoriaRepository {
  private productos: Producto[] = [];
  private idSiguiente = 1;
  async listar(): Promise<Producto[]> {
    return this.productos;
  }
  async buscarPorId(idProducto: number): Promise<Producto | null> {
    return this.productos.find((p) => p.idProducto === idProducto) ?? null;
  }
  async crearProducto(datos: CrearProductoDto): Promise<Producto> {
    const nuevo: Producto = {
      idProducto: this.idSiguiente++,
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      precio: datos.precio,
      stock: datos.stock,
      estado: datos.estado,
      categoria: datos.categoria as unknown as Categoria[],
      imagenUrl: datos.imagenUrl,
    };

    this.productos.push(nuevo);
    return nuevo;
  }
  async actualizarProducto(
    idProducto: number,
    datos: ActualizarProductoDto,
  ): Promise<Producto | null> {
    const producto = this.productos.find((p) => p.idProducto === idProducto);
    if (!producto) return null;
    if (datos.nombre !== undefined) {
      producto.nombre = datos.nombre;
    }
    if (datos.descripcion !== undefined) {
      producto.descripcion = datos.descripcion;
    }
    if (datos.precio !== undefined) {
      producto.precio = datos.precio;
    }
    if (datos.stock !== undefined) producto.stock = datos.stock;
    if (datos.estado !== undefined) producto.estado = datos.estado;
    if (datos.imagenUrl !== undefined) producto.imagenUrl = datos.imagenUrl;
    if (datos.categoria !== undefined)
      producto.categoria = datos.categoria as unknown as Categoria[];

    return producto;
  }
  async eliminarProducto(idProducto: number): Promise<boolean> {
    const i = this.productos.findIndex((p) => p.idProducto === idProducto);
    if (i === -1) {
      return false;
    }
    const [eliminado] = this.productos.slice(i, 1);
    return true;
  }
}
