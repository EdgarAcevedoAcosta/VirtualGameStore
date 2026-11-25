import { computed, Service, signal } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { httpResource } from '@angular/common/http';
import { Sobre } from '../modelos/producto';
import { API_URL } from '../config';
import { mensajeDeApi } from './errores';

@Service()
export class CatalogoCategorias {
  private readonly recurso = httpResource<Sobre<Categoria[]>>(() => `${API_URL}/categorias`);
  readonly categorias = computed(() => this.recurso.value()?.data ?? []);
  readonly opciones = computed(() => [null, ...this.categorias()]);
  private readonly _texto = signal('');

  readonly texto = this._texto.asReadonly();
  readonly cargando = computed(() => this.recurso.isLoading());
  readonly error = computed(() => {
    const error = this.recurso.error();
    return error ? mensajeDeApi(error) : null;
  });
  readonly nombre = signal<string>('Todos');
  readonly seleccionada = signal<Categoria | null>(null);

  readonly visibles = computed(() => {
    const nombre = this.nombre();
    const texto = this._texto().trim().toLocaleLowerCase();
    return this.categorias().filter(
      (categoria) =>
        (nombre === 'Todos' || categoria.nombre === nombre) &&
        categoria.nombre.toLocaleLowerCase().includes(texto),
    );
  });

  seleccionar(categoria: Categoria): void {
    this.seleccionada.update((actual) =>
      actual?.idCategoria === categoria.idCategoria ? null : categoria,
    );
  }

  filtrar(nombre: string): void {
    this.nombre.set(nombre);
    const elegida = this.seleccionada();
    if (elegida && nombre !== 'Todos' && elegida.nombre !== nombre) {
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
