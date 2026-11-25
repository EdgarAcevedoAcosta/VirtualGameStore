import { Component, input, output, inject, signal } from '@angular/core';
import { Compra } from '../../modelos/compra';
import { RouterLink } from '@angular/router';
import { CatalogoCompras } from '../../servicios/catalogo-compras';

import { ComprasApi } from '../../servicios/compras-api';
import { mensajeDeApi } from '../../servicios/errores';
@Component({
  imports: [RouterLink],
  selector: 'app-targeta-compra',
  styleUrl: './targeta-compra.css',
  templateUrl: './targeta-compra.html',
})
export class TargetaCompra {
  readonly compra = input.required<Compra>();
  readonly activa = input(false);
  readonly seleccionar = output<Compra>();
  protected readonly catalogoCompra = inject(CatalogoCompras);
  private readonly api = inject(ComprasApi);
  protected readonly eliminando = signal(false);
  protected readonly errorEliminar = signal<string | null>(null);

  eliminar(idCompra: number): void {
    if (this.eliminando() || !confirm(`Estas Seguro de Eliminar esta Compra???`)) return;
    this.errorEliminar.set(null);
    this.eliminando.set(true);
    this.api.eliminar(idCompra).subscribe({
      next: () => {
        this.catalogoCompra.recargar();
        this.eliminando.set(false);
      },
      error: (e) => {
        this.errorEliminar.set(mensajeDeApi(e));
        this.eliminando.set(false);
      },
    });
  }
}
