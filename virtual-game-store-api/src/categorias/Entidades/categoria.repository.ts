import { CrearCategoriaDto } from '../dto/crear-Categoria';
import { editarCategoriaDto } from '../dto/editar-categoria';
import { Categoria } from './entidades';

export interface CategoriaRepository {
  listar(): Promise<Categoria[]>;
  buscarPorId(id: number): Promise<Categoria | null>;
  crear(datos: CrearCategoriaDto): Promise<Categoria>;
  editar(id: number, datos: editarCategoriaDto): Promise<Categoria | null>;
  eliminar(id: number): Promise<boolean>;
}
