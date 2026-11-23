import { Component, input, output } from '@angular/core';
import { Categoria } from '../../modelos/categoria';

@Component({
  imports: [],
  selector: 'app-targeta-categoria',
  styleUrl: './targeta-categoria.css',
  templateUrl: './targeta-categoria.html',
})
export class TargetaCategoria {
  readonly categoria = input.required<Categoria>();
  readonly activa = input(false);
  readonly seleccionar = output<Categoria>();
}
