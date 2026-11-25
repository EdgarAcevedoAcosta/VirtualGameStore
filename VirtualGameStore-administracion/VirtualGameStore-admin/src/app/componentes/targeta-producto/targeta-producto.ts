import { Component, inject, input, output, signal } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { RouterLink } from '@angular/router';
import { CatalogoProductos } from '../../servicios/catalogo-productos';
import { ProductosApi } from '../../servicios/productos-api';
import { mensajeDeApi } from '../../servicios/errores';

@Component({
  imports: [RouterLink],
  selector: 'app-targeta-producto',
  styleUrl: './targeta-producto.css',
  templateUrl: './targeta-producto.html',
})
export class TargetaProducto {
  readonly producto = input.required<Producto>();
  readonly activa = input(false);
  readonly seleccionar = output<Producto>();

  protected readonly catalogoProductos = inject(CatalogoProductos);
  private readonly api = inject(ProductosApi);
  protected readonly eliminando = signal(false);
  protected readonly errorEliminar = signal<string | null>(null);

  eliminar(idProducto: number): void {
    if (this.eliminando() || !confirm(`Estas Seguro de Eliminar esta Categoria???`)) return;
    this.errorEliminar.set(null);
    this.eliminando.set(true);
    this.api.eliminar(idProducto).subscribe({
      next: () => {
        this.catalogoProductos.recargar();
        this.eliminando.set(false);
      },
      error: (e) => {
        this.errorEliminar.set(mensajeDeApi(e));
        this.eliminando.set(false);
      },
    });
  }
}
