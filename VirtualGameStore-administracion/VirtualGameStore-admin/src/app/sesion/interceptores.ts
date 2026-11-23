import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Sesion } from './sesion';

export const conToken: HttpInterceptorFn = (req, next) => {
  const token = inject(Sesion).token();
  if (!token) return next(req);

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};

/**
 * De bajada: si la API responde 401 (token vencido o inválido), se cierra la
 * sesión y se va al login. El 401 del propio login NO cuenta: ése es
 * «contraseña equivocada», no «sesión vencida».
 */
export const alFallar: HttpInterceptorFn = (req, next) => {
  const sesion = inject(Sesion);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: unknown) => {
      const esLogin = req.url.includes('/auth/login');
      if (error instanceof HttpErrorResponse && error.status === 401 && !esLogin) {
        sesion.salir();
        router.navigate(['/login'], { queryParams: { motivo: 'vencio' } });
      }
      // Se vuelve a lanzar SIEMPRE: un interceptor que se traga el error deja
      // a la pantalla sin saber que algo falló.
      return throwError(() => error);
    }),
  );
};
