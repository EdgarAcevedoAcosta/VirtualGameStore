import { computed, inject, Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';

import { mensajeDeApi } from './errores';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComprasApi } from './compras-api';
import { Compra, EstadoCompra } from '../modelos/compra';

@Service()
export class CatalogoCompras {
  private readonly recurso = httpResource<Sobre<Compra[]>>(() => `${API_URL}/compras`);
  private readonly compras = computed(() => this.recurso.value()?.data ?? []);
  private readonly apí = inject(ComprasApi);
  private readonly _texto = signal('');

  readonly texto = this._texto.asReadonly();
  readonly cargando = computed(() => this.recurso.isLoading());
  readonly error = computed(() => {
    const e = this.recurso.error();
    return e ? mensajeDeApi(e) : null;
  });

  readonly estado = signal<EstadoCompra | 'Todos'>('Todos');
  readonly seleccionada = signal<Compra | null>(null);

  readonly visibles = computed(() => {
    const cate = this.estado();
    const todas = this.compras();
    return cate === 'Todos' ? todas : todas.filter((u) => u.estado === cate);
  });

  filtrar(estado: EstadoCompra | 'Todos'): void {
    this.estado.set(estado);
    const elegida = this.seleccionada();
    if (elegida && estado !== 'Todos' && elegida.estado !== estado) {
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
          map((compras): Resultado => ({ cargando: false, error: null, compras })),
          catchError((e) =>
            of<Resultado>({ cargando: false, error: mensajeDeApi(e), compras: [] }),
          ),
          startWith<Resultado>({ cargando: false, error: null, compras: [] }),
        ),
      ),
    ),
    { initialValue: { cargando: true, error: null, compras: [] } },
  );

  buscar(texto: string): void {
    (this._texto.set(texto), this.seleccionada.set(null), this.busquedas.next(texto));
  }
}
interface Resultado {
  cargando: boolean;
  error: string | null;
  compras: Compra[];
}
