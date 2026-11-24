import { Component, input, output } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-targeta-producto',
  styleUrl: './targeta-producto.css',
  templateUrl: './targeta-producto.html',
})
export class TargetaProducto {
  readonly producto = input.required<Producto>();
  readonly activa = input(false);
  readonly seleccionar = output<Producto>();
}
