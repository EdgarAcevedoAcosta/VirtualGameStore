import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Compra, CompraNueva } from '../modelos/compra';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { map } from 'rxjs';

@Service()
export class ComprasApi {
  private readonly http = inject(HttpClient);

  // esta nomas la agrege para el formulario pero teoricamente el admin no debe de hacer compras
  crear(datos: CompraNueva) {
    return this.http.post<Sobre<Compra>>(`${API_URL}/compras`, datos).pipe(map((r) => r.data));
  }

  obtener(idCompra: number) {
    return this.http.get<Sobre<Compra>>(`${API_URL}/compras/${idCompra}`).pipe(map((r) => r.data));
  }
  actualizar(idCompra: number, datos: CompraNueva) {
    return this.http
      .patch<Sobre<Compra>>(`${API_URL}/compras/${idCompra}`, datos)
      .pipe(map((r) => r.data));
  }
  eliminar(idCompra: number) {
    return this.http
      .delete<Sobre<Compra>>(`${API_URL}/compras/${idCompra}`)
      .pipe(map((r) => r.data));
  }
  listar(q = '') {
    const params = q ? { q } : undefined;
    return this.http
      .get<Sobre<Compra[]>>(`${API_URL}/compras`, { params })
      .pipe(map((r) => r.data));
  }
}
