import { httpResource } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { EstadoProducto, Producto, Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { ProductosApi } from './productos-api';
import { mensajeDeApi } from './errores';
import { Categoria } from '../modelos/categoria';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Service()
export class CatalogoProductos {
  private readonly recurso = httpResource<Sobre<Producto[]>>(() => `${API_URL}/productos`);
  private readonly productos = computed(() => this.recurso.value()?.data ?? []);
  private readonly apí = inject(ProductosApi);
  private readonly _texto = signal('');

  readonly texto = this._texto.asReadonly();
  readonly cargando = computed(() => this.recurso.isLoading());
  readonly error = computed(() => {
    const e = this.recurso.error();
    return e ? mensajeDeApi(e) : null;
  });
  seleccionar(producto: Producto): void {
    this.seleccionada.update((actual) =>
      actual?.idProducto === producto.idProducto ? null : producto,
    );
  }

  readonly estado = signal<EstadoProducto | 'Todas'>('Todas');
  readonly seleccionada = signal<Producto | null>(null);

  readonly visibles = computed(() => {
    const cate = this.estado();
    const todas = this.productos();
    return cate === 'Todas' ? todas : todas.filter((c) => c.estado === cate);
  });
  filtrar(estado: EstadoProducto | 'Todas'): void {
    this.estado.set(estado);
    const elegida = this.seleccionada();
    if (elegida && estado !== 'Todas' && elegida.estado !== estado) {
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
          map((productos): Resultado => ({ cargando: false, error: null, productos })),
          catchError((e) =>
            of<Resultado>({ cargando: false, error: mensajeDeApi(e), productos: [] }),
          ),
          startWith<Resultado>({ cargando: false, error: null, productos: [] }),
        ),
      ),
    ),
    { initialValue: { cargando: true, error: null, productos: [] } },
  );

  buscar(texto: string): void {
    (this._texto.set(texto), this.seleccionada.set(null), this.busquedas.next(texto));
  }
}

interface Resultado {
  cargando: boolean;
  error: string | null;
  productos: Producto[];
}
