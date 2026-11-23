import { Component, inject } from '@angular/core';
import { CatalogoUsuarios } from '../../servicios/catalogo-usuarios';
import { ROLES } from '../../modelos/usuario';

@Component({
  imports: [],
  selector: 'app-filtro-usuarios',
  styleUrl: './filtro-usuarios.css',
  templateUrl: './filtro-usuarios.html',
})
export class FiltroUsuarios {
  protected readonly catalogoUsuarios = inject(CatalogoUsuarios);
  protected readonly opciones = ['Todos' as const, ...ROLES];
}
