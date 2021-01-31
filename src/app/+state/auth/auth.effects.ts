import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { login, saveAuthInfo } from './auth.actions';

@Injectable()
export class AuthEffects {
  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          switchMap((token) => {
            return this.authService.getUserInfo(token).pipe(
              map((user) => {
                const authInfo = { token, user };
                this.router.navigate(['courses']);
                return saveAuthInfo(authInfo);
              })
            );
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
