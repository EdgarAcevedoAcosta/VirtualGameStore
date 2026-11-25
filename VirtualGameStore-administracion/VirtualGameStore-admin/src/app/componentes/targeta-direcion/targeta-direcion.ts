import { Component, input, output } from '@angular/core';
import { Direccion } from '../../modelos/direccion';
import { RouterLink } from '@angular/router';

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
}
