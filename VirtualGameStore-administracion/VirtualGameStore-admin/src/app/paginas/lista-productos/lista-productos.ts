import { Component, inject } from '@angular/core';
import { TargetaProducto } from '../../componentes/targeta-producto/targeta-producto';
import { FiltroCategorias } from '../../componentes/filtro-categorias/filtro-categorias';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CatalogoProductos } from '../../servicios/catalogo-productos';
import { API_URL } from '../../config';
import { ProductosApi } from '../../servicios/productos-api';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [TargetaProducto, FiltroCategorias, RouterLink, ReactiveFormsModule],
  selector: 'app-lista-productos',
  styleUrl: './lista-productos.css',
  templateUrl: './lista-productos.html',
})
export class ListaProductos {
  protected readonly catalogoProd = inject(CatalogoProductos);
  protected readonly apiUrl = API_URL;
  private readonly api = inject(ProductosApi);
  protected readonly busqueda = new FormControl(this.catalogoProd.texto(), { nonNullable: true });
  constructor() {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(200),
        map((t) => t.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => this.catalogoProd.buscar(texto));
  }
  eliminar(idProducto: number): void {
    if (!confirm(`Estas Seguro de Eliminar el Producto???`)) return;
    this.api.eliminar(idProducto).subscribe({
      next: () => {
        this.catalogoProd.recargar();
      },
      error: () => {},
    });
  }
}
