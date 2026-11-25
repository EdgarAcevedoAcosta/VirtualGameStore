import { Component, inject } from '@angular/core';
import { CatalogoCategorias } from '../../servicios/catalogo-categorias';
import { CatalogoProductos } from '../../servicios/catalogo-productos';

@Component({
  imports: [],
  selector: 'app-filtro-categorias',
  styleUrl: './filtro-categorias.css',
  templateUrl: './filtro-categorias.html',
})
export class FiltroCategorias {
  protected readonly catalogoCate = inject(CatalogoCategorias);
  protected readonly catalogoProd = inject(CatalogoProductos);
  protected readonly opciones = this.catalogoCate.opciones;
}
