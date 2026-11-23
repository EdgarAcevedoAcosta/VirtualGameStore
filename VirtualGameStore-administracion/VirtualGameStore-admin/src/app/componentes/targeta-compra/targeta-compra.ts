import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Compra } from '../../modelos/compra';
import { RouterLink } from '@angular/router';

@Component({
  imports: [TitleCasePipe, RouterLink],
  selector: 'app-targeta-compra',
  styleUrl: './targeta-compra.css',
  templateUrl: './targeta-compra.html',
})
export class TargetaCompra {
  readonly compra = input.required<Compra>();
  readonly activa = input(false);
  readonly seleccionar = output<Compra>();
}
