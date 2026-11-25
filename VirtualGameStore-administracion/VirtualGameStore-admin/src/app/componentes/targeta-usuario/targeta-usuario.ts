import { Component, input, output, inject, signal } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { RouterLink } from '@angular/router';
import { UsuariosApi } from '../../servicios/usuarios-api';
import { CatalogoUsuarios } from '../../servicios/catalogo-usuarios';
import { mensajeDeApi } from '../../servicios/errores';

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
  protected readonly catalogoUsuarios = inject(CatalogoUsuarios);
  private readonly api = inject(UsuariosApi);
  protected readonly eliminando = signal(false);
  protected readonly errorEliminar = signal<string | null>(null);

  eliminar(idUsuario: number): void {
    if (this.eliminando() || !confirm(`Estas Seguro de Eliminar este Usuario???`)) return;
    this.errorEliminar.set(null);
    this.eliminando.set(true);
    this.api.eliminar(idUsuario).subscribe({
      next: () => {
        this.catalogoUsuarios.recargar();
        this.eliminando.set(false);
      },
      error: (e) => {
        this.errorEliminar.set(mensajeDeApi(e));
        this.eliminando.set(false);
      },
    });
  }
}
