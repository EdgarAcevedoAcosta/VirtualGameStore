export interface Categoria {
  idCategoria: number;
  nombre: string;
}
export type CategoriaNueva = Omit<Categoria, 'idCategoria'>;

export type Cat = 'RPG' | 'Shooter' | 'Deportes' | 'Aventura' | 'Indie' | 'Acción';
export const CATEGORIAS: Cat[] = ['RPG', 'Shooter', 'Deportes', 'Aventura', 'Indie', 'Acción'];
