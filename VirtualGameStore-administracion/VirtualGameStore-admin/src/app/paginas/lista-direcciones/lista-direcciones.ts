import { Component, inject } from '@angular/core';
import { TargetaDirecion } from '../../componentes/targeta-direcion/targeta-direcion';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CatalogoDirecciones } from '../../servicios/catalogo-direcciones';
import { DireccionesApi } from '../../servicios/direcciones-api';
import { API_URL } from '../../config';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [TargetaDirecion, RouterLink, ReactiveFormsModule],
  selector: 'app-lista-direcciones',
  styleUrl: './lista-direcciones.css',
  templateUrl: './lista-direcciones.html',
})
export class ListaDirecciones {
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
