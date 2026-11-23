import { Component, inject } from '@angular/core';
import { CatalogoCompras } from '../../servicios/catalogo-compras';
import { ESTADOCOMPRA } from '../../modelos/compra';

@Component({
  imports: [],
  selector: 'app-filtro-compras',
  styleUrl: './filtro-compras.css',
  templateUrl: './filtro-compras.html',
})
export class FiltroCompras {
  protected readonly catalogoCompras = inject(CatalogoCompras);
  protected readonly opciones = ['Todos' as const, ...ESTADOCOMPRA];
}
