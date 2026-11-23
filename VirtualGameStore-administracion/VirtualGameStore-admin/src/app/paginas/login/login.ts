import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeDeApi } from '../../servicios/errores';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from '../../sesion/sesion';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly sesion = inject(Sesion);
  private readonly router = inject(Router);

  protected readonly vencio =
    inject(ActivatedRoute).snapshot.queryParamMap.get('motivo') === 'vencio';

  protected readonly enviando = signal(false);
  protected readonly problema = signal<string | null>(null);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    correo: ['admin@itson.mx', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected async enviar(): Promise<void> {
    if (this.form.invalid) {
      this.problema.set('Escribe el correo y la contraseña.');
      return;
    }
    this.enviando.set(true);
    this.problema.set(null);
    try {
      const { correo, password } = this.form.getRawValue();
      await this.sesion.entrar(correo, password);
      this.router.navigate(['/productos']);
    } catch (error) {
      // Un HttpErrorResponse se traduce; el Error de «no es admin» trae su
      // propio mensaje.
      this.problema.set(
        error instanceof HttpErrorResponse ? mensajeDeApi(error) : (error as Error).message,
      );
    } finally {
      this.enviando.set(false);
    }
  }
}
