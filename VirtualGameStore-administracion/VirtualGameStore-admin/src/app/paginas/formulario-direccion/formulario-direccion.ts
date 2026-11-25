import { Component, inject, input, signal } from '@angular/core';
import { API_URL } from '../../config';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeDeApi, mensajesDelCuerpo } from '../../servicios/errores';
import { HttpErrorResponse } from '@angular/common/http';
import { DireccionesApi } from '../../servicios/direcciones-api';
import { CatalogoDirecciones } from '../../servicios/catalogo-direcciones';
import { UsuariosApi } from '../../servicios/usuarios-api';
import { Usuario } from '../../modelos/usuario';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-formulario-direccion',
  styleUrl: './formulario-direccion.css',
  templateUrl: './formulario-direccion.html',
})
export class FormularioDireccion {
  protected readonly apiUrl = API_URL;
  private readonly api = inject(DireccionesApi);
  private readonly usuariosApi = inject(UsuariosApi);
  private readonly catalogoDireccion = inject(CatalogoDirecciones);
  private readonly router = inject(Router);
  protected readonly guardando = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);
  protected readonly usuarios = signal<Usuario[]>([]);

  readonly idDireccion = input<string | undefined>(undefined, { alias: 'id' });

  protected readonly form = inject(FormBuilder).nonNullable.group({
    calle: ['', [Validators.required, Validators.maxLength(50)]],
    ciudad: ['', [Validators.required, Validators.maxLength(50)]],
    codigoPostal: ['00000', [Validators.required, Validators.maxLength(5)]],
    pais: ['', [Validators.required, Validators.maxLength(50)]],
    idUsuario: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.usuariosApi.listar().subscribe({
      next: (usuarios) => this.usuarios.set(usuarios),
      error: (e) => this.erroresServidor.set([mensajeDeApi(e)]),
    });

    const id = this.idDireccion();
    if (!id) return;
    this.api.obtener(Number(id)).subscribe({
      next: (p) => this.form.patchValue(p),
      error: (e) => this.erroresServidor.set([mensajeDeApi(e)]),
    });
  }
  protected get f() {
    return this.form.controls;
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando.set(true);
    this.erroresServidor.set([]);
    const datos = this.form.getRawValue();
    const id = this.idDireccion();
    const peticion = id ? this.api.actualizar(Number(id), datos) : this.api.crear(datos);

    peticion.subscribe({
      next: () => {
        this.catalogoDireccion.recargar();
        this.router.navigate(['/direcciones']);
      },
      error: (e: HttpErrorResponse) => {
        const mensaes = e.status === 400 ? mensajesDelCuerpo(e.error) : [];
        this.erroresServidor.set(mensaes.length ? mensaes : [mensajeDeApi(e)]);
        this.guardando.set(false);
      },
    });
  }
}
