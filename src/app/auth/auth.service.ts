import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  token?: string;
  userInfo?: User;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(LS_TOKEN_KEY);
    if (token) {
      this.token = token;
    }
    const userInfo = localStorage.getItem(LS_KEY);
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  login(email: string, password: string): Promise<User> {
    return this.http.post<TokenInfo>(`${AUTH_URL}/login`, { login: email, password }).toPromise()
      .then(tokenInfo => {
        this.token = tokenInfo.token;
        localStorage.setItem(LS_TOKEN_KEY, tokenInfo.token);
        return this.http.post<UserInfo>(`${AUTH_URL}/userinfo`, tokenInfo).toPromise()
          .then((userInfo) => {
            const { id, name } = userInfo;
            const user: User = {
              id: id.toString(),
              firstName: name.first,
              lastName: name.last,
            };
            this.userInfo = user;
            localStorage.setItem(LS_KEY, JSON.stringify(user));
            return user;
          });
      });
  }

  logout(): void {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_KEY);
    this.token = undefined;
    this.userInfo = undefined;
  }

  isAuthenticated(): boolean {
    return !!this.userInfo && !!this.token;
  }
}
