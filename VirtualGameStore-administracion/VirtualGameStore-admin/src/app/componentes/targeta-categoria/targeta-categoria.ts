import { Component, inject, input, output } from '@angular/core';
import { Categoria } from '../../modelos/categoria';
import { RouterLink } from '@angular/router';
import { CatalogoCategorias } from '../../servicios/catalogo-categorias';
import { CategoriasApi } from '../../servicios/categorias-api';

@Component({
  imports: [RouterLink],
  selector: 'app-targeta-categoria',
  styleUrl: './targeta-categoria.css',
  templateUrl: './targeta-categoria.html',
})
export class TargetaCategoria {
  readonly categoria = input.required<Categoria>();
  readonly activa = input(false);
  readonly seleccionar = output<Categoria>();

  // esto es temporal es para pruebas
  protected readonly catalogoCate = inject(CatalogoCategorias);
  private readonly api = inject(CategoriasApi);

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
