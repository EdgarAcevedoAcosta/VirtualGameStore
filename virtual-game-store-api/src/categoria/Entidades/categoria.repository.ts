import { CrearCategoriaDto } from '../dto/crear-Categoria';
import { editarCategoriaDto } from '../dto/editar-categoria';
import { Categoria } from './entidades';

export interface CategoriaRepository {
  listar(): Promise<Categoria[]>;
  buscarPorId(id: number): Promise<Categoria | null>;
  crearCategoria(datos: CrearCategoriaDto): Promise<Categoria>;
  editarCategoria(
    id: number,
    datos: editarCategoriaDto,
  ): Promise<Categoria | null>;
  eliminarCategoria(id: number): Promise<boolean>;
}
