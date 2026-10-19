import { Injectable } from '@nestjs/common';
import { Direccion } from '../Entidades/entidades';
import { CrearDireccionDto } from '../dto/crear-direccion';
import { ActualizarDireccionDto } from '../dto/actualizar-direccion';

@Injectable()
export class DireccionMemoriaRepository {
  private direcciones: Direccion[] = [];
  private idSiguiente = 1;
  async listar(): Promise<Direccion[]> {
    return this.direcciones;
  }
  async buscarPorId(id: number): Promise<Direccion | null> {
    return this.direcciones.find((d) => d.idDireccion === id) ?? null;
  }
  async crearProducto(datos: CrearDireccionDto): Promise<Direccion> {
    const idUsuario = datos.idUsuario;
    if (idUsuario === undefined) {
      throw new Error('El id del usuario es obligatorio');
    }
    const nuevo: Direccion = {
      idDireccion: this.idSiguiente++,
      calle: datos.calle,
      ciudad: datos.ciudad,
      codigoPostal: datos.codigoPostal,
      idusuario: idUsuario,
      pais: datos.pais,
    };

    this.direcciones.push(nuevo);
    return nuevo;
  }
  async actualizarDireccion(
    id: number,
    datos: ActualizarDireccionDto,
  ): Promise<Direccion | null> {
    const direccion = this.direcciones.find((d) => d.idDireccion === id);
    if (!direccion) return null;
    if (datos.calle !== undefined) {
      direccion.calle = datos.calle;
    }
    if (datos.ciudad !== undefined) {
      direccion.ciudad = datos.ciudad;
    }
    if (datos.pais !== undefined) {
      direccion.pais = datos.pais;
    }

    return direccion;
  }
  async eliminarDireccion(id: number): Promise<boolean> {
    const i = this.direcciones.findIndex((d) => d.idDireccion === id);
    if (i === -1) {
      return false;
    }
    const [eliminado] = this.direcciones.slice(i, 1);
    return true;
  }
}
