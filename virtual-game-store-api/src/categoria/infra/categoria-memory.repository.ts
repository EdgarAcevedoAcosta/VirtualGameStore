import { Injectable } from '@nestjs/common';
import { Categoria } from '../Entidades/entidades';
import { CrearCategoriaDto } from '../dto/crear-Categoria';
import { editarCategoriaDto } from '../dto/editar-categoria';

@Injectable()
export class CategoriaMemoriaRepository {
  private categorias: Categoria[] = [];
  private idSiguiente = 1;
  async listar(): Promise<Categoria[]> {
    return this.categorias;
  }
  async buscarPorId(id: number): Promise<Categoria | null> {
    return this.categorias.find((d) => d.idCategoria === id) ?? null;
  }
  async crearCategoria(datos: CrearCategoriaDto): Promise<Categoria> {
    const nuevo: Categoria = {
      idCategoria: this.idSiguiente++,
      nombre: datos.nombre,
    };

    this.categorias.push(nuevo);
    return nuevo;
  }
  async editarCategoria(
    id: number,
    datos: editarCategoriaDto,
  ): Promise<Categoria | null> {
    const categ = this.categorias.find((d) => d.idCategoria === id);
    if (!categ) return null;
    if (datos.nombre !== undefined) {
      categ.nombre = datos.nombre;
    }
    return categ;
  }

  async eliminarCategoria(id: number): Promise<boolean> {
    const i = this.categorias.findIndex((d) => d.idCategoria === id);
    if (i === -1) {
      return false;
    }
    const [eliminado] = this.categorias.slice(i, 1);
    return true;
  }
}
