import { Component, inject, signal } from '@angular/core';
import { TargetaDirecion } from '../../componentes/targeta-direcion/targeta-direcion';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CatalogoDirecciones } from '../../servicios/catalogo-direcciones';
import { DireccionesApi } from '../../servicios/direcciones-api';
import { UsuariosApi } from '../../servicios/usuarios-api';
import { Usuario } from '../../modelos/usuario';
import { mensajeDeApi } from '../../servicios/errores';
import { API_URL } from '../../config';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [TargetaDirecion, RouterLink, ReactiveFormsModule],
  selector: 'app-lista-direcciones',
  styleUrl: './lista-direcciones.css',
  templateUrl: './lista-direcciones.html',
})
export class ListaDirecciones {
  protected readonly catalogoDirec = inject(CatalogoDirecciones);
  protected readonly apiUrl = API_URL;
  private readonly api = inject(DireccionesApi);
  private readonly usuariosApi = inject(UsuariosApi);
  protected readonly usuarios = signal<Usuario[]>([]);
  protected readonly errorUsuarios = signal<string | null>(null);
  protected readonly busqueda = new FormControl(this.catalogoDirec.texto(), { nonNullable: true });
  constructor() {
    this.usuariosApi.listar().subscribe({
      next: (usuarios) => this.usuarios.set(usuarios),
      error: (e) => this.errorUsuarios.set(mensajeDeApi(e)),
    });

    this.busqueda.valueChanges
      .pipe(
        debounceTime(200),
        map((t) => t.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => this.catalogoDirec.buscar(texto));
  }

  nombreUsuario(idUsuario: number): string {
    return this.usuarios().find((usuario) => usuario.idUsuario === idUsuario)?.nombre
      ?? `Usuario #${idUsuario}`;
  }

  eliminar(idDireccion: number): void {
    if (!confirm(`Estas Seguro de Eliminar esta Direccion???`)) return;
    this.api.eliminar(idDireccion).subscribe({
      next: () => {
        this.catalogoDirec.recargar();
      },
      error: () => {},
    });
  }
}
