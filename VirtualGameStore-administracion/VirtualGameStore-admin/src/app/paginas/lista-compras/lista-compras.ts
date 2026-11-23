import { Component, inject } from '@angular/core';
import { TargetaCompra } from '../../componentes/targeta-compra/targeta-compra';
import { FiltroCompras } from '../../componentes/filtro-compras/filtro-compras';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CatalogoCompras } from '../../servicios/catalogo-compras';
import { API_URL } from '../../config';
import { ComprasApi } from '../../servicios/compras-api';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [TargetaCompra, FiltroCompras, RouterLink, ReactiveFormsModule],
  selector: 'app-lista-compras',
  styleUrl: './lista-compras.css',
  templateUrl: './lista-compras.html',
})
export class ListaCompras {
  protected readonly catalogoCompra = inject(CatalogoCompras);
  protected readonly apiUrl = API_URL;
  private readonly api = inject(ComprasApi);
  protected readonly busqueda = new FormControl(this.catalogoCompra.texto(), { nonNullable: true });
  constructor() {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(200),
        map((t) => t.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => this.catalogoCompra.buscar(texto));
  }
  eliminar(idCompra: number): void {
    if (!confirm(`Estas Seguro de Eliminar esta Compra???`)) return;
    this.api.eliminar(idCompra).subscribe({
      next: () => {
        this.catalogoCompra.recargar();
      },
      error: () => {},
    });
  }
}
