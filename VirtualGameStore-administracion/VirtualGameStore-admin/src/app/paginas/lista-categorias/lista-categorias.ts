import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-lista-categorias',
  styleUrl: './lista-categorias.css',
  templateUrl: './lista-categorias.html',
})
export class ListaCategorias {
  protected readonly catalogoDirec = inject(CatalogoDirecciones);
  protected readonly apiUrl = API_URL;
  private readonly api = inject(DireccionesApi);
  protected readonly busqueda = new FormControl(this.catalogoDirec.texto(), { nonNullable: true });
  constructor() {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(200),
        map((t) => t.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => this.catalogoDirec.buscar(texto));
  }
  eliminar(idDireccion: number): void {
    if (!confirm(`Estas Seguro de Eliminar esta Direccion???`)) return;
    this.api.eliminar(idDireccion).subscribe({
      next: () => {
        this.catalogoDirec.recargar();
      },
      error: () => {},
    });
  }
}
