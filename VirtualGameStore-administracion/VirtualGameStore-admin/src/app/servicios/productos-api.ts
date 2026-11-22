import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Producto, ProductoNuevo, Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { map } from 'rxjs';

@Service()
export class ProductosApi {
  private readonly http = inject(HttpClient);
  crear(datos: ProductoNuevo) {
    return this.http.post<Sobre<Producto>>(`${API_URL}/productos`, datos).pipe(map((r) => r.data));
  }
  obtener(idProducto: number) {
    return this.http
      .get<Sobre<Producto>>(`${API_URL}/productos/${idProducto}`)
      .pipe(map((r) => r.data));
  }
  actualizar(idProducto: number, datos: ProductoNuevo) {
    return this.http
      .patch<Sobre<Producto>>(`${API_URL}/productos/${idProducto}`, datos)
      .pipe(map((r) => r.data));
  }
  eliminar(idProducto: number) {
    return this.http
      .delete<Sobre<Producto>>(`${API_URL}/productos/${idProducto}`)
      .pipe(map((r) => r.data));
  }
  listar(q = '') {
    const params = q ? { q } : undefined;
    return this.http
      .get<Sobre<Producto[]>>(`${API_URL}/productos`, { params })
      .pipe(map((r) => r.data));
  }
}
