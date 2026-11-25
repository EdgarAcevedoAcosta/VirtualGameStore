import { Component, inject, signal } from '@angular/core';
import { TargetaCompra } from '../../componentes/targeta-compra/targeta-compra';
import { FiltroCompras } from '../../componentes/filtro-compras/filtro-compras';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CatalogoCompras } from '../../servicios/catalogo-compras';
import { API_URL } from '../../config';
import { ComprasApi } from '../../servicios/compras-api';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsuariosApi } from '../../servicios/usuarios-api';
import { DireccionesApi } from '../../servicios/direcciones-api';
import { Usuario } from '../../modelos/usuario';
import { Direccion } from '../../modelos/direccion';
import { mensajeDeApi } from '../../servicios/errores';

@Component({
  imports: [TargetaCompra, FiltroCompras, RouterLink, ReactiveFormsModule],
  selector: 'app-lista-compras',
  styleUrl: './lista-compras.css',
  templateUrl: './lista-compras.html',
})
export class ListaCompras {
  protected readonly catalogoCompra = inject(CatalogoCompras);
  protected readonly apiUrl = API_URL;
  private readonly api = inject(ComprasApi);
  private readonly usuariosApi = inject(UsuariosApi);
  private readonly direccionesApi = inject(DireccionesApi);
  protected readonly usuarios = signal<Usuario[]>([]);
  protected readonly direcciones = signal<Direccion[]>([]);
  protected readonly errorUsuarios = signal<string | null>(null);
  protected readonly errorDirecciones = signal<string | null>(null);
  protected readonly busqueda = new FormControl(this.catalogoCompra.texto(), { nonNullable: true });
  constructor() {
    this.usuariosApi.listar().subscribe({
      next: (usuarios) => this.usuarios.set(usuarios),
      error: (e) => this.errorUsuarios.set(mensajeDeApi(e)),
    });
    this.direccionesApi.listar().subscribe({
      next: (direcciones) => this.direcciones.set(direcciones),
      error: (e) => this.errorDirecciones.set(mensajeDeApi(e)),
    });

    this.busqueda.valueChanges
      .pipe(
        debounceTime(200),
        map((t) => t.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => this.catalogoCompra.buscar(texto));
  }

  nombreUsuario(idUsuario: number): string {
    return this.usuarios().find((usuario) => usuario.idUsuario === idUsuario)?.nombre
      ?? `Usuario #${idUsuario}`;
  }

  direccionCompleta(idDireccion: number): string {
    const direccion = this.direcciones().find((item) => item.idDireccion === idDireccion);
    return direccion
      ? `${direccion.calle}, ${direccion.ciudad}, ${direccion.pais}, ${direccion.codigoPostal}`
      : `Dirección #${idDireccion}`;
  }

  eliminar(idCompra: number): void {
    if (!confirm(`Estas Seguro de Eliminar esta Compra???`)) return;
    this.api.eliminar(idCompra).subscribe({
      next: () => {
        this.catalogoCompra.recargar();
      },
      error: () => {},
    });
  }
}
