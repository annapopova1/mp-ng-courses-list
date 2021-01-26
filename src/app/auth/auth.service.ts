import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

export const LS_TOKEN_KEY = 'cl-auth-token';
export const LS_KEY = 'cl-auth-user';
const AUTH_URL = 'http://localhost:3004/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<TokenInfo>(`${AUTH_URL}/login`, { login: email, password }).pipe(
      map(tokenInfo => {
        return tokenInfo.token;
      })
    );
  }

  getUserInfo(token: string): Observable<User> {
    return this.http.post<UserInfo>(`${AUTH_URL}/userinfo`, { token }).pipe(
      map(userInfo => {
        const { id, name } = userInfo;
        const user: User = {
          id: id.toString(),
          firstName: name.first,
          lastName: name.last,
        };
        return user;
      })
    );
  }
}
