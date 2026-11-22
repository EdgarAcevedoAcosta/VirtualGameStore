import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Categoria, CategoriaNueva } from '../modelos/categoria';
import { API_URL } from '../config';
import { Sobre } from '../modelos/producto';
import { map } from 'rxjs';

@Service()
export class CategoriasApi {
  private readonly http = inject(HttpClient);
  crear(datos: CategoriaNueva) {
    return this.http
      .post<Sobre<Categoria>>(`${API_URL}/categorias`, datos)
      .pipe(map((r) => r.data));
  }
  obtener(idCategoria: number) {
    return this.http
      .get<Sobre<Categoria>>(`${API_URL}/categorias/${idCategoria}`)
      .pipe(map((r) => r.data));
  }
  actualizar(idCategoria: number, datos: CategoriaNueva) {
    return this.http
      .patch<Sobre<Categoria>>(`${API_URL}/categorias/${idCategoria}`, datos)
      .pipe(map((r) => r.data));
  }
  eliminar(idCategoria: number) {
    return this.http
      .delete<Sobre<Categoria>>(`${API_URL}/categorias/${idCategoria}`)
      .pipe(map((r) => r.data));
  }
  listar(q = '') {
    const params = q ? { q } : undefined;
    return this.http
      .get<Sobre<Categoria[]>>(`${API_URL}/categorias`, { params })
      .pipe(map((r) => r.data));
  }
}
