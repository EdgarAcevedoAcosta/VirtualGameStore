import { Component, inject } from '@angular/core';
import { CatalogoCategorias } from '../../servicios/catalogo-categorias';
import { CATEGORIAS } from '../../modelos/categoria';

@Component({
  imports: [],
  selector: 'app-filtro-categorias',
  styleUrl: './filtro-categorias.css',
  templateUrl: './filtro-categorias.html',
})
export class FiltroCategorias {
  protected readonly catalogoCate = inject(CatalogoCategorias);
  protected readonly opciones = ['Todos' as const, ...CATEGORIAS];
}
