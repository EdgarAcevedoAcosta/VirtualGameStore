import { Component, inject, input, signal } from '@angular/core';
import { API_URL } from '../../config';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeDeApi, mensajesDelCuerpo } from '../../servicios/errores';

import { HttpErrorResponse } from '@angular/common/http';
import { ESTADOCOMPRA } from '../../modelos/compra';
import { ComprasApi } from '../../servicios/compras-api';
import { CatalogoCompras } from '../../servicios/catalogo-compras';
import { UsuariosApi } from '../../servicios/usuarios-api';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-formulario-compra',
  styleUrl: './formulario-compra.css',
  templateUrl: './formulario-compra.html',
})
export class FormularioCompra {
  protected readonly estados = ESTADOCOMPRA;
  protected readonly apiUrl = API_URL;
  private readonly api = inject(ComprasApi);
  private readonly catalogoCompra = inject(CatalogoCompras);
  private readonly usuariosApi = inject(UsuariosApi);
  private readonly router = inject(Router);
  protected readonly guardando = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);
  protected readonly nombreUsuario = signal('');

  readonly idCompra = input<string | undefined>(undefined, { alias: 'id' });

  protected readonly form = inject(FormBuilder).nonNullable.group({
    idUsuario: [0, [Validators.required, Validators.min(1)]],
    idDireccion: [0, [Validators.required, Validators.min(1)]],
    fecha: [fechaActual(), [Validators.required]],
    total: [0.0, [Validators.required]],
    estado: ['pendiente', [Validators.required, Validators.maxLength(10)]],
    idCarrito: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    const id = this.idCompra();
    if (!id) return;
    this.form.controls.idUsuario.disable();
    this.form.controls.idDireccion.disable();
    this.form.controls.fecha.disable();
    this.form.controls.total.disable();
    this.form.controls.idCarrito.disable();

    this.api.obtener(Number(id)).subscribe({
      next: (compra) => {
        this.form.patchValue({
          ...compra,
          fecha: new Date(compra.fecha).toISOString().slice(0, 10),
        });
        this.usuariosApi.obtener(compra.idUsuario).subscribe({
          next: (usuario) => this.nombreUsuario.set(usuario.nombre),
          error: (e) => this.erroresServidor.update((errores) => [...errores, mensajeDeApi(e)]),
        });
      },
      error: (e) => this.erroresServidor.set([mensajeDeApi(e)]),
    });
  }
  protected get f() {
    return this.form.controls;
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    this.guardando.set(true);
    this.erroresServidor.set([]);
    const datos = this.form.getRawValue();
    const id = this.idCompra();
    const peticion = id
      ? this.api.actualizar(Number(id), { estado: datos.estado })
      : this.api.crear(datos);

    peticion.subscribe({
      next: () => {
        this.catalogoCompra.recargar();
        this.router.navigate(['/compras']);
      },
      error: (e: HttpErrorResponse) => {
        const mensaes = e.status === 400 ? mensajesDelCuerpo(e.error) : [];
        this.erroresServidor.set(mensaes.length ? mensaes : [mensajeDeApi(e)]);
        this.guardando.set(false);
      },
    });
  }
}

function fechaActual(): string {
  const fecha = new Date();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}
