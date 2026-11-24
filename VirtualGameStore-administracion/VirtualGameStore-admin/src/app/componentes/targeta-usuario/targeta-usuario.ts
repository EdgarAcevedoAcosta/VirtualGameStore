import { Component, input, output } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-targeta-usuario',
  styleUrl: './targeta-usuario.css',
  templateUrl: './targeta-usuario.html',
})
export class TargetaUsuario {
  readonly usuario = input.required<Usuario>();
  readonly activa = input(false);
  readonly seleccionar = output<Usuario>();
}
