import { computed, Service, signal } from '@angular/core';
import { Rol, Usuario } from '../modelos/usuario';
import { httpResource } from '@angular/common/http';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { mensajeDeApi } from './errores';

@Service()
export class CatalogoUsuarios {
  private readonly recurso = httpResource<Sobre<Usuario[]>>(() => `${API_URL}/usuarios`);
  private readonly usuarios = computed(() => this.recurso.value()?.data ?? []);
  private readonly _texto = signal('');

  readonly texto = this._texto.asReadonly();
  readonly cargando = computed(() => this.recurso.isLoading());
  readonly error = computed(() => {
    const e = this.recurso.error();
    return e ? mensajeDeApi(e) : null;
  });

  seleccionar(usuario: Usuario): void {
    this.seleccionada.update((actual) =>
      actual?.idUsuario === usuario.idUsuario ? null : usuario,
    );
  }

  readonly rol = signal<Rol | 'Todos'>('Todos');
  readonly seleccionada = signal<Usuario | null>(null);

  readonly visibles = computed(() => {
    const cate = this.rol();
    const texto = this._texto().trim().toLocaleLowerCase();
    return this.usuarios().filter(
      (usuario) =>
        (cate === 'Todos' || usuario.rol === cate) &&
        usuario.nombre.toLocaleLowerCase().includes(texto),
    );
  });

  filtrar(rol: Rol | 'Todos'): void {
    this.rol.set(rol);
    const elegida = this.seleccionada();
    if (elegida && rol !== 'Todos' && elegida.rol !== rol) {
      this.seleccionada.set(null);
    }
  }
  recargar(): void {
    this.seleccionada.set(null);
    this.recurso.reload();
  }

  buscar(texto: string): void {
    this._texto.set(texto);
    this.seleccionada.set(null);
  }
}
