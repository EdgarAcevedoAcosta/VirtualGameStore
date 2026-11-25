export interface Categoria {
  idCategoria: number;
  nombre: string;
}
export type CategoriaNueva = Omit<Categoria, 'idCategoria'>;
