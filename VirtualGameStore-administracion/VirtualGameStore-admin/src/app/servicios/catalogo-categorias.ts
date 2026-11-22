import { computed, inject, Service, signal } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { httpResource } from '@angular/common/http';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';

import { mensajeDeApi } from './errores';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriasApi } from './categorias-api';
@Service()
export class CatalogoCategorias {
  private readonly recurso = httpResource<Sobre<Categoria[]>>(() => `${API_URL}/categorias`);
  private readonly categoria = computed(() => this.recurso.value()?.data ?? []);
  private readonly apí = inject(CategoriasApi);
  private readonly _texto = signal('');

  readonly texto = this._texto.asReadonly();
  readonly cargando = computed(() => this.recurso.isLoading());
  readonly error = computed(() => {
    const e = this.recurso.error();
    return e ? mensajeDeApi(e) : null;
  });

  readonly seleccionada = signal<Categoria | null>(null);

  readonly visibles = computed(() => {
    const todas = this.categoria();
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
          map((categorias): Resultado => ({ cargando: false, error: null, categorias })),
          catchError((e) =>
            of<Resultado>({ cargando: false, error: mensajeDeApi(e), categorias: [] }),
          ),
          startWith<Resultado>({ cargando: false, error: null, categorias: [] }),
        ),
      ),
    ),
    { initialValue: { cargando: true, error: null, categorias: [] } },
  );

  buscar(texto: string): void {
    (this._texto.set(texto), this.seleccionada.set(null), this.busquedas.next(texto));
  }
}
interface Resultado {
  cargando: boolean;
  error: string | null;
  categorias: Categoria[];
}
