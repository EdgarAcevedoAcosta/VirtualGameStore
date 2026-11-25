import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Usuario, UsuarioNuevo } from '../modelos/usuario';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { map } from 'rxjs';

@Service()
export class UsuariosApi {
  private readonly http = inject(HttpClient);
  crear(datos: UsuarioNuevo) {
    return this.http.post<Sobre<Usuario>>(`${API_URL}/usuarios`, datos).pipe(map((r) => r.data));
  }
  obtener(idUsuario: number) {
    return this.http
      .get<Sobre<Usuario>>(`${API_URL}/usuarios/${idUsuario}`)
      .pipe(map((r) => r.data));
  }
  actualizar(idUsuario: number, datos: UsuarioNuevo) {
    return this.http
      .patch<Sobre<Usuario>>(`${API_URL}/usuarios/${idUsuario}`, datos)
      .pipe(map((r) => r.data));
  }
  eliminar(idUsuario: number) {
    return this.http
      .delete<Sobre<boolean>>(`${API_URL}/usuarios/${idUsuario}`)
      .pipe(map((r) => r.data));
  }
  listar(q = '') {
    const params = q ? { q } : undefined;
    return this.http
      .get<Sobre<Usuario[]>>(`${API_URL}/usuarios`, { params })
      .pipe(map((r) => r.data));
  }
}
