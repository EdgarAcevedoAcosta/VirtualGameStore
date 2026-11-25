import { computed, inject, Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { mensajeDeApi } from './errores';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Direccion, Usuario } from '../modelos/direccion';
import { DireccionesApi } from './direcciones-api';

@Service()
export class CatalogoDirecciones {
  private readonly recurso = httpResource<Sobre<Direccion[]>>(() => `${API_URL}/direcciones`);
  private readonly direcciones = computed(() => this.resultado().direcciones);
  private readonly apí = inject(DireccionesApi);
  private readonly _texto = signal('');

  readonly texto = this._texto.asReadonly();
  readonly cargando = computed(() => this.resultado().cargando);
  readonly error = computed(() => this.resultado().error);

  readonly usuario = signal<Usuario | 'Todos'>('Todos');
  readonly seleccionada = signal<Direccion | null>(null);
  seleccionar(direccion: Direccion): void {
    this.seleccionada.update((actual) =>
      actual?.idDireccion === direccion.idDireccion ? null : direccion,
    );
  }

  readonly visibles = computed(() => {
    //const cate = this.usuario();
    const todas = this.direcciones();
    return todas;
  });

  /*
  filtrar(rol: Rol | 'Todos'): void {
    this.rol.set(rol);
    const elegida = this.seleccionada();
    if (elegida && rol !== 'Todos' && elegida.rol !== rol) {
      this.seleccionada.set(null);
    }
  }*/

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
          map((direcciones): Resultado => ({ cargando: false, error: null, direcciones })),
          catchError((e) =>
            of<Resultado>({ cargando: false, error: mensajeDeApi(e), direcciones: [] }),
          ),
          startWith<Resultado>({ cargando: false, error: null, direcciones: [] }),
        ),
      ),
    ),
    { initialValue: { cargando: true, error: null, direcciones: [] } },
  );

  buscar(texto: string): void {
    (this._texto.set(texto), this.seleccionada.set(null), this.busquedas.next(texto));
  }
}
interface Resultado {
  cargando: boolean;
  error: string | null;
  direcciones: Direccion[];
}
