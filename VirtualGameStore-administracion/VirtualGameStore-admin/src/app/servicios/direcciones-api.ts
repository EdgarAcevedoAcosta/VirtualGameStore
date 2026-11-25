import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Direccion, DireccionNueva } from '../modelos/direccion';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { map } from 'rxjs';

@Service()
export class DireccionesApi {
  private readonly http = inject(HttpClient);
  crear(datos: DireccionNueva) {
    return this.http
      .post<Sobre<Direccion>>(`${API_URL}/direcciones`, datos)
      .pipe(map((r) => r.data));
  }
  obtener(idDireccion: number) {
    return this.http
      .get<Sobre<Direccion>>(`${API_URL}/direcciones/${idDireccion}`)
      .pipe(map((r) => r.data));
  }
  actualizar(idDireccion: number, datos: DireccionNueva) {
    return this.http
      .patch<Sobre<Direccion>>(`${API_URL}/direcciones/${idDireccion}`, datos)
      .pipe(map((r) => r.data));
  }
  eliminar(idDireccion: number) {
    return this.http
      .delete<Sobre<boolean>>(`${API_URL}/direcciones/${idDireccion}`)
      .pipe(map((r) => r.data));
  }
  listar(q = '') {
    const params = q ? { q } : undefined;
    return this.http
      .get<Sobre<Direccion[]>>(`${API_URL}/direcciones`, { params })
      .pipe(map((r) => r.data));
  }
}
