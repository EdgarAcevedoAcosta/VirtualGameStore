import { Injectable } from '@nestjs/common';
import { Compra } from '../Entidades/entidades';
import { CrearCompraDto } from '../dto/crear-compra';
import { Producto } from '../../producto/Entidades/entidades';

@Injectable()
export class CompraMemoriaRepository {
  private compras: Compra[] = [];
  private idSiguiente = 1;
  async listar(): Promise<Compra[]> {
    return this.compras;
  }
  async buscarPorId(id: number): Promise<Compra | null> {
    return this.compras.find((d) => d.idCompra === id) ?? null;
  }
  async crearCompra(datos: CrearCompraDto): Promise<Compra> {
    const idUsuario = datos.idUsuario;
    if (idUsuario === undefined) {
      throw new Error('El id del usuario es obligatorio');
    }
    if (datos.estado === undefined) {
      throw new Error('El estado de la compra es obligatorio');
    }
    if (datos.total === undefined) {
      throw new Error('El total de la compra es obligatorio');
    }
    const nuevo: Compra = {
      idCompra: this.idSiguiente++,
      estado: datos.estado as Compra['estado'],
      productos: datos.productos.map((producto) => ({
        ...producto,
        cantidad: 1,
        precioUnitario: producto.precio,
      })),
      total: datos.total,
      idUsuario: datos.idUsuario,
      fecha: datos.fecha,
    };

    this.compras.push(nuevo);
    return nuevo;
  }

  async eliminarCompra(id: number): Promise<boolean> {
    const i = this.compras.findIndex((d) => d.idCompra === id);
    if (i === -1) {
      return false;
    }
    const [eliminado] = this.compras.slice(i, 1);
    return true;
  }
}
