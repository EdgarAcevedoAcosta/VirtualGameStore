import { httpResource } from '@angular/common/http';
import { computed, Service, signal } from '@angular/core';
import { EstadoProducto, Producto, Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { mensajeDeApi } from './errores';

@Service()
export class CatalogoProductos {
  private readonly recurso = httpResource<Sobre<Producto[]>>(() => `${API_URL}/productos`);
  private readonly productos = computed(() => this.recurso.value()?.data ?? []);
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
  readonly categoriaId = signal<number | null>(null);
  readonly seleccionada = signal<Producto | null>(null);

  readonly visibles = computed(() => {
    const estado = this.estado();
    const categoriaId = this.categoriaId();
    const texto = this._texto().trim().toLocaleLowerCase();
    return this.productos().filter((producto) =>
        (estado === 'Todas' || producto.estado === estado) &&
        (categoriaId === null ||
          producto.categorias.some((item) => item.idCategoria === categoriaId)) &&
        producto.nombre.toLocaleLowerCase().includes(texto),
    );
  });
  filtrar(estado: EstadoProducto | 'Todas'): void {
    this.estado.set(estado);
    const elegida = this.seleccionada();
    if (elegida && estado !== 'Todas' && elegida.estado !== estado) {
      this.seleccionada.set(null);
    }
  }

  filtrarCategoria(idCategoria: number | null): void {
    this.categoriaId.set(idCategoria);
    const elegida = this.seleccionada();
    if (
      elegida &&
      idCategoria !== null &&
      !elegida.categorias.some((item) => item.idCategoria === idCategoria)
    ) {
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
