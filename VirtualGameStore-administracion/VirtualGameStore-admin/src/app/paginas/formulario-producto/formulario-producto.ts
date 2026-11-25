import { Component, inject, input, signal } from '@angular/core';
import { Categoria } from '../../modelos/categoria';
import { API_URL } from '../../config';
import { CatalogoProductos } from '../../servicios/catalogo-productos';
import { ProductosApi } from '../../servicios/productos-api';
import { CategoriasApi } from '../../servicios/categorias-api';
import { TargetaAgregarCategorias } from '../../componentes/targeta-agregar-categorias/targeta-agregar-categorias';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeDeApi, mensajesDelCuerpo } from '../../servicios/errores';
import { ESTADOPRODUCTO, IMAGENES } from '../../modelos/producto';
import { HttpErrorResponse } from '@angular/common/http';
// esto no deveria hacerlo pero por mientras lo voy a hacer

@Component({
  imports: [ReactiveFormsModule, RouterLink, TargetaAgregarCategorias],
  selector: 'app-formulario-producto',
  styleUrl: './formulario-producto.css',
  templateUrl: './formulario-producto.html',
})
export class FormularioProducto {
  private readonly categoriasApi = inject(CategoriasApi);
  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly imagenes = IMAGENES;
  protected readonly estados = ESTADOPRODUCTO;
  protected readonly apiUrl = API_URL;
  private readonly api = inject(ProductosApi);
  private readonly catalogoProd = inject(CatalogoProductos);
  private readonly router = inject(Router);
  protected readonly guardando = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);

  readonly idProducto = input<string | undefined>(undefined, { alias: 'id' });
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    descripcion: ['', [Validators.required, Validators.maxLength(255)]],
    precio: [0.0, [Validators.required, Validators.max(7000), Validators.min(300)]],
    stock: [
      0,
      [
        Validators.required,
        Validators.max(20),
        Validators.min(0),
        (control) => (Number.isInteger(control.value) ? null : { integer: true }),
      ],
    ],
    imagenUrl: [IMAGENES[0], [Validators.required]],
    estado: ['', [Validators.maxLength(7)]],
    categorias: this.fb.control<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.categoriasApi.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
      error: (e) => this.erroresServidor.set([mensajeDeApi(e)]),
    });

    const id = this.idProducto();
    if (!id) return;
    this.api.obtener(Number(id)).subscribe({
      next: (p) =>
        this.form.patchValue({
          ...p,
          categorias: p.categorias.map((categoria) => categoria.idCategoria),
        }),
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
    const id = this.idProducto();
    const peticion = id ? this.api.actualizar(Number(id), datos) : this.api.crear(datos);

    peticion.subscribe({
      next: () => {
        this.catalogoProd.recargar();
        this.router.navigate(['/productos']);
      },
      error: (e: HttpErrorResponse) => {
        const mensaes = e.status === 400 ? mensajesDelCuerpo(e.error) : [];
        this.erroresServidor.set(mensaes.length ? mensaes : [mensajeDeApi(e)]);
        this.guardando.set(false);
      },
    });
  }
}
