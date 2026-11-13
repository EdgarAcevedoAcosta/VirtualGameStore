import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { delay, Observable } from 'rxjs';

@Injectable()
export class RetardoInterceptor implements NestInterceptor {
  private readonly ms = Number(process.env.RETARDO_MS ?? 0);

  intercept(
    _contexto: ExecutionContext,
    siguiente: CallHandler,
  ): Observable<unknown> {
    return this.ms > 0
      ? siguiente.handle().pipe(delay(this.ms))
      : siguiente.handle();
  }
}
