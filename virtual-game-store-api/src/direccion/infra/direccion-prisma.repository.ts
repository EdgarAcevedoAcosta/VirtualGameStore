import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DireccionRepository } from '../Entidades/direccion.repository';
import { Direccion } from '../Entidades/entidades';
import { CrearDireccionDto } from '../dto/crear-direccion';
import { ActualizarDireccionDto } from '../dto/actualizar-direccion';

@Injectable()
export class DireccionPrismaRepository implements DireccionRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Direccion[]> {
    return this.prisma.direccion.findMany();
  }
  buscarPorId(idDireccion: number): Promise<Direccion | null> {
    return this.prisma.direccion.findUnique({ where: { idDireccion } });
  }
  crearDireccion(datos: CrearDireccionDto): Promise<Direccion> {
    return this.prisma.direccion.create({
      data: {
        idDireccion: datos.idDireccion,
        idUsuario: datos.idUsuario,
        calle: datos.calle,
        pais: datos.pais,
        ciudad: datos.ciudad,
        codigoPostal: datos.codigoPostal,
      },
    });
  }
  async actualizarDireccion(
    idDireccion: number,
    datos: ActualizarDireccionDto,
  ): Promise<Direccion | null> {
    const direccion = await this.prisma.direccion.findUnique({
      where: { idDireccion },
    });
    if (!direccion) {
      return null;
    }
    return this.prisma.direccion.update({
      where: { idDireccion },
      data: { 
        calle: datos.calle,
        ciudad: datos.ciudad,
        codigoPostal: datos.codigoPostal,
        idUsuario: datos.idUsuario,  
      },
    });
  }
  async eliminarDireccion(idDireccion: number): Promise<boolean> {
    const i = this.prisma.direccion.findUnique({
      where: { idDireccion },
    });
    if (!i) {
      return false;
    } else {
      this.prisma.direccion.delete({ where: { idDireccion } });
      return true;
    }
  }
}
