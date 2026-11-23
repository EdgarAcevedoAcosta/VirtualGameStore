import { Component, inject } from '@angular/core';
import { TargetaCategoria } from '../../componentes/targeta-categoria/targeta-categoria';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { API_URL } from '../../config';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogoCategorias } from '../../servicios/catalogo-categorias';
import { CategoriasApi } from '../../servicios/categorias-api';

@Component({
  imports: [TargetaCategoria, RouterLink, ReactiveFormsModule],
  selector: 'app-lista-categorias',
  styleUrl: './lista-categorias.css',
  templateUrl: './lista-categorias.html',
})
export class ListaCategorias {
  protected readonly catalogoCate = inject(CatalogoCategorias);
  protected readonly apiUrl = API_URL;
  private readonly api = inject(CategoriasApi);
  protected readonly busqueda = new FormControl(this.catalogoCate.texto(), { nonNullable: true });
  constructor() {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(200),
        map((t) => t.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => this.catalogoCate.buscar(texto));
  }
  eliminar(idCategoria: number): void {
    if (!confirm(`Estas Seguro de Eliminar esta Categoria???`)) return;
    this.api.eliminar(idCategoria).subscribe({
      next: () => {
        this.catalogoCate.recargar();
      },
      error: () => {},
    });
  }
}
