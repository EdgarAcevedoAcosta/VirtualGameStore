import { Component, inject, input, signal } from '@angular/core';
import { API_URL } from '../../config';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeDeApi, mensajesDelCuerpo } from '../../servicios/errores';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriasApi } from '../../servicios/categorias-api';
import { CatalogoCategorias } from '../../servicios/catalogo-categorias';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-formulario-categoria',
  styleUrl: './formulario-categoria.css',
  templateUrl: './formulario-categoria.html',
})
export class FormularioCategoria {
  protected readonly apiUrl = API_URL;
  private readonly api = inject(CategoriasApi);
  private readonly catalogoCategoria = inject(CatalogoCategorias);
  private readonly router = inject(Router);
  readonly id = input<string>();

  protected readonly guardando = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);

  ngOnInit(): void {
    const id = this.id();
    if (!id) return;
    this.api.obtener(Number(id)).subscribe({
      next: (p) => this.form.patchValue(p),
      error: (e) => this.erroresServidor.set([mensajeDeApi(e)]),
    });
  }

  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
  });
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
    const id = this.id();
    const peticion = id ? this.api.actualizar(Number(id), datos) : this.api.crear(datos);

    peticion.subscribe({
      next: () => {
        this.catalogoCategoria.recargar();
        this.router.navigate(['/categorias']);
      },
      error: (e: HttpErrorResponse) => {
        const mensaes = e.status === 400 ? mensajesDelCuerpo(e.error) : [];
        this.erroresServidor.set(mensaes.length ? mensaes : [mensajeDeApi(e)]);
        this.guardando.set(false);
      },
    });
  }
}
