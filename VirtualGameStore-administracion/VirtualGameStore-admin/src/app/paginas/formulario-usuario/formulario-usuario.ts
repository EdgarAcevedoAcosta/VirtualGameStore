import { Component, inject, input, signal } from '@angular/core';
import { API_URL } from '../../config';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeDeApi, mensajesDelCuerpo } from '../../servicios/errores';
import { HttpErrorResponse } from '@angular/common/http';
import { ESTADOSUSUARIOS, ROLES } from '../../modelos/usuario';
import { CatalogoUsuarios } from '../../servicios/catalogo-usuarios';
import { UsuariosApi } from '../../servicios/usuarios-api';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-formulario-usuario',
  styleUrl: './formulario-usuario.css',
  templateUrl: './formulario-usuario.html',
})
export class FormularioUsuario {
  protected readonly roles = ROLES;
  protected readonly estados = ESTADOSUSUARIOS;
  protected readonly apiUrl = API_URL;
  private readonly api = inject(UsuariosApi);
  private readonly catalogoUsuarios = inject(CatalogoUsuarios);
  private readonly router = inject(Router);
  protected readonly guardando = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);

  readonly idUsuario = input<string>();

  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.maxLength(160)]],
    passwordHash: ['', [Validators.required, Validators.maxLength(255)]],
    creadoEn: [new Date(), [Validators.required]],
    rol: ['cliente', [Validators.required]],
    activo: ['activo', [Validators.maxLength(7)]],
  });

  ngOnInit(): void {
    const id = this.idUsuario();
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
      this.form.markAsTouched();
      return;
    }
    this.guardando.set(true);
    this.erroresServidor.set([]);
    const datos = this.form.getRawValue();
    const id = this.idUsuario();
    const peticion = id ? this.api.actualizar(Number(id), datos) : this.api.crear(datos);

    peticion.subscribe({
      next: () => {
        this.catalogoUsuarios.recargar();
        this.router.navigate(['/usuarios']);
      },
      error: (e: HttpErrorResponse) => {
        const mensaes = e.status === 400 ? mensajesDelCuerpo(e.error) : [];
        this.erroresServidor.set(mensaes.length ? mensaes : [mensajeDeApi(e)]);
        this.guardando.set(false);
      },
    });
  }
}
