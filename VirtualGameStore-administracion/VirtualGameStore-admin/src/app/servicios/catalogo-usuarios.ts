import { computed, inject, Service, signal } from '@angular/core';
import { Rol, Usuario } from '../modelos/usuario';
import { httpResource } from '@angular/common/http';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { UsuariosApi } from './usuarios-api';
import { mensajeDeApi } from './errores';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Service()
export class CatalogoUsuarios {
  private readonly recurso = httpResource<Sobre<Usuario[]>>(() => `${API_URL}/usuarios`);
  private readonly usuarios = computed(() => this.recurso.value()?.data ?? []);
  private readonly apí = inject(UsuariosApi);
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
    const todas = this.usuarios();
    return cate === 'Todos' ? todas : todas.filter((u) => u.rol === cate);
  });

  filtrar(rol: Rol | 'Todos'): void {
    this.rol.set(rol);
    const elegida = this.seleccionada();
    if (elegida && rol !== 'Todos' && elegida.rol !== rol) {
      this.seleccionada.set(null);
    }
  }
  private readonly busquedas = new BehaviorSubject<string>('');

  recargar(): void {
    this.seleccionada.set(null);
    this.busquedas.next(this.busquedas.value);
    this.recurso.reload();
  }

  private readonly resultado = toSignal(
    this.busquedas.pipe(
      switchMap((q) =>
        this.apí.listar(q).pipe(
          map((usuarios): Resultado => ({ cargando: false, error: null, usuarios })),
          catchError((e) =>
            of<Resultado>({ cargando: false, error: mensajeDeApi(e), usuarios: [] }),
          ),
          startWith<Resultado>({ cargando: false, error: null, usuarios: [] }),
        ),
      ),
    ),
    { initialValue: { cargando: true, error: null, usuarios: [] } },
  );

  buscar(texto: string): void {
    (this._texto.set(texto), this.seleccionada.set(null), this.busquedas.next(texto));
  }
}
interface Resultado {
  cargando: boolean;
  error: string | null;
  usuarios: Usuario[];
}
