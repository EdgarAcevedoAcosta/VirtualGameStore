import { Component, inject, input, output, signal } from '@angular/core';
import { Direccion } from '../../modelos/direccion';
import { RouterLink } from '@angular/router';
import { CatalogoDirecciones } from '../../servicios/catalogo-direcciones';
import { DireccionesApi } from '../../servicios/direcciones-api';
import { mensajeDeApi } from '../../servicios/errores';

@Component({
  imports: [RouterLink],
  selector: 'app-targeta-direcion',
  styleUrl: './targeta-direcion.css',
  templateUrl: './targeta-direcion.html',
})
export class TargetaDirecion {
  readonly direccion = input.required<Direccion>();
  readonly nombreUsuario = input.required<string>();
  readonly activa = input(false);
  readonly seleccionar = output<Direccion>();
  protected readonly catalogoDirec = inject(CatalogoDirecciones);
  private readonly api = inject(DireccionesApi);

  protected readonly eliminando = signal(false);
  protected readonly errorEliminar = signal<string | null>(null);

  eliminar(idDireccion: number): void {
    if (this.eliminando() || !confirm(`Estas Seguro de Eliminar esta Direccion???`)) return;
    this.errorEliminar.set(null);
    this.eliminando.set(true);
    this.api.eliminar(idDireccion).subscribe({
      next: () => {
        this.catalogoDirec.recargar();
        this.eliminando.set(false);
      },
      error: (e) => {
        this.errorEliminar.set(mensajeDeApi(e));
        this.eliminando.set(false);
      },
    });
  }
}
