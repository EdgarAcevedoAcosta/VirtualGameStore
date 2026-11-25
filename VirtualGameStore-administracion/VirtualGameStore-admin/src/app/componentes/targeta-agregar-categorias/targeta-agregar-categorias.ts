import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import type { Categoria } from '../../modelos/categoria';

@Component({
  imports: [],
  selector: 'app-targeta-agregar-categorias',
  styleUrl: './targeta-agregar-categorias.css',
  templateUrl: './targeta-agregar-categorias.html',
})
export class TargetaAgregarCategorias {
  readonly categorias = input.required<Categoria[]>();
  readonly control = input.required<FormControl<number[]>>();

  alternar(idCategoria: number, event: Event): void {
    const marcada = (event.target as HTMLInputElement).checked;
    const control = this.control();
    const actuales = control.value;
    const siguientes = marcada
      ? actuales.includes(idCategoria)
        ? actuales
        : [...actuales, idCategoria]
      : actuales.filter((id) => id !== idCategoria);

    control.setValue(siguientes);
    control.markAsDirty();
    control.markAsTouched();
  }
}
