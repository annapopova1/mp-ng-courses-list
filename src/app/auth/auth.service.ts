import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from './user';

interface TokenInfo {
  token: string;
}

interface UserInfo {
  id: number;
  name: {
    first: string;
    last: string;
  };
}

const LS_TOKEN_KEY = 'cl-auth-token';
const LS_KEY = 'cl-auth-user';
const AUTH_URL = 'http://localhost:3004/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token$: BehaviorSubject<string>;
  private _userInfo$: BehaviorSubject<User|null>;
  token$: Observable<string>;
  userInfo$: Observable<User|null>;


  constructor(private http: HttpClient) {
    const token = localStorage.getItem(LS_TOKEN_KEY) || '';
    const userInfoStr = localStorage.getItem(LS_KEY);
    let userInfo;
    if (userInfoStr) {
      userInfo = JSON.parse(userInfoStr);
    }
    this._token$ = new BehaviorSubject(token);
    this._userInfo$ = new BehaviorSubject(userInfo);
    this.token$ = this._token$.asObservable();
    this.userInfo$ = this._userInfo$.asObservable();
  }

  login(email: string, password: string): Observable<User|null> {
    return this.http.post<TokenInfo>(`${AUTH_URL}/login`, { login: email, password }).pipe(
      tap(tokenInfo => {
        localStorage.setItem(LS_TOKEN_KEY, tokenInfo.token);
        return tokenInfo;
      }),
      switchMap((tokenInfo) => {
        this._token$.next(tokenInfo.token);
        return this.http.post<UserInfo>(`${AUTH_URL}/userinfo`, tokenInfo).pipe(
          map(userInfo => {
            const { id, name } = userInfo;
            const user: User = {
              id: id.toString(),
              firstName: name.first,
              lastName: name.last,
            };
            localStorage.setItem(LS_KEY, JSON.stringify(user));
            this._userInfo$.next(user)
            return user;
          })
        )
      })
    );
  }

  logout(): void {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_KEY);
    this._token$.next('');
    this._userInfo$.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return combineLatest([this.token$, this.userInfo$]).pipe(
      map(([token, user]) => !!token && !!user)
    );
  }

  get currentToken(): string {
    return this._token$.value;
  }
}
