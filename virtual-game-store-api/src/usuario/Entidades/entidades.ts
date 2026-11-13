import { Carrito } from 'src/carrito-compras/Entidades/entidades';
import { Direccion } from '../../direccion/Entidades/entidades';
import { Compra } from 'src/generated/prisma/client';
export interface Usuario {
  idusuario?: number;
  nombre: string;
  correo: string;
  passwordHash: string;
  rol?: string;
  direcciones?: Direccion[] | null;
  activo: string;
  creadoEn?: Date;
  carrito?: Carrito[];
  compras?: Compra[];
}
export type EstadoActivoUsuario = 'activo' | 'inactivo';
export type rolUsuario = 'admin' | 'cliente';
