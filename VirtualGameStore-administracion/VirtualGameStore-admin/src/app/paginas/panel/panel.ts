import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Sesion } from '../../sesion/sesion';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-panel',
  styleUrl: './panel.css',
  templateUrl: './panel.html',
})
export class Panel {
  protected readonly sesion = inject(Sesion);
  private readonly router = inject(Router);

  /**
   * Hay que NAVEGAR al salir. El guardia sólo se revisa al entrar a una ruta:
   * si sólo se borra la sesión, la página se queda donde está.
   */
  protected salir(): void {
    this.sesion.salir();
    this.router.navigate(['/login']);
  }
}
