import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AppState } from '../+state';
import { selectAuthToken } from '../+state/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/')) {
      return next.handle(req);
    }
    return this.store.pipe(
      select(selectAuthToken),
      first(),
      switchMap((token) => {
        const authReq = !!token
          ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
