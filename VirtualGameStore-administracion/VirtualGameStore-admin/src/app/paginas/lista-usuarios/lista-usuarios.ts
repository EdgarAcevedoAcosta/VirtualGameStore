import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { API_URL } from '../../config';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TargetaUsuario } from '../../componentes/targeta-usuario/targeta-usuario';
import { FiltroUsuarios } from '../../componentes/filtro-usuarios/filtro-usuarios';
import { UsuariosApi } from '../../servicios/usuarios-api';
import { CatalogoUsuarios } from '../../servicios/catalogo-usuarios';

@Component({
  imports: [TargetaUsuario, FiltroUsuarios, RouterLink, ReactiveFormsModule],
  selector: 'app-lista-usuarios',
  styleUrl: './lista-usuarios.css',
  templateUrl: './lista-usuarios.html',
})
export class ListaUsuarios {
  protected readonly catalogoUsuarios = inject(CatalogoUsuarios);
  protected readonly apiUrl = API_URL;
  private readonly api = inject(UsuariosApi);
  protected readonly busqueda = new FormControl(this.catalogoUsuarios.texto(), {
    nonNullable: true,
  });
  constructor() {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(200),
        map((t) => t.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => this.catalogoUsuarios.buscar(texto));
  }
  eliminar(idUsuario: number): void {
    if (!confirm(`Estas Seguro de Eliminar este Usuario???`)) return;
    this.api.eliminar(idUsuario).subscribe({
      next: () => {
        this.catalogoUsuarios.recargar();
      },
      error: () => {},
    });
  }
}
