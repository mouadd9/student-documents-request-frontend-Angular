import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectJwtToken } from '../store/auth-feature/auth.selectors';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('Request URL:', req.url);
  const store = inject(Store);

  // Only process requests starting with "private"
  if (req.url.startsWith('/public')) {
    console.log('Request does not start with "private", skipping interceptor.');
    return next(req);
  }

  return store.select(selectJwtToken).pipe(
    take(1),
    switchMap(token => {
      console.log('Token from store:', token);
      if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Intercepted and modified request:', cloned);
        return next(cloned);
      }
      return next(req);
    })
  );
}
