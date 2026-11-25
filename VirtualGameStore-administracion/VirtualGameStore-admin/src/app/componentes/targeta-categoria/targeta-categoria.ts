import { Component, inject, input, output, signal } from '@angular/core';
import { Categoria } from '../../modelos/categoria';
import { RouterLink } from '@angular/router';
import { CatalogoCategorias } from '../../servicios/catalogo-categorias';
import { CategoriasApi } from '../../servicios/categorias-api';
import { mensajeDeApi } from '../../servicios/errores';

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
  protected readonly eliminando = signal(false);
  protected readonly errorEliminar = signal<string | null>(null);

  eliminar(idCategoria: number): void {
    if (this.eliminando() || !confirm(`Estas Seguro de Eliminar esta Categoria???`)) return;
    this.errorEliminar.set(null);
    this.eliminando.set(true);
    this.api.eliminar(idCategoria).subscribe({
      next: () => {
        this.catalogoCate.recargar();
        this.eliminando.set(false);
      },
      error: (e) => {
        this.errorEliminar.set(mensajeDeApi(e));
        this.eliminando.set(false);
      },
    });
  }
}
